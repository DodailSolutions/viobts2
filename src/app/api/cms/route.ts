import { NextRequest, NextResponse } from "next/server";
import { cmsStore } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    success: true,
    sections: cmsStore.getAllPageSections("pg-home"),
    podcasts: cmsStore.getPodcasts(),
    services: cmsStore.getServices(),
    industries: cmsStore.getIndustries(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "sync" && body.data) {
      const d = body.data;
      if (Array.isArray(d.sections)) {
        d.sections.forEach((sec: any) => cmsStore.saveSection(sec));
      }
      if (Array.isArray(d.podcasts)) {
        d.podcasts.forEach((pod: any) => cmsStore.savePodcast(pod));
      }
      if (Array.isArray(d.services)) {
        d.services.forEach((srv: any) => cmsStore.saveService(srv));
      }
      if (Array.isArray(d.industries)) {
        d.industries.forEach((ind: any) => cmsStore.saveIndustry(ind));
      }
      if (d.footerConfig) {
        cmsStore.saveFooterConfig(d.footerConfig);
      }
      if (d.generalSettings) {
        cmsStore.saveGeneralSettings(d.generalSettings);
      }
      if (Array.isArray(d.menus)) {
        d.menus.forEach((m: any) => cmsStore.saveMenu(m));
      }
      return NextResponse.json({ success: true, message: "CMS synchronized" });
    }

    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
