"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Layers, 
  Building2, 
  Calendar, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Mic, 
  Briefcase, 
  Search,
  Lock
} from "lucide-react";

export function MobileNavDock() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.startsWith(route)) return true;
    return false;
  };

  // Do not render public mobile dock on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Native Mobile Bottom Navigation Dock in Deep Blue */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 h-16 bg-[#071739]/95 backdrop-blur-xl border-t border-blue-900/60 flex items-center justify-around px-2 pb-safe md:hidden shadow-2xl shadow-black/40"
        aria-label="Mobile Navigation"
      >
        {/* Tab 1: Home */}
        <Link
          href="/"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
            isActive("/") && !drawerOpen
              ? "text-cyan-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Tab 2: Services */}
        <Link
          href="/services"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
            isActive("/services") && !drawerOpen
              ? "text-cyan-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Services</span>
        </Link>

        {/* Tab 3: Industries */}
        <Link
          href="/industries"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
            isActive("/industries") && !drawerOpen
              ? "text-cyan-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Industries</span>
        </Link>

        {/* Tab 4: Book a Call (Highlighted Pill Button) */}
        <Link
          href="/contact"
          onClick={() => setDrawerOpen(false)}
          className="flex flex-col items-center justify-center min-h-[44px] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight leading-none">Book Call</span>
        </Link>

        {/* Tab 5: Menu (Triggers Drawer) */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
            drawerOpen ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
          }`}
          aria-label="Toggle mobile drawer"
        >
          {drawerOpen ? (
            <X className="w-5 h-5 mb-0.5 text-cyan-400" />
          ) : (
            <Menu className="w-5 h-5 mb-0.5" />
          )}
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </nav>

      {/* iOS-Style Sliding Bottom Drawer / Sheet in Deep Blue */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex flex-col justify-end animate-fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full bg-[#0B1B3D] border-t border-blue-800 rounded-t-3xl p-6 pb-24 shadow-2xl max-h-[85vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between pb-4 border-b border-blue-900/60 mb-6">
              <div>
                <div className="relative h-9 w-28">
                  <Image
                    src="/images/vio-logo.png"
                    alt="VIO"
                    width={112}
                    height={54}
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-[11px] text-cyan-400 font-semibold mt-1">Richmond, VA • VA-SWaM Certified</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links in Drawer */}
            <div className="space-y-3">
              <Link
                href="/who-we-are"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Who We Are & Leadership</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/case-studies"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Client Proof & Case Studies</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/insights"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Insights & Architecture Blogs</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/podcast"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">VIO Tech Podcast</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/careers"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Careers & Open Roles</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/search"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Search Platform</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-blue-950/80 border border-blue-800 text-cyan-300"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">Visual CMS Admin Portal</span>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
