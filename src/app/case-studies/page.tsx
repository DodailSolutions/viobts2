import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { cmsStore } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Verified Client Proof | VIO",
  description: "Explore real-world case studies for Virginia State Agencies (ODGA), USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.",
};

export default function CaseStudiesPage() {
  const caseStudies = cmsStore.getCaseStudies();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          PROVEN IMPACT
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Real Engineering, <span className="text-gradient-cyan">Measurable Results</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Discover how VIO delivers high-throughput cloud architectures, data lakehouses, and mission-critical systems for leading enterprises and public agencies.
        </p>
      </section>

      {/* Case Studies Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cs.imageUrl}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-brand-blue backdrop-blur-sm shadow-sm">
                      {cs.industry}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                    {cs.client}
                  </p>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {cs.challenge}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                    {cs.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <p className="text-xl font-black text-brand-blue">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase font-medium">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cs.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-slate-100">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors"
                >
                  <span>View Complete Case Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
