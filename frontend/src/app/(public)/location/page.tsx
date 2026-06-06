import { Metadata } from "next";
import LocationMap from "@/components/sections/LocationMap";

export const metadata: Metadata = {
  title: "Location | Homestay near Kashi Vishwanath & Ghats",
  description: "Find your way to Vikas Residency. Centrally located homestay at Sonia Road, Varanasi, perfectly connected to Kashi Vishwanath, Dashashwamedh Ghat, and the railway station.",
};

export default function LocationPage() {
  return (
    <main className="pt-32 pb-24 bg-card min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">How to Reach Us</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Perfectly situated in the spiritual heart of Varanasi, offering easy access to major attractions and transit hubs.
          </p>
        </div>

        <LocationMap />
      </div>
    </main>
  );
}
