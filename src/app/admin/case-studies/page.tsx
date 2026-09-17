"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Briefcase, ExternalLink } from "lucide-react";
import { cmsStore, CaseStudyItem } from "@/lib/data";

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(cmsStore.getCaseStudies());
  const [editingCS, setEditingCS] = useState<CaseStudyItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCS) return;
    cmsStore.saveCaseStudy(editingCS);
    setCaseStudies(cmsStore.getCaseStudies());
    setEditingCS(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Proof & Case Histories
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Enterprise Case Studies Manager
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage real case histories for ODGA, USAID, DriveWealth, Advance Auto Parts, and Wells Fargo.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-blue/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-brand-blue mt-1">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-brand-blue uppercase">
                    {cs.client}
                  </span>
                  <span className="text-xs text-slate-500">• {cs.industry}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{cs.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2 line-clamp-2">
                  {cs.challenge}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span>{cs.metrics.map(m => `${m.label}: ${m.value}`).join(" | ")}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/case-studies/${cs.slug}`}
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                title="View live page"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingCS(cs)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-blue-100 transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Case Study</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCS && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Case Study: {editingCS.client}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingCS.title}
                    onChange={(e) => setEditingCS({ ...editingCS, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingCS.client}
                    onChange={(e) => setEditingCS({ ...editingCS, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Challenge Summary</label>
                <textarea
                  rows={2}
                  value={editingCS.challenge}
                  onChange={(e) => setEditingCS({ ...editingCS, challenge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Solution Summary</label>
                <textarea
                  rows={2}
                  value={editingCS.solution}
                  onChange={(e) => setEditingCS({ ...editingCS, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingCS(null)}
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
