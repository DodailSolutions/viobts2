import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Calendar, Clock, User, Share2 } from "lucide-react";
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
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = cmsStore.getBlogBySlug(params.slug);
  if (!blog) notFound();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blogs" className="hover:text-brand-blue transition-colors">Articles</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-brand-blue">{blog.category}</span>
        </div>

        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-100 mb-4 inline-block">
          {blog.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y border-slate-200 mb-8 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold">
              {blog.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">{blog.authorName}</p>
              <p className="text-[11px] text-slate-500">{blog.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
        <div className="relative h-[340px] sm:h-[450px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md mb-12">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
          <p className="text-xl font-medium text-slate-800 italic border-l-4 border-brand-blue pl-4 py-1 mb-8 bg-blue-50/40 rounded-r-xl">
            {blog.excerpt}
          </p>
          <div className="leading-relaxed space-y-4">
            {blog.content.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
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
        eyebrow="APPLY THESE PRINCIPLES"
        heading="Accelerate your enterprise roadmap with VIO."
        subheading="Book a complimentary consultation with our principal architects."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
