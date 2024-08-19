import { createClient } from "@/supabase/server";
import { Account } from "@/types/Account";
import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_BOOK = "accountBook";

type Parameter = { params: { planId: number } };

export async function PUT(
  request: NextRequest,
  { params: { planId } }: Parameter
) {
  const {
    area,
    amount,
    type,
    payType,
    desc: content,
  }: Account = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase
    .from(ACCOUNT_BOOK)
    .update({ area, amount, type, payType, content })
    .eq("planId", planId)
    .select()
    .single();

  return NextResponse.json({ data, error });
}
