"use client";

import React, { useState, useEffect } from "react";
import { cmsStore, PodcastItem } from "@/lib/data";
import { Mic, Play, Calendar, Clock, ExternalLink } from "lucide-react";

interface PodcastFeedClientProps {
  initialPodcasts: PodcastItem[];
}

export function PodcastFeedClient({ initialPodcasts }: PodcastFeedClientProps) {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>(initialPodcasts);

  useEffect(() => {
    try {
      cmsStore.hydrateFromStorage();
      const live = cmsStore.getPodcasts();
      if (live && live.length > 0) {
        setPodcasts(live);
      }
    } catch {
      // Keep initial
    }

    const handleUpdate = () => {
      cmsStore.hydrateFromStorage();
      const updated = cmsStore.getPodcasts();
      if (updated && updated.length > 0) {
        setPodcasts([...updated]);
      }
    };

    window.addEventListener("cms-storage-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("cms-storage-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {podcasts.map((p) => (
        <div
          key={p.id}
          className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0c34cd] flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider block">
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
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0c34cd] font-black text-sm">
                {p.guestName ? p.guestName.charAt(0) : "V"}
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
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-bold text-xs transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play Episode</span>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
