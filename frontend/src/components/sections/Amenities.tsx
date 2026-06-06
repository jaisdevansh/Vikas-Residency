"use client";

import { useRef, memo, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Coffee, Wifi, Car, Utensils, ShieldCheck, Dumbbell, Waves, Trees } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type AmenityCardProps = {
  icon: ReactNode;
  name: string;
  desc: string;
  itemVariants: any;
};

const AmenityCard = memo(({ icon, name, desc, itemVariants }: AmenityCardProps) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/5 border border-white/10 hover:bg-card/10 transition-colors"
  >
    <div className="text-accent mb-4 p-4 rounded-full bg-card/5">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{name}</h3>
    <p className="text-white/60 text-sm">{desc}</p>
  </motion.div>
));
AmenityCard.displayName = "AmenityCard";

export default function Amenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Premium Amenities
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {amenities.map((item, i) => (
            <AmenityCard key={i} itemVariants={itemVariants} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
