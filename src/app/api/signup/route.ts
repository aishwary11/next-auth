import connectDB from '@/common/utils/db';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    const user = await req.json();
    const savedUser = await new User(user).save();
    if (savedUser) {
      return NextResponse.json({ msg: `${user.userName} saved successfully` }, { status: 200 });
    } else {
      return NextResponse.json({ msg: `Error while saving user` }, { status: 409 }); // Conflict
    }
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ msg: 'Email already exists' }, { status: 409 }); // Conflict
    } else {
      return NextResponse.json({ msg: `Error while saving user: ${error.message}` }, { status: 400 });
    }
  }
};
