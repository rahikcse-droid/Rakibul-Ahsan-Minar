import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getTokenFromRequest } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (pathname === '/admin/login') {
    const token = getTokenFromRequest(request);
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};