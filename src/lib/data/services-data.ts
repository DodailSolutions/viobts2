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
    eyebrow: "Enterprise Cloud-Native & DevOps Engine",
    subtitle: "Streamline IT operations, automate zero-downtime releases, and scale resilient multi-cloud architectures.",
    description: "Accelerate your digital transformation across AWS, Google Cloud, and Microsoft Azure. VIO integrates cloud-native technologies, automated GitOps CI/CD pipelines, and immutable Infrastructure-as-Code (IaC) to shorten release cycles from weeks to minutes. Our DevOps frameworks enforce continuous compliance, automate disaster recovery, and optimize cloud infrastructure spend (FinOps) by over 40%.",
    icon: "Cloud",
    businessOutcome: "Accelerates deployment velocity by up to 85%, eliminates release downtime with canary rollouts, and cuts cloud operational overhead by 40%+.",
    capabilities: [
      "Multi-Cloud & Hybrid Cloud Strategy & Migration (AWS, Azure, GCP)",
      "Automated GitOps & CI/CD Pipeline Engineering (GitHub Actions, ArgoCD, GitLab CI)",
      "Immutable Infrastructure as Code (IaC) with Terraform, OpenTofu & Pulumi",
      "Container Orchestration & Microservices (Kubernetes, EKS, GKE, AKS, Helm)",
      "Continuous FinOps & Cloud Spend Rightsizing (Auto-scaling, Reserved Capacity)",
      "DevSecOps, Secrets Management & Continuous Security Compliance (Vault, Snyk, SOC 2)"
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "ArgoCD", "GitLab CI", "Prometheus", "Datadog", "HashiCorp Vault"],
    faqs: [
      {
        question: "How does VIO achieve zero-downtime application deployments?",
        answer: "We engineer progressive delivery pipelines utilizing Blue/Green deployments, Canary rollouts with automated metric validation, and Kubernetes rolling updates backed by instant automated rollbacks."
      },
      {
        question: "What is VIO's methodology for cloud cost reduction (FinOps)?",
        answer: "We perform automated workload rightsizing, idle resource purging, spot instance management, reservation/savings plans optimization, and architectural refactoring to slash overall cloud spend by 30% to 50% without degrading SLAs."
      },
      {
        question: "Can VIO migrate on-premise legacy enterprise applications to the cloud?",
        answer: "Yes. Following the AWS Well-Architected and Azure Cloud Adoption Frameworks, we plan and execute rehosting, replatforming, and refactoring strategies with zero business disruption and verified disaster recovery."
      },
      {
        question: "How do you integrate security into the CI/CD pipeline (DevSecOps)?",
        answer: "We embed automated SAST/DAST security scanning, dependency vulnerability checks (Snyk/Trivy), container image signing, and dynamic secrets injection via HashiCorp Vault into every pull request and build artifact."
      }
    ],
    orderIndex: 4
  },
  {
    id: "srv-5",
    slug: "api-microservices",
    title: "API & Microservices",
    eyebrow: "Modular Micro-Architecture & Integration",
    subtitle: "Build scalable, modular systems with independent component scaling, fault isolation, and enterprise API gateways.",
    description: "Break free from monolithic constraints. VIO designs and implements modular microservices architectures that enhance system interoperability, provide fault isolation, and enable independent scaling of critical business components. By establishing robust, secure API layers (REST, gRPC, GraphQL) and asynchronous event-driven messaging, we accelerate engineering velocity, eliminate single points of failure, and connect legacy enterprise systems with modern consumer platforms.",
    icon: "Cpu",
    businessOutcome: "Accelerates feature release velocity by 3x, isolates operational faults to prevent system-wide outages, and scales critical hot components 10x without monolithic overhead.",
    capabilities: [
      "Domain-Driven Microservices Architecture & Monolith Deconstruction",
      "Enterprise API Gateway Engineering, Rate Limiting & Traffic Routing (Kong, Apigee)",
      "High-Throughput Binary & Federated API Protocols (REST, gRPC, GraphQL)",
      "Asynchronous Event-Driven Messaging & Distributed Sagas (Apache Kafka, RabbitMQ)",
      "Microservice Fault Isolation, Circuit Breaking & Bulkheads (Resilience4j, Envoy)",
      "Zero-Trust API Security, mTLS & Identity Governance (OAuth2, OIDC, Vault)"
    ],
    technologies: ["REST", "gRPC", "GraphQL", "Kong Gateway", "Apigee", "Apache Kafka", "RabbitMQ", "Node.js / NestJS", "Go (Golang)", "Java / Spring Boot", "Istio", "OpenTelemetry"],
    faqs: [
      {
        question: "How does microservices architecture prevent system-wide outages (fault isolation)?",
        answer: "By decoupling services into isolated containers with dedicated databases, circuit breakers, and asynchronous message queues, an error or traffic spike in one component (e.g. notifications) never cascades into core operations (e.g. checkout or account processing)."
      },
      {
        question: "What is VIO's strategy for deconstructing legacy monolithic systems?",
        answer: "We employ domain-driven design and progressive decomposition patterns. We identify bounded contexts, establish an API gateway proxy layer, and systematically extract microservices domain-by-domain with zero application downtime."
      },
      {
        question: "How do you handle distributed data consistency without two-phase commit?",
        answer: "We implement the Saga pattern (orchestration or choreography) paired with transactional outbox patterns and event sourcing via Apache Kafka, ensuring eventual data consistency across independent microservice databases."
      },
      {
        question: "What API protocols does VIO recommend for high-performance microservices?",
        answer: "We use gRPC with binary Protocol Buffers for ultra-fast, low-latency inter-service communication (East-West traffic), REST with OpenAPI specs for public external clients, and federated GraphQL for flexible frontend data composition (North-South traffic)."
      }
    ],
    orderIndex: 5
  },
  {
    id: "srv-6",
    slug: "rpa-ml-ai",
    title: "RPA, ML & AI",
    eyebrow: "Cognitive Automation & Machine Intelligence",
    subtitle: "Automate tasks and drive intelligence with Robotic Process Automation, Machine Learning, and Artificial Intelligence.",
    description: "Streamline efficiency, eliminate manual toil, and unlock continuous operational agility. VIO delivers enterprise-grade Robotic Process Automation (UiPath, Automation Anywhere, Microsoft Power Automate), scalable Machine Learning architectures, and secure Generative AI agent workflows. We bridge human expertise and automated systems across industries—from financial services to high-precision manufacturing—enabling autonomous document extraction, predictive analytics, and self-optimizing operations with strict governance.",
    icon: "Sparkles",
    businessOutcome: "Reduces manual data processing hours by up to 85%, eliminates human operational errors, and accelerates task cycle times by 10x with verifiable ROI within 90 days.",
    capabilities: [
      "Enterprise Robotic Process Automation (UiPath, Automation Anywhere, Power Automate)",
      "Intelligent Document Processing (IDP) & Cognitive OCR (AWS Textract, Azure Document Intelligence)",
      "Predictive ML & Deep Learning Pipelines (TensorFlow, PyTorch, Scikit-Learn, XGBoost)",
      "Generative AI, Autonomous Agents & Enterprise RAG (LangChain, LlamaIndex, OpenAI, Claude, Gemini)",
      "Continuous MLOps, Model Governance & Drift Detection (MLflow, Kubeflow, Seldon Core)",
      "Zero-Data-Leakage Private LLMs & Responsible AI Governance (NVIDIA NeMo, Local SLMs, Guardrails)"
    ],
    technologies: ["UiPath", "Automation Anywhere", "Microsoft Power Automate", "Python", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "Hugging Face", "MLflow", "AWS Bedrock", "Azure OpenAI"],
    faqs: [
      {
        question: "What is the difference between RPA and AI/Machine Learning in VIO's implementation?",
        answer: "Robotic Process Automation (RPA) excels at deterministic, rules-based tasks—such as copying data across legacy ERPs, logging into portals, and triggering batch jobs. AI and Machine Learning handle non-deterministic, cognitive tasks—such as understanding unstructured text, categorizing invoices with OCR, predicting churn, and generating intelligent summaries. VIO integrates both into Intelligent Automation (IA), where AI acts as the brain and RPA acts as the hands."
      },
      {
        question: "How does VIO safeguard proprietary enterprise data when deploying Generative AI?",
        answer: "We mandate zero-data-retention architectures. All enterprise GenAI deployments utilize dedicated private cloud tenants (e.g. AWS Bedrock, Azure OpenAI) or self-hosted open-weight LLMs (Llama 3, Mistral) within your isolated VPC. Your internal data is never used for foundation model pre-training, and all prompt-response exchanges are governed by strict DLP (Data Loss Prevention) guardrails."
      },
      {
        question: "Which enterprise RPA platforms do you support?",
        answer: "We are platform-agnostic with specialized certified engineering capacity in UiPath, Microsoft Power Automate Desktop/Cloud, and Automation Anywhere, as well as open-source Python automation frameworks (Selenium, Playwright, Robot Framework)."
      },
      {
        question: "How quickly can our organization achieve measurable ROI from an automation initiative?",
        answer: "Our phased automation delivery blueprint targets high-frequency, manual bottlenecks first. Most enterprise clients deploy their initial production bot or Intelligent Document Processing (IDP) pipeline within 4 to 6 weeks, achieving positive net ROI within 90 days."
      },
      {
        question: "How do you maintain and monitor ML models after production deployment (MLOps)?",
        answer: "We deploy end-to-end MLOps pipelines using MLflow, Kubeflow, and Prometheus. Our monitoring frameworks track model prediction accuracy, feature distribution drift, data anomalies, and inference latency in real time, automatically triggering human review or retraining workflows when thresholds deviate."
      }
    ],
    orderIndex: 6
  }
];
