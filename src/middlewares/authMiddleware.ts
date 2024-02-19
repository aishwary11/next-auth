import { verifyJWT } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: '/api/:path*'
};

type NextRequestWithUser = NextRequest & {
  user?: any;
};

export async function middleware(req: NextRequestWithUser) {
  const publicPaths = ['/api/login', '/api/signup'];
  if (publicPaths.includes(req.nextUrl.pathname)) return NextResponse.next();
  const token = sessionStorage.getItem('token');
  if (!token) return new Error('Error :: in token');
  try {
    req.user = verifyJWT(token);
  } catch (error) {
    throw new Error("Error");
  }
  NextResponse.next();
}