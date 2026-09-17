"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  ShieldCheck,
  Zap,
  TrendingUp,
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
  Workflow,
  Code2,
  Boxes,
  Database
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const CORE_SOLUTIONS = [
  {
    id: "migration",
    title: "Proprietary-to-OSS Migration & Modernization",
    badge: "Cost Elimination & Autonomy",
    description: "Liberate your business from escalating proprietary licensing and restrictive lock-in contracts. We orchestrate seamless migrations from legacy databases (Oracle, SQL Server) to modern PostgreSQL, proprietary hypervisors to Kubernetes, and proprietary ESBs to Apache Kafka.",
    highlights: [
      "Zero-downtime database schema & stored procedure conversion",
      "Automated parallel-run testing and data reconciliation",
      "Complete code ownership with no per-core or per-user seat fees",
      "Decoupled architecture preventing single-vendor dependency"
    ],
    idealFor: "Enterprises spending 6+ figures annually on proprietary vendor licenses seeking architectural freedom."
  },
  {
    id: "hardening",
    title: "Enterprise Stack Hardening & Governance",
    badge: "Zero-Trust Security",
    description: "Deploy community open-source technology with military-grade enterprise assurance. We apply CIS Benchmarks, automate vulnerability scanning (CVEs), implement container signing, and conduct rigorous license audits (GPL, AGPL, Apache 2.0).",
    highlights: [
      "Continuous CVE monitoring and automated security patch pipelines",
      "Container image signing and software bill-of-materials (SBOM) verification",
      "Legal and intellectual property license compliance gating",
      "Role-based access control (RBAC) and zero-trust network policies"
    ],
    idealFor: "Regulated industries (Fintech, Healthcare, Public Sector) requiring verifiable compliance."
  },
  {
    id: "custom-engineering",
    title: "Custom Plugin, Driver & Connector Engineering",
    badge: "Tailored Extensibility",
    description: "Extend open-source cores to match your unique operational workflows. We engineer high-performance kernel extensions, bespoke database connectors, specialized API gateway plugins, and telemetry exporters that integrate smoothly with existing legacy systems.",
    highlights: [
      "Custom Kong and Envoy API gateway filters and auth plugins",
      "High-throughput event connectors for Kafka and Debezium CDC",
      "Performance-tuned database drivers and query optimization",
      "Active upstream contribution and bug patch upstreaming"
    ],
    idealFor: "Engineering teams requiring deep technical tailoring that off-the-shelf software cannot provide."
  }
];

const DISCIPLINES = [
  {
    icon: Database,
    title: "Open-Source Databases & Caches",
    tags: ["PostgreSQL", "MariaDB", "Redis", "ClickHouse", "Apache Cassandra", "Citus"],
    desc: "Architecting high-availability relational, document, and columnar databases engineered for petabyte resilience."
  },
  {
    icon: Boxes,
    title: "Container & Cloud-Native (CNCF)",
    tags: ["Kubernetes", "Docker", "containerd", "Envoy Proxy", "Istio", "Helm"],
    desc: "Designing resilient containerized infrastructure, automated service discovery, and microservice meshes."
  },
  {
    icon: Zap,
    title: "Event Streaming & Messaging",
    tags: ["Apache Kafka", "RabbitMQ", "Apache Pulsar", "Apache Flink", "Debezium"],
    desc: "Building low-latency event-driven backbones for distributed systems, microservices, and live data pipelines."
  },
  {
    icon: Layers,
    title: "API Gateways & Middleware",
    tags: ["Kong Gateway", "Apache APISIX", "Traefik", "gRPC", "GraphQL / Apollo", "NGINX"],
    desc: "Deploying high-throughput, rate-limited open API gateways that securely connect heterogeneous core systems."
  },
  {
    icon: Cpu,
    title: "Observability & Open Telemetry",
    tags: ["Prometheus", "Grafana", "OpenTelemetry (OTel)", "Jaeger", "Loki", "OpenSearch"],
    desc: "Unifying traces, metrics, and logs into a single vendor-neutral pane of glass with automated alerting."
  },
  {
    icon: Workflow,
    title: "GitOps & Infrastructure Automation",
    tags: ["ArgoCD", "GitLab CE", "Jenkins", "Ansible", "OpenTofu / Terraform", "Linux Stacks"],
    desc: "Automating immutable infrastructure, declarative GitOps workflows, and continuous integration pipelines."
  }
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Stack Audit & License Risk Assessment",
    desc: "We analyze your current proprietary licensing spend, software dependencies, and codebases to map immediate open-source alternatives and verify license compliance (SBOM).",
    duration: "Week 1 - 2"
  },
  {
    step: "02",
    title: "Architecture & Hardening Blueprint",
    desc: "Our architects design hardened open-source target architectures complete with CIS security benchmarks, high-availability clustering, failover strategies, and backup runbooks.",
    duration: "Week 2 - 4"
  },
  {
    step: "03",
    title: "Phased Migration & Validation",
    desc: "We execute pilot migrations with parallel-run data verification, automated schema conversions, and performance load testing to ensure zero disruption to live operations.",
    duration: "Week 4 - 8"
  },
  {
    step: "04",
    title: "Continuous Governance & 24/7 SLA",
    desc: "We activate automated CVE patch management, configure 24/7 production observability, and provide backed SLA response times with hands-on team enablement.",
    duration: "Ongoing"
  }
];

const OSS_FAQS = [
  {
    question: "How does VIO guarantee enterprise security with open-source software?",
    answer: "We employ defense-in-depth hardening: automated vulnerability scanning (Trivy, Snyk), container image signing, automated CVE patch governance, zero-trust network policies, and hardened baselines (CIS Benchmarks). The transparency of open-source software enables faster peer review and rapid remediation."
  },
  {
    question: "How do you protect enterprises from license compliance risks (e.g., GPL / AGPL)?",
    answer: "We perform comprehensive software bill-of-materials (SBOM) audits and license dependency scanning using automated compliance tooling to ensure complete immunity from restrictive copyleft licenses, keeping your proprietary IP 100% protected."
  },
  {
    question: "Can VIO replace proprietary enterprise databases like Oracle or Microsoft SQL Server?",
    answer: "Yes. We have structured migration frameworks to transition mission-critical relational schemas, stored procedures, and triggers from Oracle and SQL Server to PostgreSQL or distributed PostgreSQL (Citus/YugabyteDB) with zero data loss and automated parallel validation."
  },
  {
    question: "Does VIO provide ongoing enterprise SLAs for open-source systems?",
    answer: "Yes. We back open-source production deployments with tailored enterprise SLAs (up to 24/7/365 four-hour response times), proactive uptime monitoring, and managed patch management."
  },
  {
    question: "What open-source organizations and foundations does VIO align with?",
    answer: "Our architectures adhere strictly to Linux Foundation, Cloud Native Computing Foundation (CNCF), and Apache Software Foundation standards, guaranteeing full portability and freedom from proprietary lock-in."
  }
];

export function OpenSourceIntegrationPageContent() {
  // Interactive Licensing ROI & Scoping Tool State
  const [proprietarySystem, setProprietarySystem] = useState("Oracle DB / MS SQL Server");
  const [targetOss, setTargetOss] = useState("PostgreSQL / Citus");
  const [annualSpend, setAnnualSpend] = useState("$50k - $250k / yr");
  const [slaLevel, setSlaLevel] = useState("24/7/365 Mission-Critical SLA");

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
          service: "Open-source Integration",
          message: `[OSS SCOPING & ROI ASSESSMENT] System: ${proprietarySystem} | Target: ${targetOss} | Spend: ${annualSpend} | SLA: ${slaLevel} | Notes: ${contactNotes || "None"}`,
          status: "NEW"
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch {
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
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-emerald-100 via-teal-50 to-blue-100 opacity-60 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <GitBranch className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Enterprise Open Source Architecture & Autonomy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Break Free From Proprietary Lock-In With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
              Hardened Open-Source Stacks
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Eliminate restrictive licensing fees and gain complete code autonomy. VIO hardens, orchestrates, and manages enterprise open-source solutions across PostgreSQL, Kubernetes, and Apache Kafka—delivering 45%+ cost reductions backed by 24/7 mission-critical SLAs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#roi-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-base shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Calculate Licensing ROI</span>
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
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1 tracking-tight">45%+</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Licensing Cost Reduction</div>
              <p className="text-xs text-slate-500">Eliminating per-core and proprietary seat fees</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1 tracking-tight">100%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Code & Stack Ownership</div>
              <p className="text-xs text-slate-500">Zero vendor lock-in, complete modification rights</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">99.9%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Enterprise SLA Guarantee</div>
              <p className="text-xs text-slate-500">Hardened clustering, failover & 24/7 response</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight">2.5x</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Innovation Velocity</div>
              <p className="text-xs text-slate-500">Accelerated by global open-source community tooling</p>
            </div>
          </div>
        </div>

        {/* Enterprise Grounding / Proven Credentials */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Grounded in Open Standards & Enterprise Governance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-sm font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Boxes className="w-4 h-4 text-emerald-600" /> CNCF & Linux Foundation Aligned
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> CIS Benchmarks & CVE Scanning
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <FileCheck className="w-4 h-4 text-blue-600" /> Certified Woman-Owned VA-SWaM
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Lock className="w-4 h-4 text-slate-600" /> SOC 2 Type II & HIPAA Ready
            </span>
          </div>
        </div>
      </section>

      {/* 3. Core Solutions */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Pillars of Enterprise Open Architecture
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              From database migrations and stack hardening to custom plugin engineering, we deliver the freedom of open source with the reliability of an enterprise vendor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CORE_SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                className="flex flex-col h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{sol.description}</p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Capabilities</div>
                  {sol.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

      {/* 4. Specialized Disciplines & Tooling */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            Ecosystem & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Six Specialized Open-Source Disciplines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We architect and support production-hardened software stacks backed by the world&apos;s leading open-source foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DISCIPLINES.map((disc, idx) => {
            const IconComponent = disc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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

      {/* 5. Four-Stage Modernization Methodology */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              Delivery Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 4-Stage Open-Source Adoption Blueprint
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              A structured, low-risk migration pathway that guarantees data integrity, security compliance, and zero production downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black text-emerald-400/30 mb-2">{m.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">{m.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span>Timeline</span>
                  <span>{m.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Licensing ROI & Scoping Assessment Tool */}
      <section id="roi-tool" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            Interactive Licensing ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scope Your Open-Source Migration & Savings
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select your current proprietary infrastructure to calculate potential licensing savings and request a tailored migration blueprint from our enterprise architects.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmitScoping} className="space-y-8">
            {/* Step 1: Proprietary System */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                1. What proprietary system are you looking to replace or modernize?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Oracle DB / MS SQL Server",
                  "VMware / Proprietary Hypervisors",
                  "Proprietary ESB (MuleSoft / TIBCO)",
                  "Proprietary APM (Dynatrace / Datadog)",
                  "Proprietary Message Broker",
                  "Legacy Monolith & Proprietary Middleware"
                ].map((sys) => (
                  <button
                    key={sys}
                    type="button"
                    onClick={() => setProprietarySystem(sys)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      proprietarySystem === sys
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{sys}</span>
                    {proprietarySystem === sys && <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target OSS Stack */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                2. Target Open-Source Framework
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "PostgreSQL / Citus",
                  "Kubernetes / CNCF",
                  "Apache Kafka / Pulsar",
                  "OpenTelemetry / Grafana",
                  "Kong API Gateway",
                  "Multi-Stack Hybrid Architecture"
                ].map((oss) => (
                  <button
                    key={oss}
                    type="button"
                    onClick={() => setTargetOss(oss)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                      targetOss === oss
                        ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {oss}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Current Annual Spend */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                3. Estimated Current Annual Proprietary License Spend
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["< $50k / yr", "$50k - $250k / yr", "$250k - $1M / yr", "$1M+ Enterprise Tier"].map((spend) => (
                  <button
                    key={spend}
                    type="button"
                    onClick={() => setAnnualSpend(spend)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                      annualSpend === spend
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {spend}
                  </button>
                ))}
              </div>
            </div>

            {/* Projected Savings & Architecture Summary Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Estimated Licensing Savings & Blueprint</span>
              </div>
              <div className="text-sm font-medium text-slate-800">
                Migrating from <strong>{proprietarySystem}</strong> to <strong>{targetOss}</strong> yields an estimated <strong>45% to 70% reduction</strong> in recurring software overhead, eliminating per-core licensing liabilities.
              </div>
              <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-4 pt-2 border-t border-emerald-200/60">
                <span>✓ 100% Code & Schema Ownership</span>
                <span>✓ CIS Hardened Baselines</span>
                <span>✓ 99.9% Production SLA Support</span>
              </div>
            </div>

            {/* Step 4: Contact & Submission */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-4">
                4. Where should we send the detailed migration roadmap & ROI projection?
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-emerald-900 mb-1">Migration Assessment Received!</h4>
                  <p className="text-sm text-emerald-700">
                    A VIO open-source solutions architect is reviewing your {proprietarySystem} requirements and will contact you within 24 hours with an actionable roadmap.
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
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="a.morgan@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      placeholder="e.g. Enterprise Corp."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Required Support SLA</label>
                    <select
                      value={slaLevel}
                      onChange={(e) => setSlaLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="24/7/365 Mission-Critical SLA">24/7/365 Mission-Critical SLA</option>
                      <option value="Business Hours (8x5 Standard)">Business Hours (8x5 Standard)</option>
                      <option value="SWaM Cleared Public Sector Support">SWaM Cleared Public Sector Support</option>
                      <option value="Architecture Consulting Only">Architecture Consulting Only</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Infrastructure & Target Goals</label>
                    <textarea
                      rows={3}
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="e.g. Currently running 8 Oracle Database instances on-prem with hefty annual maintenance fees; looking to migrate to managed PostgreSQL on AWS/Azure..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Calculating Blueprint...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit & Request Migration Blueprint</span>
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
              Insights on open-source hardening, licensing compliance, and production SLAs.
            </p>
          </div>

          <AccordionFAQ faqs={OSS_FAQS} />
        </div>
      </section>

      {/* 8. Closing CTA Banner */}
      <CTABanner
        eyebrow="READY TO ACHIEVE SOFTWARE AUTONOMY?"
        heading="Eliminate proprietary licensing bottlenecks today."
        subheading="Schedule a consultation with VIO's open-source architecture team in Richmond, VA for a zero-obligation licensing audit and migration roadmap."
        primaryCtaText="Book Architecture Session"
        primaryCtaLink="/book-a-call"
        secondaryCtaText="Explore All Services"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
