import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Engineering Articles & Architecture Blueprints | VIO",
  description: "Read in-depth technical blueprints on Lakehouse data governance, event-driven microservices, and AI compliance in regulated industries.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Technical Articles & Architecture Blueprints | VIO",
    description: "Actionable engineering frameworks for enterprise architects and engineering leaders.",
    url: "https://viobts.com/blogs",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Technical Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Blueprints | VIO",
    description: "Engineering frameworks for enterprise leaders.",
    images: ["/images/vio-logo.png"],
  },
};

export default function BlogsPage() {
  const blogs = cmsStore.getBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "VIO Engineering Blog",
    "description": "Technical insights on enterprise architecture, cloud enablement, and data engineering.",
    "url": "https://viobts.com/blogs",
    "blogPost": blogs.map((b) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "description": b.excerpt,
      "datePublished": b.publishedAt,
      "image": b.featuredImage,
      "url": `https://viobts.com/blogs/${b.slug}`,
      "author": {
        "@type": "Person",
        "name": b.authorName
      }
    }))
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
            TECHNICAL ARTICLES & BLUEPRINTS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Architectural <span className="text-[#0066cc]">Blueprints</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Actionable technical guidance for engineering executives, cloud architects, and data strategists solving complex enterprise scale.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

                  <h2 className="text-xl font-bold text-[#071739] group-hover:text-[#0066cc] transition-colors mb-3 leading-snug">
                    {b.title}
                  </h2>
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
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="ENGINEERED VELOCITY"
        heading="Discuss your architecture with VIO."
        subheading="Schedule a technical consultation with our principal architects to review your systems."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Who We Are"
        secondaryCtaLink="/who-we-are"
      />
    </div>
  );
}
