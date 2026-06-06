import { NextResponse } from 'next/server';
import { getGalleryImages, createGalleryImage } from '@/backend/services/gallery.service';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function GET() {
  try {
    const images = await getGalleryImages();
    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error) {
    console.error('Gallery API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { image_url, caption } = body;

    if (!image_url) {
      return NextResponse.json({ error: 'image_url is required' }, { status: 400 });
    }

    const newImage = await createGalleryImage({ image_url, caption });
    return NextResponse.json({ success: true, image: newImage }, { status: 201 });
  } catch (error) {
    console.error('Gallery API POST Error:', error);
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 });
  }
}
