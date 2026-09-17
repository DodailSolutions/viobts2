import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Mic, Clock, Calendar } from "lucide-react";
import { cmsStore } from "@/lib/data"; import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights, Perspectives & Podcasts | VIO",
  description: "Enterprise thought leadership on cloud architecture, Lakehouse data governance, and AI automation.",
};

export default function InsightsPage() {
  const blogs = cmsStore.getBlogs();
  const podcasts = cmsStore.getPodcasts();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          THOUGHT LEADERSHIP
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          VIO <span className="text-gradient-cyan">Perspectives & Podcasts</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Deep technical analyses, architecture blueprints, and executive discussions on modernizing enterprise software ecosystems.
        </p>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-brand-blue" />
            <h2 className="text-2xl font-bold text-slate-900">Latest Technical Articles</h2>
          </div>
          <Link href="/blogs" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {blogs.map((b) => (
            <Link
              key={b.id}
              href={`/blogs/${b.slug}`}
              className="rounded-3xl bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
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

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-3 leading-snug">
                    {b.title}
                  </h3>
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

        {/* Podcasts Section */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-brand-blue" />
            <h2 className="text-2xl font-bold text-slate-900">VIO Tech Podcasts</h2>
          </div>
          <Link href="/podcast" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
            <span>All Episodes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {podcasts.map((p) => (
            <div
              key={p.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-blue tracking-wider uppercase">
                    Episode • {p.duration}
                  </span>
                  <span className="text-xs text-slate-500">{p.publishedAt}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold">
                    {p.guestName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{p.guestName}</p>
                    <p className="text-[11px] text-slate-500">{p.guestCompany}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/podcast"
                  className="px-4 py-2 rounded-lg bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Listen to Episode
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
