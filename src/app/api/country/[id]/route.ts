import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  route: { params: { id: string } }
) {
  const { searchParams } = request.nextUrl;
  const id = route.params.id;
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
    .eq("id", id)
    .single();
  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: { status: 500, message: "Internal Server Error" },
      data: null,
    });
  }

  if (!data) {
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
    data: data,
    error: null,
  });
}
