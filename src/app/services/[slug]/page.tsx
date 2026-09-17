import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Cpu, Users, Database, GitBranch, Cloud } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const srv = cmsStore.getServiceBySlug(params.slug);
  if (!srv) return { title: "Service Not Found | VIO" };

  return {
    title: `${srv.title} | Enterprise Services`,
    description: srv.description,
    openGraph: {
      title: `${srv.title} | VIO Technology Accelerator`,
      description: srv.description,
    },
  };
}

const ICON_MAP: Record<string, any> = {
  Users,
  Database,
  GitBranch,
  Cloud,
  Cpu,
  Sparkles,
};

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const srv = cmsStore.getServiceBySlug(params.slug);
  if (!srv) notFound();

  const Icon = ICON_MAP[srv.icon] || Cpu;

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Service Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600">{srv.title}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
            <Icon className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            {srv.eyebrow}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
          {srv.title}
        </h1>

        <p className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-8">
          {srv.subtitle}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md shadow-blue-500/20"
          >
            <span>Consult on {srv.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Strategic Architecture Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
              Architectural Overview & Value Creation
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              {srv.description}
            </p>

            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">
              Key Capabilities Delivered
            </h3>
            <div className="space-y-3 mb-8">
              {srv.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-medium">{cap}</span>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/60">
              <p className="text-xs font-bold text-blue-700 uppercase mb-1">
                Target Business Outcome:
              </p>
              <p className="text-sm text-slate-900 font-semibold">
                {srv.businessOutcome}
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Supported Technologies & Toolchains
              </h3>
              <div className="flex flex-wrap gap-2">
                {srv.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-blue-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                VA-SWaM Certified Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                All VIO engagements are backed by our Richmond, Virginia headquarters and certified woman-owned SWaM governance standards.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-blue-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>10+ Years Enterprise Track Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      {srv.faqs && srv.faqs.length > 0 && (
        <AccordionFAQ
          eyebrow="CAPABILITY FAQ"
          heading={`Frequently Asked Questions: ${srv.title}`}
          faqs={srv.faqs}
        />
      )}

      {/* Conversion Banner */}
      <CTABanner
        eyebrow="ACCELERATE YOUR INITIATIVE"
        heading={`Ready to deploy ${srv.title}?`}
        subheading="Book a complimentary consultation with our principal architects to review your technical roadmap."
        primaryCtaText="Schedule Consultation"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
