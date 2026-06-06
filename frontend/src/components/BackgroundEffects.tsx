"use client";

import { useAdaptiveConfig } from "@/context/AdaptivePerformanceContext";

export default function BackgroundEffects() {
  const { isLowEndDevice, performanceTier, reduceMotion } = useAdaptiveConfig();

  // On low-end devices (e.g. budget phones), rendering huge overlapping CSS blur filters 
  // causes massive GPU bottlenecks and scrolling lag. We disable them entirely to guarantee 60fps.
  if (isLowEndDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--bg)] transition-colors duration-500">
      
      {/* Structural Grid Pattern (Only visible in dark mode for depth) */}
      <div className="absolute inset-0 hidden dark:block opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Subtle Noise Texture removed for performance optimization */}
      {/* Static Glowing Orbs (CSS animated was too heavy for 95+ performance) */}
      {performanceTier === "high" && !reduceMotion && (
        <>
          <div
            className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-accent opacity-5 dark:opacity-10 dark:mix-blend-screen"
          />
          
          <div
            className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-primary opacity-5 dark:opacity-10 dark:mix-blend-screen"
          />
        </>
      )}
      
      {/* Dark mode Vignette gradient (darkens edges) */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply pointer-events-none" />
    </div>
  );
}
