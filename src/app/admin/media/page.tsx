"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Upload, Copy, Check, Trash2, ExternalLink } from "lucide-react";

export default function AdminMediaPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const initialAssets = [
    {
      id: "med-1",
      filename: "vio-logo.png",
      url: "/images/vio-logo.png",
      dimensions: "500x120",
      size: "9.8 KB",
      type: "Official Brand Logo",
    },
    {
      id: "med-2",
      filename: "vio-logo.svg",
      url: "/images/vio-logo.svg",
      dimensions: "Vector",
      size: "1.2 KB",
      type: "Vector Logo Fallback",
    },
    {
      id: "med-3",
      filename: "case-odga.jpg",
      url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      dimensions: "1200x800",
      size: "142 KB",
      type: "Case Study Asset",
    },
    {
      id: "med-4",
      filename: "case-usaid.jpg",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      dimensions: "1200x800",
      size: "185 KB",
      type: "Case Study Asset",
    },
    {
      id: "med-5",
      filename: "case-drivewealth.jpg",
      url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      dimensions: "1200x800",
      size: "138 KB",
      type: "Case Study Asset",
    },
    {
      id: "med-6",
      filename: "blog-methodology.jpg",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      dimensions: "1200x800",
      size: "165 KB",
      type: "Article Featured Image",
    },
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Asset Repository
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Media & Asset Library
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Supabase Storage asset manager for brand logos, client proofs, and editorial imagery.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm">
          <Upload className="w-4 h-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialAssets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
                {asset.filename.endsWith(".svg") || asset.filename.endsWith(".png") ? (
                  <div className="relative w-36 h-14">
                    <Image
                      src={asset.url}
                      alt={asset.filename}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={asset.url}
                    alt={asset.filename}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                    {asset.filename}
                  </p>
                  <span className="text-[10px] text-brand-blue font-semibold">
                    {asset.size}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">{asset.type} • {asset.dimensions}</p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between">
              <button
                onClick={() => handleCopy(asset.url)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
              >
                {copiedUrl === asset.url ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <a
                href={asset.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
