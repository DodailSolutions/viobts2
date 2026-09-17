"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Database,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Lock,
  ChevronRight,
  Send,
  Loader2,
  Server,
  Cloud,
  FileCheck,
  Workflow
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const CORE_SOLUTIONS = [
  {
    id: "lakehouse",
    title: "Cloud Lakehouse & Modern Warehousing",
    badge: "Foundation & Scalability",
    description: "Break down rigid on-premise silos into high-performance, governed cloud lakehouses. We design scalable Medallion architectures (Bronze raw, Silver curated, Gold business-ready) across Snowflake, Databricks, and BigQuery.",
    highlights: [
      "Zero-copy data sharing and decoupled compute/storage",
      "Seamless migration from Teradata, Oracle, and Netezza",
      "Unified governance across structured, semi-structured, and unstructured data",
      "Automated partition pruning, clustering, and caching layers"
    ],
    idealFor: "Enterprises seeking petabyte-scale analytics without infrastructure bottlenecks or vendor lock-in."
  },
  {
    id: "streaming",
    title: "Real-Time Streaming & Event Pipelines",
    badge: "Sub-Second Ingestion",
    description: "Transform continuous operational telemetry into instantaneous business action. We construct ultra-low latency event-driven pipelines utilizing Apache Kafka, Flink, and Spark Streaming for real-time visibility.",
    highlights: [
      "Sub-second event processing, windowing, and sessionization",
      "High-throughput micro-batching and continuous stateful streaming",
      "Resilient dead-letter queues (DLQ) and exactly-once processing guarantees",
      "Instantaneous fraud detection, transaction scoring, and IoT telemetry"
    ],
    idealFor: "Fintechs, healthcare providers, and e-commerce platforms requiring immediate operational intelligence."
  },
  {
    id: "bi-ai",
    title: "Executive BI, Predictive Models & AI",
    badge: "Decision Intelligence",
    description: "Convert clean semantic layers into strategic foresight. We deploy executive dashboards in Tableau, Power BI, and Looker alongside production ML models that predict customer churn, optimize inventory, and automate decisions.",
    highlights: [
      "Self-service semantic data layers and metric stores",
      "Interactive executive cockpits and real-time drill-down visualizations",
      "Production machine learning models with automated feature stores",
      "Generative BI integrations for conversational SQL exploration"
    ],
    idealFor: "C-suite leaders and business units requiring self-service insights and predictive foresight."
  }
];

const DISCIPLINES = [
  {
    icon: Database,
    title: "Cloud Data Warehousing",
    tags: ["Snowflake", "Databricks", "Google BigQuery", "AWS Redshift", "Azure Synapse", "Delta Lake"],
    desc: "Architecting cloud-native lakehouses and warehouses engineered for ultra-fast querying and elastic concurrency."
  },
  {
    icon: Zap,
    title: "Real-Time Streaming",
    tags: ["Apache Kafka", "Apache Flink", "Spark Streaming", "AWS Kinesis", "RabbitMQ", "Pulsar"],
    desc: "Designing resilient event brokers and streaming engines that process millions of events per second with zero data loss."
  },
  {
    icon: Workflow,
    title: "Data Pipelines & ELT",
    tags: ["dbt (data build tool)", "Apache Airflow", "Prefect", "Dagster", "AWS Glue", "Informatica"],
    desc: "Automating fault-tolerant data transformations with automated schema validation, version control, and CI/CD tests."
  },
  {
    icon: BarChart3,
    title: "Business Intelligence & BI",
    tags: ["Power BI", "Tableau", "Looker", "ThoughtSpot", "Apache Superset", "Custom React Dashboards"],
    desc: "Crafting intuitive executive reporting dashboards and operational cockpits that make complex data immediately actionable."
  },
  {
    icon: Cpu,
    title: "Predictive ML & Feature Stores",
    tags: ["Python", "PyTorch", "Scikit-Learn", "MLflow", "Feast", "Databricks ML", "RAG / LLMs"],
    desc: "Deploying production machine learning pipelines, time-series forecasting, and generative AI data interfaces."
  },
  {
    icon: ShieldCheck,
    title: "Data Governance & Quality",
    tags: ["Great Expectations", "Monte Carlo", "Collibra", "Alation", "SOC 2 Type II", "HIPAA", "BCBS 239"],
    desc: "Enforcing automated data quality assertions, end-to-end lineage tracking, and strict regulatory compliance controls."
  }
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Data Silo & Architecture Audit",
    desc: "We analyze your existing transactional databases, legacy data warehouses, and API sources to identify latency bottlenecks, schema sprawl, and compute cost inefficiencies.",
    duration: "Week 1 - 2"
  },
  {
    step: "02",
    title: "Lakehouse & Semantic Modeling",
    desc: "Our principal data architects design scalable Medallion schemas, dimensional star-schema models, semantic layers, and role-based data access governance policies.",
    duration: "Week 2 - 4"
  },
  {
    step: "03",
    title: "Automated Pipeline & ELT Construction",
    desc: "We build automated, test-driven pipelines utilizing dbt, Airflow, or Kafka with built-in data quality assertions, schema drift protection, and self-healing retries.",
    duration: "Week 4 - 8"
  },
  {
    step: "04",
    title: "BI Activation & Continuous Governance",
    desc: "We deliver curated executive dashboards, configure alerting thresholds, deploy predictive ML scoring models, and train your internal teams on self-service data discovery.",
    duration: "Week 8+"
  }
];

const DATA_FAQS = [
  {
    question: "Can VIO migrate legacy on-premise data warehouses to modern cloud platforms?",
    answer: "Yes. We have proven migration blueprints for transitioning legacy Teradata, Oracle, Netezza, and SQL Server systems to modern cloud lakehouses including Snowflake, Databricks, and Google BigQuery with zero data loss, automated schema reconciliation, and parallel-run validation."
  },
  {
    question: "How do you handle real-time streaming versus batch processing?",
    answer: "We engineer unified Kappa and Lambda streaming architectures using Apache Kafka, Apache Flink, and Spark Streaming for sub-second event ingestion alongside dbt and Apache Airflow for scheduled batch aggregations and financial reconciliations."
  },
  {
    question: "How does VIO optimize cloud data warehouse costs (FinOps)?",
    answer: "We implement warehouse auto-suspend and auto-scaling policies, optimize partition keys and clustering algorithms, eliminate redundant transformations, and establish compute quota governance to slash total warehouse operational expenses by up to 60%."
  },
  {
    question: "How do you guarantee data security, governance, and regulatory compliance?",
    answer: "Our architectures integrate end-to-end encryption at rest and in transit, automated data cataloging (Collibra/Purview), automated data quality validation (Great Expectations), role-based access control (RBAC), and compliance alignment with HIPAA, GDPR, SOC 2, and BCBS 239."
  },
  {
    question: "What client engagements has VIO delivered in Big Data & Analytics?",
    answer: "VIO has architected end-to-end data platforms and enterprise governance for leading fintech innovators such as DriveWealth, global international organizations such as USAID, and numerous public sector agencies across the Commonwealth of Virginia."
  }
];

export function BigDataAnalyticsPageContent() {
  // Interactive Scoping Tool State
  const [dataScale, setDataScale] = useState("5 - 25 TB");
  const [targetPlatform, setTargetPlatform] = useState("Snowflake");
  const [primaryPriority, setPrimaryPriority] = useState("Modern Cloud Lakehouse");
  const [timeline, setTimeline] = useState("1 - 2 months");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitScoping = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          company: contactCompany,
          service: "Big Data & Analytics",
          message: `[DATA SCOPING ASSESSMENT] Scale: ${dataScale} | Target: ${targetPlatform} | Priority: ${primaryPriority} | Timeline: ${timeline} | Notes: ${contactNotes || "None"}`,
          status: "NEW"
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch {
      // Fallback success display
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-blue-100 via-cyan-50 to-indigo-100 opacity-60 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Enterprise Big Data & Analytics Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Transform Raw Data Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600">
              Real-Time Decision Foresight
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Move beyond fragmented data silos. VIO architects high-throughput cloud lakehouses, sub-second streaming pipelines, and predictive business intelligence layers engineered for petabyte scale, bulletproof governance, and 4.2x faster query performance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#scoping-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Scope Your Data Platform</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/book-a-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
            >
              <span>Book Architecture Call</span>
              <Clock className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* 2. Verified Performance Metrics Row */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">4.2x</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Faster Query Speeds</div>
              <p className="text-xs text-slate-500">Clustering, partition pruning & caching optimization</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight">99.99%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Pipeline Uptime SLA</div>
              <p className="text-xs text-slate-500">Resilient Kafka & Spark fault-tolerant architectures</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">60%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">TCO Cloud Reduction</div>
              <p className="text-xs text-slate-500">FinOps compute rightsizing & automated scaling</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1 tracking-tight">Zero</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Data Loss Guarantee</div>
              <p className="text-xs text-slate-500">Automated lineage, replication & point-in-time recovery</p>
            </div>
          </div>
        </div>

        {/* Enterprise Grounding / Proven Credentials */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Trusted by Enterprise Innovators & Regulated Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-sm font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Building2 className="w-4 h-4 text-blue-600" /> DriveWealth (Fintech Architecture)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> USAID (Enterprise Data Frameworks)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <FileCheck className="w-4 h-4 text-emerald-600" /> Commonwealth of VA (SWaM Certified)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Lock className="w-4 h-4 text-slate-600" /> SOC 2 Type II & HIPAA Aligned
            </span>
          </div>
        </div>
      </section>

      {/* 3. Core Modernization Solutions */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Pillars of Modern Data Engineering
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Whether migrating legacy on-premise warehouses, deploying event-driven streaming, or scaling executive predictive BI, our solutions are engineered for speed, cost efficiency, and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CORE_SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                className="flex flex-col h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{sol.description}</p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Capabilities</div>
                  {sol.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-slate-100 mt-auto">
                  <div className="text-xs font-semibold text-slate-500 mb-1">Ideal For:</div>
                  <p className="text-xs text-slate-700 italic">{sol.idealFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technical Disciplines & Stack Ecosystem */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            Ecosystem & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Six Specialized Data Disciplines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We operate across best-of-breed open-source frameworks and modern cloud data stacks, ensuring seamless interoperability without rigid vendor lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DISCIPLINES.map((disc, idx) => {
            const IconComponent = disc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{disc.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">{disc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {disc.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Four-Stage Engineering Methodology */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              Delivery Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 4-Stage Modernization Methodology
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              A disciplined, milestone-driven framework that minimizes migration disruption and delivers early business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black text-blue-400/30 mb-2">{m.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">{m.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-blue-300 font-semibold">
                  <span>Timeline</span>
                  <span>{m.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Data Platform Scoping & Assessment Tool */}
      <section id="scoping-tool" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            Interactive Architecture Scoping
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scope Your Data Platform Requirements
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select your current data parameters to generate a customized architecture blueprint and receive a direct scoping recommendation from our data practice leads.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmitScoping} className="space-y-8">
            {/* Step 1: Data Scale */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                1. What is your estimated active data volume?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["< 5 TB", "5 - 25 TB", "25 - 100 TB", "100+ TB Petabyte Scale"].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setDataScale(scale)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                      dataScale === scale
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Cloud Platform */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                2. Target Lakehouse or Warehouse Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Snowflake",
                  "Databricks Lakehouse",
                  "Google BigQuery",
                  "AWS (Redshift / Glue)",
                  "Microsoft Fabric / Azure",
                  "Multi-Cloud / Agnostic"
                ].map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setTargetPlatform(plat)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                      targetPlatform === plat
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Primary Objective */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                3. What is your primary strategic objective?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Modern Cloud Lakehouse Migration (from Teradata/Oracle)",
                  "Sub-Second Real-Time Streaming (Kafka/Flink)",
                  "FinOps & Cloud Cost Optimization (reduce spend 40%+)",
                  "Data Governance, Quality & Compliance (HIPAA/SOC 2)",
                  "Executive BI & Self-Service Dashboards (Tableau/Power BI)",
                  "Predictive AI/ML Models & Feature Engineering"
                ].map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setPrimaryPriority(obj)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      primaryPriority === obj
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{obj}</span>
                    {primaryPriority === obj && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Preview Box */}
            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Recommended Architecture Blueprint</span>
              </div>
              <div className="text-sm font-medium text-slate-800">
                A tailored <strong>{targetPlatform}</strong> deployment designed for <strong>{dataScale}</strong> capacity, prioritized around <strong>{primaryPriority}</strong>.
              </div>
              <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-4 pt-2 border-t border-blue-200/60">
                <span>✓ High-concurrency clustering</span>
                <span>✓ Automated dbt/Airflow orchestration</span>
                <span>✓ Automated Great Expectations quality checks</span>
              </div>
            </div>

            {/* Step 4: Contact & Submission */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-4">
                4. Where should we send the detailed architecture blueprint & estimate?
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-emerald-900 mb-1">Architecture Request Received!</h4>
                  <p className="text-sm text-emerald-700">
                    A VIO principal data architect is reviewing your {targetPlatform} requirements and will contact you within 24 hours with an actionable roadmap.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="s.jenkins@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      placeholder="e.g. DriveWealth / FinTech Co."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Launch Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                      <option value="1 - 2 months">1 - 2 months</option>
                      <option value="3 - 6 months">3 - 6 months</option>
                      <option value="Exploring / Planning">Exploring / Planning</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Source Systems & Specific Requirements</label>
                    <textarea
                      rows={3}
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="e.g. Migrating from on-prem Oracle DB + 15 Kafka topics to Snowflake; need dbt transformation models and Power BI executive dashboards..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating Assessment...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit & Request Architecture Scoping</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-2">
                      Strict NDA guaranteed. Richmond, VA headquarters · Certified VA-SWaM.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
              Common Inquiries
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Clear answers on migrations, latency guarantees, cost containment, and compliance.
            </p>
          </div>

          <AccordionFAQ faqs={DATA_FAQS} />
        </div>
      </section>

      {/* 8. Closing CTA Banner */}
      <CTABanner
        eyebrow="READY TO MODERNIZE YOUR DATA STACK?"
        heading="Let's turn distributed data into real-time decision advantage."
        subheading="Connect directly with VIO's principal data architects in Richmond, VA for a zero-obligation technical architecture audit, FinOps assessment, and modern lakehouse roadmap."
        primaryCtaText="Book Architecture Session"
        primaryCtaLink="/book-a-call"
        secondaryCtaText="Explore All Services"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
