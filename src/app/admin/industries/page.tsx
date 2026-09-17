"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Building2, ExternalLink } from "lucide-react";
import { cmsStore, IndustryItem } from "@/lib/data";

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<IndustryItem[]>(cmsStore.getIndustries());
  const [editingInd, setEditingInd] = useState<IndustryItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInd) return;
    cmsStore.saveIndustry(editingInd);
    setIndustries(cmsStore.getIndustries());
    setEditingInd(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Sectors & Domains
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Industry Solutions Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage sector challenges, transformation trends, and VIO capabilities.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {industries.map((ind) => (
          <div
            key={ind.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-brand-blue border border-blue-100 mt-1">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    #0{ind.orderIndex}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{ind.title}</h2>
                  <span className="text-xs text-brand-blue font-semibold">({ind.eyebrow})</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2">
                  {ind.description}
                </p>
                <p className="text-[11px] text-slate-500">
                  {ind.keyChallenges.length} challenges mapped • {ind.capabilities.length} custom capabilities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/industries/${ind.slug}`}
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm"
                title="View live page"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingInd(ind)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-brand-blue hover:text-white transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Industry</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingInd && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl text-slate-900">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Industry: {editingInd.title}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingInd.title}
                  onChange={(e) => setEditingInd({ ...editingInd, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Eyebrow Tag</label>
                <input
                  type="text"
                  value={editingInd.eyebrow}
                  onChange={(e) => setEditingInd({ ...editingInd, eyebrow: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingInd.description}
                  onChange={(e) => setEditingInd({ ...editingInd, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingInd(null)}
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
