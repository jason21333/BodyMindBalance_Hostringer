import { NextResponse } from 'next/server';

// List of public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/appointments',
  '/api/doctors',
  '/api/services',
  '/api/contact',
  '/api/db/check',
  '/api/db/setup',
  '/api/debug/data',
];

export async function middleware(request) {
  // Check if the path is public
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // For all other routes, allow access (no authentication required for main website)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 