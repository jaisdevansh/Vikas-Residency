import { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";
import { getGalleryImages } from "@/backend/services/gallery.service";

export const metadata: Metadata = {
  title: "Photo Gallery | Vikas Residency",
  description: "Browse through our collection of photos showcasing the premium rooms and spiritual ambiance of our homestay in Varanasi.",
};

export default async function GalleryPage() {
  let images: any[] = [];
  try {
    images = await getGalleryImages();
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
  }

  return (
    <main className="pt-24 min-h-screen bg-card">
      <Gallery initialImages={images} />
    </main>
  );
}
