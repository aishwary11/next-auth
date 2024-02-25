import constant from '@/common/constant';
import { encryptData } from '@/common/utils/common';
import connectDB from '@/common/utils/db';
import { generateJWT } from '@/common/utils/jwt';
import User from '@/model/User';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDB();
  const { email, password } = await req.json();
  const foundUser = await User.findOne({ email });
  const isPassCorrect = await bcrypt.compare(password, foundUser.password);
  if (foundUser && isPassCorrect) {
    const token = generateJWT({ email, password });
    const response = NextResponse.json({ msg: 'Login Successful' }, { status: 200 });
    response.cookies.set(constant.encrypted_constant.userToken, encryptData(token), { httpOnly: true });
    return response;
  } else return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
};
