import { 
  AdminUserItem, 
  RoleDefinitionItem, 
  RolePermissionItem, 
  SecurityAuditLogItem 
} from "./types";

export const INITIAL_ROLE_DEFINITIONS: RoleDefinitionItem[] = [
  {
    id: "super_admin",
    name: "Super Administrator",
    description: "Complete unrestricted governance over visual CMS, user management, API keys, security policies, and deployment pipeline.",
    badgeBg: "bg-blue-100",
    badgeText: "text-[#0c34cd]",
    isSystem: true,
    permissions: [
      "pages:view", "pages:create", "pages:edit", "pages:publish", "pages:delete", "website:layout",
      "seo:manage", "seo:sitemap", "seo:analytics",
      "content:write", "content:publish", "blogs:manage",
      "services:view", "services:edit", "casestudies:view", "casestudies:edit",
      "leads:view", "leads:manage", "leads:export", "leads:contact", "analytics:view",
      "users:view", "users:manage", "roles:assign", "roles:manage", "settings:manage", "audit:view"
    ]
  },
  {
    id: "website_manager",
    name: "Website Manager",
    description: "Governs live pages, section layouts, navigation menus, service blueprints, and case study catalogs. Manages layout publishing without user administration.",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    isSystem: false,
    permissions: [
      "pages:view", "pages:create", "pages:edit", "pages:publish", "pages:delete", "website:layout",
      "seo:manage", "seo:sitemap",
      "content:write", "content:publish", "blogs:manage",
      "services:view", "services:edit", "casestudies:view", "casestudies:edit"
    ]
  },
  {
    id: "content_writer",
    name: "Content Writer",
    description: "Drafts and authors technical blogs, case study summaries, whitepapers, and page copy. Restricted from publishing directly or modifying core site navigation.",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    isSystem: false,
    permissions: [
      "pages:view", "pages:edit",
      "content:write", "blogs:manage",
      "services:view", "casestudies:view"
    ]
  },
  {
    id: "seo_expert",
    name: "SEO Expert",
    description: "Optimizes on-page meta tags, schema markup, XML sitemaps, robots.txt directives, and analyzes search traffic and keyword performance.",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    isSystem: false,
    permissions: [
      "pages:view", "pages:edit",
      "seo:manage", "seo:sitemap", "seo:analytics",
      "analytics:view", "content:write"
    ]
  },
  {
    id: "lead_manager",
    name: "Lead Manager",
    description: "Manages inbound enterprise consultation requests, qualifies prospective opportunities, logs sales outreach, and exports pipeline data.",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    isSystem: false,
    permissions: [
      "leads:view", "leads:manage", "leads:export", "leads:contact", "analytics:view"
    ]
  },
  {
    id: "editor",
    name: "Content Strategist & Editor",
    description: "Can author, edit, and publish Pages, Blogs, Podcasts, Case Studies, and Section Builders. Cannot manage user roles.",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
    isSystem: true,
    permissions: [
      "pages:view", "pages:create", "pages:edit", "pages:publish",
      "content:write", "content:publish", "blogs:manage",
      "services:view", "services:edit", "casestudies:view", "casestudies:edit"
    ]
  },
  {
    id: "viewer",
    name: "Compliance Auditor (Read-Only)",
    description: "Strict read-only access across the administrative portal for external SOC2, NIST, and VA-SWaM compliance audits.",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    isSystem: true,
    permissions: [
      "pages:view", "services:view", "casestudies:view", "leads:view", "audit:view"
    ]
  }
];

export interface RoleTemplateItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  recommendedPermissions: string[];
}

export const ROLE_PRESET_TEMPLATES: RoleTemplateItem[] = [
  {
    id: "website_manager",
    name: "Website Manager",
    description: "Full operational authority over website pages, visual section builders, header/footer navigation, service pillars, and SEO.",
    icon: "Layout",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    recommendedPermissions: [
      "pages:view", "pages:create", "pages:edit", "pages:publish", "pages:delete", "website:layout",
      "seo:manage", "seo:sitemap",
      "content:write", "content:publish", "blogs:manage",
      "services:view", "services:edit", "casestudies:view", "casestudies:edit"
    ]
  },
  {
    id: "content_writer",
    name: "Content Writer",
    description: "Authors blog posts, draft articles, and case narratives. Safe draft access without site-breaking deletion or publishing privileges.",
    icon: "PenTool",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    recommendedPermissions: [
      "pages:view", "pages:edit",
      "content:write", "blogs:manage",
      "services:view", "casestudies:view"
    ]
  },
  {
    id: "seo_expert",
    name: "SEO Expert",
    description: "Specialized in search rankings, meta descriptions, open-graph tags, XML sitemaps, robots indexing, and organic growth analytics.",
    icon: "Search",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    recommendedPermissions: [
      "pages:view", "pages:edit",
      "seo:manage", "seo:sitemap", "seo:analytics",
      "analytics:view", "content:write"
    ]
  },
  {
    id: "lead_manager",
    name: "Lead Manager",
    description: "Inbound consultations CRM, prospective client inquiries, sales qualification, enterprise pipelines, and CSV exports.",
    icon: "Users",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    recommendedPermissions: [
      "leads:view", "leads:manage", "leads:export", "leads:contact", "analytics:view"
    ]
  },
  {
    id: "custom_role",
    name: "Custom Role (Blank)",
    description: "Build an entirely custom role from scratch with completely customized permission privileges.",
    icon: "Sliders",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    recommendedPermissions: [
      "pages:view"
    ]
  }
];

export const ALL_AVAILABLE_PERMISSIONS: RolePermissionItem[] = [
  // Pages & Website Builder
  { id: "pages:view", name: "View Pages & Layouts", category: "Pages & Website Builder", description: "Inspect published pages and layout structure" },
  { id: "pages:create", name: "Create New Pages", category: "Pages & Website Builder", description: "Build new landing templates and content pages" },
  { id: "pages:edit", name: "Edit Sections & Blocks", category: "Pages & Website Builder", description: "Modify hero banners, copy, testimonials, and media" },
  { id: "pages:publish", name: "Publish Pages Live", category: "Pages & Website Builder", description: "Deploy draft page edits directly to production" },
  { id: "pages:delete", name: "Delete Pages", category: "Pages & Website Builder", description: "Permanently remove website pages and landing URLs" },
  { id: "website:layout", name: "Navigation & Layouts", category: "Pages & Website Builder", description: "Configure header menus, footer links, and redirect paths" },

  // SEO & Growth Optimization
  { id: "seo:manage", name: "Meta Tags & OpenGraph", category: "SEO & Growth", description: "Configure page meta titles, meta descriptions, and social share cards" },
  { id: "seo:sitemap", name: "Sitemaps & Robots Indexing", category: "SEO & Growth", description: "Manage XML sitemaps, robots.txt directives, and canonical URLs" },
  { id: "seo:analytics", name: "Search & Keyword Analytics", category: "SEO & Growth", description: "Track search impressions, CTR, queries, and organic visitor flows" },

  // Content & Editorial
  { id: "content:write", name: "Author & Draft Articles", category: "Content & Editorial", description: "Draft blog posts, technical briefs, and thought leadership articles" },
  { id: "content:publish", name: "Publish Editorial Articles", category: "Content & Editorial", description: "Push finished articles and blog posts live to the website" },
  { id: "blogs:manage", name: "Categories & Taxonomies", category: "Content & Editorial", description: "Manage article categories, author bios, tags, and featured badges" },

  // Core Capabilities & Case Studies
  { id: "services:view", name: "View 6 Core Pillars", category: "Core Services & Proofs", description: "Inspect service blueprints, tech stacks, and FAQs" },
  { id: "services:edit", name: "Edit Service Pillars", category: "Core Services & Proofs", description: "Modify capability descriptions, deliverables, and architecture blueprints" },
  { id: "casestudies:view", name: "View Case Studies", category: "Core Services & Proofs", description: "Inspect client case studies, benchmark proofs, and outcomes" },
  { id: "casestudies:edit", name: "Edit Case Studies", category: "Core Services & Proofs", description: "Update client impact metrics, diagrams, and proof narratives" },

  // Inbound Consultation CRM
  { id: "leads:view", name: "View Inbound Consultations", category: "Inbound Consultation CRM", description: "Inspect inbound consultation forms and enterprise prospect details" },
  { id: "leads:manage", name: "Qualify & Update Leads", category: "Inbound Consultation CRM", description: "Update status, log pipeline stages, and document follow-up notes" },
  { id: "leads:export", name: "Export Pipeline Data", category: "Inbound Consultation CRM", description: "Export CSV lists of enterprise leads and contact information" },
  { id: "leads:contact", name: "Direct Lead Outreach", category: "Inbound Consultation CRM", description: "Trigger follow-up notifications and schedule consultation calls" },
  { id: "analytics:view", name: "Growth & Conversion Metrics", category: "Inbound Consultation CRM", description: "Inspect lead conversion rates, pipeline velocity, and inquiry volumes" },

  // Administration & RBAC
  { id: "users:view", name: "View Team Roster", category: "Administration & Security", description: "Inspect team members, assigned roles, and activity status" },
  { id: "users:manage", name: "Invite & Manage Users", category: "Administration & Security", description: "Invite new team members, suspend access, or delete accounts" },
  { id: "roles:assign", name: "Assign User Roles", category: "Administration & Security", description: "Promote, demote, or reassign role privileges to members" },
  { id: "roles:manage", name: "Define Custom Roles", category: "Administration & Security", description: "Create, edit, or delete custom roles and configure privilege matrix" },
  { id: "settings:manage", name: "Global CMS Settings", category: "Administration & Security", description: "Configure API credentials, webhooks, and brand styling" },
  { id: "audit:view", name: "Security Audit Lineage", category: "Administration & Security", description: "Inspect tamper-evident audit trails of all administrative operations" },
];

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "usr-1",
    name: "Adithya Buddhavarapu",
    email: "theoracle@viobts.com",
    avatar: "/images/testimonials/adithya-buddhavarapu.png",
    role: "super_admin",
    department: "Executive Leadership",
    status: "active",
    twoFactorEnabled: true,
    lastActive: "Active Now",
    createdAt: "2024-01-15T08:00:00.000Z"
  },
  {
    id: "usr-2",
    name: "Sarah Jenkins",
    email: "s.jenkins@viobts.com",
    role: "editor",
    department: "Marketing & Communications",
    status: "active",
    twoFactorEnabled: true,
    lastActive: "12 mins ago",
    createdAt: "2024-02-10T11:30:00.000Z"
  },
  {
    id: "usr-3",
    name: "Marcus Vance",
    email: "m.vance@viobts.com",
    role: "lead_manager",
    department: "Business Development & Partnerships",
    status: "active",
    twoFactorEnabled: true,
    lastActive: "1 hour ago",
    createdAt: "2024-03-01T14:15:00.000Z"
  },
  {
    id: "usr-4",
    name: "Elena Rostova",
    email: "e.rostova@viobts.com",
    role: "architect",
    department: "Enterprise Cloud & Lakehouse",
    status: "active",
    twoFactorEnabled: true,
    lastActive: "Yesterday at 4:32 PM",
    createdAt: "2024-03-20T09:45:00.000Z"
  },
  {
    id: "usr-5",
    name: "David Sterling",
    email: "d.sterling@audit-gov.org",
    role: "viewer",
    department: "External NIST Compliance Audit",
    status: "active",
    twoFactorEnabled: true,
    lastActive: "3 days ago",
    createdAt: "2024-04-05T16:20:00.000Z"
  },
  {
    id: "usr-6",
    name: "Priya Sharma",
    email: "p.sharma@viobts.com",
    role: "editor",
    department: "Technical Content & Research",
    status: "invited",
    twoFactorEnabled: false,
    lastActive: "Invite Sent (Pending)",
    createdAt: "2024-05-12T10:00:00.000Z"
  }
];

export const INITIAL_AUDIT_LOGS: SecurityAuditLogItem[] = [
  {
    id: "aud-1",
    actorName: "Adithya Buddhavarapu",
    actorEmail: "theoracle@viobts.com",
    action: "Enforced Mandatory 2FA",
    target: "Organization-wide Security Policy",
    ipAddress: "172.56.21.94 (Richmond, VA)",
    timestamp: "10 mins ago",
    severity: "info"
  },
  {
    id: "aud-2",
    actorName: "Adithya Buddhavarapu",
    actorEmail: "theoracle@viobts.com",
    action: "Assigned Role: Solutions Architect",
    target: "Elena Rostova (e.rostova@viobts.com)",
    ipAddress: "172.56.21.94 (Richmond, VA)",
    timestamp: "1 hour ago",
    severity: "info"
  },
  {
    id: "aud-3",
    actorName: "Marcus Vance",
    actorEmail: "m.vance@viobts.com",
    action: "Exported Qualified CRM Inbound Leads",
    target: "Q3 Enterprise Prospect Pipeline (CSV)",
    ipAddress: "73.192.110.12 (Ashburn, VA)",
    timestamp: "3 hours ago",
    severity: "warning"
  },
  {
    id: "aud-4",
    actorName: "Sarah Jenkins",
    actorEmail: "s.jenkins@viobts.com",
    action: "Published Case Study Update",
    target: "Virginia ODGA GovCloud Modernization",
    ipAddress: "108.48.23.155 (Richmond, VA)",
    timestamp: "Yesterday at 2:15 PM",
    severity: "info"
  },
  {
    id: "aud-5",
    actorName: "David Sterling",
    actorEmail: "d.sterling@audit-gov.org",
    action: "Completed SOC2 Access Lineage Review",
    target: "Annual Security Clearance Audit",
    ipAddress: "199.19.248.5 (Washington, DC)",
    timestamp: "2 days ago",
    severity: "info"
  }
];
