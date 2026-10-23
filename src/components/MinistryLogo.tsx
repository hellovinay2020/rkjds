import React from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo/rk-logo.png";
import { useSiteSettings, getFullUrl } from "@/lib/useSiteSettings";

interface MinistryLogoProps {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
}

export default function MinistryLogo({
  size = "md",
  className = "",
}: MinistryLogoProps) {
  const { settings } = useSiteSettings();
  const effectiveLogo = settings?.logo ? getFullUrl(settings.logo) : logoImg;

  const sizeMap = {
    sm: "w-9 h-9 sm:w-10 sm:h-10",
    md: "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
    xl: "w-20 h-20 sm:w-24 sm:h-24",
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <Link
      to="/"
      aria-label="RK MINISTRIES Home"
      className={`inline-flex items-center select-none group shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div
        className={`relative rounded-full overflow-hidden shadow-md border-2 border-amber-400/90 bg-white p-0.5 flex items-center justify-center ${currentSize}`}
      >
        <img
          src={effectiveLogo}
          alt={settings?.siteName || "RK MINISTRIES Logo"}
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
      </div>
    </Link>
  );
}
