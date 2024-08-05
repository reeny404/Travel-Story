import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

type CheckItemType = {
  text: string;
  isCheck: boolean;
};

export async function PUT(request: Request) {
  const { itemId, checkIndex, isChecked } = await request.json();

  try {
    const supabase = createClient();

    const { data: memoItem, error: fetchError } = await supabase
      .from("memo")
      .select("check")
      .eq("id", itemId)
      .single();

    if (fetchError || !memoItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const checkList = memoItem.check as CheckItemType[] | null;

    if (!Array.isArray(checkList)) {
      return NextResponse.json(
        { error: "Check list is not valid" },
        { status: 400 }
      );
    }

    const updatedCheck = checkList.map((checkItem, index) =>
      index === checkIndex ? { ...checkItem, isCheck: isChecked } : checkItem
    );

    const { error: updateError } = await supabase
      .from("memo")
      .update({ check: updatedCheck })
      .eq("id", itemId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating check state:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
