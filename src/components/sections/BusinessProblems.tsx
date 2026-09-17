"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, CheckCircle2, Sparkles, Zap } from "lucide-react";

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
  "SYSTEM FRAGMENTATION",
  "BESPOKE PLATFORMS",
  "ROI & CAPITAL ASSURANCE",
  "EFFICIENCY & AUTOMATION",
  "TALENT & DELIVERY VELOCITY"
];

export function BusinessProblems({
  eyebrow = "SOLVING REAL ENTERPRISE BOTTLENECK PAINS",
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
    <section className="relative py-24 bg-slate-50/50 overflow-hidden border-t border-slate-200">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-5">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {subheading}
            </p>
          )}
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, idx) => {
            const category = PROBLEM_CATEGORIES[idx % PROBLEM_CATEGORIES.length];
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-full">
                      {category}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Client Pain Quote */}
                  <div className="mb-6">
                    <span className="text-blue-600 text-3xl font-serif leading-none block mb-1">“</span>
                    <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {card.quote}
                    </h3>
                  </div>

                  {/* VIO Resolution Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 group-hover:bg-blue-50/50 group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800">
                        VIO Acceleration Framework
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {card.resolution}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">Ready to resolve?</span>
                  <Link
                    href={ctaLink}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-200"
                  >
                    <span>Talk to an Architect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Impact Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {ctaText}
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Skip the recruitment friction and architectural trial-and-error. Let’s benchmark your current bottlenecks and build a high-velocity delivery roadmap.
            </p>
            <div className="pt-2">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-950 font-extrabold text-sm hover:bg-blue-50 transition-all shadow-lg hover:scale-[1.02]"
              >
                <span>Book Free Architecture Assessment</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
