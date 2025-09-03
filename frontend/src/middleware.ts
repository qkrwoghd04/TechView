import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const { pathname, searchParams } = request.nextUrl;

  // if (process.env.NODE_ENV === 'development') {
  //   const bypass = searchParams.get('bypass');
  //   if (bypass === '123') {
  //     return NextResponse.next();
  //   }
  // }

  // admin 하위 페이지 보호
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // admin 하위 전부 적용
};
