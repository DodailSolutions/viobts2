# VIO Enterprise Platform & Headless Visual CMS

> **Domain:** `viobts.com`  
> **Positioning:** *"The technology accelerator for your business."*  
> **Motto:** *"Think bigger, build Smarter, solve harder."*  
> **Philosophy:** *Measure → Analyse → Improve*  
> **Corporate Identity:** Richmond, Virginia • Founder-Led • Woman-Owned Small Business (VA-SWaM Certified) • 10+ Years Enterprise Track Record

---

## 🏛️ Architecture & Tech Stack

* **Framework:** Next.js (App Router), React 18, TypeScript (Strict Mode).
* **Styling & Design System:** Tailwind CSS, custom design tokens (`#070B14`, `#0A101D`, `#00E5FF`), glassmorphism, responsive container queries.
* **Component Engine:** Dynamic JSONB Section Registry (`SectionRenderer.tsx`) supporting unrestricted visual assembly.
* **Dual Responsive Strategy:**
  * **Desktop (md+):** Sticky glass frosted header with multi-column mega-menus (Services, Industries, Company, Insights) and a comprehensive 5-column corporate footer.
  * **Mobile (< md):** Desktop footer is completely hidden (`hidden md:block`). Rendered with a native mobile bottom app dock (`fixed bottom-0 inset-x-0 z-50 h-16 pb-safe`) featuring 5 tabs: **Home**, **Services**, **Industries**, **Book a Call** (highlighted pill CTA), and **Menu** (iOS slide-up drawer).
* **Database & CMS Layer:** Supabase (PostgreSQL with UUIDs, RLS, Storage) + Universal In-Memory/File Persistence fallback for instant zero-config execution.
* **SEO Engine:** Next.js `generateMetadata()`, native Schema.org JSON-LD (`Organization`, `WebSite`, `Service`, `BreadcrumbList`), dynamic XML sitemap (`/sitemap.xml`), and dynamic robots rules (`/robots.txt`).

---

## 🚀 Quickstart & Development

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials (optional for local development, as the platform includes full seed data):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://viobts.com
```

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` for the public enterprise site and `http://localhost:3000/admin` for the Visual CMS.

### 4. Production Build & Typecheck
```bash
npm run typecheck
npm run build
npm run start
```

---

## 🗄️ Database Migrations

The full PostgreSQL migration file is located at `supabase/migrations/001_schema.sql`:
* `profiles` (User RBAC: `super_admin`, `admin`, `editor`, `author`, `hr_manager`, `marketing_manager`)
* `pages` (Dynamic slugs, metadata, publish states)
* `page_sections` (JSONB props, ordering, component registry mapping)
* `services` (The 6 Pillars: Technology Workforce, Big Data & Analytics, Open-source Integration, Cloud Enablement & CI/CD, API & Microservices, RPA, ML & AI)
* `industries` (Banking, Healthcare, Government, Manufacturing, Energy, Media)
* `case_studies` (ODGA / Virginia State Agencies, USAID, DriveWealth, Advance Auto Parts, Wells Fargo)
* `blogs` (Articles, reading times, tags, authors)
* `podcasts` (Episodes, transcripts, Spotify/YouTube links)
* `careers` (Job postings, requirements, responsibilities, benefits)
* `testimonials` (Verified client reviews)
* `leads` (Inbound CRM submissions, deal stages, notes)
* `media` (Supabase Storage asset index)
* `site_settings` & `redirects` (301/302 SEO migrations)

To apply migrations to your live Supabase project:
```bash
npx supabase db push
# or run the SQL in supabase/migrations/001_schema.sql directly in the Supabase SQL Editor
```

---

## 🎛️ Headless Visual CMS (`/admin/*`)

The administration portal allows complete website management without code changes:
* **Dashboard (`/admin`):** KPIs, recent leads stream, quick launchpad.
* **Visual Page Builder (`/admin/pages` & `/admin/pages/[id]`):**
  * Visual section sequence tree with **Move Up**, **Move Down**, and **Delete**.
  * **Component Block Inserter:** Add `HeroBanner`, `StatsCounter`, `BusinessProblems`, `CapabilitiesGrid`, `Methodology`, `CaseStudyShowcase`, `IndustryExplorer`, `TestimonialsSlider`, `CTABanner`, `SplitImageText`, `AccordionFAQ`, or `RichTextContent` with 1 click.
  * Live property form editor for headings, copy, badges, CTAs, and images.
  * Real-time responsive device switcher preview (**Desktop 1280px**, **Tablet 768px**, **Mobile 390px**).
  * Raw JSONB inspector.
* **Services Manager (`/admin/services`):** Manage the 6 pillars, business outcomes, and toolchains.
* **Industries Manager (`/admin/industries`):** Configure challenges and transformation trends.
* **Case Studies Manager (`/admin/case-studies`):** Update client proofs and quantified metrics.
* **Articles & Insights (`/admin/blogs`):** Technical article creation and publishing.
* **Inbound Leads CRM (`/admin/leads`):** Deal pipeline statuses (`new`, `contacted`, `qualified`, `proposal`, `won`, `lost`), internal admin notes, and CSV export.
* **Media Library (`/admin/media`):** Asset previews and CDN URL copying.
* **Global Settings (`/admin/settings`):** Identity, motto, Richmond VA headquarters, VA-SWaM info, and color tokens.

---

## 📱 Dual Responsive UX Details

* **Mobile Viewport (< 768px):**
  * Desktop footer is completely removed.
  * Dedicated fixed bottom app dock (`fixed bottom-0 inset-x-0 z-50 h-16 pb-safe`).
  * 5 native app touch tabs (44px min touch target):
    1. **Home**
    2. **Services**
    3. **Industries**
    4. **Book a Call** (highlighted glowing pill button)
    5. **Menu** (triggers iOS-style bottom drawer/sheet with Company, Insights, Podcasts, Careers, and Search)
  * Page wrappers enforce `pb-20` on mobile to guarantee zero overlap with the bottom navigation.
* **Desktop Viewport (≥ 768px):**
  * Mobile dock and drawer are hidden.
  * Sticky glass header with interactive multi-column mega-menus.
  * Full 5-column enterprise footer with certifications, newsletter, and links.
