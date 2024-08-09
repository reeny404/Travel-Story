import { SupabaseClient, User } from "@supabase/supabase-js";

async function getUser(supabase: SupabaseClient): Promise<User | null> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user) {
    console.warn("getRecentPlan: need login", error);
    // throw new AuthError("need login", 401);
    return null;
  }

  return user;
}

export const AuthUtil = {
  getUser
} 