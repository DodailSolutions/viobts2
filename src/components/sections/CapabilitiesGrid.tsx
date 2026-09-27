"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Database, 
  GitBranch, 
  Cloud, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  TrendingUp,
  Zap
} from "lucide-react";
import { INITIAL_SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, any> = {
  Users,
  Database,
  GitBranch,
  Cloud,
  Cpu,
  Sparkles,
};

interface CapabilitiesGridProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CapabilitiesGrid({
  eyebrow = "OUR 6 CORE CAPABILITY PILLARS",
  heading = "Comprehensive Capabilities Built Around Your Goals",
  subheading = "From elite technical workforce augmentation to petabyte lakehouses, modern GovCloud pipelines, and autonomous enterprise AI.",
  ctaText = "View All Capabilities",
  ctaLink = "/services",
}: CapabilitiesGridProps) {
  const services = INITIAL_SERVICES;
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterTabs = [
    { label: "All 6 Pillars", key: "All" },
    { label: "Talent & Pods", key: "Talent" },
    { label: "Data & Lakehouses", key: "Data" },
    { label: "Cloud & Open-Source", key: "Cloud" },
    { label: "AI & Microservices", key: "AI" },
  ];

  const filteredServices = selectedFilter === "All"
    ? services
    : services.filter(s => {
        if (selectedFilter === "Talent") return s.slug.includes("workforce");
        if (selectedFilter === "Data") return s.slug.includes("data");
        if (selectedFilter === "Cloud") return s.slug.includes("cloud") || s.slug.includes("open-source");
        if (selectedFilter === "AI") return s.slug.includes("rpa") || s.slug.includes("api");
        return true;
      });

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/70 to-blue-50/30 border-t border-slate-200/80 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-blue-100/30 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-cyan-100/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-xs font-black text-[#0c34cd] uppercase tracking-widest mb-4 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-[#0c34cd]" />
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
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 shrink-0 ${
                selectedFilter === tab.key
                  ? "bg-[#0c34cd] text-white shadow-md shadow-blue-700/20 scale-105"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((srv) => {
            const Icon = ICON_MAP[srv.icon] || Cpu;

            return (
              <div
                key={srv.id}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-[#0c34cd] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Accent Top Border Line in #0c34cd gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0c34cd] via-sky-400 to-[#092699] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Top: Icon & Pillar Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0c34cd] group-hover:bg-[#0c34cd] group-hover:text-white transition-all duration-300 shadow-xs group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-700/25">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <span className="text-xs font-black text-[#0c34cd] tracking-wider font-mono bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/70">
                      PILLAR 0{srv.orderIndex}
                    </span>
                  </div>

                  {/* Eyebrow & Title */}
                  <p className="text-[11px] font-extrabold text-[#0c34cd] tracking-widest uppercase mb-2">
                    {srv.eyebrow}
                  </p>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-[#071739] mb-3 group-hover:text-[#0c34cd] transition-colors leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-6 font-normal">
                    {srv.subtitle}
                  </p>

                  {/* Business Outcome Box */}
                  <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 mb-6 group-hover:bg-blue-50/60 group-hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-1.5 text-xs text-[#0c34cd] font-black uppercase tracking-wider mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0c34cd] shrink-0" />
                      <span>Business Impact</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {srv.businessOutcome}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:border-blue-200/60">
                        {tech}
                      </span>
                    ))}
                    {srv.technologies.length > 4 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-blue-50 text-[#0c34cd] border border-blue-100">
                        +{srv.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">Enterprise Blueprint</span>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#0c34cd] hover:text-[#092699] transition-all group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Pillar</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assessment Strip */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Need a custom architectural evaluation?{" "}
            <a
              href="https://calendly.com/viobts/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0c34cd] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Schedule a 30-minute technical roadmap session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
