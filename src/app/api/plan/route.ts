import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "plan";

export async function GET(_: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
  // TODO 현재 로그인한 유저의 정보를 가져와서 filtering 필요
  // .eq("user_id", userId);

  if (error) {
    return NextResponse.json(data, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`
    })
  }

  return NextResponse.json(data, {
    status: 200,
    statusText: "OK",
  })
}