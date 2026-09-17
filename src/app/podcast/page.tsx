import React from "react";
import { Metadata } from "next";
import { Mic, Play, Radio, Calendar, Clock, ExternalLink } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "VIO Tech Podcasts | Architecture & Cloud Discussions",
  description: "Listen to deep-dive conversations on enterprise cloud velocity, distributed pods, and modern data meshes.",
};

export default function PodcastPage() {
  const podcasts = cmsStore.getPodcasts();

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-brand-blue border border-blue-200/80 mb-6">
          <Radio className="w-4 h-4 text-brand-blue animate-pulse" />
          <span>VIO Audio & Video Series</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          VIO Tech <span className="text-gradient-cyan">Podcasts</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Conversations with technology executives, distributed engineering leads, and cloud architects on scaling systems under pressure.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {podcasts.map((p) => (
          <div
            key={p.id}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-brand-blue border border-blue-100">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                    {p.hostName}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {p.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {p.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {p.spotifyUrl && (
                  <a
                    href={p.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {p.youtubeUrl && (
                  <a
                    href={p.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">{p.description}</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold">
                  {p.guestName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{p.guestName}</p>
                  <p className="text-[11px] text-slate-500">{p.guestCompany}</p>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Audio</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      <CTABanner
        eyebrow="BE A GUEST"
        heading="Have an architectural breakthrough to share?"
        subheading="Join the VIO Tech Perspectives podcast as an executive guest."
        primaryCtaText="Contact Podcast Team"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
