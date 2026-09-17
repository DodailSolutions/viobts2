import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Users, 
  Database, 
  GitBranch, 
  Cloud,
  TrendingUp,
  Calendar,
  Layers
} from "lucide-react";
import { cmsStore } from "@/lib/data";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { TechnologyWorkforcePageContent } from "@/components/sections/TechnologyWorkforcePageContent";
import { BigDataAnalyticsPageContent } from "@/components/sections/BigDataAnalyticsPageContent";
import { OpenSourceIntegrationPageContent } from "@/components/sections/OpenSourceIntegrationPageContent";

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const srv = cmsStore.getServiceBySlug(params.slug);
  if (!srv) return { title: "Service Not Found | VIO" };

  return {
    title: `${srv.title} | Enterprise Technology Blueprint | VIO`,
    description: srv.description,
    alternates: {
      canonical: `/services/${srv.slug}`,
    },
    openGraph: {
      title: `${srv.title} | VIO Technology Accelerator`,
      description: srv.description,
      url: `https://viobts.com/services/${srv.slug}`,
      type: "website",
      images: [
        {
          url: "/images/vio-logo.png",
          width: 1200,
          height: 630,
          alt: srv.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${srv.title} | VIO`,
      description: srv.description,
      images: ["/images/vio-logo.png"],
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

  // JSON-LD Structured Data: Service + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://viobts.com/services/${srv.slug}#service`,
        "name": srv.title,
        "description": srv.description,
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Enterprise Technology Consulting",
        "areaServed": "United States"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://viobts.com/services/${srv.slug}#breadcrumb`,
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
            "name": "Services",
            "item": "https://viobts.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": srv.title,
            "item": `https://viobts.com/services/${srv.slug}`
          }
        ]
      },
      ...(srv.faqs && srv.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `https://viobts.com/services/${srv.slug}#faq`,
        "mainEntity": srv.faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }] : [])
    ]
  };

  if (srv.slug === "technology-workforce") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TechnologyWorkforcePageContent />
      </>
    );
  }

  if (srv.slug === "big-data-analytics") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BigDataAnalyticsPageContent />
      </>
    );
  }

  if (srv.slug === "open-source-integration") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <OpenSourceIntegrationPageContent />
      </>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Service Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-[#0066cc] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066cc] font-bold">{srv.title}</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <Icon className="w-4 h-4 text-[#0066cc]" />
          <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest">
            {srv.eyebrow} • Pillar 0{srv.orderIndex}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          {srv.title}
        </h1>

        <p className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-10">
          {srv.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Consult on {srv.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>View All 6 Pillars</span>
          </Link>
        </div>
      </section>

      {/* Strategic Architecture Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#071739] tracking-tight mb-4">
                Architectural Overview & Value Creation
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {srv.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#0066cc] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                <span>Key Capabilities Delivered</span>
              </h3>
              <div className="space-y-3">
                {srv.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Business Outcome */}
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/70 flex items-start gap-3.5">
              <TrendingUp className="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0066cc] uppercase tracking-wider mb-1">
                  Target Business Outcome:
                </p>
                <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                  {srv.businessOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tech Stack */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-4">
                Supported Technologies & Toolchains
              </h3>
              <div className="flex flex-wrap gap-2">
                {srv.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#f8fafc] text-slate-800 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* VA-SWaM Certified Badge */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200/80">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-xs font-bold text-[#0066cc] uppercase tracking-wider">
                  VA-SWaM Certified Delivery
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Headquartered in Richmond, Virginia. All VIO engagements are led by seasoned principal architects adhering to strict governance and security compliance standards.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-[#0066cc] font-bold">
                <Sparkles className="w-4 h-4" />
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
        subheading="Book a complimentary consultation with our principal architects to review your technical roadmap and delivery options."
        primaryCtaText="Schedule Consultation"
        primaryCtaLink="/contact"
        secondaryCtaText="View Case Studies"
        secondaryCtaLink="/case-studies"
      />
    </div>
  );
}
