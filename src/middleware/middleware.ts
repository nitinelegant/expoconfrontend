import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value;

  if (!user && !request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user) {
    const userData = JSON.parse(user);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      userData.user_role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/staff") &&
      userData.role !== "staff"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/dashboard/:path*", "/"],
};
