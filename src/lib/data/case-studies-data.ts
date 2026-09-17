import { CaseStudyItem } from "./types";

export const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs-1",
    slug: "virginia-state-agencies-odga",
    title: "Virginia State Agencies / ODGA Modernization",
    client: "ODGA (Virginia State Agencies)",
    industry: "Government Solutions",
    challenge: "Disparate legacy state agency portals faced severe data synchronization delays, security audit vulnerabilities, and outdated citizen-facing interfaces.",
    solution: "Engineered a centralized, NIST-compliant microservices platform with unified identity access management and real-time state database replication.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS GovCloud", "Docker", "Terraform"],
    results: [
      "Unified citizen portal serving over 4 million Virginia residents",
      "Achieved 100% compliance with Commonwealth of Virginia IT security standards",
      "Reduced agency data processing time from 4 days to real-time"
    ],
    metrics: [
      { label: "Data Sync Latency", value: "< 2.5s" },
      { label: "Security Compliance", value: "100%" },
      { label: "Virginia Residents Served", value: "4M+" }
    ],
    testimonial: {
      quote: "VIO brought the architectural discipline and state-level compliance rigor required to execute a flawless public sector modernization.",
      author: "Program Director",
      role: "Virginia State Agency Systems"
    },
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    orderIndex: 1
  },
  {
    id: "cs-2",
    slug: "usaid-global-systems",
    title: "USAID Global Mission Systems",
    client: "USAID",
    industry: "Government Solutions",
    challenge: "Field offices across multiple continents required resilient, low-bandwidth data collection and tracking systems for international mission deployment.",
    solution: "Architected an offline-first data synchronization mesh backed by secure cloud aggregation pipelines and automated mission reporting dashboards.",
    technologies: ["Cloud Architecture", "Python", "Kubernetes", "PostgreSQL", "React", "Kafka"],
    results: [
      "Continuous offline data collection in remote field environments",
      "Automated consolidation of humanitarian aid allocation metrics",
      "Zero mission-critical data loss over 3+ years of continuous operation"
    ],
    metrics: [
      { label: "Field Uptime", value: "99.98%" },
      { label: "Global Missions", value: "35+" },
      { label: "Data Accuracy", value: "99.9%" }
    ],
    testimonial: {
      quote: "VIO's engineering squad delivered a mission-critical platform capable of functioning in the most demanding global connectivity environments.",
      author: "Senior Systems Lead",
      role: "Global Mission Technology"
    },
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    orderIndex: 2
  },
  {
    id: "cs-3",
    slug: "drivewealth-fintech-scale",
    title: "DriveWealth Brokerage API & Cloud Velocity",
    client: "DriveWealth",
    industry: "Banking & Financial Services",
    challenge: "Exponential retail trading volume spikes required sub-millisecond execution and decoupled ledger reconciliation without database contention.",
    solution: "Designed event-driven API gateways with partitioned messaging queues and high-throughput cache layers to manage burst trading volatility.",
    technologies: ["Node.js", "Go", "AWS", "Kafka", "Redis Enterprise", "PostgreSQL"],
    results: [
      "Supported 10x trading volume surge during peak market volatility days",
      "Lowered API response times to sub-20 milliseconds",
      "Zero transaction drops across millions of daily fractional share trades"
    ],
    metrics: [
      { label: "Peak Order Velocity", value: "10x Surge" },
      { label: "API Response", value: "< 20ms" },
      { label: "Execution Reliability", value: "99.999%" }
    ],
    testimonial: {
      quote: "VIO's technical workforce integrated directly into our core teams to scale our fintech infrastructure seamlessly.",
      author: "VP of Engineering",
      role: "Capital Markets"
    },
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    orderIndex: 3
  },
  {
    id: "cs-4",
    slug: "advance-auto-parts-supply-chain",
    title: "Advance Auto Parts Omnichannel Logistics",
    client: "Advance Auto Parts",
    industry: "Manufacturing & Automotive",
    challenge: "Complex retail inventory tracking across thousands of retail stores and regional fulfillment centers caused distribution bottlenecks.",
    solution: "Implemented automated cloud data pipelines, IoT sensor telemetry ingestion, and predictive store replenishment algorithms.",
    technologies: ["Snowflake", "dbt", "Apache Airflow", "GCP", "Kubernetes", "Next.js"],
    results: [
      "Overhauled parts availability visibility across national store networks",
      "Reduced inventory stock-outs by 28% in pilot distribution hubs",
      "Accelerated daily supply-chain planning cycles by 4 hours"
    ],
    metrics: [
      { label: "Stock-out Reduction", value: "-28%" },
      { label: "Planning Time Saved", value: "4 hrs/day" },
      { label: "Store Coverage", value: "4,000+" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    orderIndex: 4
  },
  {
    id: "cs-5",
    slug: "wells-fargo-risk-intelligence",
    title: "Wells Fargo Enterprise Analytics & Audit Lineage",
    client: "Wells Fargo",
    industry: "Banking & Financial Services",
    challenge: "Navigating petabytes of compliance and loan audit records required strict data governance and automated regulatory lineage tracking.",
    solution: "Built a centralized data lineage catalogue and automated anomaly detection model to flag non-standard financial ledger entries.",
    technologies: ["Big Data Lakehouse", "Python", "Databricks", "Spark", "PostgreSQL", "Enterprise IAM"],
    results: [
      "Automated loan documentation audit workflows, saving thousands of manual review hours",
      "Provided complete end-to-end data lineage across multi-department systems",
      "Satisfied strict federal compliance and risk governance reviews"
    ],
    metrics: [
      { label: "Audit Hours Saved", value: "12,000+" },
      { label: "Lineage Coverage", value: "100%" },
      { label: "Anomaly Precision", value: "98.4%" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    orderIndex: 5
  }
];
