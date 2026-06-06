import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Premium Budget Homestay in Varanasi | Vikas Residency",
  description: "Looking for an affordable yet luxurious stay in Kashi? Vikas Residency is the top-rated budget homestay in Varanasi offering modern amenities at great prices.",
};

export default function BudgetHomestay() {
  return (
    <main className="pt-32 pb-24 bg-card min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Premium Budget Homestay in Varanasi</h1>
        <div className="w-24 h-1 bg-accent mb-10" />
        
        <div className="prose prose-lg prose-p:text-foreground/80">
          <p className="text-xl font-light mb-6">
            Traveling to Varanasi shouldn't mean compromising on comfort. At Vikas Residency, we believe in providing a premium experience that fits your budget.
          </p>
          
          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">Affordable Luxury</h2>
          <p className="mb-4">
            We bridge the gap between expensive luxury hotels and basic guest houses. Our rooms are priced competitively, making us the preferred choice for long-stay travelers, pilgrims, and budget-conscious tourists who still want impeccable hygiene and service.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Spotlessly clean air-conditioned rooms.</li>
            <li>Complimentary high-speed WiFi.</li>
            <li>In-house dining serving hygienic, vegetarian meals.</li>
            <li>Transparent pricing with zero hidden charges.</li>
          </ul>

          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">Direct Booking Benefits</h2>
          <p className="mb-8">
            When you book a room directly through our website or via phone, you bypass the heavy commissions charged by online travel agencies. We pass these savings directly to you, ensuring you get the absolute lowest price for your stay in Varanasi.
          </p>

          <div className="bg-beige p-8 rounded-2xl border border-primary/10 text-center mt-12">
            <h3 className="text-2xl font-serif text-primary mb-4">Get the Best Price Guaranteed</h3>
            <p className="mb-6 text-foreground/70">Call us directly to unlock special discounts and extended-stay offers.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="primary">Book Online</Button>
              </Link>
              <a href="tel:+919795756509">
                <Button size="lg" variant="outline">Call Now</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
