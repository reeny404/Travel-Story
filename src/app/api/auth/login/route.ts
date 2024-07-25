import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error.message);
    return NextResponse.json({ message: "로그인 실패" }, { status: 400 });
  }

  return NextResponse.json({ message: "로그인 성공", data }, { status: 200 });
}
