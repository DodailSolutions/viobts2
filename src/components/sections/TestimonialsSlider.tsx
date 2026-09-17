"use client";

import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { INITIAL_TESTIMONIALS } from "@/lib/data";

interface TestimonialsSliderProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

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

  const item = testimonials[currentIdx];

  return (
    <section className="relative py-24 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md relative">
            <Quote className="w-12 h-12 text-blue-100 absolute top-8 right-8 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-500 mb-6">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl text-slate-800 font-medium leading-relaxed italic mb-8">
              "{item.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div>
                <p className="text-base font-bold text-slate-900">{item.clientName}</p>
                <p className="text-xs text-blue-600 font-semibold">{item.designation}</p>
                <p className="text-xs text-slate-500">{item.company}</p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
