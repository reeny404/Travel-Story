import { AuthError, SupabaseClient, User } from "@supabase/supabase-js";

async function getUser(supabase: SupabaseClient): Promise<User> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) {
    console.debug("getRecentPlan: need login", authError);
    throw new AuthError("need login", 401);
  }

  return user;
}

export const AuthUtil = {
  getUser
} 