"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";
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
  subheading = "Proven architectural transformations delivered for Virginia ODGA, USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
  ctaText = "Explore All Case Studies",
  ctaLink = "/case-studies",
}: CaseStudyShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { label: "All Proofs", key: "All", count: INITIAL_CASE_STUDIES.length },
    { label: "Government", key: "Government", count: INITIAL_CASE_STUDIES.filter(c => c.industry.toLowerCase().includes("government")).length },
    { label: "Banking & FinTech", key: "Banking", count: INITIAL_CASE_STUDIES.filter(c => c.industry.toLowerCase().includes("banking")).length },
    { label: "Retail Logistics", key: "Retail", count: INITIAL_CASE_STUDIES.filter(c => c.industry.toLowerCase().includes("manufacturing") || c.industry.toLowerCase().includes("automotive")).length },
  ];

  const filteredCaseStudies = activeCategory === "All"
    ? INITIAL_CASE_STUDIES
    : INITIAL_CASE_STUDIES.filter(c => {
        const ind = c.industry.toLowerCase();
        if (activeCategory === "Government") return ind.includes("government");
        if (activeCategory === "Banking") return ind.includes("banking") || ind.includes("fin");
        if (activeCategory === "Retail") return ind.includes("manufacturing") || ind.includes("automotive");
        return true;
      });

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/60 to-blue-50/20 border-t border-slate-200/80 overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-100/30 via-indigo-100/20 to-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-xs font-black text-[#0c34cd] uppercase tracking-widest mb-4 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0c34cd]" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071739] tracking-tight leading-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                {subheading}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {ctaText && (
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white text-sm font-black transition-all shadow-md shadow-blue-700/20 group hover:scale-105 active:scale-95"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </Link>
            )}
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 shrink-0 flex items-center gap-2 ${
                activeCategory === cat.key
                  ? "bg-[#0c34cd] text-white shadow-md shadow-blue-700/20 scale-105"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeCategory === cat.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredCaseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-[#0c34cd] transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-2 relative"
            >
              <div>
                {/* Visual Banner Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950 border-b border-slate-100">
                  <img
                    src={cs.imageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-[#0c34cd] text-white shadow-md tracking-wider uppercase">
                      {cs.client.split("(")[0].trim()}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-cyan-200 border border-white/20">
                      {cs.industry}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-7">
                  <div className="flex items-center gap-1.5 text-xs text-[#0c34cd] font-extrabold uppercase tracking-widest mb-2">
                    <Award className="w-3.5 h-3.5 text-[#0c34cd]" />
                    <span>CASE PROOF 0{cs.orderIndex}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#071739] mb-3 group-hover:text-[#0c34cd] transition-colors leading-snug">
                    {cs.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {cs.solution}
                  </p>

                  {/* Highlight Metrics Grid in #0c34cd */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 mb-6 group-hover:bg-blue-50 transition-colors">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <p className="text-2xl font-black text-[#0c34cd]">
                          {m.value}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-600 uppercase font-black tracking-wider mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Results Checkmarks */}
                  <div className="space-y-2 mb-6">
                    {cs.results.slice(0, 2).map((res, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0c34cd] shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{res}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-7 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Verified Case Proof
                </span>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#0c34cd] hover:text-[#092699] transition-all group-hover:translate-x-1 duration-200"
                >
                  <span>Read Case Study</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Link */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Explore how VIO accelerates mission delivery for public &amp; private enterprises.{" "}
            <a
              href="https://calendly.com/viobts/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0c34cd] font-black hover:underline inline-flex items-center gap-1"
            >
              <span>Schedule an enterprise consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
