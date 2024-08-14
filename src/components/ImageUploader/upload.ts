import { createClient } from "@/supabase/client";

export async function upload(file: File, bucket: { name: string, path: string }): Promise<string> {
  const fileEx = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()}.${fileEx}`;
  const filePath = `${bucket.path}/${fileName}`;

  const supabase = createClient();
  const { error: uploadError } = await supabase.storage
    .from(bucket.name)
    .upload(filePath, file);
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: image } = supabase.storage
    .from(bucket.name)
    .getPublicUrl(filePath);

  return image.publicUrl;
}