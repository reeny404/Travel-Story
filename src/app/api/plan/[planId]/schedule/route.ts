import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "schedule";

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
