import { NextResponse } from 'next/server';
import { deleteGalleryImage } from '@/backend/services/gallery.service';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const imageId = Number(resolvedParams.id);
    if (isNaN(imageId)) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    const deleted = await deleteGalleryImage(imageId);
    if (!deleted) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Gallery API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
