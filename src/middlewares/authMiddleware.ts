import constant from '@/common/constant';
import { decryptData } from '@/common/utils/common';
import { verifyJWT } from '@/common/utils/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextRequestWithUser = NextRequest & {
  user?: any;
};

export async function middleware(req: NextRequestWithUser) {
  const publicPaths = ['/api/login', '/api/signup'];
  if (publicPaths.includes(req.nextUrl.pathname)) {
    console.log("Hello ::", req.nextUrl.pathname);
    return NextResponse.next();
  }
  const token = sessionStorage.getItem(constant.encrypted_constant.userToken) || null;
  if (!token) {
    throw new Error('Unauthorized: Token not found');
  }
  const decryptedToken = decryptData(token);
  const decodedData = verifyJWT(decryptedToken);
  if (!decodedData) {
    throw new Error('Unauthorized: Invalid token');
  }
  try {
    req.user = decodedData;
    return NextResponse.next();
  } catch (error) {
    throw new Error('Unauthorized: Invalid token');
  }
}
