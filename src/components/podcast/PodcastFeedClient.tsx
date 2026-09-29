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
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-start"
        >
          {/* Thumbnail Cover */}
          <div className="w-full md:w-64 lg:w-72 h-48 md:h-56 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 relative group shadow-xs">
            {p.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.thumbnailUrl}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50">
                <Mic className="w-10 h-10 mb-2" />
                <span className="text-[11px] font-bold text-slate-500">VOICES OF AI</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                {p.duration}
              </span>
              <a
                href={p.youtubeUrl || p.spotifyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0c34cd] hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 pointer-events-auto"
                title="Play Episode"
              >
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </a>
            </div>
          </div>

          {/* Episode Info */}
          <div className="flex-1 flex flex-col justify-between w-full h-full space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider">
                    Hosted by {p.hostName || "Malathi Vakkalanka"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {p.publishedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {p.youtubeUrl && (
                    <a
                      href={p.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {p.spotifyUrl && (
                    <a
                      href={p.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                    >
                      <span>Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#071739] tracking-tight mb-2.5 hover:text-[#0c34cd] transition-colors">
                {p.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#0c34cd] font-black text-xs shrink-0">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-bold text-xs transition-all shadow-xs shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Episode</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
