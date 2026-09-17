"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Award, Calendar } from "lucide-react";

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
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#f8fafc] via-white to-blue-50/40 overflow-hidden border-t border-slate-200/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-blue-100/50 via-sky-100/40 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative rounded-3xl bg-[#071739] text-white p-8 sm:p-14 lg:p-16 shadow-2xl shadow-blue-950/20 overflow-hidden border border-blue-900/50">
          {/* Internal gradient accent shapes */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#0066cc]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#00B4D8]/20 blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066cc] via-[#00B4D8] to-blue-400" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Eyebrow badge */}
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-[#00B4D8] mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              {heading}
            </h2>

            {/* Subheading */}
            {subheading && (
              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
                {subheading}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all duration-300 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 transition-all border border-white/20 backdrop-blur-xs hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-[#00B4D8]" />
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>

            {/* Trust Assurance Signals */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span className="text-xs text-slate-300 font-medium">30-min strategy review, zero obligation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Direct access to principal architects</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span className="text-xs text-slate-300 font-medium">VA-SWaM Certified Woman-Owned Enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
