"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Trash2,
  Save,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  Code,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { 
  cmsStore, 
  PageItem, 
  PageSectionItem,
  ClientLogoItem,
  ClientTestimonialItem,
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_CLIENT_TESTIMONIALS
} from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

const AVAILABLE_BLOCKS = [
  { type: "HeroBanner", label: "Hero Banner", description: "Full-width editorial headline, eyebrow, badge & CTAs" },
  { type: "StatsCounter", label: "Stats Counter", description: "Animated enterprise numbers & metric proofs" },
  { type: "MeetOurClients", label: "Meet Our Clients", description: "Official client logos carousel & founder testimonial card (VIO signature)" },
  { type: "BusinessProblems", label: "Business Pain Points", description: "Problem-solution matching cards (VIO signature)" },
  { type: "CapabilitiesGrid", label: "Capabilities Grid", description: "6 Core VIO pillars with hover interaction" },
  { type: "Methodology", label: "Methodology (Measure-Analyse-Improve)", description: "VIO's 3-stage visual architecture" },
  { type: "CaseStudyShowcase", label: "Case Study Showcase", description: "ODGA, USAID, DriveWealth proofs" },
  { type: "IndustryExplorer", label: "Industry Explorer", description: "Sector-specific challenges and solutions" },
  { type: "TestimonialsSlider", label: "Testimonials Slider", description: "Client quotes and verified designations" },
  { type: "CTABanner", label: "CTA Conversion Banner", description: "High-impact consultation booking banner" },
  { type: "SplitImageText", label: "Split Image + Text", description: "50/50 editorial storytelling section" },
  { type: "AccordionFAQ", label: "Accordion FAQ", description: "Accessible expandable question & answer block" },
  { type: "RichTextContent", label: "Rich Text Content", description: "Freeform WYSIWYG formatted HTML content" },
];

export default function VisualPageBuilderPage() {
  const params = useParams();
  const pageId = params.id as string;

  const [page, setPage] = useState<PageItem | null>(null);
  const [sections, setSections] = useState<PageSectionItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [jsonView, setJsonView] = useState(false);

  useEffect(() => {
    const p = cmsStore.getPageById(pageId);
    if (p) {
      setPage(p);
      const secs = cmsStore.getAllPageSections(pageId);
      setSections(secs);
      if (secs.length > 0) setActiveSectionId(secs[0].id);
    }
  }, [pageId]);

  if (!page) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400">Loading Page Builder...</p>
      </div>
    );
  }

  const liveUrl = page.slug === "home" ? "/" : `/${page.slug}`;
  const activeSection = sections.find((s) => s.id === activeSectionId);

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIdx, 0, moved);

    const orderedIds = newSections.map((s) => s.id);
    cmsStore.reorderSections(pageId, orderedIds);
    setSections(cmsStore.getAllPageSections(pageId));
    notifySave();
  };

  const handleToggleVisible = (sec: PageSectionItem) => {
    const updated = { ...sec, isVisible: !sec.isVisible };
    cmsStore.saveSection(updated);
    setSections(cmsStore.getAllPageSections(pageId));
    notifySave();
  };

  const handleDelete = (id: string) => {
    cmsStore.deleteSection(id);
    const updated = cmsStore.getAllPageSections(pageId);
    setSections(updated);
    if (activeSectionId === id) {
      setActiveSectionId(updated[0]?.id || null);
    }
    notifySave();
  };

  const handleAddBlock = (componentType: string) => {
    const newSection: PageSectionItem = {
      id: "sec-" + Date.now(),
      pageId,
      componentType,
      orderIndex: sections.length,
      isVisible: true,
      props: {
        eyebrow: "NEW SECTION",
        heading: `Dynamic ${componentType}`,
        subheading: "Custom configurable content section built with VIO Visual CMS.",
      },
    };

    cmsStore.saveSection(newSection);
    const updated = cmsStore.getAllPageSections(pageId);
    setSections(updated);
    setActiveSectionId(newSection.id);
    setShowBlockModal(false);
    notifySave();
  };

  const handlePropChange = (key: string, value: any) => {
    if (!activeSection) return;
    const updated: PageSectionItem = {
      ...activeSection,
      props: {
        ...activeSection.props,
        [key]: value,
      },
    };
    cmsStore.saveSection(updated);
    setSections(cmsStore.getAllPageSections(pageId));
    notifySave();
  };

  // MeetOurClients specific handlers
  const handleUpdateLogos = (updatedLogos: ClientLogoItem[]) => {
    handlePropChange("logos", updatedLogos);
  };

  const handleUpdateLogoItem = (index: number, field: keyof ClientLogoItem, value: any) => {
    const currentLogos: ClientLogoItem[] = [...(activeSection?.props.logos || DEFAULT_CLIENT_LOGOS)];
    currentLogos[index] = { ...currentLogos[index], [field]: value };
    handleUpdateLogos(currentLogos);
  };

  const handleAddLogo = () => {
    const currentLogos: ClientLogoItem[] = [...(activeSection?.props.logos || DEFAULT_CLIENT_LOGOS)];
    const newLogo: ClientLogoItem = {
      id: "client-" + Date.now(),
      name: "New Enterprise Client",
      svgSrc: "/images/clients/usaid.svg",
      category: "Enterprise & Retail",
      headline: "Enterprise Cloud Modernization & Data Engineering",
      summary: "Partnered to accelerate mission-critical velocity with modern microservices and real-time streaming architectures.",
      metrics: [{ label: "Execution Speed", value: "3x Faster" }]
    };
    currentLogos.push(newLogo);
    handleUpdateLogos(currentLogos);
  };

  const handleDeleteLogo = (index: number) => {
    const currentLogos: ClientLogoItem[] = [...(activeSection?.props.logos || DEFAULT_CLIENT_LOGOS)];
    currentLogos.splice(index, 1);
    handleUpdateLogos(currentLogos);
  };

  const handleMoveLogo = (index: number, direction: "up" | "down") => {
    const currentLogos: ClientLogoItem[] = [...(activeSection?.props.logos || DEFAULT_CLIENT_LOGOS)];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentLogos.length) return;
    const [moved] = currentLogos.splice(index, 1);
    currentLogos.splice(targetIdx, 0, moved);
    handleUpdateLogos(currentLogos);
  };

  // Testimonials handlers
  const handleUpdateTestimonials = (updatedTestimonials: ClientTestimonialItem[]) => {
    handlePropChange("testimonials", updatedTestimonials);
  };

  const handleUpdateTestimonialItem = (index: number, field: keyof ClientTestimonialItem, value: any) => {
    const currentTestimonials: ClientTestimonialItem[] = [...(activeSection?.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS)];
    currentTestimonials[index] = { ...currentTestimonials[index], [field]: value };
    handleUpdateTestimonials(currentTestimonials);
  };

  const handleAddTestimonial = () => {
    const currentTestimonials: ClientTestimonialItem[] = [...(activeSection?.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS)];
    const newTestimonial: ClientTestimonialItem = {
      id: "test-" + Date.now(),
      name: "Executive Leader",
      role: "Founder & CEO",
      company: "Strategic Partner",
      imageSrc: "/images/clients/founder-adithya-hq.png",
      badgeRole: "FOUNDER & CEO",
      badgeCompany: "STRATEGIC PARTNER",
      quote: "VIO delivered exceptional engineering acceleration, helping us surpass our technical milestones ahead of schedule.",
      linkedinUrl: "https://www.linkedin.com"
    };
    currentTestimonials.push(newTestimonial);
    handleUpdateTestimonials(currentTestimonials);
  };

  const handleDeleteTestimonial = (index: number) => {
    const currentTestimonials: ClientTestimonialItem[] = [...(activeSection?.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS)];
    currentTestimonials.splice(index, 1);
    handleUpdateTestimonials(currentTestimonials);
  };

  const handleMoveTestimonial = (index: number, direction: "up" | "down") => {
    const currentTestimonials: ClientTestimonialItem[] = [...(activeSection?.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS)];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentTestimonials.length) return;
    const [moved] = currentTestimonials.splice(index, 1);
    currentTestimonials.splice(targetIdx, 0, moved);
    handleUpdateTestimonials(currentTestimonials);
  };

  const notifySave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const getDeviceWidth = () => {
    if (previewDevice === "mobile") return "max-w-[390px]";
    if (previewDevice === "tablet") return "max-w-[768px]";
    return "w-full";
  };

  return (
    <div className="space-y-6">
      {/* Builder Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">{page.title}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                {page.status}
              </span>
            </div>
            <p className="text-xs text-brand-blue font-mono">{liveUrl}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Responsive Device Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === "desktop" ? "bg-brand-blue text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === "tablet" ? "bg-brand-blue text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === "mobile" ? "bg-brand-blue text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setJsonView(!jsonView)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              jsonView ? "bg-brand-blue text-white border-brand-blue" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={() => setShowBlockModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Block</span>
          </button>

          <Link
            href={liveUrl}
            target="_blank"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm"
            title="Open live preview in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Changes synchronized and live!</span>
        </div>
      )}

      {/* Main Builder Grid: Left Section Tree / Middle Form / Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sections Reorder Tree (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Page Section Sequence ({sections.length})
            </h2>
            <span className="text-[10px] text-slate-500">Order from Top to Bottom</span>
          </div>

          <div className="space-y-2">
            {sections.map((sec, idx) => {
              const isSelected = sec.id === activeSectionId;
              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-50 border-blue-200 shadow-sm text-slate-900"
                      : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      #{idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate text-slate-900">{sec.componentType}</p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {sec.props.heading || sec.props.eyebrow || "Configured Block"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-white disabled:opacity-20 text-slate-500 hover:text-slate-900"
                      title="Move Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === sections.length - 1}
                      className="p-1 rounded hover:bg-white disabled:opacity-20 text-slate-500 hover:text-slate-900"
                      title="Move Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleVisible(sec)}
                      className={`p-1 rounded hover:bg-white ${sec.isVisible ? "text-brand-blue" : "text-slate-400"}`}
                      title="Toggle Visibility"
                    >
                      {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(sec.id)}
                      className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Block Property Form & Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeSection ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                    Block Form Editor
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeSection.componentType} Settings
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">{activeSection.id}</span>
              </div>

              {/* Dynamic Property Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSection.props.eyebrow !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Eyebrow / Category Tag
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.eyebrow || ""}
                      onChange={(e) => handlePropChange("eyebrow", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {(activeSection.props.heading !== undefined || activeSection.props.headline !== undefined) && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Main Heading / Headline
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.heading || activeSection.props.headline || ""}
                      onChange={(e) => {
                        const key = activeSection.props.headline !== undefined ? "headline" : "heading";
                        handlePropChange(key, e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {(activeSection.props.subheading !== undefined || activeSection.props.description !== undefined) && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subheading / Supporting Description
                    </label>
                    <textarea
                      rows={3}
                      value={activeSection.props.subheading || activeSection.props.description || ""}
                      onChange={(e) => {
                        const key = activeSection.props.subheading !== undefined ? "subheading" : "description";
                        handlePropChange(key, e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {activeSection.props.badge !== undefined && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.badge || ""}
                      onChange={(e) => handlePropChange("badge", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {activeSection.props.primaryCtaText !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.primaryCtaText || ""}
                      onChange={(e) => handlePropChange("primaryCtaText", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {activeSection.props.primaryCtaLink !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary CTA Link
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.primaryCtaLink || ""}
                      onChange={(e) => handlePropChange("primaryCtaLink", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white font-mono"
                    />
                  </div>
                )}

                {activeSection.props.secondaryCtaText !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.secondaryCtaText || ""}
                      onChange={(e) => handlePropChange("secondaryCtaText", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                )}

                {activeSection.props.secondaryCtaLink !== undefined && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Secondary CTA Link
                    </label>
                    <input
                      type="text"
                      value={activeSection.props.secondaryCtaLink || ""}
                      onChange={(e) => handlePropChange("secondaryCtaLink", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Specialized Sub-Editors for MeetOurClients */}
              {activeSection.componentType === "MeetOurClients" && (
                <div className="pt-6 border-t border-slate-200 space-y-8">
                  {/* 1. Client Logos Management */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Client Logos Roster ({(activeSection.props.logos || DEFAULT_CLIENT_LOGOS).length})
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Add, reorder, or edit enterprise client logos and their impact metrics.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateLogos(DEFAULT_CLIENT_LOGOS)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          Reset 13 Defaults
                        </button>
                        <button
                          type="button"
                          onClick={handleAddLogo}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Client Logo</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {(activeSection.props.logos || DEFAULT_CLIENT_LOGOS).map((logo: ClientLogoItem, lIdx: number) => (
                        <div
                          key={logo.id || lIdx}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 shadow-2xs"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                            <div className="flex items-center gap-2.5">
                              <div className="w-10 h-8 rounded bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                                <img
                                  src={logo.svgSrc}
                                  alt={logo.name}
                                  className="max-h-6 max-w-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-900 truncate">
                                #{lIdx + 1}: {logo.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveLogo(lIdx, "up")}
                                disabled={lIdx === 0}
                                className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30"
                                title="Move Up"
                              >
                                <MoveUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveLogo(lIdx, "down")}
                                disabled={lIdx === (activeSection.props.logos || DEFAULT_CLIENT_LOGOS).length - 1}
                                className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30"
                                title="Move Down"
                              >
                                <MoveDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteLogo(lIdx)}
                                className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-600"
                                title="Delete Client Logo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Client Name
                              </label>
                              <input
                                type="text"
                                value={logo.name}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "name", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Logo SVG / Image Path
                              </label>
                              <input
                                type="text"
                                value={logo.svgSrc}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "svgSrc", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Sector Category
                              </label>
                              <input
                                type="text"
                                value={logo.category}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "category", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Impact Headline (Modal)
                              </label>
                              <input
                                type="text"
                                value={logo.headline || ""}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "headline", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Case Study Slug (Optional)
                              </label>
                              <input
                                type="text"
                                value={logo.caseStudySlug || ""}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "caseStudySlug", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                                placeholder="e.g. advance-auto-parts-supply-chain"
                              />
                            </div>
                            <div className="sm:col-span-3">
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Impact Summary (Modal)
                              </label>
                              <textarea
                                rows={2}
                                value={logo.summary || ""}
                                onChange={(e) => handleUpdateLogoItem(lIdx, "summary", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Featured Testimonials Management */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Testimonial Showcase Cards ({(activeSection.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS).length})
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Edit the featured testimonials in the card carousel beneath the logo strip.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTestimonial}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Testimonial</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {(activeSection.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS).map((test: ClientTestimonialItem, tIdx: number) => (
                        <div
                          key={test.id || tIdx}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 shadow-2xs"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              Testimonial #{tIdx + 1}: {test.name} ({test.company})
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveTestimonial(tIdx, "up")}
                                disabled={tIdx === 0}
                                className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30"
                                title="Move Up"
                              >
                                <MoveUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveTestimonial(tIdx, "down")}
                                disabled={tIdx === (activeSection.props.testimonials || DEFAULT_CLIENT_TESTIMONIALS).length - 1}
                                className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30"
                                title="Move Down"
                              >
                                <MoveDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTestimonial(tIdx)}
                                className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-600"
                                title="Delete Testimonial"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Author Name
                              </label>
                              <input
                                type="text"
                                value={test.name}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "name", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Role / Title
                              </label>
                              <input
                                type="text"
                                value={test.role}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "role", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Company
                              </label>
                              <input
                                type="text"
                                value={test.company}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "company", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Banner Role Badge
                              </label>
                              <input
                                type="text"
                                value={test.badgeRole}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "badgeRole", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Banner Company Badge
                              </label>
                              <input
                                type="text"
                                value={test.badgeCompany}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "badgeCompany", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Banner Image Path / URL
                              </label>
                              <input
                                type="text"
                                value={test.imageSrc}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "imageSrc", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Testimonial Quote
                              </label>
                              <textarea
                                rows={3}
                                value={test.quote}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "quote", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 leading-relaxed"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                LinkedIn Profile URL
                              </label>
                              <input
                                type="text"
                                value={test.linkedinUrl}
                                onChange={(e) => handleUpdateTestimonialItem(tIdx, "linkedinUrl", e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-500">
              Select or add a section from the sequence tree on the left.
            </div>
          )}

          {/* JSONB Inspector */}
          {jsonView && activeSection && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-brand-blue uppercase mb-2">
                Raw JSONB Props Inspector:
              </p>
              <pre className="text-[11px] font-mono text-slate-800 overflow-x-auto p-3 rounded-xl bg-slate-50 border border-slate-200">
                {JSON.stringify(activeSection.props, null, 2)}
              </pre>
            </div>
          )}

          {/* Live Component Preview Window */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                Live Responsive Preview ({previewDevice.toUpperCase()})
              </span>
              <span className="text-[11px] text-slate-500">Rendered via SectionRenderer Engine</span>
            </div>

            <div className="flex justify-center bg-slate-100 p-4 rounded-xl overflow-x-auto border border-slate-200/60">
              <div className={`${getDeviceWidth()} transition-all duration-300 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm`}>
                {activeSection && <SectionRenderer section={activeSection} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Component Block Inserter</h3>
                <p className="text-xs text-slate-500">Add any pre-built modular section to this page without code</p>
              </div>
              <button
                onClick={() => setShowBlockModal(false)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AVAILABLE_BLOCKS.map((block) => (
                <div
                  key={block.type}
                  onClick={() => handleAddBlock(block.type)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-all group"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {block.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
