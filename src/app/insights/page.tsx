"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Mic,
  Clock,
  Calendar,
  Search,
  ChevronRight,
  Play,
  Radio,
  Flame,
  Layers,
  Bot,
  Cloud,
  Database,
  BarChart3,
  Star,
  TrendingUp,
} from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

const CATEGORIES = [
  { id: "all", label: "All Topics", icon: Layers },
  { id: "Cloud", label: "Cloud & Infra", icon: Cloud },
  { id: "AI/ML", label: "AI & Machine Learning", icon: Bot },
  { id: "Data", label: "Data & Analytics", icon: Database },
  { id: "Architecture", label: "Architecture", icon: BarChart3 },
  { id: "Podcast", label: "Podcasts", icon: Mic },
];

export default function InsightsPage() {
  const blogs = cmsStore.getBlogs();
  const podcasts = cmsStore.getPodcasts();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Featured = first blog
  const featured = blogs[0];
  const rest = blogs.slice(1);

  // Filter logic
  const filteredBlogs = rest.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredPodcasts = activeCategory === "all" || activeCategory === "Podcast"
    ? podcasts.filter(
        (p) =>
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="relative bg-[#071739] overflow-hidden pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glows */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0c34cd]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5 backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-black text-white/90 uppercase tracking-[0.18em]">
                  VIO Thought Leadership
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
                Perspectives <span className="text-[#4d7cff]">&</span>
                <br />
                <span className="text-[#4d7cff]">Podcasts</span>
              </h1>
              <p className="text-base sm:text-lg text-white/65 max-w-xl leading-relaxed font-normal">
                Deep technical blueprints, enterprise architecture frameworks, and executive dialogues on AI, cloud, and data modernization.
              </p>
            </div>

            {/* Search bar */}
            <div className="lg:w-80">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search articles & podcasts…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:border-[#4d7cff] focus:bg-white/15 transition-all backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { label: "Articles Published", value: `${blogs.length}+` },
              { label: "Podcast Episodes", value: `${podcasts.length}` },
              { label: "Industry Topics", value: "6" },
              { label: "Avg. Read Time", value: "8 min" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-2xl font-black text-white">{s.value}</span>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER TABS ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? "bg-[#0c34cd] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* ─── FEATURED ARTICLE ───────────────────────────────────── */}
        {featured && (activeCategory === "all" || featured.category === activeCategory) && !searchQuery && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-[#0c34cd]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0c34cd]">
                Featured Article
              </span>
            </div>

            <Link
              href={`/blogs/${featured.slug}`}
              className="group block rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="relative lg:w-[55%] h-64 sm:h-80 lg:h-auto min-h-[320px] overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={featured.featuredImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full text-xs font-black bg-[#0c34cd] text-white shadow-md">
                      {featured.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-[45%]">
                  <div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.publishedAt}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readingTime}
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-black text-[#071739] group-hover:text-[#0c34cd] transition-colors leading-tight mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 font-normal">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0c34cd]/10 flex items-center justify-center text-[#0c34cd] text-xs font-black">
                        {featured.authorName.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{featured.authorName}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-black text-[#0c34cd] group-hover:translate-x-1 transition-transform">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ─── LATEST ARTICLES GRID ─────────────────────────────── */}
        {filteredBlogs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#0c34cd]" />
                <h2 className="text-2xl font-black text-[#071739] tracking-tight">
                  {activeCategory === "all" ? "Latest Articles" : `${CATEGORIES.find(c => c.id === activeCategory)?.label} Articles`}
                </h2>
              </div>
              <Link
                href="/blogs"
                className="text-xs font-black text-[#0c34cd] hover:text-[#0a2cb0] flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((b, i) => (
                <Link
                  key={b.id}
                  href={`/blogs/${b.slug}`}
                  className={`group rounded-3xl bg-white overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 flex flex-col transition-all duration-300 ${
                    i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={b.featuredImage}
                      alt={b.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-white/95 text-[#0c34cd] shadow-sm">
                        {b.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 h-3" /> {b.publishedAt}
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3" /> {b.readingTime}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#071739] group-hover:text-[#0c34cd] transition-colors leading-snug mb-2 flex-1">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-normal mb-4">
                      {b.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                      <span className="text-[11px] font-bold text-slate-400">{b.authorName}</span>
                      <span className="flex items-center gap-1 text-[11px] font-black text-[#0c34cd] group-hover:translate-x-0.5 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── TRENDING TOPICS BANNER ───────────────────────────── */}
        {activeCategory === "all" && !searchQuery && (
          <section className="rounded-3xl bg-gradient-to-br from-[#0c34cd] to-[#1a4fff] p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-200" />
                <span className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">
                  Trending at VIO
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                Enterprise AI &amp; Lakehouse<br />Architecture in 2025
              </h3>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-6">
                Explore how leading enterprises are consolidating their data and AI stacks with open-format lakehouse patterns, real-time pipelines, and federated ML governance.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Delta Lake", "Apache Iceberg", "Databricks", "MLflow", "Kubernetes", "FinOps"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-black bg-white/15 border border-white/25 hover:bg-white/25 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── PODCAST SECTION ─────────────────────────────────── */}
        {filteredPodcasts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Radio className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#071739] tracking-tight leading-none">
                    Voices of AI Leadership
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Hosted by VIO CEO Malathi Vakkalanka
                  </p>
                </div>
              </div>
              <Link
                href="/podcast"
                className="text-xs font-black text-[#0c34cd] hover:text-[#0a2cb0] flex items-center gap-1"
              >
                All Episodes <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {filteredPodcasts.slice(0, 4).map((p, idx) => (
                <Link
                  key={p.id}
                  href="/podcast"
                  className="group flex items-center gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all duration-300"
                >
                  {/* Episode number */}
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                    <span className="text-sm font-black text-violet-600">E{idx + 1}</span>
                  </div>

                  {/* Play button */}
                  <div className="w-10 h-10 rounded-full bg-[#0c34cd] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0a2cb0] transition-all shadow-md shadow-blue-700/20">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-[#0c34cd] uppercase tracking-wider block mb-0.5">
                      Hosted by Malathi Vakkalanka
                    </span>
                    <h3 className="text-sm font-black text-[#071739] group-hover:text-[#0c34cd] transition-colors line-clamp-1 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                      Guest: {p.guestName} · {p.guestCompany}
                    </p>
                  </div>

                  {/* Duration + arrow */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.duration}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0c34cd] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── NEWSLETTER STRIP ────────────────────────────────── */}
        {activeCategory === "all" && !searchQuery && (
          <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left – branding */}
              <div className="lg:w-1/2 p-8 sm:p-10 bg-[#071739] text-white relative overflow-hidden">
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#0c34cd]/30 rounded-full blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 leading-tight">
                    Stay at the Forefront
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-normal">
                    Monthly architecture briefings on cloud-native trends, AI governance, and enterprise data compliance — direct from our engineering team.
                  </p>
                </div>
              </div>
              {/* Right – CTA */}
              <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                <h4 className="text-base font-black text-[#071739] mb-1">Subscribe to VIO Insights</h4>
                <p className="text-xs text-slate-500 mb-5">No spam. Unsubscribe anytime.</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0c34cd] transition-all"
                  />
                  <button className="px-5 py-3 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white text-xs font-black transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-3">
                  Join 2,400+ enterprise architects and technology leaders.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {filteredBlogs.length === 0 && filteredPodcasts.length === 0 && (
          <div className="py-20 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-black text-slate-600 mb-2">No results found</h3>
            <p className="text-sm text-slate-400">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#0c34cd] text-white text-xs font-black hover:bg-[#0a2cb0] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
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
