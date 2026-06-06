import { NextResponse } from 'next/server';
import { updateRoom, deleteRoom } from '@/backend/services/property.service';
import { checkApiAuth } from '@/lib/auth';

type Props = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, { params }: Props) {
  try {
    const isAuthenticated = await checkApiAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const roomId = Number(resolvedParams.id);
    if (isNaN(roomId)) {
      return NextResponse.json({ error: 'Invalid room ID' }, { status: 400 });
    }

    const body = await req.json();
    const updatedRoom = await updateRoom(roomId, body);
    
    if (!updatedRoom) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, room: updatedRoom }, { status: 200 });
  } catch (error) {
    console.error('Rooms API PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const isAuthenticated = await checkApiAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const roomId = Number(resolvedParams.id);
    if (isNaN(roomId)) {
      return NextResponse.json({ error: 'Invalid room ID' }, { status: 400 });
    }

    const deleted = await deleteRoom(roomId);
    if (!deleted) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Room deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Rooms API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
