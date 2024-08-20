import { SupabaseClient, User } from "@supabase/supabase-js";

async function getUser(supabase: SupabaseClient): Promise<User | null> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user) {
    console.debug("need login", error);
    return null;
  }

  return user;
}

export const AuthUtil = {
  getUser
} 