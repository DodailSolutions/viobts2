"use client";

import React, { useState, useEffect } from "react";
import { cmsStore, PageSectionItem } from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

interface HomeSectionsClientProps {
  initialSections: PageSectionItem[];
}

export function HomeSectionsClient({ initialSections }: HomeSectionsClientProps) {
  const [sections, setSections] = useState<PageSectionItem[]>(initialSections);

  useEffect(() => {
    // Hydrate latest sections from localStorage/cmsStore on client mount
    try {
      cmsStore.hydrateFromStorage();
      const live = cmsStore.getPageSections("pg-home");
      if (live && live.length > 0) {
        setSections(live);
      }
    } catch {
      // Keep initial
    }

    const handleUpdate = () => {
      cmsStore.hydrateFromStorage();
      const updated = cmsStore.getPageSections("pg-home");
      if (updated && updated.length > 0) {
        setSections([...updated]);
      }
    };

    window.addEventListener("cms-storage-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("cms-storage-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
