import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Travel Blog | Discover Varanasi | Vikas Residency",
  description: "Read our latest guides, tips, and stories about traveling to Varanasi, visiting the ghats, and experiencing the spiritual capital of India.",
};

export const revalidate = 60; // ISR for blog listing

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "spiritual" | "cuisine" | "tips";
  categoryLabel: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
  };
};

const defaultBlogPosts: BlogPost[] = [
  {
    slug: "top-5-ghats-in-varanasi",
    title: "The Top 5 Must-Visit Ghats in Varanasi",
    excerpt: "Discover the spiritual and historical significance of Varanasi's most iconic ghats, from Dashashwamedh to Assi, and how to experience them fully.",
    date: "March 15, 2024",
    category: "spiritual",
    categoryLabel: "Spiritual & Ghats",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Amit Vikas",
      role: "Vikas Residency Host",
    },
  },
  {
    slug: "what-to-eat-in-varanasi",
    title: "A Foodie's Guide to Varanasi Street Food",
    excerpt: "From Kachori Sabzi to winter froth-sweet Malaiyyo, explore the delicious vegetarian culinary delights hidden deep in the narrow alleys of Kashi.",
    date: "April 02, 2024",
    category: "cuisine",
    categoryLabel: "Local Cuisine",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Pragati Vikas",
      role: "Satvik Chef & Host",
    },
  },
  {
    slug: "kashi-vishwanath-darshan-guide",
    title: "Complete Guide to Kashi Vishwanath Darshan",
    excerpt: "Everything you need to know about timings, rules, online ticket booking, locker systems, and how to plan your visit to the holiest temple corridor in India.",
    date: "April 18, 2024",
    category: "tips",
    categoryLabel: "Travel Tips",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Amit Vikas",
      role: "Vikas Residency Host",
    },
  }
];

export default async function BlogIndexPage() {
  let displayPosts = defaultBlogPosts;

  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/blogs`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blogs && data.blogs.length > 0) {
        displayPosts = data.blogs.map((b: any) => ({
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt,
          date: b.date,
          category: b.category,
          categoryLabel: b.category_label || b.categoryLabel,
          readTime: b.read_time || b.readTime,
          imageUrl: b.image_url || b.imageUrl,
          author: {
            name: b.author_name || b.author?.name || "Amit Vikas",
            role: b.author_role || b.author?.role || "Vikas Residency Host",
          },
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch blogs from API, using default blogs", error);
  }

  return (
    <main className="pt-32 pb-24 bg-[var(--beige)] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-4">Vikas Travel Diary</h1>
          <div className="w-24 h-[2px] bg-accent mx-auto mb-4" />
          <p className="text-foreground/70 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            Local advice, hidden street eats, and spiritual routes curated directly by the Vikas family to let you experience the real Varanasi.
          </p>
        </div>

        <BlogClient posts={displayPosts} />
      </div>
    </main>
  );
}
