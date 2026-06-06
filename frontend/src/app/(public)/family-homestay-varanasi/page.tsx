import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Family Homestay in Varanasi | Safe & Secure | Vikas Residency",
  description: "Planning a family trip to Kashi? Vikas Residency offers spacious family rooms, 24/7 security, and a peaceful environment ideal for families.",
};

export default function FamilyHomestay() {
  return (
    <main className="pt-32 pb-24 bg-card min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Family Homestay in Kashi</h1>
        <div className="w-24 h-1 bg-accent mb-10" />
        
        <div className="prose prose-lg prose-p:text-foreground/80">
          <p className="text-xl font-light mb-6">
            Traveling with family, especially elderly parents or young children, requires special care and a safe environment. Vikas Residency is proudly recognized as one of the most family-friendly homestays in Varanasi.
          </p>
          
          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">Designed for Families</h2>
          <p className="mb-4">
            We understand that families need space to bond and relax. Our Heritage Family Rooms are significantly larger than standard hotel rooms, offering comfortable bedding configurations so the whole family can stay together.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Interconnected and oversized family rooms available.</li>
            <li>24/7 Security and CCTV surveillance.</li>
            <li>In-house, purely vegetarian kitchen handling special dietary requests.</li>
            <li>Assistance with arranging reliable local transport and temple darshan.</li>
          </ul>

          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">Peace of Mind</h2>
          <p className="mb-8">
            Navigating the bustling streets of Varanasi can be overwhelming for families. Our staff acts as your local concierge, helping you plan your itinerary, arrange safe boat rides, and ensuring you return to a cool, quiet, and comforting environment.
          </p>

          <div className="bg-primary dark:bg-[#1a1714] text-white p-8 rounded-2xl shadow-lg text-center mt-12">
            <h3 className="text-2xl font-serif text-accent mb-4">Plan Your Family Pilgrimage</h3>
            <p className="mb-6 text-white/80">Contact us to arrange multiple rooms or discuss your specific family needs.</p>
            <Link href="/contact">
              <Button size="lg" variant="gold">Contact Our Team</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
