import { sql } from '../db';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL
  ? '/tmp'
  : (typeof __dirname !== 'undefined' ? path.join(__dirname, '../../data') : './data');
const blogsFile = path.join(dataDir, 'blogs.json');

const seedBlogs = [
  {
    id: 1,
    slug: "top-5-ghats-in-varanasi",
    title: "The Top 5 Must-Visit Ghats in Varanasi",
    excerpt: "Discover the spiritual and historical significance of Varanasi's most iconic ghats, from Dashashwamedh to Assi, and how to experience them fully.",
    date: "March 15, 2024",
    category: "spiritual",
    category_label: "Spiritual & Ghats",
    read_time: "5 min read",
    image_url: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?q=80&w=800&auto=format&fit=crop",
    author_name: "Amit Vikas",
    author_role: "Vikas Residency Host",
    intro: "Varanasi has over 80 ghats lining the sacred River Ganges. Each ghat has its own unique character, history, and spiritual energy. From sunset prayers to early morning meditations, here are the top 5 ghats you absolutely cannot miss on your trip to Kashi.",
    paragraphs: "1. **Dashashwamedh Ghat**: The beating heart of Varanasi. This is the main ghat and is famous worldwide for the daily evening Ganga Aarti. As the sun sets, priests gather on elevated platforms to perform a highly synchronized fire prayer, with brass lamps raised to the sky while bells ring and Vedic hymns echo. It is an intense, awe-inspiring sensory experience.\n\n2. **Assi Ghat**: Located at the southern confluence of the Ganga and Assi rivers, Assi Ghat is a sanctuary for writers, researchers, and yogis. It is famous for 'Subah-e-Banaras', a beautiful early morning event starting with a sunrise Aarti, followed by classical Indian music recitals and a mass yoga session. It is the most peaceful way to start your day in Kashi.\n\n3. **Manikarnika Ghat**: Known as the primary cremation ghat, Manikarnika is a profound place of contemplation. According to Hindu belief, cremations here lead to Moksha (liberation from the cycle of rebirth). While it can be shocking to visitors, sitting quietly at a safe distance offers a deep, reflective realization of life and mortality.\n\n4. **Kedar Ghat**: Easily recognizable by its striking red and white striped steps, Kedar Ghat is dedicated to Lord Shiva. It is highly popular among travelers from Southern India and houses the beautiful Kedar Temple, which showcases classic Dravidian architecture. The steps here are always bustling with pilgrims taking holy dips.\n\n5. **Darbhanga Ghat**: Located next to Ahilyabai Ghat, Darbhanga Ghat features a towering, magnificent palace built in the early 20th century by the royal family of Darbhanga. It showcases stunning sandstone architecture and is one of the most photographed spots from the river, especially during sunrise boat rides.",
    local_tips: "Arrive at Assi Ghat by 5:00 AM for 'Subah-e-Banaras' to secure a front-row seat for the classical music session.\n\nTo watch the evening Aarti at Dashashwamedh Ghat comfortably, book a seat on a shared boat by 5:30 PM. Expect to pay ₹150–200 per person.\n\nManikarnika Ghat should be approached with utmost respect; photography is strictly forbidden near the cremation pyres."
  },
  {
    id: 2,
    slug: "what-to-eat-in-varanasi",
    title: "A Foodie's Guide to Varanasi Street Food",
    excerpt: "From Kachori Sabzi to winter froth-sweet Malaiyyo, explore the delicious vegetarian culinary delights hidden deep in the narrow alleys of Kashi.",
    date: "April 02, 2024",
    category: "cuisine",
    category_label: "Local Cuisine",
    read_time: "7 min read",
    image_url: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=800&auto=format&fit=crop",
    author_name: "Pragati Vikas",
    author_role: "Satvik Chef & Host",
    intro: "Varanasi's street food is a culinary reflection of its culture—rich, traditional, and filled with bursting flavors. The lanes of Kashi are home to century-old eateries serving purely vegetarian delights. Here is our family-curated map of what to eat and where.",
    paragraphs: "**Kachori Sabzi & Jalebi**: The quintessential Banarasi breakfast. It consists of round, deep-fried flour balls (Kachoris) stuffed with lentils, served with a spicy potato and chickpea gravy, and topped with crispy, syrup-soaked Jalebis. The combination of spicy and sweet is an unforgettable morning wake-up call.\n\n**Malaiyyo (Winter Froth Sweet)**: A delicate, saffron-flavored milk froth that is prepared overnight under the winter sky, allowing the morning dew to settle on it. It is light as air, garnished with pistachios, almonds, and cardamom, and literally melts on your tongue. It is exclusively available during winter.\n\n**Tamatar Chaat**: A street food unique to Varanasi. Spicy boiled potatoes are mixed with fresh tomatoes, crushed ginger, coriander, and a secret spice blend, cooked on a large iron griddle, and served in a clay pot ('Kullhad') with a sweet sugar syrup flavored with cumin. It is tangy, sweet, spicy, and served hot.\n\n**Banarasi Lassi**: Creamier and thicker than any other lassi you have tried. Prepared in clay pots, it is topped with a generous dollop of thick rabri (condensed milk cream), malai, and flavored with rosewater, mango, saffron, or nuts. It is so thick that you have to eat it with a wooden spoon!\n\n**The Iconic Banarasi Paan**: No meal in Kashi is complete without a Paan. Made from betel leaves stuffed with rose petals (gulkand), dry fruits, and aromatic spices, it is folded into a triangle and served cold. It acts as both a digestive and a sweet refreshment.",
    local_tips: "For authentic Kachori Sabzi, head to Ram Bhandar near Chowk early in the morning (around 7:30 AM) to get them fresh.\n\nMalaiyyo is only available from November to February. Look for Markandey Sweet Stall near Chowk for the best experience.\n\nAlways ask for street food in clay cups ('kullhads')—it imparts a beautiful, earthy aroma and is environmentally friendly!"
  },
  {
    id: 3,
    slug: "kashi-vishwanath-darshan-guide",
    title: "Complete Guide to Kashi Vishwanath Darshan",
    excerpt: "Everything you need to know about timings, rules, online ticket booking, locker systems, and how to plan your visit to the holiest temple corridor in India.",
    date: "April 18, 2024",
    category: "tips",
    category_label: "Travel Tips",
    read_time: "6 min read",
    image_url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop",
    author_name: "Amit Vikas",
    author_role: "Vikas Residency Host",
    intro: "Kashi Vishwanath Temple, dedicated to Lord Shiva, is one of the most sacred Hindu temples in the world. With the completion of the massive Kashi Vishwanath Corridor, the temple is now directly connected to the Ganga river. Here is our step-by-step family guide to ensure a smooth, spiritual darshan.",
    paragraphs: "**Planning Your Entry**: There are four main gates to the temple complex. Gate 4 (Gyanvapi Gate) is the most popular for general entries, while the riverfront entrance (near Lalita Ghat) is the most scenic, allowing you to take a holy dip in the Ganges and walk directly up the grand staircase into the temple complex.\n\n**Security Regulations & Lockers**: The temple maintains strict security checks. Mobile phones, smartwatches, cameras, leather belts, wallets, and large bags are strictly prohibited inside the main temple area. We advise leaving these at Vikas Residency or using the verified free locker facilities located near Gate 4.\n\n**Sugam Darshan (VIP Ticket)**: If you are traveling with elderly family members or wish to avoid the long queues which can take 2 to 3 hours, you can book a 'Sugam Darshan' ticket online through the official temple portal for ₹300 per person. This grants fast-track entry and includes a priest to guide you.\n\n**Darshan Etiquette & Offerings**: Dress conservatively out of respect. You can purchase flowers, bel leaves, and sweets ('prasad') from local vendors right outside the gate. Once inside the sanctum sanctorum, focus on your prayers, keep moving with the flow of the crowd, and absorb the high-energy chanting.",
    local_tips: "Avoid visiting on Mondays and festivals like Mahashivratri, as crowds can exceed 100,000 pilgrims.\n\nBook all tickets and pujas ONLY through the official portal (shrikashivishwanath.org) to avoid local tourist guide scams.\n\nWe recommend the morning darshan between 6:00 AM and 8:00 AM when the air is cool and the queue moves smoothly."
  }
];

function loadMockBlogs(): any[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(blogsFile)) {
      try {
        return JSON.parse(fs.readFileSync(blogsFile, 'utf-8'));
      } catch (e) {
        console.error("Error reading blogs.json, resetting to seeds", e);
      }
    }
    fs.writeFileSync(blogsFile, JSON.stringify(seedBlogs, null, 2));
  } catch (error) {
    console.error("FS fallback not available, using static seed blogs:", error);
  }
  return seedBlogs;
}

function saveMockBlogs(blogs: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  } catch (error) {
    console.error("FS write not available", error);
  }
}

export async function getBlogs() {
  if (!process.env.DATABASE_URL) {
    return loadMockBlogs();
  }

  try {
    return await sql`
      SELECT * FROM blogs ORDER BY id DESC
    `;
  } catch (error) {
    console.error("DB Fetch blogs failed, fallback to mock", error);
    return loadMockBlogs();
  }
}

export async function getBlogBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    const blogs = loadMockBlogs();
    return blogs.find(b => b.slug === slug) || null;
  }

  try {
    const result = await sql`
      SELECT * FROM blogs WHERE slug = ${slug} LIMIT 1
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("DB Fetch blog by slug failed, fallback to mock", error);
    const blogs = loadMockBlogs();
    return blogs.find(b => b.slug === slug) || null;
  }
}

export async function createBlog(data: {
  title: string;
  slug?: string;
  excerpt: string;
  category: "spiritual" | "cuisine" | "tips";
  category_label: string;
  read_time: string;
  image_url: string;
  author_name: string;
  author_role: string;
  intro: string;
  paragraphs: string;
  local_tips?: string;
}) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const finalSlug = data.slug || generateSlug(data.title);

  if (!process.env.DATABASE_URL) {
    const blogs = loadMockBlogs();
    
    let slugCandidate = finalSlug;
    let counter = 1;
    while (blogs.some(b => b.slug === slugCandidate)) {
      slugCandidate = `${finalSlug}-${counter++}`;
    }

    const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    const newBlog = {
      id: newId,
      slug: slugCandidate,
      title: data.title,
      excerpt: data.excerpt,
      date: dateStr,
      category: data.category,
      category_label: data.category_label,
      read_time: data.read_time,
      image_url: data.image_url,
      author_name: data.author_name,
      author_role: data.author_role,
      intro: data.intro,
      paragraphs: data.paragraphs,
      local_tips: data.local_tips || ""
    };
    blogs.unshift(newBlog);
    saveMockBlogs(blogs);
    return newBlog;
  }

  let slugCandidate = finalSlug;
  let counter = 1;
  while (true) {
    const exists = await sql`SELECT id FROM blogs WHERE slug = ${slugCandidate} LIMIT 1`;
    if (exists.length === 0) break;
    slugCandidate = `${finalSlug}-${counter++}`;
  }

  const result = await sql`
    INSERT INTO blogs (slug, title, excerpt, date, category, category_label, read_time, image_url, author_name, author_role, intro, paragraphs, local_tips)
    VALUES (${slugCandidate}, ${data.title}, ${data.excerpt}, ${dateStr}, ${data.category}, ${data.category_label}, ${data.read_time}, ${data.image_url}, ${data.author_name}, ${data.author_role}, ${data.intro}, ${data.paragraphs}, ${data.local_tips || null})
    RETURNING *
  `;
  return result.length > 0 ? result[0] : null;
}

export async function deleteBlog(id: number) {
  if (!process.env.DATABASE_URL) {
    const blogs = loadMockBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    saveMockBlogs(filtered);
    return true;
  }

  const result = await sql`
    DELETE FROM blogs WHERE id = ${id} RETURNING id
  `;
  return result.length > 0;
}
