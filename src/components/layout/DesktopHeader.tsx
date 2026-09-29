"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Calendar,
  ExternalLink
} from "lucide-react";
import { 
  cmsStore, 
  ServiceItem,
  IndustryItem,
  NavigationMenu,
  MenuItem
} from "@/lib/data";

export function DesktopHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [headerMenu, setHeaderMenu] = useState<NavigationMenu | null>(null);
  const [ctaMenu, setCtaMenu] = useState<NavigationMenu | null>(null);
  const [services, setServices] = useState<ServiceItem[]>(() => cmsStore.getServices());
  const [industries, setIndustries] = useState<IndustryItem[]>(() => cmsStore.getIndustries());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const refreshData = () => {
      try {
        cmsStore.hydrateFromStorage();
        const loadedMain = cmsStore.getMenuByPlacement("header_main");
        if (loadedMain) setHeaderMenu(loadedMain);

        const loadedCta = cmsStore.getMenuByPlacement("header_cta");
        if (loadedCta) setCtaMenu(loadedCta);

        setServices([...cmsStore.getServices()]);
        setIndustries([...cmsStore.getIndustries()]);
      } catch {
        // Fallback
      }
    };

    refreshData();
    window.addEventListener("cms-storage-update", refreshData);
    window.addEventListener("storage", refreshData);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cms-storage-update", refreshData);
      window.removeEventListener("storage", refreshData);
    };
  }, []);

  // Do not render public header on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const ctaItem = ctaMenu?.items?.[0];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 hidden md:block h-20 ${
        scrolled
          ? "bg-[#0c34cd]/95 backdrop-blur-md border-b border-white/20 shadow-xl shadow-[#0c34cd]/20"
          : "bg-[#0c34cd] border-b border-white/15"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group py-2">
          <Image
            src="/images/vio-logo.png"
            alt="VIO - The Technology Accelerator"
            width={140}
            height={68}
            className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

        {/* Center Navigation with Dynamic CMS Menus & Mega Menus */}
        <nav className="flex items-center gap-1 lg:gap-1.5">
          {headerMenu && headerMenu.items.length > 0 ? (
            headerMenu.items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isServicesDropdown = item.href.includes("services");
              const isIndustriesDropdown = item.href.includes("industries");
              const isCurrentActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (hasChildren) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.id)}
                  >
                    <button
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                        isCurrentActive
                          ? "text-white bg-white/20 border border-white/30 shadow-xs"
                          : "text-white/90 hover:text-white hover:bg-white/15"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-cyan-300 text-[#0c34cd]">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeMenu === item.id ? "rotate-180 text-cyan-200" : "text-white/70"
                        }`}
                      />
                    </button>

                    {activeMenu === item.id && (
                      <div className={`absolute top-full -left-10 pt-3 animate-fade-in ${
                        isServicesDropdown || isIndustriesDropdown ? "w-[680px]" : "w-64"
                      }`}>
                        <div className="p-6 rounded-2xl shadow-2xl border border-white/20 bg-gradient-to-b from-[#0a2cb0] to-[#071e7b] text-white backdrop-blur-xl">
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                            <p className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                              {isServicesDropdown ? (
                                <>
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>6 Core Technology Pillars</span>
                                </>
                              ) : isIndustriesDropdown ? (
                                <>
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>Enterprise Industry Verticals</span>
                                </>
                              ) : (
                                <span>{item.label} Overview</span>
                              )}
                            </p>
                            <Link
                              href={item.href}
                              className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 hover:underline"
                              onClick={() => setActiveMenu(null)}
                            >
                              <span>View All</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          {isServicesDropdown || isIndustriesDropdown ? (
                            <div className="grid grid-cols-2 gap-3">
                              {item.children!.map((child) => (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/20 transition-all group"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <p className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors mb-1 flex items-center justify-between">
                                    <span>{child.label}</span>
                                    {child.badge && (
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-cyan-400 text-blue-950">
                                        {child.badge}
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-white/70 leading-snug line-clamp-2">
                                    Explore specialized enterprise architecture & capability
                                  </p>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              {item.children!.map((child) => (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 transition-all flex items-center justify-between text-xs font-semibold text-white"
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <span>{child.label}</span>
                                  <ArrowRight className="w-3 h-3 text-white/50" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  target={item.target || "_self"}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-1.5 ${
                    isCurrentActive
                      ? "text-white bg-white/20 border border-white/30"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-cyan-300 text-[#0c34cd]">
                      {item.badge}
                    </span>
                  )}
                  {item.target === "_blank" && (
                    <ExternalLink className="w-3 h-3 text-white/60" />
                  )}
                </Link>
              );
            })
          ) : (
            // Default Fallback Navigation
            <>
              <Link
                href="/services"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Services
              </Link>
              <Link
                href="/industries"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Industries
              </Link>
              <Link
                href="/who-we-are"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Who We Are
              </Link>
              <Link
                href="/case-studies"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Case Studies
              </Link>
              <Link
                href="/insights"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Insights
              </Link>
              <Link
                href="/careers"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15`}
              >
                Careers
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions: LinkedIn, Admin & Dynamic CTA Button */}
        <div className="flex items-center gap-2.5">
          {/* Official VIO Company LinkedIn Link */}
          <a
            href="https://www.linkedin.com/company/viobts/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center"
            title="Follow VIO on LinkedIn"
            aria-label="VIO Official LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <Link
            href="/admin"
            className="text-xs font-semibold px-3 py-2 rounded-xl text-white/90 hover:text-white border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 transition-all"
          >
            Admin CMS
          </Link>

          {/* Dynamic Right CTA Action Button */}
          {ctaItem ? (
            <Link
              href={ctaItem.href}
              target={ctaItem.target || "_blank"}
              rel={ctaItem.target === "_blank" ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#0c34cd] bg-white hover:bg-cyan-50 transition-all duration-300 shadow-lg shadow-black/15 hover:shadow-cyan-400/25 hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0c34cd]" />
              <span>{ctaItem.label}</span>
              {ctaItem.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-blue-100 text-[#0c34cd]">
                  {ctaItem.badge}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="https://calendly.com/viobts/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#0c34cd] bg-white hover:bg-cyan-50 transition-all duration-300 shadow-lg shadow-black/15 hover:shadow-cyan-400/25 hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0c34cd]" />
              <span>Book a Call</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
