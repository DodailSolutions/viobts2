"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  AlertTriangle,
  Layers,
  Wrench,
  TrendingUp,
  BarChart3,
  Users,
  ChevronRight,
} from "lucide-react";

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

const PROBLEM_META = [
  {
    tag: "System Fragmentation",
    icon: Layers,
    accent: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-200",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    pillBg: "bg-amber-50",
    pillText: "text-amber-700",
    pillBorder: "border-amber-200",
  },
  {
    tag: "Bespoke Platforms",
    icon: Wrench,
    accent: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-200",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    pillBg: "bg-blue-50",
    pillText: "text-blue-700",
    pillBorder: "border-blue-200",
  },
  {
    tag: "ROI & Capital Assurance",
    icon: TrendingUp,
    accent: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-200",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-700",
    pillBorder: "border-emerald-200",
  },
  {
    tag: "Operational Efficiency",
    icon: BarChart3,
    accent: "from-indigo-500/10 to-violet-500/5",
    border: "border-indigo-200",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    pillBg: "bg-indigo-50",
    pillText: "text-indigo-700",
    pillBorder: "border-indigo-200",
  },
  {
    tag: "Talent & Delivery Velocity",
    icon: Users,
    accent: "from-purple-500/10 to-violet-500/5",
    border: "border-purple-200",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    pillBg: "bg-purple-50",
    pillText: "text-purple-700",
    pillBorder: "border-purple-200",
  },
];

export function BusinessProblems({
  eyebrow = "SOLVING REAL PAIN POINTS",
  heading = "Technology shouldn't slow your business down.",
  subheading = "Most enterprises struggle with fragmented tools, talent shortages, and unclear ROI. We turn architectural friction into measurable competitive advantage.",
  cards = [
    {
      quote: "I wish these tools worked together.",
      resolution:
        "We engineer unified API ecosystems and automated pipelines that synchronize your tech stack in real time.",
    },
    {
      quote: "I wish we had a custom tool for this.",
      resolution:
        "We architect bespoke microservices and internal platforms tailored precisely to your operational workflows.",
    },
    {
      quote: "Would a custom system be worth the investment?",
      resolution:
        "We apply our Measure → Analyse → Improve framework to prove quantifiable ROI before full-scale deployment.",
    },
    {
      quote: "How can I get ROI from technology efficiency?",
      resolution:
        "We automate manual friction points and eliminate redundant licensing costs, compounding efficiency gains.",
    },
    {
      quote: "I need a bigger IT team.",
      resolution:
        "We deploy pre-vetted, high-velocity engineering pods that integrate seamlessly into your ongoing sprints.",
    },
  ],
  ctaText = "WE'RE YOUR TECHNOLOGY PARTNER FOR THAT.",
  ctaLink = "/contact",
}: BusinessProblemsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = cards[activeIdx];
  const activeMeta = PROBLEM_META[activeIdx % PROBLEM_META.length];
  const ActiveIcon = activeMeta.icon;

  return (
    <section className="relative py-20 sm:py-28 bg-[#f8fafc] overflow-hidden border-t border-slate-100">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── SECTION HEADER ───────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c34cd]/8 border border-[#0c34cd]/20 text-xs font-black text-[#0c34cd] uppercase tracking-[0.2em] mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071739] tracking-tight leading-[1.1] mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* ── MAIN INTERACTIVE PANEL ───────────────────── */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60 bg-white mb-8">
          <div className="flex flex-col lg:flex-row min-h-[540px]">

            {/* LEFT: Problem selector list */}
            <div className="lg:w-[42%] bg-[#071739] p-6 sm:p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <AlertTriangle className="w-3 h-3" />
                  Common Enterprise Friction Points
                </span>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {cards.map((card, idx) => {
                  const meta = PROBLEM_META[idx % PROBLEM_META.length];
                  const MetaIcon = meta.icon;
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`group w-full text-left px-4 py-4 rounded-2xl transition-all duration-200 flex items-start gap-3.5 ${
                        isActive
                          ? "bg-white/12 border border-white/20"
                          : "hover:bg-white/6 border border-transparent"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isActive ? "bg-white/20" : "bg-white/8"
                        }`}
                      >
                        <MetaIcon
                          className={`w-4 h-4 ${isActive ? "text-white" : "text-white/40"}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Category tag */}
                        <span
                          className={`text-[9px] font-black uppercase tracking-[0.18em] block mb-1 ${
                            isActive ? "text-white/70" : "text-white/30"
                          }`}
                        >
                          {meta.tag}
                        </span>
                        {/* Quote */}
                        <span
                          className={`text-sm font-bold leading-snug ${
                            isActive ? "text-white" : "text-white/50 group-hover:text-white/70"
                          } transition-colors`}
                        >
                          "{card.quote}"
                        </span>
                      </div>

                      {/* Active arrow */}
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-1 transition-all ${
                          isActive
                            ? "text-white opacity-100"
                            : "text-white/20 opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-white/10">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                ))}
                <span className="ml-auto text-[10px] font-bold text-white/30">
                  {activeIdx + 1} / {cards.length}
                </span>
              </div>
            </div>

            {/* RIGHT: Detail panel */}
            <div className="lg:w-[58%] p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                {/* Category badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${activeMeta.pillBg} ${activeMeta.pillText} border ${activeMeta.pillBorder} text-[10px] font-black uppercase tracking-[0.18em] mb-8`}
                >
                  <ActiveIcon className="w-3.5 h-3.5" />
                  {activeMeta.tag}
                </div>

                {/* Pain quote — large */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    What we hear from clients
                  </div>
                  <blockquote className="text-2xl sm:text-3xl font-black text-[#071739] leading-snug tracking-tight">
                    "{active.quote}"
                  </blockquote>
                </div>

                {/* Divider with arrow */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-100" />
                  <div className="w-8 h-8 rounded-full bg-[#0c34cd]/8 border border-[#0c34cd]/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#0c34cd]" />
                  </div>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* VIO Solution */}
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${activeMeta.accent} border ${activeMeta.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0c34cd]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0c34cd]">
                      VIO Engineered Solution
                    </span>
                  </div>
                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {active.resolution}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Nav prev/next */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                    disabled={activeIdx === 0}
                    className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    onClick={() => setActiveIdx((i) => Math.min(cards.length - 1, i + 1))}
                    disabled={activeIdx === cards.length - 1}
                    className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    Browse all {cards.length} friction points
                  </span>
                </div>

                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white text-xs font-black transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
                >
                  Solve This With VIO
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── OUTCOME METRICS STRIP ────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { metric: "40%", label: "Avg. Engineering Cost Reduction", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
            { metric: "3×", label: "Faster Deployment Cycles", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
            { metric: "98%", label: "Client Retention Rate", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
            { metric: "< 2 wks", label: "Time-to-First-Sprint", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
          ].map((m) => (
            <div
              key={m.label}
              className={`p-5 rounded-2xl ${m.bg} border ${m.border} flex flex-col gap-1`}
            >
              <span className={`text-3xl font-black tracking-tight ${m.color}`}>{m.metric}</span>
              <span className="text-[11px] font-semibold text-slate-600 leading-snug">{m.label}</span>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA BANNER ────────────────────────── */}
        <div className="rounded-3xl bg-[#071739] p-8 sm:p-12 relative overflow-hidden border border-white/5">
          {/* Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0c34cd]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase mb-5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Measure → Analyse → Improve
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                {ctaText}
              </h3>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed font-normal">
                Skip recruitment delays and architectural trial-and-error. Let our principal architects evaluate your current systems and deliver a high-velocity roadmap.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://calendly.com/viobts/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0c34cd] font-black text-sm hover:bg-blue-50 transition-all shadow-lg shadow-black/20 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Book Free Architecture Assessment
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/18 text-white font-bold text-sm border border-white/20 transition-all hover:scale-105 whitespace-nowrap"
              >
                View Full Services Portfolio
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
