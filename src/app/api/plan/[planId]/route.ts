import { createClient } from "@/supabase/server";
import { PlanChildType } from "@/types/plan";
import { NextRequest, NextResponse } from "next/server";
import { getTableManager } from "./PlanChildTable";

type Order = { id: string, type: PlanChildType };

type PostParams = {
  params: { planId: string }
}

export async function POST(request: NextRequest, { params: { planId } }: PostParams) {
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

    const orderList = planOrder?.orderList as Array<Array<Order>>;
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
      statusText: "OK",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, {
      status: 400,
    })
  }
}