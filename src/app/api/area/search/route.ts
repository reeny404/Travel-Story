import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const countryId = searchParams.get("country");
  const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);
  const areasPerPage = currentPage === 1 ? 3 : 5;

  if (!term) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  let query = supabase
    .from("area")
    .select("*")
    .or(`name.ilike.%${term}%, krName.ilike.%${term}%`)
    .range((currentPage - 1) * areasPerPage, currentPage * areasPerPage - 1);

  if (countryId) {
    query = query.eq("countryId", countryId);
  }

  const { data, error } = await query;

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
      error: { status: 404, message: "No Search Data" },
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: data,
    error: null,
  });
}
