import { TABS } from "@/constants/tabs";
import { createClient } from "@/supabase/server";
import { Area } from "@/types/Recommend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const countryId = searchParams.get("country");
  const category = searchParams.get("category");
  const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);
  const limit = parseInt(
    searchParams.get("limit") || (currentPage === 1 ? "3" : "5"),
    10
  );
  const offset = currentPage === 1 ? 0 : 3 + (currentPage - 2) * 5;

  if (!term) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  try {
    const applyCountryFilter = (query: any) => {
      return countryId ? query.eq("countryId", countryId) : query;
    };

    const fetchSearchResultData = async (category: string) => {
      const dataQuery = applyCountryFilter(
        supabase
          .from("area")
          .select("*")
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", category)
          .range(offset, offset + limit - 1)
      );

      const totalQuery = applyCountryFilter(
        supabase
          .from("area")
          .select("*", { count: "exact", head: true })
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", category)
      );

      const [data, total] = await Promise.all([dataQuery, totalQuery]);

      return {
        data: data.data as Area[],
        total: total.count || 0,
      };
    };

    // 특정 카테고리만 검색
    if (category) {
      const { data, total } = await fetchSearchResultData(category);

      return NextResponse.json({
        status: 200,
        message: "Success",
        data: { [category]: data },
        total: { [category]: total },
        error: null,
      });
    }

    // 전체 카테고리 검색
    const categories = TABS.default.map((type) => type.en);
    const results = await Promise.all(categories.map(fetchSearchResultData));

    const searchResultData = results.reduce(
      (acc, result, index) => ({
        ...acc,
        [categories[index]]: result.data,
      }),
      {}
    );

    const totalResults = results.reduce(
      (acc, result, index) => ({
        ...acc,
        [categories[index]]: result.total,
      }),
      {}
    );

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: searchResultData,
      total: totalResults,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      error: {
        status: 500,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      data: null,
    });
  }
}
