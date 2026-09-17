import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle2, Quote, ShieldCheck } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

interface CaseStudyDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const cs = cmsStore.getCaseStudyBySlug(params.slug);
  if (!cs) return { title: "Case Study Not Found | VIO" };

  return {
    title: `${cs.title} | Case Proof | VIO`,
    description: cs.challenge,
    openGraph: {
      title: `${cs.title} - ${cs.client} | VIO`,
      description: cs.solution,
      images: [cs.imageUrl],
    },
  };
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const cs = cmsStore.getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/case-studies" className="hover:text-brand-blue transition-colors">Case Studies</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-brand-blue">{cs.client}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-100">
            {cs.industry}
          </span>
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
            Client Proof
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          {cs.title}
        </h1>

        <p className="text-lg text-slate-600 font-normal leading-relaxed mb-8">
          Client: <strong className="text-slate-900">{cs.client}</strong>
        </p>

        {/* Highlight Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-8 shadow-sm">
          {cs.metrics.map((m, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <p className="text-2xl sm:text-4xl font-black text-brand-blue">
                {m.value}
              </p>
              <p className="text-xs text-slate-500 uppercase font-semibold mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative h-[350px] sm:h-[480px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
          <Image
            src={cs.imageUrl}
            alt={cs.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* Challenge, Solution & Results Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-3xl bg-amber-50/50 border border-amber-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-amber-800 uppercase tracking-wider mb-4">
              The Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {cs.challenge}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-brand-blue uppercase tracking-wider mb-4">
              VIO's Solution
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {cs.solution}
            </p>
          </div>
        </div>

        {/* Quantified Business Results */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Quantified Business Outcomes Delivered
          </h2>
          <div className="space-y-4">
            {cs.results.map((res, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial if present */}
        {cs.testimonial && (
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 mb-12 relative shadow-sm">
            <Quote className="w-10 h-10 text-brand-blue/15 absolute top-6 right-6" />
            <blockquote className="text-lg sm:text-xl text-slate-800 italic leading-relaxed mb-6">
              "{cs.testimonial.quote}"
            </blockquote>
            <div>
              <p className="text-sm font-bold text-slate-900">{cs.testimonial.author}</p>
              <p className="text-xs text-brand-blue font-semibold">{cs.testimonial.role}</p>
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            Engineered With:
          </span>
          {cs.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="SIMILAR CHALLENGE?"
        heading="Let's engineer your success story."
        subheading="Consult with our engineering leads to discuss architectural options for your organization."
        primaryCtaText="Book a Consultation"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
