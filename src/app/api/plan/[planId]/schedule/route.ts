import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "schedule";

type GetParameter = {
  params: { planId: string }
};

export async function GET(request: NextRequest, { params: { planId } }: GetParameter) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq("planId", planId);

  return NextResponse.json({
    data, error,
    status: 200,
    statusText: error ? `[${error.code}] ${error.hint} > ${error.message}` : "OK"
  });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { planId, title, place, memo, type, startTime, endTime, images } =
      await request.json();

    const { data, error } = await supabase.from(TABLE_NAME).insert([
      {
        planId,
        title,
        place,
        memo,
        type,
        startTime,
        endTime,
        imagesUrl: images,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { error: `[${error.code}] ${error.hint} > ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const { id, planId, title, place, memo, type, startTime, endTime, images } =
      await request.json();
    console.log(
      id,
      planId,
      title,
      place,
      memo,
      type,
      startTime,
      endTime,
      images
    );
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        planId,
        title,
        place,
        memo,
        type,
        startTime,
        endTime,
        imagesUrl: images,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `[${error.code}] ${error.hint} > ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
