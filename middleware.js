import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Get the session token from cookies
    const sessionToken = request.cookies.get('session_token')?.value;

    // If there's no session token, redirect to login
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 