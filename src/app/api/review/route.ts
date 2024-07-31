import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("areaReview")
    .select("*")
    .eq("areaId", id);

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
  const data = await request.formData();

  if (!data) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();
  const imgFiles = data.getAll("imgFile");
  const imgFileName = data.getAll("imgFileName");
  const imageUrls: string[] = [];

  for (let idx = 0; idx < imgFiles.length; idx++) {
    const file = imgFiles[idx];
    const fileName = imgFileName[idx];

    const { data: imgData, error } = await supabase.storage
      .from("review")
      .upload(`public/${Date.now()}_${fileName}`, file);

    if (error) {
      console.error("Error uploading file:", error);
      continue;
    }

    const { data: publicData } = await supabase.storage
      .from("review")
      .getPublicUrl(imgData.path);

    imageUrls.push(publicData.publicUrl);
  }

  const userId = data.get("userId") as string;
  const areaId = Number(data.get("areaId"));
  const areaName = data.get("areaName") as string;
  const textValue = data.get("textValue") as string;
  const rating = Number(data.get("rating"));

  const { data: reviewData } = await supabase
    .from("areaReview")
    .insert({
      imageUrls: JSON.stringify(imageUrls),
      userId,
      areaId,
      areaName,
      content: textValue,
      rating,
    })
    .select("*")
    .single();

  if (!reviewData) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  if (!reviewData) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  return NextResponse.json("");
}
