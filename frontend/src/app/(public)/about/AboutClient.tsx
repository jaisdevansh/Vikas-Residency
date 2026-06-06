"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Compass, Sparkles, HeartHandshake, ShieldCheck, MapPin, Coffee, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

const pillars = [
  {
    icon: <HeartHandshake className="w-8 h-8 text-accent" />,
    title: "Genuine Host Family Warmth",
    desc: "Experience true Indian hospitality. Our family resides nearby and is always available to share insider tips, local customs, and treat you like family.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    title: "Curated Spiritual & Aarti Guidance",
    desc: "Navigate the complex spiritual landscape of Varanasi with ease. We assist with Ganga Aarti bookings, temple darshan planning, and boat rides.",
  },
  {
    icon: <Coffee className="w-8 h-8 text-accent" />,
    title: "Pure Vegetarian Satvik Kitchen",
    desc: "Savor freshly cooked, hygienic, and authentic local meals. We cater to special dietary requests and provide a true taste of Banarasi cuisine.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    title: "A Peaceful & Secure Sanctuary",
    desc: "Escape the energetic chaos of Varanasi's streets. Relax in clean, modern, air-conditioned rooms equipped with high-speed Wi-Fi and 24/7 security.",
  },
];

export default function AboutClient() {
  const { reduceMotion, performanceTier } = useAdaptiveConfig();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Refs for scroll-trigger animations
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const philosophyRef = useRef(null);
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-100px" });

  const hostRef = useRef(null);
  const hostInView = useInView(hostRef, { once: true, margin: "-100px" });

  return (
    <div className="w-full bg-[var(--bg)] text-[var(--text)] overflow-hidden pt-20">
      {/* 1. STUNNING HERO SECTION */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center bg-black">
        {/* Background Image of Varanasi */}
        <div className="absolute inset-0 w-full h-full opacity-60">
          <Image
            src="/1.jpeg"
            alt="Spiritual Varanasi sunrise over Ganga river"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[var(--bg)] z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-accent uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
              <Compass className="w-4 h-4 animate-spin-slow" /> Our Sacred Journey
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight">
              A Haven of Peace in <br />
              <span className="text-accent italic">The Eternal City</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Discover the unique story behind Vikas Residency—where authentic culture, family warmth, and contemporary convenience align.
            </p>
          </motion.div>
        </div>

        {/* Bottom Curve Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 w-full bg-[var(--bg)]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
      </section>

      {/* 2. OUR HERITAGE - STAGGERED 2-COLUMN */}
      <section ref={storyRef} className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : "hidden"}
              animate={storyInView || reduceMotion ? "visible" : "hidden"}
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-accent text-sm font-semibold tracking-wider uppercase block">
                  Rooted in Tradition
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-primary dark:text-[var(--primary)] leading-tight">
                  Steeped in Varanasi's Sacred Aura
                </h2>
              </div>
              <div className="w-20 h-[2px] bg-accent" />
              <p className="text-foreground/80 leading-relaxed text-base sm:text-lg font-light">
                Varanasi is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together. To visit this city is to step through a portal in time. 
              </p>
              <p className="text-foreground/80 leading-relaxed text-base">
                Recognizing the intense spiritual energy that sweeps through these ancient streets, we set out to build a sanctuary. **Vikas Residency** was created not just as a lodging, but as a peaceful threshold where weary travelers and passionate pilgrims could rest, integrate their experiences, and experience local culture first-hand.
              </p>
              <p className="text-foreground/85 leading-relaxed text-base font-medium">
                Here, modern comforts gracefully blend with the age-old spirit of Varanasi, ensuring you wake up refreshed and ready for your spiritual discoveries.
              </p>
            </motion.div>

            {/* Overlapping Floating Images */}
            <div className="relative h-[400px] sm:h-[480px] w-full mt-8 lg:mt-0">
              {/* Back Decorative Frame */}
              <div className="absolute top-4 left-4 right-12 bottom-12 border-2 border-accent/30 rounded-2xl -z-10" />

              {/* Main Image */}
              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
                animate={storyInView || reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 left-0 w-[80%] h-[75%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--bg)]"
              >
                <Image
                  src="/3.jpeg"
                  alt="Premium comfortable rooms inside Vikas Residency"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 70vw, 40vw"
                />
              </motion.div>

              {/* Secondary Overlapping Image */}
              <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={storyInView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute right-0 bottom-0 w-[60%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--bg)]"
              >
                <Image
                  src="/5.jpeg"
                  alt="Facade and welcoming entry of Vikas Residency"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </motion.div>

              {/* Small badge accent */}
              <motion.div
                initial={{ scale: 0 }}
                animate={storyInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                className="absolute -right-4 top-[20%] bg-primary text-white p-4 rounded-full shadow-lg border border-accent flex flex-col items-center justify-center w-24 h-24 text-center z-20"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Voted</span>
                <span className="text-sm font-bold font-serif leading-none">Top Homestay</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY BANNER - ATITHI DEVO BHAVA */}
      <section 
        ref={philosophyRef}
        className="py-16 md:py-24 bg-primary dark:bg-card border-y border-accent/20 text-white relative overflow-hidden"
      >
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : "hidden"}
            animate={philosophyInView || reduceMotion ? "visible" : "hidden"}
            variants={fadeIn}
            className="space-y-6"
          >
            <Quote className="w-12 h-12 text-accent mx-auto opacity-60" />
            <h3 className="text-3xl sm:text-5xl font-serif text-accent tracking-wide leading-none">
              अतिथि देवो भव
            </h3>
            <h4 className="text-xl sm:text-2xl font-serif italic text-gray-200">
              "Atithi Devo Bhava"
            </h4>
            <div className="w-16 h-[1px] bg-accent/50 mx-auto" />
            <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto italic">
              "The guest is a physical manifestation of the Divine." This ancient Sanskrit principle is the heartbeat of our home. We do not offer rooms; we offer our hearts, our family's shelter, and our sacred traditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. WHY WE STAND OUT - PREMIUM GLASS CARDS */}
      <section ref={pillarsRef} className="py-20 md:py-28 bg-[var(--beige)] relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase block">
              The Homestay Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-primary dark:text-[var(--primary)]">
              Crafting a Unique Varanasi Experience
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto" />
            <p className="text-foreground/75 font-light">
              Unlike generic, impersonal hotels, Vikas Residency focuses on small details that convert a simple trip into a lifelong spiritual memory.
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : "hidden"}
            animate={pillarsInView || reduceMotion ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {pillars.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-card dark:bg-[#1a1714] p-8 rounded-2xl border border-primary/5 dark:border-white/5 hover:border-accent/40 dark:hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-5 items-start group"
              >
                <div className="p-3 bg-primary/5 dark:bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors duration-300 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 text-sm sm:text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. MEET THE HOST FAMILY */}
      <section ref={hostRef} className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-card dark:bg-[#161412] rounded-3xl overflow-hidden border border-primary/10 dark:border-white/5 shadow-2xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Host Image/Visual */}
            <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/2.jpeg"
                alt="Hosting experience and warmth in Varanasi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <p className="font-serif text-lg font-semibold tracking-wide text-accent">Warm, Local Care</p>
                <p className="text-xs text-gray-300">Available 24/7 during your stay</p>
              </div>
            </div>

            {/* Host Story Text */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : "hidden"}
              animate={hostInView || reduceMotion ? "visible" : "hidden"}
              variants={fadeIn}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-accent text-sm font-semibold tracking-wider uppercase block">
                  Hosted by Locals
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-primary dark:text-[var(--primary)] leading-tight">
                  Your Hosts in the Spiritual Heart
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed font-light text-base sm:text-lg">
                At Vikas Residency, we believe the best way to experience a culture is through the eyes of the people who live it. Our family has inhabited the sacred city of Varanasi for generations, accumulating stories, secrets, and deep spiritual knowledge of these lanes.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Whether you need advice on avoiding crowded hours at the **Kashi Vishwanath Temple**, finding local street food gems, or boarding a quiet sunrise boat ride on the Ganges, we are always delighted to guide you.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-primary/10 dark:border-white/5">
                <div>
                  <h4 className="font-serif text-3xl font-bold text-accent">24/7</h4>
                  <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-widest mt-1">Personal Support</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-accent">100%</h4>
                  <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-widest mt-1">Satvik Vegetarian</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION - ELEGANT PANEL */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0a291f] via-[#124233] to-[#0a291f] dark:from-[#1b1916] dark:via-[#151412] dark:to-[#0e0d0c] text-white text-center relative overflow-hidden">
        {/* Subtle Decorative Golden Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-3xl relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-accent tracking-wide leading-tight">
            Ready to Experience the Sacred Soul of Kashi?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Book your sanctuary of peace today and immerse yourself in the oldest living city on Earth with unmatched local warmth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/rooms" passHref legacyBehavior>
              <Button size="lg" variant="gold" className="text-base w-full sm:w-auto font-bold tracking-wide group">
                Explore Rooms 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base w-full sm:w-auto font-semibold">
                Contact & Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
