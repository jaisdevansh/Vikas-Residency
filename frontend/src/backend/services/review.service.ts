import { sql } from '../db';
import fs from 'fs';
import path from 'path';

const dataDir = process.env.VERCEL
  ? '/tmp'
  : (typeof __dirname !== 'undefined' ? path.join(__dirname, '../../data') : './data');
const reviewsFilePath = path.join(dataDir, 'reviews.json');

const defaultReviews = [
  {
    id: "rev1",
    name: "Rahul Verma",
    rating: 5,
    text: "Best location in Varanasi.",
    date: "1 month ago"
  },
  {
    id: "rev2",
    name: "Sneha Reddy",
    rating: 5,
    text: "Amazing stay with friends. Owner is very cooperative. Great location — highly recommended for a budget trip.",
    date: "2 months ago"
  },
  {
    id: "rev3",
    name: "Amit Kumar",
    rating: 5,
    text: "All sightseeing places were right in front. Owner was very helpful. Reasonable price too.",
    date: "3 months ago"
  },
  {
    id: "rev4",
    name: "Priya Singh",
    rating: 5,
    text: "Stayed with family. Completely safe and comfortable. All places to visit are right next to the hotel.",
    date: "4 months ago"
  },
  {
    id: "rev5",
    name: "Vikram Sharma",
    rating: 5,
    text: "Great hotel with perfect location. All tourist spots nearby. Owner is very nice and humble. Totally worth it.",
    date: "5 months ago"
  }
];

function loadMockReviews(): any[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (fs.existsSync(reviewsFilePath)) {
      try {
        return JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
      } catch (e) {
        console.error("Error reading reviews.json", e);
      }
    }
    fs.writeFileSync(reviewsFilePath, JSON.stringify(defaultReviews, null, 2));
  } catch (error) {
    console.error("FS fallback not available, using static seed reviews:", error);
  }
  return defaultReviews;
}

function saveMockReviews(reviews: any[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
  } catch (error) {
    console.error("FS write not available", error);
  }
}

export async function getReviews() {
  if (!process.env.DATABASE_URL) {
    return loadMockReviews();
  }

  try {
    // Attempt database call if reviews table exists
    return await sql`
      SELECT * FROM reviews ORDER BY id DESC
    `;
  } catch (error) {
    console.warn("DB Fetch reviews failed, using local mock reviews:", error);
    return loadMockReviews();
  }
}

export async function createReview(data: { name: string; rating: number; text: string; date?: string }) {
  if (!process.env.DATABASE_URL) {
    const reviews = loadMockReviews();
    const newReview = {
      id: Date.now().toString(),
      name: data.name,
      rating: Number(data.rating),
      text: data.text,
      date: data.date || "Just now"
    };
    reviews.unshift(newReview);
    saveMockReviews(reviews);
    return newReview;
  }

  try {
    const result = await sql`
      INSERT INTO reviews (name, rating, text, date)
      VALUES (${data.name}, ${Number(data.rating)}, ${data.text}, ${data.date || 'Just now'})
      RETURNING *
    `;
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("DB Create review failed, adding to mock fallback:", error);
    const reviews = loadMockReviews();
    const newReview = {
      id: Date.now().toString(),
      name: data.name,
      rating: Number(data.rating),
      text: data.text,
      date: data.date || "Just now"
    };
    reviews.unshift(newReview);
    saveMockReviews(reviews);
    return newReview;
  }
}

export async function updateReview(id: string, data: { name?: string; rating?: number; text?: string; date?: string }) {
  if (!process.env.DATABASE_URL) {
    const reviews = loadMockReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reviews[idx] = {
      ...reviews[idx],
      name: data.name || reviews[idx].name,
      rating: data.rating !== undefined ? Number(data.rating) : reviews[idx].rating,
      text: data.text || reviews[idx].text,
      date: data.date || reviews[idx].date
    };
    saveMockReviews(reviews);
    return reviews[idx];
  }

  const fields: string[] = [];
  const values: any[] = [];
  
  if (data.name !== undefined) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(data.name);
  }
  if (data.rating !== undefined) {
    fields.push(`rating = $${fields.length + 1}`);
    values.push(Number(data.rating));
  }
  if (data.text !== undefined) {
    fields.push(`text = $${fields.length + 1}`);
    values.push(data.text);
  }
  if (data.date !== undefined) {
    fields.push(`date = $${fields.length + 1}`);
    values.push(data.date);
  }

  if (fields.length === 0) {
    try {
      const res = await sql`SELECT * FROM reviews WHERE id = ${id}`;
      return res.length > 0 ? res[0] : null;
    } catch (error) {
      console.error("DB fetch review failed, fallback to mock:", error);
      const reviews = loadMockReviews();
      const idx = reviews.findIndex(r => r.id === id);
      return idx === -1 ? null : reviews[idx];
    }
  }

  values.push(id);
  const query = `
    UPDATE reviews
    SET ${fields.join(', ')}
    WHERE id = $${fields.length + 1}
    RETURNING *
  `;

  try {
    const result = await (sql as any)(query, values);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("DB Update review failed, fallback to mock", error);
    const reviews = loadMockReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reviews[idx] = {
      ...reviews[idx],
      name: data.name || reviews[idx].name,
      rating: data.rating !== undefined ? Number(data.rating) : reviews[idx].rating,
      text: data.text || reviews[idx].text,
      date: data.date || reviews[idx].date
    };
    saveMockReviews(reviews);
    return reviews[idx];
  }
}

export async function deleteReview(id: string) {
  if (!process.env.DATABASE_URL) {
    const reviews = loadMockReviews();
    const filtered = reviews.filter(r => r.id !== id);
    saveMockReviews(filtered);
    return true;
  }

  try {
    const result = await sql`
      DELETE FROM reviews WHERE id = ${id} RETURNING id
    `;
    return result.length > 0;
  } catch (error) {
    console.error("DB Delete review failed, fallback to mock", error);
    const reviews = loadMockReviews();
    const filtered = reviews.filter(r => r.id !== id);
    saveMockReviews(filtered);
    return true;
  }
}
