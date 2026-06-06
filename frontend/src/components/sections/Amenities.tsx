"use client";

import { memo, ReactNode } from "react";
import { Coffee, Wifi, Car, Utensils, ShieldCheck, Dumbbell, Waves, Trees } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const amenities = [
  { icon: <Wifi size={32} />, name: "High-Speed WiFi", desc: "Stay connected always" },
  { icon: <Coffee size={32} />, name: "Free Breakfast", desc: "Start your day right" },
  { icon: <Car size={32} />, name: "Secure Parking", desc: "Safe spot for your ride" },
  { icon: <Utensils size={32} />, name: "In-house Dining", desc: "Delicious local cuisine" },
  { icon: <ShieldCheck size={32} />, name: "24/7 Security", desc: "Safe & secure stay" },
  { icon: <Dumbbell size={32} />, name: "Fitness Center", desc: "Keep up your routine" },
  { icon: <Trees size={32} />, name: "Nature Trails", desc: "Explore the surroundings" },
  { icon: <Waves size={32} />, name: "Swimming Pool", desc: "Relax and unwind" },
];

type AmenityCardProps = {
  icon: ReactNode;
  name: string;
  desc: string;
  delayClass: string;
};

const AmenityCard = memo(({ icon, name, desc, delayClass }: AmenityCardProps) => (
  <div className={`reveal ${delayClass} flex flex-col items-center text-center p-6 rounded-2xl bg-card/5 border border-white/10 hover:bg-card/10 hover:scale-105 transition-transform`}>
    <div className="text-accent mb-4 p-4 rounded-full bg-card/5">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{name}</h3>
    <p className="text-white/60 text-sm">{desc}</p>
  </div>
));
AmenityCard.displayName = "AmenityCard";

const delayClasses = ["delay-1", "delay-2", "delay-3", "delay-4", "delay-5", "delay-6", "delay-7", "delay-8"];

export default function Amenities() {
  const ref = useScrollReveal("-100px");

  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="container mx-auto px-4" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="text-center mb-16">
          <h2 className="reveal text-4xl md:text-5xl font-serif mb-4">
            Premium Amenities
          </h2>
          <div className="reveal reveal-scale delay-2 w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {amenities.map((item, i) => (
            <AmenityCard key={i} delayClass={delayClasses[i]} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
