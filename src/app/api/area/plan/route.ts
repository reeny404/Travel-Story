import { createClient } from "@/supabase/server";
import { Order } from "@/types/plan";
import { PlanUtil } from "@/utils/PlanUtil";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "plan";
// TODO 이거 Plan쪽으로 옮겨야댐
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const supabase = createClient();
  const { data: planData, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("userId", userId!);

  if (error) {
    return NextResponse.json(planData, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`,
    });
  }

  return NextResponse.json(planData, {
    status: 200,
    statusText: "OK",
  });
}

export async function POST(request: NextRequest) {
  const reqData = await request.json();
  const { userId, title, startDate, endDate, areaId } = reqData;
  const supabase = createClient();

  const { data } = await supabase
    .from("area")
    .select("country(krName)")
    .eq("id", areaId);
  if (!data) {
    return;
  }

  const orderList: Order[][] = PlanUtil.order.init(startDate, endDate);
  const countryData = data[0]?.country?.krName;
  const { data: planData, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      userId,
      title,
      country: countryData,
      orderList,
      startDate,
      endDate,
    })
    .eq("userId", userId);

  if (error) {
    return NextResponse.json(data, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`,
    });
  }

  return NextResponse.json(data, {
    status: 200,
    statusText: "OK",
  });
}
