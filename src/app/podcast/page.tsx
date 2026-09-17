import React from "react";
import { Metadata } from "next";
import { Mic, Play, Radio, Calendar, Clock, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Voices of AI Leadership Podcast | Hosted by Malathi Vakkalanka | VIO",
  description: "Tune into Voices of AI Leadership hosted by VIO CEO Malathi Vakkalanka. Conversations with builders, founders, and architects on scaling modern intelligent systems.",
  alternates: {
    canonical: "/podcast",
  },
  openGraph: {
    title: "Voices of AI Leadership Podcast | VIO",
    description: "Deep-dive conversations on AI adoption, agentic systems, and cloud architecture hosted by Malathi Vakkalanka.",
    url: "https://viobts.com/podcast",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "Voices of AI Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voices of AI Leadership | VIO",
    description: "Hosted by VIO CEO Malathi Vakkalanka.",
    images: ["/images/vio-logo.png"],
  },
};

export default function PodcastPage() {
  const podcasts = cmsStore.getPodcasts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "Voices of AI Leadership",
    "description": "Conversations on enterprise AI adoption, agentic workflows, and cloud engineering velocity.",
    "url": "https://viobts.com/podcast",
    "author": {
      "@type": "Person",
      "name": "Malathi Vakkalanka",
      "jobTitle": "CEO, VIO"
    }
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
          <Radio className="w-4 h-4 text-[#0066cc] animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0066cc] uppercase">
            EXECUTIVE AUDIO & VIDEO PERSPECTIVES
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Voices of <span className="text-[#0066cc]">AI Leadership</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-6">
          Hosted by VIO Founder & CEO <strong>Malathi Vakkalanka</strong>. Direct, unscripted conversations with technology executives, founders, and principal architects navigating AI, cloud transformation, and scalable product engineering.
        </p>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-slate-900">Host: Malathi Vakkalanka</span>
          <span className="text-slate-300">•</span>
          <span>Richmond, VA Studio</span>
        </div>
      </section>

      {/* Episode Feed */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {podcasts.map((p) => (
          <div
            key={p.id}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider block">
                    Hosted by Malathi Vakkalanka
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {p.publishedAt}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {p.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {p.youtubeUrl && (
                  <a
                    href={p.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {p.spotifyUrl && (
                  <a
                    href={p.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                  >
                    <span>Listen on Spotify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071739] tracking-tight mb-3">
              {p.title}
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              {p.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0066cc] font-black text-sm">
                  {p.guestName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#071739]">{p.guestName}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{p.guestCompany}</p>
                </div>
              </div>

              <a
                href={p.youtubeUrl || p.spotifyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Episode</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="BE A GUEST ON VOICES OF AI LEADERSHIP"
        heading="Are you an enterprise founder or technology leader?"
        subheading="Join Malathi Vakkalanka on the show to share your lessons in scaling data systems, cloud architectures, and AI products."
        primaryCtaText="Pitch an Episode"
        primaryCtaLink="/contact"
        secondaryCtaText="Who We Are"
        secondaryCtaLink="/who-we-are"
      />
    </div>
  );
}
