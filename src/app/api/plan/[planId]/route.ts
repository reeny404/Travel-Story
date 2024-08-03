import { createClient } from "@/supabase/server";
import { PlanChildType } from "@/types/plan";
import { NextRequest, NextResponse } from "next/server";
import { getTableManager } from "./PlanChildTable";

const TABLE_PLAN = "plan";

type Order = { id: string, type: PlanChildType };

type PostParams = {
  params: { planId: string }
}

export async function POST(request: NextRequest, { params: { planId } }: PostParams) {
  try {
    const requestParameter = await request.json();
    const type: PlanChildType = requestParameter.type;
    const dayIndex: number = requestParameter.dayIndex - 1; // 1부터 시작해서 0부터 시작하도록 변경


    const supabase = createClient();
    const manager = getTableManager(supabase, type);
    if (!manager) {
      throw new SyntaxError("cannot find type : " + type);
    }

    const newData = requestParameter.data;
    const childData = await manager.insert({ ...newData, planId });
    if (!childData) {
      throw new SyntaxError("cannot insert plan child table");
    }

    const { data: planOrder, error: planSelectError } = await supabase
      .from(TABLE_PLAN)
      .select("orderList")
      .eq("id", planId)
      .single();

    if (planSelectError) {
      throw new SyntaxError("supabase error, plan select", { cause: planSelectError })
    }

    const orderList: Array<Array<Array<Order>>> = new Array(planOrder?.orderList) as Array<Array<Array<Order>>>;
    orderList.at(0)?.at(dayIndex)?.push({ id: childData.id, type });

    const orderListJson: string = JSON.stringify(orderList);

    const { data: plan, error } = await supabase
      .from(TABLE_PLAN)
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