"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react";
import { INITIAL_CASE_STUDIES } from "@/lib/data";

interface CaseStudyShowcaseProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CaseStudyShowcase({
  eyebrow = "CLIENT PROOFS & CASE HISTORIES",
  heading = "Trusted by Government Agencies & Global Leaders",
  subheading = "Real-world transformations delivered for ODGA, USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
  ctaText = "Explore All Case Studies",
  ctaLink = "/case-studies",
}: CaseStudyShowcaseProps) {
  const caseStudies = INITIAL_CASE_STUDIES.slice(0, 3);

  return (
    <section className="relative py-20 sm:py-24 bg-[#fcfdff] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-extrabold tracking-[0.25em] text-[#0066cc] uppercase mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071739] tracking-tight leading-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed font-normal">
                {subheading}
              </p>
            )}
          </div>
          {ctaText && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-sm font-bold text-[#071739] hover:text-[#0066cc] transition-all group shrink-0 border border-slate-200 shadow-xs hover:shadow-sm"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#0066cc]" />
            </Link>
          )}
        </div>

        {/* 3 Featured Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0066cc] text-white shadow-md">
                      {cs.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                      {cs.client}
                    </p>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-black text-[#071739] mb-3 group-hover:text-[#0066cc] transition-colors leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {cs.solution}
                  </p>

                  {/* Highlight metrics */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100/80 mb-6">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <p className="text-xl sm:text-2xl font-black text-[#0066cc]">
                          {m.value}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-600 uppercase font-extrabold tracking-wider">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Results list */}
                  <div className="space-y-2 mb-4">
                    {cs.results.slice(0, 2).map((res, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc] shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{res}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-6 pt-3 border-t border-slate-100">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066cc] hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Read Full Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
