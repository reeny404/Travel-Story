import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { email, password } = await request.json();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (
        error.status === 400 &&
        error.message === "Invalid login credentials"
      ) {
        return NextResponse.json(
          { message: "비밀번호가 틀렸습니다." },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: error.message },
        { status: error.status || 400 }
      );
    }

    return NextResponse.json({ message: "로그인 성공", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "서버 오류", error }, { status: 500 });
  }
}
