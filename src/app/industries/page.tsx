import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { cmsStore } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industry Solutions & Mission-Critical Sectors | VIO",
  description: "Enterprise engineering across Banking & Financial Services, Healthcare, Government, Manufacturing, Utilities, and Media.",
};

export default function IndustriesPage() {
  const industries = cmsStore.getIndustries();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
          SECTOR EXPERTISE
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
          Engineered for Highly <span className="text-gradient-cyan">Regulated Sectors</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From federal and state compliance to sub-millisecond capital markets execution and HIPAA healthcare interoperability.
        </p>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 group transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    0{ind.orderIndex}
                  </span>
                </div>

                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {ind.eyebrow}
                </p>
                <h2 className="text-2xl font-bold text-slate-950 mb-3 group-hover:text-blue-600 transition-colors">
                  {ind.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {ind.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 mb-6">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Key Challenges Solved:
                  </p>
                  <ul className="space-y-1.5">
                    {ind.keyChallenges.slice(0, 2).map((ch, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Explore Industry Blueprint</span>
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
