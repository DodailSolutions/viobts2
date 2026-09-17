import { ServiceItem } from "./types";

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    slug: "technology-workforce",
    title: "Technology Workforce",
    eyebrow: "Elite Technical Talent Solutions",
    subtitle: "Customized staffing solutions: Full-Time Placements, Contract Staffing, and Project-Based Teams.",
    description: "Accelerate mission-critical initiatives with pre-vetted, high-caliber technology professionals. VIO connects enterprises and government agencies with specialized engineers across software development, cloud computing, cybersecurity, and emerging technologies to fill talent gaps and elevate delivery velocity.",
    icon: "Users",
    businessOutcome: "Reduces time-to-hire by 65% and slashes recruitment overhead while achieving 99.8% retention.",
    capabilities: [
      "Full-Time Strategic Placements",
      "Agile Contract Staffing & Surge Capacity",
      "Project-Based Managed Engineering Pods",
      "AI-Driven Strategic Sourcing & Vetting",
      "DevSecOps, Cloud & Data Engineering Talent",
      "VA-SWaM Certified Public Sector Staffing"
    ],
    technologies: ["Full-Stack", "AWS", "GCP", "Azure", "Kubernetes", "Python", "Go", "React", "Snowflake", "Terraform"],
    faqs: [
      {
        question: "What staffing models does VIO offer for Technology Workforce?",
        answer: "We provide three flexible staffing models: Full-Time Placements for permanent hires, Contract Staffing for project surges and temporary needs, and Project-Based Teams (managed pods) led by delivery leads to execute complete roadmaps."
      },
      {
        question: "How does VIO screen and vet technical talent?",
        answer: "We utilize an end-to-end recruitment process combining AI-driven strategic sourcing with rigorous technical evaluations, live coding architecture assessments, and cultural alignment checks by senior engineering leads."
      },
      {
        question: "How quickly can VIO deploy engineering resources?",
        answer: "Our pre-vetted talent pool allows engineers to be onboarded and active in your sprints in as little as 5 to 10 business days."
      },
      {
        question: "Is VIO certified for government and public sector staffing?",
        answer: "Yes, VIO is a certified woman-owned Small, Women-owned, and Minority-owned (VA-SWaM) enterprise in the Commonwealth of Virginia with extensive experience serving state agencies (such as ODGA) and USAID."
      }
    ],
    orderIndex: 1
  },
  {
    id: "srv-2",
    slug: "big-data-analytics",
    title: "Big Data & Analytics",
    eyebrow: "Enterprise Data Intelligence Engine",
    subtitle: "Transform raw multi-source telemetry into real-time decision intelligence and scalable lakehouse architectures.",
    description: "Move beyond raw data silos. We architect governed, high-throughput modern lakehouse ecosystems, real-time streaming pipelines, and predictive business intelligence layers. From Fortune 500 financial platforms (DriveWealth) to public sector agencies (USAID), we engineer petabyte-scale data solutions that deliver actionable foresight, optimize cloud spend, and guarantee stringent regulatory compliance.",
    icon: "Database",
    businessOutcome: "Accelerates analytical query speeds by 4.2x, cuts ETL batch windows by over 70%, and slashes data platform total cost of ownership (TCO) by up to 60%.",
    capabilities: [
      "Modern Cloud Lakehouses & Data Warehouses (Snowflake, Databricks, BigQuery)",
      "Real-Time Streaming Pipelines & Event-Driven Architecture (Apache Kafka, Flink)",
      "Automated High-Performance ETL/ELT & Orchestration (dbt, Airflow, Prefect)",
      "Business Intelligence & Interactive Executive Dashboards (Power BI, Tableau, Looker)",
      "Predictive Modeling, Machine Learning & Feature Stores (Python, PyTorch, MLflow)",
      "Enterprise Data Governance, Automated Quality & Lineage (Collibra, Great Expectations, SOC 2, HIPAA)"
    ],
    technologies: ["Snowflake", "Databricks", "Google BigQuery", "AWS Redshift", "Apache Kafka", "Apache Spark", "dbt", "Apache Airflow", "Power BI", "Tableau", "Python", "Great Expectations"],
    faqs: [
      {
        question: "Can VIO migrate legacy on-premise data warehouses to modern cloud platforms?",
        answer: "Yes. We have proven migration blueprints for migrating legacy Teradata, Oracle, Netezza, and SQL Server systems to modern cloud lakehouses including Snowflake, Databricks, and Google BigQuery with zero data loss and automated schema reconciliation."
      },
      {
        question: "How do you handle real-time streaming vs. batch processing?",
        answer: "We engineer unified Lambda and Kappa streaming architectures using Apache Kafka, Apache Flink, and Spark Streaming for sub-second event ingestion alongside dbt and Apache Airflow for scheduled batch aggregations."
      },
      {
        question: "How does VIO optimize cloud data warehouse costs (FinOps)?",
        answer: "We implement warehouse auto-suspend and auto-scaling policies, optimize partition keys and clustering algorithms, eliminate redundant transformations, and establish compute quota governance to slash total warehouse operational expenses by up to 60%."
      },
      {
        question: "How do you guarantee data security, governance, and regulatory compliance?",
        answer: "Our architectures integrate end-to-end encryption at rest and in transit, automated data cataloging (Collibra/Purview), automated data quality validation (Great Expectations), role-based access control (RBAC), and compliance alignment with HIPAA, GDPR, SOC 2, and BCBS 239."
      }
    ],
    orderIndex: 2
  },
  {
    id: "srv-3",
    slug: "open-source-integration",
    title: "Open-source Integration",
    eyebrow: "Enterprise Open Architecture & Autonomy",
    subtitle: "Eliminate vendor lock-in, slash licensing fees, and build adaptable systems with hardened open-source frameworks.",
    description: "Architect flexible, secure, and cost-effective digital infrastructures powered by proven open-source ecosystems. We harden, customize, and orchestrate enterprise open-source solutions across databases (PostgreSQL), container orchestration (Kubernetes), and event streaming (Apache Kafka). Our end-to-end integration ensures continuous peer-reviewed security, seamless data flow between hybrid systems, and complete code ownership.",
    icon: "GitBranch",
    businessOutcome: "Decreases software licensing dependencies by 45%+, eliminates single-vendor lock-in, and achieves 99.9% enterprise production availability.",
    capabilities: [
      "Proprietary-to-Open-Source Migration & Modernization (Oracle to PostgreSQL, VMware to K8s)",
      "Enterprise Stack Hardening, CVE Patching & Container Signing",
      "Custom Extension, Plugin, Driver & Connector Engineering",
      "Open-Source License Compliance & IP Risk Auditing (GPL, AGPL, Apache 2.0)",
      "High-Availability Clustering & Disaster Recovery Orchestration",
      "24/7 Production SLA & Enterprise Upstream Support"
    ],
    technologies: ["PostgreSQL", "Kubernetes", "Apache Kafka", "Linux Foundation", "CNCF Ecosystem", "Redis", "Prometheus", "Grafana", "OpenTelemetry", "ArgoCD", "Kong Gateway", "Elasticsearch"],
    faqs: [
      {
        question: "How does VIO guarantee enterprise security with open-source software?",
        answer: "We employ defense-in-depth hardening: automated vulnerability scanning (Trivy, Snyk), container image signing, automated CVE patch governance, zero-trust network policies, and hardened baselines (CIS Benchmarks)."
      },
      {
        question: "How do you protect enterprises from license compliance risks (e.g., GPL / AGPL)?",
        answer: "We perform comprehensive software bill-of-materials (SBOM) audits and license dependency scanning using automated compliance tooling to ensure complete immunity from restrictive copyleft licenses."
      },
      {
        question: "Can VIO replace proprietary enterprise databases like Oracle or Microsoft SQL Server?",
        answer: "Yes. We have structured migration frameworks to transition mission-critical relational schemas, stored procedures, and triggers from Oracle and SQL Server to PostgreSQL or distributed PostgreSQL (Citus/YugabyteDB) with zero data loss."
      },
      {
        question: "Does VIO provide ongoing enterprise SLAs for open-source systems?",
        answer: "Yes. We back open-source production deployments with tailored enterprise SLAs (up to 24/7/365 four-hour response times), proactive uptime monitoring, and managed patch management."
      }
    ],
    orderIndex: 3
  },
  {
    id: "srv-4",
    slug: "cloud-enablement",
    title: "Cloud Enablement & CI/CD Pipelines",
    eyebrow: "Cloud Native & DevOps",
    subtitle: "Zero-downtime automated pipelines and resilient cloud infrastructure.",
    description: "Accelerate your cloud transformation across AWS, GCP, and Azure. We design immutable Infrastructure-as-Code (IaC), automated GitOps deployment pipelines, and multi-region resilience that enable continuous, secure releases.",
    icon: "Cloud",
    businessOutcome: "Shortens deployment cycles from weeks to minutes while enforcing continuous compliance.",
    capabilities: [
      "Multi-Cloud & Hybrid Cloud Strategy",
      "GitOps, CI/CD Pipeline Automation",
      "Terraform & Pulumi Infrastructure-as-Code",
      "FinOps & Cloud Cost Optimization"
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Terraform", "GitHub Actions", "Docker", "ArgoCD"],
    faqs: [
      {
        question: "How does VIO approach cloud cost reduction (FinOps)?",
        answer: "We conduct workload rightsizing, spot instance tiering, reserved capacity planning, and architectural optimization to eliminate waste."
      }
    ],
    orderIndex: 4
  },
  {
    id: "srv-5",
    slug: "api-microservices",
    title: "API & Microservices",
    eyebrow: "Composable Micro-Architecture",
    subtitle: "High-throughput, resilient API ecosystems that decouple monolithic bottlenecks.",
    description: "Break free from monolithic constraints with event-driven, domain-driven microservices. We build secure, rate-limited, and self-documenting APIs that connect legacy core systems with modern digital consumer touchpoints.",
    icon: "Cpu",
    businessOutcome: "Eliminates single points of failure and empowers independent feature deployment across teams.",
    capabilities: [
      "Domain-Driven API Architecture & Gateway Design",
      "Event-Driven Pub/Sub & Message Queuing",
      "Zero-Trust API Security & OAuth2/mTLS",
      "Legacy Monolith Deconstruction & Strangler Fig"
    ],
    technologies: ["gRPC", "GraphQL", "REST", "Kong", "Apigee", "RabbitMQ", "Kafka", "Node.js", "Go"],
    faqs: [
      {
        question: "What is your approach to breaking down monoliths?",
        answer: "We employ the Strangler Fig pattern to progressively migrate high-value domains into microservices with zero system downtime."
      }
    ],
    orderIndex: 5
  },
  {
    id: "srv-6",
    slug: "rpa-ml-ai",
    title: "RPA, ML & AI",
    eyebrow: "Intelligent Automation",
    subtitle: "Cognitive AI workflows, computer vision, and robotic process automation that compound ROI.",
    description: "Infuse your operational core with predictive machine learning and agentic AI systems. We streamline repetitive manual processes, automate complex multi-system compliance checks, and deploy generative AI solutions with enterprise governance.",
    icon: "Sparkles",
    businessOutcome: "Achieves up to 80% reduction in manual data handling time and eradicates human processing error.",
    capabilities: [
      "Robotic Process Automation (RPA)",
      "Large Language Models & Agentic Workflows",
      "Predictive Machine Learning Pipelines",
      "Intelligent Document Processing (IDP)"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "UiPath", "LangChain", "OpenAI", "Claude", "Gemini"],
    faqs: [
      {
        question: "How do you ensure data confidentiality when using generative AI?",
        answer: "We utilize private tenant deployments and local LLM options to ensure proprietary IP never touches public model training sets."
      }
    ],
    orderIndex: 6
  }
];
