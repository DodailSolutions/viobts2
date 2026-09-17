import React from "react";
import { Metadata } from "next";
import { Calendar, ShieldCheck, Clock } from "lucide-react";
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

export default function BookACallPage() {
  return (
    <div className="pt-28 pb-20 bg-[#f8fafc]/50 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-4">
          <Calendar className="w-4 h-4 text-[#0066cc]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0066cc] uppercase">
            30-MINUTE ARCHITECTURE DISCOVERY
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Book a Call with a <span className="text-[#0066cc]">Principal Architect</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Pick a time that suits your calendar for a direct, zero-obligation scoping session on cloud enablement, big data, or engineering workforce pods.
        </p>
      </section>

      {/* Interactive Form & Contact Details Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ContactClient />
      </section>
    </div>
  );
}
