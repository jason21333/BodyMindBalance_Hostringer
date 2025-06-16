import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// List of public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/appointments',
  '/api/doctors',
  '/api/services',
];

export async function middleware(request) {
  console.log('Middleware processing request:', request.nextUrl.pathname);

  // Check if the path is public
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    console.log('Public path accessed:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Admin path accessed:', request.nextUrl.pathname);
    
    // Allow access to admin login page
    if (request.nextUrl.pathname === '/admin/login') {
      console.log('Admin login page accessed');
      return NextResponse.next();
    }

    try {
      // Get the token from the cookies
      const token = request.cookies.get('token')?.value;
      
      if (!token) {
        console.log('No token found, redirecting to admin login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Check if the user is an admin
      if (payload.role !== 'admin') {
        console.log('Non-admin user attempting to access admin area');
        return NextResponse.redirect(new URL('/', request.url));
      }

      console.log('Admin access granted for:', payload.email);
      return NextResponse.next();
    } catch (error) {
      console.error('Error in admin middleware:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For all other routes, check for authentication
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      console.log('No token found for protected route');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    
    console.log('Authentication successful');
    return NextResponse.next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
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