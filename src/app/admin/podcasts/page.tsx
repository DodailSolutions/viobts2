"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Mic, ExternalLink, Calendar, Clock, Image as ImageIcon, Upload, Trash2, CheckCircle2 } from "lucide-react";
import { cmsStore, PodcastItem } from "@/lib/data";

const THUMBNAIL_PRESETS = [
  {
    name: "Studio Mic",
    url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tech Leader",
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Conference Stage",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cloud & AI Server",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>(() => cmsStore.getPodcasts());
  const [editingPodcast, setEditingPodcast] = useState<PodcastItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPodcast) return;
    cmsStore.savePodcast(editingPodcast);
    setPodcasts(cmsStore.getPodcasts());
    setEditingPodcast(null);
    showNotification("Podcast episode saved successfully and updated live!");
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete episode "${title}"?`)) {
      cmsStore.deletePodcast(id);
      setPodcasts(cmsStore.getPodcasts());
      if (editingPodcast?.id === id) setEditingPodcast(null);
      showNotification("Episode deleted successfully.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Voices of AI Leadership
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Podcasts &amp; Executive Interviews
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage podcast episodes, guest profiles, streaming links, durations, and episode thumbnail images.
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
              thumbnailUrl: THUMBNAIL_PRESETS[0].url,
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
              {/* Thumbnail Preview */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 relative group">
                {p.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-blue-50 text-[#0c34cd]">
                    <Mic className="w-6 h-6" />
                  </div>
                )}
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

            <div className="flex items-center gap-2.5 shrink-0">
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
              <button
                onClick={() => handleDelete(p.id, p.title)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Episode"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPodcast && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingPodcast.id.startsWith("pod-" + Date.now().toString().slice(0, 5)) ? "Add New Episode" : `Edit Episode: ${editingPodcast.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPodcast(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

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

              {/* Thumbnail Image Section */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Episode Thumbnail Image
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Thumbnail Live Preview */}
                  <div className="w-32 h-24 rounded-xl overflow-hidden bg-slate-200/70 border border-slate-300/80 shrink-0 flex items-center justify-center relative shadow-xs">
                    {editingPodcast.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={editingPodcast.thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 text-[10px]">
                        <ImageIcon className="w-6 h-6 mb-1 text-slate-400" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2.5">
                    <div>
                      <span className="block text-[11px] text-slate-500 mb-1 font-medium">Image URL:</span>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/... or paste image URL"
                        value={editingPodcast.thumbnailUrl || ""}
                        onChange={(e) => setEditingPodcast({ ...editingPodcast, thumbnailUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {/* Local File Upload Button */}
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (uploadEvt) => {
                                if (uploadEvt.target?.result) {
                                  setEditingPodcast({
                                    ...editingPodcast,
                                    thumbnailUrl: uploadEvt.target.result as string,
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>

                      {/* Presets */}
                      <span className="text-[11px] text-slate-400 font-medium">Presets:</span>
                      {THUMBNAIL_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setEditingPodcast({ ...editingPodcast, thumbnailUrl: preset.url })}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0c34cd] text-[10px] font-semibold border border-blue-200/80 transition-colors"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handleDelete(editingPodcast.id, editingPodcast.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Episode</span>
                </button>

                <div className="flex items-center gap-3">
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
