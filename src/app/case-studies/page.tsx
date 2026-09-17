import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Verified Client Proof | VIO",
  description: "Explore real-world case studies for Virginia State Agencies (ODGA), USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Client Proof & Enterprise Case Studies | VIO",
    description: "Real-world cloud migrations, petabyte lakehouses, and high-throughput trading platforms delivered by VIO.",
    url: "https://viobts.com/case-studies",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Case Studies | VIO",
    description: "Quantified results for public sector agencies and Fortune 500 enterprises.",
    images: ["/images/vio-logo.png"],
  },
};

export default function CaseStudiesPage() {
  const caseStudies = cmsStore.getCaseStudies();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "VIO Enterprise Case Studies",
    "description": "Verified client transformations across public and private sectors.",
    "itemListElement": caseStudies.map((cs, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Article",
        "name": cs.title,
        "headline": cs.title,
        "description": cs.challenge,
        "image": cs.imageUrl,
        "url": `https://viobts.com/case-studies/${cs.slug}`
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
            CLIENT PROOFS & EMPIRICAL RESULTS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Real Engineering, <span className="text-[#0066cc]">Measurable Results</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Discover how VIO delivers zero-downtime cloud architectures, petabyte lakehouses, and mission-critical systems for leading enterprises and government agencies.
        </p>
      </section>

      {/* Case Studies Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-white overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071739]/80 via-[#071739]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#0066cc] backdrop-blur-xs shadow-xs">
                      {cs.industry}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                      {cs.client}
                    </p>
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-xl font-bold text-[#071739] mb-3 group-hover:text-[#0066cc] transition-colors line-clamp-2">
                    {cs.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {cs.challenge}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/70 mb-6">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <p className="text-2xl font-black text-[#0066cc]">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cs.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-slate-100">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0066cc] hover:text-[#0052a3] transition-colors group-hover:translate-x-0.5"
                >
                  <span>View Complete Case Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="ACHIEVE MEASURABLE OUTCOMES"
        heading="Ready to author your enterprise success story?"
        subheading="Schedule an initial architectural discovery session to explore how VIO's squads can accelerate your roadmap."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Capabilities"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
