"use client";

import { useRef, memo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";

import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

type RoomCardProps = {
  id: string;
  name: string;
  price: string;
  image: string;
  desc: string;
  index: number;
  isInView: boolean;
  reduceMotion: boolean;
};

const RoomCard = memo(({ id, name, price, image, desc, index, isInView, reduceMotion }: RoomCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: reduceMotion ? 0 : 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 50 }}
    transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.2 + index * 0.1 }}
    whileHover={reduceMotion ? {} : { y: -10 }}
    className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group"
  >
    <Link href={`/rooms/${id}`} className="block h-full cursor-pointer">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
          className={`object-cover transition-transform duration-700 ${reduceMotion ? '' : 'group-hover:scale-110'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-1 rounded-full text-primary font-bold shadow-sm">
          {price} <span className="text-sm font-normal text-foreground/60">/ night</span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-serif text-primary mb-3">{name}</h3>
        <p className="text-foreground/70 mb-6">{desc}</p>
        <div className="mt-auto inline-flex items-center text-primary font-bold group-hover:text-accent transition-colors duration-300">
          Explore Details &rarr;
        </div>
      </div>
    </Link>
  </motion.div>
));
RoomCard.displayName = "RoomCard";

const defaultFeaturedRooms = [
  {
    id: "r1",
    name: "Premium Comfort Room",
    price: "₹2,500",
    image: "/r1.2.jpeg",
    desc: "Immerse yourself in the spiritual essence of Varanasi. Specially designed for ultimate relaxation with powerful AC and seamless WiFi.",
  },
  {
    id: "r2",
    name: "Spacious Family Room",
    price: "₹1,500",
    image: "/r2.jpeg",
    desc: "Perfect for small groups or families visiting Varanasi, this room offers generous space and modern amenities for a comfortable stay.",
  }
];

export default function RoomsPreview({ initialRooms }: { initialRooms?: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useAdaptiveConfig();
  
  const getFormattedRooms = () => {
    if (initialRooms && initialRooms.length > 0) {
      return initialRooms.map((room: any) => ({
        id: String(room.id),
        name: room.name || room.title,
        price: typeof room.price === "number" 
          ? `₹${room.price.toLocaleString('en-IN')}` 
          : String(room.price).startsWith('₹') ? room.price : `₹${room.price}`,
        image: room.image_url || room.image || "/r1.2.jpeg",
        desc: room.desc || `${room.capacity} Persons capacity. Includes Free WiFi and AC.`,
      }));
    }
    return defaultFeaturedRooms;
  };

  const [featuredRooms] = useState<any[]>(getFormattedRooms());

  return (
    <section className="py-16 md:py-24 bg-beige relative content-auto">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 20 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6 }}
              className="text-4xl md:text-5xl font-serif text-primary mb-4"
            >
              Premium Rooms in Varanasi
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
              className="w-24 h-1 bg-accent"
            />
            <motion.p 
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 20 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.3 }}
              className="mt-6 text-foreground/70"
            >
              Whether you're visiting for spiritual awakening or a family vacation, our carefully designed rooms offer the perfect sanctuary after a day exploring the ghats.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reduceMotion ? 0 : 20 }}
            transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.4 }}
          >
            <Link href="/rooms">
              <Button variant="outline" className="hidden md:inline-flex border-primary text-primary hover:bg-primary hover:text-white">
                View All Rooms
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <RoomCard key={room.id} index={index} isInView={isInView} reduceMotion={reduceMotion} {...room} />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/rooms">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white w-full">
              View All Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
