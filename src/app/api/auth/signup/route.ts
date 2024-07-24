import { createClient } from "@/supabase/server";

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.formData();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        nickname: formData.get("nickname") as string,
      },
    },
  });

  if (error) {
    console.log("signUp error message:", error);
  }
};
