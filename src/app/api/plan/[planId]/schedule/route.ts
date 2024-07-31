import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "schedule";
const PLAN_TABLE_NAME = "plan";

type OrderListEntry = {
  type: string;
  id: string;
};

type PlanData = {
  orderList: OrderListEntry[][] | null;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      planId,
      title,
      place,
      memo,
      type,
      startTime,
      endTime,
      images,
      day,
    } = await request.json();

    // 새로운 스케줄 삽입
    const { data: insertData, error: insertError } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          planId,
          title,
          place,
          memo,
          type,
          startTime,
          endTime,
          imagesUrl: images,
        },
      ])
      .select();

    if (insertError) {
      console.error("Insert Error:", insertError);
      return NextResponse.json(
        {
          error: `[${insertError.code}] ${insertError.hint} > ${insertError.message}`,
        },
        { status: 400 }
      );
    }

    // 삽입된 스케줄 ID 가져오기
    const insertedSchedule = insertData[0];
    const newScheduleEntry: OrderListEntry = {
      type: type,
      id: insertedSchedule.id,
    };

    // plan 테이블의 orderList 가져오기
    const { data: planData, error: planError } = await supabase
      .from(PLAN_TABLE_NAME)
      .select("orderList")
      .eq("id", planId)
      .single();

    if (planError) {
      console.error("Plan Retrieval Error:", planError);
      return NextResponse.json(
        {
          error: `[${planError.code}] ${planError.hint} > ${planError.message}`,
        },
        { status: 400 }
      );
    }

    const planDataParsed = planData as PlanData;

    // orderList 업데이트
    let updatedOrderList: OrderListEntry[][] = planDataParsed.orderList || [];
    // orderList가 빈 배열일 경우 초기화
    while (updatedOrderList.length < day) {
      updatedOrderList.push([]);
    }

    updatedOrderList[day - 1].push(newScheduleEntry);

    // plan 테이블의 orderList 업데이트
    const { error: updateError } = await supabase
      .from(PLAN_TABLE_NAME)
      .update({ orderList: updatedOrderList })
      .eq("id", planId);

    if (updateError) {
      console.error("Update Error:", updateError);
      return NextResponse.json(
        {
          error: `[${updateError.code}] ${updateError.hint} > ${updateError.message}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: insertData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
