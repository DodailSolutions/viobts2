import React from "react";
import { Metadata } from "next";
import { RpaMlAiPageContent } from "@/components/sections/RpaMlAiPageContent";

export const metadata: Metadata = {
  title: "AI & Machine Learning Solutions | Intelligent Automation & Machine Intelligence | VIO",
  description: "VIO provides enterprise Robotic Process Automation (UiPath, Power Automate), predictive machine learning, and secure private generative AI solutions. Slash manual handling by 85% with rapid ROI within 90 days. VA-SWaM certified.",
  alternates: {
    canonical: "/services/ai-machine-learning",
  },
  openGraph: {
    title: "AI & Machine Learning Solutions | VIO Technology Accelerator",
    description: "Automate tasks and drive intelligence with enterprise RPA, machine learning pipelines, and private agentic AI. Richmond, VA-headquartered VA-SWaM certified partner.",
    url: "https://viobts.com/services/ai-machine-learning",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO AI & Machine Learning Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Machine Learning Solutions | VIO",
    description: "Enterprise robotic process automation, intelligent document processing, and private generative AI systems.",
    images: ["/images/vio-logo.png"],
  },
};

export default function AiMachineLearningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/services/ai-machine-learning#service",
        "name": "AI & Machine Learning Solutions",
        "description": "Automate tasks and drive intelligence with Robotic Process Automation, Machine Learning, and Artificial Intelligence.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Intelligent Automation & AI Consulting",
        "areaServed": "United States"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/services/ai-machine-learning#breadcrumb",
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
            "name": "AI & Machine Learning",
            "item": "https://viobts.com/services/ai-machine-learning"
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
