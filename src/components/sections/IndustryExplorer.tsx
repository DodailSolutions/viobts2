"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  Landmark, 
  ShieldCheck, 
  HeartPulse, 
  Factory, 
  Zap, 
  Radio,
  AlertCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { INITIAL_INDUSTRIES } from "@/lib/data";

interface IndustryExplorerProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

const INDUSTRY_CONFIGS: Record<string, {
  icon: React.ElementType;
  badge: string;
  color: string;
  lightBg: string;
  borderActive: string;
  accentText: string;
}> = {
  "banking-financial-services": {
    icon: Landmark,
    badge: "FINRA • SOC2 • PCI-DSS",
    color: "#0066cc",
    lightBg: "bg-blue-50/70",
    borderActive: "border-blue-500",
    accentText: "text-[#0066cc]"
  },
  "healthcare-life-sciences-insurance": {
    icon: HeartPulse,
    badge: "HIPAA • HITECH • FHIR",
    color: "#059669",
    lightBg: "bg-emerald-50/70",
    borderActive: "border-emerald-500",
    accentText: "text-emerald-600"
  },
  "government": {
    icon: ShieldCheck,
    badge: "VA-SWaM • NIST 800-53",
    color: "#4f46e5",
    lightBg: "bg-indigo-50/70",
    borderActive: "border-indigo-500",
    accentText: "text-indigo-600"
  },
  "manufacturing-automotive": {
    icon: Factory,
    badge: "Industry 4.0 • IoT",
    color: "#d97706",
    lightBg: "bg-amber-50/70",
    borderActive: "border-amber-500",
    accentText: "text-amber-600"
  },
  "energy-utilities": {
    icon: Zap,
    badge: "SCADA • Grid Modernization",
    color: "#0284c7",
    lightBg: "bg-sky-50/70",
    borderActive: "border-sky-500",
    accentText: "text-sky-600"
  },
  "communication-media": {
    icon: Radio,
    badge: "Ultra-Low Latency • Edge",
    color: "#7c3aed",
    lightBg: "bg-purple-50/70",
    borderActive: "border-purple-500",
    accentText: "text-purple-600"
  }
};

export function IndustryExplorer({
  eyebrow = "SECTOR EXPERTISE",
  heading = "Tailored for the Most Demanding Industries",
  subheading = "Deep domain compliance and architectural excellence across finance, public sector, healthcare, manufacturing, utilities, and media.",
  ctaText = "Discover All Industries",
  ctaLink = "/industries",
}: IndustryExplorerProps) {
  const industries = INITIAL_INDUSTRIES;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIndustry = industries[activeIdx] || industries[0];

  const currentConfig = INDUSTRY_CONFIGS[activeIndustry.slug] || {
    icon: Building2,
    badge: "Enterprise Grade",
    color: "#0066cc",
    lightBg: "bg-blue-50/70",
    borderActive: "border-blue-500",
    accentText: "text-[#0066cc]"
  };

  const CurrentIcon = currentConfig.icon;

  return (
    <section className="relative py-20 lg:py-28 bg-[#f8fafc]/80 border-t border-slate-200/80 overflow-hidden">
      {/* Soft atmospheric background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-100/40 via-sky-100/30 to-slate-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#0066cc] uppercase">
                  {eyebrow}
                </span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071739] tracking-tight leading-[1.18]">
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
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0066cc] hover:text-[#004f9e] transition-colors group shrink-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Interactive Industry Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Industry Tab Navigation (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {industries.map((ind, idx) => {
              const cfg = INDUSTRY_CONFIGS[ind.slug] || {
                icon: Building2,
                badge: "Enterprise",
                color: "#0066cc",
                lightBg: "bg-blue-50",
                borderActive: "border-blue-500",
                accentText: "text-[#0066cc]"
              };
              const TabIcon = cfg.icon;
              const isActive = activeIdx === idx;

              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? "bg-white border-blue-400 shadow-md shadow-blue-500/10 font-bold"
                      : "bg-white/80 hover:bg-white border-slate-200/90 text-slate-700 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Left Active Accent Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-[#0066cc]" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? `${cfg.lightBg} ${cfg.accentText}`
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/70 group-hover:text-slate-700"
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-sm block transition-colors ${isActive ? "text-[#071739]" : "text-slate-700 group-hover:text-slate-900"}`}>
                        {ind.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        {cfg.badge}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive
                        ? "text-[#0066cc] translate-x-0.5 opacity-100"
                        : "text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 opacity-60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Detail Display Panel (Col 5-12) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
            {/* Subtle corner badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentConfig.lightBg} ${currentConfig.accentText}`}>
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider block">
                    {activeIndustry.eyebrow}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071739] tracking-tight">
                    {activeIndustry.title}
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
                {currentConfig.badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-normal">
              {activeIndustry.description}
            </p>

            {/* Comparison Grid: Challenges vs VIO Tailored Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Sector Challenges Card */}
              <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Key Sector Challenges
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {activeIndustry.keyChallenges.map((ch, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <p className="text-xs sm:text-sm text-slate-700 leading-snug">{ch}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* VIO Engineered Solutions Card */}
              <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#0066cc] shrink-0" />
                    <h4 className="text-xs font-bold text-[#0066cc] uppercase tracking-wider">
                      VIO Engineered Solutions
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {activeIndustry.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0066cc] mt-0.5 shrink-0" />
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">{cap}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trends Bar if available */}
            {activeIndustry.transformationTrends && activeIndustry.transformationTrends.length > 0 && (
              <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Trends:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {activeIndustry.transformationTrends.map((trend, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                      {trend}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Action CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <Link
                href={`/industries/${activeIndustry.slug}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <span>Explore {activeIndustry.title} Practice</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/contact?industry=${activeIndustry.slug}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0066cc] px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <span>Consult a Specialist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
