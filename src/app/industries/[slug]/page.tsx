import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Building2, 
  ShieldCheck,
  Calendar,
  Sparkles
} from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

interface IndustryDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: IndustryDetailPageProps): Promise<Metadata> {
  const ind = cmsStore.getIndustryBySlug(params.slug);
  if (!ind) return { title: "Industry Not Found | VIO" };

  return {
    title: `${ind.title} Solutions & Compliance Blueprint | VIO`,
    description: ind.description,
    alternates: {
      canonical: `/industries/${ind.slug}`,
    },
    openGraph: {
      title: `${ind.title} | VIO Technology Accelerator`,
      description: ind.description,
      url: `https://viobts.com/industries/${ind.slug}`,
      type: "website",
      images: [
        {
          url: "/images/vio-logo.png",
          width: 1200,
          height: 630,
          alt: ind.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ind.title} | VIO`,
      description: ind.description,
      images: ["/images/vio-logo.png"],
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const ind = cmsStore.getIndustryBySlug(params.slug);
  if (!ind) notFound();

  // JSON-LD Structured Data: Breadcrumbs + Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://viobts.com/industries/${ind.slug}#service`,
        "name": `${ind.title} Enterprise Solutions`,
        "description": ind.description,
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Industry Digital Transformation"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://viobts.com/industries/${ind.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://viobts.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Industries",
            "item": "https://viobts.com/industries"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": ind.title,
            "item": `https://viobts.com/industries/${ind.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Industry Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/industries" className="hover:text-[#0066cc] transition-colors">Industries</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066cc] font-bold">{ind.title}</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <Building2 className="w-4 h-4 text-[#0066cc]" />
          <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest">
            {ind.eyebrow} • Sector Practice
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          {ind.title}
        </h1>

        <p className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-10">
          {ind.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={`/contact?industry=${ind.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Consult Sector Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/case-studies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            <span>View Related Case Studies</span>
          </Link>
        </div>
      </section>

      {/* Grid: Challenges vs Transformation Trends */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Key Challenges */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/40 border border-amber-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#071739] uppercase tracking-wider">
                Critical Sector Pressures
              </h2>
            </div>
            <div className="space-y-4">
              {ind.keyChallenges.map((ch, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-amber-200/60 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{ch}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transformation Trends */}
          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/40 border border-blue-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-100 text-[#0066cc]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#071739] uppercase tracking-wider">
                Modernization Drivers
              </h2>
            </div>
            <div className="space-y-4">
              {ind.transformationTrends.map((tr, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-blue-200/60 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-[#0066cc] mt-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{tr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIO Tailored Solutions */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#0066cc]" />
            <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider">
              ENGINEERED DELIVERABLES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071739] tracking-tight mb-8">
            VIO Tailored Architectural Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ind.capabilities.map((cap, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-slate-800 leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="TAILORED ENGAGEMENT"
        heading={`Accelerate your ${ind.title} roadmap`}
        subheading="Connect with our domain specialists to review your enterprise architecture, compliance posture, and integration needs."
        primaryCtaText="Speak with an Industry Expert"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore All Industries"
        secondaryCtaLink="/industries"
      />
    </div>
  );
}
