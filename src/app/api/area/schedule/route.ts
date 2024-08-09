import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "schedule";
type Order = { id?: string; type?: string };

export async function POST(request: NextRequest) {
  const reqData = await request.json();
  const { planId, userId, areaId, orderList, krName, day, type, latlng } =
    reqData;
  const supabase = createClient();

  const scheduleData = {
    planId,
    areaId,
    type,
    latlng,
    title: krName,
    place: krName,
  };
  const newOrderList: Order[][] = orderList;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(scheduleData)
    .select("id")
    .single();

  if (!data) {
    return console.log(error);
  }
  newOrderList[day - 1].push({ id: data?.id, type });

  const { data: planData, error: planError } = await supabase
    .from("plan")
    .update({
      orderList: newOrderList,
    })
    .eq("id", planId);

  if (planError) {
    return console.log(planError);
  }

  return NextResponse.json("");
}
