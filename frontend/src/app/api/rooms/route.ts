import { NextResponse } from 'next/server';
import { getRooms, createRoom } from '@/backend/services/property.service';
import { checkApiAuth } from '@/lib/auth';

export async function GET() {
  try {
    const rooms = await getRooms();
    
    const formattedRooms = rooms.map((room: any) => ({
      ...room,
      title: room.title || room.name
    }));

    return NextResponse.json({ success: true, rooms: formattedRooms }, { status: 200 });
  } catch (error) {
    console.error('Rooms API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthenticated = await checkApiAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, price, capacity, image_url } = body;

    if (!name || price === undefined || capacity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRoom = await createRoom({ name, price: Number(price), capacity: Number(capacity), image_url });
    return NextResponse.json({ success: true, room: newRoom }, { status: 201 });
  } catch (error) {
    console.error('Rooms API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
