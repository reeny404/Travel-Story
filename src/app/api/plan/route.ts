import { createClient } from "@/supabase/server";
import { TablesInsert } from "@/types/supabase";
import { PlanUtil } from "@/utils/PlanUtil";
import { NextRequest, NextResponse } from "next/server";

/**
 * 내 plan 목록 가져오기
 */
export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ data: [] }, {
      status: 200,
      statusText: "permission denied, need login"
    });
  }

  const { data, error } = await supabase
    .from("plan")
    .select()
    .eq("userId", user.id)
    .order("createdAt", { ascending: false });

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

/**
 * plan 생성하기
 */
export async function POST(request: NextRequest) {
  const plan = (await request.json()) as TablesInsert<"plan">;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = plan.title ?? PlanUtil.getTitle(user?.user_metadata);
  const orderList = PlanUtil.order.init(plan.startDate, plan.endDate);
  const { data, error } = await supabase
    .from("plan")
    .insert({ ...plan, title, userId: user?.id, orderList })
    .select();

  if (error) {
    console.error(error);
  }

  return NextResponse.json(data);
}