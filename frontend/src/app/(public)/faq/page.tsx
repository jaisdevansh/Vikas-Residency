import { Metadata } from "next";
import FAQPreview from "@/components/sections/FAQPreview";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Vikas Residency",
  description: "Have questions about your stay in Varanasi? Read our FAQs regarding check-in times, amenities, and nearby ghats.",
};

export default function FAQPage() {
  return (
    <main className="pt-24 min-h-screen bg-card">
      <FAQPreview />
    </main>
  );
}
