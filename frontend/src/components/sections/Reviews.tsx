"use client";

import { useRef, memo, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

type ReviewData = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

const avatarColors = [
  "bg-gradient-to-br from-yellow-500/20 to-amber-900/40 text-yellow-500 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
  "bg-gradient-to-br from-emerald-500/20 to-teal-900/40 text-emerald-500 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  "bg-gradient-to-br from-blue-500/20 to-indigo-900/40 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  "bg-gradient-to-br from-rose-500/20 to-red-900/40 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
  "bg-gradient-to-br from-purple-500/20 to-fuchsia-900/40 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
  "bg-gradient-to-br from-orange-500/20 to-red-900/40 text-orange-400 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
  "bg-gradient-to-br from-slate-400/20 to-slate-800/40 text-slate-300 border-slate-500/30 shadow-[0_0_15px_rgba(148,163,184,0.15)]"
];

type ReviewCardProps = {
  review: { name: string; rating: number; text: string; date: string };
  index: number;
  isInView: boolean;
};

const ReviewCard = memo(({ review, index, isInView }: ReviewCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    className="break-inside-avoid relative"
  >
    <div className="group bg-gradient-to-br from-[var(--card)] to-transparent rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-accent/5 transition-all duration-500 border border-white/5 hover:border-accent/30 flex flex-col h-full overflow-hidden backdrop-blur-sm hover:-translate-y-2">
      
      {/* Huge Elegant Serif Text Watermark Quote */}
      <div className="absolute -top-12 -left-4 text-[160px] leading-none font-serif text-accent/5 group-hover:text-accent/10 transition-colors duration-500 pointer-events-none select-none">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex mb-6 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < review.rating ? "fill-accent text-accent drop-shadow-sm" : "text-gray-300"} 
            />
          ))}
        </div>
        
        <p className="text-lg md:text-xl text-foreground font-serif italic mb-10 leading-relaxed">
          "{review.text}"
        </p>
        
        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5 group-hover:border-accent/20 transition-colors">
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border shrink-0 ${avatarColors[index % avatarColors.length]}`}>
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-primary tracking-wide text-sm">{review.name}</h4>
            <p className="text-xs text-foreground/50 mt-1">{review.date} • Verified Guest</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));
ReviewCard.displayName = "ReviewCard";

const defaultReviews: ReviewData[] = [
  {
    id: "rev1",
    name: "Rahul Verma",
    rating: 5,
    text: "Best location in Varanasi.",
    date: "1 month ago"
  },
  {
    id: "rev2",
    name: "Sneha Reddy",
    rating: 5,
    text: "Amazing stay with friends. Owner is very cooperative. Great location — highly recommended for a budget trip.",
    date: "2 months ago"
  },
  {
    id: "rev3",
    name: "Amit Kumar",
    rating: 5,
    text: "All sightseeing places were right in front. Owner was very helpful. Reasonable price too.",
    date: "3 months ago"
  },
  {
    id: "rev4",
    name: "Priya Singh",
    rating: 5,
    text: "Stayed with family. Completely safe and comfortable. All places to visit are right next to the hotel.",
    date: "4 months ago"
  },
  {
    id: "rev5",
    name: "Vikram Sharma",
    rating: 5,
    text: "Great hotel with perfect location. All tourist spots nearby. Owner is very nice and humble. Totally worth it.",
    date: "5 months ago"
  }
];

export default function Reviews({ initialReviews }: { initialReviews?: ReviewData[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews] = useState<ReviewData[]>(
    initialReviews && initialReviews.length > 0 ? initialReviews : defaultReviews
  );

  return (
    <section className="py-24 bg-[var(--beige)] relative overflow-hidden z-10">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-serif text-primary mb-6"
          >
            Guest Experiences
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-32 h-1 bg-accent mx-auto rounded-full"
          />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
