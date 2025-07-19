// Middleware disabled for static export
// This file is kept for compatibility but middleware is not used in static builds

import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Allow all requests for static export
  return NextResponse.next();
}

export const config = {
  matcher: [],
}; 