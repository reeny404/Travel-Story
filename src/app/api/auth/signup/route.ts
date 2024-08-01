import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const { email, password, nickname } = await request.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname,
          image_url: "",
        },
      },
    });

    if (error) {
      console.error("signUp error message:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "회원가입 완료" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "서버 오류", error }, { status: 500 });
  }
};
