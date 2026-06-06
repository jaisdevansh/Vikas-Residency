import { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Vikas Residency",
  description: "Browse through our collection of photos showcasing the premium rooms and spiritual ambiance of our homestay in Varanasi.",
};

export default async function GalleryPage() {
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
  let images = [];
  try {
    const res = await fetch(`${backendUrl}/api/gallery`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.images) {
        images = data.images;
      }
    }
  } catch (error) {
    console.error("Failed to fetch gallery images on server:", error);
  }

  return (
    <main className="pt-24 min-h-screen bg-card">
      <Gallery initialImages={images} />
    </main>
  );
}
