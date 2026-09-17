import { ClientLogoItem, ClientTestimonialItem } from "./types";

export const DEFAULT_CLIENT_LOGOS: ClientLogoItem[] = [
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
    id: "virginia-odga",
    name: "Commonwealth of Virginia (ODGA)",
    svgSrc: "/images/clients/virginia-odga.svg",
    category: "Government & Public Sector",
    headline: "Unified State Portal & NIST GovCloud Modernization",
    summary: "Consolidated disparate legacy state agency portals into a secure, NIST-compliant microservices platform serving millions of Virginia residents.",
    metrics: [
      { label: "Citizens Served", value: "4M+" },
      { label: "NIST Compliance", value: "100%" }
    ],
    caseStudySlug: "virginia-state-agencies-odga"
  },
  {
    id: "drivewealth",
    name: "DriveWealth",
    svgSrc: "/images/clients/drivewealth.png",
    category: "Banking & FinTech",
    headline: "High-Velocity Embedded Investing & Data Architecture",
    summary: "Provided data management, distributed streaming, and architecture consulting that boosted customer retention by 15% and accelerated revenue growth.",
    metrics: [
      { label: "Customer Retention", value: "+15%" },
      { label: "Execution Speed", value: "Sub-second" }
    ]
  },
  {
    id: "focalcxm",
    name: "FocalCXM",
    svgSrc: "/images/clients/focalcxm-dark.svg",
    category: "Enterprise Applications & CRM",
    headline: "Life Sciences CX & Enterprise Data Modernization",
    summary: "Partnered to implement modern data ecosystems, driving advanced analytics, regulatory compliance, and operational efficiency for global pharmaceutical leaders.",
    metrics: [
      { label: "Pharma Sales Growth", value: "+5%" },
      { label: "Ecosystem Efficiency", value: "3x Faster" }
    ]
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
  },
  {
    id: "vcu-health",
    name: "VCU Health System",
    svgSrc: "/images/clients/vcu-health.svg",
    category: "Healthcare & Life Sciences",
    headline: "HIPAA-Compliant Patient Data Lake & Clinical Insights",
    summary: "Engineered secure FHIR interoperability pipelines connecting EHR silos with advanced clinical research modeling.",
    metrics: [
      { label: "HIPAA Compliance", value: "100%" },
      { label: "EHR Sync", value: "Near Real-Time" }
    ]
  }
];

export const DEFAULT_CLIENT_TESTIMONIALS: ClientTestimonialItem[] = [
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
