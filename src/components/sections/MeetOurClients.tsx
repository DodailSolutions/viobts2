"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  X,
  Layers,
  Award,
  TrendingUp,
  Building2
} from "lucide-react";

import { 
  ClientLogoItem, 
  ClientTestimonialItem, 
  DEFAULT_CLIENT_LOGOS, 
  DEFAULT_CLIENT_TESTIMONIALS 
} from "@/lib/data";

interface MeetOurClientsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  logos?: ClientLogoItem[];
  testimonials?: ClientTestimonialItem[];
}

export function MeetOurClients({
  eyebrow = "PROVEN ENTERPRISE PARTNERSHIPS",
  heading = "Meet Our Clients & Partners",
  subheading = "Powering mission-critical digital transformations for Virginia state agencies, USAID, tier-1 FinTech brokerages, and Fortune 500 enterprises.",
  logos = DEFAULT_CLIENT_LOGOS,
  testimonials = DEFAULT_CLIENT_TESTIMONIALS,
}: MeetOurClientsProps) {
  const activeLogos = logos && logos.length > 0 ? logos : DEFAULT_CLIENT_LOGOS;
  const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_CLIENT_TESTIMONIALS;

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [selectedClientModal, setSelectedClientModal] = useState<ClientLogoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { label: "All Clients", count: activeLogos.length, key: "All" },
    { label: "Government & Public", count: activeLogos.filter(l => l.category.toLowerCase().includes("government") || l.category.toLowerCase().includes("public")).length, key: "Government" },
    { label: "Healthcare & Life Sciences", count: activeLogos.filter(l => l.category.toLowerCase().includes("health") || l.category.toLowerCase().includes("life")).length, key: "Healthcare" },
    { label: "Banking & FinTech", count: activeLogos.filter(l => l.category.toLowerCase().includes("bank") || l.category.toLowerCase().includes("fin")).length, key: "Banking" },
    { label: "Enterprise & Retail", count: activeLogos.filter(l => l.category.toLowerCase().includes("retail") || l.category.toLowerCase().includes("enterprise") || l.category.toLowerCase().includes("energy")).length, key: "Enterprise" },
  ];

  const filteredLogos = activeCategory === "All" 
    ? activeLogos 
    : activeLogos.filter(l => {
        const cat = l.category.toLowerCase();
        if (activeCategory === "Government") return cat.includes("government") || cat.includes("public");
        if (activeCategory === "Healthcare") return cat.includes("health") || cat.includes("life");
        if (activeCategory === "Banking") return cat.includes("bank") || cat.includes("fin");
        if (activeCategory === "Enterprise") return cat.includes("retail") || cat.includes("enterprise") || cat.includes("energy");
        return true;
      });

  const safeIndex = currentTestimonialIndex >= activeTestimonials.length ? 0 : currentTestimonialIndex;
  const currentTestimonial = activeTestimonials[safeIndex] || DEFAULT_CLIENT_TESTIMONIALS[0];

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? activeTestimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev >= activeTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Determine whether the testimonial graphic already has text baked into it
  const isVioGraphicCard = ["adithya-buddhavarapu", "vamsi-madabhushi", "prabhu-chandrasekhar"].includes(currentTestimonial.id);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40">
      {/* Subtle Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-blue-100/40 via-sky-100/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading & Trust Signals */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0c34cd] uppercase">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#071739] mb-4">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
            {subheading}
          </p>

          {/* Social Proof Rating Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">4.9 / 5.0 Rating</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-600">50+ Enterprise Engagements</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-[#0c34cd] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              VA-SWaM Certified
            </span>
          </div>
        </div>

        {/* Client Logos Showcase */}
        <div className="mb-20 max-w-6xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === cat.key
                    ? "bg-[#0c34cd] text-white shadow-md shadow-blue-700/20 scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeCategory === cat.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Responsive Modern Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {filteredLogos.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClientModal(client)}
                className="group relative h-28 bg-white rounded-2xl border border-slate-200/80 hover:border-[#0c34cd] shadow-xs hover:shadow-xl hover:shadow-blue-700/10 transition-all duration-300 flex flex-col items-center justify-between p-3.5 hover:-translate-y-1 text-center"
                title={`Click to view ${client.name} impact & project metrics`}
              >
                {/* Logo Image */}
                <div className="relative w-full flex-1 flex items-center justify-center">
                  <img
                    src={client.svgSrc}
                    alt={client.name}
                    className="max-h-10 w-auto max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback logic if any image fails to load
                      const target = e.currentTarget;
                      if (client.id === "fda" && target.src.endsWith(".svg")) {
                        target.src = "/images/clients/fda-official.png";
                      } else if (client.id === "advance-auto" && target.src.endsWith(".svg")) {
                        target.src = "/images/clients/advance-auto-official.png";
                      } else if (target.src.endsWith("-official.png")) {
                        target.src = `/images/clients/${client.id}.svg`;
                      }
                    }}
                  />
                </div>

                {/* Client Label */}
                <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#0c34cd] transition-colors truncate">
                    {client.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 group-hover:text-[#0c34cd] shrink-0">
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 font-medium mt-4">
            Click any client logo to view verified delivery metrics, case studies, and engineering scope.
          </p>
        </div>

        {/* Featured Testimonials Showcase */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-950/5 p-6 sm:p-8 lg:p-10 transition-all">
            
            {/* Card Header: Client Switcher Tabs & Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
              
              {/* Executive Avatars / Switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {activeTestimonials.map((t, idx) => (
                  <button
                    key={t.id || idx}
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-2 ${
                      idx === safeIndex
                        ? "bg-[#0c34cd] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <span>{t.badgeCompany || t.company}</span>
                  </button>
                ))}
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span className="text-xs font-bold text-slate-400 mr-1">
                  <span className="text-slate-900 font-black">0{safeIndex + 1}</span> / 0{activeTestimonials.length}
                </span>

                <button
                  onClick={handlePrevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0c34cd] text-slate-700 hover:text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                
                <button
                  onClick={handleNextTestimonial}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0c34cd] text-slate-700 hover:text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>

            {/* Testimonial Body: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Clean Graphic Presentation */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-[#071739]">
                  <img
                    src={currentTestimonial.imageSrc}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />

                  {/* Only show overlay if this is a standard headshot without baked-in card text */}
                  {!isVioGraphicCard && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-sm font-black">{currentTestimonial.name}</p>
                        <p className="text-xs text-cyan-300 font-medium">{currentTestimonial.role}, {currentTestimonial.company}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Verified LinkedIn Button */}
                {currentTestimonial.linkedinUrl && (
                  <div className="w-full mt-4">
                    <a
                      href={currentTestimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5] hover:bg-[#005f93] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                      title={`View ${currentTestimonial.name}'s verified LinkedIn profile`}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>Connect with {currentTestimonial.name.split(" ")[0]} on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Quote & Endorsement Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#0c34cd] border border-blue-200/80">
                      {currentTestimonial.badgeCompany || currentTestimonial.company}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {currentTestimonial.badgeRole || currentTestimonial.role}
                    </span>
                  </div>

                  {/* Executive Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#071739] tracking-tight mb-4">
                    {currentTestimonial.name}
                  </h3>

                  {/* Quotation Body */}
                  <div className="relative mb-6">
                    <span className="absolute -top-4 -left-2 text-6xl font-serif text-[#0c34cd]/15 leading-none select-none pointer-events-none">“</span>
                    <p className="relative text-slate-700 text-sm sm:text-base leading-relaxed pl-4 font-normal">
                      {currentTestimonial.quote}
                    </p>
                  </div>
                </div>

                {/* Verified Trust Strip */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Verified Executive Client Endorsement</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-slate-700">5.0 Delivery Rating</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Call to Action Strip */}
        <div className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0c34cd] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-700/25">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black tracking-tight">
              Ready to accelerate your technical roadmap?
            </h4>
            <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-normal">
              Join industry leaders like Walmart, Capital One, and USAID who trust VIO for mission-critical delivery.
            </p>
          </div>

          <a
            href="https://calendly.com/viobts/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0c34cd] hover:bg-cyan-50 font-black text-xs shadow-md transition-all shrink-0 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Interactive Impact Modal when clicking any client logo */}
      {selectedClientModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedClientModal(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-28 relative flex items-center justify-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <img
                    src={selectedClientModal.svgSrc}
                    alt={selectedClientModal.name}
                    className="max-h-9 w-auto max-w-[90px] object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{selectedClientModal.name}</h4>
                  <span className="text-xs text-[#0c34cd] font-semibold">{selectedClientModal.category}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedClientModal(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Headline & Summary */}
            <div className="mb-5">
              <h5 className="text-sm font-bold text-slate-900 mb-1.5">{selectedClientModal.headline}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedClientModal.summary}</p>
            </div>

            {/* Metrics */}
            {selectedClientModal.metrics && (
              <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                {selectedClientModal.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-base font-black text-[#0c34cd]">{m.value}</div>
                    <div className="text-[11px] text-slate-600 font-medium">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              {selectedClientModal.websiteUrl ? (
                <a
                  href={selectedClientModal.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c34cd] hover:underline"
                >
                  <span>Visit Client Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedClientModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
                {selectedClientModal.caseStudySlug && (
                  <Link
                    href={`/case-studies/${selectedClientModal.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0c34cd] text-white font-bold text-xs hover:bg-[#0a2cb0] shadow-sm"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
