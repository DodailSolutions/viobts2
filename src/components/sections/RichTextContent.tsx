"use client";

import React from "react";

interface RichTextContentProps {
  content?: string;
  eyebrow?: string;
  heading?: string;
}

export function RichTextContent({
  content = "",
  eyebrow,
  heading,
}: RichTextContentProps) {
  return (
    <section className="relative py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-8">
            {heading}
          </h2>
        )}
        <div 
          className="prose max-w-none text-slate-700 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
