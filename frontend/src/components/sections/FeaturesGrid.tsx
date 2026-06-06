"use client";

import { useEffect, useRef, useState, memo, ReactNode } from "react";
import { MapPin, ShieldCheck, HeartHandshake, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  colorClass: string;
  bgClass: string;
  borderHover: string;
  index: number;
  isInView: boolean;
  reduceMotion: boolean;
};

const FeatureCard = memo(({ icon, title, desc, colorClass, bgClass, borderHover, index, isInView, reduceMotion }: FeatureCardProps) => (
  <div
    className={cn(
      "bg-[var(--beige)] p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 border border-transparent",
      borderHover,
      isInView || reduceMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}
    style={{ transitionDelay: reduceMotion ? "0ms" : `${index * 150}ms` }}
  >
    <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors", bgClass, colorClass)}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
    <p className="text-foreground/70 text-sm leading-relaxed">{desc}</p>
  </div>
));
FeatureCard.displayName = "FeatureCard";

const features = [
  {
    icon: <MapPin size={28} />,
    title: "Prime Location",
    desc: "Walking distance to Kashi Vishwanath Temple and major tourist spots. The perfect base for your spiritual journey.",
    colorClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    borderHover: "hover:border-rose-500/50",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Family Friendly",
    desc: "Spacious rooms and a safe, welcoming environment ideal for families visiting Varanasi.",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    borderHover: "hover:border-blue-500/50",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Safe & Secure",
    desc: "24/7 security and assistance to ensure peace of mind during your stay in the holy city.",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    borderHover: "hover:border-emerald-500/50",
  },
  {
    icon: <Coffee size={28} />,
    title: "Modern Amenities",
    desc: "High-speed WiFi, AC rooms, and complimentary breakfast blending traditional hospitality with modern comfort.",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    borderHover: "hover:border-amber-500/50",
  }
];

export default function FeaturesGrid() {
  const { reduceMotion } = useAdaptiveConfig();

  return (
    <section className="py-16 md:py-24 bg-[var(--bg)] relative z-10 content-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, i) => (
            <FeatureCard key={i} index={i} isInView={true} reduceMotion={reduceMotion} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
