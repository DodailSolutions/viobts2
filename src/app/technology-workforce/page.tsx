import React from "react";
import { Metadata } from "next";
import { TechnologyWorkforcePageContent } from "@/components/sections/TechnologyWorkforcePageContent";

export const metadata: Metadata = {
  title: "Technology Workforce Solutions | Full-Time, Contract & Project Teams | VIO",
  description: "VIO connects enterprises and government agencies with top-tier technology talent. Full-Time Placements, Contract Staffing, and Project-Based Teams in software, cloud, and data.",
  alternates: {
    canonical: "/technology-workforce",
  },
  openGraph: {
    title: "Technology Workforce Solutions | VIO",
    description: "Customized staffing solutions: Full-Time Placements, Contract Staffing, and Managed Teams. VA-SWaM certified, Richmond VA.",
    url: "https://viobts.com/technology-workforce",
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

export default function TechnologyWorkforceDirectPage() {
  return <TechnologyWorkforcePageContent />;
}
