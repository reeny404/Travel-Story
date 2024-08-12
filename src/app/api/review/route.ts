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
  const imageUrls: string[] = [];
  const imgFiles = data.getAll("imgFile");
  const imgFileName = data.getAll("imgFileName");
  if (imgFiles.length === 0) {
  } else {
    for (let idx = 0; idx < imgFiles.length; idx++) {
      const file = imgFiles[idx];
      const fileName = imgFileName[idx];

      const { data: imgData, error } = await supabase.storage
        .from("review")
        .upload(`public/${Date.now()}_${fileName}`, file);

      if (error) {
        return console.error("Error uploading file:", error);
      }
      const { data: publicData } = await supabase.storage
        .from("review")
        .getPublicUrl(imgData.path);

      imageUrls.push(publicData.publicUrl);
    }
  }
  const userId = data.get("userId") as string;
  const areaId = Number(data.get("areaId"));
  const areaName = data.get("areaName") as string;
  const textValue = data.get("textValue") as string;
  const rating = Number(data.get("rating"));
  const nickname = data.get("nickname") as string;
  const profileImg = data.get("profileImg") as string;
  const { data: reviewData } = await supabase
    .from("areaReview")
    .insert({
      imageUrls: imageUrls,
      userId,
      areaId,
      areaName,
      content: textValue,
      rating,
      nickname,
      profileImg,
    })
    .select("*")
    .single();

  const { data: ratingData, error } = await supabase
    .from("areaReview")
    .select("rating")
    .eq("areaId", areaId);

  const totalRating = ratingData?.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const calcedRate = Number((totalRating! / ratingData?.length!).toFixed(1));
  await supabase.from("area").update({ rating: calcedRate }).eq("id", areaId);
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

export async function PUT(request: NextRequest) {
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
  const imageUrls: string[] = [];
  const imgFiles = data.getAll("imgFile");
  const imgFileName = data.getAll("imgFileName");
  const existedImg = data.getAll("stringImgFile");
  if (existedImg.length !== 0) {
    for (let idx = 0; idx < existedImg.length; idx++) {
      imageUrls.push(existedImg[idx] as string);
      console.log("existedImg[idx]", existedImg[idx]);
    }
  }
  if (imgFiles.length !== 0) {
    for (let idx = 0; idx < imgFiles.length; idx++) {
      const file = imgFiles[idx];
      const fileName = imgFileName[idx];

      const { data: imgData, error } = await supabase.storage
        .from("review")
        .upload(`public/${Date.now()}_${fileName}`, file);

      if (error) {
        return console.error("Error uploading file:", error);
      }
      const { data: publicData } = await supabase.storage
        .from("review")
        .getPublicUrl(imgData.path);

      imageUrls.push(publicData.publicUrl);
    }
  }

  const id = Number(data.get("id"));
  const userId = data.get("userId") as string;
  const areaId = Number(data.get("areaId"));
  const areaName = data.get("areaName") as string;
  const textValue = data.get("textValue") as string;
  const rating = Number(data.get("rating"));

  const { data: reviewData, error: reviewError } = await supabase
    .from("areaReview")
    .update({
      imageUrls: imageUrls,
      userId,
      areaId,
      areaName,
      content: textValue,
      rating,
    })
    .eq("id", Number(id))
    .select("*")
    .single();

  const { data: ratingData, error } = await supabase
    .from("areaReview")
    .select("rating")
    .eq("areaId", areaId);
  const totalRating = ratingData?.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const calcedRate = Number((totalRating! / ratingData?.length!).toFixed(1));
  await supabase.from("area").update({ rating: calcedRate }).eq("id", areaId);
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

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const id = data.id;
  const areaId = data.areaId;
  console.log("areaId", areaId);
  const supabase = createClient();
  const { data: deletedData, error } = await supabase
    .from("areaReview")
    .delete()
    .eq("id", id);

  const { data: ratingData } = await supabase
    .from("areaReview")
    .select("rating")
    .eq("areaId", areaId);
  const totalRating = ratingData?.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const calcedRate = Number((totalRating! / ratingData?.length!).toFixed(1));
  await supabase.from("area").update({ rating: calcedRate }).eq("id", areaId);

  return NextResponse.json("");
}
