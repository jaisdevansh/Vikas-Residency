import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0; // Fetch fresh data

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/gallery`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json({ success: true, images: data.images || [] }, { status: 200 });
  } catch (error) {
    console.error('Gallery API Error:', error);
    return NextResponse.json({ 
      success: true, 
      mocked: true, 
      images: [
        { id: 1, image_url: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=1200&auto=format&fit=crop", caption: "Premium Accommodation" },
        { id: 2, image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop", caption: "Spiritual Ganga Aarti" },
      ]
    }, { status: 200 });
  }
}
