"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, X, Image as ImageIcon, CheckCircle2, AlertCircle, Save, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "spiritual" | "cuisine" | "tips";
  category_label: string;
  read_time: string;
  image_url: string;
  author_name: string;
  author_role: string;
  intro: string;
  paragraphs: string;
  local_tips?: string;
};

export default function BlogsAdminClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "spiritual" as "spiritual" | "cuisine" | "tips",
    category_label: "Spiritual & Ghats",
    read_time: "5 min read",
    image_url: "",
    author_name: "Amit Vikas",
    author_role: "Vikas Residency Host",
    intro: "",
    paragraphs: "",
    local_tips: ""
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCategoryChange = (cat: "spiritual" | "cuisine" | "tips") => {
    let label = "Spiritual & Ghats";
    if (cat === "cuisine") label = "Local Cuisine";
    if (cat === "tips") label = "Travel Tips";
    
    setFormData((prev) => ({ ...prev, category: cat, category_label: label }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.success && data.url) {
        const fullUrl = data.url;
        setFormData((prev) => ({ ...prev, image_url: fullUrl }));
        showToast('Image uploaded successfully!');
      } else {
        showToast('Image upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (error) {
      showToast('Error uploading image file', 'error');
    } finally {
      setLoading(false);
    }
  };

  const startAdd = () => {
    setIsAdding(true);
    setDeletingId(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "spiritual",
      category_label: "Spiritual & Ghats",
      read_time: "5 min read",
      image_url: "",
      author_name: "Amit Vikas",
      author_role: "Vikas Residency Host",
      intro: "",
      paragraphs: "",
      local_tips: ""
    });
  };

  const handleSave = async () => {
    const { title, excerpt, image_url, intro, paragraphs, author_name, author_role } = formData;
    if (!title || !excerpt || !image_url || !intro || !paragraphs || !author_name || !author_role) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success && data.blog) {
        setPosts([data.blog, ...posts]);
        setIsAdding(false);
        showToast("Blog article published successfully!");
      } else {
        showToast("Failed to publish: " + (data.error || "Unknown error"), "error");
      }
    } catch (error) {
      showToast("Error publishing. Make sure the backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      
      if (data.success) {
        setPosts(posts.filter(p => p.id !== id));
        setDeletingId(null);
        showToast("Blog article deleted successfully!");
      } else {
        showToast("Failed to delete: " + data.error, "error");
      }
    } catch (error) {
      showToast("Error deleting. Make sure the backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header operations */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Write new blogs, delete old posts, and share travel advice directly on the public travel log.
        </p>
        <button
          onClick={startAdd}
          disabled={isAdding}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 shadow-sm font-semibold shrink-0"
        >
          <Plus size={18} />
          <span>Write Blog Post</span>
        </button>
      </div>

      {/* Editor Panel Block */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-card border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-md space-y-6"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-500" /> Draft New Blog Post
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Form columns */}
              <div className="md:col-span-8 space-y-5">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Article Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="e.g., Hidden Gems of Godowlia Crossing"
                    autoFocus
                  />
                </div>

                {/* Excerpt */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Short Excerpt / Card Description <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Provide a brief 1-2 sentence description for the blog listing card."
                  />
                </div>

                {/* Intro Paragraph */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Introductory Paragraph <span className="text-red-500">*</span></label>
                  <textarea
                    value={formData.intro}
                    onChange={(e) => setFormData((prev) => ({ ...prev, intro: e.target.value }))}
                    rows={3}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Enter the italicized introductory paragraph of the article."
                  />
                </div>

                {/* Paragraphs content */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Article Content <span className="text-red-500">*</span></label>
                  <span className="text-xs text-gray-400 -mt-1 block">Separate paragraphs by typing two newlines (press Enter twice). Support **bold** text highlights.</span>
                  <textarea
                    value={formData.paragraphs}
                    onChange={(e) => setFormData((prev) => ({ ...prev, paragraphs: e.target.value }))}
                    rows={8}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono"
                    placeholder="Paragraph 1 here...&#10;&#10;Paragraph 2 here..."
                  />
                </div>

                {/* Local Recommendations / Tips */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Host Recommendations / Tips (Optional)</label>
                  <span className="text-xs text-gray-400 -mt-1 block">Type tips separated by two newlines (press Enter twice) to show them as bullets on the sidebar.</span>
                  <textarea
                    value={formData.local_tips}
                    onChange={(e) => setFormData((prev) => ({ ...prev, local_tips: e.target.value }))}
                    rows={4}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="Tip 1...&#10;&#10;Tip 2..."
                  />
                </div>
              </div>

              {/* Sidebar Config column */}
              <div className="md:col-span-4 space-y-5">
                {/* Category Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value as "spiritual" | "cuisine" | "tips")}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-[#1a1714] text-foreground focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  >
                    <option value="spiritual">Spiritual & Ghats</option>
                    <option value="cuisine">Local Cuisine</option>
                    <option value="tips">Travel Tips</option>
                  </select>
                </div>

                {/* Category Label */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category Tag Display</label>
                  <input
                    type="text"
                    value={formData.category_label}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category_label: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Read Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Reading Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, read_time: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    placeholder="e.g., 5 min read"
                  />
                </div>

                {/* Author Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Author Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author_name: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Author Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Author Subtext / Role <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author_role: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cover Banner Image <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                  />
                  
                  {/* Image preview block */}
                  <div className="border border-dashed border-gray-200 dark:border-white/10 rounded-xl h-[130px] relative overflow-hidden bg-gray-50 dark:bg-black/10 flex items-center justify-center">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Cover preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400 text-xs space-y-1">
                        <ImageIcon className="mx-auto w-8 h-8" />
                        <span>No image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-end gap-3">
              <button
                onClick={handleSave}
                disabled={loading || !formData.image_url}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg transition-colors shadow-sm font-semibold text-sm"
              >
                <Save size={16} />
                <span>Publish Post</span>
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-5 py-2.5 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs Listing Table */}
      <div className="bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm w-24">Cover</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Title</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Category</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm font-mono">Date</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Author</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <img src={post.image_url} alt={post.title} className="w-16 h-12 object-cover rounded-md border border-gray-100 dark:border-white/5 shadow-sm" />
                  </td>
                  <td className="p-4 font-medium text-gray-900 dark:text-white max-w-xs truncate" title={post.title}>
                    <Link href={`/blog/${post.slug}`} target="_blank" className="hover:text-blue-500 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary dark:bg-white/5 dark:text-accent px-2 py-0.5 rounded text-xs font-semibold uppercase">
                      {post.category_label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 dark:text-white/50">{post.date}</td>
                  <td className="p-4 text-sm text-gray-600 dark:text-white/70">{post.author_name}</td>
                  <td className="p-4 text-right">
                    {deletingId === post.id ? (
                      <div className="flex items-center justify-end gap-1.5 animate-in fade-in duration-200">
                        <span className="text-xs text-red-500 font-semibold mr-1">Delete?</span>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={loading}
                          className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="px-2.5 py-1 bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-gray-300 text-xs font-semibold rounded"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(post.id)}
                        disabled={isAdding}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/50 dark:text-red-400 rounded transition-colors disabled:opacity-40"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {posts.length === 0 && !isAdding && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white font-medium z-50 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
