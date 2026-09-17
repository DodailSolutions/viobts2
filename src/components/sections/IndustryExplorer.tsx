"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ChevronRight } from "lucide-react";
import { INITIAL_INDUSTRIES } from "@/lib/data";

interface IndustryExplorerProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function IndustryExplorer({
  eyebrow = "SECTOR EXPERTISE",
  heading = "Tailored for the Most Demanding Industries",
  subheading = "Deep domain compliance and architectural excellence across finance, public sector, healthcare, manufacturing, utilities, and media.",
  ctaText = "Discover Industry Solutions",
  ctaLink = "/industries",
}: IndustryExplorerProps) {
  const industries = INITIAL_INDUSTRIES;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIndustry = industries[activeIdx];

  return (
    <section className="relative py-24 bg-white border-t border-slate-100">
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

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Column */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {industries.map((ind, idx) => (
              <button
                key={ind.id}
                onClick={() => setActiveIdx(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between border ${
                  activeIdx === idx
                    ? "bg-blue-50/80 border-blue-300 text-blue-700 shadow-sm font-bold"
                    : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className={`w-4 h-4 ${activeIdx === idx ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="text-sm">{ind.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeIdx === idx ? "text-blue-600 translate-x-1" : "text-slate-300"}`} />
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md relative overflow-hidden">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
              {activeIndustry.eyebrow}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              {activeIndustry.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              {activeIndustry.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Challenges */}
              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
                  Key Sector Challenges
                </h4>
                <div className="space-y-2.5">
                  {activeIndustry.keyChallenges.map((ch, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <p className="text-xs text-slate-700 leading-normal">{ch}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200/60">
                <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                  VIO Tailored Solutions
                </h4>
                <div className="space-y-2.5">
                  {activeIndustry.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-700 leading-normal">{cap}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`/industries/${activeIndustry.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              <span>Explore {activeIndustry.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
