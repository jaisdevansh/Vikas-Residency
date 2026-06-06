import { NextResponse } from 'next/server';
import { getRooms } from '@/backend/services/property.service';

export const runtime = 'edge';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const rooms = await getRooms();
    
    // Map 'name' back to 'title' for frontend compatibility if needed
    const formattedRooms = rooms.map((room: any) => ({
      ...room,
      title: room.title || room.name
    }));

    return NextResponse.json({ success: true, rooms: formattedRooms }, { status: 200 });
  } catch (error) {
    console.error('Rooms API Error:', error);
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        success: true, 
        mocked: true, 
        rooms: [
          { id: 1, title: 'Premium Ganga View Room', price: 3500, capacity: 2 },
          { id: 2, title: 'Family Suite', price: 5500, capacity: 4 }
        ] 
      }, { status: 200 });
    }
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
