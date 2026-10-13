"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { PageItem } from "@/lib/data";
import { AVAILABLE_BLOCKS, BLOCK_CATEGORIES, BlockCategory } from "./blockRegistry";
import { TextInput, TextArea, SelectInput } from "./fields";

function ModalShell({
  title,
  description,
  onClose,
  width = "max-w-lg",
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`flex max-h-[85vh] w-full ${width} flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {description && <p className="mt-0.5 text-[13px] text-slate-500">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function BlockLibraryModal({
  insertAfterLabel,
  onSelect,
  onClose,
}: {
  insertAfterLabel?: string;
  onSelect: (type: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlockCategory | "all">("all");

  const q = query.toLowerCase();
  const blocks = AVAILABLE_BLOCKS.filter(
    (b) =>
      (category === "all" || b.category === category) &&
      (b.label.toLowerCase().includes(q) || b.description.toLowerCase().includes(q))
  );

  return (
    <ModalShell
      title="Add section"
      description={insertAfterLabel ? `Will be inserted after “${insertAfterLabel}”` : "Will be added to the end of the page"}
      onClose={onClose}
      width="max-w-2xl"
    >
      <div className="space-y-3 border-b border-slate-100 px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-[13px] focus:border-[#0c34cd] focus:outline-none focus:ring-2 focus:ring-[#0c34cd]/15"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {BLOCK_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === c.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-2 overflow-y-auto p-4 sm:grid-cols-2">
        {blocks.map((b) => {
          const Icon = b.icon;
          return (
            <button
              key={b.type}
              onClick={() => onSelect(b.type)}
              className="group flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-left transition-all hover:border-[#0c34cd]/40 hover:bg-blue-50/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-[#0c34cd] group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-medium text-slate-900">{b.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500">{b.description}</span>
              </span>
            </button>
          );
        })}
        {blocks.length === 0 && (
          <p className="col-span-full py-10 text-center text-[13px] text-slate-400">No sections match “{query}”.</p>
        )}
      </div>
    </ModalShell>
  );
}

export function PageSettingsModal({
  page,
  onSave,
  onClose,
}: {
  page: PageItem;
  onSave: (page: PageItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PageItem>({ ...page });
  const isHome = page.id === "pg-home";

  return (
    <ModalShell title="Page settings" description="URL, publishing status and search engine metadata." onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.title.trim() || !form.slug.trim()) return;
          onSave(form);
        }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="space-y-4 overflow-y-auto px-6 py-5">
          <TextInput label="Page title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          {isHome ? (
            <TextInput label="URL slug" value="/" onChange={() => {}} mono hint="The home page URL can't be changed." />
          ) : (
            <TextInput
              label="URL slug"
              value={form.slug}
              mono
              onChange={(v) => setForm({ ...form, slug: v.toLowerCase().replace(/[^a-z0-9\-\/]/g, "") })}
              hint="Lowercase letters, numbers, hyphens and slashes only."
            />
          )}
          <SelectInput
            label="Status"
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v as PageItem["status"] })}
            options={[
              { value: "published", label: "Published" },
              { value: "draft", label: "Draft" },
              { value: "archived", label: "Archived" },
            ]}
          />
          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-[13px] font-semibold text-slate-900">Search engine listing</p>
            <div className="space-y-4">
              <TextInput
                label="Meta title"
                value={form.metaTitle}
                onChange={(v) => setForm({ ...form, metaTitle: v })}
                hint={`${(form.metaTitle || "").length}/60 characters`}
              />
              <TextArea
                label="Meta description"
                value={form.metaDescription}
                onChange={(v) => setForm({ ...form, metaDescription: v })}
                hint={`${(form.metaDescription || "").length}/160 characters`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-3">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-[#0c34cd] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#0a2bb0]">
            Save settings
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
