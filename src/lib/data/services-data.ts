import { ServiceItem } from "./types";

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    slug: "technology-workforce",
    title: "Technology Workforce",
    eyebrow: "Elite Technical Talent",
    subtitle: "High-caliber engineering squads that integrate seamlessly into your engineering culture.",
    description: "Accelerate mission-critical software initiatives with pre-vetted, high-impact technical talent. From cloud architects and data engineers to full-stack squads, we eliminate recruitment friction and elevate delivery velocity.",
    icon: "Users",
    businessOutcome: "Reduces time-to-hire by 65% and scales engineering velocity without internal hiring overhead.",
    capabilities: [
      "Staff Augmentation & Dedicated Pods",
      "Full-Stack & Distributed Cloud Engineering",
      "DevSecOps & Platform Engineers",
      "Specialized Domain Architects"
    ],
    technologies: ["React", "Next.js", "Node.js", "Go", "Python", "Kubernetes", "AWS", "GCP"],
    faqs: [
      {
        question: "How quickly can VIO deploy engineering resources?",
        answer: "Our pre-vetted technical talent can be onboarded and active in your sprints in as little as 5 to 10 business days."
      },
      {
        question: "Do you support both contract staffing and managed pods?",
        answer: "Yes, we support both individual high-velocity augmentation and autonomous managed pods led by a delivery lead."
      }
    ],
    orderIndex: 1
  },
  {
    id: "srv-2",
    slug: "big-data-analytics",
    title: "Big Data & Analytics",
    eyebrow: "Data Intelligence Engine",
    subtitle: "Transforming raw multi-source telemetry into real-time decision intelligence.",
    description: "Modernize legacy data silos into governed, real-time Lakehouse architectures. We engineer petabyte-scale pipelines, semantic layers, and predictive models that turn unstructured data into high-value strategic foresight.",
    icon: "Database",
    businessOutcome: "Unlocks real-time decision visibility and slashes ETL batch windows by over 70%.",
    capabilities: [
      "Modern Data Lakehouse Architecture",
      "Real-Time Streaming & Batch Pipelines",
      "Data Governance, Lineage & Quality",
      "Predictive BI & Executive Dashboards"
    ],
    technologies: ["Snowflake", "BigQuery", "Databricks", "Apache Kafka", "dbt", "Airflow", "PostgreSQL"],
    faqs: [
      {
        question: "Can VIO help migrate on-premise data warehouses to the cloud?",
        answer: "Yes, we have proven migration frameworks for moving Teradata, Oracle, and SQL Server to modern cloud architectures like BigQuery and Snowflake."
      }
    ],
    orderIndex: 2
  },
  {
    id: "srv-3",
    slug: "open-source-integration",
    title: "Open-source Integration",
    eyebrow: "Enterprise Open Architecture",
    subtitle: "Leverage best-of-breed open-source frameworks without vendor lock-in.",
    description: "Architect flexible, cost-effective digital infrastructures powered by proven open-source ecosystems. We harden, customize, and orchestrate open-source solutions to deliver maximum autonomy, security, and lower total cost of ownership.",
    icon: "GitBranch",
    businessOutcome: "Decreases software licensing dependencies by up to 45% while preserving enterprise-grade SLAs.",
    capabilities: [
      "Open-Source Stack Auditing & Hardening",
      "Custom Extension & Plugin Engineering",
      "License Compliance & Vulnerability Scanning",
      "Enterprise Support & 24/7 SLA Backing"
    ],
    technologies: ["Linux Foundation Stacks", "PostgreSQL", "Apache Ecosystem", "Kubernetes", "Redis", "Elasticsearch"],
    faqs: [
      {
        question: "How do you guarantee enterprise security with open-source tools?",
        answer: "We perform automated vulnerability scanning, container signing, CVE monitoring, and implement strict RBAC policies."
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
