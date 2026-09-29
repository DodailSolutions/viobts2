"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Users2, ExternalLink, MapPin, Briefcase, Trash2 } from "lucide-react";
import { cmsStore, CareerItem } from "@/lib/data";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<CareerItem[]>(cmsStore.getCareers());
  const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;
    cmsStore.saveCareer(editingCareer);
    setCareers(cmsStore.getCareers());
    setEditingCareer(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Engineering Talent & Culture
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Careers & Open Roles Manager
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage open positions, departments, experience levels, and application requirements.
          </p>
        </div>

        <button
          onClick={() => {
            const newC: CareerItem = {
              id: "car-" + Date.now(),
              title: "Senior Cloud / Data Engineer",
              department: "Cloud Architecture",
              location: "Richmond, VA (Hybrid / Remote)",
              employmentType: "Full-Time",
              experienceLevel: "Senior",
              description: "Lead enterprise cloud and data lakehouse engineering initiatives.",
              requirements: ["5+ years cloud architecture", "Hands-on Terraform / Kubernetes", "Python / Go"],
              responsibilities: ["Architect scalable pipelines", "Collaborate with client stakeholders"],
              benefits: ["Competitive salary & equity", "Comprehensive health/dental", "401(k) matching", "Remote stipend"],
            };
            setEditingCareer(newC);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opening</span>
        </button>
      </div>

      <div className="space-y-4">
        {careers.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-blue/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-brand-blue mt-1">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-200">
                    {c.department}
                  </span>
                  <span className="text-xs text-slate-500">• {c.employmentType}</span>
                  <span className="text-xs text-slate-500">• {c.experienceLevel}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">{c.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2 line-clamp-2">
                  {c.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location}
                  </span>
                  <span>{c.requirements.length} Requirements</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/careers"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                title="View live careers page"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingCareer(c)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-blue-100 transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Role</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCareer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Role: {editingCareer.title}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={editingCareer.title}
                  onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingCareer.department}
                    onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                  <input
                    type="text"
                    value={editingCareer.employmentType}
                    onChange={(e) => setEditingCareer({ ...editingCareer, employmentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                  <input
                    type="text"
                    value={editingCareer.experienceLevel}
                    onChange={(e) => setEditingCareer({ ...editingCareer, experienceLevel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingCareer.location}
                  onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={editingCareer.description}
                  onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requirements (one per line)</label>
                <textarea
                  rows={3}
                  value={editingCareer.requirements.join("\n")}
                  onChange={(e) => setEditingCareer({ ...editingCareer, requirements: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingCareer(null)}
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
