import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Sparkles } from "lucide-react";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Book a Consultation | VIO | Richmond, VA",
  description: "Schedule a complimentary technical consultation with VIO's principal architects. Richmond, VA headquarters, phone: +1 804 821 6588, email: info@viobts.com.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact VIO | Technology Accelerator",
    description: "Connect directly with VIO's architecture team for a complimentary technical consultation and scoping session. Richmond, VA.",
    url: "https://viobts.com/contact",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact VIO | Technology Accelerator",
    description: "Richmond, VA headquarters. Phone: +1 804 821 6588. Email: info@viobts.com.",
    images: ["/images/vio-logo.png"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://viobts.com/contact#webpage",
        "name": "Contact VIO",
        "url": "https://viobts.com/contact",
        "description": "Contact VIO Technology Accelerator for enterprise architecture and workforce consulting.",
        "mainEntity": {
          "@type": "LocalBusiness",
          "name": "VIO",
          "telephone": "+1-804-821-6588",
          "email": "info@viobts.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Richmond",
            "addressRegion": "VA",
            "addressCountry": "US"
          }
        }
      }
    ]
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc]/50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-4">
          <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0066cc] uppercase">
            START A TECHNICAL CONVERSATION
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Let's Build <span className="text-[#0066cc]">What's Next</span>
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Connect directly with VIO's architecture team for a complimentary technical consultation and architectural scoping session.
        </p>
      </section>

      {/* Interactive Form & Contact Details Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ContactClient />
      </section>
    </div>
  );
}
