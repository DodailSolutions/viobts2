"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-[#0c34cd] focus:outline-none focus:ring-2 focus:ring-[#0c34cd]/15";

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, hint, children, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

interface TextInputProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  mono?: boolean;
  className?: string;
}

export function TextInput({ label, value, onChange, placeholder, hint, mono, className }: TextInputProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <input
        type="text"
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${mono ? "font-mono text-xs" : ""}`}
      />
    </Field>
  );
}

interface TextAreaProps extends TextInputProps {
  rows?: number;
}

export function TextArea({ label, value, onChange, placeholder, hint, mono, rows = 3, className }: TextAreaProps) {
  return (
    <Field label={label} hint={hint} className={className}>
      <textarea
        rows={rows}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} resize-y leading-relaxed ${mono ? "font-mono text-xs" : ""}`}
      />
    </Field>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputBase}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** A titled group of fields inside the inspector. */
export function FieldGroup({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-100 px-5 py-5 last:border-b-0">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-slate-900">{title}</h4>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#0c34cd] transition-colors hover:bg-blue-50"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

/** Collapsible card for one entry in a repeatable list (logos, FAQs, stats...). */
export function RepeaterItem({
  title,
  subtitle,
  onDelete,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="group flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          aria-expanded={open}
        >
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "" : "-rotate-90"}`}
          />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-slate-800">{title || "Untitled"}</span>
            {subtitle && <span className="block truncate text-[11px] text-slate-400">{subtitle}</span>}
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Remove "${title || "this item"}"?`)) onDelete();
          }}
          className="rounded-md p-1.5 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
          aria-label="Remove item"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {open && <div className="space-y-3 border-t border-slate-100 bg-slate-50/60 p-3">{children}</div>}
    </div>
  );
}
