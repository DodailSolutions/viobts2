"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Database,
  Calendar
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
  imageSrc?: string;
}

export function HeroBanner({
  eyebrow = "WE ARE YOUR TECHNOLOGY PARTNER",
  headline = "The technology accelerator for your business",
  highlightText = "business",
  subheading = "Cutting-Edge Technology Solutions To Deliver Excellence Applying Best Practices, Scalable AI, Data Solutions And Expert Talent. Measure → Analyse → Improve.",
  badge = "VA-SWaM Certified • Richmond, Virginia • 10+ Years Track Record",
  primaryCtaText = "Book a Call",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Explore Capabilities",
  secondaryCtaLink = "/services",
  imageSrc = "/images/hero-graphic.png",
}: HeroBannerProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 bg-[#fcfdff]">
      {/* Dynamic Ambient Mesh Glow & Engineering Dot Grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" 
      />
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-indigo-500/15 via-blue-400/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-[500px] h-[400px] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authoritative Copy & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Live Status & SWaM Certification Beacon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-blue-100 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wide">
                {eyebrow}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] sm:text-xs font-black text-blue-700 uppercase tracking-wider">
                VA-SWaM Certified
              </span>
            </div>

            {/* Headline with Balanced Editorial Focus */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight text-[#071739] leading-[1.12]">
              {headline.includes(highlightText) ? (
                <>
                  {headline.split(highlightText)[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
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
              <p className="text-base sm:text-lg lg:text-[19px] text-slate-600 max-w-2xl font-normal leading-relaxed">
                {subheading}
              </p>
            )}

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {primaryCtaText && (
                <Link
                  href={primaryCtaLink}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#0066cc] to-[#0052a3] hover:from-[#0052a3] hover:to-[#003d7a] transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:text-blue-700 shadow-xs hover:shadow-sm transition-all duration-300"
                >
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>

            {/* Enterprise Credentials Strip */}
            <div className="pt-4 border-t border-slate-200/70">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-[#071739]">10+ Years</div>
                  <div className="text-[11px] font-semibold text-slate-500">Track Record</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-blue-600">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500">SWaM Certified</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">NIST</div>
                  <div className="text-[11px] font-semibold text-slate-500">GovCloud Ready</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-[#071739]">99.8%</div>
                  <div className="text-[11px] font-semibold text-slate-500">Satisfaction</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Isometric Artwork with Ambient Levitation & Floating Badges (5 cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
            
            {/* Luminous Core Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-cyan-400/20 to-indigo-500/10 rounded-full blur-3xl scale-95 pointer-events-none" />

            {/* 3D Isometric Platform Image with Floating Animation */}
            <div className="relative z-10 w-full max-w-[540px] animate-float">
              <img
                src={imageSrc}
                alt="VIO Digital Technology Accelerator Platform"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(7,23,57,0.18)]"
                loading="eager"
              />
            </div>

            {/* Floating Glass Badge 1 (Top Right): Scalable AI & ML */}
            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xl animate-float-delayed">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#071739]">AI & Automation</div>
                <div className="text-[10px] font-bold text-emerald-600">+45% Sprint Acceleration</div>
              </div>
            </div>

            {/* Floating Glass Badge 2 (Bottom Left): Data Lakehouse */}
            <div className="absolute -bottom-6 -left-3 z-20 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xl animate-float">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#071739]">Data Lakehouse</div>
                <div className="text-[10px] font-bold text-blue-600">Sub-second Analytics</div>
              </div>
            </div>

            {/* Floating Glass Badge 3 (Bottom Right): NIST GovCloud */}
            <div className="absolute bottom-16 -right-4 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#071739] text-white shadow-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-extrabold tracking-wide">NIST 800-53 Compliant</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
