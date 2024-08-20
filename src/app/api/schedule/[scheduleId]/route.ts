import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

type Parameter = { params: { scheduleId: string } };

const SCHEDULE = "schedule";
const PK_SCHEDULE_ID = "id";
/**
 * scheduleId 로 조회한 schedule
 *
 * @param scheduleId
 */
export async function GET(
  request: Request,
  { params }: { params: { scheduleId: string } }
) {
  const scheduleId = params?.scheduleId;
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SCHEDULE)
    .select()
    .eq(PK_SCHEDULE_ID, scheduleId)
    .single();

  return NextResponse.json({ data, error });
}
