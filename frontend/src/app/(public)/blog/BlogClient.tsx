"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, User, Compass, ArrowRight } from "lucide-react";
import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "spiritual" | "cuisine" | "tips";
  categoryLabel: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
  };
};

const categories = [
  { id: "all", name: "All Guides" },
  { id: "spiritual", name: "Spiritual & Ghats" },
  { id: "cuisine", name: "Local Cuisine" },
  { id: "tips", name: "Travel Tips" },
];

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { reduceMotion } = useAdaptiveConfig();

  const filteredPosts = posts.filter(
    (post) => activeCategory === "all" || post.category === activeCategory
  );

  const featuredPost = posts[0]; // Let's make the first post the featured one
  const gridPosts = filteredPosts.filter((post) => activeCategory !== "all" || post.slug !== featuredPost.slug);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div className="space-y-16">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-primary/10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-accent text-[#0f3d2e] shadow-md scale-105"
                : "bg-card hover:bg-primary/5 text-foreground/80 border border-primary/10 hover:border-accent/30"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FEATURED POST SPOTLIGHT (Only shown when "All" category is active) */}
      {activeCategory === "all" && featuredPost && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card dark:bg-[#1a1714] rounded-3xl overflow-hidden border border-primary/5 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Featured Image */}
          <div className="lg:col-span-7 relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden group">
            <Image
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute top-6 left-6 bg-accent text-[#0f3d2e] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
              {featuredPost.categoryLabel}
            </span>
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-accent uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <Compass className="w-4 h-4" /> Featured Guide
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-primary dark:text-[var(--primary)] leading-tight hover:text-accent transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed font-light">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-primary/5 dark:border-white/5 flex items-center justify-between">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-accent font-bold">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{featuredPost.author.name}</p>
                  <p className="text-xs text-foreground/50">{featuredPost.author.role}</p>
                </div>
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="flex items-center gap-2 text-sm font-bold text-primary dark:text-accent hover:underline group">
                Read Guide
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* GRID LAYOUT FOR POSTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridPosts.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={reduceMotion ? { opacity: 1 } : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="bg-card dark:bg-[#1a1714] rounded-2xl overflow-hidden border border-primary/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
          >
            {/* Post Image */}
            <div className="relative h-[240px] w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-accent text-[#0f3d2e] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                {post.categoryLabel}
              </span>
            </div>

            {/* Post Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-serif text-primary dark:text-[var(--primary)] leading-snug group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-foreground/70 text-sm font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-primary/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-accent font-bold">
                    <User size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{post.author.name}</p>
                    <p className="text-[10px] text-foreground/45">{post.author.role}</p>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline group">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {gridPosts.length === 0 && (
        <div className="text-center py-12 bg-card dark:bg-card/40 rounded-2xl border border-primary/10">
          <BookOpen className="mx-auto w-12 h-12 text-foreground/40 mb-3" />
          <p className="text-foreground/60 font-semibold text-lg">No posts found under this category</p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-3 text-sm text-accent hover:underline font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
