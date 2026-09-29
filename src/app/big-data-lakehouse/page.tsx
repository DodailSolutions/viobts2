import React from "react";
import { Metadata } from "next";
import { BigDataAnalyticsPageContent } from "@/components/sections/BigDataAnalyticsPageContent";

export const metadata: Metadata = {
  title: "Big Data & Lakehouse Solutions | Cloud Lakehouse, Streaming & AI | VIO",
  description: "VIO architects high-throughput cloud lakehouses, sub-second streaming pipelines, and predictive BI across Snowflake, Databricks, and BigQuery. Accelerate query performance by 4.2x and reduce TCO.",
  alternates: {
    canonical: "/services/big-data-lakehouse",
  },
  openGraph: {
    title: "Big Data & Lakehouse Solutions | VIO",
    description: "Transform raw data into real-time decision foresight. Modern cloud lakehouses, streaming pipelines, and executive dashboards. Certified VA-SWaM, Richmond VA.",
    url: "https://viobts.com/services/big-data-lakehouse",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Big Data and Lakehouse Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Data & Lakehouse Solutions | VIO",
    description: "Cloud Lakehouse, Real-Time Streaming & Executive BI.",
    images: ["/images/vio-logo.png"],
  },
};

export default function BigDataLakehousePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/services/big-data-lakehouse#service",
        "name": "Big Data Lakehouse Solutions",
        "description": "Transform raw multi-source telemetry into real-time decision intelligence, governed lakehouses, and predictive business intelligence.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Enterprise Big Data & Lakehouse Consulting",
        "areaServed": "United States"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/services/big-data-lakehouse#breadcrumb",
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
            "name": "Big Data Lakehouse",
            "item": "https://viobts.com/services/big-data-lakehouse"
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
