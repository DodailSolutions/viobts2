"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Mic, ExternalLink, Calendar, Clock, Play } from "lucide-react";
import { cmsStore, PodcastItem } from "@/lib/data";

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>(cmsStore.getPodcasts());
  const [editingPodcast, setEditingPodcast] = useState<PodcastItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPodcast) return;
    cmsStore.savePodcast(editingPodcast);
    setPodcasts(cmsStore.getPodcasts());
    setEditingPodcast(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Voices of AI Leadership
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Podcasts &amp; Executive Interviews
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage podcast episodes hosted by CEO Malathi Vakkalanka, guest profiles, streaming links, and durations.
          </p>
        </div>

        <button
          onClick={() => {
            const newP: PodcastItem = {
              id: "pod-" + Date.now(),
              title: "New Episode: Scaling Modern Intelligent Systems",
              description: "Executive dialogue on cloud modernization, agentic AI, and enterprise data compliance.",
              guestName: "Guest Name",
              guestCompany: "Enterprise Leader",
              hostName: "Malathi Vakkalanka",
              duration: "35 min",
              youtubeUrl: "https://www.youtube.com/@viobts",
              spotifyUrl: "https://open.spotify.com",
              publishedAt: new Date().toISOString().slice(0, 10),
            };
            setEditingPodcast(newP);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Episode</span>
        </button>
      </div>

      <div className="space-y-4">
        {podcasts.map((p, idx) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-blue/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-violet-50 text-violet-600 mt-1">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                    Episode {idx + 1}
                  </span>
                  <span className="text-xs text-slate-500">• {p.publishedAt}</span>
                  <span className="text-xs text-slate-500">• {p.duration}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{p.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span>Guest: <strong>{p.guestName}</strong> ({p.guestCompany})</span>
                  <span>Host: {p.hostName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/podcast"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                title="View live podcast feed"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingPodcast(p)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-blue-100 transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Episode</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPodcast && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Episode: {editingPodcast.title}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Episode Title</label>
                <input
                  type="text"
                  required
                  value={editingPodcast.title}
                  onChange={(e) => setEditingPodcast({ ...editingPodcast, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={editingPodcast.guestName}
                    onChange={(e) => setEditingPodcast({ ...editingPodcast, guestName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guest Company / Role</label>
                  <input
                    type="text"
                    value={editingPodcast.guestCompany}
                    onChange={(e) => setEditingPodcast({ ...editingPodcast, guestCompany: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (e.g. 42 min)</label>
                  <input
                    type="text"
                    value={editingPodcast.duration}
                    onChange={(e) => setEditingPodcast({ ...editingPodcast, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={editingPodcast.publishedAt}
                    onChange={(e) => setEditingPodcast({ ...editingPodcast, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube URL</label>
                <input
                  type="text"
                  value={editingPodcast.youtubeUrl || ""}
                  onChange={(e) => setEditingPodcast({ ...editingPodcast, youtubeUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Spotify URL</label>
                <input
                  type="text"
                  value={editingPodcast.spotifyUrl || ""}
                  onChange={(e) => setEditingPodcast({ ...editingPodcast, spotifyUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Episode Description</label>
                <textarea
                  rows={3}
                  value={editingPodcast.description}
                  onChange={(e) => setEditingPodcast({ ...editingPodcast, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingPodcast(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
