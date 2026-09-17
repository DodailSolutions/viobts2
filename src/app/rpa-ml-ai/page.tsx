import React from "react";
import { Metadata } from "next";
import { RpaMlAiPageContent } from "@/components/sections/RpaMlAiPageContent";

export const metadata: Metadata = {
  title: "RPA, ML & AI Solutions | Intelligent Automation & Machine Intelligence | VIO",
  description: "VIO provides enterprise Robotic Process Automation (UiPath, Power Automate), predictive machine learning, and secure private generative AI solutions. Slash manual handling by 85% with rapid ROI within 90 days. VA-SWaM certified.",
  alternates: {
    canonical: "/rpa-ml-ai",
  },
  openGraph: {
    title: "RPA, ML & AI Solutions | VIO Technology Accelerator",
    description: "Automate tasks and drive intelligence with enterprise RPA, machine learning pipelines, and private agentic AI. Richmond, VA-headquartered VA-SWaM certified partner.",
    url: "https://viobts.com/rpa-ml-ai",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO RPA, ML & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPA, ML & AI Solutions | VIO",
    description: "Enterprise robotic process automation, intelligent document processing, and private generative AI systems.",
    images: ["/images/vio-logo.png"],
  },
};

export default function RpaMlAiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/rpa-ml-ai#service",
        "name": "RPA, ML & AI Solutions",
        "description": "Automate tasks and drive intelligence with Robotic Process Automation, Machine Learning, and Artificial Intelligence.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Intelligent Automation & AI Consulting",
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Automation & AI Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Enterprise Robotic Process Automation (RPA)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Intelligent Document Processing (IDP) & Cognitive OCR"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Predictive Machine Learning & Agentic Generative AI"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/rpa-ml-ai#breadcrumb",
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
            "name": "RPA, ML & AI",
            "item": "https://viobts.com/rpa-ml-ai"
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
      <RpaMlAiPageContent />
    </>
  );
}
