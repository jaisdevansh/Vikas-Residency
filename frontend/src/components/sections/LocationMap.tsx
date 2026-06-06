"use client";

import { MapPin, Plane, Train, Trees, Landmark } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { icon: <Landmark size={24} />, name: "Kashi Vishwanath Temple", distance: "10 mins drive" },
  { icon: <Trees size={24} />, name: "Dashashwamedh Ghat", distance: "15 mins drive" },
  { icon: <Train size={24} />, name: "Varanasi Junction (BSB)", distance: "10 mins drive" },
  { icon: <Plane size={24} />, name: "LBS International Airport", distance: "45 mins drive" },
];

export default function LocationMap() {
  const ref = useScrollReveal("-100px");

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="reveal reveal-left w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className="text-2xl font-serif text-primary flex items-center gap-2 mb-4">
            <MapPin className="text-accent" /> Prime Location in Varanasi
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            Vikas Residency is strategically located at Sonia Road, offering both tranquility and accessibility. Nestled away from the city's hustle, yet perfectly connected to major transit points and holy ghats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-beige border border-primary/10 hover:border-accent/50 transition-colors">
              <div className="text-primary bg-card p-2 rounded-lg shadow-sm">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-foreground">{item.name}</h4>
                <p className="text-sm text-foreground/60">{item.distance}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <p className="text-sm text-foreground/50 italic">
            * Local guided tours available upon request.
          </p>
        </div>
      </div>

      <div className="reveal reveal-right delay-2 w-full lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <iframe
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=25.3127,82.9968+(Vikash%20Residency)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
