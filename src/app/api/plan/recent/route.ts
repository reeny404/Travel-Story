import { createClient } from "@/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) {
    console.debug("getRecentPlan: need login", authError);
    throw new AuthError("need login", 401);
  }

  try {
    const { data, error } = await supabase.from("plan")
      .select("*, schedule(*)").eq("userId", user.id)
      .order("createdAt", { ascending: false })
      .range(0, 0)
      .maybeSingle();

    return NextResponse.json({ data, error });
  } catch (e) {
    console.error("getRecentPlan: unknown", e);
    return NextResponse.json({ error: e }, { status: 400 })
  }
}