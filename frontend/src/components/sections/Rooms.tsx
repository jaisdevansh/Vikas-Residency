"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Wifi, Coffee, Wind, Tv } from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Luxury Suite",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
    features: ["King Size Bed", "Balcony View", "Jacuzzi", "Breakfast Included"],
    icons: [<Wind key="ac" size={18}/>, <Wifi key="wifi" size={18}/>, <Coffee key="coffee" size={18}/>, <Tv key="tv" size={18}/>],
  },
  {
    id: 2,
    name: "Premium Room",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
    features: ["Queen Size Bed", "City View", "Work Desk", "Free WiFi"],
    icons: [<Wind key="ac" size={18}/>, <Wifi key="wifi" size={18}/>, <Tv key="tv" size={18}/>],
  },
  {
    id: 3,
    name: "Cozy Standard",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    features: ["Double Bed", "Attached Bath", "Room Service", "Free WiFi"],
    icons: [<Wifi key="wifi" size={18}/>, <Tv key="tv" size={18}/>],
  },
];

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="py-24 bg-beige relative">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-primary mb-4"
          >
            Our Accommodations
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-foreground/70 max-w-2xl mx-auto"
          >
            Choose from our carefully curated rooms, designed to provide the utmost comfort and elegance for your stay.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-1 rounded-full text-primary font-bold shadow-sm">
                  {room.price} <span className="text-sm font-normal text-foreground/60">/ night</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif text-primary mb-2">{room.name}</h3>
                
                <div className="flex gap-3 mb-4 text-primary/70">
                  {room.icons.map((icon, i) => (
                    <span key={i} className="bg-beige p-2 rounded-full">
                      {icon}
                    </span>
                  ))}
                </div>

                <ul className="mb-6 space-y-2">
                  {room.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
