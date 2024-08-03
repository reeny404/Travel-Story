import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const { email, nickname } = await request.json();

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ nickname: nickname })
      .eq("email", email);

    if (error) {
      return NextResponse.json(
        { message: "프로필 업데이트 중 오류 발생", error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "업데이트 성공: ", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류 발생: ", error },
      { status: 500 }
    );
  }
}
