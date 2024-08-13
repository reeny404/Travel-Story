import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/** 유저 정보 불러옴 */
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

/** 온보딩에서 받은 user 취향 filter 저장  */
export async function PATCH(request: NextRequest) {
  const filterData = await request.json();
  console.log(filterData);
  const supabase = createClient();

  // 유저 정보 받아오기
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { data: [] },
      {
        status: 200,
        statusText: "permission denied, need login",
      }
    );
  }

  // filter에 업데이트
  const { data, error } = await supabase
    .from("users")
    .update({ filter: filterData })
    .eq("id", user.id);

  if (error) {
    console.error(error);
  }

  return NextResponse.json(data);
}
