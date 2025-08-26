import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("Middleware hit for:", pathname); // Debug log
  const publicPaths = ["/auth", "/blog", "/api", "/favicon.ico"];

  // Allow public routes
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check JWT token in cookies
  const token = request.cookies.get("token")?.value;
  if (!token) {
   
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
     console.log("Token valid, proceeding");
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Protect these routes
export const config = {
  matcher: [ "/post" ],
};