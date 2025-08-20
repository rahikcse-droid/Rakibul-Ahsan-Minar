// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Simple token existence check - the actual verification should be done on the server side
    try {
      // Basic JWT structure check (has 3 parts separated by dots)
      const parts = token.split(".");
      if (parts.length !== 3) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      // Check if token is expired by decoding the payload
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        // Token is expired, redirect to login
        const response = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        response.cookies.delete("admin-token");
        return response;
      }
    } catch (error) {
      // If token parsing fails, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin-token")?.value;
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          // If token exists and is not expired, redirect to dashboard
          if (!payload.exp || payload.exp > currentTime) {
            return NextResponse.redirect(
              new URL("/admin/dashboard", request.url)
            );
          }
        }
      } catch (error) {
        // If token parsing fails, allow access to login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
