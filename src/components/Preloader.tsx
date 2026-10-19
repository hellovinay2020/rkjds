import React, { useEffect, useState } from "react";
import logoImg from "@/assets/logo/rk-logo.png";

interface PreloaderProps {
  autoDismiss?: boolean;
  minDuration?: number; // minimum display duration in ms when autoDismiss is true
}

export default function Preloader({
  autoDismiss = false,
  minDuration = 700,
}: PreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!autoDismiss) return;

    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setMounted(false);
      }, 500); // 500ms fade transition
      return () => clearTimeout(removeTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [autoDismiss, minDuration]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading RK MINISTRIES..."
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A2540] text-white transition-all duration-500 ease-out select-none ${
        fading ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-64 h-56 sm:h-64 bg-blue-500/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Animated Emblem Frame with Official Logo */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 mb-6">
          {/* Outer Rotating Gold Spinner Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 border-r-amber-400 animate-spin" />

          {/* Inner Counter-Rotating Accent Ring */}
          <div
            className="absolute -inset-2 rounded-full border border-dashed border-amber-300/30 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "12s" }}
          />

          {/* Pulsing Gold Glow behind Logo */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-500/20 to-blue-500/20 animate-pulse blur-md" />

          {/* Circular Logo Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1 shadow-2xl border-2 border-amber-400/90 flex items-center justify-center">
            <img
              src={logoImg}
              alt="RK MINISTRIES Logo"
              className="w-full h-full object-contain rounded-full transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
          </div>
        </div>

        {/* Ministry Brand Name */}
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent font-['Poppins']">
          RK MINISTRIES
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mt-1 text-[11px] sm:text-xs font-medium tracking-[0.22em] text-slate-300 uppercase">
          Faith • Prayer • Fellowship
        </p>

        {/* Animated Sleek Progress Bar */}
        <div className="mt-6 w-44 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full animate-pulse" style={{ width: "100%" }} />
        </div>

        {/* Status text */}
        <div className="mt-3.5 flex items-center gap-2 text-xs text-amber-200/80 font-normal tracking-wide">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>लोड हो रहा है... कृपया प्रतीक्षा करें</span>
        </div>
      </div>
    </div>
  );
}
