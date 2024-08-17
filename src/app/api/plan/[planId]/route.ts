import { createClient } from "@/supabase/server";
import { ApiResponse } from "@/types/ApiResponse";
import { OrderList, PlanChildType, PlanFull } from "@/types/plan";
import { Tables } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";
import { AuthUtil } from "../../auth/AuthUtil";
import { getTableManager } from "./PlanChildTable";

type Params = {
  params: { planId: string }
}

/**
 * planId, day 기준으로 plan 하위 테이블들 조회
 */
export async function GET(request: NextRequest, { params: { planId } }: Params): Promise<NextResponse<ApiResponse<PlanFull | null>>> {
  try {
    // day는 1부터 시작
    const { searchParams } = new URL(request.url);
    const day = searchParams.get("day");
    const dayIndex = Number(day) - 1;

    if (isNaN(dayIndex)) {
      throw SyntaxError("cannot parse param.day" + dayIndex);
    }

    const supabase = createClient();
    const { data: plan, error } = await supabase
      .from("plan")
      .select("*, schedules:schedule(*)")
      .eq("id", planId)
      .single();

    if (!plan) {
      throw new Error("cannot found data", { cause: error });
    }
    const { orderList, schedules } = plan;
    const orders = (orderList as OrderList)[dayIndex] ?? [];
    const filteredSchedules: Tables<"schedule">[] = orders.map(order => {
      const schedule = schedules?.find(schedule => schedule.id === order.id);
      if (!schedule?.latlng) {
        return null;
      }

      return Object.keys(schedule.latlng).length ? schedule : null;
    }).filter(schedule => !!schedule);

    return NextResponse.json({ data: { ...plan, schedules: filteredSchedules }, error });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ data: null, error: e }, { status: 400, statusText: "something wrong" });
  }
}

/**
 * plan 하위 테이블(schedule, memo, moveSchedule 등) insert
 */
export async function POST(request: NextRequest, { params: { planId } }: Params) {
  try {
    const requestParameter = await request.json();
    const type: PlanChildType = requestParameter.type;
    const dayIndex: number = Number(requestParameter.dayIndex) - 1; // 1부터 시작해서 0부터 시작하도록 변경

    const supabase = createClient();
    const manager = getTableManager(supabase, type);
    if (!manager) {
      throw new SyntaxError("cannot find type : " + type);
    }

    // plan 하위 테이블 insert
    const newData = requestParameter.data;
    const childData = await manager.insert({ ...newData, planId });
    if (!childData) {
      throw new SyntaxError("cannot insert plan child table");
    }

    // plan.orderList update 하기
    const { data: planOrder, error: planSelectError } = await supabase
      .from("plan")
      .select("orderList")
      .eq("id", planId)
      .single();

    if (planSelectError) {
      throw new SyntaxError("supabase error, plan select", { cause: planSelectError })
    }

    const orderList = planOrder?.orderList as OrderList;
    orderList.at(dayIndex)?.push({ id: childData.id, type });

    const { data: plan, error } = await supabase
      .from("plan")
      .update({ orderList })
      .eq("id", planId);

    if (error) {
      throw new SyntaxError("supabase error, plan update", { cause: error })
    }

    return NextResponse.json({ plan }, {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, {
      status: 400,
    })
  }
}

/**
 * plan 하위 테이블의 특정 row 수정
 * // TODO 위치 옮겨야할 듯
 */
export async function PUT(request: NextRequest) {
  try {
    const newData = await request.json();

    const supabase = createClient();
    const type: PlanChildType = newData.type;
    const manager = getTableManager(supabase, type);
    if (!manager) {
      throw new SyntaxError("cannot find type : " + type);
    }

    const data = await manager.update(newData.id, newData);

    return NextResponse.json({ data }, {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, {
      status: 400,
    })
  }
}

export async function DELETE(request: NextRequest, { params: { planId } }: Params) {
  const supabase = createClient();
  const userId = (await AuthUtil.getUser(supabase))?.id;
  if (!userId) {
    return NextResponse.json({}, { status: 403, statusText: "need login" });
  }

  const { data, error } = await supabase
    .from("plan")
    .delete()
    .eq("id", planId)
    .eq("userId", userId);

  return NextResponse.json({ data, error });
}