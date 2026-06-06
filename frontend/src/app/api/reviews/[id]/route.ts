import { NextResponse } from 'next/server';
import { updateReview, deleteReview } from '@/backend/services/review.service';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const reviewId = resolvedParams.id;

    const body = await req.json();
    const updatedReview = await updateReview(reviewId, body);
    
    if (!updatedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updatedReview }, { status: 200 });
  } catch (error) {
    console.error('Reviews API PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const reviewId = resolvedParams.id;

    const deleted = await deleteReview(reviewId);
    if (!deleted) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Reviews API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
