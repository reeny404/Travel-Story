import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { AuthUtil } from "./../auth/AuthUtil";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const userId = (await AuthUtil.getUser(supabase))?.id;
  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const { data, error } = await supabase
    .from("areaBookmark")
    .select("*, area(*)")
    .eq("userId", userId);
  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: { status: 500, message: error.message },
      data: null,
    });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: data,
    error: null,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const areaId = data.areaId;
  const supabase = createClient();
  const userId = (await AuthUtil.getUser(supabase))?.id;
  if (!userId || !areaId) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const { data: areaData } = await supabase
    .from("area")
    .select("lat,lng")
    .eq("id", areaId)
    .single();
  if (!areaData) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }
  const { lat, lng } = areaData;
  const { data: insertedData } = await supabase
    .from("areaBookmark")
    .insert({ userId, areaId, lat, lng })
    .select();

  if (!insertedData || insertedData.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  return NextResponse.json(insertedData);
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const areaId = data.areaId;

  const supabase = createClient();
  const userId = (await AuthUtil.getUser(supabase))?.id;
  if (!userId) {
    return NextResponse.json(null);
  }

  const { data: deletedData } = await supabase
    .from("areaBookmark")
    .delete()
    .eq("userId", userId)
    .eq("areaId", areaId)
    .select();

  return NextResponse.json(deletedData);
}
