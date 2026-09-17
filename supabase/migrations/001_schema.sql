-- ==========================================================
-- VIO Enterprise Platform & Visual CMS Database Schema
-- Supabase PostgreSQL Migration 001_schema.sql
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & RBAC
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor', 'author', 'hr_manager', 'marketing_manager')),
    full_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Pages Table (Core CMS)
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    og_image TEXT,
    canonical_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Dynamic Page Sections (JSONB Layout Engine)
CREATE TABLE IF NOT EXISTS page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    component_type VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    props JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sections_page_order ON page_sections(page_id, order_index);

-- 4. Services (The 6 Pillars & expandable)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    eyebrow VARCHAR(255),
    subtitle TEXT,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    business_outcome TEXT,
    capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Industries (The 6 Key Industries & expandable)
CREATE TABLE IF NOT EXISTS industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    eyebrow VARCHAR(255),
    description TEXT NOT NULL,
    key_challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
    transformation_trends JSONB NOT NULL DEFAULT '[]'::jsonb,
    capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Case Studies (Real proofs: USAID, ODGA, DriveWealth, etc.)
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    results JSONB NOT NULL DEFAULT '[]'::jsonb,
    metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    testimonial JSONB,
    image_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Blogs & Insights
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author_name VARCHAR(255) DEFAULT 'VIO Tech Perspectives',
    author_role VARCHAR(255) DEFAULT 'Solutions Architecture',
    category VARCHAR(100) NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    featured_image TEXT,
    reading_time VARCHAR(50) DEFAULT '5 min read',
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Podcasts
CREATE TABLE IF NOT EXISTS podcasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    guest_name VARCHAR(255),
    guest_company VARCHAR(255),
    guest_photo TEXT,
    host_name VARCHAR(255) DEFAULT 'VIO Technology Leadership',
    audio_url TEXT,
    video_url TEXT,
    youtube_url TEXT,
    spotify_url TEXT,
    transcript TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Careers
CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Richmond, VA / Remote',
    employment_type VARCHAR(100) NOT NULL DEFAULT 'Full-Time',
    experience_level VARCHAR(100) NOT NULL DEFAULT 'Senior',
    description TEXT NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    photo_url TEXT,
    rating INTEGER DEFAULT 5,
    order_index INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Leads & Inquiries (CRM Table)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    company VARCHAR(255),
    service_interest VARCHAR(255),
    industry_interest VARCHAR(255),
    budget VARCHAR(100),
    timeline VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Media Library
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    alt_text TEXT,
    bucket VARCHAR(100) DEFAULT 'media',
    size BIGINT,
    mime_type VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Site Settings & Dynamic Tokens
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. URL Redirects (301/302 for SEO Migration)
CREATE TABLE IF NOT EXISTS redirects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_path VARCHAR(255) UNIQUE NOT NULL,
    destination_path VARCHAR(255) NOT NULL,
    status_code INTEGER DEFAULT 301,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-Level Security (RLS) Configuration
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public read page_sections" ON page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Public read industries" ON industries FOR SELECT USING (status = 'published');
CREATE POLICY "Public read case_studies" ON case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public read podcasts" ON podcasts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read careers" ON careers FOR SELECT USING (status = 'published');
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read redirects" ON redirects FOR SELECT USING (is_active = true);

-- Public insert leads policy
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Admin full access policies
CREATE POLICY "Admins full access profiles" ON profiles FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));
CREATE POLICY "Admins full access pages" ON pages FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access page_sections" ON page_sections FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access services" ON services FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access industries" ON industries FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access case_studies" ON case_studies FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access blogs" ON blogs FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor', 'author'));
CREATE POLICY "Admins full access podcasts" ON podcasts FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access careers" ON careers FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'hr_manager'));
CREATE POLICY "Admins full access testimonials" ON testimonials FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access leads" ON leads FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access media" ON media FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'editor'));
CREATE POLICY "Admins full access site_settings" ON site_settings FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));
CREATE POLICY "Admins full access redirects" ON redirects FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));
