import { NextResponse } from 'next/server';
import { getBookingStats, getRecentBookings } from '@/backend/services/booking.service';
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

    const stats = await getBookingStats();
    const recentBookings = await getRecentBookings(5);
    
    return NextResponse.json({ 
      success: true, 
      stats: {
        ...stats,
        recentBookings
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('Admin Stats Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
