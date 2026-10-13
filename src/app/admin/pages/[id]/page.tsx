"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  ExternalLink,
  Settings2,
  MoreHorizontal,
  Layers,
  MousePointerClick,
  CornerDownRight,
} from "lucide-react";
import { cmsStore, PageItem, PageSectionItem } from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { getBlockMeta, getDefaultPropsForBlock, getSectionSummary } from "@/components/admin/page-builder/blockRegistry";
import { SectionInspector } from "@/components/admin/page-builder/SectionInspector";
import { BlockLibraryModal, PageSettingsModal } from "@/components/admin/page-builder/BuilderModals";
import { ScaledFrame } from "@/components/admin/page-builder/ScaledFrame";

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: { id: Device; icon: typeof Monitor; label: string; width: string }[] = [
  { id: "desktop", icon: Monitor, label: "Desktop", width: "w-full" },
  { id: "tablet", icon: Tablet, label: "Tablet (768px)", width: "w-[768px] max-w-full" },
  { id: "mobile", icon: Smartphone, label: "Mobile (390px)", width: "w-[390px] max-w-full" },
];

const STATUS_STYLES: Record<PageItem["status"], string> = {
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  scheduled: "bg-blue-50 text-blue-700 ring-blue-600/20",
  archived: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function VisualPageBuilderPage() {
  const params = useParams();
  const pageId = params.id as string;

  const [page, setPage] = useState<PageItem | null>(null);
  const [sections, setSections] = useState<PageSectionItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"page" | "section">("page");
  const [device, setDevice] = useState<Device>("desktop");
  const [blockModal, setBlockModal] = useState<null | "end" | "after_active">(null);
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [menuSectionId, setMenuSectionId] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const p = cmsStore.getPageById(pageId);
    if (p) {
      setPage(p);
      const secs = cmsStore.getAllPageSections(pageId);
      setSections(secs);
      if (secs.length > 0) setActiveSectionId(secs[0].id);
    }
  }, [pageId]);

  useEffect(() => {
    if (!menuSectionId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuSectionId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuSectionId]);

  // Keep the selected section in view on the canvas when picked from the list
  useEffect(() => {
    if (previewMode !== "page" || !activeSectionId) return;
    sectionRefs.current[activeSectionId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeSectionId, previewMode]);

  if (!page) {
    return (
      <div className="mx-auto max-w-sm py-24 text-center">
        <Layers className="mx-auto mb-3 h-6 w-6 animate-pulse text-slate-300" />
        <p className="text-sm text-slate-500">Loading page…</p>
        <Link href="/admin/pages" className="mt-4 inline-block text-[13px] font-medium text-[#0c34cd] hover:underline">
          Back to pages
        </Link>
      </div>
    );
  }

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const activeIndex = sections.findIndex((s) => s.id === activeSectionId);
  const visibleSections = sections.filter((s) => s.isVisible);
  const liveUrl = page.slug === "home" ? "/" : `/${page.slug}`;
  const deviceWidth = DEVICES.find((d) => d.id === device)!.width;

  const refresh = () => {
    setSections(cmsStore.getAllPageSections(pageId));
    setJustSaved(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setJustSaved(false), 2000);
  };

  const reorder = (list: PageSectionItem[]) => {
    cmsStore.reorderSections(pageId, list.map((s) => s.id));
    refresh();
  };

  const handleMove = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    reorder(next);
  };

  const handleDuplicate = (id: string) => {
    const cloned = cmsStore.duplicateSection(id);
    if (cloned) {
      refresh();
      setActiveSectionId(cloned.id);
    }
  };

  const handleToggleVisible = (sec: PageSectionItem) => {
    cmsStore.saveSection({ ...sec, isVisible: !sec.isVisible });
    refresh();
  };

  const handleDelete = (sec: PageSectionItem) => {
    if (!window.confirm(`Delete the “${getBlockMeta(sec.componentType).label}” section? This can't be undone.`)) return;
    cmsStore.deleteSection(sec.id);
    const updated = cmsStore.getAllPageSections(pageId);
    if (activeSectionId === sec.id) setActiveSectionId(updated[0]?.id || null);
    refresh();
  };

  const handleAddBlock = (componentType: string) => {
    const insertAfter = blockModal === "after_active" && activeIndex >= 0;
    const newSection: PageSectionItem = {
      id: "sec-" + Date.now(),
      pageId,
      componentType,
      orderIndex: insertAfter ? activeIndex + 1 : sections.length,
      isVisible: true,
      props: getDefaultPropsForBlock(componentType, page.title),
    };
    cmsStore.saveSection(newSection);
    if (insertAfter) {
      const next = [...sections];
      next.splice(activeIndex + 1, 0, newSection);
      cmsStore.reorderSections(pageId, next.map((s) => s.id));
    }
    refresh();
    setActiveSectionId(newSection.id);
    setBlockModal(null);
  };

  const updateActiveProps = (props: Record<string, any>) => {
    if (!activeSection) return;
    cmsStore.saveSection({ ...activeSection, props });
    refresh();
  };

  const handleSavePage = (updated: PageItem) => {
    cmsStore.savePage(updated);
    setPage(updated);
    setShowPageSettings(false);
    refresh();
  };

  return (
    <div className="-m-6 flex flex-col bg-slate-50 sm:-m-10 lg:h-screen">
      {/* ── Top bar ───────────────────────────────────────── */}
      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            href="/admin/pages"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Back to pages"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[15px] font-semibold text-slate-900">{page.title}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ring-1 ring-inset ${STATUS_STYLES[page.status]}`}
              >
                {page.status}
              </span>
            </div>
            <p className="truncate font-mono text-[11px] text-slate-400">{liveUrl}</p>
          </div>
        </div>

        {/* Canvas controls */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            {(["page", "section"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPreviewMode(m)}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  previewMode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {m === "page" ? "Full page" : "Selected section"}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {DEVICES.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setDevice(id)}
                title={label}
                aria-label={label}
                className={`rounded-md p-1.5 transition-colors ${
                  device === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <span
            className={`mr-2 hidden items-center gap-1 text-xs transition-colors sm:inline-flex ${
              justSaved ? "text-emerald-600" : "text-slate-400"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            {justSaved ? "Saved" : "All changes saved"}
          </span>
          <button
            onClick={() => setShowPageSettings(true)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="Page settings"
            aria-label="Page settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <Link
            href={liveUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View live
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* ── Sections list ───────────────────────────────── */}
        <aside className="flex shrink-0 flex-col border-b border-slate-200 bg-white lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-[13px] font-semibold text-slate-900">
              Sections <span className="ml-1 font-normal text-slate-400">{sections.length}</span>
            </h2>
            <button
              onClick={() => setBlockModal("end")}
              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              title="Add section"
              aria-label="Add section"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            {sections.length === 0 ? (
              <div className="mx-2 rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center">
                <p className="text-[13px] font-medium text-slate-700">No sections yet</p>
                <p className="mt-1 text-xs text-slate-400">Add your first section to start building.</p>
              </div>
            ) : (
              <ul className="space-y-0.5">
                {sections.map((sec, idx) => {
                  const meta = getBlockMeta(sec.componentType);
                  const Icon = meta.icon;
                  const selected = sec.id === activeSectionId;
                  const menuOpen = menuSectionId === sec.id;
                  return (
                    <li key={sec.id} className="relative">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveSectionId(sec.id)}
                        onKeyDown={(e) => e.key === "Enter" && setActiveSectionId(sec.id)}
                        className={`group flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 transition-colors ${
                          selected ? "bg-blue-50 ring-1 ring-inset ring-[#0c34cd]/20" : "hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                            selected ? "bg-[#0c34cd] text-white" : "bg-slate-100 text-slate-500"
                          } ${!sec.isVisible ? "opacity-40" : ""}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className={`min-w-0 flex-1 ${!sec.isVisible ? "opacity-50" : ""}`}>
                          <span className="block truncate text-[13px] font-medium text-slate-800">{meta.label}</span>
                          <span className="block truncate text-[11px] text-slate-400">
                            {getSectionSummary(sec.props) || "—"}
                          </span>
                        </span>

                        {!sec.isVisible && (
                          <EyeOff className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:hidden" aria-label="Hidden" />
                        )}

                        <div
                          className={`shrink-0 items-center gap-0.5 ${selected || menuOpen ? "flex" : "hidden group-hover:flex"}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconButton label="Move up" disabled={idx === 0} onClick={() => handleMove(idx, -1)}>
                            <ArrowUp className="h-3.5 w-3.5" />
                          </IconButton>
                          <IconButton label="Move down" disabled={idx === sections.length - 1} onClick={() => handleMove(idx, 1)}>
                            <ArrowDown className="h-3.5 w-3.5" />
                          </IconButton>
                          <IconButton label="More actions" onClick={() => setMenuSectionId(menuOpen ? null : sec.id)}>
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </IconButton>
                        </div>
                      </div>

                      {menuOpen && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setMenuSectionId(null)} />
                          <div className="absolute right-2 top-full z-40 mt-1 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-[13px] shadow-lg">
                            <MenuItem
                              icon={sec.isVisible ? EyeOff : Eye}
                              label={sec.isVisible ? "Hide on page" : "Show on page"}
                              onClick={() => {
                                handleToggleVisible(sec);
                                setMenuSectionId(null);
                              }}
                            />
                            <MenuItem
                              icon={Copy}
                              label="Duplicate"
                              onClick={() => {
                                handleDuplicate(sec.id);
                                setMenuSectionId(null);
                              }}
                            />
                            <MenuItem
                              icon={CornerDownRight}
                              label="Add section below"
                              onClick={() => {
                                setActiveSectionId(sec.id);
                                setBlockModal("after_active");
                                setMenuSectionId(null);
                              }}
                            />
                            <div className="my-1 h-px bg-slate-100" />
                            <MenuItem
                              icon={Trash2}
                              label="Delete"
                              danger
                              onClick={() => {
                                setMenuSectionId(null);
                                handleDelete(sec);
                              }}
                            />
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-slate-100 p-3">
            <button
              onClick={() => setBlockModal("end")}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0c34cd] px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#0a2bb0]"
            >
              <Plus className="h-4 w-4" />
              Add section
            </button>
          </div>
        </aside>

        {/* ── Canvas ─────────────────────────────────────── */}
        <main className="min-h-[480px] min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className={`mx-auto ${deviceWidth} transition-[width] duration-300`}>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <CanvasFrame desktop={device === "desktop"}>
              {previewMode === "section" ? (
                activeSection ? (
                  <SectionRenderer section={activeSection} />
                ) : (
                  <CanvasEmpty text="Select a section to preview it." />
                )
              ) : visibleSections.length === 0 ? (
                <CanvasEmpty text="This page has no visible sections." />
              ) : (
                visibleSections.map((sec) => {
                  const selected = sec.id === activeSectionId;
                  return (
                    <div
                      key={sec.id}
                      ref={(el) => {
                        sectionRefs.current[sec.id] = el;
                      }}
                      className="group/canvas relative"
                    >
                      <SectionRenderer section={sec} />
                      {/* Overlay: selects non-active sections; the active one stays interactive */}
                      <div
                        onClick={() => !selected && setActiveSectionId(sec.id)}
                        className={`absolute inset-0 transition-shadow ${
                          selected
                            ? "pointer-events-none shadow-[inset_0_0_0_2px_#0c34cd]"
                            : "cursor-pointer hover:shadow-[inset_0_0_0_2px_rgba(12,52,205,0.35)]"
                        }`}
                      />
                      <span
                        className={`pointer-events-none absolute left-2 top-2 rounded-md bg-[#0c34cd] px-2 py-0.5 text-[11px] font-medium text-white shadow-sm transition-opacity ${
                          selected ? "opacity-100" : "opacity-0 group-hover/canvas:opacity-100"
                        }`}
                      >
                        {getBlockMeta(sec.componentType).label}
                      </span>
                    </div>
                  );
                })
              )}
              </CanvasFrame>
            </div>
          </div>
        </main>

        {/* ── Inspector ──────────────────────────────────── */}
        <aside className="flex shrink-0 flex-col border-t border-slate-200 bg-white lg:w-[360px] lg:border-l lg:border-t-0">
          {activeSection ? (
            <>
              <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-4">
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-semibold text-slate-900">
                    {getBlockMeta(activeSection.componentType).label}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Section {activeIndex + 1} of {sections.length}
                    {!activeSection.isVisible && " · Hidden"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <IconButton
                    label={activeSection.isVisible ? "Hide section" : "Show section"}
                    onClick={() => handleToggleVisible(activeSection)}
                  >
                    {activeSection.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </IconButton>
                  <IconButton label="Duplicate section" onClick={() => handleDuplicate(activeSection.id)}>
                    <Copy className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="Delete section" danger onClick={() => handleDelete(activeSection)}>
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
              <div className="min-h-0 flex-1">
                <SectionInspector
                  key={activeSection.id}
                  section={activeSection}
                  onPropChange={(key, value) => updateActiveProps({ ...activeSection.props, [key]: value })}
                  onReplaceProps={updateActiveProps}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
              <MousePointerClick className="mb-3 h-6 w-6 text-slate-300" />
              <p className="text-[13px] font-medium text-slate-700">No section selected</p>
              <p className="mt-1 text-xs text-slate-400">Pick a section from the list or click one on the canvas to edit it.</p>
            </div>
          )}
        </aside>
      </div>

      {blockModal && (
        <BlockLibraryModal
          insertAfterLabel={
            blockModal === "after_active" && activeSection ? getBlockMeta(activeSection.componentType).label : undefined
          }
          onSelect={handleAddBlock}
          onClose={() => setBlockModal(null)}
        />
      )}

      {showPageSettings && (
        <PageSettingsModal page={page} onSave={handleSavePage} onClose={() => setShowPageSettings(false)} />
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`rounded-md p-1.5 text-slate-400 transition-colors disabled:pointer-events-none disabled:opacity-30 ${
        danger ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-slate-100 hover:text-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Eye;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors ${
        danger ? "text-red-600 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function CanvasFrame({ desktop, children }: { desktop: boolean; children: React.ReactNode }) {
  return desktop ? <ScaledFrame designWidth={1280}>{children}</ScaledFrame> : <>{children}</>;
}

function CanvasEmpty({ text }: { text: string }) {
  return <div className="px-6 py-24 text-center text-[13px] text-slate-400">{text}</div>;
}
