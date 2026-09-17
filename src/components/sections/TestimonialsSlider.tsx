"use client";

import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, ShieldCheck, Building, Sparkles } from "lucide-react";
import { INITIAL_TESTIMONIALS } from "@/lib/data";

interface TestimonialsSliderProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

const CLIENT_METRICS: Record<string, { badge: string; highlight: string }> = {
  "test-1": {
    badge: "State Agency Modernization",
    highlight: "VA-SWaM Certified • Public Sector Impact"
  },
  "test-2": {
    badge: "Tier-1 FinTech Core",
    highlight: "10x Spike Resilience • Zero-Downtime Microservices"
  },
  "test-3": {
    badge: "Enterprise Risk & Compliance",
    highlight: "Automated Lineage • SOC2 / Audit Speed"
  }
};

export function TestimonialsSlider({
  eyebrow = "CLIENT PERSPECTIVES",
  heading = "What Leaders Say About VIO",
  subheading = "Direct feedback from executive directors, engineering heads, and enterprise architects.",
}: TestimonialsSliderProps) {
  const testimonials = INITIAL_TESTIMONIALS;
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const item = testimonials[currentIdx] || testimonials[0];
  const itemMeta = CLIENT_METRICS[item.id] || {
    badge: "Enterprise Impact",
    highlight: "Verified Enterprise Outcome"
  };

  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200/80 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-50/50 via-slate-50/40 to-white rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-3.5 mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0066cc] uppercase">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071739] tracking-tight leading-[1.18] mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {subheading}
            </p>
          )}

          {/* Quick Company Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIdx(idx)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 border ${
                  currentIdx === idx
                    ? "bg-[#071739] text-white border-[#071739] shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {t.company}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
            {/* Ambient Background Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066cc] via-[#00B4D8] to-blue-400" />

            <Quote className="w-20 h-20 text-blue-100/60 absolute top-8 right-8 pointer-events-none -scale-x-100" />

            {/* Top Row: Stars + Client Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
                <div className="flex items-center">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-900 ml-1">5.0 Star Rating</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066cc] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>{itemMeta.badge}</span>
              </div>
            </div>

            {/* Quote Body */}
            <blockquote className="text-xl sm:text-2xl lg:text-[26px] text-[#071739] font-medium leading-relaxed italic mb-10 tracking-tight">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            {/* Outcome Highlight Pill */}
            <div className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#0066cc]" />
              <span>Key Impact: <strong>{itemMeta.highlight}</strong></span>
            </div>

            {/* Author & Controls Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 border border-[#0066cc]/20 flex items-center justify-center text-[#0066cc] font-black text-lg">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-extrabold text-[#071739]">
                    {item.clientName}
                  </p>
                  <p className="text-xs sm:text-sm text-[#0066cc] font-semibold">
                    {item.designation}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.company}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 text-[#071739] transition-all border border-slate-200 shadow-xs flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <div className="text-xs font-bold text-slate-400 px-1">
                  {currentIdx + 1} / {testimonials.length}
                </div>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full bg-[#0066cc] hover:bg-[#0052a3] text-white transition-all shadow-md shadow-blue-500/20 flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
