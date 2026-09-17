import {
  ServiceItem,
  IndustryItem,
  CaseStudyItem,
  BlogItem,
  PodcastItem,
  CareerItem,
  TestimonialItem,
  LeadItem,
  PageItem,
  PageSectionItem,
} from "./types";
import { INITIAL_SERVICES } from "./services-data";
import { INITIAL_INDUSTRIES } from "./industries-data";
import { INITIAL_CASE_STUDIES } from "./case-studies-data";
import {
  INITIAL_BLOGS,
  INITIAL_PODCASTS,
  INITIAL_CAREERS,
  INITIAL_TESTIMONIALS,
  INITIAL_LEADS,
} from "./content-data";
import { INITIAL_PAGES, INITIAL_HOMEPAGE_SECTIONS } from "./pages-data";

export * from "./types";
export * from "./services-data";
export * from "./industries-data";
export * from "./case-studies-data";
export * from "./content-data";
export * from "./pages-data";
export * from "./client-logos-data";

// In-Memory Singleton Store for fast SSR & Admin mutations
class CMSStore {
  private services: ServiceItem[] = [...INITIAL_SERVICES];
  private industries: IndustryItem[] = [...INITIAL_INDUSTRIES];
  private caseStudies: CaseStudyItem[] = [...INITIAL_CASE_STUDIES];
  private blogs: BlogItem[] = [...INITIAL_BLOGS];
  private podcasts: PodcastItem[] = [...INITIAL_PODCASTS];
  private careers: CareerItem[] = [...INITIAL_CAREERS];
  private testimonials: TestimonialItem[] = [...INITIAL_TESTIMONIALS];
  private leads: LeadItem[] = [...INITIAL_LEADS];
  private pages: PageItem[] = [...INITIAL_PAGES];
  private sections: PageSectionItem[] = [...INITIAL_HOMEPAGE_SECTIONS];

  // Pages
  getPages(): PageItem[] {
    return [...this.pages];
  }

  getPageBySlug(slug: string): PageItem | undefined {
    return this.pages.find((p) => p.slug === slug);
  }

  getPageById(id: string): PageItem | undefined {
    return this.pages.find((p) => p.id === id);
  }

  savePage(page: PageItem): void {
    const idx = this.pages.findIndex((p) => p.id === page.id);
    if (idx >= 0) {
      this.pages[idx] = { ...page, updatedAt: new Date().toISOString() };
    } else {
      this.pages.push({ ...page, updatedAt: new Date().toISOString() });
    }
  }

  // Sections
  getPageSections(pageId: string): PageSectionItem[] {
    return this.sections
      .filter((s) => s.pageId === pageId && s.isVisible)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getAllPageSections(pageId: string): PageSectionItem[] {
    return this.sections
      .filter((s) => s.pageId === pageId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  saveSection(section: PageSectionItem): void {
    const idx = this.sections.findIndex((s) => s.id === section.id);
    if (idx >= 0) {
      this.sections[idx] = section;
    } else {
      this.sections.push(section);
    }
  }

  deleteSection(id: string): void {
    this.sections = this.sections.filter((s) => s.id !== id);
  }

  reorderSections(pageId: string, orderedIds: string[]): void {
    orderedIds.forEach((id, index) => {
      const sec = this.sections.find((s) => s.id === id && s.pageId === pageId);
      if (sec) {
        sec.orderIndex = index;
      }
    });
  }

  // Services
  getServices(): ServiceItem[] {
    return [...this.services].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.services.find((s) => s.slug === slug);
  }

  saveService(service: ServiceItem): void {
    const idx = this.services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      this.services[idx] = service;
    } else {
      this.services.push(service);
    }
  }

  deleteService(id: string): void {
    this.services = this.services.filter((s) => s.id !== id);
  }

  // Industries
  getIndustries(): IndustryItem[] {
    return [...this.industries].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getIndustryBySlug(slug: string): IndustryItem | undefined {
    return this.industries.find((i) => i.slug === slug);
  }

  saveIndustry(industry: IndustryItem): void {
    const idx = this.industries.findIndex((i) => i.id === industry.id);
    if (idx >= 0) {
      this.industries[idx] = industry;
    } else {
      this.industries.push(industry);
    }
  }

  deleteIndustry(id: string): void {
    this.industries = this.industries.filter((i) => i.id !== id);
  }

  // Case Studies
  getCaseStudies(): CaseStudyItem[] {
    return [...this.caseStudies].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
    return this.caseStudies.find((c) => c.slug === slug);
  }

  saveCaseStudy(cs: CaseStudyItem): void {
    const idx = this.caseStudies.findIndex((c) => c.id === cs.id);
    if (idx >= 0) {
      this.caseStudies[idx] = cs;
    } else {
      this.caseStudies.push(cs);
    }
  }

  deleteCaseStudy(id: string): void {
    this.caseStudies = this.caseStudies.filter((c) => c.id !== id);
  }

  // Blogs
  getBlogs(): BlogItem[] {
    return [...this.blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  getBlogBySlug(slug: string): BlogItem | undefined {
    return this.blogs.find((b) => b.slug === slug);
  }

  saveBlog(b: BlogItem): void {
    const idx = this.blogs.findIndex((item) => item.id === b.id);
    if (idx >= 0) {
      this.blogs[idx] = b;
    } else {
      this.blogs.push(b);
    }
  }

  deleteBlog(id: string): void {
    this.blogs = this.blogs.filter((b) => b.id !== id);
  }

  // Podcasts
  getPodcasts(): PodcastItem[] {
    return [...this.podcasts];
  }

  savePodcast(p: PodcastItem): void {
    const idx = this.podcasts.findIndex((item) => item.id === p.id);
    if (idx >= 0) {
      this.podcasts[idx] = p;
    } else {
      this.podcasts.push(p);
    }
  }

  // Careers
  getCareers(): CareerItem[] {
    return [...this.careers];
  }

  saveCareer(c: CareerItem): void {
    const idx = this.careers.findIndex((item) => item.id === c.id);
    if (idx >= 0) {
      this.careers[idx] = c;
    } else {
      this.careers.push(c);
    }
  }

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    return [...this.testimonials];
  }

  saveTestimonial(t: TestimonialItem): void {
    const idx = this.testimonials.findIndex((item) => item.id === t.id);
    if (idx >= 0) {
      this.testimonials[idx] = t;
    } else {
      this.testimonials.push(t);
    }
  }

  // Leads
  getLeads(): LeadItem[] {
    return [...this.leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  submitLead(data: Omit<LeadItem, "id" | "createdAt" | "status">): LeadItem {
    const newLead: LeadItem = {
      ...data,
      id: "lead-" + Date.now(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  updateLeadStatus(id: string, status: LeadItem["status"], notes?: string): void {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
    }
  }
}

// Global persistent instance across Next.js reloads
declare global {
  var __vio_cms_store__: CMSStore | undefined;
}

export const cmsStore = globalThis.__vio_cms_store__ ?? new CMSStore();
if (process.env.NODE_ENV !== "production") {
  globalThis.__vio_cms_store__ = cmsStore;
}
