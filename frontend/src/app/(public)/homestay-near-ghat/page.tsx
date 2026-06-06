import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Best Homestay Near Ghats in Varanasi | Vikas Residency",
  description: "Stay minutes away from Assi Ghat and Dashashwamedh Ghat. Vikas Residency offers premium rooms for pilgrims and travelers seeking spiritual closeness to the Ganga.",
};

export default function HomestayNearGhat() {
  return (
    <main className="pt-32 pb-24 bg-beige min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Homestay Near the Holy Ghats</h1>
        <div className="w-24 h-1 bg-accent mb-10" />
        
        <div className="prose prose-lg prose-p:text-foreground/80">
          <p className="text-xl font-light mb-6">
            For centuries, the ghats of Varanasi have drawn spiritual seekers, photographers, and travelers from around the globe. To truly experience the magic of Kashi, staying near these ancient stone steps is essential.
          </p>
          
          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">Why Stay Near the Ghats?</h2>
          <p className="mb-4">
            Waking up to the sound of temple bells and witnessing the majestic sunrise over the River Ganges is a transformative experience. By choosing <strong>Vikas Residency</strong>, you position yourself perfectly to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Attend the mesmerizing morning Subah-e-Banaras at Assi Ghat effortlessly.</li>
            <li>Take an early morning boat ride without the hassle of navigating morning traffic.</li>
            <li>Witness the spectacular evening Ganga Aarti at Dashashwamedh Ghat.</li>
            <li>Explore the narrow, winding alleys (galis) that hide centuries-old temples.</li>
          </ul>

          <h2 className="text-3xl font-serif text-primary mt-12 mb-4">The Vikas Residency Advantage</h2>
          <p className="mb-8">
            While we are located remarkably close to the ghats, we are also tucked away just enough to shield you from the overwhelming noise and crowds. After a day of sensory overload in Varanasi, our homestay provides a clean, air-conditioned, and deeply peaceful sanctuary.
          </p>

          <div className="bg-card p-8 rounded-2xl shadow-lg text-center mt-12">
            <h3 className="text-2xl font-serif text-primary mb-4">Ready for your spiritual journey?</h3>
            <p className="mb-6 text-foreground/70">Book your stay today and secure the best room near the Ganga.</p>
            <Link href="/contact">
              <Button size="lg" variant="gold">Check Availability</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
