"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCode,
  Layers,
  Building2,
  Briefcase,
  BookOpen,
  Mic,
  Users2,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  ChevronRight,
  Shield,
  ShieldCheck,
  Menu,
  X,
  Search,
  PanelBottom,
  Compass
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Pages & Builder", href: "/admin/pages", icon: FileCode },
    { label: "Navigation & Menus", href: "/admin/menus", icon: Compass },
    { label: "Footer Studio (All Devices)", href: "/admin/footer", icon: PanelBottom },
    { label: "SEO & Content Optimizer", href: "/admin/seo", icon: Search },
    { label: "Services (6 Pillars)", href: "/admin/services", icon: Layers },
    { label: "Industries", href: "/admin/industries", icon: Building2 },
    { label: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
    { label: "Blogs & Insights", href: "/admin/blogs", icon: BookOpen },
    { label: "Podcasts", href: "/admin/podcasts", icon: Mic },
    { label: "Careers", href: "/admin/careers", icon: Users2 },
    { label: "Inbound Leads CRM", href: "/admin/leads", icon: MessageSquare },
    { label: "User Roles & Access", href: "/admin/users", icon: Users2 },
    { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
    { label: "App Settings & Security", href: "/admin/settings", icon: ShieldCheck },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Admin Header in Primary Color #0c34cd */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0c34cd] border-b border-white/20 sticky top-0 z-50 shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative h-7 w-20 flex items-center">
            <Image src="/images/vio-logo.png" alt="VIO" width={80} height={26} className="object-contain" priority />
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/20 text-white border border-white/30 tracking-wider">
            CMS
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors border border-white/20"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar in Primary Color #0c34cd */}
      <aside
        className={`w-64 bg-gradient-to-b from-[#0c34cd] via-[#092699] to-[#06185f] border-r border-white/20 text-white flex flex-col justify-between shrink-0 p-4 transition-all duration-300 z-40 relative shadow-xl shadow-blue-950/20 ${
          mobileMenuOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-5 mb-4 border-b border-white/15">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="relative h-8 w-24 flex items-center">
                <Image src="/images/vio-logo.png" alt="VIO" width={96} height={32} className="object-contain group-hover:opacity-90 transition-opacity" priority />
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/15 text-white uppercase tracking-widest border border-white/25 shadow-xs">
                Visual CMS
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    active
                      ? "bg-white text-[#0c34cd] font-black shadow-md border border-white"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${active ? "text-[#0c34cd]" : "text-white/70 group-hover:text-white"}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-[#0c34cd] stroke-[3]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Session Footer */}
        <div className="pt-4 border-t border-white/15 space-y-3">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xs">
            <div className="p-1.5 rounded-lg bg-white/20 text-white shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">Administrator</p>
              <p className="text-[10px] text-white/75 truncate font-medium">admin@viobts.com (Super Admin)</p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black bg-white text-[#0c34cd] hover:bg-cyan-50 transition-all shadow-md hover:scale-[1.02] active:scale-95"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0c34cd]" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 overflow-x-hidden min-h-screen p-6 sm:p-10 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
