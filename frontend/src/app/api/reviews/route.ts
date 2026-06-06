import { NextResponse } from 'next/server';
import { getReviews, createReview } from '@/backend/services/review.service';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    console.error('Reviews API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Both admin panel and public reviews might submit reviews.
    // If the user wants to submit review, it's public.
    const body = await req.json();
    const { name, rating, text, date } = body;

    if (!name || rating === undefined || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newReview = await createReview({
      name,
      rating: Number(rating),
      text,
      date
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error('Reviews API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
