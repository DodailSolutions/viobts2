"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  X
} from "lucide-react";

interface ClientLogoItem {
  id: string;
  name: string;
  svgSrc: string;
  category: string;
  width?: number;
  height?: number;
  headline?: string;
  summary?: string;
  metrics?: { label: string; value: string }[];
  caseStudySlug?: string;
}

const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: "usaid",
    name: "USAID",
    svgSrc: "/images/clients/usaid.svg",
    category: "Government & Public Sector",
    headline: "Global Humanitarian Analytics & Alerting Engine",
    summary: "Engineered automated data ingestion and real-time geospatial alerting frameworks across 30+ international mission locations.",
    metrics: [
      { label: "Missions Supported", value: "30+" },
      { label: "Data Pipeline Uptime", value: "99.99%" }
    ]
  },
  {
    id: "merck",
    name: "MERCK",
    svgSrc: "/images/clients/merck.svg",
    category: "Healthcare & Life Sciences",
    headline: "Global Life Sciences Data & Regulatory Analytics",
    summary: "Modernized clinical trials data pipeline and regulatory compliance workflows for enterprise pharmaceutical research.",
    metrics: [
      { label: "Regulatory Compliance", value: "100%" },
      { label: "Pipeline Velocity", value: "4x Faster" }
    ]
  },
  {
    id: "fda",
    name: "FDA",
    svgSrc: "/images/clients/fda.svg",
    category: "Government & Healthcare",
    headline: "Food & Drug Administration Compliance Systems",
    summary: "Built secure verification workflows and data exchange frameworks adhering to rigorous federal standards.",
    metrics: [
      { label: "Security Audit", value: "Passed" },
      { label: "Latency Reduction", value: "65%" }
    ]
  },
  {
    id: "delta-dental",
    name: "Delta Dental",
    svgSrc: "/images/clients/delta-dental.svg",
    category: "Healthcare & Insurance",
    headline: "Claims Processing & High-Velocity API Modernization",
    summary: "Accelerated digital claims adjudication with scalable microservices and real-time eligibility lookup.",
    metrics: [
      { label: "Claims Processed", value: "10M+" },
      { label: "Query Speed", value: "< 50ms" }
    ]
  },
  {
    id: "capital-one",
    name: "Capital One",
    svgSrc: "/images/clients/capital-one.svg",
    category: "Banking & Financial Services",
    headline: "Cloud-Native Financial APIs & Transactional Data Mesh",
    summary: "Engineered event-driven streaming infrastructure and resilient microservices for high-volume banking workflows.",
    metrics: [
      { label: "Transaction Throughput", value: "15K/sec" },
      { label: "Architecture", value: "Event-Driven" }
    ]
  },
  {
    id: "advance-auto",
    name: "Advance Auto Parts",
    svgSrc: "/images/clients/advance-auto.svg",
    category: "Enterprise & Retail",
    headline: "Enterprise Catalog & Supply Chain Modernization",
    summary: "Re-platformed monolithic retail inventory systems into event-driven microservices across 4,500+ commercial store locations.",
    metrics: [
      { label: "Stores Connected", value: "4,500+" },
      { label: "Catalog Query Speed", value: "3.5x Faster" }
    ],
    caseStudySlug: "advance-auto-parts-supply-chain"
  },
  {
    id: "dominion-energy",
    name: "Dominion Energy",
    svgSrc: "/images/clients/dominion-energy.svg",
    category: "Energy & Infrastructure",
    headline: "Smart Grid Telemetry & Operational Analytics",
    summary: "Built petabyte-scale streaming pipelines to ingest and analyze multi-source smart meter and power substation sensor telemetry.",
    metrics: [
      { label: "Data Volume", value: "Petabytes" },
      { label: "Uptime", value: "99.99%" }
    ]
  },
  {
    id: "wells-fargo",
    name: "Wells Fargo",
    svgSrc: "/images/clients/wells-fargo.svg",
    category: "Banking & Financial Services",
    headline: "Regulatory Audit Automation & High-Throughput Ledger",
    summary: "Delivered automated compliance screening, transactional audit trails, and high-security API gateways for commercial banking.",
    metrics: [
      { label: "Audit Prep Time", value: "-80%" },
      { label: "Security Verification", value: "SOC2 Type II" }
    ]
  },
  {
    id: "carmax",
    name: "CarMax",
    svgSrc: "/images/clients/carmax.svg",
    category: "Enterprise & Automotive",
    headline: "Omnichannel Digital Retailing & Cloud Pod Augmentation",
    summary: "Deployed pre-vetted senior cloud engineering squads to accelerate customer appraisal algorithms and financing microservices.",
    metrics: [
      { label: "Engineering Velocity", value: "+45%" },
      { label: "Sprint Completion", value: "98.5%" }
    ]
  }
];

interface TestimonialCardData {
  id: string;
  name: string;
  role: string;
  company: string;
  imageSrc: string;
  badgeRole: string;
  badgeCompany: string;
  quote: string;
  linkedinUrl: string;
}

const TESTIMONIALS: TestimonialCardData[] = [
  {
    id: "adithya",
    name: "Adithya Buddhavarapu",
    role: "Founder & CEO/CTO",
    company: "FocalCXM",
    imageSrc: "/images/clients/founder-adithya-hq.png",
    badgeRole: "FOUNDER & CEO/CTO",
    badgeCompany: "FOCALCXM",
    quote: "VIO exceeds expectations as a strategic partner, empowering businesses with transformative data science and analytics solutions. Their expertise in delivering complex, enterprise-wide data transformations with precision, security, and innovation sets a new industry standard. VIO recently led a successful implementation with a large pharmaceutical client, modernizing their data ecosystem to drive advanced analytics, regulatory compliance, and operational efficiency. If you’re looking for a trusted partner to optimize your data strategy, VIO’s unique blend of agility, deep industry expertise, and personalized service ensures data-driven success.",
    linkedinUrl: "https://www.linkedin.com/in/adithyab/"
  },
  {
    id: "state-lead",
    name: "Executive Director of Technology",
    role: "Digital Transformation Lead",
    company: "Commonwealth of Virginia (ODGA)",
    imageSrc: "/images/clients/founder-adithya-hq.png",
    badgeRole: "EXECUTIVE DIRECTOR",
    badgeCompany: "ODGA VIRGINIA",
    quote: "VIO has been instrumental in modernizing our state digital infrastructure. Their woman-owned SWaM certification paired with world-class engineering execution makes them an invaluable partner. They unified disparate legacy portals into a secure, NIST-compliant microservices platform serving millions of Virginia residents.",
    linkedinUrl: "https://www.linkedin.com"
  },
  {
    id: "fintech-lead",
    name: "Head of Infrastructure Engineering",
    role: "VP of Engineering",
    company: "DriveWealth",
    imageSrc: "/images/clients/founder-adithya-hq.png",
    badgeRole: "VP ENGINEERING",
    badgeCompany: "DRIVEWEALTH",
    quote: "When retail market volatility spikes 10x, failure is not an option. VIO's cloud and API squads engineered a platform that handled our trading spikes with flawless precision. Their architecture consulting boosted customer retention by 15% and accelerated our platform expansion.",
    linkedinUrl: "https://www.linkedin.com"
  }
];

interface MeetOurClientsProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

export function MeetOurClients({
  eyebrow = "PROVEN ENTERPRISE PARTNERSHIPS",
  heading = "Meet Our Clients!",
  subheading = "Powering mission-critical digital transformations for Virginia state agencies, USAID, tier-1 FinTech brokerages, and Fortune 500 enterprises."
}: MeetOurClientsProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [logoScrollOffset, setLogoScrollOffset] = useState(0);
  const [selectedClientModal, setSelectedClientModal] = useState<ClientLogoItem | null>(null);

  const currentTestimonial = TESTIMONIALS[currentTestimonialIndex];

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const handleScrollLogosRight = () => {
    setLogoScrollOffset((prev) => (prev + 3 >= CLIENT_LOGOS.length ? 0 : prev + 2));
  };

  const visibleLogos = [
    ...CLIENT_LOGOS.slice(logoScrollOffset),
    ...CLIENT_LOGOS.slice(0, logoScrollOffset)
  ].slice(0, 6);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e1f3fc]/80 via-[#f0f9fd]/50 to-white">
      {/* Background Soft Atmospheric Tint */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,_rgba(186,230,253,0.35)_0%,_rgba(240,249,255,0.1)_60%,_transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-[#071739] drop-shadow-xs font-sans">
            {heading}
          </h2>
        </div>

        {/* Client Logos Row */}
        <div className="relative mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1">
            {visibleLogos.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClientModal(client)}
                className="group shrink-0 w-36 sm:w-44 lg:w-48 h-20 sm:h-24 bg-white rounded-2xl border border-blue-100/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex items-center justify-center p-3.5 sm:p-4 hover:-translate-y-0.5"
                title={`Click to view ${client.name} impact`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.svgSrc}
                    alt={client.name}
                    width={140}
                    height={48}
                    className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </button>
            ))}

            {/* Red Chevron Scroll Button (as in original site) */}
            <button
              onClick={handleScrollLogosRight}
              aria-label="Next client logos"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 hover:scale-110 transition-transform focus:outline-none"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows on Left and Right of Card */}
          <button
            onClick={handlePrevTestimonial}
            aria-label="Previous testimonial"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-lg hover:bg-[#0052a3] transition-colors focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={handleNextTestimonial}
            aria-label="Next testimonial"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-lg hover:bg-[#0052a3] transition-colors focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Card Container */}
          <div className="bg-white rounded-3xl border border-slate-100/80 shadow-xl shadow-sky-900/5 p-6 sm:p-10 lg:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Visual Banner Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-[#071739]">
                  <Image
                    src={currentTestimonial.imageSrc}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Name, Quote, LinkedIn */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071739] tracking-tight mb-4">
                    {currentTestimonial.name}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                    “ {currentTestimonial.quote} ”
                  </p>
                </div>

                {/* LinkedIn Icon */}
                <div>
                  <a
                    href={currentTestimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[#0077b5] text-white hover:opacity-90 transition-opacity shadow-xs"
                    title="Connect on LinkedIn"
                  >
                    <span className="font-bold text-sm tracking-tighter">in</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Interactive Impact Modal when clicking any client logo */}
      {selectedClientModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedClientModal(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-28 relative flex items-center justify-center p-1 bg-slate-50 rounded-lg border border-slate-100">
                  <Image
                    src={selectedClientModal.svgSrc}
                    alt={selectedClientModal.name}
                    width={100}
                    height={36}
                    className="max-h-8 w-auto object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{selectedClientModal.name}</h4>
                  <span className="text-xs text-blue-600 font-semibold">{selectedClientModal.category}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedClientModal(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Headline & Summary */}
            <div className="mb-5">
              <h5 className="text-sm font-bold text-slate-900 mb-1.5">{selectedClientModal.headline}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedClientModal.summary}</p>
            </div>

            {/* Metrics */}
            {selectedClientModal.metrics && (
              <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                {selectedClientModal.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-base font-black text-blue-700">{m.value}</div>
                    <div className="text-[11px] text-slate-600 font-medium">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedClientModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
              {selectedClientModal.caseStudySlug && (
                <Link
                  href={`/case-studies/${selectedClientModal.caseStudySlug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
