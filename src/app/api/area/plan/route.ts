import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "plan";
type CountryData = {
  krName: string | null;
};
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const supabase = createClient();
  const { data: planData, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("userId", userId!);
  // TODO 현재 로그인한 유저의 정보를 가져와서 filtering 필요
  // .eq("user_id", userId);

  if (error) {
    return NextResponse.json(planData, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`,
    });
  }

  return NextResponse.json(planData, {
    status: 200,
    statusText: "OK",
  });
}

export async function POST(request: NextRequest) {
  const reqData = await request.json();
  const { userId, title, startDate, endDate, areaId } = reqData;
  console.log("areaId", areaId);
  const supabase = createClient();

  const { data } = await supabase
    .from("area")
    .select("country(krName)")
    .eq("id", areaId)
    .single();

  const countryData = data?.country as CountryData;
  const { data: planData, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      userId,
      title,
      country: countryData?.krName,
      startDate,
      endDate,
    })
    .eq("userId", userId);

  if (error) {
    return NextResponse.json(data, {
      status: 400,
      statusText: `[${error.code}] ${error.hint} > ${error.message}`,
    });
  }

  return NextResponse.json(data, {
    status: 200,
    statusText: "OK",
  });
}
