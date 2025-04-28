import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge-compatible middleware - removed DB initialization which isn't compatible
// with edge runtime
export async function middleware(request: NextRequest) {
  // Just pass through the request
  return NextResponse.next();
}

// Match only admin-related API paths to reduce overhead
export const config = {
  matcher: ['/api/admin/:path*', '/api/auth/:path*'],
}; 