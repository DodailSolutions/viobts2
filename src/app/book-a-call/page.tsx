import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Calendar, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Phone,
  Mail,
  Award
} from "lucide-react";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Book a Strategy Call | 30-Min Architecture Consultation | VIO",
  description: "Schedule a complimentary 30-minute architecture discovery session with VIO's principal engineering leadership. Richmond, VA.",
  alternates: {
    canonical: "/book-a-call",
  },
  openGraph: {
    title: "Book a Call | VIO Technology Accelerator",
    description: "Connect with our principal architects to review your technical roadmap. No obligation, 30-minute scoping call.",
    url: "https://viobts.com/book-a-call",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Book a Call",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call | VIO Technology Accelerator",
    description: "Schedule a complimentary technical consultation with our engineering team.",
    images: ["/images/vio-logo.png"],
  },
};

const CALENDLY_URL = "https://calendly.com/viobts/consultation";

export default function BookACallPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-gradient-to-b from-[#f8fafc] via-white to-blue-50/30 min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 mb-5 shadow-xs">
          <Calendar className="w-4 h-4 text-[#0c34cd]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0c34cd] uppercase">
            30-MINUTE ARCHITECTURE DISCOVERY
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Book a Call with a <span className="text-[#0c34cd]">Principal Architect</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
          Pick a time that suits your calendar for a direct, zero-obligation scoping session on cloud enablement, big data, AI/ML, or engineering workforce pods.
        </p>

        {/* Action Buttons & Fast Link */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Open in Calendly (Full Screen)</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300/80 shadow-xs hover:shadow-sm transition-all"
          >
            <Mail className="w-4 h-4 text-slate-500" />
            <span>Prefer Email / Message</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>30 Minutes Duration</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Free & No Obligation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Direct Principal Engineering Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>VA-SWaM Certified</span>
          </div>
        </div>
      </section>

      {/* Embedded Calendly Scheduler */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-[#071739] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-900/60">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Live Consultation Calendar</p>
                <p className="text-xs text-slate-300">Synchronized directly with VIO executive scheduling</p>
              </div>
            </div>
            
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 hover:underline"
            >
              <span>Trouble loading? Open link directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Calendly iFrame with fallback */}
          <div className="relative w-full min-h-[720px] bg-white">
            <iframe
              src="https://calendly.com/viobts/consultation?hide_landing_page_details=0&hide_gdpr_banner=1&background_color=ffffff&text_color=071739&primary_color=0c34cd"
              width="100%"
              height="750"
              frameBorder="0"
              title="VIO Consultation Scheduling"
              className="w-full min-h-[750px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Alternative Contact & RFP Section */}
      <section id="contact-form" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span>Alternative Contact Option</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071739]">
            Have an RFP or Need Custom Times?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Send us a direct inquiry or request an alternative time window. Our executive delivery team will respond within 24 business hours.
          </p>
        </div>

        <ContactClient />
      </section>
    </div>
  );
}
