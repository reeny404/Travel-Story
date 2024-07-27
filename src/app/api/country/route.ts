import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const response = await supabase.from("country").select("*");

  return NextResponse.json(response.data);
}
