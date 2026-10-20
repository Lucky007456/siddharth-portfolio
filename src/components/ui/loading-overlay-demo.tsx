"use client";

import React, { useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export function LoadingOverlayDemo() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingOverlay
        duration={2000}
        onComplete={() => setLoadingComplete(true)}
        brandTitle="SIDDHARTH P."
        brandSubtitle="AI & DATA SCIENCE SPECIALIST"
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[#161616] text-white">
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            Welcome
          </h1>
          <p className="text-xl text-white/60 max-w-xl">
            {loadingComplete
              ? "The loading overlay animation has finished successfully!"
              : "Loading portfolio content..."}
          </p>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default LoadingOverlayDemo;
