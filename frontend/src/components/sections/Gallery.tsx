"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type GalleryImage = {
  id: number;
  image_url: string;
  caption: string;
};

const defaultImages: GalleryImage[] = [
  { id: 1, image_url: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?q=80&w=1200&auto=format&fit=crop", caption: "Premium Accommodation" },
  { id: 2, image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop", caption: "Spiritual Ganga Aarti" },
  { id: 3, image_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop", caption: "Stunning Sunrises" },
  { id: 4, image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop", caption: "Peaceful Spaces" },
  { id: 5, image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop", caption: "Traditional Hospitality" },
  { id: 6, image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop", caption: "Elegant Interiors" },
];

export default function Gallery({ initialImages }: { initialImages?: GalleryImage[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images] = useState<GalleryImage[]>(
    initialImages && initialImages.length > 0 ? initialImages : defaultImages
  );

  return (
    <section id="gallery" className="py-24 bg-card relative">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-primary mb-4"
          >
            Gallery
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto"
          />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: Math.min(0.1 * index, 0.5) }}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
              onClick={() => setSelectedImage(img.image_url)}
            >
              <Image
                src={img.image_url}
                alt={img.caption || `Gallery image ${index + 1}`}
                width={800}
                height={600}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4">
                {img.caption && (
                  <span className="text-white text-sm font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {img.caption}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
