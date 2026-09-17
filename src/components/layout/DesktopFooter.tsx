"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES } from "@/lib/data";

export function DesktopFooter() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Do not render public footer on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const services = INITIAL_SERVICES;
  const industries = INITIAL_INDUSTRIES;

  return (
    <footer className="hidden md:block bg-[#071326] border-t border-blue-900/60 pt-20 pb-12 relative overflow-hidden text-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-16 border-b border-blue-950">
          {/* Column 1: Brand Info (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-36 flex items-center">
                <Image
                  src="/images/vio-logo.png"
                  alt="VIO - The Technology Accelerator"
                  width={140}
                  height={68}
                  className="h-10 w-auto object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-normal">
              The technology accelerator for your business. Richmond, Virginia-headquartered, woman-owned VA-SWaM certified technology consulting partner with a 10+ year track record.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-xs font-semibold text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certified Woman-Owned Small Business (VA-SWaM)</span>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Subscribe to VIO Perspectives
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for subscribing to our executive briefs.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email"
                    required
                    className="flex-1 px-3.5 py-2 rounded-lg bg-white/10 border border-blue-800/80 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Industries
            </p>
            <ul className="space-y-2.5">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/who-we-are" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/who-we-are#mission" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                  Case Studies & Proof
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                  Complimentary Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Governance */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="tel:+18048216588" className="hover:text-cyan-400 transition-colors font-medium">
                  +1 804 821 6588
                </a>
              </li>
              <li>
                <a href="mailto:info@viobts.com" className="hover:text-cyan-400 transition-colors font-medium">
                  info@viobts.com
                </a>
              </li>
              <li className="text-slate-400">
                Richmond, Virginia, USA
              </li>
              <li className="pt-2 border-t border-blue-950">
                <Link href="/podcast" className="hover:text-cyan-400 transition-colors block">
                  Voices of AI Leadership
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-cyan-400 transition-colors block">
                  Articles & Insights
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-cyan-400 font-semibold hover:underline block">
                  Visual CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VIO LLC. Richmond, Virginia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/sitemap.xml" className="hover:text-cyan-400 transition-colors">
              XML Sitemap
            </Link>
            <span className="text-slate-500">Motto: Think bigger, build Smarter, solve harder</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
