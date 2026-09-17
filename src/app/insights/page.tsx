import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Mic, Clock, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Insights, Articles & Voices of AI Leadership | VIO",
  description: "Enterprise thought leadership on cloud architecture, Lakehouse data governance, and AI automation. Richmond, VA.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Podcasts | VIO Technology Accelerator",
    description: "Deep technical blueprints and executive discussions on modernizing enterprise software ecosystems.",
    url: "https://viobts.com/insights",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Podcasts | VIO",
    description: "Enterprise architecture and AI leadership perspectives.",
    images: ["/images/vio-logo.png"],
  },
};

export default function InsightsPage() {
  const blogs = cmsStore.getBlogs();
  const podcasts = cmsStore.getPodcasts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "VIO Insights & Podcasts",
    "description": "Enterprise engineering blueprints and leadership podcasts.",
    "url": "https://viobts.com/insights"
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
            THOUGHT LEADERSHIP & EXECUTIVE DIALOGUE
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          VIO <span className="text-[#0066cc]">Perspectives & Podcasts</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Deep technical blueprints, architectural frameworks, and executive discussions on modernizing enterprise software ecosystems and operationalizing AI.
        </p>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#0066cc]" />
            <h2 className="text-2xl font-black text-[#071739] tracking-tight">Latest Technical Articles</h2>
          </div>
          <Link href="/blogs" className="text-xs font-bold text-[#0066cc] hover:text-[#0052a3] flex items-center gap-1">
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blogs/${b.slug}`}
              className="rounded-3xl bg-white overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={b.featuredImage}
                    alt={b.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#0066cc] shadow-xs">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {b.publishedAt}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {b.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#071739] group-hover:text-[#0066cc] transition-colors mb-3 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{b.authorName}</span>
                <span className="text-xs font-bold text-[#0066cc] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Podcasts Section */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-[#0066cc]" />
            <div>
              <h2 className="text-2xl font-black text-[#071739] tracking-tight">Voices of AI Leadership</h2>
              <p className="text-xs text-slate-500 font-medium">Hosted by VIO CEO Malathi Vakkalanka</p>
            </div>
          </div>
          <Link href="/podcast" className="text-xs font-bold text-[#0066cc] hover:text-[#0052a3] flex items-center gap-1">
            <span>Explore All Episodes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {podcasts.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider block">
                    Hosted by Malathi Vakkalanka
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{p.duration}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#071739] mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                {p.description}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#071739]">{p.guestName}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{p.guestCompany}</p>
                </div>
                <Link
                  href="/podcast"
                  className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1"
                >
                  <span>Listen Now</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="STAY AT THE FOREFRONT"
        heading="Subscribe to VIO executive perspectives."
        subheading="Join our monthly architecture briefing on cloud native trends, regulatory data compliance, and enterprise AI."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Capabilities"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
