"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
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
    <section className="relative py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
          {ctaText && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group shrink-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* 3 Featured Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-400 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
                      {cs.industry}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    {cs.client}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {cs.solution}
                  </p>

                  {/* Highlight metrics */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60 mb-6">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <p className="text-xl font-black text-blue-600">
                          {m.value}
                        </p>
                        <p className="text-[11px] text-slate-500 uppercase font-semibold">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Results list */}
                  <div className="space-y-2 mb-6">
                    {cs.results.slice(0, 2).map((res, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-normal">{res}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-slate-100">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
