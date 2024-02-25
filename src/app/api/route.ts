import { NextResponse } from 'next/server';

export const GET = async () => NextResponse.json({ msg: 'Passer' }, { status: 200 });
