import { NextResponse } from 'next/server';
import { getAllBookings } from '@/backend/services/booking.service';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function GET() {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await getAllBookings();
    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error('Admin Bookings Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
