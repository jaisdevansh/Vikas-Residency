"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-card shadow-[0_-4px_15px_rgba(0,0,0,0.1)] rounded-t-2xl p-4 flex gap-4"
        >
          <a 
            href="tel:+919795756509"
            className="flex-1 bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform"
          >
            <Phone size={20} />
            Call Now
          </a>
          <a 
            href="https://wa.me/919795756509"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
