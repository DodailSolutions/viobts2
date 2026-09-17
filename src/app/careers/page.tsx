import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Sparkles, MapPin, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { INITIAL_CAREERS } from "@/lib/data";
import { CareersClient } from "@/components/careers/CareersClient";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Careers & Engineering Culture | Join VIO | Richmond, VA",
  description: "Explore engineering careers at VIO in Richmond, VA (hybrid & remote). Work on cloud native microservices, big data lakehouses, and AI automation for tier-1 enterprises.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at VIO | The Technology Accelerator",
    description: "Join an elite engineering culture of builders, cloud architects, and data engineers headquartered in Richmond, Virginia.",
    url: "https://viobts.com/careers",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Careers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Culture | VIO",
    description: "Build for the next decade with VIO's high-velocity engineering pods.",
    images: ["/images/vio-logo.png"],
  },
};

export default function CareersPage() {
  const careers = INITIAL_CAREERS;

  // JSON-LD Structured Data: JobPosting array for Google Jobs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": careers.map((job) => ({
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "datePosted": "2026-02-01",
      "validThrough": "2026-12-31",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "VIO",
        "sameAs": "https://viobts.com",
        "logo": "https://viobts.com/images/vio-logo.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Richmond",
          "addressRegion": "VA",
          "addressCountry": "US"
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
            JOIN VIO ENGINEERING SQUADS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Build for the <span className="text-[#0066cc]">Next Decade</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          We are a culture of autonomous builders, cloud architects, and data engineers headquartered in Richmond, Virginia with distributed teams nationwide. Work on mission-critical platforms with high accountability.
        </p>
      </section>

      {/* Culture Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
              01 • AMBITION
            </span>
            <h2 className="text-xl font-extrabold text-[#071739] mb-2">Think Bigger</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We tackle enterprise-scale challenges that touch millions of citizens and billions in transactions for state agencies and FinTech brokerages.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
              02 • CRAFT
            </span>
            <h2 className="text-xl font-extrabold text-[#0066cc] mb-2">Build Smarter</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Prioritizing automated GitOps pipelines, domain-driven boundaries, zero architectural bloat, and empirical measurement.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
              03 • TENACITY
            </span>
            <h2 className="text-xl font-extrabold text-[#071739] mb-2">Solve Harder</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We persist until the root cause is resolved and continuous telemetry proves victory under our Measure → Analyse → Improve doctrine.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071739] tracking-tight">
              Open Engineering Positions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Richmond, Virginia Headquarters • Hybrid & Remote Available
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-[#0066cc] border border-blue-200">
            {careers.length} Active Openings
          </span>
        </div>

        {/* Client Interactive Job List & Modal */}
        <CareersClient careers={careers} />
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="DON'T SEE YOUR ROLE?"
        heading="We're always looking for exceptional engineers."
        subheading="Send your resume and project portfolio directly to our technical leadership team."
        primaryCtaText="Contact Talent Squad"
        primaryCtaLink="/contact"
        secondaryCtaText="Who We Are"
        secondaryCtaLink="/who-we-are"
      />
    </div>
  );
}
