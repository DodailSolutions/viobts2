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
  Menu,
  X
} from "lucide-react";
import { VioLogo } from "@/components/ui/VioLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Pages & Builder", href: "/admin/pages", icon: FileCode },
    { label: "Services (6 Pillars)", href: "/admin/services", icon: Layers },
    { label: "Industries", href: "/admin/industries", icon: Building2 },
    { label: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
    { label: "Blogs & Insights", href: "/admin/blogs", icon: BookOpen },
    { label: "Podcasts", href: "/admin/podcasts", icon: Mic },
    { label: "Careers", href: "/admin/careers", icon: Users2 },
    { label: "Inbound Leads CRM", href: "/admin/leads", icon: MessageSquare },
    { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
    { label: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative h-7 w-20 px-1.5 py-0.5 bg-[#071739] rounded-lg flex items-center">
            <Image src="/images/vio-logo.png" alt="VIO" width={80} height={26} className="object-contain" />
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100">CMS</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-4 transition-all duration-300 z-40 ${
          mobileMenuOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-4 border-b border-slate-100">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-8 w-24 px-2 py-1 bg-[#071739] rounded-lg flex items-center shadow-xs">
                <Image src="/images/vio-logo.png" alt="VIO" width={96} height={32} className="object-contain" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue uppercase tracking-wider border border-blue-100">
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-blue-50 text-brand-blue font-bold border border-blue-200/80 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-brand-blue" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-brand-blue" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Session Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="p-1.5 rounded-lg bg-blue-100 text-brand-blue">
              <Shield className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">admin@viobts.com (Super Admin)</p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
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
