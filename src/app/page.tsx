import { cmsStore } from "@/lib/data";
import { HomeSectionsClient } from "@/components/home/HomeSectionsClient";

export const revalidate = 0; // Dynamic SSR for instant CMS updates

export default function HomePage() {
  const sections = cmsStore.getPageSections("pg-home");

  return <HomeSectionsClient initialSections={sections} />;
}
