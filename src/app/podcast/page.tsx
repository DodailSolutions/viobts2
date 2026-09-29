import React from "react";
import { Metadata } from "next";
import { Mic, Play, Radio, Calendar, Clock, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { cmsStore } from "@/lib/data";
import { CTABanner } from "@/components/sections/CTABanner";
import { PodcastFeedClient } from "@/components/podcast/PodcastFeedClient";

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
          <Radio className="w-4 h-4 text-[#0c34cd] animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0c34cd] uppercase">
            EXECUTIVE AUDIO & VIDEO PERSPECTIVES
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Voices of <span className="text-[#0c34cd]">AI Leadership</span>
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
      <PodcastFeedClient initialPodcasts={podcasts} />

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
