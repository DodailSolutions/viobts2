import { cmsStore } from "@/lib/data";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export const revalidate = 0; // Dynamic SSR for instant CMS updates

export default function HomePage() {
  const sections = cmsStore.getPageSections("pg-home");

  return (
    <div className="flex flex-col">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
