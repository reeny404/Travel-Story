import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const origin = url.origin;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const isTypeExist = request.cookies.get("hasTravelType");

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return NextResponse.redirect(`${origin}/auth/error`);
      }
      const redirectUrl = isTypeExist ? next : `/onboard?next=${next}`;
      return NextResponse.redirect(`${origin}${redirectUrl}`);
    } catch (e) {
      return NextResponse.redirect(`${origin}/auth/error`);
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`);
}
