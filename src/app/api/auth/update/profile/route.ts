import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const id = formData.get("id") as string;

  const filePath = `${id}/${file.name}`;

  try {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("profiles")
      .upload(filePath, file);

    const { data } = supabase.storage.from("profiles").getPublicUrl(filePath);

    const { data: tableData, error: tableError } = await supabase
      .from("users")
      .update({ image_url: data.publicUrl })
      .eq("id", id);

    if (storageError) {
      return NextResponse.json(
        {
          message: "스토리지 업데이트 중 오류 발생",
          error: storageError,
        },
        { status: 400 }
      );
    } else if (tableError) {
      return NextResponse.json(
        {
          message: "프로필 업데이트 중 오류 발생",
          error: tableError,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "업데이트 성공: ", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류 발생: ", error },
      { status: 500 }
    );
  }
}
