import { Metadata } from "next";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Contact & Booking | Vikas Residency",
  description: "Get in touch with us or book your stay directly for the best rates at Vikas Residency Varanasi.",
};

export default function ContactPage() {
  return (
    <main className="pt-24 bg-primary dark:bg-[#0a0908] min-h-screen">
      <Booking />
    </main>
  );
}
