import { NextResponse } from "next/server";

export function middleware(req) {
  const userType = req.cookies.get("userType"); // Or fetch from token/state

  const adminRoutes = ["/admin", "/admin/dashboard"];
  const staffRoutes = ["/staff", "/staff/dashboard"];

  if (
    adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    userType !== "1"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    staffRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    userType !== "2"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
