"use client";

import React, { useState, useEffect } from "react";
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
  Lock,
  Users,
  Phone,
  Sparkles
} from "lucide-react";
import { cmsStore, NavigationMenu, MenuItem } from "@/lib/data";

function getMobileDockIcon(name?: string) {
  switch (name) {
    case "Home": return Home;
    case "Layers": return Layers;
    case "Building2": return Building2;
    case "Calendar": return Calendar;
    case "Menu": return Menu;
    case "Briefcase": return Briefcase;
    case "BookOpen": return BookOpen;
    case "Mic": return Mic;
    case "Users": return Users;
    case "Phone": return Phone;
    case "Sparkles": return Sparkles;
    case "Search": return Search;
    default: return Layers;
  }
}

export function MobileNavDock() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dockMenu, setDockMenu] = useState<NavigationMenu | null>(null);
  const [drawerMenu, setDrawerMenu] = useState<NavigationMenu | null>(null);

  useEffect(() => {
    const dock = cmsStore.getMenuByPlacement("mobile_dock");
    if (dock) setDockMenu(dock);
    const drawer = cmsStore.getMenuByPlacement("mobile_drawer");
    if (drawer) setDrawerMenu(drawer);
  }, []);

  const isActive = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && route !== "#drawer" && pathname.startsWith(route)) return true;
    return false;
  };

  // Do not render public mobile dock on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Native Mobile Bottom Navigation Dock in Primary Royal Blue */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 h-16 bg-[#0c34cd]/95 backdrop-blur-xl border-t border-white/20 flex items-center justify-around px-2 pb-safe md:hidden shadow-2xl shadow-black/40"
        aria-label="Mobile Navigation"
      >
        {dockMenu && dockMenu.items.length > 0 ? (
          dockMenu.items.map((item) => {
            const isDrawerTrigger = item.href === "#drawer" || item.label.toLowerCase() === "menu";
            const IconComponent = getMobileDockIcon(item.icon);

            if (isDrawerTrigger) {
              return (
                <button
                  key={item.id}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                    drawerOpen ? "text-cyan-200 font-bold" : "text-white/70 hover:text-white"
                  }`}
                  aria-label="Toggle mobile navigation drawer"
                >
                  {drawerOpen ? (
                    <X className="w-5 h-5 mb-0.5 text-cyan-200" />
                  ) : (
                    <Menu className="w-5 h-5 mb-0.5" />
                  )}
                  <span className="text-[10px] tracking-tight">{item.label}</span>
                </button>
              );
            }

            if (item.highlight) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  target={item.target || "_blank"}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  onClick={() => setDrawerOpen(false)}
                  className="flex flex-col items-center justify-center min-h-[44px] px-3.5 py-1.5 rounded-full bg-white text-[#0c34cd] font-black shadow-md shadow-black/15 hover:bg-cyan-50"
                >
                  <IconComponent className="w-4 h-4 mb-0.5 text-[#0c34cd]" />
                  <span className="text-[10px] tracking-tight leading-none font-bold">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                target={item.target || "_self"}
                onClick={() => setDrawerOpen(false)}
                className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                  isActive(item.href) && !drawerOpen
                    ? "text-white font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <IconComponent className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </Link>
            );
          })
        ) : (
          // Default Fallback
          <>
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                isActive("/") && !drawerOpen ? "text-white font-bold" : "text-white/70 hover:text-white"
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Home</span>
            </Link>

            <Link
              href="/services"
              onClick={() => setDrawerOpen(false)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                isActive("/services") && !drawerOpen ? "text-white font-bold" : "text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Services</span>
            </Link>

            <Link
              href="/industries"
              onClick={() => setDrawerOpen(false)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                isActive("/industries") && !drawerOpen ? "text-white font-bold" : "text-white/70 hover:text-white"
              }`}
            >
              <Building2 className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">Industries</span>
            </Link>

            <Link
              href="https://calendly.com/viobts/consultation"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDrawerOpen(false)}
              className="flex flex-col items-center justify-center min-h-[44px] px-3.5 py-1.5 rounded-full bg-white text-[#0c34cd] font-black shadow-md shadow-black/15 hover:bg-cyan-50"
            >
              <Calendar className="w-4 h-4 mb-0.5 text-[#0c34cd]" />
              <span className="text-[10px] tracking-tight leading-none font-bold">Book Call</span>
            </Link>

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] transition-colors ${
                drawerOpen ? "text-cyan-200 font-bold" : "text-white/70 hover:text-white"
              }`}
              aria-label="Toggle mobile drawer"
            >
              {drawerOpen ? (
                <X className="w-5 h-5 mb-0.5 text-cyan-200" />
              ) : (
                <Menu className="w-5 h-5 mb-0.5" />
              )}
              <span className="text-[10px] tracking-tight">Menu</span>
            </button>
          </>
        )}
      </nav>

      {/* iOS-Style Sliding Bottom Drawer / Sheet in Royal Blue */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex flex-col justify-end animate-fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full bg-gradient-to-b from-[#0c34cd] via-[#0a2cb0] to-[#071e7b] border-t border-white/20 rounded-t-3xl p-6 pb-24 shadow-2xl max-h-[85vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <div>
                <Link href="/" onClick={() => setDrawerOpen(false)} className="inline-block py-1">
                  <Image
                    src="/images/vio-logo.png"
                    alt="VIO"
                    width={112}
                    height={54}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <p className="text-[11px] text-cyan-200 font-semibold mt-1">Richmond, VA • VA-SWaM Certified</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/company/viobts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="VIO LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links in Drawer - Dynamic or Fallback */}
            <div className="space-y-3">
              {drawerMenu && drawerMenu.items.length > 0 ? (
                drawerMenu.items.map((item) => {
                  const Icon = getMobileDockIcon(item.icon);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.target || "_self"}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-semibold">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-300 text-blue-950">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })
              ) : (
                <>
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
                    href="/careers"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-900/60 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-semibold">Careers & Open Roles</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </>
              )}

              {/* Admin Portal Shortcut in Drawer */}
              <Link
                href="/admin"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-blue-950/80 border border-blue-800 text-cyan-300 transition-colors"
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
