import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_BOOK = "accountBook";
const FK_SCHEDULE_ID = "planId";

export async function GET(request: NextRequest) {
  const planId = request.nextUrl.searchParams.get(FK_SCHEDULE_ID);
  if (!planId) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "플랜 아이디가 없습니다. :" + planId,
    });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from(ACCOUNT_BOOK)
    .select()
    .eq(FK_SCHEDULE_ID, planId);

  return NextResponse.json(
    data,
    error
      ? {
          status: 400,
          statusText: `[${error.code}] ${error.hint} > ${error.message}`,
        }
      : {
          status: 200,
          statusText: "OK",
        }
  );
}
