"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

const backgroundImages = [
  {
    url: "/1.jpeg",
    alt: "Varanasi Ghats at Sunrise"
  },
  {
    url: "/2.jpeg",
    alt: "Spiritual Ganga Aarti"
  },
  {
    url: "/3.jpeg",
    alt: "Premium Comfort Homestay Rooms"
  },
  {
    url: "/4.jpeg",
    alt: "Scenic River Ganges"
  },
  {
    url: "/5.jpeg",
    alt: "Vikas Residency"
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([0, 1]); // Load first and next image initially
  const [showNumbers, setShowNumbers] = useState(false);
  const { isSlowNetwork, reduceMotion } = useAdaptiveConfig();

  // Determine dynamic image quality based on network
  const imageQuality = isSlowNetwork ? 50 : 75;

  useEffect(() => {
    // Pause auto-sliding on slow networks or if reduce motion is preferred
    if (isSlowNetwork || reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % backgroundImages.length;
        setLoadedImages((prevLoaded) => {
          const nextToLoad = (next + 1) % backgroundImages.length;
          if (!prevLoaded.includes(nextToLoad)) {
            return [...prevLoaded, nextToLoad];
          }
          return prevLoaded;
        });
        return next;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isSlowNetwork, reduceMotion]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Images */}
      {backgroundImages.map((img, index) => {
        if (!loadedImages.includes(index)) return null;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover"
              sizes="100vw"
              quality={imageQuality}
            />
          </div>
        );
      })}

      {/* Persistent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 flex flex-col items-center text-center">
        <p
          className="text-accent tracking-[0.2em] uppercase text-sm md:text-base font-semibold mb-4 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Spiritual Elegance in Varanasi
        </p>
        
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white max-w-4xl leading-tight mb-6 drop-shadow-lg px-2 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          Discover Inner Peace at <span className="text-accent italic">Vikas Residency</span>
        </h1>

        <p
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light px-2 animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          Your premium homestay near Kashi Vishwanath Temple. Experience authentic hospitality with modern comforts in the heart of Varanasi.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 w-full px-4 sm:px-0 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <Link href="/rooms" className="w-full sm:w-auto">
            <Button size="lg" variant="gold" className="text-lg px-8 w-full">
              Book Now
            </Button>
          </Link>
          
          <div 
            className="relative w-full sm:w-auto flex flex-col items-center z-45"
            onMouseEnter={() => setShowNumbers(true)}
            onMouseLeave={() => setShowNumbers(false)}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10 text-lg px-8 gap-2 backdrop-blur-sm w-full sm:w-auto flex items-center justify-center relative z-45"
              onClick={() => setShowNumbers(!showNumbers)}
            >
              <PhoneCall size={20} />
              <span>Call the Host</span>
            </Button>
            
            <AnimatePresence>
              {showNumbers && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 top-full mt-2 w-64 bg-white dark:bg-[#1c1916] text-gray-900 dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-white/10 p-4 space-y-3 left-1/2 -translate-x-1/2"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-center">
                    Select a number to call
                  </p>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="tel:9795756509" 
                      className="flex items-center justify-center px-3 py-2.5 bg-gray-50 hover:bg-blue-50 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors text-primary"
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-lg">9795756509</span>
                    </a>
                    <a 
                      href="tel:8318635270" 
                      className="flex items-center justify-center px-3 py-2.5 bg-gray-50 hover:bg-blue-50 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors text-primary"
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-lg">8318635270</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div 
          className="flex gap-3 mt-12 animate-fade-in-up"
          style={{ animationDelay: "1000ms" }}
        >
          {backgroundImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setLoadedImages((prev) => prev.includes(i) ? prev : [...prev, i]);
                setCurrentImageIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentImageIndex === i ? "bg-accent w-8" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-fade-in-up"
        style={{ animationDelay: "1500ms" }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  );
}
