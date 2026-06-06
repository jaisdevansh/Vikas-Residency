import BlogsAdminClient from "./BlogsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  let initialPosts = [];
  try {
    const res = await fetch("http://127.0.0.1:5000/api/blogs", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blogs) {
        initialPosts = data.blogs;
      }
    }
  } catch (error) {
    console.error("Failed to fetch blogs for admin panel:", error);
  }

  return (
    <div className="space-y-6">
      <BlogsAdminClient initialPosts={initialPosts} />
    </div>
  );
}
