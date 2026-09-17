import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, ChevronRight, CheckCircle2, Cpu, Database, Users, GitBranch, Cloud, Sparkles } from "lucide-react";
import { cmsStore } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enterprise Technology Services & 6 Core Pillars",
  description: "Explore VIO's 6 core technology pillars: Technology Workforce, Big Data & Analytics, Open-source Integration, Cloud Enablement, API & Microservices, RPA, ML & AI.",
};

const ICON_MAP: Record<string, any> = {
  Users,
  Database,
  GitBranch,
  Cloud,
  Cpu,
  Sparkles,
};

export default function ServicesPage() {
  const services = cmsStore.getServices();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
          VIO CORE SERVICES
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
          Technology Built Around <span className="text-gradient-cyan">Your Business</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From high-velocity engineering pods to petabyte-scale lakehouses and agentic AI, we engineer platforms that scale without compromise.
        </p>
      </section>

      {/* 6 Services Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-12">
          {services.map((srv, idx) => {
            const Icon = ICON_MAP[srv.icon] || Cpu;
            return (
              <div
                key={srv.id}
                id={srv.slug}
                className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Pillar 0{srv.orderIndex}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3">
                      {srv.title}
                    </h2>
                    <p className="text-sm font-semibold text-blue-600 mb-4">
                      {srv.eyebrow}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 mb-6">
                      <p className="text-xs text-blue-700 font-bold mb-1 uppercase">
                        Measurable Outcome:
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {srv.businessOutcome}
                      </p>
                    </div>

                    <Link
                      href={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                    >
                      <span>Explore Dedicated Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Core Capabilities
                      </h3>
                      <ul className="space-y-2.5">
                        {srv.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Enterprise Toolchain
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {srv.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white text-blue-700 border border-slate-200 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
