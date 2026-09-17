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
      <div className="md:hidden flex items-center justify-between p-4 bg-[#071739] sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative h-7 w-20 flex items-center">
            <Image src="/images/vio-logo.png" alt="VIO" width={80} height={26} className="object-contain" />
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/10 text-blue-300 border border-white/15">CMS</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#071739] flex flex-col justify-between shrink-0 p-4 transition-all duration-300 z-40 ${
          mobileMenuOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-4 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-8 w-24 flex items-center">
                <Image src="/images/vio-logo.png" alt="VIO" width={96} height={32} className="object-contain" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-blue-300 uppercase tracking-wider border border-white/15">
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
                      ? "bg-white/15 text-white font-bold border border-white/20 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-blue-300" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-blue-300" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Session Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 border border-white/15">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300">
              <Shield className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-400 truncate">admin@viobts.com (Super Admin)</p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 shadow-sm"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
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
