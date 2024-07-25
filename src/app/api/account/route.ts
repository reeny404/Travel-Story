import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_BOOK = "accountBook";
const FK_SCHEDULE_ID = "scheduleId";

/**
 * scheduleId로 account 를 조회한다.
 * 
 * @param scheduleId
 */
export async function GET(request: NextRequest) {
  const scheduleId = request.nextUrl.searchParams.get(FK_SCHEDULE_ID);

  const supabase = createClient();
  const { data, error } = await supabase
    .from(ACCOUNT_BOOK)
    .select()
    .eq(FK_SCHEDULE_ID, scheduleId)
    .single();


  return NextResponse.json({ data, error, status: 200, message: "OK" });

  // return NextResponse.json({ data, error, status: 200, message: "OK" }, error ? {
  //   status: 500,
  //   statusText: `[${error.code}] ${error.hint} > ${error.message}`
  // } : {
  //   status: 200,
  //   statusText: "OK",
  // });

}

/**
 * account 생성한다.
 * @param scheduleId
 */
export async function POST(request: NextRequest) {
}
