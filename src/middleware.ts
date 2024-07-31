import { updateSession } from "@/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  if (pathname === "/") {
    const isLoggedIn = request.cookies.get(
      "sb-yqoupynehwgshtspamuf-auth-token.0"
    );
    const hasTravelType = request.cookies.get("hasTravelType");

    if (!isLoggedIn) {
      if (!hasTravelType) {
        url.pathname = "/onboard";
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
