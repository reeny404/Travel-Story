import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") as string;

  if (!email) {
    return NextResponse.json(
      { message: "이메일이 존재하지 않습니다." },
      { status: 400 }
    );
  }
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (data) {
      return NextResponse.json(
        { message: "사용자가 존재합니다.", data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "사용자가 존재하지 않습니다.", data },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "서버 오류", error }, { status: 500 });
  }
}
