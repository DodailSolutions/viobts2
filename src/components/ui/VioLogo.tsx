"use client";

import React from "react";
import Image from "next/image";

interface VioLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export function VioLogo({
  variant = "dark",
  size = "md",
  showTagline = true,
  className = "",
}: VioLogoProps) {
  // Dimensions mapping
  const dimensions = {
    sm: { width: 100, height: 32, logoText: "text-xl", tagText: "text-[8px]" },
    md: { width: 128, height: 40, logoText: "text-2xl", tagText: "text-[9px]" },
    lg: { width: 160, height: 50, logoText: "text-3xl", tagText: "text-[11px]" },
  }[size];

  const isDarkVariant = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* High-Resolution PNG Logo with fallback Vector Styling */}
      <div className="relative flex items-center">
        {/* Vector SVG Mark for 100% crisp sharpness across all monitors */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            <span
              className={`font-black tracking-tighter ${dimensions.logoText} ${
                isDarkVariant ? "text-slate-900" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif" }}
            >
              VIO
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-600 mb-2 ml-0.5 animate-pulse" />
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300 dark:border-slate-700">
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-extrabold tracking-widest uppercase ${dimensions.tagText} ${
                    isDarkVariant ? "text-blue-600" : "text-cyan-400"
                  }`}
                >
                  Tech
                </span>
                <span
                  className={`font-semibold tracking-wider uppercase ${dimensions.tagText} ${
                    isDarkVariant ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  Accelerator
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
