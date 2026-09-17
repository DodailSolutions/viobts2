import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, AlertCircle, TrendingUp, Building2, ShieldCheck } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

interface IndustryDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: IndustryDetailPageProps): Promise<Metadata> {
  const ind = cmsStore.getIndustryBySlug(params.slug);
  if (!ind) return { title: "Industry Not Found | VIO" };

  return {
    title: `${ind.title} | Sector Solutions`,
    description: ind.description,
    openGraph: {
      title: `${ind.title} | VIO Technology Accelerator`,
      description: ind.description,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const ind = cmsStore.getIndustryBySlug(params.slug);
  if (!ind) notFound();

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Industry Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/industries" className="hover:text-blue-600">Industries</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600">{ind.title}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
            <Building2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            {ind.eyebrow}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
          {ind.title}
        </h1>

        <p className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-8">
          {ind.description}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md shadow-blue-500/20"
        >
          <span>Request Sector Advisory</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Grid: Challenges vs Transformation Trends */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Key Challenges */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Critical Sector Pressures
              </h2>
            </div>
            <div className="space-y-4">
              {ind.keyChallenges.map((ch, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                  <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">{ch}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transformation Trends */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Modernization Drivers
              </h2>
            </div>
            <div className="space-y-4">
              {ind.transformationTrends.map((tr, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-200/50">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">{tr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIO Tailored Solutions */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md">
          <h2 className="text-2xl font-bold text-slate-950 mb-6">
            VIO Tailored Architectural Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ind.capabilities.map((cap, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="TAILORED ENGAGEMENT"
        heading={`Accelerate your ${ind.title} roadmap`}
        subheading="Connect with our domain specialists to review your enterprise architecture and compliance mandates."
        primaryCtaText="Speak with an Industry Expert"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
