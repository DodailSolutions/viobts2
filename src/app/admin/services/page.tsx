"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Layers, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { cmsStore, ServiceItem } from "@/lib/data";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(cmsStore.getServices());
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    cmsStore.saveService(editingService);
    setServices(cmsStore.getServices());
    setEditingService(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Capabilities Engine
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            The 6 Pillars & Services Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage titles, capabilities, target business outcomes, and supported tech stacks.
          </p>
        </div>

        <button
          onClick={() => {
            const newSrv: ServiceItem = {
              id: "srv-" + Date.now(),
              slug: "new-service-" + Date.now(),
              title: "New Capability",
              eyebrow: "Enterprise Capability",
              subtitle: "High-impact engineering service.",
              description: "Detailed description of capability...",
              icon: "Cpu",
              businessOutcome: "Measurable ROI outcome...",
              capabilities: ["Custom Engineering", "Architecture Review"],
              technologies: ["TypeScript", "Cloud"],
              faqs: [],
              orderIndex: services.length + 1,
            };
            setEditingService(newSrv);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-brand-blue border border-blue-100 mt-1">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    #0{srv.orderIndex}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{srv.title}</h2>
                  <span className="text-xs text-brand-blue font-semibold">({srv.eyebrow})</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mb-2">
                  {srv.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {srv.technologies.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/services/${srv.slug}`}
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm"
                title="View live page"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setEditingService(srv)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-brand-blue hover:text-white transition-all border border-blue-200"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl text-slate-900">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Service: {editingService.title}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingService.subtitle}
                  onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Outcome</label>
                <input
                  type="text"
                  value={editingService.businessOutcome}
                  onChange={(e) => setEditingService({ ...editingService, businessOutcome: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingService.technologies.join(", ")}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
