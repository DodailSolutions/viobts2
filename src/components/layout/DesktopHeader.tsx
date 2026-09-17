"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck 
} from "lucide-react";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES } from "@/lib/data";

export function DesktopHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render public header on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const services = INITIAL_SERVICES;
  const industries = INITIAL_INDUSTRIES;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 hidden md:block h-20 ${
        scrolled
          ? "bg-[#071739]/95 backdrop-blur-md border-b border-blue-900/60 shadow-xl shadow-black/20"
          : "bg-[#071739] border-b border-blue-900/40"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* VIO Official Brand Logo (White logo on Corporate Blue) */}
        <Link href="/" className="flex items-center group">
          <div className="relative h-11 w-36 flex items-center">
            <Image
              src="/images/vio-logo.png"
              alt="VIO - The Technology Accelerator"
              width={140}
              height={68}
              className="h-10 w-auto object-contain object-left group-hover:opacity-90 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation with Mega Menus */}
        <nav className="flex items-center gap-1 lg:gap-2">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("services")}
          >
            <button
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                pathname.startsWith("/services")
                  ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === "services" ? "rotate-180 text-cyan-400" : "text-slate-400"
                }`}
              />
            </button>

            {activeMenu === "services" && (
              <div className="absolute top-full -left-20 w-[680px] pt-3 animate-fade-in">
                <div className="p-6 rounded-2xl shadow-2xl border border-blue-800/80 bg-[#0B1B3D] text-white">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-900/60">
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      6 Core Technology Pillars
                    </p>
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <Link
                        key={srv.id}
                        href={`/services/${srv.slug}`}
                        className="p-3 rounded-xl hover:bg-white/10 transition-colors group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                          {srv.title}
                        </p>
                        <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                          {srv.subtitle}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("industries")}
          >
            <button
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                pathname.startsWith("/industries")
                  ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === "industries" ? "rotate-180 text-cyan-400" : "text-slate-400"
                }`}
              />
            </button>

            {activeMenu === "industries" && (
              <div className="absolute top-full -left-20 w-[640px] pt-3 animate-fade-in">
                <div className="p-6 rounded-2xl shadow-2xl border border-blue-800/80 bg-[#0B1B3D] text-white">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-900/60">
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      Tailored Industry Solutions
                    </p>
                    <Link
                      href="/industries"
                      className="text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      <span>View All Industries</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {industries.map((ind) => (
                      <Link
                        key={ind.id}
                        href={`/industries/${ind.slug}`}
                        className="p-3 rounded-xl hover:bg-white/10 transition-colors group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                          {ind.title}
                        </p>
                        <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                          {ind.eyebrow}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Who We Are */}
          <Link
            href="/who-we-are"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              pathname === "/who-we-are"
                ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Who We Are
          </Link>

          {/* Case Studies */}
          <Link
            href="/case-studies"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              pathname.startsWith("/case-studies")
                ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Case Studies
          </Link>

          {/* Insights */}
          <Link
            href="/insights"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              pathname.startsWith("/insights") || pathname.startsWith("/blogs")
                ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Insights
          </Link>

          {/* Careers */}
          <Link
            href="/careers"
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              pathname === "/careers"
                ? "text-cyan-400 bg-blue-950/80 border border-cyan-500/30"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Careers
          </Link>
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-300 hover:text-white border border-blue-800/80 hover:border-cyan-400/50 bg-white/5 transition-all"
          >
            Admin CMS
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </header>
  );
}
