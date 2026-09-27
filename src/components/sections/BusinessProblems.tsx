"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, AlertCircle } from "lucide-react";

interface ProblemCard {
  quote: string;
  resolution: string;
}

interface BusinessProblemsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cards?: ProblemCard[];
  ctaText?: string;
  ctaLink?: string;
}

const PROBLEM_CATEGORIES = [
  { tag: "SYSTEM FRAGMENTATION", iconColor: "text-amber-500", iconBg: "bg-amber-50" },
  { tag: "BESPOKE PLATFORMS", iconColor: "text-blue-500", iconBg: "bg-blue-50" },
  { tag: "ROI & CAPITAL ASSURANCE", iconColor: "text-emerald-500", iconBg: "bg-emerald-50" },
  { tag: "OPERATIONAL EFFICIENCY", iconColor: "text-indigo-500", iconBg: "bg-indigo-50" },
  { tag: "TALENT & DELIVERY VELOCITY", iconColor: "text-purple-500", iconBg: "bg-purple-50" }
];

export function BusinessProblems({
  eyebrow = "SOLVING REAL ENTERPRISE FRICTION",
  heading = "Technology shouldn't slow your business down.",
  subheading = "Most enterprises struggle with fragmented tools, talent shortages, and unclear ROI. We turn architectural friction into measurable competitive advantage.",
  cards = [
    {
      quote: "I wish these tools worked together.",
      resolution: "We engineer unified API ecosystems and automated pipelines that synchronize your tech stack in real time.",
    },
    {
      quote: "I wish we had a custom tool for this.",
      resolution: "We architect bespoke microservices and internal platforms tailored precisely to your operational workflows.",
    },
    {
      quote: "Would a custom system be worth the investment?",
      resolution: "We apply our Measure → Analyse → Improve framework to prove quantifiable ROI before full-scale deployment.",
    },
    {
      quote: "How can I get ROI from technology efficiency?",
      resolution: "We automate manual friction points and eliminate redundant licensing costs, compounding efficiency gains.",
    },
    {
      quote: "I need a bigger IT team.",
      resolution: "We deploy pre-vetted, high-velocity engineering pods that integrate seamlessly into your ongoing sprints.",
    },
  ],
  ctaText = "WE'RE YOUR TECHNOLOGY PARTNER FOR THAT.",
  ctaLink = "/contact",
}: BusinessProblemsProps) {
  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#0c34cd] uppercase tracking-widest mb-3.5 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071739] tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {subheading}
            </p>
          )}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16">
          {cards.map((card, idx) => {
            const meta = PROBLEM_CATEGORIES[idx % PROBLEM_CATEGORIES.length];
            return (
              <div
                key={idx}
                className="group relative p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill & Sequence */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-extrabold tracking-widest text-slate-600 uppercase bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/60">
                      {meta.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0c34cd]">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Client Pain Quote */}
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Friction Point</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#071739] leading-snug group-hover:text-[#0c34cd] transition-colors">
                      “{card.quote}”
                    </h3>
                  </div>

                  {/* VIO Resolution Box */}
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80 mb-6 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-1.5 mb-2 text-xs text-blue-900 font-extrabold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>VIO Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                      {card.resolution}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Overcome This Bottleneck</span>
                  <Link
                    href={ctaLink}
                    className="text-xs font-bold text-[#0c34cd] hover:text-blue-800 transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-200"
                  >
                    <span>Consult An Architect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Impact Bottom CTA Banner in Primary Color #0c34cd */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0c34cd] via-[#092699] to-[#0c34cd] p-8 sm:p-12 text-center text-white shadow-2xl shadow-blue-700/25 relative overflow-hidden border border-white/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-black tracking-widest uppercase border border-white/25 backdrop-blur-xs shadow-xs">
              <Zap className="w-3.5 h-3.5 text-cyan-200" />
              <span>MEASURE → ANALYSE → IMPROVE</span>
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {ctaText}
            </h3>

            <p className="text-sm sm:text-base text-cyan-100 max-w-2xl mx-auto leading-relaxed font-normal">
              Skip recruitment delays and architectural trial-and-error. Let our principal architects evaluate your current systems and architect a high-velocity roadmap.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ctaLink.startsWith("http") ? ctaLink : "https://calendly.com/viobts/consultation"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0c34cd] font-black text-sm hover:bg-cyan-50 transition-all shadow-lg shadow-blue-950/20 hover:scale-105 active:scale-95"
              >
                <span>Book Free Architecture Assessment</span>
                <ArrowRight className="w-4 h-4 text-[#0c34cd]" />
              </a>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-xs transition-all hover:scale-105"
              >
                <span>View Full Services Portfolio</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
