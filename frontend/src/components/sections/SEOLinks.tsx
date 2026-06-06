"use client";

import Link from "next/link";
import { Map, Wallet, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const seoPages = [
  {
    title: "Homestay near Ghats",
    href: "/homestay-near-ghat",
    icon: <Map size={24} />,
    desc: "Experience the evening Ganga Aarti with just a 5-minute walk from our property."
  },
  {
    title: "Budget Homestay Varanasi",
    href: "/budget-homestay-varanasi",
    icon: <Wallet size={24} />,
    desc: "Premium comfort that doesn't break the bank. Best rates guaranteed for direct booking."
  },
  {
    title: "Family Homestay in Kashi",
    href: "/family-homestay-varanasi",
    icon: <Users size={24} />,
    desc: "Spacious rooms and secure environment, perfect for family spiritual trips."
  }
];

export default function SEOLinks() {
  const ref = useScrollReveal("-100px");

  return (
    <section className="py-20 bg-primary dark:bg-[#1a1714] text-white relative border-b border-white/10">
      <div className="container mx-auto px-4" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-12">
          <h2 className="reveal text-2xl md:text-3xl font-serif mb-4 text-accent">
            Discover Varanasi Your Way
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {seoPages.map((page, index) => (
            <div
              key={index}
              className={`reveal delay-${index + 1}`}
            >
              <Link
                href={page.href}
                className="block h-full bg-card/5 border border-white/10 p-6 rounded-xl hover:bg-card/10 hover:border-accent/50 transition group"
              >
                <div className="text-accent mb-4 p-3 bg-card/5 inline-block rounded-lg group-hover:scale-110 transition-transform">
                  {page.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {page.desc}
                </p>
                <div className="mt-4 text-accent text-sm font-bold flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition">
                  Read More &rarr;
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
