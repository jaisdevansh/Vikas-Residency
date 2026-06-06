import BlogsAdminClient from "./BlogsAdminClient";

export const dynamic = "force-dynamic";

import { getBlogs } from "@/backend/services/blogs.service";

export default async function AdminBlogsPage() {
  let initialPosts = [];
  try {
    initialPosts = await getBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs from DB:", error);
  }

  return (
    <div className="space-y-6">
      <BlogsAdminClient initialPosts={initialPosts} />
    </div>
  );
}
