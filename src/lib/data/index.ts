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
import { INITIAL_SERVICES, SERVICE_SLUG_ALIASES } from "./services-data";
import { INITIAL_INDUSTRIES, INDUSTRY_SLUG_ALIASES } from "./industries-data";
import { INITIAL_CASE_STUDIES } from "./case-studies-data";
import {
  INITIAL_BLOGS,
  INITIAL_PODCASTS,
  INITIAL_CAREERS,
  INITIAL_TESTIMONIALS,
  INITIAL_LEADS,
} from "./content-data";
import { INITIAL_PAGES, INITIAL_HOMEPAGE_SECTIONS } from "./pages-data";
import {
  INITIAL_ADMIN_USERS,
  INITIAL_ROLE_DEFINITIONS,
  INITIAL_AUDIT_LOGS,
} from "./users-data";
import {
  INITIAL_SITE_SEO_SETTINGS,
  INITIAL_PAGE_SEO_CONFIGS,
  INITIAL_REDIRECTS,
} from "./seo-data";
import { INITIAL_FOOTER_CONFIG } from "./footer-data";
import { INITIAL_GENERAL_SETTINGS, INITIAL_SECURITY_SETTINGS } from "./settings-data";
import { INITIAL_MENUS } from "./menu-data";
import { INITIAL_LOCAL_SEO_SETTINGS, generateLocalBusinessSchema } from "./local-seo-data";
import {
  AdminUserItem,
  RoleDefinitionItem,
  SecurityAuditLogItem,
  PageSEOConfig,
  SiteSEOSettings,
  RedirectItem,
  FooterConfig,
  AppGeneralSettings,
  AppSecuritySettings,
  AppApiKey,
  NavigationMenu,
  MenuItem,
  MenuPlacement,
  LocalSEOSettings,
  LocalBranch,
} from "./types";

export * from "./types";
export * from "./services-data";
export * from "./industries-data";
export * from "./case-studies-data";
export * from "./content-data";
export * from "./pages-data";
export * from "./client-logos-data";
export * from "./users-data";
export * from "./seo-data";
export * from "./footer-data";
export * from "./settings-data";
export * from "./menu-data";
export * from "./local-seo-data";

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
  private users: AdminUserItem[] = [...INITIAL_ADMIN_USERS];
  private roles: RoleDefinitionItem[] = [...INITIAL_ROLE_DEFINITIONS];
  private auditLogs: SecurityAuditLogItem[] = [...INITIAL_AUDIT_LOGS];
  private siteSeoSettings: SiteSEOSettings = { ...INITIAL_SITE_SEO_SETTINGS };
  private pageSeoConfigs: PageSEOConfig[] = [...INITIAL_PAGE_SEO_CONFIGS];
  private redirects: RedirectItem[] = [...INITIAL_REDIRECTS];
  private footerConfig: FooterConfig = { ...INITIAL_FOOTER_CONFIG };
  private generalSettings: AppGeneralSettings = { ...INITIAL_GENERAL_SETTINGS };
  private securitySettings: AppSecuritySettings = { ...INITIAL_SECURITY_SETTINGS };
  private menus: NavigationMenu[] = [...INITIAL_MENUS];
  private localSeoSettings: LocalSEOSettings = { ...INITIAL_LOCAL_SEO_SETTINGS };
  private isHydrated = false;

  constructor() {
    this.hydrateFromStorage();
  }

  public hydrateFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("vio_cms_data_v1");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data.sections) && data.sections.length > 0) this.sections = data.sections;
      if (Array.isArray(data.pages) && data.pages.length > 0) this.pages = data.pages;
      if (Array.isArray(data.services) && data.services.length > 0) this.services = data.services;
      if (Array.isArray(data.industries) && data.industries.length > 0) this.industries = data.industries;
      if (Array.isArray(data.caseStudies) && data.caseStudies.length > 0) this.caseStudies = data.caseStudies;
      if (Array.isArray(data.blogs) && data.blogs.length > 0) this.blogs = data.blogs;
      if (Array.isArray(data.podcasts) && data.podcasts.length > 0) this.podcasts = data.podcasts;
      if (Array.isArray(data.careers) && data.careers.length > 0) this.careers = data.careers;
      if (Array.isArray(data.testimonials) && data.testimonials.length > 0) this.testimonials = data.testimonials;
      if (Array.isArray(data.leads)) this.leads = data.leads;
      if (data.footerConfig && typeof data.footerConfig === "object") this.footerConfig = data.footerConfig;
      if (data.generalSettings && typeof data.generalSettings === "object") this.generalSettings = data.generalSettings;
      if (data.securitySettings && typeof data.securitySettings === "object") this.securitySettings = data.securitySettings;
      if (Array.isArray(data.menus) && data.menus.length > 0) this.menus = data.menus;
      if (Array.isArray(data.pageSeoConfigs)) this.pageSeoConfigs = data.pageSeoConfigs;
      if (data.siteSeoSettings && typeof data.siteSeoSettings === "object") this.siteSeoSettings = data.siteSeoSettings;
      if (data.localSeoSettings && typeof data.localSeoSettings === "object") this.localSeoSettings = data.localSeoSettings;
      if (Array.isArray(data.redirects)) this.redirects = data.redirects;
      this.isHydrated = true;
    } catch (e) {
      console.warn("Failed to parse CMS data from localStorage:", e);
    }
  }

  private persist(): void {
    if (typeof window === "undefined") return;
    try {
      const snapshot = {
        sections: this.sections,
        pages: this.pages,
        services: this.services,
        industries: this.industries,
        caseStudies: this.caseStudies,
        blogs: this.blogs,
        podcasts: this.podcasts,
        careers: this.careers,
        testimonials: this.testimonials,
        leads: this.leads,
        footerConfig: this.footerConfig,
        generalSettings: this.generalSettings,
        securitySettings: this.securitySettings,
        menus: this.menus,
        pageSeoConfigs: this.pageSeoConfigs,
        siteSeoSettings: this.siteSeoSettings,
        localSeoSettings: this.localSeoSettings,
        redirects: this.redirects,
      };
      localStorage.setItem("vio_cms_data_v1", JSON.stringify(snapshot));
      window.dispatchEvent(new CustomEvent("cms-storage-update", { detail: { timestamp: Date.now() } }));

      // Asynchronously sync to server API
      fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync", data: snapshot }),
      }).catch(() => {});
    } catch (e) {
      console.warn("Failed to persist CMS data to localStorage:", e);
    }
  }
  getPages(): PageItem[] {
    this.hydrateFromStorage();
    return [...this.pages];
  }

  getPageBySlug(slug: string): PageItem | undefined {
    this.hydrateFromStorage();
    return this.pages.find((p) => p.slug === slug);
  }

  getPageById(id: string): PageItem | undefined {
    this.hydrateFromStorage();
    return this.pages.find((p) => p.id === id);
  }

  savePage(page: PageItem): void {
    const idx = this.pages.findIndex((p) => p.id === page.id);
    if (idx >= 0) {
      this.pages[idx] = { ...page, updatedAt: new Date().toISOString() };
    } else {
      this.pages.push({ ...page, updatedAt: new Date().toISOString() });
    }
    this.persist();
  }

  deletePage(id: string): boolean {
    if (id === "pg-home") return false; // Homepage is protected
    this.hydrateFromStorage();
    this.pages = this.pages.filter((p) => p.id !== id);
    this.sections = this.sections.filter((s) => s.pageId !== id);
    this.persist();
    return true;
  }

  duplicatePage(id: string, newTitle?: string, newSlug?: string): PageItem | null {
    this.hydrateFromStorage();
    const sourcePage = this.pages.find((p) => p.id === id);
    if (!sourcePage) return null;

    const baseSlug = newSlug || `${sourcePage.slug}-copy-${Date.now().toString().slice(-4)}`;
    const newId = `pg-${baseSlug.replace(/\//g, "-").toLowerCase()}`;
    const cloneTitle = newTitle || `${sourcePage.title} (Copy)`;

    const newPage: PageItem = {
      ...sourcePage,
      id: newId,
      slug: baseSlug,
      title: cloneTitle,
      metaTitle: `${cloneTitle} | VIO`,
      status: "draft",
      updatedAt: new Date().toISOString(),
    };
    this.pages.push(newPage);

    // Duplicate all sections from source page
    const sourceSections = this.sections.filter((s) => s.pageId === id);
    sourceSections.forEach((s) => {
      this.sections.push({
        ...JSON.parse(JSON.stringify(s)),
        id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        pageId: newId,
      });
    });

    this.persist();
    return newPage;
  }

  createPageWithTemplate(
    data: { title: string; slug: string; metaTitle?: string; metaDescription?: string; status?: PageItem["status"] },
    templateType: string = "blank"
  ): PageItem {
    this.hydrateFromStorage();
    const cleanSlug = data.slug.toLowerCase().trim().replace(/^\//, "");
    const pageId = "pg-" + cleanSlug.replace(/\//g, "-");
    const pageTitle = data.title.trim();

    const newPage: PageItem = {
      id: pageId,
      slug: cleanSlug,
      title: pageTitle,
      metaTitle: data.metaTitle?.trim() || `${pageTitle} | VIO`,
      metaDescription: data.metaDescription?.trim() || `Enterprise solutions and capabilities by VIO LLC. Measure → Analyse → Improve.`,
      status: data.status || "published",
      updatedAt: new Date().toISOString(),
    };

    this.savePage(newPage);

    // Populate initial modular template sections
    if (templateType === "landing") {
      const templateSections: PageSectionItem[] = [
        {
          id: `sec-${Date.now()}-1`,
          pageId,
          componentType: "HeroBanner",
          orderIndex: 0,
          isVisible: true,
          props: {
            eyebrow: "WE ARE YOUR TECHNOLOGY PARTNER",
            headline: pageTitle,
            highlightText: pageTitle.split(" ").pop() || "Excellence",
            subheading: "Cutting-edge technology solutions to deliver excellence applying best practices, scalable architecture, and expert talent.",
            badge: "VA-SWaM Certified • Richmond, Virginia • 10+ Years Track Record",
            primaryCtaText: "Book a Consultation",
            primaryCtaLink: "https://calendly.com/viobts/consultation",
            secondaryCtaText: "Explore Capabilities",
            secondaryCtaLink: "/services",
            imageSrc: "/images/hero-graphic.png",
          },
        },
        {
          id: `sec-${Date.now()}-2`,
          pageId,
          componentType: "StatsCounter",
          orderIndex: 1,
          isVisible: true,
          props: {
            eyebrow: "PROVEN IMPACT",
            heading: "Quantified Enterprise Velocity",
            stats: [
              { label: "Delivery Acceleration", value: "3.5x", description: "Sprint deployment cycle velocity" },
              { label: "Certified Engineers", value: "100%", description: "Vetted senior architecture squad" },
              { label: "Data Quality Score", value: "99.9%", description: "Enterprise telemetry fidelity" },
              { label: "Client NPS Score", value: "+84", description: "Verified executive satisfaction" },
            ],
          },
        },
        {
          id: `sec-${Date.now()}-3`,
          pageId,
          componentType: "MeetOurClients",
          orderIndex: 2,
          isVisible: true,
          props: {},
        },
        {
          id: `sec-${Date.now()}-4`,
          pageId,
          componentType: "BusinessProblems",
          orderIndex: 3,
          isVisible: true,
          props: {
            eyebrow: "SOLVING HIGH-FRICTION CHALLENGES",
            heading: "Transforming Critical Enterprise Bottlenecks",
            subheading: "How VIO bridges fragmented architectures into unified, resilient production systems.",
          },
        },
        {
          id: `sec-${Date.now()}-5`,
          pageId,
          componentType: "TestimonialsSlider",
          orderIndex: 4,
          isVisible: true,
          props: {
            eyebrow: "TESTIMONIALS & TRUST",
            heading: "What Executive Leaders Say About Partnering with VIO",
          },
        },
        {
          id: `sec-${Date.now()}-6`,
          pageId,
          componentType: "CTABanner",
          orderIndex: 5,
          isVisible: true,
          props: {
            eyebrow: "GET STARTED WITH VIO",
            heading: "Ready to Accelerate Your Enterprise Roadmap?",
            subheading: "Schedule a high-impact architectural alignment session with our principal technology squad.",
            primaryCtaText: "Schedule Call",
            primaryCtaLink: "https://calendly.com/viobts/consultation",
            secondaryCtaText: "Contact Us",
            secondaryCtaLink: "/contact",
          },
        },
      ];
      templateSections.forEach((s) => this.saveSection(s));
    } else if (templateType === "service") {
      const templateSections: PageSectionItem[] = [
        {
          id: `sec-${Date.now()}-1`,
          pageId,
          componentType: "HeroBanner",
          orderIndex: 0,
          isVisible: true,
          props: {
            eyebrow: "ENTERPRISE CAPABILITIES",
            headline: pageTitle,
            highlightText: pageTitle.split(" ").pop() || "Capabilities",
            subheading: "Architectural rigor, cloud-native scalability, and measurable ROI delivered by senior practitioners.",
            badge: "Measure → Analyse → Improve",
            primaryCtaText: "Engage Architecture Squad",
            primaryCtaLink: "https://calendly.com/viobts/consultation",
            secondaryCtaText: "View Case Studies",
            secondaryCtaLink: "/case-studies",
          },
        },
        {
          id: `sec-${Date.now()}-2`,
          pageId,
          componentType: "CapabilitiesGrid",
          orderIndex: 1,
          isVisible: true,
          props: {
            eyebrow: "FULL-SPECTRUM COMPETENCIES",
            heading: "Core Architecture & Engineering Pillars",
            subheading: "End-to-end delivery frameworks engineered for mission-critical reliability.",
          },
        },
        {
          id: `sec-${Date.now()}-3`,
          pageId,
          componentType: "Methodology",
          orderIndex: 2,
          isVisible: true,
          props: {
            eyebrow: "THE VIO FORMULA",
            heading: "Measure → Analyse → Improve",
            subheading: "Our rigorous 3-stage visual architecture methodology guarantees verifiable outcomes.",
          },
        },
        {
          id: `sec-${Date.now()}-4`,
          pageId,
          componentType: "CaseStudyShowcase",
          orderIndex: 3,
          isVisible: true,
          props: {
            eyebrow: "VERIFIED CASE STUDIES",
            heading: "Proven Results Across Tier-1 Clients",
          },
        },
        {
          id: `sec-${Date.now()}-5`,
          pageId,
          componentType: "AccordionFAQ",
          orderIndex: 4,
          isVisible: true,
          props: {
            eyebrow: "FREQUENTLY ASKED QUESTIONS",
            heading: `FAQ Regarding ${pageTitle}`,
          },
        },
        {
          id: `sec-${Date.now()}-6`,
          pageId,
          componentType: "CTABanner",
          orderIndex: 5,
          isVisible: true,
          props: {
            eyebrow: "ACCELERATE TODAY",
            heading: `Let's architect your next-generation solution.`,
            primaryCtaText: "Book Architecture Call",
            primaryCtaLink: "https://calendly.com/viobts/consultation",
          },
        },
      ];
      templateSections.forEach((s) => this.saveSection(s));
    } else if (templateType === "about") {
      const templateSections: PageSectionItem[] = [
        {
          id: `sec-${Date.now()}-1`,
          pageId,
          componentType: "HeroBanner",
          orderIndex: 0,
          isVisible: true,
          props: {
            eyebrow: "WHO WE ARE",
            headline: pageTitle,
            highlightText: "Mission",
            subheading: "Founder-led, woman-owned VA-SWaM certified technology consulting partner with over a decade of enterprise excellence.",
            badge: "Richmond, Virginia • VA-SWaM Certified • 10+ Years",
            primaryCtaText: "Our Story",
            primaryCtaLink: "/who-we-are",
            secondaryCtaText: "Leadership Team",
            secondaryCtaLink: "/who-we-are#team",
          },
        },
        {
          id: `sec-${Date.now()}-2`,
          pageId,
          componentType: "SplitImageText",
          orderIndex: 1,
          isVisible: true,
          props: {
            eyebrow: "OUR PHILOSOPHY",
            heading: "Think Bigger, Build Smarter, Solve Harder",
            description: "At VIO, we believe that true transformation is not about buzzwords—it is about rigorous measurement, empirical analysis, and systematic improvement. We partner with public sector pioneers and Fortune 500 enterprises to solve their most complex technical hurdles.",
            bullets: [
              "100% founder-led engineering accountability",
              "Certified VA-SWaM Small, Women-owned business partner",
              "Deep expertise across cloud, AI, microservices, and big data",
              "Strict adherence to security, compliance, and enterprise SLAs",
            ],
            imagePosition: "right",
            ctaText: "Learn More About VIO",
            ctaLink: "/who-we-are",
          },
        },
        {
          id: `sec-${Date.now()}-3`,
          pageId,
          componentType: "Methodology",
          orderIndex: 2,
          isVisible: true,
          props: {},
        },
        {
          id: `sec-${Date.now()}-4`,
          pageId,
          componentType: "MeetOurClients",
          orderIndex: 3,
          isVisible: true,
          props: {},
        },
        {
          id: `sec-${Date.now()}-5`,
          pageId,
          componentType: "CTABanner",
          orderIndex: 4,
          isVisible: true,
          props: {
            heading: "Partner with VIO to Accelerate Your Enterprise",
          },
        },
      ];
      templateSections.forEach((s) => this.saveSection(s));
    }

    this.persist();
    return newPage;
  }

  // Sections
  getPageSections(pageId: string): PageSectionItem[] {
    this.hydrateFromStorage();
    return this.sections
      .filter((s) => s.pageId === pageId && s.isVisible)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getAllPageSections(pageId: string): PageSectionItem[] {
    this.hydrateFromStorage();
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
    this.persist();
  }

  duplicateSection(sectionId: string): PageSectionItem | null {
    this.hydrateFromStorage();
    const secIndex = this.sections.findIndex((s) => s.id === sectionId);
    if (secIndex === -1) return null;
    const source = this.sections[secIndex];

    const cloned: PageSectionItem = {
      ...JSON.parse(JSON.stringify(source)),
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderIndex: source.orderIndex + 1,
    };

    // Increment subsequent order indexes
    this.sections.forEach((s) => {
      if (s.pageId === source.pageId && s.orderIndex > source.orderIndex) {
        s.orderIndex += 1;
      }
    });

    this.sections.splice(secIndex + 1, 0, cloned);
    this.persist();
    return cloned;
  }

  deleteSection(id: string): void {
    this.sections = this.sections.filter((s) => s.id !== id);
    this.persist();
  }

  reorderSections(pageId: string, orderedIds: string[]): void {
    orderedIds.forEach((id, index) => {
      const sec = this.sections.find((s) => s.id === id && s.pageId === pageId);
      if (sec) {
        sec.orderIndex = index;
      }
    });
    this.persist();
  }

  // Services
  getServices(): ServiceItem[] {
    this.hydrateFromStorage();
    return [...this.services].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    this.hydrateFromStorage();
    const target = SERVICE_SLUG_ALIASES[slug] || slug;
    return this.services.find((s) => s.slug === target || s.slug === slug);
  }

  saveService(service: ServiceItem): void {
    const idx = this.services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      this.services[idx] = service;
    } else {
      this.services.push(service);
    }
    this.persist();
  }

  deleteService(id: string): void {
    this.services = this.services.filter((s) => s.id !== id);
    this.persist();
  }

  // Industries
  getIndustries(): IndustryItem[] {
    this.hydrateFromStorage();
    return [...this.industries].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getIndustryBySlug(slug: string): IndustryItem | undefined {
    this.hydrateFromStorage();
    const target = INDUSTRY_SLUG_ALIASES[slug] || slug;
    return this.industries.find((i) => i.slug === target || i.slug === slug);
  }

  saveIndustry(industry: IndustryItem): void {
    const idx = this.industries.findIndex((i) => i.id === industry.id);
    if (idx >= 0) {
      this.industries[idx] = industry;
    } else {
      this.industries.push(industry);
    }
    this.persist();
  }

  deleteIndustry(id: string): void {
    this.industries = this.industries.filter((i) => i.id !== id);
    this.persist();
  }

  // Case Studies
  getCaseStudies(): CaseStudyItem[] {
    this.hydrateFromStorage();
    return [...this.caseStudies].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
    this.hydrateFromStorage();
    return this.caseStudies.find((c) => c.slug === slug);
  }

  saveCaseStudy(cs: CaseStudyItem): void {
    const idx = this.caseStudies.findIndex((c) => c.id === cs.id);
    if (idx >= 0) {
      this.caseStudies[idx] = cs;
    } else {
      this.caseStudies.push(cs);
    }
    this.persist();
  }

  deleteCaseStudy(id: string): void {
    this.caseStudies = this.caseStudies.filter((c) => c.id !== id);
    this.persist();
  }

  // Blogs
  getBlogs(): BlogItem[] {
    this.hydrateFromStorage();
    return [...this.blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  getBlogBySlug(slug: string): BlogItem | undefined {
    this.hydrateFromStorage();
    return this.blogs.find((b) => b.slug === slug);
  }

  saveBlog(b: BlogItem): void {
    const idx = this.blogs.findIndex((item) => item.id === b.id);
    if (idx >= 0) {
      this.blogs[idx] = b;
    } else {
      this.blogs.push(b);
    }
    this.persist();
  }

  deleteBlog(id: string): void {
    this.blogs = this.blogs.filter((b) => b.id !== id);
    this.persist();
  }

  // Podcasts
  getPodcasts(): PodcastItem[] {
    this.hydrateFromStorage();
    return [...this.podcasts];
  }

  savePodcast(p: PodcastItem): void {
    const idx = this.podcasts.findIndex((item) => item.id === p.id);
    if (idx >= 0) {
      this.podcasts[idx] = p;
    } else {
      this.podcasts.push(p);
    }
    this.persist();
  }

  deletePodcast(id: string): void {
    this.podcasts = this.podcasts.filter((p) => p.id !== id);
    this.persist();
  }

  // Careers
  getCareers(): CareerItem[] {
    this.hydrateFromStorage();
    return [...this.careers];
  }

  saveCareer(c: CareerItem): void {
    const idx = this.careers.findIndex((item) => item.id === c.id);
    if (idx >= 0) {
      this.careers[idx] = c;
    } else {
      this.careers.push(c);
    }
    this.persist();
  }

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    this.hydrateFromStorage();
    return [...this.testimonials];
  }

  saveTestimonial(t: TestimonialItem): void {
    const idx = this.testimonials.findIndex((item) => item.id === t.id);
    if (idx >= 0) {
      this.testimonials[idx] = t;
    } else {
      this.testimonials.push(t);
    }
    this.persist();
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

  // User & Role Management
  getUsers(): AdminUserItem[] {
    this.hydrateFromStorage();
    return [...this.users];
  }

  getUserById(id: string): AdminUserItem | undefined {
    this.hydrateFromStorage();
    return this.users.find((u) => u.id === id);
  }

  saveUser(user: AdminUserItem): void {
    const idx = this.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      this.users[idx] = user;
    } else {
      this.users.unshift(user);
    }
    this.persist();
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
    this.persist();
  }

  getRoles(): RoleDefinitionItem[] {
    this.hydrateFromStorage();
    return [...this.roles];
  }

  saveRole(role: RoleDefinitionItem): void {
    const idx = this.roles.findIndex((r) => r.id === role.id);
    if (idx >= 0) {
      this.roles[idx] = role;
    } else {
      this.roles.push(role);
    }
    this.persist();
  }

  deleteRole(roleId: string): void {
    this.roles = this.roles.filter((r) => r.id !== roleId);
    this.persist();
  }

  getAuditLogs(): SecurityAuditLogItem[] {
    return [...this.auditLogs];
  }

  addAuditLog(log: Omit<SecurityAuditLogItem, "id">): void {
    const newLog: SecurityAuditLogItem = {
      ...log,
      id: "aud-" + Date.now(),
    };
    this.auditLogs.unshift(newLog);
  }

  // SEO & Technical Configuration
  getSiteSEOSettings(): SiteSEOSettings {
    this.hydrateFromStorage();
    return { ...this.siteSeoSettings };
  }

  saveSiteSEOSettings(settings: SiteSEOSettings): void {
    this.siteSeoSettings = { ...settings };
    this.persist();
  }

  getPageSEOConfigs(): PageSEOConfig[] {
    this.hydrateFromStorage();
    return this.pageSeoConfigs.map((cfg) => {
      const initial = INITIAL_PAGE_SEO_CONFIGS.find((i) => i.pageId === cfg.pageId);
      return {
        ...cfg,
        secondaryKeywords: (cfg.secondaryKeywords && cfg.secondaryKeywords.length > 0)
          ? cfg.secondaryKeywords
          : (initial?.secondaryKeywords || []),
      };
    });
  }

  getPageSEOConfig(pageId: string): PageSEOConfig | undefined {
    this.hydrateFromStorage();
    const cfg = this.pageSeoConfigs.find((c) => c.pageId === pageId);
    if (!cfg) return undefined;
    const initial = INITIAL_PAGE_SEO_CONFIGS.find((i) => i.pageId === pageId);
    return {
      ...cfg,
      secondaryKeywords: (cfg.secondaryKeywords && cfg.secondaryKeywords.length > 0)
        ? cfg.secondaryKeywords
        : (initial?.secondaryKeywords || []),
    };
  }

  savePageSEOConfig(config: PageSEOConfig): void {
    const idx = this.pageSeoConfigs.findIndex((c) => c.pageId === config.pageId);
    if (idx >= 0) {
      this.pageSeoConfigs[idx] = config;
    } else {
      this.pageSeoConfigs.push(config);
    }
    this.persist();
  }

  getRedirects(): RedirectItem[] {
    this.hydrateFromStorage();
    return [...this.redirects];
  }

  saveRedirect(redirect: RedirectItem): void {
    const idx = this.redirects.findIndex((r) => r.id === redirect.id);
    if (idx >= 0) {
      this.redirects[idx] = redirect;
    } else {
      this.redirects.push(redirect);
    }
    this.persist();
  }

  deleteRedirect(id: string): void {
    this.redirects = this.redirects.filter((r) => r.id !== id);
    this.persist();
  }

  // Footer Management
  getFooterConfig(): FooterConfig {
    this.hydrateFromStorage();
    const raw = this.footerConfig || {};
    return {
      ...INITIAL_FOOTER_CONFIG,
      ...raw,
      deviceSettings: {
        mobile: {
          ...INITIAL_FOOTER_CONFIG.deviceSettings.mobile,
          ...(raw.deviceSettings?.mobile || {}),
        },
        tablet: {
          ...INITIAL_FOOTER_CONFIG.deviceSettings.tablet,
          ...(raw.deviceSettings?.tablet || {}),
        },
        desktop: {
          ...INITIAL_FOOTER_CONFIG.deviceSettings.desktop,
          ...(raw.deviceSettings?.desktop || {}),
        },
      },
      socialLinks: (raw.socialLinks && raw.socialLinks.length > 0)
        ? raw.socialLinks
        : INITIAL_FOOTER_CONFIG.socialLinks,
    };
  }

  saveFooterConfig(config: FooterConfig): void {
    this.footerConfig = JSON.parse(JSON.stringify(config));
    this.persist();
  }

  resetFooterConfig(): void {
    this.footerConfig = JSON.parse(JSON.stringify(INITIAL_FOOTER_CONFIG));
    this.persist();
  }

  // General Application Settings
  getGeneralSettings(): AppGeneralSettings {
    this.hydrateFromStorage();
    const raw = this.generalSettings || {};
    return {
      ...INITIAL_GENERAL_SETTINGS,
      ...raw,
      typography: {
        ...INITIAL_GENERAL_SETTINGS.typography,
        ...(raw.typography || {}),
      },
      contentWorkflow: {
        ...INITIAL_GENERAL_SETTINGS.contentWorkflow,
        ...(raw.contentWorkflow || {}),
      },
      announcementBanner: {
        ...INITIAL_GENERAL_SETTINGS.announcementBanner,
        ...(raw.announcementBanner || {}),
      },
    };
  }

  saveGeneralSettings(settings: AppGeneralSettings): void {
    this.generalSettings = JSON.parse(JSON.stringify(settings));
    this.persist();
  }

  // Application Security Settings
  getSecuritySettings(): AppSecuritySettings {
    this.hydrateFromStorage();
    return JSON.parse(JSON.stringify(this.securitySettings));
  }

  saveSecuritySettings(settings: AppSecuritySettings): void {
    this.securitySettings = JSON.parse(JSON.stringify(settings));
    this.persist();
  }

  toggleMaintenanceMode(): boolean {
    this.securitySettings.maintenanceMode = !this.securitySettings.maintenanceMode;
    this.persist();
    return this.securitySettings.maintenanceMode;
  }

  addApiKey(key: AppApiKey): void {
    this.securitySettings.apiKeys.unshift(key);
    this.persist();
  }

  revokeApiKey(keyId: string): void {
    this.securitySettings.apiKeys = this.securitySettings.apiKeys.filter((k) => k.id !== keyId);
    this.persist();
  }

  addBlockedIp(ip: string): void {
    const clean = ip.trim();
    if (clean && !this.securitySettings.blockedIps.includes(clean)) {
      this.securitySettings.blockedIps.push(clean);
      this.persist();
    }
  }

  removeBlockedIp(ip: string): void {
    this.securitySettings.blockedIps = this.securitySettings.blockedIps.filter((item) => item !== ip);
    this.persist();
  }

  addWhitelistedIp(ip: string): void {
    const clean = ip.trim();
    if (clean && !this.securitySettings.ipWhitelist.includes(clean)) {
      this.securitySettings.ipWhitelist.push(clean);
      this.persist();
    }
  }

  removeWhitelistedIp(ip: string): void {
    this.securitySettings.ipWhitelist = this.securitySettings.ipWhitelist.filter((item) => item !== ip);
    this.persist();
  }

  // Navigation Menus & Placements
  getMenus(): NavigationMenu[] {
    this.hydrateFromStorage();
    return JSON.parse(JSON.stringify(this.menus));
  }

  getMenuById(id: string): NavigationMenu | undefined {
    this.hydrateFromStorage();
    const menu = this.menus.find((m) => m.id === id);
    return menu ? JSON.parse(JSON.stringify(menu)) : undefined;
  }

  getMenuByPlacement(placement: MenuPlacement): NavigationMenu | undefined {
    this.hydrateFromStorage();
    const menu = this.menus.find((m) => m.placement === placement && m.isActive);
    return menu ? JSON.parse(JSON.stringify(menu)) : undefined;
  }

  saveMenu(menu: NavigationMenu): void {
    const idx = this.menus.findIndex((m) => m.id === menu.id);
    const updated = { ...menu, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      this.menus[idx] = JSON.parse(JSON.stringify(updated));
    } else {
      this.menus.push(JSON.parse(JSON.stringify(updated)));
    }
    this.persist();
  }

  createMenu(data: Omit<NavigationMenu, "id" | "updatedAt">): NavigationMenu {
    const newMenu: NavigationMenu = {
      ...data,
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      updatedAt: new Date().toISOString(),
    };
    this.menus.push(JSON.parse(JSON.stringify(newMenu)));
    this.persist();
    return newMenu;
  }

  deleteMenu(id: string): void {
    this.menus = this.menus.filter((m) => m.id !== id);
    this.persist();
  }

  updateMenuPlacement(menuId: string, placement: MenuPlacement): void {
    // If placing into a unique slot (other than unassigned), set other menus with that placement to unassigned
    if (placement !== "unassigned") {
      this.menus.forEach((m) => {
        if (m.placement === placement && m.id !== menuId) {
          m.placement = "unassigned";
          m.updatedAt = new Date().toISOString();
        }
      });
    }
    const target = this.menus.find((m) => m.id === menuId);
    if (target) {
      target.placement = placement;
      target.updatedAt = new Date().toISOString();
    }
    this.persist();
  }

  reorderMenuItems(menuId: string, items: MenuItem[]): void {
    const menu = this.menus.find((m) => m.id === menuId);
    if (menu) {
      menu.items = items.map((item, idx) => ({ ...item, order: idx + 1 }));
      menu.updatedAt = new Date().toISOString();
    }
    this.persist();
  }

  resetMenus(): void {
    this.menus = JSON.parse(JSON.stringify(INITIAL_MENUS));
    this.persist();
  }

  // Local SEO Settings
  getLocalSEOSettings(): LocalSEOSettings {
    this.hydrateFromStorage();
    return JSON.parse(JSON.stringify(this.localSeoSettings));
  }

  saveLocalSEOSettings(settings: LocalSEOSettings): void {
    this.localSeoSettings = JSON.parse(JSON.stringify(settings));
    this.persist();
  }

  resetLocalSEOSettings(): void {
    this.localSeoSettings = JSON.parse(JSON.stringify(INITIAL_LOCAL_SEO_SETTINGS));
    this.persist();
  }
}

// Global persistent instance across Next.js reloads
declare global {
  var __vio_cms_store__: CMSStore | undefined;
}

export const cmsStore = (globalThis.__vio_cms_store__ && typeof globalThis.__vio_cms_store__.getUsers === "function") 
  ? globalThis.__vio_cms_store__ 
  : new CMSStore();
if (process.env.NODE_ENV !== "production") {
  globalThis.__vio_cms_store__ = cmsStore;
}
