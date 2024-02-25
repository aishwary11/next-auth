import { generateJWT } from '@/common/utils/jwt';
import User from '@/model/User';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();
  const foundUser = await User.findOne({ email });
  const isPassCorrect = await bcrypt.compare(password, foundUser.password);
  if (foundUser && isPassCorrect) {
    const token = generateJWT({ email, password });
    return NextResponse.json({ msg: 'Login Successful', token }, { status: 200 });
  } else return NextResponse.json({ msg: 'Invalid User' }, { status: 400 });
};
