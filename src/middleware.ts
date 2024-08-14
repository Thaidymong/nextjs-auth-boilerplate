import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/jwt/jwt";

// 1. Specify protected and public routes
const publicRoutes = ["/login", "/sing-up"];
const protectedRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  // 1.Get session or token from cookie storage
  const token = cookies().get("sessions")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const accessToken = request.cookies.get("accessToken")?.value;

  // 3. decoded token
  const payload = await decrypt(token);

  // Authentication Middleware
  if (isProtectedRoute && !accessToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    return response;
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next/static|_next/image|Icon|favicon.ico).*)"],
};
