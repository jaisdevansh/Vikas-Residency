"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Wifi, Coffee, Wind, Tv } from "lucide-react";

type Room = {
  id: string;
  name: string;
  price: string;
  image: string;
  features: string[];
  category: string;
};

export default function RoomsClient({ initialRooms }: { initialRooms: Room[] }) {
  const [filter, setFilter] = useState("all");

  const filteredRooms = filter === "all" 
    ? initialRooms 
    : initialRooms.filter(room => room.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["all", "premium"].map((cat) => {
          const displayCat = cat === "budget-friendly" 
            ? "Budget Friendly" 
            : cat.charAt(0).toUpperCase() + cat.slice(1);
          
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                filter === cat 
                  ? "bg-primary text-white dark:text-[#141210] shadow-md" 
                  : "bg-card text-primary hover:bg-primary/10 border border-primary/20"
              }`}
            >
              {displayCat}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredRooms.map((room) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={room.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group flex flex-col"
            >
              <Link href={`/rooms/${room.id}`} className="flex flex-col h-full cursor-pointer">
                <div className="relative h-64 overflow-hidden shrink-0">
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

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif text-primary mb-2">{room.name}</h3>
                  
                  <div className="flex gap-3 mb-4 text-primary/70">
                    <span className="bg-beige p-2 rounded-full"><Wind size={18} /></span>
                    <span className="bg-beige p-2 rounded-full"><Wifi size={18} /></span>
                    <span className="bg-beige p-2 rounded-full"><Tv size={18} /></span>
                  </div>

                  <ul className="mb-8 space-y-2 flex-1">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="w-full text-center py-2 px-4 border border-input rounded-md font-medium group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
