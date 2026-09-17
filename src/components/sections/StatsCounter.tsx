"use client";

import React from "react";

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

export function StatsCounter({
  eyebrow = "PROVEN TRACK RECORD",
  heading = "Enterprise Scale with Verified Impact",
  stats = [
    { label: "Years of Excellence", value: "10+", description: "Founder-led engineering track record" },
    { label: "Public & Enterprise Clients", value: "50+", description: "Tier-1 banks, state agencies & global firms" },
    { label: "VA-SWaM Certified", value: "100%", description: "Woman-owned business enterprise" },
    { label: "Client Satisfaction", value: "99.8%", description: "Measurable business outcomes delivered" },
  ],
}: StatsCounterProps) {
  return (
    <section className="relative py-20 bg-slate-50/80 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="text-center mb-14">
            {eyebrow && (
              <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 text-gradient-cyan">
                {stat.value}
              </p>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                {stat.label}
              </h3>
              {stat.description && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
