import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Routes
  // If the user tries to access /admin routes, check for a secure auth token
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect unauthenticated users to a secure login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Additional Security measure: Enforce HTTPS on external environments
  const response = NextResponse.next();
  if (process.env.NODE_ENV === 'production') {
    if (request.headers.get('x-forwarded-proto') !== 'https') {
      const httpsUrl = request.url.replace(/^http:/, 'https:');
      // Uncomment the below line if not using Vercel (which handles HTTPS automatically)
      // return NextResponse.redirect(httpsUrl, 301);
    }
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt).*)',
  ],
};
