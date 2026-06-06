import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { getRooms } from "@/backend/services/property.service";
import { getReviews } from "@/backend/services/review.service";

// Dynamic imports for below-the-fold heavy sections
const RoomsPreview = dynamic(() => import("@/components/sections/RoomsPreview"), { 
  ssr: true,
  loading: () => <Skeleton className="w-full h-[600px] my-10" />
});
const Reviews = dynamic(() => import("@/components/sections/Reviews"), {
  loading: () => <Skeleton className="w-full h-[400px] my-10" />,
});
const FAQPreview = dynamic(() => import("@/components/sections/FAQPreview"), { 
  ssr: true,
  loading: () => <Skeleton className="w-full h-[300px] my-10" />
});
const SEOLinks = dynamic(() => import("@/components/sections/SEOLinks"), { 
  ssr: true,
  loading: () => <Skeleton className="w-full h-[200px] my-10" />
});

export const revalidate = 60; // ISR for the home page

export const metadata = {
  title: "Best Homestay in Varanasi near Kashi Vishwanath | Vikas Residency",
  description: "Looking for the best budget and family homestay in Varanasi? Vikas Residency offers premium rooms near Assi Ghat and Kashi Vishwanath Temple.",
};

export default async function Home() {
  let rooms: any[] = [];
  let reviews: any[] = [];

  try {
    rooms = await getRooms();
  } catch (err) {
    console.error("Failed to fetch rooms for home page:", err);
  }

  try {
    const reviewData = await getReviews();
    reviews = reviewData;
  } catch (err) {
    console.error("Failed to fetch reviews for home page:", err);
  }

  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <FeaturesGrid />
      <RoomsPreview initialRooms={rooms} />
      <Reviews initialReviews={reviews} />
      <FAQPreview />
      <SEOLinks />
    </main>
  );
}
