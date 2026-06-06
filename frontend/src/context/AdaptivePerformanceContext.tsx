"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAdaptivePerformance, AdaptiveConfig } from "@/hooks/useAdaptivePerformance";

const defaultContext: AdaptiveConfig = {
  isLowEndDevice: false,
  isSlowNetwork: false,
  saveDataEnabled: false,
  performanceTier: "high",
  reduceMotion: false,
};

const AdaptivePerformanceContext = createContext<AdaptiveConfig>(defaultContext);

export function AdaptivePerformanceProvider({ children }: { children: ReactNode }) {
  const config = useAdaptivePerformance();
  return (
    <AdaptivePerformanceContext.Provider value={config}>
      {children}
    </AdaptivePerformanceContext.Provider>
  );
}

export function useAdaptiveConfig() {
  return useContext(AdaptivePerformanceContext);
}
