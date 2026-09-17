"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, FileCode, Edit, Trash2, ExternalLink, CheckCircle2, Clock, Globe } from "lucide-react";
import { cmsStore, PageItem } from "@/lib/data";

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>(cmsStore.getPages());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;

    const page: PageItem = {
      id: "pg-" + newPage.slug.replace(/\//g, "-").toLowerCase(),
      slug: newPage.slug.toLowerCase().trim(),
      title: newPage.title.trim(),
      metaTitle: newPage.metaTitle.trim() || `${newPage.title} | VIO`,
      metaDescription: newPage.metaDescription.trim(),
      status: "published",
      updatedAt: new Date().toISOString(),
    };

    cmsStore.savePage(page);
    setPages(cmsStore.getPages());
    setShowAddModal(false);
    setNewPage({ title: "", slug: "", metaTitle: "", metaDescription: "" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Page Tree & Structure
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Dynamic Pages Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, reorder, and configure pages with unlimited modular content blocks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Pages List */}
      <div className="grid grid-cols-1 gap-4">
        {pages.map((p) => {
          const sections = cmsStore.getAllPageSections(p.id);
          const liveUrl = p.slug === "home" ? "/" : `/${p.slug}`;
          return (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-brand-blue border border-blue-100 mt-1">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-brand-blue font-mono mb-2">
                    Slug: {liveUrl}
                  </p>
                  <p className="text-xs text-slate-500">
                    {sections.length} Active Content Blocks • Updated {new Date(p.updatedAt).toLocaleDateString("en-US")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={liveUrl}
                  target="_blank"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
                  title="View live page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <Link
                  href={`/admin/pages/${p.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs hover:bg-brand-blue hover:text-white transition-all border border-blue-200"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Open Page Builder</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for New Page */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Create New Dynamic Page</h3>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPage.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setNewPage({ ...newPage, title, slug });
                  }}
                  placeholder="e.g. Enterprise Cloud Architecture"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug * (e.g. enterprise-cloud)
                </label>
                <input
                  type="text"
                  required
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  placeholder="slug-path"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={newPage.metaTitle}
                  onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                  placeholder="Meta title for Google and social previews"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  value={newPage.metaDescription}
                  onChange={(e) => setNewPage({ ...newPage, metaDescription: e.target.value })}
                  placeholder="150-160 characters summary"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
