import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // const next = searchParams.get("next") ?? "/";
  const isTypeExist = request.cookies.get("hasTravelType");

  console.log(isTypeExist);
  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return NextResponse.redirect(`${origin}/auth/error`);
      }
      const redirectUrl = isTypeExist ? "/" : "/onboard";
      return NextResponse.redirect(`${origin}${redirectUrl}`);
    } catch (e) {
      return NextResponse.redirect(`${origin}/auth/error`);
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`);
}
