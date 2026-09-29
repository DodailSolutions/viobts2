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
  }

  deleteService(id: string): void {
    this.services = this.services.filter((s) => s.id !== id);
  }

  // Industries
  getIndustries(): IndustryItem[] {
    return [...this.industries].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getIndustryBySlug(slug: string): IndustryItem | undefined {
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

  // User & Role Management
  getUsers(): AdminUserItem[] {
    return [...this.users];
  }

  getUserById(id: string): AdminUserItem | undefined {
    return this.users.find((u) => u.id === id);
  }

  saveUser(user: AdminUserItem): void {
    const idx = this.users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      this.users[idx] = user;
    } else {
      this.users.unshift(user);
    }
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
  }

  getRoles(): RoleDefinitionItem[] {
    return [...this.roles];
  }

  saveRole(role: RoleDefinitionItem): void {
    const idx = this.roles.findIndex((r) => r.id === role.id);
    if (idx >= 0) {
      this.roles[idx] = role;
    } else {
      this.roles.push(role);
    }
  }

  deleteRole(roleId: string): void {
    this.roles = this.roles.filter((r) => r.id !== roleId);
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
    return { ...this.siteSeoSettings };
  }

  saveSiteSEOSettings(settings: SiteSEOSettings): void {
    this.siteSeoSettings = { ...settings };
  }

  getPageSEOConfigs(): PageSEOConfig[] {
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
  }

  getRedirects(): RedirectItem[] {
    return [...this.redirects];
  }

  saveRedirect(redirect: RedirectItem): void {
    const idx = this.redirects.findIndex((r) => r.id === redirect.id);
    if (idx >= 0) {
      this.redirects[idx] = redirect;
    } else {
      this.redirects.push(redirect);
    }
  }

  deleteRedirect(id: string): void {
    this.redirects = this.redirects.filter((r) => r.id !== id);
  }

  // Footer Management
  getFooterConfig(): FooterConfig {
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
  }

  resetFooterConfig(): void {
    this.footerConfig = JSON.parse(JSON.stringify(INITIAL_FOOTER_CONFIG));
  }

  // General Application Settings
  getGeneralSettings(): AppGeneralSettings {
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
  }

  // Application Security Settings
  getSecuritySettings(): AppSecuritySettings {
    return JSON.parse(JSON.stringify(this.securitySettings));
  }

  saveSecuritySettings(settings: AppSecuritySettings): void {
    this.securitySettings = JSON.parse(JSON.stringify(settings));
  }

  toggleMaintenanceMode(): boolean {
    this.securitySettings.maintenanceMode = !this.securitySettings.maintenanceMode;
    return this.securitySettings.maintenanceMode;
  }

  addApiKey(key: AppApiKey): void {
    this.securitySettings.apiKeys.unshift(key);
  }

  revokeApiKey(keyId: string): void {
    this.securitySettings.apiKeys = this.securitySettings.apiKeys.filter((k) => k.id !== keyId);
  }

  addBlockedIp(ip: string): void {
    const clean = ip.trim();
    if (clean && !this.securitySettings.blockedIps.includes(clean)) {
      this.securitySettings.blockedIps.push(clean);
    }
  }

  removeBlockedIp(ip: string): void {
    this.securitySettings.blockedIps = this.securitySettings.blockedIps.filter((item) => item !== ip);
  }

  addWhitelistedIp(ip: string): void {
    const clean = ip.trim();
    if (clean && !this.securitySettings.ipWhitelist.includes(clean)) {
      this.securitySettings.ipWhitelist.push(clean);
    }
  }

  removeWhitelistedIp(ip: string): void {
    this.securitySettings.ipWhitelist = this.securitySettings.ipWhitelist.filter((item) => item !== ip);
  }

  // Navigation Menus & Placements
  getMenus(): NavigationMenu[] {
    return JSON.parse(JSON.stringify(this.menus));
  }

  getMenuById(id: string): NavigationMenu | undefined {
    const menu = this.menus.find((m) => m.id === id);
    return menu ? JSON.parse(JSON.stringify(menu)) : undefined;
  }

  getMenuByPlacement(placement: MenuPlacement): NavigationMenu | undefined {
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
  }

  createMenu(data: Omit<NavigationMenu, "id" | "updatedAt">): NavigationMenu {
    const newMenu: NavigationMenu = {
      ...data,
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      updatedAt: new Date().toISOString(),
    };
    this.menus.push(JSON.parse(JSON.stringify(newMenu)));
    return newMenu;
  }

  deleteMenu(id: string): void {
    this.menus = this.menus.filter((m) => m.id !== id);
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
  }

  reorderMenuItems(menuId: string, items: MenuItem[]): void {
    const menu = this.menus.find((m) => m.id === menuId);
    if (menu) {
      menu.items = items.map((item, idx) => ({ ...item, order: idx + 1 }));
      menu.updatedAt = new Date().toISOString();
    }
  }

  resetMenus(): void {
    this.menus = JSON.parse(JSON.stringify(INITIAL_MENUS));
  }

  // Local SEO Settings
  getLocalSEOSettings(): LocalSEOSettings {
    return JSON.parse(JSON.stringify(this.localSeoSettings));
  }

  saveLocalSEOSettings(settings: LocalSEOSettings): void {
    this.localSeoSettings = JSON.parse(JSON.stringify(settings));
  }

  resetLocalSEOSettings(): void {
    this.localSeoSettings = JSON.parse(JSON.stringify(INITIAL_LOCAL_SEO_SETTINGS));
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
