import React from "react";
import { Metadata } from "next";
import { OpenSourceIntegrationPageContent } from "@/components/sections/OpenSourceIntegrationPageContent";

export const metadata: Metadata = {
  title: "Open Source Integration Solutions | Linux, K8s & PostgreSQL | VIO",
  description: "VIO hardens, integrates, and manages enterprise open-source solutions across PostgreSQL, Kubernetes, and Apache Kafka. Cut licensing fees by 45%+ with zero vendor lock-in. VA-SWaM certified.",
  alternates: {
    canonical: "/open-source-integration",
  },
  openGraph: {
    title: "Open Source Integration Solutions | VIO",
    description: "Break free from proprietary lock-in with hardened open-source stacks. PostgreSQL, Kubernetes, Apache Kafka, and Linux Foundation stacks. Richmond, VA.",
    url: "https://viobts.com/open-source-integration",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Open Source Integration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Integration Solutions | VIO",
    description: "Hardened Open-Source Stacks, PostgreSQL, Kubernetes & Apache Kafka.",
    images: ["/images/vio-logo.png"],
  },
};

export default function OpenSourceIntegrationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/open-source-integration#service",
        "name": "Open-source Integration Solutions",
        "description": "Architect flexible, cost-effective digital infrastructures powered by proven open-source ecosystems without vendor lock-in.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Enterprise Open-Source Architecture Consulting",
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Open Source Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Proprietary-to-OSS Migration & Modernization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Enterprise Stack Hardening & Governance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Plugin, Driver & Connector Engineering"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/open-source-integration#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://viobts.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://viobts.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Open-source Integration",
            "item": "https://viobts.com/open-source-integration"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OpenSourceIntegrationPageContent />
    </>
  );
}
