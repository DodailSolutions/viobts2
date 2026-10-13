"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  FileCode,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Globe,
  Search,
  Copy,
  Layers,
  Sparkles,
  LayoutTemplate,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Check,
  ShieldAlert,
  ChevronRight,
  FileText,
  Boxes
} from "lucide-react";
import { cmsStore, PageItem } from "@/lib/data";

const PAGE_TEMPLATES = [
  {
    id: "blank",
    name: "Blank Canvas",
    description: "Start completely clean with 0 blocks and assemble freely.",
    badge: "Minimal",
    icon: FileText,
  },
  {
    id: "landing",
    name: "High-Impact Landing Page",
    description: "Includes Hero, Stats Proof, Clients, Pain Points, Testimonials & CTA Banner.",
    badge: "Recommended",
    icon: Sparkles,
  },
  {
    id: "service",
    name: "Enterprise Service & Capability",
    description: "Includes Hero, 6-Pillar Grid, Measure-Analyse-Improve Methodology, Case Studies, FAQ & CTA.",
    badge: "Core VIO",
    icon: Boxes,
  },
  {
    id: "about",
    name: "Corporate Story & Mission",
    description: "Includes Editorial Hero, 50/50 Split Story, Methodology, Client Proof & CTA.",
    badge: "Enterprise",
    icon: LayoutTemplate,
  },
];

export default function AdminPagesPage() {
  // Start empty so server and client render the same markup; the store (which
  // reads localStorage on the client) is loaded after mount in refreshPages.
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"updated" | "title" | "sections">("updated");

  // Create Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("landing");
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    status: "published" as "published" | "draft",
  });

  // Edit Settings Modal State
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);

  // Delete Confirmation Modal State
  const [deletingPage, setDeletingPage] = useState<PageItem | null>(null);

  // Copied feedback notification
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshPages = () => {
    setPages([...cmsStore.getPages()]);
    setLoaded(true);
  };

  useEffect(() => {
    refreshPages();
    const handleUpdate = () => refreshPages();
    window.addEventListener("cms-storage-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("cms-storage-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Creation Handler
  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;

    const cleanSlug = newPage.slug.toLowerCase().trim().replace(/^\//, "");
    const existing = cmsStore.getPageBySlug(cleanSlug);
    if (existing) {
      alert(`A page with slug "/${cleanSlug}" already exists! Please choose a unique URL slug.`);
      return;
    }

    cmsStore.createPageWithTemplate(
      {
        title: newPage.title.trim(),
        slug: cleanSlug,
        metaTitle: newPage.metaTitle.trim(),
        metaDescription: newPage.metaDescription.trim(),
        status: newPage.status,
      },
      selectedTemplate
    );

    refreshPages();
    setShowAddModal(false);
    setNewPage({ title: "", slug: "", metaTitle: "", metaDescription: "", status: "published" });
    setSelectedTemplate("landing");
    showToast(`Page "/${cleanSlug}" created successfully!`);
  };

  // Edit Settings Handler
  const handleSaveEditPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    cmsStore.savePage(editingPage);
    refreshPages();
    setEditingPage(null);
    showToast(`Settings for "${editingPage.title}" updated.`);
  };

  // Duplicate Page Handler
  const handleDuplicate = (page: PageItem) => {
    const clone = cmsStore.duplicatePage(page.id);
    if (clone) {
      refreshPages();
      showToast(`Cloned "${page.title}" as draft "${clone.title}".`);
    }
  };

  // Delete Page Handler
  const handleConfirmDelete = () => {
    if (!deletingPage) return;
    if (deletingPage.id === "pg-home") {
      alert("The homepage cannot be deleted.");
      setDeletingPage(null);
      return;
    }

    const success = cmsStore.deletePage(deletingPage.id);
    if (success) {
      refreshPages();
      showToast(`Page "${deletingPage.title}" and its sections were removed.`);
    }
    setDeletingPage(null);
  };

  // Fast Toggle Status Handler
  const handleToggleStatus = (p: PageItem) => {
    const updatedStatus: PageItem["status"] = p.status === "published" ? "draft" : "published";
    const updated: PageItem = { ...p, status: updatedStatus };
    cmsStore.savePage(updated);
    refreshPages();
    showToast(`Status set to ${updatedStatus} for "${p.title}".`);
  };

  // Copy URL
  const handleCopyUrl = (slug: string) => {
    const fullUrl = slug === "home" ? window.location.origin : `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    showToast(`Copied URL: ${fullUrl}`);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Compute counts
  const totalSectionsCount = pages.reduce((acc, p) => acc + cmsStore.getAllPageSections(p.id).length, 0);
  const publishedCount = pages.filter((p) => p.status === "published").length;
  const draftCount = pages.filter((p) => p.status === "draft").length;

  // Filter & sort
  const filteredPages = pages
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "sections") {
        const secA = cmsStore.getAllPageSections(a.id).length;
        const secB = cmsStore.getAllPageSections(b.id).length;
        return secB - secA;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Title and Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-[#0c34cd] tracking-widest uppercase bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Visual CMS Engine
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              Zero-Code Dynamic Routes
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#071739] tracking-tight mt-1.5">
            Dynamic Pages Management
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Create, reorder, clone, and configure responsive enterprise pages using VIO's modular section assembly registry.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0c34cd] to-[#0096C7] hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-[#0c34cd]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Pages</p>
            <p className="text-2xl font-black text-[#071739] mt-1">{pages.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-[#0c34cd] border border-blue-100">
            <FileCode className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Published</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{publishedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Drafts</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{draftCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Modular Blocks</p>
            <p className="text-2xl font-black text-[#0c34cd] mt-1">{totalSectionsCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter Tabs & Sort Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by page title or slug (e.g. /services)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c34cd] focus:bg-white transition-colors"
          />
        </div>

        {/* Status Tabs and Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({pages.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "published" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "draft" ? "bg-white text-amber-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0c34cd]"
            >
              <option value="updated">Recently Updated</option>
              <option value="title">Alphabetical (A-Z)</option>
              <option value="sections">Most Modular Blocks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pages Grid List */}
      {!loaded ? null : filteredPages.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white border border-dashed border-slate-300">
          <FileCode className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No pages found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or status filter, or create a new page using a starter template.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredPages.map((p) => {
            const sections = cmsStore.getAllPageSections(p.id);
            const liveUrl = p.slug === "home" ? "/" : `/${p.slug}`;
            const isHome = p.id === "pg-home";

            return (
              <div
                key={p.id}
                className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                {/* Left Page Details */}
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50/80 text-[#0c34cd] border border-blue-100 group-hover:scale-105 transition-transform mt-0.5">
                    <FileCode className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-[#071739] group-hover:text-[#0c34cd] transition-colors">
                        {p.title}
                      </h2>

                      {/* Fast Status Toggle Pill */}
                      <button
                        onClick={() => handleToggleStatus(p)}
                        title={`Click to set as ${p.status === "published" ? "draft" : "published"}`}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border transition-all flex items-center gap-1 cursor-pointer ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span>{p.status}</span>
                      </button>

                      {isHome && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-[#0c34cd] uppercase">
                          Root Index
                        </span>
                      )}
                    </div>

                    {/* Slug & Copy Link */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>URL:</span>
                      <Link
                        href={liveUrl}
                        target="_blank"
                        className="text-[#0c34cd] hover:underline flex items-center gap-1 font-semibold"
                      >
                        {liveUrl}
                      </Link>
                      <button
                        onClick={() => handleCopyUrl(p.slug)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Copy live URL"
                      >
                        {copiedSlug === p.slug ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Metadata & Timestamp */}
                    <p className="text-xs text-slate-500 flex flex-wrap items-center gap-3 pt-1">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <Layers className="w-3.5 h-3.5 text-[#0c34cd]" />
                        {sections.length} modular section{sections.length === 1 ? "" : "s"}
                      </span>
                      <span>•</span>
                      <span>Updated {new Date(p.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      {p.metaDescription && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-xs text-slate-400" title={p.metaDescription}>
                            {p.metaDescription}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* View Live */}
                  <Link
                    href={liveUrl}
                    target="_blank"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
                    title="Open live route in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Duplicate Page */}
                  <button
                    onClick={() => handleDuplicate(p)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0c34cd] transition-colors border border-slate-200 hover:border-blue-200"
                    title="Clone page & duplicate all modular blocks"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Edit Settings */}
                  <button
                    onClick={() => setEditingPage({ ...p })}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
                    title="Edit page title, slug & SEO meta"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  {/* Delete Page */}
                  {!isHome && (
                    <button
                      onClick={() => setDeletingPage(p)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors border border-slate-200 hover:border-red-200"
                      title="Delete page"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Open Builder (Primary) */}
                  <Link
                    href={`/admin/pages/${p.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#0c34cd] font-bold text-xs hover:bg-[#0c34cd] hover:text-white transition-all border border-blue-200 shadow-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Open Visual Builder</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE NEW PAGE MODAL WITH STARTER TEMPLATES */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-extrabold text-[#0c34cd] tracking-widest uppercase">
                  Page Generator
                </span>
                <h3 className="text-xl font-bold text-[#071739] mt-0.5">Create New Dynamic Page</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-6">
              {/* Step 1: Starter Template Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1. Select Starter Architecture Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAGE_TEMPLATES.map((tmpl) => {
                    const Icon = tmpl.icon;
                    const isSelected = selectedTemplate === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-blue-50/80 border-[#0c34cd] shadow-sm ring-2 ring-[#0c34cd]/20"
                            : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isSelected ? "text-[#0c34cd]" : "text-slate-500"}`} />
                            <span className="text-xs font-bold text-[#071739]">{tmpl.name}</span>
                          </div>
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                            isSelected ? "bg-[#0c34cd] text-white" : "bg-slate-200 text-slate-600"
                          }`}>
                            {tmpl.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {tmpl.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Page Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Page Settings & URL Configuration
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        setNewPage({ ...newPage, title, slug, metaTitle: `${title} | VIO` });
                      }}
                      placeholder="e.g. Enterprise Cloud Architecture"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      URL Slug * (e.g. enterprise-cloud)
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0c34cd] focus-within:bg-white overflow-hidden">
                      <span className="px-3 text-xs text-slate-400 font-mono bg-slate-100/70 border-r border-slate-200 py-2.5">
                        /
                      </span>
                      <input
                        type="text"
                        required
                        value={newPage.slug}
                        onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9\-\/]/g, "") })}
                        placeholder="path-slug"
                        className="w-full px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={newPage.metaTitle}
                      onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                      placeholder="Page Title | VIO"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publish Status
                    </label>
                    <select
                      value={newPage.status}
                      onChange={(e) => setNewPage({ ...newPage, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white font-semibold"
                    >
                      <option value="published">Published (Live instantly)</option>
                      <option value="draft">Draft (Admin preview only)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      SEO Meta Description
                    </label>
                    <span className="text-[10px] text-slate-400">
                      {newPage.metaDescription.length}/160 characters
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={newPage.metaDescription}
                    onChange={(e) => setNewPage({ ...newPage, metaDescription: e.target.value })}
                    placeholder="Short 150-160 character summary for search engine snippets and social link previews."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0c34cd] to-[#0096C7] text-white font-bold text-xs hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md shadow-[#0c34cd]/20"
                >
                  Create & Launch Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PAGE SETTINGS MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-extrabold text-[#0c34cd] tracking-widest uppercase">
                  Settings & Metadata
                </span>
                <h3 className="text-xl font-bold text-[#071739] mt-0.5">Edit Page Configuration</h3>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveEditPage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  disabled={editingPage.id === "pg-home"}
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9\-\/]/g, "") })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white font-mono disabled:opacity-60"
                />
                {editingPage.id === "pg-home" && (
                  <p className="text-[10px] text-slate-400 mt-1">Homepage slug is fixed as root "/"</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingPage.status}
                  onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white font-semibold"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={editingPage.metaTitle || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                  placeholder="Meta title for Google and browser tabs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SEO Meta Description
                </label>
                <textarea
                  rows={3}
                  value={editingPage.metaDescription || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  placeholder="150-160 characters summary for Google search results"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0c34cd] text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingPage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-100">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Page Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-slate-900">"{deletingPage.title}"</strong> (/{deletingPage.slug})? All associated modular content sections will also be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingPage(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all shadow-md shadow-red-600/20"
              >
                Permanently Delete Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
