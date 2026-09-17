import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  Landmark, 
  ShieldCheck, 
  HeartPulse, 
  Factory, 
  Zap, 
  Radio, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Industry Solutions & Regulated Sector Transformations | VIO",
  description: "Enterprise engineering across Banking & Financial Services, Healthcare, Government, Manufacturing, Utilities, and Media with VA-SWaM certified excellence.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industry Solutions & Regulated Sectors | VIO",
    description: "Deep domain compliance and architectural excellence across finance, public sector, healthcare, manufacturing, utilities, and media.",
    url: "https://viobts.com/industries",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Solutions & Regulated Sectors | VIO",
    description: "Enterprise engineering across high-compliance domains.",
    images: ["/images/vio-logo.png"],
  },
};

const SECTOR_CONFIGS: Record<string, {
  icon: React.ElementType;
  badge: string;
  accent: string;
  bg: string;
}> = {
  "banking-financial-services": {
    icon: Landmark,
    badge: "FINRA • SOC2 • PCI-DSS",
    accent: "text-[#0066cc]",
    bg: "bg-blue-50"
  },
  "healthcare-life-sciences-insurance": {
    icon: HeartPulse,
    badge: "HIPAA • HITECH • FHIR",
    accent: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  "government": {
    icon: ShieldCheck,
    badge: "VA-SWaM • NIST 800-53",
    accent: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  "manufacturing-automotive": {
    icon: Factory,
    badge: "Industry 4.0 • IoT",
    accent: "text-amber-600",
    bg: "bg-amber-50"
  },
  "energy-utilities": {
    icon: Zap,
    badge: "SCADA • Grid Resiliency",
    accent: "text-sky-600",
    bg: "bg-sky-50"
  },
  "communication-media": {
    icon: Radio,
    badge: "Ultra-Low Latency • Edge",
    accent: "text-purple-600",
    bg: "bg-purple-50"
  }
};

export default function IndustriesPage() {
  const industries = cmsStore.getIndustries();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "VIO Industry Solutions",
    "description": "Enterprise technology architectures tailored for heavily regulated sectors.",
    "itemListElement": industries.map((ind, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": ind.title,
        "description": ind.description,
        "url": `https://viobts.com/industries/${ind.slug}`
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
            SECTOR EXPERTISE & REGULATORY EXCELLENCE
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Engineered for Highly <span className="text-[#0066cc]">Regulated Sectors</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          From federal and state security compliance (VA-SWaM, NIST) to sub-millisecond capital markets trading engines and HIPAA healthcare interoperability vaults.
        </p>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const cfg = SECTOR_CONFIGS[ind.slug] || {
              icon: Building2,
              badge: "Enterprise",
              accent: "text-[#0066cc]",
              bg: "bg-blue-50"
            };
            const SectorIcon = cfg.icon;

            return (
              <div
                key={ind.id}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 group transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${cfg.bg} ${cfg.accent} flex items-center justify-center transition-all group-hover:scale-105`}>
                      <SectorIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{ind.orderIndex}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700 mb-3 border border-slate-200/80">
                    <span>{cfg.badge}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#071739] mb-3 group-hover:text-[#0066cc] transition-colors tracking-tight">
                    {ind.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {ind.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/70 mb-6">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Key Challenges Solved:
                    </p>
                    <ul className="space-y-2">
                      {ind.keyChallenges.slice(0, 2).map((ch, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066cc] hover:text-[#0052a3] transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Explore Industry Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        eyebrow="DOMAIN ARCHITECTURE"
        heading="Deploy solutions built for your regulatory landscape."
        subheading="Consult with our sector specialists to ensure compliance, high availability, and rapid execution."
        primaryCtaText="Consult Sector Specialist"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Case Studies"
        secondaryCtaLink="/case-studies"
      />
    </div>
  );
}
