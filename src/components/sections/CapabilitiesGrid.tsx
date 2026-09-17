"use client";

import React from "react";
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
  Layers
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

const PILLAR_ACCENTS = [
  { border: "hover:border-blue-400", iconBg: "bg-blue-50", iconText: "text-blue-600", badgeBg: "bg-blue-50 text-blue-700 border-blue-200/80" },
  { border: "hover:border-cyan-400", iconBg: "bg-cyan-50", iconText: "text-cyan-600", badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200/80" },
  { border: "hover:border-indigo-400", iconBg: "bg-indigo-50", iconText: "text-indigo-600", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200/80" },
  { border: "hover:border-sky-400", iconBg: "bg-sky-50", iconText: "text-sky-600", badgeBg: "bg-sky-50 text-sky-700 border-sky-200/80" },
  { border: "hover:border-violet-400", iconBg: "bg-violet-50", iconText: "text-violet-600", badgeBg: "bg-violet-50 text-violet-700 border-violet-200/80" },
  { border: "hover:border-purple-400", iconBg: "bg-purple-50", iconText: "text-purple-600", badgeBg: "bg-purple-50 text-purple-700 border-purple-200/80" },
];

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

  return (
    <section className="relative py-20 sm:py-24 bg-[#fcfdff] border-t border-slate-200/80">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#0066cc] uppercase tracking-widest mb-3.5 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>{eyebrow}</span>
              </div>
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

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv, idx) => {
            const Icon = ICON_MAP[srv.icon] || Cpu;
            const accent = PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length];

            return (
              <div
                key={srv.id}
                className={`p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl ${accent.border} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden`}
              >
                {/* Accent Top Border Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${accent.iconBg} ${accent.iconText} border border-blue-100/60 flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-all shadow-2xs group-hover:scale-105 duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400 tracking-wider font-mono bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                      PILLAR 0{srv.orderIndex}
                    </span>
                  </div>

                  <p className="text-[11px] font-extrabold text-[#0066cc] tracking-widest uppercase mb-2">
                    {srv.eyebrow}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-[#071739] mb-3 group-hover:text-[#0066cc] transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-6 font-normal">
                    {srv.subtitle}
                  </p>

                  {/* Business Outcome Box */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 mb-6 group-hover:bg-blue-50/50 group-hover:border-blue-200/80 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs text-blue-900 font-extrabold uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Business Impact</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {srv.businessOutcome}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60">
                        {tech}
                      </span>
                    ))}
                    {srv.technologies.length > 4 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                        +{srv.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Full Pillar Blueprint</span>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066cc] hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Pillar</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
