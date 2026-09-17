import React from "react";
import { Metadata } from "next";
import { TechnologyWorkforcePageContent } from "@/components/sections/TechnologyWorkforcePageContent";

export const metadata: Metadata = {
  title: "Technology Workforce Solutions | Full-Time, Contract & Project Teams | VIO",
  description: "VIO connects enterprises and government agencies with top-tier technology talent. Full-Time Placements, Contract Staffing, and Project-Based Teams in software, cloud, and data.",
  alternates: {
    canonical: "/technology-workforce-2",
  },
  openGraph: {
    title: "Technology Workforce Solutions | VIO",
    description: "Customized staffing solutions: Full-Time Placements, Contract Staffing, and Managed Teams. VA-SWaM certified, Richmond VA.",
    url: "https://viobts.com/technology-workforce-2",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Technology Workforce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Workforce Solutions | VIO",
    description: "Full-Time Placements, Contract Staffing & Managed Pods.",
    images: ["/images/vio-logo.png"],
  },
};

export default function TechnologyWorkforcePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Technology Workforce Solutions",
    "description": "Connecting businesses with top-tier technology professionals to bridge talent gaps and deliver specialized technical solutions.",
    "provider": {
      "@type": "Organization",
      "name": "VIO",
      "url": "https://viobts.com"
    },
    "serviceType": "IT Staffing & Technology Workforce",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Staffing Models",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Time Placements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Contract Staffing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Project-Based Teams"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TechnologyWorkforcePageContent />
    </>
  );
}
