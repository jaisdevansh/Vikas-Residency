import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Vikas Residency Varanasi",
  description: "Learn about the heritage, philosophy, and unique family hospitality behind Vikas Residency in Varanasi.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-card">
      <AboutClient />
    </main>
  );
}
