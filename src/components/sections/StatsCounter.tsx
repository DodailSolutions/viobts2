"use client";

import React from "react";
import { Award, ShieldCheck, Users, ThumbsUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  description?: string;
}

interface StatsCounterProps {
  eyebrow?: string;
  heading?: string;
  stats?: StatItem[];
}

const STAT_ICONS = [Award, Users, ShieldCheck, ThumbsUp];

export function StatsCounter({
  eyebrow = "PROVEN TRACK RECORD",
  heading = "Enterprise Scale with Verified Impact",
  stats = [
    { label: "Years of Excellence", value: "10+", description: "Founder-led engineering track record" },
    { label: "Enterprise & State Clients", value: "50+", description: "Tier-1 banks, federal & state agencies" },
    { label: "VA-SWaM Certified", value: "100%", description: "Woman-owned business enterprise" },
    { label: "Client Satisfaction", value: "99.8%", description: "Measurable business outcomes delivered" },
  ],
}: StatsCounterProps) {
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#fcfdff] via-slate-50/60 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="text-center mb-12 sm:mb-14">
            {eyebrow && (
              <p className="text-xs font-extrabold tracking-[0.25em] text-[#0066cc] uppercase mb-2.5">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071739] tracking-tight">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071739] group-hover:text-blue-600 transition-colors mb-2">
                    {stat.value}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug mb-1">
                    {stat.label}
                  </h3>
                  {stat.description && (
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
