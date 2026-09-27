"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Globe,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  Code,
  FileCode,
  Sliders,
  ExternalLink,
  Copy,
  Check,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  ShieldCheck,
  TrendingUp,
  FileText,
  HelpCircle,
  Layers,
  ArrowRight,
  Download,
  Wand2,
  Tag,
  Clock,
  BookOpen,
  Gauge,
  X,
  MapPin,
  Building,
  PhoneCall,
  Navigation,
  Star,
  Map
} from "lucide-react";
import {
  cmsStore,
  PageItem,
  PageSEOConfig,
  SiteSEOSettings,
  RedirectItem,
  LocalSEOSettings,
  LocalBranch,
  analyzeContentSEO,
  generateSchemaJsonLd,
  generateLocalBusinessSchema,
  generateSitemapXml,
  generateAIMetadata,
  SEOAnalysisResult,
  AIMetadataSuggestion
} from "@/lib/data";

export default function AdminSEOPage() {
  const [pages, setPages] = useState<PageItem[]>(() => cmsStore.getPages());
  const [siteSettings, setSiteSettings] = useState<SiteSEOSettings>(() => cmsStore.getSiteSEOSettings());
  const [seoConfigs, setSeoConfigs] = useState<PageSEOConfig[]>(() => cmsStore.getPageSEOConfigs());
  const [redirects, setRedirects] = useState<RedirectItem[]>(() => cmsStore.getRedirects());

  const [activeTab, setActiveTab] = useState<"optimizer" | "local_seo" | "overview" | "sitemap" | "redirects">("optimizer");
  const [selectedPageId, setSelectedPageId] = useState<string>(() => pages[0]?.id || "pg-home");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("desktop");
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedLocalSchema, setCopiedLocalSchema] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Local SEO State
  const [localSettings, setLocalSettings] = useState<LocalSEOSettings>(() => cmsStore.getLocalSEOSettings());
  const [newGeoKeyword, setNewGeoKeyword] = useState("");
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: "",
    branchType: "Regional Office",
    streetAddress: "",
    city: "",
    state: "VA",
    postalCode: "",
    phone: "",
    email: "",
    isHeadquarters: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // AI Copilot Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AIMetadataSuggestion | null>(null);

  // Secondary Keyword Input State
  const [secondaryInput, setSecondaryInput] = useState("");

  // New Redirect Form State
  const [newRedirect, setNewRedirect] = useState<{ sourceUrl: string; targetUrl: string; type: 301 | 302 }>({
    sourceUrl: "",
    targetUrl: "",
    type: 301
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Currently Selected Page and its SEO config
  const selectedPage = useMemo(() => {
    return pages.find((p) => p.id === selectedPageId) || pages[0];
  }, [pages, selectedPageId]);

  // Current Working SEO Form for the selected page
  const currentConfig = useMemo(() => {
    const existing = seoConfigs.find((c) => c.pageId === selectedPageId);
    if (existing) {
      return {
        ...existing,
        secondaryKeywords: existing.secondaryKeywords || []
      };
    }

    // Fallback default
    return {
      pageId: selectedPageId,
      focusKeyphrase: selectedPage?.title.toLowerCase() || "",
      secondaryKeywords: ["enterprise cloud", "modern engineering", "scalable architecture"],
      seoTitle: selectedPage?.metaTitle || `${selectedPage?.title} | VIO`,
      slug: selectedPage?.slug || "",
      metaDescription: selectedPage?.metaDescription || "",
      canonicalUrl: `https://www.viobts.com/${selectedPage?.slug === "home" ? "" : selectedPage?.slug}`,
      robotsIndex: "index" as const,
      robotsFollow: "follow" as const,
      ogTitle: selectedPage?.metaTitle || "",
      ogDescription: selectedPage?.metaDescription || "",
      ogImage: "/images/og-preview.png",
      twitterTitle: selectedPage?.metaTitle || "",
      twitterDescription: selectedPage?.metaDescription || "",
      twitterImage: "/images/og-preview.png",
      schemaType: (selectedPageId === "pg-home" ? "Organization" : selectedPageId === "pg-services" ? "Service" : "WebPage") as any,
      contentSnippet: "VIO enterprise consulting and accelerator partner.",
    };
  }, [seoConfigs, selectedPageId, selectedPage]);

  const [formState, setFormState] = useState<PageSEOConfig>(currentConfig);

  // Sync when page selection changes
  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId);
    const existing = seoConfigs.find((c) => c.pageId === pageId);
    if (existing) {
      setFormState({
        ...existing,
        secondaryKeywords: existing.secondaryKeywords || []
      });
    } else {
      const p = pages.find((x) => x.id === pageId);
      setFormState({
        pageId: pageId,
        focusKeyphrase: p?.title.toLowerCase() || "",
        secondaryKeywords: ["enterprise technology", "cloud modernization", "digital architecture"],
        seoTitle: p?.metaTitle || `${p?.title} | VIO`,
        slug: p?.slug || "",
        metaDescription: p?.metaDescription || "",
        canonicalUrl: `https://www.viobts.com/${p?.slug === "home" ? "" : p?.slug}`,
        robotsIndex: "index",
        robotsFollow: "follow",
        ogTitle: p?.metaTitle || "",
        ogDescription: p?.metaDescription || "",
        ogImage: "/images/og-preview.png",
        twitterTitle: p?.metaTitle || "",
        twitterDescription: p?.metaDescription || "",
        twitterImage: "/images/og-preview.png",
        schemaType: (pageId === "pg-home" ? "Organization" : pageId === "pg-services" ? "Service" : "WebPage"),
        contentSnippet: "Enterprise technology accelerator partner headquartered in Richmond, VA.",
      });
    }
  };

  // Run Real-time SEO & Readability Diagnostics
  const analysis: SEOAnalysisResult = useMemo(() => {
    return analyzeContentSEO(formState);
  }, [formState]);

  // Schema JSON-LD representation
  const schemaJsonLd = useMemo(() => {
    return generateSchemaJsonLd(formState, siteSettings);
  }, [formState, siteSettings]);

  // XML Sitemap preview
  const sitemapXml = useMemo(() => {
    return generateSitemapXml(pages, siteSettings.siteUrl);
  }, [pages, siteSettings]);

  // Trigger AI Copilot
  const handleOpenAiCopilot = () => {
    const suggestion = generateAIMetadata(
      formState.seoTitle || selectedPage?.title || "Enterprise Technology",
      formState.focusKeyphrase,
      formState.contentSnippet || selectedPage?.metaDescription || "",
      formState.slug
    );
    setAiSuggestion(suggestion);
    setIsAiModalOpen(true);
  };

  // Apply AI Suggestion to Form State
  const handleApplyAiSuggestion = () => {
    if (!aiSuggestion) return;
    setFormState({
      ...formState,
      seoTitle: aiSuggestion.seoTitle,
      metaDescription: aiSuggestion.metaDescription,
      secondaryKeywords: aiSuggestion.secondaryKeywords,
      ogTitle: aiSuggestion.ogTitle,
      ogDescription: aiSuggestion.ogDescription,
    });
    setIsAiModalOpen(false);
    showNotification("✨ AI Metadata and LSI keyphrases applied to form!");
  };

  // Add Secondary Keyword
  const handleAddSecondaryKeyword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = secondaryInput.trim();
    if (!clean) return;
    const current = formState.secondaryKeywords || [];
    if (current.includes(clean)) {
      showNotification(`"${clean}" is already in your secondary keywords.`);
      return;
    }
    setFormState({
      ...formState,
      secondaryKeywords: [...current, clean]
    });
    setSecondaryInput("");
  };

  // Remove Secondary Keyword
  const handleRemoveSecondaryKeyword = (indexToRemove: number) => {
    const current = formState.secondaryKeywords || [];
    setFormState({
      ...formState,
      secondaryKeywords: current.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // Save SEO Configuration for Current Page
  const handleSavePageSEO = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    cmsStore.savePageSEOConfig(formState);
    setSeoConfigs(cmsStore.getPageSEOConfigs());

    // Also update parent page metaTitle and metaDescription
    if (selectedPage) {
      cmsStore.savePage({
        ...selectedPage,
        metaTitle: formState.seoTitle,
        metaDescription: formState.metaDescription,
        slug: formState.slug,
      });
      setPages(cmsStore.getPages());
    }

    // Log to Audit Trail
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: `Saved SEO & Content Optimization for "${formState.seoTitle}"`,
      target: `Page: /${formState.slug} (Composite Rank Score: ${analysis.compositeScore}/100)`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info",
    });

    showNotification(`SEO configuration for "${selectedPage?.title || formState.slug}" saved successfully!`);
  };

  // Copy Schema JSON-LD to Clipboard
  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaJsonLd);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
    showNotification("Schema JSON-LD copied to clipboard!");
  };

  // Save Local SEO Settings
  const handleSaveLocalSEO = (updated?: LocalSEOSettings) => {
    const toSave = updated || localSettings;
    cmsStore.saveLocalSEOSettings(toSave);
    setLocalSettings(cmsStore.getLocalSEOSettings());
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: "Updated Local SEO & Google Maps Profile",
      target: `HQ: ${toSave.city}, ${toSave.state} (${toSave.branches.length} Locations)`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info",
    });
    showNotification("Local SEO profile & Google Business settings saved successfully!");
  };

  // Local Business Schema JSON-LD
  const localSchemaJsonLd = useMemo(() => {
    return generateLocalBusinessSchema(localSettings, siteSettings.siteUrl);
  }, [localSettings, siteSettings.siteUrl]);

  const handleCopyLocalSchema = () => {
    navigator.clipboard.writeText(localSchemaJsonLd);
    setCopiedLocalSchema(true);
    setTimeout(() => setCopiedLocalSchema(false), 2000);
    showNotification("LocalBusiness Schema JSON-LD copied to clipboard!");
  };

  // Copy XML Sitemap to Clipboard
  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
    showNotification("XML Sitemap copied to clipboard!");
  };

  // Export SEO Audit Report as CSV
  const handleExportCSV = () => {
    const headers = [
      "Page Title",
      "URL Slug",
      "Focus Keyphrase",
      "Composite Rank Readiness (%)",
      "SEO Health (%)",
      "Readability (%)",
      "Technical Score (%)",
      "Index Directives",
      "Canonical URL",
      "Secondary Keywords"
    ];

    const rows = pages.map((p) => {
      const cfg = seoConfigs.find((c) => c.pageId === p.id) || {
        pageId: p.id,
        focusKeyphrase: p.title.toLowerCase(),
        seoTitle: p.metaTitle,
        slug: p.slug,
        metaDescription: p.metaDescription,
        robotsIndex: "index",
        robotsFollow: "follow",
        schemaType: "WebPage",
        contentSnippet: "Enterprise technology accelerator partner.",
      };
      const res = analyzeContentSEO(cfg as PageSEOConfig);
      return [
        `"${p.title.replace(/"/g, '""')}"`,
        `"/${p.slug}"`,
        `"${(cfg.focusKeyphrase || "").replace(/"/g, '""')}"`,
        res.compositeScore,
        res.seoScore,
        res.readabilityScore,
        res.technicalScore,
        `"${cfg.robotsIndex || "index"}, ${cfg.robotsFollow || "follow"}"`,
        `"${cfg.canonicalUrl || `https://www.viobts.com/${p.slug}`}"`,
        `"${(cfg.secondaryKeywords || []).join("; ").replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `vio-seo-intelligence-audit-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Site SEO Audit Report (CSV) exported successfully!");
  };

  // Add Redirect
  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRedirect.sourceUrl || !newRedirect.targetUrl) return;

    const red: RedirectItem = {
      id: "red-" + Date.now(),
      sourceUrl: newRedirect.sourceUrl.trim(),
      targetUrl: newRedirect.targetUrl.trim(),
      type: newRedirect.type,
      hits: 0,
      createdAt: new Date().toISOString(),
    };

    cmsStore.saveRedirect(red);
    setRedirects(cmsStore.getRedirects());
    setNewRedirect({ sourceUrl: "", targetUrl: "", type: 301 });
    showNotification(`Redirect ${red.sourceUrl} -> ${red.targetUrl} added!`);
  };

  // Delete Redirect
  const handleDeleteRedirect = (id: string) => {
    cmsStore.deleteRedirect(id);
    setRedirects(cmsStore.getRedirects());
    showNotification("Redirect removed.");
  };

  // Traffic Light Indicator Pill Component
  const TrafficLightBadge = ({ status, score }: { status: "good" | "ok" | "bad"; score?: number }) => {
    if (status === "good") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Optimal {score !== undefined && `(${score}%)`}</span>
        </span>
      );
    }
    if (status === "ok") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-black border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Needs Work {score !== undefined && `(${score}%)`}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black border border-rose-200">
        <span className="w-2 h-2 rounded-full bg-rose-500" />
        <span>Critical {score !== undefined && `(${score}%)`}</span>
      </span>
    );
  };

  // SEO Title & Description Progress Bar Colors
  const titleLen = formState.seoTitle.length;
  const descLen = formState.metaDescription.length;

  const titleBarColor =
    titleLen >= 40 && titleLen <= 65
      ? "bg-emerald-500"
      : titleLen > 65
      ? "bg-amber-500"
      : titleLen > 0
      ? "bg-amber-400"
      : "bg-slate-200";

  const descBarColor =
    descLen >= 120 && descLen <= 165
      ? "bg-emerald-500"
      : descLen > 165
      ? "bg-amber-500"
      : descLen >= 50
      ? "bg-amber-400"
      : "bg-slate-200";

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
          <div className="lg:col-span-7 h-96 bg-slate-200 rounded-3xl" />
          <div className="lg:col-span-5 h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071739] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-slide-up text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* AI Metadata Copilot Modal */}
      {isAiModalOpen && aiSuggestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0c34cd] to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">VIO AI Metadata Copilot</h3>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0c34cd] font-bold text-[10px] uppercase tracking-wider">
                    High-CTR Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Targeted optimization for: <span className="font-bold text-slate-800 font-mono">"{aiSuggestion.focusKeyphrase}"</span>
                </p>
              </div>
            </div>

            {/* Strategic Rationale */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-1 text-[#0c34cd]">Optimization Strategy:</span>
              {aiSuggestion.rationale}
            </div>

            {/* Suggestions Comparison */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-1 flex items-center justify-between">
                  <span>Suggested SEO Title</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">
                    {aiSuggestion.seoTitle.length} chars (Optimal)
                  </span>
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900">
                  {aiSuggestion.seoTitle}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-1 flex items-center justify-between">
                  <span>Suggested Meta Description</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">
                    {aiSuggestion.metaDescription.length} chars (Optimal)
                  </span>
                </label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  {aiSuggestion.metaDescription}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-1">
                  Suggested Secondary LSI Keyphrases
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {aiSuggestion.secondaryKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold"
                    >
                      +{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleApplyAiSuggestion}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/25"
              >
                <Check className="w-4 h-4" />
                <span>Apply AI Suggestions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#0c34cd] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span>VIO SEARCH INTELLIGENCE ENGINE</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            SEO &amp; Content Optimization Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Real-time search diagnostics, composite rank readiness scoring, Google SERP simulator, Flesch readability, Schema.org JSON-LD, and robots control.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenAiCopilot()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-600/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>AI Copilot</span>
          </button>

          <button
            onClick={() => handleSavePageSEO()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Config</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("optimizer")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "optimizer"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Content SEO &amp; SERP Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("local_seo")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "local_seo"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Local SEO &amp; Google Maps Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Site SEO Health &amp; Rankings</span>
        </button>

        <button
          onClick={() => setActiveTab("sitemap")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "sitemap"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>XML Sitemap &amp; Robots.txt Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("redirects")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "redirects"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>301/302 URL Redirects ({redirects.length})</span>
        </button>
      </div>

      {/* TAB 1: CONTENT SEO & SERP STUDIO */}
      {activeTab === "optimizer" && (
        <div className="space-y-8">
          {/* Target Page Selector & Focus Keyphrase Bar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5 flex items-center justify-between">
                  <span>1. Target Page to Optimize</span>
                  <span className="text-[10px] text-slate-400 font-normal">Select page from CMS</span>
                </label>
                <select
                  value={selectedPageId}
                  onChange={(e) => handleSelectPage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                >
                  {pages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (/{p.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
                    2. Primary Focus Keyphrase
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenAiCopilot}
                    className="text-[10px] font-bold text-[#0c34cd] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#0c34cd]" />
                    <span>AI Copilot Suggestions</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. enterprise technology services"
                    value={formState.focusKeyphrase}
                    onChange={(e) => setFormState({ ...formState, focusKeyphrase: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400">
                    {formState.focusKeyphrase ? `${formState.focusKeyphrase.split(/\s+/).filter(Boolean).length} words` : "Empty"}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary / LSI Keyphrases Manager */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0c34cd]" />
                  <span>3. Secondary &amp; LSI Keyphrases (Semantic Search Coverage)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal" suppressHydrationWarning>
                  {formState.secondaryKeywords?.length || 0} active phrases
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {formState.secondaryKeywords?.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 hover:border-slate-300 transition-all"
                  >
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSecondaryKeyword(index)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove keyword"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {(!formState.secondaryKeywords || formState.secondaryKeywords.length === 0) && (
                  <span className="text-xs text-slate-400 italic">
                    No secondary keyphrases added. Add related terms to expand organic coverage.
                  </span>
                )}
              </div>

              <form onSubmit={handleAddSecondaryKeyword} className="flex items-center gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="Add secondary keyword (e.g. cloud modernization)..."
                  value={secondaryInput}
                  onChange={(e) => setSecondaryInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Scorecard Traffic Light Strip */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">SEO Health:</span>
                  <TrafficLightBadge status={analysis.seoStatus} score={analysis.seoScore} />
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Readability:</span>
                  <TrafficLightBadge status={analysis.readabilityStatus} score={analysis.readabilityScore} />
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Technical:</span>
                  <TrafficLightBadge status={analysis.technicalStatus} score={analysis.technicalScore} />
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {analysis.seoChecks.filter((c) => c.status === "good").length} Optimal
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {analysis.seoChecks.filter((c) => c.status === "warning").length} Warnings
                </span>
                <span className="flex items-center gap-1 text-rose-600 font-bold">
                  <XCircle className="w-3.5 h-3.5" />
                  {analysis.seoChecks.filter((c) => c.status === "error").length} Critical
                </span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID: Left = Google Snippet & Inputs / Right = VIO Real-Time Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Google Snippet Editor & Social Cards (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Google SERP Snippet Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <GoogleIcon className="w-4 h-4" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Google Search Result Snippet Preview
                    </h3>
                  </div>

                  {/* Device Switcher */}
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                        previewDevice === "desktop"
                          ? "bg-white text-[#0c34cd] shadow-2xs font-black"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                        previewDevice === "mobile"
                          ? "bg-white text-[#0c34cd] shadow-2xs font-black"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Google Realistic Preview Box */}
                <div
                  className={`p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs transition-all ${
                    previewDevice === "mobile" ? "max-w-md mx-auto" : "w-full"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-[#0c34cd] border border-slate-200">
                      V
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#202124] leading-none">
                        VIO Business &amp; Technology Solutions
                      </p>
                      <p className="text-[11px] text-[#5f6368] font-mono leading-none mt-0.5 truncate">
                        https://www.viobts.com &gt; {formState.slug === "home" ? "" : formState.slug}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-[18px] font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2 mt-1">
                    {formState.seoTitle || "Please specify an SEO Title..."}
                  </h4>

                  <p className="text-[13px] text-[#4d5156] leading-relaxed mt-1 line-clamp-3">
                    {formState.metaDescription || "Please specify a meta description to control what searchers see in search results..."}
                  </p>
                </div>

                {/* Snippet Edit Form Fields */}
                <div className="space-y-4 pt-3 border-t border-slate-100">
                  {/* SEO Title Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
                        SEO Title
                      </label>
                      <span className="text-[11px] font-mono font-bold text-slate-500">
                        {titleLen} / 60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formState.seoTitle}
                      onChange={(e) => setFormState({ ...formState, seoTitle: e.target.value })}
                      placeholder="Title displayed in browser tab and search engines"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                    />
                    {/* Visual Length Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                      <div
                        className={`h-full ${titleBarColor} transition-all duration-300`}
                        style={{ width: `${Math.min(100, (titleLen / 60) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Slug Input */}
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                      Slug / Permalink URL
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 rounded-l-xl bg-slate-100 border border-r-0 border-slate-200 text-xs font-mono text-slate-500 select-none">
                        https://www.viobts.com/
                      </span>
                      <input
                        type="text"
                        value={formState.slug}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""),
                          })
                        }
                        placeholder="page-slug"
                        className="w-full px-3.5 py-2.5 rounded-r-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Meta Description Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
                        Meta Description
                      </label>
                      <span className="text-[11px] font-mono font-bold text-slate-500">
                        {descLen} / 160 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formState.metaDescription}
                      onChange={(e) => setFormState({ ...formState, metaDescription: e.target.value })}
                      placeholder="Clear, persuasive summary enticing searchers to click..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-800 focus:outline-none focus:border-[#0c34cd] focus:bg-white font-normal"
                    />
                    {/* Visual Length Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                      <div
                        className={`h-full ${descBarColor} transition-all duration-300`}
                        style={{ width: `${Math.min(100, (descLen / 160) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Sharing Previews (OpenGraph & Twitter Card) */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Social Sharing Card (LinkedIn, Facebook &amp; X)
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">OpenGraph 2.0</span>
                </div>

                {/* Social Card Visual Simulator */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-2xs">
                  <div className="h-44 bg-gradient-to-br from-[#0c34cd] via-[#082285] to-[#041142] relative flex items-center justify-center p-6 text-white text-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        ENTERPRISE TECHNOLOGY PARTNER
                      </span>
                      <h4 className="text-base font-black tracking-tight text-white line-clamp-2 max-w-md mx-auto pt-2">
                        {formState.ogTitle || formState.seoTitle}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 bg-white border-t border-slate-200 space-y-1">
                    <p className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      viobts.com
                    </p>
                    <p className="text-xs font-black text-slate-900 leading-snug line-clamp-1">
                      {formState.ogTitle || formState.seoTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
                      {formState.ogDescription || formState.metaDescription}
                    </p>
                  </div>
                </div>

                {/* Social Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Social OG Title
                    </label>
                    <input
                      type="text"
                      value={formState.ogTitle || ""}
                      onChange={(e) => setFormState({ ...formState, ogTitle: e.target.value })}
                      placeholder="Defaults to SEO Title"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Social OG Image URL
                    </label>
                    <input
                      type="text"
                      value={formState.ogImage || ""}
                      onChange={(e) => setFormState({ ...formState, ogImage: e.target.value })}
                      placeholder="/images/og-preview.png"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>

              {/* Schema.org Structured Data Generator */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Schema.org JSON-LD Structured Data
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={formState.schemaType}
                      onChange={(e) => setFormState({ ...formState, schemaType: e.target.value as any })}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value="Organization">Organization</option>
                      <option value="Service">Service Pillar</option>
                      <option value="Article">Article / Proof</option>
                      <option value="TechArticle">Tech Article</option>
                      <option value="FAQPage">FAQ Page</option>
                      <option value="WebPage">Standard WebPage</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleCopySchema}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      {copiedSchema ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSchema ? "Copied" : "Copy JSON"}</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-56 leading-relaxed">
                    {schemaJsonLd}
                  </pre>
                </div>
              </div>

              {/* Advanced Robots & Canonical Directives */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Advanced Crawl Directives &amp; Canonicals
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Search Indexing
                    </label>
                    <select
                      value={formState.robotsIndex}
                      onChange={(e) => setFormState({ ...formState, robotsIndex: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value="index">index (Default)</option>
                      <option value="noindex">noindex (Hide from search)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Link Following
                    </label>
                    <select
                      value={formState.robotsFollow}
                      onChange={(e) => setFormState({ ...formState, robotsFollow: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                    >
                      <option value="follow">follow (Default)</option>
                      <option value="nofollow">nofollow (Don't follow links)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      value={formState.canonicalUrl || ""}
                      onChange={(e) => setFormState({ ...formState, canonicalUrl: e.target.value })}
                      placeholder="https://www.viobts.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0c34cd]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VIO Real-Time Diagnostics & Gauges (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Composite Rank Readiness Gauge Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/50 border border-blue-100 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Search Rank Readiness
                    </h3>
                    <p className="text-[11px] text-slate-500">Composite index based on content, schema &amp; SERP intent</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#0c34cd] bg-blue-100 px-2 py-0.5 rounded-full">
                    Live Score
                  </span>
                </div>

                {/* Primary Radial Gauge & 3 Sub-gauges */}
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                  <RadialGauge
                    score={analysis.compositeScore}
                    size={116}
                    strokeWidth={11}
                    label="Overall Rank Readiness"
                    sublabel="Composite Metric"
                  />

                  <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
                    <RadialGauge
                      score={analysis.seoScore}
                      size={72}
                      strokeWidth={7}
                      label="SEO Health"
                      colorScheme="primary"
                    />
                    <RadialGauge
                      score={analysis.readabilityScore}
                      size={72}
                      strokeWidth={7}
                      label="Readability"
                      colorScheme="indigo"
                    />
                    <RadialGauge
                      score={analysis.technicalScore}
                      size={72}
                      strokeWidth={7}
                      label="Technical"
                      colorScheme="emerald"
                    />
                  </div>
                </div>

                {/* Reading & Editorial Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-100 text-center">
                  <div className="p-2 rounded-xl bg-white/80 border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Reading Time</span>
                    <span className="text-xs font-black text-slate-800 font-mono">
                      ~{analysis.readingTimeMinutes} min
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/80 border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Word Count</span>
                    <span className="text-xs font-black text-slate-800 font-mono">
                      {analysis.wordCount} words
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/80 border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Grade Level</span>
                    <span className="text-[11px] font-bold text-slate-800 truncate block">
                      {analysis.gradeLevel.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Keyphrases Live Audit */}
              {analysis.secondaryChecks.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#0c34cd]" />
                      <span>Secondary Keywords Audit ({analysis.secondaryChecks.length})</span>
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {analysis.secondaryChecks.map((sc, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 leading-none">{sc.keyword}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                            <span>In Title: {sc.foundInTitle ? "✓" : "—"}</span>
                            <span>•</span>
                            <span>In Desc: {sc.foundInDesc ? "✓" : "—"}</span>
                            <span>•</span>
                            <span>Density: {sc.density}%</span>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase shrink-0 ${
                            sc.status === "good"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {sc.status === "good" ? "Covered" : "Under-represented"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Checklist Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-[#0c34cd]" />
                    <span>Search Relevance Checklist ({analysis.seoChecks.length})</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {analysis.seoChecks.map((chk) => (
                    <div
                      key={chk.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        chk.status === "good"
                          ? "bg-emerald-50/40 border-emerald-200"
                          : chk.status === "warning"
                          ? "bg-amber-50/50 border-amber-200"
                          : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {chk.status === "good" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : chk.status === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-none">
                            {chk.title}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug font-normal">
                            {chk.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Readability Analysis Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Content Readability Diagnostics</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {analysis.readabilityChecks.map((chk) => (
                    <div
                      key={chk.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        chk.status === "good"
                          ? "bg-emerald-50/40 border-emerald-200"
                          : chk.status === "warning"
                          ? "bg-amber-50/50 border-amber-200"
                          : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {chk.status === "good" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : chk.status === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-none">
                            {chk.title}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug font-normal">
                            {chk.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Directives Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Technical &amp; Schema Validation</span>
                  </h4>
                </div>

                <div className="space-y-3">
                  {analysis.technicalChecks.map((chk) => (
                    <div
                      key={chk.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        chk.status === "good"
                          ? "bg-emerald-50/40 border-emerald-200"
                          : chk.status === "warning"
                          ? "bg-amber-50/50 border-amber-200"
                          : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {chk.status === "good" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : chk.status === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-none">
                            {chk.title}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug font-normal">
                            {chk.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: LOCAL SEO & GOOGLE MAPS STUDIO */}
      {activeTab === "local_seo" && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Operational Strip & Actions */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Google Knowledge Graph &amp; Local 3-Pack
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-cyan-200">
                  Richmond HQ &amp; Regional Hubs
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Local SEO &amp; Enterprise Map Armor
              </h2>
              <p className="text-sm text-cyan-100/80 mt-1 max-w-2xl leading-relaxed">
                Dominate hyper-local enterprise searches, manage verified NAP (Name, Address, Phone) consistency, configure multi-location branches, and generate schema for the Google Local 3-Pack.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Reset Local SEO settings to default Richmond HQ state?")) {
                    cmsStore.resetLocalSEOSettings();
                    setLocalSettings(cmsStore.getLocalSEOSettings());
                    showNotification("Local SEO settings reset to defaults.");
                  }
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveLocalSEO()}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#0c34cd] hover:bg-[#0a2cb0] shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Local SEO</span>
              </button>
            </div>
          </div>

          {/* 4 Performance Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">NAP Consistency</span>
              <p className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1.5">
                <span>100%</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Direct Match Across 7 Directories</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Local Pack 3-Pack Rank</span>
              <p className="text-2xl font-black text-[#0c34cd] mt-1">#1 Position</p>
              <p className="text-[11px] text-slate-500 mt-1">"IT Consulting Richmond VA"</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Client Rating</span>
              <p className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                <span>{localSettings.averageRating.toFixed(1)}</span>
                <span className="text-sm font-bold text-amber-500">★★★★★</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{localSettings.reviewCount} Verified Enterprise Reviews</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Technology Hubs</span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {localSettings.branches.length} Locations
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Richmond HQ • D.C. • Dallas</p>
            </div>
          </div>

          {/* Local Studio 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Local Configuration & NAP (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Core NAP & Business Identity */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Business Identity &amp; Physical Address (NAP)
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Richmond HQ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Legal Business Name
                    </label>
                    <input
                      type="text"
                      value={localSettings.businessName}
                      onChange={(e) => setLocalSettings({ ...localSettings, businessName: e.target.value })}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Local Business Category (Schema.org)
                    </label>
                    <select
                      value={localSettings.businessType}
                      onChange={(e) => setLocalSettings({ ...localSettings, businessType: e.target.value as any })}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd] bg-white"
                    >
                      <option value="ProfessionalService">ProfessionalService (IT &amp; Tech)</option>
                      <option value="LocalBusiness">LocalBusiness</option>
                      <option value="ITConsultant">ITConsultant</option>
                      <option value="Corporation">Corporation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address (Richmond HQ)
                  </label>
                  <input
                    type="text"
                    value={localSettings.streetAddress}
                    onChange={(e) => setLocalSettings({ ...localSettings, streetAddress: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={localSettings.city}
                      onChange={(e) => setLocalSettings({ ...localSettings, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={localSettings.state}
                      onChange={(e) => setLocalSettings({ ...localSettings, state: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={localSettings.postalCode}
                      onChange={(e) => setLocalSettings({ ...localSettings, postalCode: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={localSettings.country}
                      onChange={(e) => setLocalSettings({ ...localSettings, country: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Phone (Click-to-Call)
                    </label>
                    <input
                      type="text"
                      value={localSettings.phone}
                      onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Inbound Email
                    </label>
                    <input
                      type="email"
                      value={localSettings.email}
                      onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>
                </div>

                {/* GPS Coordinates & Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={localSettings.latitude}
                      onChange={(e) => setLocalSettings({ ...localSettings, latitude: parseFloat(e.target.value) || 0 })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={localSettings.longitude}
                      onChange={(e) => setLocalSettings({ ...localSettings, longitude: parseFloat(e.target.value) || 0 })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={localSettings.openingHours}
                      onChange={(e) => setLocalSettings({ ...localSettings, openingHours: e.target.value })}
                      placeholder="Mo-Fr 08:30-17:30"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Google Business Profile & Citations */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Google Maps, Place ID &amp; Service Radius
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Google Business Profile / Maps URL
                    </label>
                    <input
                      type="url"
                      value={localSettings.googleBusinessProfileUrl}
                      onChange={(e) => setLocalSettings({ ...localSettings, googleBusinessProfileUrl: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google Place ID (CID)
                      </label>
                      <input
                        type="text"
                        value={localSettings.googlePlaceId}
                        onChange={(e) => setLocalSettings({ ...localSettings, googlePlaceId: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Primary Service Region
                      </label>
                      <input
                        type="text"
                        value={localSettings.primaryServiceArea}
                        onChange={(e) => setLocalSettings({ ...localSettings, primaryServiceArea: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Targeted Regional Service Areas
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      {localSettings.serviceAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0c34cd] text-xs font-bold border border-blue-100"
                        >
                          <MapPin className="w-3 h-3 text-[#0c34cd]" />
                          <span>{area}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = localSettings.serviceAreas.filter((_, i) => i !== idx);
                              setLocalSettings({ ...localSettings, serviceAreas: updated });
                            }}
                            className="hover:text-red-600 text-blue-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Multi-Location Regional Branches */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Multi-Location Hubs &amp; Regional Technology Centers
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddBranchModal(true)}
                    className="px-3 py-1 rounded-lg bg-blue-50 text-[#0c34cd] font-bold text-xs hover:bg-blue-100 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Regional Hub</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {localSettings.branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{branch.name}</span>
                          {branch.isHeadquarters ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Corporate HQ
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-[#0c34cd]">
                              {branch.branchType}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">
                          {branch.streetAddress}, {branch.city}, {branch.state} {branch.postalCode}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          {branch.phone} {branch.email ? `• ${branch.email}` : ""}
                        </p>
                      </div>

                      {!branch.isHeadquarters && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = localSettings.branches.filter((b) => b.id !== branch.id);
                            setLocalSettings({ ...localSettings, branches: updated });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                          title="Remove branch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Local Geo-Keywords Engine */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Targeted Local Geo-Keywords
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {localSettings.geoKeywords.length} Active Keyphrases
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  These localized keyword combinations are injected into local structured data, Richmond search feeds, and local citation graphs.
                </p>

                <div className="flex flex-wrap gap-2">
                  {localSettings.geoKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 group"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = localSettings.geoKeywords.filter((_, idx) => idx !== i);
                          setLocalSettings({ ...localSettings, geoKeywords: updated });
                        }}
                        className="text-slate-400 hover:text-red-600 text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newGeoKeyword}
                    onChange={(e) => setNewGeoKeyword(e.target.value)}
                    placeholder="Add local keyword e.g. 'Henrico VA IT staff augmentation'..."
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newGeoKeyword.trim()) {
                        e.preventDefault();
                        setLocalSettings({
                          ...localSettings,
                          geoKeywords: [...localSettings.geoKeywords, newGeoKeyword.trim()]
                        });
                        setNewGeoKeyword("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    disabled={!newGeoKeyword.trim()}
                    onClick={() => {
                      if (newGeoKeyword.trim()) {
                        setLocalSettings({
                          ...localSettings,
                          geoKeywords: [...localSettings.geoKeywords, newGeoKeyword.trim()]
                        });
                        setNewGeoKeyword("");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0c34cd] text-white text-xs font-bold hover:bg-[#0a2cb0] disabled:opacity-50"
                  >
                    + Add Geo-Keyword
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Google 3-Pack Simulator & Schema (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Google Local 3-Pack SERP Simulator */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <GoogleIcon className="w-4 h-4" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Live Google Local 3-Pack SERP Preview
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Map Pin Active
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md">
                  {/* Fake Map Graphic Bar */}
                  <div className="h-28 bg-gradient-to-r from-emerald-100 via-teal-50 to-blue-100 relative flex items-center justify-center border-b border-slate-200">
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="w-8 h-8 rounded-full bg-[#0c34cd] text-white flex items-center justify-center shadow-lg border-2 border-white">
                        <MapPin className="w-4 h-4 fill-white" />
                      </div>
                      <span className="text-[9px] font-extrabold text-[#0c34cd] bg-white px-2 py-0.5 rounded-md shadow-xs mt-1 border border-blue-200">
                        VIO Richmond HQ
                      </span>
                    </div>
                    <span className="absolute top-2 left-2 text-[10px] font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      Richmond, Virginia (Innsbrook)
                    </span>
                  </div>

                  {/* Local 3-Pack Result Listing */}
                  <div className="p-4 bg-white space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer">
                          {localSettings.businessName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs mt-0.5">
                          <span className="font-bold text-amber-600">{localSettings.averageRating.toFixed(1)}</span>
                          <div className="flex text-amber-400 text-xs">★★★★★</div>
                          <span className="text-slate-500">({localSettings.reviewCount})</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">IT consultant</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          href="/"
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3 text-[#0c34cd]" />
                          <span>Website</span>
                        </Link>
                        <a
                          href={localSettings.googleBusinessProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0c34cd] text-xs font-bold hover:bg-blue-100 flex items-center gap-1 border border-blue-200"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Directions</span>
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      <span className="text-emerald-700 font-bold">Open</span> ⋅ Closes 5:30 PM
                    </p>

                    <p className="text-xs text-slate-500">
                      {localSettings.streetAddress}, {localSettings.city}, {localSettings.state} {localSettings.postalCode}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[10px] font-bold text-slate-600">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Check className="w-3 h-3" /> Certified VA-SWaM (Woman-Owned)
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Check className="w-3 h-3" /> Onsite enterprise consultations
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schema.org LocalBusiness JSON-LD Generator */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#0c34cd]" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Schema.org LocalBusiness JSON-LD
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyLocalSchema}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {copiedLocalSchema ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Schema</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 font-mono text-[11px] text-cyan-300 max-h-60 overflow-y-auto leading-relaxed border border-slate-800">
                  <pre>{localSchemaJsonLd}</pre>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Complies with Google Structured Data Guidelines
                  </span>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#0c34cd] hover:underline flex items-center gap-1"
                  >
                    <span>Test on Google</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Local Citation Authority Checklist */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      Local Directory &amp; Citation Integrity
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    6/6 Verified
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { name: "Google Business Profile (GBP)", status: "Verified & Connected", ok: true },
                    { name: "Virginia SWaM Directory", status: "Certified Woman-Owned Small Business", ok: true },
                    { name: "Bing Places for Business", status: "Synchronized with Google Place ID", ok: true },
                    { name: "Apple Business Connect", status: "Maps Place Card Active", ok: true },
                    { name: "LinkedIn Company HQ", status: "Richmond, VA Location Linked", ok: true },
                    { name: "Clutch.co Verified Profile", status: "5.0 Rating Synced", ok: true },
                  ].map((cit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-slate-800">{cit.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{cit.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Branch Modal */}
      {showAddBranchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-up space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#0c34cd]" />
                <span>Add Regional Technology Hub</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBranchModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hub Name</label>
              <input
                type="text"
                placeholder="e.g. Northern Virginia / D.C. Hub"
                value={newBranch.name}
                onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
              <input
                type="text"
                placeholder="e.g. 1200 G Street NW, Suite 800"
                value={newBranch.streetAddress}
                onChange={(e) => setNewBranch({ ...newBranch, streetAddress: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Washington"
                  value={newBranch.city}
                  onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  placeholder="DC"
                  value={newBranch.state}
                  onChange={(e) => setNewBranch({ ...newBranch, state: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="20005"
                  value={newBranch.postalCode}
                  onChange={(e) => setNewBranch({ ...newBranch, postalCode: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (202) 555-0182"
                value={newBranch.phone}
                onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddBranchModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!newBranch.name || !newBranch.city}
                onClick={() => {
                  const created: LocalBranch = {
                    id: `branch-${Date.now()}`,
                    name: newBranch.name,
                    branchType: newBranch.branchType,
                    streetAddress: newBranch.streetAddress,
                    city: newBranch.city,
                    state: newBranch.state,
                    postalCode: newBranch.postalCode,
                    phone: newBranch.phone,
                    isHeadquarters: false
                  };
                  const updated = {
                    ...localSettings,
                    branches: [...localSettings.branches, created]
                  };
                  setLocalSettings(updated);
                  handleSaveLocalSEO(updated);
                  setShowAddBranchModal(false);
                  setNewBranch({
                    name: "",
                    branchType: "Regional Office",
                    streetAddress: "",
                    city: "",
                    state: "VA",
                    postalCode: "",
                    phone: "",
                    email: "",
                    isHeadquarters: false
                  });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0c34cd] hover:bg-[#0a2cb0] disabled:opacity-50 shadow-md shadow-blue-900/10"
              >
                Save Branch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SITE-WIDE SEO HEALTH & RANKINGS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Site-wide KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Crawlable Pages</span>
              <p className="text-3xl font-black text-slate-900 mt-2">{pages.length}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Indexable</span>
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Average SEO Score</span>
              <p className="text-3xl font-black text-[#0c34cd] mt-2">91%</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                Grade A (Enterprise Standard)
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">OpenGraph Coverage</span>
              <p className="text-3xl font-black text-indigo-600 mt-2">100%</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Cards ready for LinkedIn/X
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active 301 Redirects</span>
              <p className="text-3xl font-black text-purple-600 mt-2">{redirects.length}</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Preserving link equity
              </p>
            </div>
          </div>

          {/* Table of All Pages & Their SEO Status */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Site Pages &amp; Target Keyphrase Audit</h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Inspect SEO health across all published pages and landing URLs.</p>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">Page Name &amp; URL</th>
                    <th className="py-4 px-6">Focus Keyphrase</th>
                    <th className="py-4 px-6 text-center">Rank Readiness</th>
                    <th className="py-4 px-6 text-center">SEO Score</th>
                    <th className="py-4 px-6 text-center">Readability</th>
                    <th className="py-4 px-6">Robots</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pages.map((p) => {
                    const cfg = seoConfigs.find((c) => c.pageId === p.id);
                    const res = analyzeContentSEO(
                      cfg || {
                        pageId: p.id,
                        focusKeyphrase: p.title.toLowerCase(),
                        seoTitle: p.metaTitle,
                        slug: p.slug,
                        metaDescription: p.metaDescription,
                        robotsIndex: "index",
                        robotsFollow: "follow",
                        schemaType: "WebPage",
                        contentSnippet: "Enterprise technology accelerator partner.",
                      }
                    );

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-bold text-slate-900 text-xs">{p.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">/{p.slug}</p>
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                            {cfg?.focusKeyphrase || "Not Set"}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <span className="font-black text-slate-900 text-xs">{res.compositeScore}%</span>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <TrafficLightBadge status={res.seoStatus} score={res.seoScore} />
                        </td>

                        <td className="py-4 px-6 text-center">
                          <TrafficLightBadge status={res.readabilityStatus} score={res.readabilityScore} />
                        </td>

                        <td className="py-4 px-6 font-mono text-[11px] text-slate-600">
                          {cfg?.robotsIndex || "index"}, {cfg?.robotsFollow || "follow"}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              handleSelectPage(p.id);
                              setActiveTab("optimizer");
                            }}
                            className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#0c34cd] hover:bg-[#0c34cd] hover:text-white font-bold text-xs transition-colors"
                          >
                            Optimize
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: XML SITEMAP & ROBOTS.TXT STUDIO */}
      {activeTab === "sitemap" && (
        <div className="space-y-8">
          {/* XML Sitemap Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Valid XML Standard</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Dynamic XML Sitemap (/sitemap.xml)
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Automatically keeps Google, Bing, and search engines informed about published landing pages and priority weights.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySitemap}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0c34cd] hover:border-[#0c34cd] font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSitemap ? "Copied" : "Copy XML"}</span>
                </button>

                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live XML</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <pre className="p-5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed">
                {sitemapXml}
              </pre>
            </div>
          </div>

          {/* Robots.txt Studio Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Robots.txt Crawl Directives Studio (/robots.txt)
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Define user-agent policies, crawl delays, private route disallows, and search crawler guidance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  cmsStore.saveSiteSEOSettings(siteSettings);
                  showNotification("Robots.txt directives saved successfully!");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Robots.txt</span>
              </button>
            </div>

            <div>
              <textarea
                rows={8}
                value={siteSettings.robotsTxtContent}
                onChange={(e) => setSiteSettings({ ...siteSettings, robotsTxtContent: e.target.value })}
                className="w-full p-4 rounded-2xl bg-slate-900 text-blue-300 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 301/302 URL REDIRECTS MANAGER */}
      {activeTab === "redirects" && (
        <div className="space-y-6">
          {/* Add Redirect Form */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Create New URL Redirect</h3>
              <p className="text-xs text-slate-500 font-normal">Safeguard incoming link equity and prevent 404 page errors during site restructuring.</p>
            </div>

            <form onSubmit={handleAddRedirect} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Source Slug / URL Path
                </label>
                <input
                  type="text"
                  required
                  placeholder="/old-service-page"
                  value={newRedirect.sourceUrl}
                  onChange={(e) => setNewRedirect({ ...newRedirect, sourceUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Destination Target URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="/services"
                  value={newRedirect.targetUrl}
                  onChange={(e) => setNewRedirect({ ...newRedirect, targetUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  HTTP Status
                </label>
                <select
                  value={newRedirect.type}
                  onChange={(e) => setNewRedirect({ ...newRedirect, type: Number(e.target.value) as 301 | 302 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                >
                  <option value={301}>301 Permanent</option>
                  <option value={302}>302 Temporary</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Redirect</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Redirects Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Active URL Redirect Rules</h3>
                <p className="text-xs text-slate-500 font-normal">All incoming traffic hitting these paths will be mapped automatically.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">Source Path</th>
                    <th className="py-4 px-6">Destination</th>
                    <th className="py-4 px-6">Redirect Type</th>
                    <th className="py-4 px-6">Hits Tracked</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {redirects.map((red) => (
                    <tr key={red.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900">
                        {red.sourceUrl}
                      </td>
                      <td className="py-4 px-6 font-mono text-[#0c34cd] font-bold">
                        {red.targetUrl}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          red.type === 301 ? "bg-blue-50 text-[#0c34cd] border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}>
                          {red.type} Permanent
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-500">
                        {red.hits} visits
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteRedirect(red.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete redirect"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Visual Radial Circular Gauge Component
function RadialGauge({
  score,
  size = 110,
  strokeWidth = 10,
  label,
  sublabel,
  colorScheme = "primary"
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  colorScheme?: "primary" | "emerald" | "indigo" | "amber";
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  let strokeColor = "#0c34cd"; // primary
  if (colorScheme === "emerald" || (colorScheme === "primary" && score >= 85)) {
    strokeColor = "#10b981";
  } else if (colorScheme === "indigo") {
    strokeColor = "#6366f1";
  } else if (score < 55) {
    strokeColor = "#f43f5e";
  } else if (score < 75) {
    strokeColor = "#f59e0b";
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900 leading-none">{score}</span>
          <span className="text-[10px] font-bold text-slate-400 mt-0.5">/100</span>
        </div>
      </div>
      <p className="text-xs font-black text-slate-900 mt-2">{label}</p>
      {sublabel && <p className="text-[10px] text-slate-500 font-medium">{sublabel}</p>}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}
