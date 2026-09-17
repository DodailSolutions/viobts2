"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  X
} from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  category: "government" | "banking" | "healthcare" | "enterprise";
  categoryLabel: string;
  logoText: string;
  logoBg: string;
  logoColor: string;
  headline: string;
  summary: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  caseStudySlug?: string;
  challengeDetail: string;
  solutionDetail: string;
}

const CLIENTS: ClientItem[] = [
  {
    id: "odga",
    name: "Commonwealth of Virginia (ODGA)",
    category: "government",
    categoryLabel: "Government & Public Sector",
    logoText: "VA / ODGA",
    logoBg: "bg-blue-900",
    logoColor: "text-white",
    headline: "Unified State Portal & NIST GovCloud Modernization",
    summary: "Consolidated disparate legacy state agency portals into a secure, NIST-compliant microservices platform serving millions of Virginia residents.",
    metrics: [
      { label: "Citizens Served", value: "4M+" },
      { label: "NIST Security Compliance", value: "100%" },
      { label: "Data Sync Latency", value: "< 2.5s" }
    ],
    technologies: ["Next.js", "TypeScript", "AWS GovCloud", "Terraform", "PostgreSQL"],
    caseStudySlug: "virginia-state-agencies-odga",
    challengeDetail: "Multiple state agencies operated on isolated silos with manual data synchronization taking up to 4 days, creating security risks and citizen frustration.",
    solutionDetail: "Architected a unified citizen service gateway with automated data pipelines, zero-trust RBAC, and real-time GovCloud replication."
  },
  {
    id: "usaid",
    name: "USAID",
    category: "government",
    categoryLabel: "Government & Public Sector",
    logoText: "USAID",
    logoBg: "bg-sky-800",
    logoColor: "text-white",
    headline: "Global Humanitarian Analytics & Alerting Engine",
    summary: "Engineered automated data ingestion and real-time geospatial alerting frameworks across 30+ international mission locations.",
    metrics: [
      { label: "Global Missions", value: "30+" },
      { label: "Alert Latency", value: "Real-time" },
      { label: "Automated Data Ingestion", value: "24/7" }
    ],
    technologies: ["Python", "Kubernetes", "Apache Kafka", "Geospatial GIS", "GCP"],
    challengeDetail: "Mission telemetry from remote international teams was fragmented, causing delays in humanitarian crisis intervention and logistical supply alerts.",
    solutionDetail: "Deployed an event-driven pub/sub architecture with geospatial visualization and automated threshold alerting."
  },
  {
    id: "drivewealth",
    name: "DriveWealth",
    category: "banking",
    categoryLabel: "Banking & FinTech",
    logoText: "DW",
    logoBg: "bg-emerald-800",
    logoColor: "text-emerald-100",
    headline: "High-Velocity Embedded Investing & Data Architecture",
    summary: "Provided data management, distributed streaming, and architecture consulting that boosted customer retention by 15% and accelerated revenue growth.",
    metrics: [
      { label: "Customer Retention", value: "+15%" },
      { label: "Revenue Acceleration", value: "+10%" },
      { label: "Execution Speed", value: "Sub-second" }
    ],
    technologies: ["Node.js", "Go", "AWS", "DynamoDB", "FinTech APIs"],
    challengeDetail: "Rapid international growth strained legacy relational databases, creating execution bottlenecks during peak trading volume spikes.",
    solutionDetail: "Redesigned data access layers into low-latency distributed caching and real-time streaming order books."
  },
  {
    id: "advance-auto",
    name: "Advance Auto Parts",
    category: "enterprise",
    categoryLabel: "Enterprise & Retail",
    logoText: "ADVANCE",
    logoBg: "bg-red-900",
    logoColor: "text-white",
    headline: "Enterprise Catalog & Supply Chain Modernization",
    summary: "Re-platformed monolithic retail inventory systems into event-driven microservices across 4,500+ commercial store locations.",
    metrics: [
      { label: "Stores Connected", value: "4,500+" },
      { label: "Inventory Accuracy", value: "99.9%" },
      { label: "Catalog Query Speed", value: "3.5x Faster" }
    ],
    technologies: ["Java", "Spring Boot", "React", "Kafka", "Azure Cloud"],
    caseStudySlug: "advance-auto-parts-supply-chain",
    challengeDetail: "Disparate in-store point-of-sale systems caused latency in national parts availability queries, impacting commercial customer fulfillment.",
    solutionDetail: "Implemented event-driven inventory streams and high-speed in-memory caching for sub-second nationwide parts lookup."
  },
  {
    id: "wells-fargo",
    name: "Wells Fargo",
    category: "banking",
    categoryLabel: "Banking & FinTech",
    logoText: "WELLS",
    logoBg: "bg-amber-900",
    logoColor: "text-amber-100",
    headline: "Regulatory Audit Automation & High-Throughput Ledger",
    summary: "Delivered automated compliance screening, transactional audit trails, and high-security API gateways for commercial banking workflows.",
    metrics: [
      { label: "Audit Preparation Time", value: "-80%" },
      { label: "Transaction Throughput", value: "10K req/s" },
      { label: "Security Verification", value: "SOC2 Type II" }
    ],
    technologies: ["Microservices", "Docker", "Kubernetes", "GraphQL", "AWS"],
    challengeDetail: "Manual regulatory audit compilation required weeks of cross-departmental coordination across disjointed banking databases.",
    solutionDetail: "Engineered an automated immutable compliance ledger with real-time discrepancy detection and automated reporting."
  },
  {
    id: "dominion",
    name: "Dominion Energy",
    category: "enterprise",
    categoryLabel: "Enterprise & Retail",
    logoText: "DOMINION",
    logoBg: "bg-blue-950",
    logoColor: "text-blue-200",
    headline: "Smart Grid Telemetry & Operational Analytics",
    summary: "Built petabyte-scale streaming pipelines to ingest and analyze multi-source smart meter and power substation sensor telemetry.",
    metrics: [
      { label: "Data Volume Processed", value: "Petabytes" },
      { label: "Fault Detection", value: "Proactive" },
      { label: "Infrastructure Uptime", value: "99.99%" }
    ],
    technologies: ["Snowflake", "dbt", "Apache Spark", "Python", "AWS"],
    challengeDetail: "High-frequency smart meter sensors overwhelmed existing data warehouse batch jobs, delaying grid outage detection.",
    solutionDetail: "Designed modern streaming lakehouse architectures with predictive ML anomaly detection for electrical load balancing."
  },
  {
    id: "vcu-health",
    name: "VCU Health System",
    category: "healthcare",
    categoryLabel: "Healthcare & Life Sciences",
    logoText: "VCU",
    logoBg: "bg-teal-900",
    logoColor: "text-teal-100",
    headline: "HIPAA-Compliant Patient Data Lake & Clinical Insights",
    summary: "Engineered secure FHIR interoperability pipelines connecting EHR silos with advanced clinical research modeling.",
    metrics: [
      { label: "HIPAA Verification", value: "100%" },
      { label: "EHR Sync Window", value: "Near Real-Time" },
      { label: "Clinical Trial Matching", value: "2x Faster" }
    ],
    technologies: ["FHIR", "HL7", "Python", "Snowflake", "Azure Health Data"],
    challengeDetail: "Clinical researchers struggled with de-identified patient data extraction across disparate electronic medical record systems.",
    solutionDetail: "Deployed an automated, HIPAA-governed data lake with strict de-identification pipelines and FHIR API connectors."
  },
  {
    id: "carmax",
    name: "CarMax",
    category: "enterprise",
    categoryLabel: "Enterprise & Retail",
    logoText: "CARMAX",
    logoBg: "bg-indigo-900",
    logoColor: "text-indigo-100",
    headline: "Omnichannel Digital Retailing & Cloud Pod Augmentation",
    summary: "Deployed pre-vetted senior cloud engineering squads to accelerate customer appraisal algorithms and financing microservices.",
    metrics: [
      { label: "Engineering Velocity", value: "+45%" },
      { label: "Appraisal Latency", value: "< 1.2s" },
      { label: "Sprint Completion", value: "98.5%" }
    ],
    technologies: ["Next.js", "C# .NET", "Azure", "Kubernetes", "Redis"],
    challengeDetail: "Ambitious nationwide omnichannel expansion demanded rapid technical scaling without compromising engineering code quality.",
    solutionDetail: "Provided high-velocity managed engineering pods embedded directly in production squads to deliver mission-critical APIs."
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalClient, setActiveModalClient] = useState<ClientItem | null>(null);

  const filteredClients = selectedCategory === "all"
    ? CLIENTS
    : CLIENTS.filter(c => c.category === selectedCategory);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-50/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 mb-5">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Clients (8)" },
            { id: "government", label: "Government & Public Sector" },
            { id: "banking", label: "Banking & FinTech" },
            { id: "healthcare", label: "Healthcare & Life Sciences" },
            { id: "enterprise", label: "Enterprise & Retail" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Logo Mark */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className={`px-3 py-2 rounded-xl ${client.logoBg} ${client.logoColor} font-black text-xs tracking-wider shadow-sm`}>
                    {client.logoText}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {client.categoryLabel.split(" ")[0]}
                  </span>
                </div>

                {/* Client Name */}
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                  {client.name}
                </h3>

                {/* Headline / Challenge solved */}
                <p className="text-xs font-semibold text-slate-800 mb-2 leading-snug line-clamp-2">
                  {client.headline}
                </p>

                {/* Brief Summary */}
                <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                  {client.summary}
                </p>

                {/* Metrics Highlight Pills */}
                <div className="space-y-1.5 py-3 border-y border-slate-100 mb-5">
                  {client.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">{m.label}:</span>
                      <span className="font-bold text-slate-900 text-[11px] bg-blue-50 px-2 py-0.5 rounded text-blue-700">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalClient(client)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  <span>View Impact Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {client.caseStudySlug && (
                  <Link
                    href={`/case-studies/${client.caseStudySlug}`}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    title="Read Case Study"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Logo Marquee Ticker */}
        <div className="mt-16 pt-12 border-t border-slate-200 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by Leaders Across Public, Financial & Enterprise Sectors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
            {CLIENTS.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveModalClient(c)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-400 text-slate-700 font-bold text-xs transition-colors hover:bg-white"
              >
                <div className={`w-2 h-2 rounded-full ${c.logoBg}`} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {activeModalClient && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalClient(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className={`px-3.5 py-2 rounded-xl ${activeModalClient.logoBg} ${activeModalClient.logoColor} font-black text-sm`}>
                  {activeModalClient.logoText}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950">
                    {activeModalClient.name}
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold">
                    {activeModalClient.categoryLabel}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveModalClient(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h4 className="text-base font-extrabold text-slate-900 mb-2">
                {activeModalClient.headline}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModalClient.summary}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              {activeModalClient.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-base sm:text-lg font-black text-blue-600">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  The Challenge
                </p>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {activeModalClient.challengeDetail}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60">
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                  VIO Architectural Solution
                </p>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {activeModalClient.solutionDetail}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Technologies & Frameworks Deployed
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeModalClient.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModalClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
              {activeModalClient.caseStudySlug && (
                <Link
                  href={`/case-studies/${activeModalClient.caseStudySlug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  <span>Read Full Case Study</span>
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
