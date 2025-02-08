import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Ensure you have this installed

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value; // Retrieve the token from cookies
  const { pathname } = req.nextUrl;

  // Helper function to validate the token
  const isValidToken = (token) => {
    if (!token) return false;
    try {
      // Replace "your_secret_key" with your actual JWT secret key
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      return true;
    } catch (err) {
      return false; // Token is invalid or expired
    }
  };

  if (pathname.startsWith("/dashboard")) {
    // Redirect to login if the token is missing or invalid
    if (!isValidToken(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/login")) {
    // If a valid token exists, redirect to the homepage
    if (isValidToken(token)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = { matcher: ["/dashboard", "/login"] };
