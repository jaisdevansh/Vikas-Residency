import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/backend/services/blogs.service';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error('Blogs API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, excerpt, category, category_label, read_time, image_url, author_name, author_role, intro, paragraphs, local_tips } = body;

    if (!title || !excerpt || !image_url || !intro || !paragraphs || !author_name || !author_role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await createBlog({
      title,
      excerpt,
      category,
      category_label: category_label || 'Travel Tips',
      read_time: read_time || '5 min read',
      image_url,
      author_name,
      author_role,
      intro,
      paragraphs,
      local_tips
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Blogs API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
