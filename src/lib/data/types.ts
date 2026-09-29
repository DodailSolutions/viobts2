export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  icon: string;
  businessOutcome: string;
  capabilities: string[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
  orderIndex: number;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  keyChallenges: string[];
  transformationTrends: string[];
  capabilities: string[];
  orderIndex: number;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  imageUrl: string;
  orderIndex: number;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
  featuredImage: string;
}

export interface PodcastItem {
  id: string;
  title: string;
  description: string;
  guestName: string;
  guestCompany: string;
  guestPhoto?: string;
  thumbnailUrl?: string;
  coverImage?: string;
  hostName: string;
  duration: string;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  publishedAt: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  quote: string;
  rating: number;
}

export interface ClientLogoItem {
  id: string;
  name: string;
  svgSrc: string;
  category: string;
  websiteUrl?: string;
  width?: number;
  height?: number;
  headline?: string;
  summary?: string;
  metrics?: { label: string; value: string }[];
  caseStudySlug?: string;
}

export interface ClientTestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  imageSrc: string;
  badgeRole: string;
  badgeCompany: string;
  quote: string;
  linkedinUrl: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  industryInterest?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  notes?: string;
  createdAt: string;
}

export interface PageSectionItem {
  id: string;
  pageId: string;
  componentType: string;
  orderIndex: number;
  isVisible: boolean;
  props: Record<string, any>;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published" | "scheduled" | "archived";
  updatedAt: string;
}

export type UserRole = "super_admin" | "editor" | "lead_manager" | "architect" | "viewer" | (string & {});

export interface RolePermissionItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface RoleDefinitionItem {
  id: string;
  name: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  permissions: string[];
  isSystem?: boolean;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: string;
  status: "active" | "invited" | "suspended";
  twoFactorEnabled: boolean;
  lastActive: string;
  createdAt: string;
}

export interface SecurityAuditLogItem {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
}

export interface PageSEOConfig {
  pageId: string;
  focusKeyphrase: string;
  seoTitle: string;
  slug: string;
  metaDescription: string;
  canonicalUrl?: string;
  robotsIndex: "index" | "noindex";
  robotsFollow: "follow" | "nofollow";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType: "Organization" | "Service" | "Article" | "TechArticle" | "FAQPage" | "WebPage" | "LocalBusiness" | "AboutPage";
  contentSnippet?: string;
  secondaryKeywords?: string[];
}

export interface SEOCheckItem {
  id: string;
  title: string;
  status: "good" | "warning" | "error";
  message: string;
}

export interface RedirectItem {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: 301 | 302;
  hits: number;
  createdAt: string;
}

export interface SiteSEOSettings {
  siteName: string;
  titleSeparator: string;
  siteUrl: string;
  defaultOgImage: string;
  twitterHandle: string;
  googleSearchConsoleVerification: string;
  bingWebmasterVerification: string;
  robotsTxtContent: string;
  xmlSitemapEnabled: boolean;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
  badge?: string;
}

export interface FooterColumnItem {
  id: string;
  title: string;
  links: FooterLinkItem[];
}

export interface FooterDeviceSettings {
  desktop: {
    columnsPerRow: 4 | 5 | 6;
    showNewsletter: boolean;
    showSocials: boolean;
    showCertBadge: boolean;
    spacing: "compact" | "normal" | "spacious";
  };
  tablet: {
    columnsPerRow: 2 | 3 | 4;
    showNewsletter: boolean;
    showSocials: boolean;
    showCertBadge: boolean;
    collapsibleColumns: boolean;
  };
  mobile: {
    columnsPerRow: 1 | 2;
    showNewsletter: boolean;
    showSocials: boolean;
    showCertBadge: boolean;
    collapsibleColumns: boolean;
    showQuickContactBar: boolean;
    showBackToTop: boolean;
  };
}

export interface FooterSocialLinkItem {
  id: string;
  platform: "linkedin" | "twitter" | "youtube" | "github" | "facebook" | "instagram" | "custom";
  label: string;
  url: string;
  isEnabled: boolean;
}

export interface FooterConfig {
  companyName: string;
  tagline: string;
  swamBadgeText: string;
  showSwamBadge: boolean;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  linkedinUrl: string;
  founderLinkedinUrl: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  socialLinks?: FooterSocialLinkItem[];
  calendlyUrl: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterEnabled: boolean;
  columns: FooterColumnItem[];
  copyrightText: string;
  slogan: string;
  legalLinks: FooterLinkItem[];
  deviceSettings: FooterDeviceSettings;
}

export interface AppApiKey {
  id: string;
  name: string;
  keyMasked: string;
  scope: "read" | "read-write" | "admin";
  createdAt: string;
  lastUsed: string;
  active: boolean;
}

export interface AppSecuritySettings {
  twoFactorEnforced: boolean;
  sessionTimeoutMinutes: number;
  maxFailedLoginAttempts: number;
  lockoutDurationMinutes: number;
  ipWhitelistEnabled: boolean;
  ipWhitelist: string[];
  blockedIps: string[];
  rateLimitingEnabled: boolean;
  rateLimitRequestsPerMin: number;
  cspHeaderEnabled: boolean;
  hstsEnabled: boolean;
  xFrameOptions: "DENY" | "SAMEORIGIN";
  xssProtection: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  apiKeys: AppApiKey[];
}

export type HeadingFontChoice = 
  | "Plus Jakarta Sans" 
  | "Poppins" 
  | "Inter" 
  | "Outfit" 
  | "Montserrat" 
  | "Roboto" 
  | "System Sans";

export type BodyFontChoice = 
  | "Inter" 
  | "Plus Jakarta Sans" 
  | "Poppins" 
  | "Roboto" 
  | "System Sans";

export type FontSizeScale = "compact" | "standard" | "spacious";
export type HeadingWeight = "bold" | "extrabold" | "black";
export type LetterSpacingChoice = "tight" | "normal" | "wide";
export type CardBorderRadiusChoice = "rounded-xl" | "rounded-2xl" | "rounded-3xl";

export interface AppTypographySettings {
  headingFont: HeadingFontChoice;
  bodyFont: BodyFontChoice;
  fontSizeScale: FontSizeScale;
  headingWeight: HeadingWeight;
  letterSpacing: LetterSpacingChoice;
  cardRadius: CardBorderRadiusChoice;
}

export interface AppGeneralSettings {
  brandName: string;
  officialDomain: string;
  tagline: string;
  corporateMotto: string;
  corePhilosophy: string;
  headquartersAddress: string;
  supportEmail: string;
  emergencyPhone: string;
  leadNotificationEmail: string;
  leadWebhookUrl: string;
  enableEmailNotifications: boolean;
  enableSlackWebhooks: boolean;
  primaryBrandColor: string;
  typography: AppTypographySettings;
  contentWorkflow: {
    autoSaveIntervalSeconds: number;
    requireApprovalBeforePublish: boolean;
    maxUploadSizeMb: number;
  };
  announcementBanner: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
    bannerType: "info" | "success" | "warning";
  };
}

// Navigation Menu System
export type MenuPlacement =
  | "header_main"
  | "header_cta"
  | "mobile_dock"
  | "mobile_drawer"
  | "footer_primary"
  | "footer_secondary"
  | "unassigned";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  target?: "_self" | "_blank";
  badge?: string;
  icon?: string;
  order: number;
  highlight?: boolean;
  children?: MenuItem[];
}

export interface NavigationMenu {
  id: string;
  name: string;
  slug: string;
  description?: string;
  placement: MenuPlacement;
  items: MenuItem[];
  isActive: boolean;
  updatedAt: string;
}

// Local SEO & Multi-Location Types
export interface LocalBranch {
  id: string;
  name: string;
  branchType: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email?: string;
  googlePlaceId?: string;
  isHeadquarters: boolean;
}

export interface LocalSEOSettings {
  businessName: string;
  businessType: "ProfessionalService" | "LocalBusiness" | "ITConsultant" | "Corporation";
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  priceRange: string;
  openingHours: string;
  googleBusinessProfileUrl: string;
  appleMapsUrl: string;
  googlePlaceId: string;
  primaryServiceArea: string;
  serviceAreas: string[];
  averageRating: number;
  reviewCount: number;
  geoKeywords: string[];
  branches: LocalBranch[];
  enableLocalPackSnippet: boolean;
}


