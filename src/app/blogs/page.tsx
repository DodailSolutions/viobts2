import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cmsStore } from "@/lib/data";

export const metadata: Metadata = {
  title: "Engineering Articles & Architecture Blogs | VIO",
  description: "Read in-depth technical blueprints on Lakehouse data governance, microservices, and AI automation.",
};

export default function BlogsPage() {
  const blogs = cmsStore.getBlogs();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          ARTICLES & INSIGHTS
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Architectural <span className="text-gradient-cyan">Blueprints</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Actionable technical guidance for engineering executives, cloud architects, and data strategists.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blogs/${b.slug}`}
              className="rounded-3xl bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 flex flex-col justify-between group transition-all"
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-blue shadow-sm border border-slate-100">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {b.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {b.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-3 leading-snug">
                    {b.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{b.authorName}</span>
                <span className="text-xs font-bold text-brand-blue flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
