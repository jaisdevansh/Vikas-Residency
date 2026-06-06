"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "How far is Vikas Residency from Kashi Vishwanath Temple?",
    a: "We are located just a 15-minute walk or a 5-minute auto ride from the Kashi Vishwanath Temple and the main Ghats."
  },
  {
    q: "Do you allow early check-in or late check-out?",
    a: "Standard check-in is 12:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to availability and may incur nominal charges."
  },
  {
    q: "Is parking available at the homestay?",
    a: "Yes, we provide secure on-site parking for our guests free of charge. Please let us know in advance so we can reserve a spot."
  },
  {
    q: "Do you serve vegetarian food?",
    a: "Yes! In keeping with the spiritual essence of Varanasi, our in-house kitchen serves pure, delicious, and hygienic vegetarian meals."
  }
];

export default function FAQPreview() {
  const ref = useScrollReveal("-100px");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[var(--bg)] relative z-10">
      <div className="container mx-auto px-4" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="reveal text-4xl md:text-5xl font-serif text-primary mb-4">
              Common Questions
            </h2>
            <div className="reveal reveal-scale delay-2 w-24 h-1 bg-accent mb-6" />
            <p className="reveal delay-3 text-foreground/70 mb-8 leading-relaxed text-lg">
              Have questions about your stay in Varanasi? We've compiled the most common inquiries to help you plan your spiritual trip better.
            </p>
            <div className="reveal delay-4">
              <Link href="/faq">
                <Button variant="gold" size="lg" className="shadow-lg">
                  Read All FAQs
                </Button>
              </Link>
            </div>
          </div>

          <div className="reveal reveal-right delay-3 w-full lg:w-2/3 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-primary shadow-md bg-[var(--card)]' : 'border-primary/20 bg-transparent hover:border-primary/50'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none group"
                  >
                    <span className={`font-bold text-lg pr-4 transition-colors ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-primary'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary text-accent' : 'bg-primary/5 text-primary group-hover:bg-primary/10'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  {/* CSS accordion — no framer-motion needed */}
                  <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                    <div className="px-8 pb-8 text-foreground/80 text-base leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
