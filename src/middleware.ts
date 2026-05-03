import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get("agro_auth_role")?.value;

  if (pathname.startsWith("/admin")) {
    if (!role) return NextResponse.redirect(new URL("/login", request.url));
    if (role !== "admin") return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/agricultor")) {
    if (!role) return NextResponse.redirect(new URL("/login", request.url));
    if (role !== "agricultor") return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/institucional")) {
    if (!role) return NextResponse.redirect(new URL("/login", request.url));
    if (role !== "institucion" && role !== "admin")
      return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agricultor/:path*", "/institucional/:path*"],
};
