import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, CheckCircle, Lightbulb } from "lucide-react";

export const revalidate = 60; // ISR for blog detail page

type BlogPostDetail = {
  title: string;
  date: string;
  categoryLabel: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
  };
  intro: string;
  paragraphs: string[];
  localTips: string[];
};

const blogData: Record<string, BlogPostDetail> = {
  "top-5-ghats-in-varanasi": {
    title: "The Top 5 Must-Visit Ghats in Varanasi",
    date: "March 15, 2024",
    categoryLabel: "Spiritual & Ghats",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Amit Vikas",
      role: "Vikas Residency Host",
    },
    intro: "Varanasi has over 80 ghats lining the sacred River Ganges. Each ghat has its own unique character, history, and spiritual energy. From sunset prayers to early morning meditations, here are the top 5 ghats you absolutely cannot miss on your trip to Kashi.",
    paragraphs: [
      "1. **Dashashwamedh Ghat**: The beating heart of Varanasi. This is the main ghat and is famous worldwide for the daily evening Ganga Aarti. As the sun sets, priests gather on elevated platforms to perform a highly synchronized fire prayer, with brass lamps raised to the sky while bells ring and Vedic hymns echo. It is an intense, awe-inspiring sensory experience.",
      "2. **Assi Ghat**: Located at the southern confluence of the Ganga and Assi rivers, Assi Ghat is a sanctuary for writers, researchers, and yogis. It is famous for 'Subah-e-Banaras', a beautiful early morning event starting with a sunrise Aarti, followed by classical Indian music recitals and a mass yoga session. It is the most peaceful way to start your day in Kashi.",
      "3. **Manikarnika Ghat**: Known as the primary cremation ghat, Manikarnika is a profound place of contemplation. According to Hindu belief, cremations here lead to Moksha (liberation from the cycle of rebirth). While it can be shocking to visitors, sitting quietly at a safe distance offers a deep, reflective realization of life and mortality.",
      "4. **Kedar Ghat**: Easily recognizable by its striking red and white striped steps, Kedar Ghat is dedicated to Lord Shiva. It is highly popular among travelers from Southern India and houses the beautiful Kedar Temple, which showcases classic Dravidian architecture. The steps here are always bustling with pilgrims taking holy dips.",
      "5. **Darbhanga Ghat**: Located next to Ahilyabai Ghat, Darbhanga Ghat features a towering, magnificent palace built in the early 20th century by the royal family of Darbhanga. It showcases stunning sandstone architecture and is one of the most photographed spots from the river, especially during sunrise boat rides."
    ],
    localTips: [
      "Arrive at Assi Ghat by 5:00 AM for 'Subah-e-Banaras' to secure a front-row seat for the classical music session.",
      "To watch the evening Aarti at Dashashwamedh Ghat comfortably, book a seat on a shared boat by 5:30 PM. Expect to pay ₹150–200 per person.",
      "Manikarnika Ghat should be approached with utmost respect; photography is strictly forbidden near the cremation pyres."
    ]
  },
  "what-to-eat-in-varanasi": {
    title: "A Foodie's Guide to Varanasi Street Food",
    date: "April 02, 2024",
    categoryLabel: "Local Cuisine",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Pragati Vikas",
      role: "Satvik Chef & Host",
    },
    intro: "Varanasi's street food is a culinary reflection of its culture—rich, traditional, and filled with bursting flavors. The lanes of Kashi are home to century-old eateries serving purely vegetarian delights. Here is our family-curated map of what to eat and where.",
    paragraphs: [
      "**Kachori Sabzi & Jalebi**: The quintessential Banarasi breakfast. It consists of round, deep-fried flour balls (Kachoris) stuffed with lentils, served with a spicy potato and chickpea gravy, and topped with crispy, syrup-soaked Jalebis. The combination of spicy and sweet is an unforgettable morning wake-up call.",
      "**Malaiyyo (Winter Froth Sweet)**: A delicate, saffron-flavored milk froth that is prepared overnight under the winter sky, allowing the morning dew to settle on it. It is light as air, garnished with pistachios, almonds, and cardamom, and literally melts on your tongue. It is exclusively available during winter.",
      "**Tamatar Chaat**: A street food unique to Varanasi. Spicy boiled potatoes are mixed with fresh tomatoes, crushed ginger, coriander, and a secret spice blend, cooked on a large iron griddle, and served in a clay pot ('Kullhad') with a sweet sugar syrup flavored with cumin. It is tangy, sweet, spicy, and served hot.",
      "**Banarasi Lassi**: Creamier and thicker than any other lassi you have tried. Prepared in clay pots, it is topped with a generous dollop of thick rabri (condensed milk cream), malai, and flavored with rosewater, mango, saffron, or nuts. It is so thick that you have to eat it with a wooden spoon!",
      "**The Iconic Banarasi Paan**: No meal in Kashi is complete without a Paan. Made from betel leaves stuffed with rose petals (gulkand), dry fruits, and aromatic spices, it is folded into a triangle and served cold. It acts as both a digestive and a sweet refreshment."
    ],
    localTips: [
      "For authentic Kachori Sabzi, head to Ram Bhandar near Chowk early in the morning (around 7:30 AM) to get them fresh.",
      "Malaiyyo is only available from November to February. Look for Markandey Sweet Stall near Chowk for the best experience.",
      "Always ask for street food in clay cups ('kullhads')—it imparts a beautiful, earthy aroma and is environmentally friendly!"
    ]
  },
  "kashi-vishwanath-darshan-guide": {
    title: "Complete Guide to Kashi Vishwanath Darshan",
    date: "April 18, 2024",
    categoryLabel: "Travel Tips",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Amit Vikas",
      role: "Vikas Residency Host",
    },
    intro: "Kashi Vishwanath Temple, dedicated to Lord Shiva, is one of the most sacred Hindu temples in the world. With the completion of the massive Kashi Vishwanath Corridor, the temple is now directly connected to the Ganga river. Here is our step-by-step family guide to ensure a smooth, spiritual darshan.",
    paragraphs: [
      "**Planning Your Entry**: There are four main gates to the temple complex. Gate 4 (Gyanvapi Gate) is the most popular for general entries, while the riverfront entrance (near Lalita Ghat) is the most scenic, allowing you to take a holy dip in the Ganges and walk directly up the grand staircase into the temple complex.",
      "**Security Regulations & Lockers**: The temple maintains strict security checks. Mobile phones, smartwatches, cameras, leather belts, wallets, and large bags are strictly prohibited inside the main temple area. We advise leaving these at Vikas Residency or using the verified free locker facilities located near Gate 4.",
      "**Sugam Darshan (VIP Ticket)**: If you are traveling with elderly family members or wish to avoid the long queues which can take 2 to 3 hours, you can book a 'Sugam Darshan' ticket online through the official temple portal for ₹300 per person. This grants fast-track entry and includes a priest to guide you.",
      "**Darshan Etiquette & Offerings**: Dress conservatively out of respect. You can purchase flowers, bel leaves, and sweets ('prasad') from local vendors right outside the gate. Once inside the sanctum sanctorum, focus on your prayers, keep moving with the flow of the crowd, and absorb the high-energy chanting."
    ],
    localTips: [
      "Avoid visiting on Mondays and festivals like Mahashivratri, as crowds can exceed 100,000 pilgrims.",
      "Book all tickets and pujas ONLY through the official portal (shrikashivishwanath.org) to avoid local tourist guide scams.",
      "We recommend the morning darshan between 6:00 AM and 8:00 AM when the air is cool and the queue moves smoothly."
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/blogs`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blogs) {
        return data.blogs.map((blog: any) => ({
          slug: blog.slug,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to generate static params for blogs:", err);
  }
  return [
    { slug: "top-5-ghats-in-varanasi" },
    { slug: "what-to-eat-in-varanasi" },
    { slug: "kashi-vishwanath-darshan-guide" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  let post: { title: string; intro: string } | null = null;
  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blog) {
        post = {
          title: data.blog.title,
          intro: data.blog.intro,
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog metadata from API:", error);
  }

  // Fallback to static blog data
  if (!post) {
    post = blogData[slug];
  }
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Travel Blog | Vikas Residency`,
    description: post.intro,
  };
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let post: BlogPostDetail | null = null;

  try {
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const res = await fetch(`${backendUrl}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blog) {
        const b = data.blog;
        
        const paragraphs = typeof b.paragraphs === "string"
          ? b.paragraphs.split("\n\n").map((p: string) => p.trim()).filter(Boolean)
          : (Array.isArray(b.paragraphs) ? b.paragraphs : []);
          
        const localTips = typeof b.local_tips === "string"
          ? b.local_tips.split("\n\n").map((t: string) => t.trim()).filter(Boolean)
          : (Array.isArray(b.local_tips) ? b.local_tips : []);

        post = {
          title: b.title,
          date: b.date,
          categoryLabel: b.category_label || b.categoryLabel || "Travel Tips",
          readTime: b.read_time || b.readTime || "5 min read",
          imageUrl: b.image_url || b.imageUrl,
          author: {
            name: b.author_name || b.author?.name || "Amit Vikas",
            role: b.author_role || b.author?.role || "Vikas Residency Host",
          },
          intro: b.intro,
          paragraphs,
          localTips,
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog post by slug from API, using default data", error);
  }

  // Fallback to static data
  if (!post) {
    post = blogData[slug];
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pb-24">
      {/* Immersive Cover Header */}
      <section className="relative h-[55vh] min-h-[400px] w-full bg-black">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-65"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/30 to-black/60 z-10" />
        
        {/* Banner Details */}
        <div className="absolute bottom-12 left-0 right-0 z-20 text-white">
          <div className="container mx-auto px-4 max-w-5xl space-y-4">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 hover:bg-black/60 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Travel Diary
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-accent uppercase tracking-wider">
              <span className="bg-primary px-3 py-1 rounded-full text-white">{post.categoryLabel}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight max-w-4xl text-white drop-shadow-md">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container mx-auto px-4 max-w-6xl mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Article Text */}
          <article className="lg:col-span-8 space-y-8 bg-card dark:bg-[#1a1714] p-8 sm:p-12 rounded-3xl border border-primary/5 dark:border-white/5 shadow-sm">
            
            {/* Author Intro */}
            <div className="flex items-center gap-4 pb-6 border-b border-primary/10">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm text-foreground/50">Written by Local Insider</p>
                <p className="font-bold text-foreground text-base leading-tight">{post.author.name}</p>
                <p className="text-xs text-accent font-medium mt-0.5">{post.author.role}</p>
              </div>
            </div>

            {/* Intro paragraph */}
            <p className="text-xl font-light leading-relaxed text-foreground/90 italic border-l-4 border-accent pl-5">
              {post.intro}
            </p>

            {/* Main content paragraphs */}
            <div className="space-y-6 text-foreground/80 leading-relaxed text-base sm:text-lg font-light">
              {post.paragraphs.map((p, idx) => {
                // Parse markdown-like bold syntax
                const parts = p.split("**");
                return (
                  <p key={idx}>
                    {parts.map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className="font-bold text-primary dark:text-[var(--primary)]">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Right Column: Local Advisor Side Widget */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-primary to-primary-light dark:from-[#1b1916] dark:to-[#12100e] text-white p-8 rounded-3xl border border-accent/20 shadow-lg space-y-6 sticky top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Lightbulb className="w-8 h-8 text-accent animate-pulse" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-accent">Host Recommendations</h3>
                  <p className="text-xs text-white/50">Vikas Residency Secrets</p>
                </div>
              </div>

              {post.localTips && post.localTips.length > 0 ? (
                <div className="space-y-5">
                  {post.localTips.map((tip, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-200 leading-relaxed font-light">{tip}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 font-light italic">No host recommendations for this guide.</p>
              )}

              <div className="pt-6 border-t border-white/10 text-center space-y-4">
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Need a custom itinerary or help with local darshan booking? Our host family is delighted to arrange everything.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-accent hover:bg-accent-hover text-[#0f3d2e] font-bold text-sm rounded-xl transition-all duration-300 shadow-md"
                >
                  Consult Your Host
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
