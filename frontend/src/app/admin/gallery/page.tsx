import GalleryAdminClient from "./GalleryAdminClient";

export const runtime = "edge";

async function getGalleryImages() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/gallery', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.images) {
      return data.images;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch gallery images from Express backend:", error);
    return [];
  }
}

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="space-y-6">
      <GalleryAdminClient initialImages={images} />
    </div>
  );
}
