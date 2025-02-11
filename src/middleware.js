import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from login or signup pages
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect dashboard routes for non-authenticated users
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
