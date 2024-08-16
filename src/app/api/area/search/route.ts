import { createClient } from "@/supabase/server";
import { Area } from "@/types/Recommend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const countryId = searchParams.get("country");
  const category = searchParams.get("category");
  const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  const offset = (currentPage - 1) * limit;

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
      if (countryId) {
        return query.eq("countryId", countryId);
      }
      return query;
    };

    const queries = {
      place: applyCountryFilter(
        supabase
          .from("area")
          .select("*")
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", "place")
          .range(offset, offset + limit - 1)
      ),

      restaurant: applyCountryFilter(
        supabase
          .from("area")
          .select("*")
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", "restaurant")
          .range(offset, offset + limit - 1)
      ),

      accommodation: applyCountryFilter(
        supabase
          .from("area")
          .select("*")
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", "accommodation")
          .range(offset, offset + limit - 1)
      ),

      shop: applyCountryFilter(
        supabase
          .from("area")
          .select("*")
          .or(`name.ilike.%${term}%,krName.ilike.%${term}%`)
          .eq("type", "shop")
          .range(offset, offset + limit - 1)
      ),
    };

    const [placeData, restaurantData, accommodationData, shopData] =
      await Promise.all([
        queries.place,
        queries.restaurant,
        queries.accommodation,
        queries.shop,
      ]);

    const errors = [
      placeData.error,
      restaurantData.error,
      accommodationData.error,
      shopData.error,
    ].filter(Boolean);
    if (errors.length > 0) {
      throw new Error("Error fetching data");
    }

    const searchResultData = {
      place: placeData.data as Area[],
      restaurant: restaurantData.data as Area[],
      accommodation: accommodationData.data as Area[],
      shop: shopData.data as Area[],
    };
    console.log(
      `현재 페이지: ${currentPage}, 오프셋: ${offset}, 제한: ${limit}`
    );

    const totalResultsQueries = {
      place: applyCountryFilter(
        supabase
          .from("area")
          .select("*", { count: "exact", head: true })
          .ilike("name", `%${term}%`)
          .eq("type", "place")
      ),
      restaurant: applyCountryFilter(
        supabase
          .from("area")
          .select("*", { count: "exact", head: true })
          .ilike("name", `%${term}%`)
          .eq("type", "restaurant")
      ),
      accommodation: applyCountryFilter(
        supabase
          .from("area")
          .select("*", { count: "exact", head: true })
          .ilike("name", `%${term}%`)
          .eq("type", "accommodation")
      ),
      shop: applyCountryFilter(
        supabase
          .from("area")
          .select("*", { count: "exact", head: true })
          .ilike("name", `%${term}%`)
          .eq("type", "shop")
      ),
    };

    const [placeTotal, restaurantTotal, accommodationTotal, shopTotal] =
      await Promise.all([
        totalResultsQueries.place,
        totalResultsQueries.restaurant,
        totalResultsQueries.accommodation,
        totalResultsQueries.shop,
      ]);

    const totalResults = {
      place: placeTotal.count || 0,
      restaurant: restaurantTotal.count || 0,
      accommodation: accommodationTotal.count || 0,
      shop: shopTotal.count || 0,
    };

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
