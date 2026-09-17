"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface SplitImageTextProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  bullets?: string[];
  imageUrl?: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
}

export function SplitImageText({
  eyebrow,
  heading,
  description,
  bullets = [],
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  imagePosition = "right",
  ctaText,
  ctaLink,
}: SplitImageTextProps) {
  return (
    <section className="relative py-20 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          imagePosition === "left" ? "lg:flex-row-reverse" : ""
        }`}>
          {/* Content */}
          <div className={imagePosition === "left" ? "lg:order-2" : "lg:order-1"}>
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                {description}
              </p>
            )}

            {bullets.length > 0 && (
              <div className="space-y-3 mb-8">
                {bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 leading-normal">{b}</p>
                  </div>
                ))}
              </div>
            )}

            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Image */}
          <div className={`relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md ${
            imagePosition === "left" ? "lg:order-1" : "lg:order-2"
          }`}>
            <Image
              src={imageUrl}
              alt={heading || "Enterprise Technology"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
