import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, CheckCircle2, Quote, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

interface CaseStudyDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const cs = cmsStore.getCaseStudyBySlug(params.slug);
  if (!cs) return { title: "Case Study Not Found | VIO" };

  return {
    title: `${cs.title} | ${cs.client} Case Proof | VIO`,
    description: cs.challenge,
    alternates: {
      canonical: `/case-studies/${cs.slug}`,
    },
    openGraph: {
      title: `${cs.title} - ${cs.client} | VIO`,
      description: cs.solution,
      url: `https://viobts.com/case-studies/${cs.slug}`,
      type: "article",
      images: [
        {
          url: cs.imageUrl,
          width: 1200,
          height: 630,
          alt: cs.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | VIO Case Proof`,
      description: cs.solution,
      images: [cs.imageUrl],
    },
  };
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const cs = cmsStore.getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  // JSON-LD Structured Data: Article + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://viobts.com/case-studies/${cs.slug}#article`,
        "headline": cs.title,
        "description": cs.solution,
        "image": cs.imageUrl,
        "publisher": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com",
          "logo": "https://viobts.com/images/vio-logo.png"
        },
        "about": {
          "@type": "Organization",
          "name": cs.client
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://viobts.com/case-studies/${cs.slug}#breadcrumb`,
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
            "name": "Case Studies",
            "item": "https://viobts.com/case-studies"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": cs.client,
            "item": `https://viobts.com/case-studies/${cs.slug}`
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

      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/case-studies" className="hover:text-[#0066cc] transition-colors">Case Studies</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066cc] font-bold">{cs.client}</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider">
            {cs.industry} • Verified Client Proof
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          {cs.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium mb-8">
          Partner Organization: <strong className="text-[#071739] font-extrabold">{cs.client}</strong>
        </p>

        {/* Highlight Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/90 mb-8 shadow-xs">
          {cs.metrics.map((m, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <p className="text-3xl sm:text-5xl font-black text-[#0066cc]">
                {m.value}
              </p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative h-[320px] sm:h-[480px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
          <Image
            src={cs.imageUrl}
            alt={cs.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071739]/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* Challenge, Solution & Results Narrative */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/40 border border-amber-200/80 shadow-xs">
            <h2 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-4">
              The Architectural Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {cs.challenge}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/40 border border-blue-200/80 shadow-xs">
            <h2 className="text-sm font-bold text-[#0066cc] uppercase tracking-wider mb-4">
              VIO's Engineered Solution
            </h2>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {cs.solution}
            </p>
          </div>
        </div>

        {/* Quantified Business Results */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-12">
          <h2 className="text-2xl font-black text-[#071739] tracking-tight mb-6">
            Quantified Business Outcomes Delivered
          </h2>
          <div className="space-y-4">
            {cs.results.map((res, i) => (
              <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/70">
                <CheckCircle2 className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial if present */}
        {cs.testimonial && (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200/80 mb-12 relative shadow-sm">
            <Quote className="w-14 h-14 text-[#0066cc]/20 absolute top-6 right-8 pointer-events-none" />
            <blockquote className="text-lg sm:text-2xl text-[#071739] italic font-medium leading-relaxed mb-6">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <div className="pt-4 border-t border-blue-100">
              <p className="text-base font-extrabold text-[#071739]">{cs.testimonial.author}</p>
              <p className="text-xs font-semibold text-[#0066cc] mt-0.5">{cs.testimonial.role}</p>
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-[#071739] uppercase tracking-wider mr-2">
            Engineered With:
          </span>
          {cs.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#f8fafc] text-slate-800 border border-slate-200">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="FACING A SIMILAR CHALLENGE?"
        heading="Let's engineer your enterprise outcome."
        subheading="Consult directly with our principal architects to review your systems and explore tailored delivery squad options."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore All Case Studies"
        secondaryCtaLink="/case-studies"
      />
    </div>
  );
}
