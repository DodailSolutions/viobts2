import React from "react";
import { Metadata } from "next";
import { CloudEnablementPageContent } from "@/components/sections/CloudEnablementPageContent";

export const metadata: Metadata = {
  title: "Cloud Enablement & CI/CD Pipelines | AWS, Azure, GCP DevOps | VIO",
  description: "VIO streamlines IT operations with automated GitOps CI/CD pipelines, multi-cloud enablement across AWS, Azure & GCP, and immutable Infrastructure as Code (Terraform). Cut deployment cycles by 85%.",
  alternates: {
    canonical: "/cloud-enablement-and-ci-cd-pipelines",
  },
  openGraph: {
    title: "Cloud Enablement & CI/CD Pipelines | VIO",
    description: "Streamline IT operations with zero-downtime multi-cloud and CI/CD pipelines. AWS, Azure, GCP, Kubernetes, and Terraform. Richmond, VA.",
    url: "https://viobts.com/cloud-enablement-and-ci-cd-pipelines",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Cloud Enablement & CI/CD Pipelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Enablement & CI/CD Pipelines | VIO",
    description: "Zero-downtime automated pipelines and resilient cloud infrastructure.",
    images: ["/images/vio-logo.png"],
  },
};

export default function CloudEnablementAndCiCdPipelinesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/cloud-enablement-and-ci-cd-pipelines#service",
        "name": "Cloud Enablement & CI/CD Pipelines",
        "description": "Streamline IT operations, automate zero-downtime releases, and scale resilient multi-cloud architectures across AWS, Azure, and Google Cloud.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "Cloud Enablement & DevOps Consulting",
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cloud & DevOps Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Multi-Cloud Strategy & Workload Migration"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Automated GitOps & CI/CD Delivery"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Infrastructure as Code & FinOps Optimization"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/cloud-enablement-and-ci-cd-pipelines#breadcrumb",
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
            "name": "Cloud Enablement & CI/CD Pipelines",
            "item": "https://viobts.com/cloud-enablement-and-ci-cd-pipelines"
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
      <CloudEnablementPageContent />
    </>
  );
}
