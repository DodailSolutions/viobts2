"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Monitor,
  Tablet,
  Smartphone,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sliders,
  Eye,
  Link as LinkIcon,
  Layers,
  Settings,
  ArrowUp,
  Check,
  Sparkles,
  PanelBottom,
  HelpCircle,
  Tag,
  Share2,
  Globe,
  X
} from "lucide-react";
import {
  cmsStore,
  FooterConfig,
  FooterColumnItem,
  FooterLinkItem,
  FooterSocialLinkItem,
  INITIAL_FOOTER_CONFIG
} from "@/lib/data";

export default function AdminFooterPage() {
  const [footerState, setFooterState] = useState<FooterConfig>(() => {
    try {
      return cmsStore.getFooterConfig();
    } catch {
      return INITIAL_FOOTER_CONFIG;
    }
  });

  const [activeTab, setActiveTab] = useState<"columns" | "socials" | "brand" | "contact" | "devices" | "legal">("columns");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [notification, setNotification] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // New social media form state
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newSocial, setNewSocial] = useState<{
    label: string;
    platform: "linkedin" | "twitter" | "youtube" | "github" | "facebook" | "instagram" | "custom";
    url: string;
  }>({
    label: "",
    platform: "custom",
    url: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Column being edited
  const [selectedColumnId, setSelectedColumnId] = useState<string>(() => footerState.columns[0]?.id || "col-services");

  // New link modal/form state
  const [newLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [newLink, setNewLink] = useState<{ label: string; url: string; isExternal: boolean; badge: string }>({
    label: "",
    url: "",
    isExternal: false,
    badge: "",
  });

  // New column modal/form state
  const [newColumnModalOpen, setNewColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  // Preview interactive accordion state
  const [previewAccordions, setPreviewAccordions] = useState<Record<string, boolean>>({});

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const selectedColumn = useMemo(() => {
    return footerState.columns.find((c) => c.id === selectedColumnId) || footerState.columns[0];
  }, [footerState.columns, selectedColumnId]);

  // Save changes to CMS Store
  const handleSave = () => {
    cmsStore.saveFooterConfig(footerState);

    // Add security audit log
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: "Updated public Footer configuration & device display rules",
      target: `Footer (${footerState.columns.length} columns, Mobile/Tablet/Desktop rules active)`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info",
    });

    showNotification("Footer configuration saved and deployed to all device sizes!");
  };

  // Reset to default configuration
  const handleReset = () => {
    if (confirm("Reset footer to default VIO corporate settings? Any unsaved edits will be discarded.")) {
      cmsStore.resetFooterConfig();
      setFooterState(cmsStore.getFooterConfig());
      showNotification("Footer reset to standard defaults.");
    }
  };

  // Toggle preview accordion on mobile simulation
  const togglePreviewAccordion = (colId: string) => {
    setPreviewAccordions((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };

  // Add Link to currently selected column
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.label || !newLink.url) return;

    const item: FooterLinkItem = {
      id: "lnk-" + Date.now(),
      label: newLink.label.trim(),
      url: newLink.url.trim(),
      isExternal: newLink.isExternal,
      badge: newLink.badge.trim() || undefined,
    };

    const updatedCols = footerState.columns.map((col) => {
      if (col.id === selectedColumnId) {
        return {
          ...col,
          links: [...col.links, item],
        };
      }
      return col;
    });

    setFooterState({ ...footerState, columns: updatedCols });
    setNewLink({ label: "", url: "", isExternal: false, badge: "" });
    setNewLinkModalOpen(false);
    showNotification(`Link "${item.label}" added to ${selectedColumn?.title}!`);
  };

  // Delete Link from selected column
  const handleDeleteLink = (linkId: string) => {
    const updatedCols = footerState.columns.map((col) => {
      if (col.id === selectedColumnId) {
        return {
          ...col,
          links: col.links.filter((l) => l.id !== linkId),
        };
      }
      return col;
    });
    setFooterState({ ...footerState, columns: updatedCols });
    showNotification("Link removed.");
  };

  // Add New Column
  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    const newCol: FooterColumnItem = {
      id: "col-" + Date.now(),
      title: newColumnTitle.trim(),
      links: [],
    };

    setFooterState({
      ...footerState,
      columns: [...footerState.columns, newCol],
    });
    setSelectedColumnId(newCol.id);
    setNewColumnTitle("");
    setNewColumnModalOpen(false);
    showNotification(`New column "${newCol.title}" created.`);
  };

  // Delete Column
  const handleDeleteColumn = (colId: string) => {
    if (footerState.columns.length <= 1) {
      alert("You must keep at least one navigation column.");
      return;
    }
    if (confirm("Are you sure you want to delete this column and all its links?")) {
      const filtered = footerState.columns.filter((c) => c.id !== colId);
      setFooterState({ ...footerState, columns: filtered });
      setSelectedColumnId(filtered[0]?.id || "");
      showNotification("Column deleted.");
    }
  };

  // Update selected column title
  const handleUpdateColumnTitle = (title: string) => {
    const updatedCols = footerState.columns.map((c) => (c.id === selectedColumnId ? { ...c, title } : c));
    setFooterState({ ...footerState, columns: updatedCols });
  };

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse py-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded-full" />
            <div className="h-9 w-96 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-10 w-36 bg-slate-200 rounded-xl" />
        </div>
        <div className="h-12 w-full bg-slate-200 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 h-96 bg-slate-200 rounded-3xl" />
          <div className="lg:col-span-6 h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071739] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-slide-up text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#0c34cd] uppercase tracking-wider mb-2">
            <PanelBottom className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span>RESPONSIVE FOOTER SUITE</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Footer Studio (All Device Sizes)
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Customize corporate footer layout, links, contact badges, and responsive behaviors for Desktop, Tablet, and Mobile devices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-colors shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Footer</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("columns")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "columns"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Navigation Columns &amp; Links ({footerState.columns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("socials")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "socials"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>Social Media URLs</span>
        </button>

        <button
          onClick={() => setActiveTab("devices")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "devices"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Device Display Rules</span>
        </button>

        <button
          onClick={() => setActiveTab("brand")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "brand"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Brand &amp; Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "contact"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact &amp; Social Routing</span>
        </button>

        <button
          onClick={() => setActiveTab("legal")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "legal"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Legal &amp; Copyright Bar</span>
        </button>
      </div>

      {/* TWO COLUMN WORKSPACE: Left = Edit Panel / Right = Real-Time Device Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Editing Controls (7 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* TAB 1: NAVIGATION COLUMNS & LINKS */}
          {activeTab === "columns" && (
            <div className="space-y-6">
              {/* Column Selection & Creator */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Select Column to Edit
                  </h3>
                  <button
                    type="button"
                    onClick={() => setNewColumnModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0c34cd] hover:bg-[#0c34cd] hover:text-white font-bold text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Column</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {footerState.columns.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColumnId(col.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                        selectedColumnId === col.id
                          ? "bg-[#0c34cd] text-white shadow-sm font-black"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <span>{col.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          selectedColumnId === col.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {col.links.length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Edit Selected Column Details */}
                {selectedColumn && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        Column Heading Title
                      </label>
                      <input
                        type="text"
                        value={selectedColumn.title}
                        onChange={(e) => handleUpdateColumnTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                      />
                    </div>

                    <div className="pt-5">
                      <button
                        type="button"
                        onClick={() => handleDeleteColumn(selectedColumn.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete this column"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Column Links Manager */}
              {selectedColumn && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                        Links in "{selectedColumn.title}"
                      </h3>
                      <p className="text-[11px] text-slate-400 font-normal">
                        Total {selectedColumn.links.length} destination links configured.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNewLinkModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c34cd] text-white hover:bg-[#0a2cb0] font-bold text-xs transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Link</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedColumn.links.map((link) => (
                      <div
                        key={link.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{link.label}</span>
                            {link.isExternal && (
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            )}
                            {link.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-blue-100 text-[#0c34cd]">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono">{link.url}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {selectedColumn.links.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                        No links added yet. Click "Add Link" above.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SOCIAL MEDIA URLS */}
          {activeTab === "socials" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                      Brand Authority &amp; Audience Reach
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">Social Media Profile URLs</h2>
                  <p className="text-xs text-white/70 mt-1 max-w-xl">
                    Configure direct links to VIO corporate social channels, executive profiles, and developer repositories shown across all footer device layouts.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddSocialModal(true)}
                  className="px-4 py-2 rounded-xl bg-white text-[#0c34cd] font-black text-xs hover:bg-cyan-50 transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Channel</span>
                </button>
              </div>

              {/* Core Social Profiles Form */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0c34cd]" />
                  <span>Primary Official Channels</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>LinkedIn Company Page</span>
                      <span className="text-[10px] text-blue-600 font-semibold">Recommended</span>
                    </label>
                    <input
                      type="url"
                      value={footerState.linkedinUrl}
                      onChange={(e) => setFooterState({ ...footerState, linkedinUrl: e.target.value })}
                      placeholder="https://www.linkedin.com/company/viobts/"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Founder &amp; CEO LinkedIn
                    </label>
                    <input
                      type="url"
                      value={footerState.founderLinkedinUrl}
                      onChange={(e) => setFooterState({ ...footerState, founderLinkedinUrl: e.target.value })}
                      placeholder="https://www.linkedin.com/in/malathi-vakkalanka/"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Twitter / X Profile URL
                    </label>
                    <input
                      type="url"
                      value={footerState.twitterUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, twitterUrl: e.target.value })}
                      placeholder="https://x.com/viobts"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      YouTube Channel URL
                    </label>
                    <input
                      type="url"
                      value={footerState.youtubeUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/@viobts"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      GitHub Organization / Code URL
                    </label>
                    <input
                      type="url"
                      value={footerState.githubUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, githubUrl: e.target.value })}
                      placeholder="https://github.com/viobts"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Facebook Business Page URL
                    </label>
                    <input
                      type="url"
                      value={footerState.facebookUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/viobts"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      value={footerState.instagramUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/viobts"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Channels & Active Toggle Table */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Custom Social &amp; Community Channels ({(footerState.socialLinks || []).length})
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Toggle active display in public footer
                  </span>
                </div>

                <div className="space-y-2">
                  {(footerState.socialLinks || []).map((soc) => (
                    <div
                      key={soc.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0c34cd] font-bold text-xs">
                          {soc.label.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{soc.label}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{soc.url}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={soc.isEnabled}
                            onChange={(e) => {
                              const updated = (footerState.socialLinks || []).map((s) =>
                                s.id === soc.id ? { ...s, isEnabled: e.target.checked } : s
                              );
                              setFooterState({ ...footerState, socialLinks: updated });
                            }}
                            className="w-4 h-4 rounded text-[#0c34cd] focus:ring-[#0c34cd]"
                          />
                          <span className="text-xs font-bold text-slate-600">
                            {soc.isEnabled ? "Visible" : "Hidden"}
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = (footerState.socialLinks || []).filter((s) => s.id !== soc.id);
                            setFooterState({ ...footerState, socialLinks: updated });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                          title="Remove channel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {(!footerState.socialLinks || footerState.socialLinks.length === 0) && (
                    <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                      No custom social channels added. Primary official channels above are active.
                    </div>
                  )}
                </div>
              </div>

              {/* Real-Time Preview Strip */}
              <div className="p-6 rounded-3xl bg-[#0c34cd] text-white shadow-xl border border-white/20 space-y-3">
                <p className="text-[11px] font-bold text-cyan-200 uppercase tracking-widest">
                  Live Footer Social Icons Preview
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {footerState.linkedinUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      LinkedIn
                    </span>
                  )}
                  {footerState.twitterUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      Twitter / X
                    </span>
                  )}
                  {footerState.youtubeUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      YouTube
                    </span>
                  )}
                  {footerState.githubUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      GitHub
                    </span>
                  )}
                  {footerState.facebookUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      Facebook
                    </span>
                  )}
                  {footerState.instagramUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      Instagram
                    </span>
                  )}
                  {footerState.founderLinkedinUrl && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold">
                      Founder LinkedIn
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Add Custom Social Modal */}
          {showAddSocialModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-up space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#0c34cd]" />
                    <span>Add Social or Community Channel</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddSocialModal(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Platform Type</label>
                  <select
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd] bg-white"
                  >
                    <option value="custom">Custom URL / Community</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="youtube">YouTube</option>
                    <option value="github">GitHub</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Discord, Threads, Medium, Substack"
                    value={newSocial.label}
                    onChange={(e) => setNewSocial({ ...newSocial, label: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddSocialModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!newSocial.label || !newSocial.url}
                    onClick={() => {
                      const created: FooterSocialLinkItem = {
                        id: `soc-${Date.now()}`,
                        platform: newSocial.platform,
                        label: newSocial.label,
                        url: newSocial.url,
                        isEnabled: true
                      };
                      const currentList = footerState.socialLinks || [];
                      setFooterState({
                        ...footerState,
                        socialLinks: [...currentList, created]
                      });
                      setShowAddSocialModal(false);
                      setNewSocial({ label: "", platform: "custom", url: "" });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0c34cd] hover:bg-[#0a2cb0] disabled:opacity-50 shadow-md shadow-blue-900/10"
                  >
                    Add Channel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEVICE DISPLAY RULES (MOBILE / TABLET / DESKTOP) */}
          {activeTab === "devices" && (
            <div className="space-y-6">
              {/* Mobile Device Optimization */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Smartphone className="w-4 h-4 text-[#0c34cd]" />
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Mobile Device Settings (&lt; 768px Viewports)
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Collapsible Accordion Columns
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Converts footer columns into tap-to-expand accordions on smartphones for compact scrolling.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={footerState.deviceSettings.mobile.collapsibleColumns}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            mobile: {
                              ...footerState.deviceSettings.mobile,
                              collapsibleColumns: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Quick Action Contact Bar (Call / Email / Book)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Displays 3 prominent thumb-friendly buttons at the top of the mobile footer.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={footerState.deviceSettings.mobile.showQuickContactBar}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            mobile: {
                              ...footerState.deviceSettings.mobile,
                              showQuickContactBar: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        "Back to Top" Scroll Button
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Allows mobile users to smoothly jump back to the header navigation.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={footerState.deviceSettings.mobile.showBackToTop}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            mobile: {
                              ...footerState.deviceSettings.mobile,
                              showBackToTop: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Tablet Device Optimization */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Tablet className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Tablet Device Settings (768px – 1024px Viewports)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Columns per Row on Tablets
                    </label>
                    <select
                      value={footerState.deviceSettings.tablet.columnsPerRow}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            tablet: {
                              ...footerState.deviceSettings.tablet,
                              columnsPerRow: Number(e.target.value) as 2 | 3 | 4,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value={2}>2 Columns</option>
                      <option value={3}>3 Columns (Recommended)</option>
                      <option value={4}>4 Columns</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Show Newsletter Box</p>
                      <p className="text-[10px] text-slate-500">Subscribe form on tablets</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={footerState.deviceSettings.tablet.showNewsletter}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            tablet: {
                              ...footerState.deviceSettings.tablet,
                              showNewsletter: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Device Optimization */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Monitor className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Desktop Settings (1024px+ Screens)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Grid Columns
                    </label>
                    <select
                      value={footerState.deviceSettings.desktop.columnsPerRow}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            desktop: {
                              ...footerState.deviceSettings.desktop,
                              columnsPerRow: Number(e.target.value) as 4 | 5 | 6,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value={4}>4 Columns Grid</option>
                      <option value={5}>5 Columns (Default)</option>
                      <option value={6}>6 Columns Expanded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Layout Spacing Density
                    </label>
                    <select
                      value={footerState.deviceSettings.desktop.spacing}
                      onChange={(e) =>
                        setFooterState({
                          ...footerState,
                          deviceSettings: {
                            ...footerState.deviceSettings,
                            desktop: {
                              ...footerState.deviceSettings.desktop,
                              spacing: e.target.value as any,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value="compact">Compact (Tight margins)</option>
                      <option value="normal">Normal (Standard VIO)</option>
                      <option value="spacious">Spacious (Expansive)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BRAND & CREDENTIALS */}
          {activeTab === "brand" && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
                Brand Information &amp; Small Business Certification
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={footerState.companyName}
                    onChange={(e) => setFooterState({ ...footerState, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Brand Tagline / Introduction Copy
                  </label>
                  <textarea
                    rows={3}
                    value={footerState.tagline}
                    onChange={(e) => setFooterState({ ...footerState, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900">
                      Show SWaM Certification Badge
                    </label>
                    <input
                      type="checkbox"
                      checked={footerState.showSwamBadge}
                      onChange={(e) => setFooterState({ ...footerState, showSwamBadge: e.target.checked })}
                      className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={footerState.swamBadgeText}
                      onChange={(e) => setFooterState({ ...footerState, swamBadgeText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & SOCIAL ROUTING */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
                  Direct Contact &amp; Office Coordinates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Official Phone
                    </label>
                    <input
                      type="text"
                      value={footerState.contactPhone}
                      onChange={(e) => setFooterState({ ...footerState, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Official Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={footerState.contactEmail}
                      onChange={(e) => setFooterState({ ...footerState, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Headquarters Address
                  </label>
                  <input
                    type="text"
                    value={footerState.contactAddress}
                    onChange={(e) => setFooterState({ ...footerState, contactAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                  />
                </div>
              </div>

              {/* Social & Executive Links */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Social Channels &amp; Consultation Booking
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("socials")}
                    className="text-xs font-bold text-[#0c34cd] hover:underline"
                  >
                    Open Social Studio →
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Company LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={footerState.linkedinUrl}
                      onChange={(e) => setFooterState({ ...footerState, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Twitter / X Profile URL
                    </label>
                    <input
                      type="text"
                      value={footerState.twitterUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, twitterUrl: e.target.value })}
                      placeholder="https://x.com/viobts"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      YouTube Channel URL
                    </label>
                    <input
                      type="text"
                      value={footerState.youtubeUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/@viobts"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      GitHub Organization URL
                    </label>
                    <input
                      type="text"
                      value={footerState.githubUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, githubUrl: e.target.value })}
                      placeholder="https://github.com/viobts"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Facebook Page URL
                    </label>
                    <input
                      type="text"
                      value={footerState.facebookUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, facebookUrl: e.target.value })}
                      placeholder="https://facebook.com/viobts"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={footerState.instagramUrl || ""}
                      onChange={(e) => setFooterState({ ...footerState, instagramUrl: e.target.value })}
                      placeholder="https://instagram.com/viobts"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Founder LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={footerState.founderLinkedinUrl}
                      onChange={(e) => setFooterState({ ...footerState, founderLinkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Calendly Consultation URL
                    </label>
                    <input
                      type="text"
                      value={footerState.calendlyUrl}
                      onChange={(e) => setFooterState({ ...footerState, calendlyUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter Settings */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Executive Newsletter Box
                  </h3>
                  <input
                    type="checkbox"
                    checked={footerState.newsletterEnabled}
                    onChange={(e) => setFooterState({ ...footerState, newsletterEnabled: e.target.checked })}
                    className="w-5 h-5 rounded text-[#0c34cd] focus:ring-[#0c34cd] cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Newsletter Box Headline
                    </label>
                    <input
                      type="text"
                      value={footerState.newsletterTitle}
                      onChange={(e) => setFooterState({ ...footerState, newsletterTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Newsletter Sub-description
                    </label>
                    <input
                      type="text"
                      value={footerState.newsletterDescription}
                      onChange={(e) => setFooterState({ ...footerState, newsletterDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LEGAL & COPYRIGHT BAR */}
          {activeTab === "legal" && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
                Legal Notice &amp; Copyright Strip
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Copyright String (use {"{year}"} for automatic current year)
                  </label>
                  <input
                    type="text"
                    value={footerState.copyrightText}
                    onChange={(e) => setFooterState({ ...footerState, copyrightText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Corporate Motto / Slogan
                  </label>
                  <input
                    type="text"
                    value={footerState.slogan}
                    onChange={(e) => setFooterState({ ...footerState, slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                  />
                </div>

                {/* Legal Links Manager */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2">
                    Legal Links
                  </label>
                  <div className="space-y-2">
                    {footerState.legalLinks.map((ll, idx) => (
                      <div key={ll.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={ll.label}
                          onChange={(e) => {
                            const updated = [...footerState.legalLinks];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setFooterState({ ...footerState, legalLinks: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={ll.url}
                          onChange={(e) => {
                            const updated = [...footerState.legalLinks];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setFooterState({ ...footerState, legalLinks: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                          placeholder="/url"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFooterState({
                              ...footerState,
                              legalLinks: footerState.legalLinks.filter((_, i) => i !== idx),
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFooterState({
                        ...footerState,
                        legalLinks: [
                          ...footerState.legalLinks,
                          { id: "leg-" + Date.now(), label: "New Legal Link", url: "/" },
                        ],
                      });
                    }}
                    className="mt-3 text-xs font-bold text-[#0c34cd] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Legal Link</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Realistic Live Multi-Device Simulator (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#0c34cd]" />
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Live Footer Viewport Simulator
                </h3>
              </div>

              {/* Device Selector */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === "desktop"
                      ? "bg-white text-[#0c34cd] shadow-2xs font-black"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === "tablet"
                      ? "bg-white text-[#0c34cd] shadow-2xs font-black"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === "mobile"
                      ? "bg-white text-[#0c34cd] shadow-2xs font-black"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Simulated Device Frame Container */}
            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto flex justify-center">
              <div
                className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-lg border border-slate-700 bg-gradient-to-b from-[#0c34cd] via-[#092699] to-[#06185f] text-white ${
                  previewDevice === "mobile"
                    ? "w-[360px] p-4 text-[11px]"
                    : previewDevice === "tablet"
                    ? "w-[600px] p-6 text-xs"
                    : "w-full p-6 text-xs"
                }`}
              >
                {/* Mobile simulated quick contact bar */}
                {previewDevice === "mobile" && footerState.deviceSettings.mobile.showQuickContactBar && (
                  <div className="grid grid-cols-3 gap-1.5 pb-4 mb-4 border-b border-white/15">
                    <div className="p-1.5 rounded-lg bg-white/10 text-center">
                      <Phone className="w-3 h-3 text-cyan-300 mx-auto mb-0.5" />
                      <span className="text-[9px] font-bold block truncate">Call</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/10 text-center">
                      <Mail className="w-3 h-3 text-cyan-300 mx-auto mb-0.5" />
                      <span className="text-[9px] font-bold block truncate">Email</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-cyan-400/20 text-center">
                      <Calendar className="w-3 h-3 text-cyan-200 mx-auto mb-0.5" />
                      <span className="text-[9px] font-bold text-cyan-100 block truncate">Consult</span>
                    </div>
                  </div>
                )}

                {/* Brand info */}
                <div className="space-y-2 mb-6">
                  <div className="h-6 w-20 relative">
                    <Image src="/images/vio-logo.png" alt="VIO" width={80} height={24} className="object-contain" />
                  </div>
                  <p className="text-[11px] text-white/80 leading-relaxed max-w-sm font-normal">
                    {footerState.tagline}
                  </p>
                  {footerState.showSwamBadge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] text-cyan-200">
                      <ShieldCheck className="w-3 h-3 text-cyan-300" />
                      <span className="truncate">{footerState.swamBadgeText}</span>
                    </div>
                  )}

                  {/* Social Profile Icons in Simulator */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {footerState.linkedinUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="LinkedIn">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                    {footerState.twitterUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="Twitter / X">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                    {footerState.youtubeUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="YouTube">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                    {footerState.githubUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="GitHub">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                    {footerState.facebookUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="Facebook">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                    {footerState.instagramUrl && (
                      <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white" title="Instagram">
                        <Share2 className="w-3 h-3 text-cyan-300" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Columns rendering */}
                <div
                  className={`grid gap-4 pb-6 border-b border-white/15 ${
                    previewDevice === "mobile"
                      ? "grid-cols-1"
                      : previewDevice === "tablet"
                      ? "grid-cols-2"
                      : "grid-cols-4"
                  }`}
                >
                  {footerState.columns.map((col) => {
                    const isColOpen = previewAccordions[col.id] ?? false;

                    // If mobile & accordions enabled
                    if (previewDevice === "mobile" && footerState.deviceSettings.mobile.collapsibleColumns) {
                      return (
                        <div key={col.id} className="border-b border-white/10 pb-2">
                          <button
                            type="button"
                            onClick={() => togglePreviewAccordion(col.id)}
                            className="flex items-center justify-between w-full py-1 text-[11px] font-bold text-cyan-300 uppercase tracking-wider"
                          >
                            <span>{col.title} ({col.links.length})</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${isColOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isColOpen && (
                            <ul className="space-y-1.5 pt-2 pl-2">
                              {col.links.map((lnk) => (
                                <li key={lnk.id} className="text-[10px] text-white/70">
                                  {lnk.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    }

                    // Otherwise standard column
                    return (
                      <div key={col.id} className="space-y-2">
                        <p className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                          {col.title}
                        </p>
                        <ul className="space-y-1.5">
                          {col.links.map((lnk) => (
                            <li key={lnk.id} className="text-[10px] text-white/70 hover:text-white truncate">
                              {lnk.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Legal & copyright strip */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/60">
                  <p>{footerState.copyrightText.replace("{year}", new Date().getFullYear().toString())}</p>
                  <div className="flex items-center gap-3">
                    {footerState.legalLinks.map((l) => (
                      <span key={l.id}>{l.label}</span>
                    ))}
                    {footerState.deviceSettings.mobile.showBackToTop && previewDevice === "mobile" && (
                      <span className="text-cyan-300 font-bold">Top ↑</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#0c34cd] shrink-0 mt-0.5" />
              <span>
                <strong>Live Sync:</strong> Switching viewports above simulates how real visitors see the footer on smartphones, iPads, and desktop displays.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD LINK */}
      {newLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                Add Link to "{selectedColumn?.title}"
              </h3>
              <button
                type="button"
                onClick={() => setNewLinkModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLink} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Link Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Enablement"
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="/services/cloud-enablement"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Optional Badge (e.g. "New", "Admin")
                </label>
                <input
                  type="text"
                  placeholder="Leave empty if none"
                  value={newLink.badge}
                  onChange={(e) => setNewLink({ ...newLink, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="ext-toggle"
                  checked={newLink.isExternal}
                  onChange={(e) => setNewLink({ ...newLink, isExternal: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0c34cd] focus:ring-[#0c34cd]"
                />
                <label htmlFor="ext-toggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Opens in new browser tab (External link)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COLUMN */}
      {newColumnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                Create New Footer Column
              </h3>
              <button
                type="button"
                onClick={() => setNewColumnModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddColumn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Column Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solutions, Legal, Portals"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewColumnModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm"
                >
                  Create Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
