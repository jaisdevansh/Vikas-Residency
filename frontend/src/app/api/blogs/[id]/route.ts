import { NextResponse } from 'next/server';
import { deleteBlog } from '@/backend/services/blogs.service';
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
    const blogId = Number(resolvedParams.id);
    if (isNaN(blogId)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const deleted = await deleteBlog(blogId);
    if (!deleted) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Blogs API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
