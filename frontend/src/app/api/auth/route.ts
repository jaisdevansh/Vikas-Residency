import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { signToken } from '@/lib/auth';

export const runtime = 'edge';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = await signToken(username);
      
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'auth-token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
