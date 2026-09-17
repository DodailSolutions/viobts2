"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTABannerProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function CTABanner({
  eyebrow = "READY TO ACCELERATE WHAT'S NEXT?",
  heading = "Let's turn technology into measurable business impact.",
  subheading = "Schedule a complimentary consultation with our principal architects to explore how VIO can accelerate your digital roadmap.",
  primaryCtaText = "Book a Call",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Talk to VIO",
  secondaryCtaLink = "/contact",
}: CTABannerProps) {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 overflow-hidden border-t border-slate-100">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-4">
            {eyebrow}
          </p>
        )}

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
          {heading}
        </h2>

        {subheading && (
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            {subheading}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCtaText && (
            <Link
              href={primaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md shadow-blue-500/20 hover:scale-[1.02]"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {secondaryCtaText && (
            <Link
              href={secondaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
