import { createClient } from "@/supabase/server";
import { Account } from "@/types/Account";
import { NextRequest, NextResponse } from "next/server";

const ACCOUNT_BOOK = "accountBook";
const PK_ACCOUNT_ID = "id";
const FK_SCHEDULE_ID = "scheduleId";

type parameters = { params: { accountId: number } };

/**
 * accountId 로 조회한 가계부 수정하기
 * 
 * @param accountId
 */
export async function PUT(request: NextRequest, { params: { accountId } }: parameters) {
  // TODO 세션 사용자 정보와 account 작성자 같은지 체크
  const { amount, type, content }: Account = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase
    .from(ACCOUNT_BOOK)
    .update({ amount, type, content })
    .eq(PK_ACCOUNT_ID, accountId)
    .select()
    .single();

  return NextResponse.json({ data, error });
}

/**
 * accountId 로 조회한 가계부 삭제하기
 * 
 * @param accountId
 */
export async function DELETE(request: NextRequest, { params: { accountId } }: parameters) {
  // TODO 우선 userId를 받고 나중엔 세션 정보 쓰도록 변경 필요
  // TODO 세션 사용자 정보와 account 작성자 같은지 체크

  const supabase = createClient();
  const { error } = await supabase
    .from(ACCOUNT_BOOK)
    .delete()
    .eq(PK_ACCOUNT_ID, accountId)
  // .eq("userId", userId);

  return NextResponse.json({ error }, { status: (!error ? 200 : 403) });
}