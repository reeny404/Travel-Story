import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { message: "로그아웃 중 문제 발생" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "서버 오류", error }, { status: 500 });
  }
}
