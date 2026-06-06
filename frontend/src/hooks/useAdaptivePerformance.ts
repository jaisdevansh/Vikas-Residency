"use client";

import { useState, useEffect } from "react";

// Extend navigator to include non-standard/experimental APIs
declare global {
  interface Navigator {
    connection?: {
      effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
      saveData?: boolean;
      downlink?: number;
      rtt?: number;
      addEventListener?: (type: string, listener: () => void) => void;
      removeEventListener?: (type: string, listener: () => void) => void;
    };
    deviceMemory?: number;
  }
}

export type PerformanceTier = "high" | "medium" | "low";

export interface AdaptiveConfig {
  isLowEndDevice: boolean;
  isSlowNetwork: boolean;
  saveDataEnabled: boolean;
  performanceTier: PerformanceTier;
  reduceMotion: boolean;
}

export function useAdaptivePerformance(): AdaptiveConfig {
  const [config, setConfig] = useState<AdaptiveConfig>({
    isLowEndDevice: false,
    isSlowNetwork: false,
    saveDataEnabled: false,
    performanceTier: "high", // Assume high-end until proven otherwise (e.g. iOS fallback)
    reduceMotion: false,
  });

  useEffect(() => {
    // Run only on client side
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const updateMetrics = () => {
      // 1. Hardware Detection
      const memory = navigator.deviceMemory || 4; // Default to 4GB if unsupported
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if unsupported
      const isLowEndDevice = memory < 4 || cores < 4;

      // 2. Network Detection
      const connection = navigator.connection;
      const effectiveType = connection?.effectiveType || "4g";
      const isSlowNetwork = effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g";
      const saveDataEnabled = connection?.saveData === true;

      // 3. User Preference (Reduce Motion OS level)
      const reduceMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReducedMotion = reduceMotionMediaQuery.matches;

      // 4. Calculate Tier
      let tier: PerformanceTier = "high";
      if (isLowEndDevice || isSlowNetwork || saveDataEnabled) {
        tier = "low";
      } else if (memory === 4) {
        tier = "medium";
      }

      setConfig({
        isLowEndDevice,
        isSlowNetwork,
        saveDataEnabled,
        performanceTier: tier,
        reduceMotion: prefersReducedMotion || isLowEndDevice || saveDataEnabled,
      });
    };

    updateMetrics();

    // Listen to network changes if supported
    if (navigator.connection && navigator.connection.addEventListener) {
      navigator.connection.addEventListener("change", updateMetrics);
    }
    
    // Listen to OS-level reduce-motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMetrics);
    }

    return () => {
      if (navigator.connection && navigator.connection.removeEventListener) {
        navigator.connection.removeEventListener("change", updateMetrics);
      }
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMetrics);
      }
    };
  }, []);

  return config;
}
