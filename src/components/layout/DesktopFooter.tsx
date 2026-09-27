"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  ArrowUp
} from "lucide-react";
import { cmsStore, FooterConfig, INITIAL_FOOTER_CONFIG } from "@/lib/data";

export function DesktopFooter() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [config, setConfig] = useState<FooterConfig>(INITIAL_FOOTER_CONFIG);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  // Sync config when client mounts
  useEffect(() => {
    setIsMounted(true);
    try {
      const liveConfig = cmsStore.getFooterConfig();
      if (liveConfig) {
        setConfig(liveConfig);
      }
    } catch {
      // fallback to initial
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const toggleAccordion = (columnId: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Do not render public footer on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { deviceSettings, columns, legalLinks } = config;

  return (
    <footer className="w-full bg-gradient-to-b from-[#0c34cd] via-[#092699] to-[#06185f] border-t border-white/20 pt-12 md:pt-20 pb-24 md:pb-12 relative overflow-hidden text-white transition-all">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-cyan-400/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-blue-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Mobile Quick Contact Action Bar (if enabled for mobile) */}
        {deviceSettings.mobile.showQuickContactBar && (
          <div className="block md:hidden pb-4 border-b border-white/15">
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${config.contactPhone.replace(/\s+/g, "")}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-center transition-all"
              >
                <Phone className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="text-[10px] font-bold text-white leading-none">Call Office</span>
              </a>

              <a
                href={`mailto:${config.contactEmail}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-center transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="text-[10px] font-bold text-white leading-none">Email Us</span>
              </a>

              <a
                href={config.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400/40 text-center transition-all"
              >
                <Calendar className="w-4 h-4 text-cyan-200 mb-1" />
                <span className="text-[10px] font-black text-cyan-100 leading-none">Book Call</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Grid: Responsive across Mobile, Tablet, and Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {/* Brand Info Column (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group py-1">
              <Image
                src="/images/vio-logo.png"
                alt={`${config.companyName} - The Technology Accelerator`}
                width={140}
                height={68}
                className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/85 max-w-sm leading-relaxed font-normal">
              {config.tagline}
            </p>

            {/* SWaM Certification Badge */}
            {config.showSwamBadge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-cyan-200">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="truncate">{config.swamBadgeText}</span>
              </div>
            )}

            {/* Social & Leadership Connect Links - Sleek Icon Only */}
            <div className="pt-1 flex flex-wrap items-center gap-2" suppressHydrationWarning>
              {config.linkedinUrl && (
                <a
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO Company LinkedIn"
                  aria-label="LinkedIn"
                >
                  <SocialIcon platform="linkedin" />
                </a>
              )}

              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO on Twitter / X"
                  aria-label="Twitter / X"
                >
                  <SocialIcon platform="twitter" />
                </a>
              )}

              {config.youtubeUrl && (
                <a
                  href={config.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO on YouTube"
                  aria-label="YouTube"
                >
                  <SocialIcon platform="youtube" />
                </a>
              )}

              {config.githubUrl && (
                <a
                  href={config.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO GitHub Code Repository"
                  aria-label="GitHub"
                >
                  <SocialIcon platform="github" />
                </a>
              )}

              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO on Facebook"
                  aria-label="Facebook"
                >
                  <SocialIcon platform="facebook" />
                </a>
              )}

              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title="VIO on Instagram"
                  aria-label="Instagram"
                >
                  <SocialIcon platform="instagram" />
                </a>
              )}

              {/* Dynamic Custom Social Links */}
              {config.socialLinks && config.socialLinks.filter(s => s.isEnabled && !["linkedin", "twitter", "youtube", "github", "facebook", "instagram"].includes(s.platform)).map(soc => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-200 flex items-center justify-center transition-all shadow-xs hover:scale-110 active:scale-95"
                  title={soc.label}
                  aria-label={soc.label}
                >
                  <SocialIcon platform={soc.platform} />
                </a>
              ))}

              {config.founderLinkedinUrl && (
                <a
                  href={config.founderLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all shadow-xs hover:scale-105"
                  title="Malathi Vakkalanka - Founder & CEO"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Founder LinkedIn</span>
                </a>
              )}
            </div>

            {/* Newsletter Subscription */}
            {config.newsletterEnabled && (
              <div className="pt-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  {config.newsletterTitle}
                </p>
                <p className="text-[11px] text-white/70 mb-2">
                  {config.newsletterDescription}
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold bg-white/10 px-3 py-2 rounded-lg border border-white/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Thank you for subscribing to executive briefs.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter corporate email"
                      required
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/15"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white text-[#0c34cd] font-extrabold text-xs hover:bg-cyan-50 transition-all shadow-sm shrink-0"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Navigation Columns (Render as Accordion on Mobile if collapsibleColumns is enabled, or standard list on Tablet/Desktop) */}
          {columns.map((col) => {
            const isOpen = openAccordions[col.id] ?? false;

            return (
              <div key={col.id} className="border-b border-white/10 md:border-b-0 pb-4 md:pb-0">
                {/* Desktop & Tablet Header */}
                <p className="hidden md:block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-4">
                  {col.title}
                </p>

                {/* Mobile Collapsible Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(col.id)}
                  className="flex md:hidden items-center justify-between w-full py-2 text-xs font-bold text-cyan-300 uppercase tracking-widest focus:outline-none"
                >
                  <span>{col.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-300 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Links List: Always visible on tablet/desktop, collapsible on mobile */}
                <div className={`${isOpen ? "block" : "hidden md:block"} pt-2 md:pt-0`}>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.id}>
                        {link.isExternal ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3 text-cyan-300" />
                          </a>
                        ) : (
                          <Link
                            href={link.url}
                            className="text-xs text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                          >
                            <span>{link.label}</span>
                            {link.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Legal, Slogan & Back to Top */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p className="text-center sm:text-left">
            {config.copyrightText.replace("{year}", new Date().getFullYear().toString())}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {legalLinks.map((ll) => (
              <Link key={ll.id} href={ll.url} className="hover:text-white transition-colors">
                {ll.label}
              </Link>
            ))}

            {config.slogan && (
              <span className="text-cyan-200 font-medium hidden sm:inline">
                {config.slogan}
              </span>
            )}

            {/* Back to top button */}
            {deviceSettings.mobile.showBackToTop && (
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-white transition-colors p-1"
                aria-label="Scroll back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alias for semantic naming
export const SiteFooter = DesktopFooter;

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case "twitter":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "youtube":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case "github":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case "facebook":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    default:
      return <ExternalLink className="w-4 h-4 text-cyan-300" />;
  }
}
