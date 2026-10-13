"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageItem, PageSectionItem, cmsStore } from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { AlertCircle, Edit, Layers, ArrowLeft } from "lucide-react";

interface DynamicPageClientProps {
  initialPage: PageItem | null;
  initialSections: PageSectionItem[];
  slug: string;
}

export function DynamicPageClient({
  initialPage,
  initialSections,
  slug,
}: DynamicPageClientProps) {
  const [page, setPage] = useState<PageItem | null>(initialPage);
  const [sections, setSections] = useState<PageSectionItem[]>(initialSections);

  useEffect(() => {
    // Client-side hydration from localStorage
    try {
      cmsStore.hydrateFromStorage();
      const livePage = cmsStore.getPageBySlug(slug);
      if (livePage) {
        setPage(livePage);
        const liveSections = cmsStore.getPageSections(livePage.id);
        if (liveSections) {
          setSections(liveSections);
        }
      }
    } catch {
      // Keep initial
    }

    const handleUpdate = () => {
      try {
        cmsStore.hydrateFromStorage();
        const livePage = cmsStore.getPageBySlug(slug);
        if (livePage) {
          setPage(livePage);
          const liveSections = cmsStore.getPageSections(livePage.id);
          setSections([...liveSections]);
        }
      } catch {}
    };

    window.addEventListener("cms-storage-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("cms-storage-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [slug]);

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested route <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0c34cd]">/{slug}</code> does not exist or has been removed.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c34cd] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Draft Status Banner */}
      {page.status === "draft" && (
        <div className="sticky top-16 z-30 bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Draft Mode:</strong> This dynamic page is unpublished and currently in preview.
              </span>
            </div>
            <Link
              href={`/admin/pages/${page.id}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Open in Builder</span>
            </Link>
          </div>
        </div>
      )}

      {/* Render Sections */}
      {sections.length > 0 ? (
        <div className="flex flex-col">
          {sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0c34cd] flex items-center justify-center mx-auto border border-blue-100">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">{page.title}</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            This page has been created in the VIO Visual CMS and is ready for modular section assembly.
          </p>
          <div className="pt-2">
            <Link
              href={`/admin/pages/${page.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0c34cd] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Edit className="w-4 h-4" />
              <span>Open Visual Page Builder</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
