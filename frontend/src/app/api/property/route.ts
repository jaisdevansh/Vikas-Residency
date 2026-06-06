import { NextResponse } from 'next/server';
import { getPropertyDetails } from '@/backend/services/property.service';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const property = await getPropertyDetails();
    return NextResponse.json({ success: true, property }, { status: 200 });
  } catch (error) {
    console.error('Property API Error:', error);
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        success: true, 
        mocked: true, 
        property: { id: 1, name: 'Vikas Residency', slug: 'vikas-residency', city: 'Varanasi' } 
      }, { status: 200 });
    }
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}
