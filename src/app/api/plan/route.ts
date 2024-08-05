import { createClient } from "@/supabase/server";
import { TablesInsert } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "plan";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ data: [] }, {
      status: 200,
      statusText: "permission denied, need login"
    });
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq("userId", user.id)
    .order("createdAt", { ascending: false });

  if (error) {
    return NextResponse.json(data, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`
    })
  }

  return NextResponse.json(data, {
    status: 200,
    statusText: "OK",
  })
}

export async function POST(request: NextRequest) {
  const plan = (await request.json()) as TablesInsert<"plan">;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let title = plan.title;
  if (!title) {
    const nickname = user?.user_metadata.name;
    title = `${nickname ? nickname + "님의 " : "나만의 "} 여행`
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ ...plan, title, userId: user?.id })
    .select();
  console.error(error);

  return NextResponse.json(data);
}