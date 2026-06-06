import { sql } from '../db';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../../data');
const galleryFile = path.join(dataDir, 'gallery.json');

const defaultImages = [
  { id: 1, image_url: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=1200&auto=format&fit=crop", caption: "Premium Accommodation" },
  { id: 2, image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop", caption: "Spiritual Ganga Aarti" },
  { id: 3, image_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop", caption: "Stunning Sunrises" },
  { id: 4, image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop", caption: "Peaceful Spaces" },
  { id: 5, image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop", caption: "Traditional Hospitality" },
  { id: 6, image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop", caption: "Elegant Interiors" },
];

function loadMockImages(): any[] {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (fs.existsSync(galleryFile)) {
    try {
      return JSON.parse(fs.readFileSync(galleryFile, 'utf-8'));
    } catch (e) {
      console.error("Error reading gallery.json, resetting to defaults", e);
    }
  }
  fs.writeFileSync(galleryFile, JSON.stringify(defaultImages, null, 2));
  return defaultImages;
}

function saveMockImages(images: any[]) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(galleryFile, JSON.stringify(images, null, 2));
}

export async function getGalleryImages() {
  if (!process.env.DATABASE_URL) {
    return loadMockImages();
  }
  
  try {
    return await sql`
      SELECT * FROM gallery_images ORDER BY id DESC
    `;
  } catch (error) {
    console.error("Failed to fetch gallery images from DB, returning mock images", error);
    return loadMockImages();
  }
}

export async function createGalleryImage(data: { image_url: string; caption?: string }) {
  if (!process.env.DATABASE_URL) {
    const images = loadMockImages();
    const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
    const newImage = {
      id: newId,
      image_url: data.image_url,
      caption: data.caption || ""
    };
    images.unshift(newImage); // Add at the beginning of the list for fresh rendering
    saveMockImages(images);
    return newImage;
  }

  const result = await sql`
    INSERT INTO gallery_images (image_url, caption)
    VALUES (${data.image_url}, ${data.caption || null})
    RETURNING *
  `;
  return result.length > 0 ? result[0] : null;
}

export async function deleteGalleryImage(id: number) {
  if (!process.env.DATABASE_URL) {
    const images = loadMockImages();
    const filtered = images.filter(img => img.id !== id);
    saveMockImages(filtered);
    return true;
  }

  const result = await sql`
    DELETE FROM gallery_images WHERE id = ${id} RETURNING id
  `;
  return result.length > 0;
}
