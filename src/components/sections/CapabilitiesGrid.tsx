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
    <section className="relative py-24 bg-white border-t border-slate-200">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                {subheading}
              </p>
            )}
          </div>

          {ctaText && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-900 transition-all group shrink-0 border border-slate-200 shadow-xs"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-600" />
            </Link>
          )}
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = ICON_MAP[srv.icon] || Cpu;
            return (
              <div
                key={srv.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/60 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black text-slate-400 tracking-wider font-mono bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                      PILLAR 0{srv.orderIndex}
                    </span>
                  </div>

                  <p className="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase mb-2">
                    {srv.eyebrow}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                    {srv.subtitle}
                  </p>

                  {/* Business Outcome Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 group-hover:bg-blue-50/50 group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs text-blue-800 font-extrabold uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Business Impact</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {srv.businessOutcome}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {srv.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                        {tech}
                      </span>
                    ))}
                    {srv.technologies.length > 4 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                        +{srv.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Full Pillar Blueprint</span>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-200"
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
