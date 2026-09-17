"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight, Layers, Building2, BookOpen, Briefcase } from "lucide-react";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES, INITIAL_CASE_STUDIES, INITIAL_BLOGS, INITIAL_CAREERS } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const matches: { title: string; type: string; url: string; description: string }[] = [];

    // Search Services
    INITIAL_SERVICES.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.capabilities.some(c => c.toLowerCase().includes(q))) {
        matches.push({
          title: s.title,
          type: "Service Pillar",
          url: `/services/${s.slug}`,
          description: s.description,
        });
      }
    });

    // Search Industries
    INITIAL_INDUSTRIES.forEach((i) => {
      if (i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) {
        matches.push({
          title: i.title,
          type: "Industry Sector",
          url: `/industries/${i.slug}`,
          description: i.description,
        });
      }
    });

    // Search Case Studies
    INITIAL_CASE_STUDIES.forEach((cs) => {
      if (cs.title.toLowerCase().includes(q) || cs.client.toLowerCase().includes(q) || cs.challenge.toLowerCase().includes(q)) {
        matches.push({
          title: `${cs.title} (${cs.client})`,
          type: "Case Proof",
          url: `/case-studies/${cs.slug}`,
          description: cs.challenge,
        });
      }
    });

    // Search Blogs
    INITIAL_BLOGS.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.content.toLowerCase().includes(q)) {
        matches.push({
          title: b.title,
          type: "Article / Insight",
          url: `/blogs/${b.slug}`,
          description: b.excerpt,
        });
      }
    });

    // Search Careers
    INITIAL_CAREERS.forEach((c) => {
      if (c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        matches.push({
          title: c.title,
          type: "Career Opportunity",
          url: `/careers`,
          description: c.description,
        });
      }
    });

    return matches;
  }, [query]);

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          GLOBAL REPOSITORY SEARCH
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
          Search the <span className="text-gradient-cyan">VIO Platform</span>
        </h1>

        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, industries, case studies, technologies..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white shadow-sm"
            autoFocus
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {query.trim() === "" ? (
          <div className="text-center py-12 text-slate-500 text-xs uppercase tracking-widest">
            Type a search term above to scan across all VIO enterprise assets
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No exact matches found for "{query}". Try searching for "cloud", "data", "banking", or "workforce".
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Found {results.length} results:
            </p>
            {results.map((res, idx) => (
              <Link
                key={idx}
                href={res.url}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 hover:shadow-md transition-all block"
              >
                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1 block">
                    {res.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-1">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
