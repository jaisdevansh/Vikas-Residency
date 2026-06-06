import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import { Skeleton } from "@/components/ui/Skeleton";

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
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";
  
  let rooms = [];
  try {
    const res = await fetch(`${backendUrl}/api/rooms`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.rooms) {
        rooms = data.rooms;
      }
    }
  } catch (err) {
    console.error("Failed to fetch rooms for home page:", err);
  }

  let reviews = [];
  try {
    const res = await fetch(`${backendUrl}/api/reviews`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        reviews = data.data;
      }
    }
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
