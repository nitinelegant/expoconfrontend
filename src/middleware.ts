import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const user = localStorage.getItem("user");
  const isAuthPage = request.nextUrl.pathname.startsWith("/");

  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authToken && isAuthPage && user === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (authToken && isAuthPage && user === "staff") {
    return NextResponse.redirect(new URL("/staff", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
