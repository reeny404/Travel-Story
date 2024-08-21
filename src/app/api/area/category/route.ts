import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.from("area").select(`
    *,
    city:cityId (
      krName,
      countryId
    ),
    country:countryId (
      krName
    )
  `);

  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: { status: 500, message: "Internal Server Error" },
      data: null,
    });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  // 카테고리별로 데이터 분류
  const categorizedData = {
    place: data.filter((item) => item.type === "place").slice(0, 10),
    restaurant: data.filter((item) => item.type === "restaurant").slice(0, 10),
    shop: data.filter((item) => item.type === "shop").slice(0, 5),
    accommodation: data
      .filter((item) => item.type === "accommodation")
      .slice(0, 5),
  };

  return NextResponse.json(categorizedData);
}
