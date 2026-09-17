"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  X
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
  heading = "Meet Our Clients!",
  subheading = "Powering mission-critical digital transformations for Virginia state agencies, USAID, tier-1 FinTech brokerages, and Fortune 500 enterprises.",
  logos = DEFAULT_CLIENT_LOGOS,
  testimonials = DEFAULT_CLIENT_TESTIMONIALS,
}: MeetOurClientsProps) {
  const activeLogos = logos && logos.length > 0 ? logos : DEFAULT_CLIENT_LOGOS;
  const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_CLIENT_TESTIMONIALS;

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [logoScrollOffset, setLogoScrollOffset] = useState(0);
  const [selectedClientModal, setSelectedClientModal] = useState<ClientLogoItem | null>(null);

  // Keep index within range if testimonials array changes
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

  const handleScrollLogosLeft = () => {
    setLogoScrollOffset((prev) => (prev <= 0 ? activeLogos.length - 1 : prev - 1));
  };

  const handleScrollLogosRight = () => {
    setLogoScrollOffset((prev) => (prev + 1 >= activeLogos.length ? 0 : prev + 1));
  };

  const visibleLogos = [
    ...activeLogos.slice(logoScrollOffset),
    ...activeLogos.slice(0, logoScrollOffset)
  ].slice(0, 6);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e1f3fc]/80 via-[#f0f9fd]/50 to-white">
      {/* Background Soft Atmospheric Tint */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,_rgba(186,230,253,0.35)_0%,_rgba(240,249,255,0.1)_60%,_transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-[#071739] drop-shadow-xs font-sans">
            {heading}
          </h2>
        </div>

        {/* Client Logos Carousel Row */}
        <div className="relative mb-12 sm:mb-16 flex items-center justify-center gap-2 sm:gap-4 max-w-6xl mx-auto">
          {/* Left Arrow Button for Logos */}
          <button
            onClick={handleScrollLogosLeft}
            aria-label="Previous client logos"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition-all focus:outline-none"
            title="Previous clients"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 6 Visible Logo Cards */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-hidden py-2 px-1 w-full">
            {visibleLogos.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClientModal(client)}
                className="group shrink-0 w-36 sm:w-44 lg:w-48 h-20 sm:h-24 bg-white rounded-2xl border border-blue-100/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex items-center justify-center p-3.5 sm:p-4 hover:-translate-y-0.5"
                title={`Click to view ${client.name} impact`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={client.svgSrc}
                    alt={client.name}
                    className="max-h-12 w-auto max-w-[135px] object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right Red Chevron Scroll Button (matching original site) */}
          <button
            onClick={handleScrollLogosRight}
            aria-label="Next client logos"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 hover:scale-110 transition-transform focus:outline-none"
            title="Next clients"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows on Left and Right of Card */}
          <button
            onClick={handlePrevTestimonial}
            aria-label="Previous testimonial"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-lg hover:bg-[#0052a3] transition-colors focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={handleNextTestimonial}
            aria-label="Next testimonial"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-lg hover:bg-[#0052a3] transition-colors focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Card Container */}
          <div className="bg-white rounded-3xl border border-slate-100/80 shadow-xl shadow-sky-900/5 p-6 sm:p-10 lg:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Visual Banner Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-[#071739]">
                  <Image
                    src={currentTestimonial.imageSrc}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Name, Quote, LinkedIn */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071739] tracking-tight mb-4">
                    {currentTestimonial.name}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                    “ {currentTestimonial.quote} ”
                  </p>
                </div>

                {/* LinkedIn Icon */}
                <div>
                  <a
                    href={currentTestimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[#0077b5] text-white hover:opacity-90 transition-opacity shadow-xs"
                    title="Connect on LinkedIn"
                  >
                    <span className="font-bold text-sm tracking-tighter">in</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Interactive Impact Modal when clicking any client logo */}
      {selectedClientModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedClientModal(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-28 relative flex items-center justify-center p-1 bg-slate-50 rounded-lg border border-slate-100">
                  <img
                    src={selectedClientModal.svgSrc}
                    alt={selectedClientModal.name}
                    className="max-h-8 w-auto max-w-[100px] object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{selectedClientModal.name}</h4>
                  <span className="text-xs text-blue-600 font-semibold">{selectedClientModal.category}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedClientModal(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
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
              <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                {selectedClientModal.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-base font-black text-blue-700">{m.value}</div>
                    <div className="text-[11px] text-slate-600 font-medium">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedClientModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
              {selectedClientModal.caseStudySlug && (
                <Link
                  href={`/case-studies/${selectedClientModal.caseStudySlug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
