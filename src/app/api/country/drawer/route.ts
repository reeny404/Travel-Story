import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const response = await supabase
    .from("country")
    .select("*")
    .order("krName", { ascending: true });

  return NextResponse.json(response.data);
}
