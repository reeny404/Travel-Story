import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const userId = data.userId;
  const areaId = data.areaId;
  console.log("userId, areaId", userId, areaId);
  const supabase = createClient();

  const { data: insertedData } = await supabase
    .from("areaBookmark")
    .insert({ userId, areaId })
    .select();
  console.log("insertedData", insertedData);
  return NextResponse.json(insertedData);
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const userId = data.userId;
  const areaId = data.areaId;

  const supabase = createClient();

  const { data: deletedData } = await supabase
    .from("areaBookmark")
    .delete()
    .eq("userId", userId)
    .eq("areaId", areaId)
    .select();

  return NextResponse.json(deletedData);
}
