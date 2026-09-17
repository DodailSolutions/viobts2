import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cmsStore } from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

interface DynamicPageProps {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const fullSlug = params.slug.join("/");
  const page = cmsStore.getPageBySlug(fullSlug);
  if (!page) return { title: "Page Not Found | VIO" };

  return {
    title: page.metaTitle || `${page.title} | VIO`,
    description: page.metaDescription,
  };
}

export default function DynamicCMSPage({ params }: DynamicPageProps) {
  const fullSlug = params.slug.join("/");
  const page = cmsStore.getPageBySlug(fullSlug);

  if (!page) {
    notFound();
  }

  const sections = cmsStore.getPageSections(page.id);

  return (
    <div className="pt-24 pb-20">
      {sections.length > 0 ? (
        sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{page.title}</h1>
          <p className="text-sm text-slate-400">
            This page has been created in the CMS and is awaiting content sections.
          </p>
        </div>
      )}
    </div>
  );
}
