import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Users, 
  GitBranch, 
  Cloud, 
  Sparkles, 
  ShieldCheck,
  Zap,
  TrendingUp
} from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Enterprise Technology Services & 6 Core Pillars | VIO",
  description: "Explore VIO's 6 core technology pillars: Technology Workforce, Big Data & Analytics, Open-source Integration, Cloud Enablement, API & Microservices, RPA, ML & AI.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Enterprise Technology Services & 6 Pillars | VIO",
    description: "Richmond, VA woman-owned VA-SWaM certified technology consulting partner. Specializing in Technology Workforce, Big Data, Cloud, APIs, and AI/ML.",
    url: "https://viobts.com/services",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Enterprise Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Technology Services | VIO Technology Accelerator",
    description: "Explore VIO's 6 core technology pillars engineered to scale modern business.",
    images: ["/images/vio-logo.png"],
  },
};

const ICON_MAP: Record<string, any> = {
  Users,
  Database,
  GitBranch,
  Cloud,
  Cpu,
  Sparkles,
};

const PILLAR_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  "technology-workforce": { bg: "bg-blue-50", text: "text-[#0066cc]", border: "border-blue-200", glow: "hover:border-blue-400" },
  "big-data-analytics": { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", glow: "hover:border-indigo-400" },
  "open-source-integration": { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", glow: "hover:border-emerald-400" },
  "cloud-enablement": { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200", glow: "hover:border-sky-400" },
  "api-microservices": { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", glow: "hover:border-purple-400" },
  "rpa-ml-ai": { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", glow: "hover:border-amber-400" },
};

export default function ServicesPage() {
  const services = cmsStore.getServices();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "VIO Enterprise Technology Services",
    "description": "The 6 core engineering pillars delivered by VIO Technology Accelerator.",
    "itemListElement": services.map((s, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description,
        "url": `https://viobts.com/services/${s.slug}`,
        "provider": {
          "@type": "Organization",
          "name": "VIO"
        }
      }
    }))
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc]/50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-4">
          <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0066cc] uppercase">
            6 CORE TECHNOLOGY PILLARS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Technology Capabilities Built Around <span className="text-[#0066cc]">Your Goals</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
          From high-velocity engineering workforce augmentation to petabyte-scale lakehouses, multi-cloud resilience, and autonomous AI systems.
        </p>

        {/* Quick Pillar Jump Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {services.map((srv) => (
            <a
              key={srv.id}
              href={`#${srv.slug}`}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-300 text-xs font-semibold text-slate-700 hover:text-[#0066cc] transition-all shadow-xs"
            >
              {srv.title}
            </a>
          ))}
        </div>
      </section>

      {/* 6 Services Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {services.map((srv, idx) => {
            const Icon = ICON_MAP[srv.icon] || Cpu;
            const theme = PILLAR_COLORS[srv.slug] || {
              bg: "bg-blue-50",
              text: "text-[#0066cc]",
              border: "border-blue-200",
              glow: "hover:border-blue-400"
            };

            return (
              <div
                key={srv.id}
                id={srv.slug}
                className={`p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl ${theme.glow} transition-all duration-300 relative overflow-hidden`}
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066cc] via-[#00B4D8] to-blue-400 opacity-80" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Overview Column */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.text}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                          Pillar 0{srv.orderIndex} • VIO Practice
                        </span>
                        <span className={`text-xs font-bold ${theme.text} uppercase tracking-wider block`}>
                          {srv.eyebrow}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071739] tracking-tight">
                      {srv.title}
                    </h2>
                    
                    <p className="text-sm font-semibold text-slate-700 leading-snug">
                      {srv.subtitle}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {srv.description}
                    </p>

                    {/* Measurable Outcome Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[#0066cc] font-bold uppercase tracking-wider mb-1">
                          Measurable Business Outcome:
                        </p>
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                          {srv.businessOutcome}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
                      >
                        <span>Explore {srv.title} Blueprint</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Capabilities & Tech Stack Column */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
                    {/* Capabilities */}
                    <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                          <span>Core Capabilities</span>
                        </h3>
                        <ul className="space-y-3">
                          {srv.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                              <span className="font-medium">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#0066cc]" />
                          <span>Enterprise Toolchain</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {srv.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                        Production hardened • SLA backed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="READY TO ARCHITECT"
        heading="Need a customized enterprise solution?"
        subheading="Schedule a technical discovery session with our principal engineers to map your architectural requirements."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Meet Our Clients"
        secondaryCtaLink="/#sec-clients"
      />
    </div>
  );
}
