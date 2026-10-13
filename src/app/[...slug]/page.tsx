import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { cmsStore } from "@/lib/data";
import { DynamicPageClient } from "@/components/dynamic/DynamicPageClient";

interface DynamicPageProps {
  params: { slug: string[] };
}

export const revalidate = 0; // Dynamic SSR for instant CMS updates

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
    const srv = cmsStore.getServiceBySlug(fullSlug);
    if (srv) {
      redirect(`/services/${fullSlug}`);
    }
    const ind = cmsStore.getIndustryBySlug(fullSlug);
    if (ind) {
      redirect(`/industries/${fullSlug}`);
    }
  }

  const sections = page ? cmsStore.getPageSections(page.id) : [];

  return (
    <div className="min-h-screen bg-white">
      <DynamicPageClient
        initialPage={page || null}
        initialSections={sections}
        slug={fullSlug}
      />
    </div>
  );
}
