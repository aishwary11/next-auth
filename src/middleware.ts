import constant from '@/common/constant';
import { NextRequest, NextResponse } from 'next/server';

type NextRequestWithUser = NextRequest & {
  user?: any;
};
export const config = {
  matcher: ['/', '/login', '/signup', '/about'],
};

export async function middleware(req: NextRequestWithUser) {
  const path = req.nextUrl.pathname;
  const isPublicPath = ['/login', '/signup'].includes(path);
  const token = req.cookies.get(constant.encrypted_constant.userToken)?.value || '';
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/about', req.nextUrl));
  }
  if (!isPublicPath && (!token || token === '')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  return NextResponse.next();
}
