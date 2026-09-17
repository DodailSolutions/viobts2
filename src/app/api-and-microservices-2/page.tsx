import React from "react";
import { Metadata } from "next";
import { ApiMicroservicesPageContent } from "@/components/sections/ApiMicroservicesPageContent";

export const metadata: Metadata = {
  title: "API & Microservices Solutions | Modular Architecture & Gateways | VIO",
  description: "VIO architects modular microservices, enterprise API gateways (Kong, Apigee), and event-driven backbones (Kafka). Enhance fault isolation, scale components 10x, and accelerate releases. VA-SWaM certified.",
  alternates: {
    canonical: "/api-and-microservices-2",
  },
  openGraph: {
    title: "API & Microservices Solutions | VIO",
    description: "Decouple monolithic bottlenecks with high-performance API & microservices architectures. Domain-Driven Design, gRPC, REST, and Kafka. Richmond, VA.",
    url: "https://viobts.com/api-and-microservices-2",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO API & Microservices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "API & Microservices Solutions | VIO",
    description: "High-throughput, resilient API ecosystems that decouple monolithic bottlenecks.",
    images: ["/images/vio-logo.png"],
  },
};

export default function ApiAndMicroservicesTwoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://viobts.com/api-and-microservices-2#service",
        "name": "API & Microservices Solutions",
        "description": "Build scalable, modular systems with independent component scaling, fault isolation, and enterprise API gateways.",
        "provider": {
          "@type": "Organization",
          "name": "VIO",
          "url": "https://viobts.com"
        },
        "serviceType": "API & Microservices Architecture Consulting",
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Microservices Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Domain Microservices & Monolith Deconstruction"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Enterprise API Gateways & Traffic Governance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Event-Driven Messaging & Distributed Sagas"
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://viobts.com/api-and-microservices-2#breadcrumb",
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
            "name": "API & Microservices",
            "item": "https://viobts.com/api-and-microservices-2"
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
      <ApiMicroservicesPageContent />
    </>
  );
}
