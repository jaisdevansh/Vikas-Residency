import GalleryAdminClient from "./GalleryAdminClient";

export const runtime = "edge";

import { getGalleryImages } from "@/backend/services/gallery.service";

async function getImages() {
  try {
    return await getGalleryImages();
  } catch (error) {
    console.error("Failed to fetch gallery images from DB:", error);
    return [];
  }
}

export default async function AdminGalleryPage() {
  const images = await getImages();

  return (
    <div className="space-y-6">
      <GalleryAdminClient initialImages={images} />
    </div>
  );
}
