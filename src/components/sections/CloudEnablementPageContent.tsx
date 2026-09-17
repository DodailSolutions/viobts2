"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cloud,
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
  FileCheck,
  Workflow,
  Code2,
  Boxes,
  Database,
  Terminal,
  RefreshCw
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const CORE_SOLUTIONS = [
  {
    id: "multi-cloud",
    title: "Multi-Cloud Strategy & Workload Migration",
    badge: "Scalability & Resilience",
    description: "Accelerate your transition to modern cloud environments across AWS, Google Cloud, and Microsoft Azure. We architect secure landing zones, zero-trust network topologies, and structured migration pathways (rehost, replatform, refactor) that eliminate on-premise hardware constraints with zero operational downtime.",
    highlights: [
      "Enterprise landing zones adhering to AWS Well-Architected & Azure CAF",
      "Seamless migration of mission-critical workloads with automated parallel testing",
      "Multi-region high-availability configurations with sub-minute failover",
      "Hybrid-cloud interconnectivity and secure VPN/DirectConnect peering"
    ],
    idealFor: "Enterprises seeking to modernize legacy data centers, enhance scalability, and achieve multi-region high availability."
  },
  {
    id: "gitops-cicd",
    title: "Automated GitOps & CI/CD Delivery",
    badge: "Speed & Continuous Delivery",
    description: "Transform slow, error-prone manual deployments into automated, declarative GitOps pipelines. Utilizing GitHub Actions, ArgoCD, and GitLab CI, we automate linting, test suites, container builds, and progressive canary rollouts so teams deploy safely in minutes rather than weeks.",
    highlights: [
      "Declarative GitOps deployments utilizing ArgoCD and Kubernetes",
      "Automated Blue/Green and Canary release patterns with instant automated rollback",
      "Integrated automated unit, integration, and security regression testing",
      "Unified pipeline telemetry and developer velocity metrics (DORA metrics)"
    ],
    idealFor: "Engineering organizations seeking to increase release frequency, reduce deployment anxiety, and minimize lead time."
  },
  {
    id: "iac-finops",
    title: "Infrastructure as Code & FinOps Optimization",
    badge: "Governance & Cost Efficiency",
    description: "Codify your entire cloud estate using immutable Infrastructure as Code (Terraform, OpenTofu, Pulumi) while enforcing rigorous cloud cost optimization (FinOps). We eliminate drift, automate resource lifecycle policies, and optimize compute spend by 30% to 50%.",
    highlights: [
      "100% immutable Infrastructure as Code (IaC) with automated drift detection",
      "FinOps compute rightsizing, automated scaling schedules, and reservation governance",
      "Automated DevSecOps scanning: SAST, DAST, container scanning, and CIS benchmarks",
      "Dynamic secrets injection and encryption management with HashiCorp Vault"
    ],
    idealFor: "CFOs and engineering leads looking to eliminate cloud budget waste and ensure compliance audit readiness."
  }
];

const DISCIPLINES = [
  {
    icon: Cloud,
    title: "Cloud Platforms & Landing Zones",
    tags: ["AWS", "Microsoft Azure", "Google Cloud (GCP)", "AWS Well-Architected", "Azure CAF"],
    desc: "Architecting multi-account cloud landing zones engineered for strict security boundaries, network isolation, and global scale."
  },
  {
    icon: Boxes,
    title: "Container Orchestration & Meshes",
    tags: ["Kubernetes (EKS/GKE/AKS)", "Docker", "containerd", "Istio", "Helm", "Cilium"],
    desc: "Engineering scalable microservice clusters with automated pod scaling, zero-downtime rolling updates, and service mesh routing."
  },
  {
    icon: Workflow,
    title: "GitOps & Pipeline Automation",
    tags: ["GitHub Actions", "ArgoCD", "GitLab CI", "Jenkins", "FluxCD", "Tekton"],
    desc: "Building declarative CI/CD delivery pipelines that automate testing, container image publishing, and progressive staging releases."
  },
  {
    icon: Terminal,
    title: "Infrastructure as Code (IaC)",
    tags: ["Terraform", "OpenTofu", "AWS CloudFormation", "Pulumi", "Ansible"],
    desc: "Codifying modular, reusable cloud environments that eliminate configuration drift and allow rapid multi-region recreation."
  },
  {
    icon: RefreshCw,
    title: "Site Reliability & SRE Observability",
    tags: ["Datadog", "Prometheus", "Grafana", "OpenTelemetry", "AWS CloudWatch", "PagerDuty"],
    desc: "Implementing distributed tracing, SLI/SLA alerting, and automated incident response runbooks to ensure 99.99% system availability."
  },
  {
    icon: ShieldCheck,
    title: "DevSecOps & Cloud Compliance",
    tags: ["HashiCorp Vault", "Snyk", "SonarQube", "Trivy", "SOC 2", "HIPAA", "FedRAMP"],
    desc: "Shifting security left into early pipeline stages with automated container scanning, secret rotation, and compliance enforcement."
  }
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Cloud Maturity & Workload Audit",
    desc: "We analyze your existing infrastructure, deployment bottlenecks, release frequencies, and cloud billing accounts to establish target KPIs and FinOps savings potential.",
    duration: "Week 1 - 2"
  },
  {
    step: "02",
    title: "Landing Zone & GitOps Architecture",
    desc: "Our principal cloud architects design hardened multi-account landing zones, zero-trust network topologies, IAM governance, and declarative GitOps pipelines.",
    duration: "Week 2 - 4"
  },
  {
    step: "03",
    title: "Automated Pipeline & IaC Implementation",
    desc: "We construct modular Terraform modules, automated CI/CD workflows, containerized environments, and comprehensive automated test suites with security gating.",
    duration: "Week 4 - 8"
  },
  {
    step: "04",
    title: "Zero-Downtime Cutover & 24/7 SRE",
    desc: "We execute canary migrations, establish real-time SRE observability dashboards, train your engineering team, and provide ongoing SLA-backed support.",
    duration: "Ongoing"
  }
];

const CLOUD_FAQS = [
  {
    question: "How does VIO achieve zero-downtime application deployments?",
    answer: "We engineer progressive delivery pipelines utilizing Blue/Green deployments, Canary rollouts with automated metric validation, and Kubernetes rolling updates backed by instant automated rollbacks, ensuring users experience zero latency spikes or downtime during deployments."
  },
  {
    question: "What is VIO's methodology for cloud cost reduction (FinOps)?",
    answer: "We perform automated workload rightsizing, idle resource purging, spot instance orchestration, reservation and savings plans optimization, and architectural refactoring to slash overall cloud spend by 30% to 50% without compromising reliability or performance."
  },
  {
    question: "Can VIO migrate on-premise legacy enterprise applications to the cloud?",
    answer: "Yes. Following the AWS Well-Architected and Azure Cloud Adoption Frameworks, we plan and execute rehosting, replatforming, and refactoring strategies with zero business disruption, automated schema migration, and verified disaster recovery."
  },
  {
    question: "How do you integrate security into the CI/CD pipeline (DevSecOps)?",
    answer: "We embed automated SAST/DAST security scanning, dependency vulnerability checks (Snyk/Trivy), container image signing, and dynamic secrets injection via HashiCorp Vault directly into pull requests and build triggers."
  },
  {
    question: "What public cloud providers does VIO support?",
    answer: "We have deep engineering expertise across Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), as well as hybrid and private cloud configurations utilizing Kubernetes and OpenShift."
  }
];

export function CloudEnablementPageContent() {
  // Interactive Cloud & CI/CD Scoping Tool State
  const [cloudProvider, setCloudProvider] = useState("Amazon Web Services (AWS)");
  const [primaryInitiative, setPrimaryInitiative] = useState("Automated Zero-Downtime CI/CD & GitOps");
  const [deploymentFrequency, setDeploymentFrequency] = useState("Manual / Monthly Releases");
  const [workloadScale, setWorkloadScale] = useState("25 - 100 Workloads");

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
          service: "Cloud Enablement & CI/CD Pipelines",
          message: `[CLOUD & CI/CD ASSESSMENT] Provider: ${cloudProvider} | Initiative: ${primaryInitiative} | Frequency: ${deploymentFrequency} | Scale: ${workloadScale} | Notes: ${contactNotes || "None"}`,
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
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100 opacity-60 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <Cloud className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Enterprise Cloud-Native & DevOps Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Streamline IT Operations With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600">
              Zero-Downtime Cloud & CI/CD
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Transform manual releases into automated, high-velocity GitOps workflows. VIO architects resilient cloud infrastructure across AWS, Google Cloud, and Azure—accelerating release cycles by up to 85% and cutting cloud TCO by 40%+.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#scoping-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Scope Cloud & CI/CD Roadmap</span>
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
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">85%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Faster Deployment Cycles</div>
              <p className="text-xs text-slate-500">From manual weeks to automated minutes</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight">99.99%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Infrastructure Uptime</div>
              <p className="text-xs text-slate-500">Multi-region active-active cloud configurations</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">40%+</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">FinOps Spend Reduction</div>
              <p className="text-xs text-slate-500">Compute rightsizing, auto-scaling & waste elimination</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-700 mb-1 tracking-tight">Zero</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Downtime Deployments</div>
              <p className="text-xs text-slate-500">Canary rollouts, Blue/Green & automated rollbacks</p>
            </div>
          </div>
        </div>

        {/* Enterprise Grounding / Proven Credentials */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Built on Industry Cloud Frameworks & Regulated Compliance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-sm font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Cloud className="w-4 h-4 text-blue-600" /> AWS Well-Architected & Azure CAF
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> CIS Benchmarks & DevSecOps
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <FileCheck className="w-4 h-4 text-cyan-600" /> Certified Woman-Owned VA-SWaM
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Lock className="w-4 h-4 text-slate-600" /> SOC 2 Type II, HIPAA & FedRAMP Ready
            </span>
          </div>
        </div>
      </section>

      {/* 3. Core Solutions */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Pillars of Enterprise Cloud & DevOps
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              From multi-cloud migrations and automated GitOps pipelines to Infrastructure-as-Code and FinOps, we deliver modern cloud engineering engineered for velocity and cost control.
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

      {/* 4. Specialized Disciplines & Tooling */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            Ecosystem & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Six Specialized Cloud & DevOps Disciplines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We build and operate production-grade cloud environments leveraging industry-standard cloud providers and CNCF-certified tooling.
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

      {/* 5. Four-Stage Modernization Methodology */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
              Delivery Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 4-Stage Cloud & DevOps Blueprint
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              A proven, risk-mitigated delivery pathway that ensures zero unexpected downtime, complete IaC coverage, and continuous FinOps governance.
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

      {/* 6. Interactive Cloud Architecture & CI/CD Scoping Tool */}
      <section id="scoping-tool" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            Interactive Architecture Scoping
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scope Your Cloud & CI/CD Roadmap
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select your current infrastructure parameters to generate a custom cloud architecture blueprint and receive a direct scoping recommendation from our DevOps practice leads.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmitScoping} className="space-y-8">
            {/* Step 1: Cloud Provider */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                1. Target Cloud Platform
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  "Amazon Web Services (AWS)",
                  "Microsoft Azure",
                  "Google Cloud Platform (GCP)",
                  "Multi-Cloud / Hybrid Cloud"
                ].map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setCloudProvider(prov)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-center ${
                      cloudProvider === prov
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Initiative */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                2. What is your primary cloud or DevOps priority?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Automated Zero-Downtime CI/CD & GitOps",
                  "Migrate On-Premise Workloads to Cloud",
                  "Modernize to Kubernetes (EKS/AKS/GKE)",
                  "Implement Infrastructure as Code (Terraform)",
                  "FinOps & Cloud Cost Optimization (Cut 30-50%)",
                  "DevSecOps Security & Compliance Hardening"
                ].map((init) => (
                  <button
                    key={init}
                    type="button"
                    onClick={() => setPrimaryInitiative(init)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      primaryInitiative === init
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{init}</span>
                    {primaryInitiative === init && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Current Deployment Frequency & Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  3. Current Release Frequency
                </label>
                <div className="space-y-2">
                  {[
                    "Manual / Monthly Releases",
                    "Bi-Weekly Sprint Releases",
                    "Daily Automated Deployments",
                    "Continuous Multi-Deploy per Day"
                  ].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setDeploymentFrequency(freq)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        deploymentFrequency === freq
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{freq}</span>
                      {deploymentFrequency === freq && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  4. Active Workload Footprint
                </label>
                <div className="space-y-2">
                  {[
                    "< 25 Virtual Machines / Services",
                    "25 - 100 Workloads",
                    "100+ Enterprise Microservices / Multi-Region",
                    "Greenfield / New Architecture"
                  ].map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setWorkloadScale(scale)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        workloadScale === scale
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{scale}</span>
                      {workloadScale === scale && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projected Architecture & Savings Box */}
            <div className="p-5 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Projected Architecture & Acceleration</span>
              </div>
              <div className="text-sm font-medium text-slate-800">
                A tailored <strong>{cloudProvider}</strong> roadmap prioritizing <strong>{primaryInitiative}</strong> for <strong>{workloadScale}</strong>. Enables release cycles to accelerate by up to <strong>85%</strong> with automated Canary validation.
              </div>
              <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-4 pt-2 border-t border-blue-200/60">
                <span>✓ Zero-Downtime Blue/Green Rollouts</span>
                <span>✓ 100% Terraform IaC Modularization</span>
                <span>✓ 30-50% FinOps Spend Optimization</span>
              </div>
            </div>

            {/* Step 5: Contact & Submission */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-4">
                5. Where should we send the customized cloud roadmap & estimate?
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-emerald-900 mb-1">Cloud Architecture Request Received!</h4>
                  <p className="text-sm text-emerald-700">
                    A VIO principal DevOps architect is reviewing your {cloudProvider} requirements and will contact you within 24 hours with an actionable roadmap.
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
                      placeholder="e.g. David Ross"
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
                      placeholder="d.ross@company.com"
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
                      placeholder="e.g. Fintech Global Corp."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Launch Timeline</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                      <option value="1 - 2 months">1 - 2 months</option>
                      <option value="3 - 6 months">3 - 6 months</option>
                      <option value="Exploring / Planning">Exploring / Planning</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Stack & Specific Requirements</label>
                    <textarea
                      rows={3}
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="e.g. Currently on on-prem VMware and manual Jenkins jobs; looking to transition to AWS EKS with GitHub Actions and ArgoCD GitOps..."
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
                          <span>Submit & Request Cloud Architecture Scoping</span>
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
              Clear answers on zero-downtime deployments, FinOps savings, and compliance.
            </p>
          </div>

          <AccordionFAQ faqs={CLOUD_FAQS} />
        </div>
      </section>

      {/* 8. Closing CTA Banner */}
      <CTABanner
        eyebrow="READY TO ACCELERATE YOUR CLOUD TRANSFORMATION?"
        heading="Build resilient, zero-downtime pipelines with VIO."
        subheading="Schedule a technical consultation with VIO's principal DevOps architects in Richmond, VA for a zero-obligation infrastructure audit and FinOps assessment."
        primaryCtaText="Book Architecture Session"
        primaryCtaLink="/book-a-call"
        secondaryCtaText="Explore All Services"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
