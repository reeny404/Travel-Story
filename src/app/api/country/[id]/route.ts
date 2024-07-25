import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse<T> = {
  status: number;
  message: string;
  error?: { status: number; message: string };
  data?: T;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    const response: ApiResponse<null> = {
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "ID parameter is required" },
    };

    return NextResponse.json(response, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("country")
    .select("*")
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "No data" }, { status: 404 });
  }

  return NextResponse.json(data[0]);
}
