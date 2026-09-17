import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Calendar, Clock, User, Share2, ShieldCheck, Sparkles } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = cmsStore.getBlogBySlug(params.slug);
  if (!blog) return { title: "Article Not Found | VIO" };

  return {
    title: `${blog.title} | VIO Perspectives`,
    description: blog.excerpt,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} | VIO`,
      description: blog.excerpt,
      url: `https://viobts.com/blogs/${blog.slug}`,
      type: "article",
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = cmsStore.getBlogBySlug(params.slug);
  if (!blog) notFound();

  // JSON-LD Structured Data: Article + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://viobts.com/blogs/${blog.slug}#article`,
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.featuredImage,
        "datePublished": blog.publishedAt,
        "author": {
          "@type": "Person",
          "name": blog.authorName,
          "jobTitle": blog.authorRole
        },
        "publisher": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com",
          "logo": "https://viobts.com/images/vio-logo.png"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://viobts.com/blogs/${blog.slug}#breadcrumb`,
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
            "name": "Articles",
            "item": "https://viobts.com/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `https://viobts.com/blogs/${blog.slug}`
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

      {/* Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blogs" className="hover:text-[#0066cc] transition-colors">Articles</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066cc] font-bold">{blog.category}</span>
        </nav>

        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-100 mb-4 inline-block">
          {blog.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-[#071739] tracking-tight leading-[1.15] mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y border-slate-200 mb-8 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0066cc] font-bold">
              {blog.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#071739] text-xs">{blog.authorName}</p>
              <p className="text-[11px] text-slate-500">{blog.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {blog.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {blog.readingTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[320px] sm:h-[450px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md mb-12">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6 font-normal">
          <p className="text-xl font-medium text-[#071739] italic border-l-4 border-[#0066cc] pl-5 py-2 mb-8 bg-blue-50/50 rounded-r-2xl">
            {blog.excerpt}
          </p>
          <div className="leading-relaxed space-y-5">
            {blog.content.split("\n\n").map((para, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed font-normal">{para}</p>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            Related Topics:
          </span>
          {blog.tags.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              #{t}
            </span>
          ))}
        </div>
      </article>

      {/* CTA */}
      <CTABanner
        eyebrow="APPLY THESE ARCHITECTURAL PRINCIPLES"
        heading="Accelerate your digital roadmap with VIO."
        subheading="Schedule a technical consultation with our principal engineering team."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Capabilities"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
