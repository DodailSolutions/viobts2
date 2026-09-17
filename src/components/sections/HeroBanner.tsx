"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Database, 
  Cpu, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  Server,
  Users
} from "lucide-react";

interface HeroBannerProps {
  eyebrow?: string;
  headline?: string;
  highlightText?: string;
  subheading?: string;
  badge?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroBanner({
  eyebrow = "NAVIGATE YOUR DIGITAL FUTURE",
  headline = "THE TECHNOLOGY ACCELERATOR FOR YOUR BUSINESS",
  highlightText = "TECHNOLOGY ACCELERATOR",
  subheading = "Measure → Analyse → Improve. We empower global enterprises and government agencies to accelerate digital velocity with elite technical squads, resilient cloud pipelines, and measurable ROI.",
  badge = "VA-SWaM Certified • Richmond, Virginia • 10+ Years Track Record",
  primaryCtaText = "Book a Consultation",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Explore Capabilities",
  secondaryCtaLink = "/services",
}: HeroBannerProps) {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"workforce" | "lakehouse" | "automation">("workforce");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-20 bg-white">
      {/* High-Tech Blueprint & Ambient Glow Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authoritative Editorial Storytelling (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Live Status & SWaM Certification Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-600">Enterprise Accelerator</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-extrabold">VA-SWaM Certified</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium">Richmond, VA</span>
            </div>

            {/* Eyebrow */}
            {eyebrow && (
              <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-blue-600 uppercase">
                {eyebrow}
              </p>
            )}

            {/* Headline with Authoritative Contrast */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.06]">
              {headline.includes(highlightText) ? (
                <>
                  {headline.split(highlightText)[0]}
                  <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {highlightText}
                  </span>
                  {headline.split(highlightText)[1]}
                </>
              ) : (
                headline
              )}
            </h1>

            {/* Executive Subheading */}
            {subheading && (
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                {subheading}
              </p>
            )}

            {/* Enterprise Assurance Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/80 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>10+ Years Proven Client Track Record</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/80 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>NIST 800-53 & GovCloud Verified</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/80 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>ODGA, USAID, DriveWealth Partner</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200/80 px-3.5 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>99.8% Verified Client Satisfaction</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.01]"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 border border-slate-200 transition-all duration-300"
                >
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Infosys-Grade Acceleration Console (5 cols) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl blur-2xl transform rotate-1 scale-95" />

            {/* Floating Top Badge: NIST Compliant */}
            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-lg text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NIST GovCloud Ready</span>
            </div>

            {/* Main Console Container */}
            <div className="relative z-10 bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 backdrop-blur-md">
              {/* Console Window Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-400 ml-2">
                    VIO_ACCELERATION_ENGINE
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  LIVE TELEMETRY
                </span>
              </div>

              {/* Console Interactive Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: "workforce", label: "Workforce Pods", icon: Users },
                  { id: "lakehouse", label: "Lakehouse", icon: Database },
                  { id: "automation", label: "AI & RPA", icon: Cpu },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeConsoleTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveConsoleTab(tab.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl text-xs font-bold transition-all ${
                        active
                          ? "bg-blue-50 border border-blue-200 text-blue-700 shadow-xs scale-[1.02]"
                          : "bg-slate-50 border border-slate-200/60 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${active ? "text-blue-600" : "text-slate-400"}`} />
                      <span className="text-[11px]">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Console Body Content Based on Tab */}
              <div className="space-y-4 mb-6">
                {activeConsoleTab === "workforce" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Sprint Delivery Velocity</span>
                      <span className="text-xs font-extrabold text-blue-600">+45% Acceleration</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full w-[85%] transition-all duration-700" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Pre-vetted engineering squads deployed in sprints within 5-10 business days for instant scalability.
                    </p>
                  </div>
                )}

                {activeConsoleTab === "lakehouse" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">ETL Window Reduction</span>
                      <span className="text-xs font-extrabold text-emerald-600">-70% Batch Overhead</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[90%] transition-all duration-700" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Unified lakehouse pipelines turning multi-source silos into sub-second decision intelligence.
                    </p>
                  </div>
                )}

                {activeConsoleTab === "automation" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Audit & Compliance Speed</span>
                      <span className="text-xs font-extrabold text-purple-600">3.5x Faster</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full w-[80%] transition-all duration-700" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Automated ML & RPA pipelines mitigating regulatory friction across banking and government standards.
                    </p>
                  </div>
                )}

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">ODGA Virginia</p>
                    <p className="text-lg font-black text-slate-900">4M+ Citizens</p>
                    <p className="text-[10px] text-emerald-600 font-bold">100% GovCloud Verified</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">DriveWealth</p>
                    <p className="text-lg font-black text-slate-900">+15% Retention</p>
                    <p className="text-[10px] text-blue-600 font-bold">Sub-second Latency</p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Ready to review your tech architecture?</span>
                <Link
                  href="/contact"
                  className="font-extrabold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>Schedule Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Floating Bottom Badge: 10+ Years */}
            <div className="absolute -bottom-4 -left-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-lg text-xs font-bold text-slate-800">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>10+ Years Enterprise Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
