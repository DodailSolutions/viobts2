import { IndustryItem } from "./types";

export const INITIAL_INDUSTRIES: IndustryItem[] = [
  {
    id: "ind-1",
    slug: "banking-financial-services",
    title: "Banking & Financial Services",
    eyebrow: "FinTech & Secure Capital",
    description: "Empowering tier-1 financial institutions, neo-banks, and trading desks with low-latency execution engines, algorithmic fraud mitigation, and SOC2/PCI-DSS compliant architectures.",
    keyChallenges: [
      "Strict regulatory reporting & real-time compliance enforcement",
      "Legacy core mainframe modernization without trading interruption",
      "Exponentially increasing financial fraud and cyber threat vectors"
    ],
    transformationTrends: [
      "Open banking APIs and composable core ledgers",
      "AI-driven automated underwriting and AML screening",
      "Sub-millisecond settlement networks"
    ],
    capabilities: [
      "Real-Time Transaction Fraud Detection",
      "Trading API Integration & FIX Protocols",
      "Regulatory Audit Automation & Lineage"
    ],
    orderIndex: 1
  },
  {
    id: "ind-2",
    slug: "healthcare-life-sciences-insurance",
    title: "Healthcare, Life Sciences & Insurance",
    eyebrow: "Life-Critical Compliance",
    description: "Modernizing care delivery, clinical trial pipelines, and payer-provider claims through HIPAA-compliant cloud ecosystems and secure FHIR interoperability layers.",
    keyChallenges: [
      "Fragmented electronic health records (EHR) and data silos",
      "Stringent HIPAA, HITECH, and FDA 21 CFR Part 11 mandates",
      "Claims adjudication friction and rising administrative overhead"
    ],
    transformationTrends: [
      "FHIR and HL7 standard real-time health data exchange",
      "AI-assisted clinical trial candidate recruitment",
      "Automated insurance claims triage and policy processing"
    ],
    capabilities: [
      "HIPAA Compliant Cloud Data Vaults",
      "FHIR Interoperability & Medical API Gateways",
      "Automated Claims Adjudication Workflows"
    ],
    orderIndex: 2
  },
  {
    id: "ind-3",
    slug: "government",
    title: "Government Solutions",
    eyebrow: "Public Sector & Defense Grade",
    description: "Delivering secure, accessible, and scalable digital public infrastructure for federal, state, and regional agencies with woman-owned VA-SWaM certified excellence.",
    keyChallenges: [
      "Legacy mainframe dependency and institutional knowledge drain",
      "FedRAMP, NIST 800-53, and state security mandate compliance",
      "Citizen demand for frictionless modern digital service access"
    ],
    transformationTrends: [
      "Cloud-first mandate execution across state and federal bodies",
      "Secure digital identity and automated citizen portals",
      "Granular data transparency and public accountability reporting"
    ],
    capabilities: [
      "FedRAMP & NIST 800-53 Compliant Engineering",
      "VA-SWaM Certified State & Federal Contracting",
      "Accessible ADA / Section 508 Compliant Portals"
    ],
    orderIndex: 3
  },
  {
    id: "ind-4",
    slug: "manufacturing-automotive",
    title: "Manufacturing & Automotive",
    eyebrow: "Smart Industry 4.0",
    description: "Bridging physical factory telemetry with predictive ERP planning through real-time IoT integration, automated supply chain forecasting, and edge computing.",
    keyChallenges: [
      "Unplanned machinery downtime and maintenance bottlenecks",
      "Supply chain disruptions and global inventory opacity",
      "Disparate SCADA / PLC protocols disconnected from cloud analytics"
    ],
    transformationTrends: [
      "Predictive maintenance models deployed to the factory edge",
      "Digital twin simulations for throughput optimization",
      "End-to-end multi-tier inventory visibility networks"
    ],
    capabilities: [
      "Industrial IoT (IIoT) Sensor Telemetry Streams",
      "Edge Machine Learning & Anomaly Detection",
      "Automated Parts Inventory & Supplier Sync"
    ],
    orderIndex: 4
  },
  {
    id: "ind-5",
    slug: "energy-public-utilities",
    title: "Energy & Public Utilities",
    eyebrow: "Grid Resilience & Sustainability",
    description: "Modernizing electric, water, and renewable utility distribution with smart grid telemetry, dynamic load forecasting, and mission-critical infrastructure security.",
    keyChallenges: [
      "Balancing volatile renewable generation with traditional grid load",
      "Critical infrastructure cyber threats and NERC-CIP mandates",
      "Extreme weather events stressing distribution assets"
    ],
    transformationTrends: [
      "Distributed Energy Resource Management Systems (DERMS)",
      "Smart meter automated ingestion and billing pipelines",
      "Satellite and drone predictive vegetation management"
    ],
    capabilities: [
      "High-Frequency Grid Telemetry Ingestion",
      "NERC-CIP Compliant Operational Architecture",
      "Dynamic Consumption & Demand Forecasting"
    ],
    orderIndex: 5
  },
  {
    id: "ind-6",
    slug: "communication-media",
    title: "Communication & Media",
    eyebrow: "High-Volume Content Delivery",
    description: "Enabling high-throughput digital streaming, personalized content distribution, and automated advertising delivery across omnichannel networks.",
    keyChallenges: [
      "Surging video bandwidth costs and edge latency constraints",
      "Content monetization friction and subscription churn",
      "Managing massive digital asset libraries across global teams"
    ],
    transformationTrends: [
      "Server-side ad insertion and real-time bidding engines",
      "Edge compute rendering for sub-second video delivery",
      "AI metadata tagging and asset auto-generation"
    ],
    capabilities: [
      "Ultra-Low Latency Video Streaming Architectures",
      "Automated Metadata Tagging & MAM Integration",
      "Omnichannel Subscriber Churn Prediction"
    ],
    orderIndex: 6
  }
];
