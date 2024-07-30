import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const { searchParams } = request.nextUrl;
  console.log("route", route.params.id, typeof route.params.id);
  const id = searchParams.get("id");
  console.log("searchParams", searchParams);
  console.log("456", request.nextUrl, new URL(request.url));
  console.log(123, id);
  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("country")
    .select("*")
    .eq("id", route.params.id);
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

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: data[0],
    error: null,
  });
}
