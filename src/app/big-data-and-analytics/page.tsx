import React from "react";
import { Metadata } from "next";
import { BigDataAnalyticsPageContent } from "@/components/sections/BigDataAnalyticsPageContent";

export const metadata: Metadata = {
  title: "Big Data & Analytics Solutions | Cloud Lakehouse, Streaming & AI | VIO",
  description: "VIO architects high-throughput cloud lakehouses, sub-second streaming pipelines, and predictive BI across Snowflake, Databricks, and BigQuery. Accelerate query performance by 4.2x and reduce TCO.",
  alternates: {
    canonical: "/big-data-and-analytics",
  },
  openGraph: {
    title: "Big Data & Analytics Solutions | VIO",
    description: "Transform raw data into real-time decision foresight. Modern cloud lakehouses, streaming pipelines, and executive dashboards. Certified VA-SWaM, Richmond VA.",
    url: "https://viobts.com/big-data-and-analytics",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Big Data and Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Data & Analytics Solutions | VIO",
    description: "Cloud Lakehouse, Real-Time Streaming & Executive BI.",
    images: ["/images/vio-logo.png"],
  },
};

export default function BigDataAnalyticsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/big-data-and-analytics#service",
        "name": "Big Data & Analytics Solutions",
        "description": "Transform raw multi-source telemetry into real-time decision intelligence, governed lakehouses, and predictive business intelligence.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Enterprise Big Data & Analytics Consulting",
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Big Data & Analytics Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cloud Lakehouse & Modern Warehousing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Real-Time Streaming & Event Pipelines"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Executive BI, Predictive Models & AI"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/big-data-and-analytics#breadcrumb",
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
            "name": "Big Data & Analytics",
            "item": "https://viobts.com/big-data-and-analytics"
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
      <BigDataAnalyticsPageContent />
    </>
  );
}
