"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Clock,
  Building2,
  Lock,
  ChevronRight,
  Send,
  Loader2,
  FileText,
  Binary,
  Eye,
  Workflow,
  BarChart3,
  Server
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const CORE_SOLUTIONS = [
  {
    id: "rpa-enterprise",
    title: "Enterprise Robotic Process Automation (RPA)",
    badge: "Operational Velocity & Zero Error",
    description: "Liberate high-value knowledge workers from soul-crushing manual data entry, reconciliation, and swivel-chair operations. We architect resilient attended and unattended digital worker fleets utilizing UiPath, Microsoft Power Automate, and Automation Anywhere that interface seamlessly with legacy ERPs, CRMs, and web portals.",
    highlights: [
      "Attended & unattended digital worker fleets running 24/7 with zero downtime",
      "Cross-platform legacy ERP, SAP, Salesforce, and mainframe automation",
      "Self-healing bot architectures resilient to UI changes and application updates",
      "Automated compliance audit trails and credential management via HashiCorp Vault"
    ],
    idealFor: "Enterprises with high-volume clerical workflows, regulatory reporting bottlenecks, or multi-system manual data entry."
  },
  {
    id: "idp-ocr",
    title: "Intelligent Document Processing (IDP) & Cognitive OCR",
    badge: "Cognitive Extraction & 99.9% Precision",
    description: "Transform unstructured physical PDFs, scanned receipts, medical claims, and complex contracts into clean, structured, validated relational data. We fuse computer vision with multimodal foundation models to extract key-value pairs, detect line items, and automate validation rules with human-in-the-loop exception handling.",
    highlights: [
      "Multimodal document extraction (AWS Textract, Azure Document Intelligence, Google Cloud Document AI)",
      "Automated boundary detection, table parsing, and multi-page contract indexing",
      "Configurable Human-in-the-Loop (HITL) review queues for confidence thresholding",
      "Direct integration with enterprise ERP, billing, and document management systems"
    ],
    idealFor: "Healthcare, financial services, legal, and logistics firms handling thousands of unstructured invoices, claims, and bills of lading."
  },
  {
    id: "genai-ml",
    title: "Predictive Machine Learning & Agentic Generative AI",
    badge: "Cognitive Intelligence & Sovereign AI",
    description: "Bridge the gap between raw corporate data and proactive decision-making. We build production-ready predictive ML pipelines (churn forecasting, fraud prevention, dynamic pricing) alongside secure enterprise Generative AI agents powered by private Retrieval-Augmented Generation (RAG) and sovereign VPC LLM deployments.",
    highlights: [
      "Enterprise RAG knowledge assistants grounded exclusively in verified corporate docs",
      "Predictive machine learning models (XGBoost, PyTorch, Scikit-learn) with real-time inference",
      "Autonomous multi-step agentic workflows capable of API tool calling and decision routing",
      "Zero-data-leakage architecture: private VPC LLM inference with strict DLP guardrails"
    ],
    idealFor: "Organizations seeking predictive analytics, automated customer decision engines, or private conversational AI copilots."
  }
];

const DISCIPLINES = [
  {
    icon: Bot,
    title: "Enterprise RPA Platforms",
    tags: ["UiPath Orchestrator", "Microsoft Power Automate", "Automation Anywhere", "Blue Prism", "Python Playwright"],
    desc: "Deploying enterprise-grade digital workers with high availability, credential vaulting, and centralized governance."
  },
  {
    icon: FileText,
    title: "Intelligent Document Processing (IDP)",
    tags: ["AWS Textract", "Azure Document Intelligence", "Google Cloud Document AI", "Tesseract OCR", "LayoutLM"],
    desc: "Extracting structured entities from messy PDFs, scanned receipts, and complex multi-page financial statements."
  },
  {
    icon: Cpu,
    title: "Machine Learning & Deep Learning",
    tags: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "LightGBM", "OpenCV"],
    desc: "Developing custom predictive models for anomaly detection, recommendation engines, and dynamic forecasting."
  },
  {
    icon: Sparkles,
    title: "Generative AI & Agentic Orchestration",
    tags: ["LangChain", "LlamaIndex", "CrewAI", "OpenAI", "Anthropic Claude", "Google Gemini", "FastAPI"],
    desc: "Engineering multi-agent reasoning systems, prompt pipelines, and function-calling enterprise assistants."
  },
  {
    icon: BarChart3,
    title: "MLOps & Continuous Governance",
    tags: ["MLflow", "Kubeflow", "Weights & Biases", "Seldon Core", "Feast Feature Store", "Prometheus"],
    desc: "Establishing CI/CD for machine learning, automated model retraining, and real-time concept drift monitoring."
  },
  {
    icon: ShieldCheck,
    title: "Private LLMs & Guardrails",
    tags: ["NVIDIA NeMo Guardrails", "vLLM", "Ollama", "Llama 3", "Mistral", "AWS Bedrock VPC"],
    desc: "Implementing sovereign, air-gapped language model deployments with zero external data leakage risks."
  }
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Process Discovery & Feasibility Mining",
    desc: "We analyze your transactional logs, conduct desktop process mining, and calculate exact task frequencies to quantify ROI potential before writing a single line of code.",
    duration: "Week 1 - 2"
  },
  {
    step: "02",
    title: "Architecture, Security & Guardrail Blueprint",
    desc: "Our architects define enterprise security boundaries, human-in-the-loop confidence thresholds, API connectors, and automated error-handling fallbacks.",
    duration: "Week 2 - 4"
  },
  {
    step: "03",
    title: "Agile Bot & Cognitive Model Engineering",
    desc: "We construct and validate bots and AI models in two-week iterative sprints, testing edge-cases against synthetic and historical production datasets.",
    duration: "Week 4 - 8"
  },
  {
    step: "04",
    title: "Canary Deployment & MLOps Governance",
    desc: "We deploy bots to production with canary traffic shifting, establish real-time drift telemetry, and train internal staff on ongoing governance and exception handling.",
    duration: "Ongoing"
  }
];

const RPA_FAQS = [
  {
    question: "What is the difference between RPA and AI/Machine Learning in VIO's implementation?",
    answer: "Robotic Process Automation (RPA) excels at deterministic, rules-based tasks—such as copying data across legacy ERPs, logging into partner portals, and triggering batch jobs. AI and Machine Learning handle non-deterministic, cognitive tasks—such as understanding unstructured text, categorizing invoices with OCR, predicting churn, and generating intelligent summaries. VIO integrates both into Intelligent Automation (IA), where AI acts as the brain and RPA acts as the hands."
  },
  {
    question: "How does VIO safeguard proprietary enterprise data when deploying Generative AI?",
    answer: "We mandate zero-data-retention architectures. All enterprise GenAI deployments utilize dedicated private cloud tenants (e.g. AWS Bedrock, Azure OpenAI) or self-hosted open-weight LLMs (Llama 3, Mistral) within your isolated VPC. Your internal data is never used for foundation model pre-training, and all prompt-response exchanges are governed by strict DLP (Data Loss Prevention) guardrails."
  },
  {
    question: "Which enterprise RPA platforms do you support?",
    answer: "We are platform-agnostic with specialized certified engineering capacity in UiPath, Microsoft Power Automate Desktop/Cloud, and Automation Anywhere, as well as open-source Python automation frameworks (Playwright, Selenium, Robot Framework)."
  },
  {
    question: "How quickly can our organization achieve measurable ROI from an automation initiative?",
    answer: "Our phased automation delivery blueprint targets high-frequency, manual bottlenecks first. Most enterprise clients deploy their initial production bot or Intelligent Document Processing (IDP) pipeline within 4 to 6 weeks, achieving positive net ROI within 90 days."
  },
  {
    question: "How do you maintain and monitor ML models after production deployment (MLOps)?",
    answer: "We deploy end-to-end MLOps pipelines using MLflow, Kubeflow, and Prometheus. Our monitoring frameworks track model prediction accuracy, feature distribution drift, data anomalies, and inference latency in real time, automatically triggering human review or retraining workflows when thresholds deviate."
  },
  {
    question: "What happens if a third-party application UI changes or an automated process encounters an error?",
    answer: "Our bots are engineered with resilient selector hierarchies, OCR fallbacks, and intelligent retry logic. When an unrecoverable exception occurs, the system logs the incident, captures full telemetry, and automatically diverts the task to a Human-in-the-Loop (HITL) queue without stalling the overall pipeline."
  }
];

export function RpaMlAiPageContent() {
  // Interactive Automation & AI ROI Scoping Calculator State
  const [operationalFocus, setOperationalFocus] = useState("Repetitive Back-Office Data Entry (RPA)");
  const [techStack, setTechStack] = useState("UiPath / Microsoft Power Automate");
  const [workloadHours, setWorkloadHours] = useState("500 - 2,000 Hours / month");
  const [deploymentTarget, setDeploymentTarget] = useState("Enterprise Cloud (AWS / Azure / GCP)");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Dynamic Estimation Calculations
  const getCalculatedMetrics = () => {
    let baseAnnualHours = 12000;
    let efficiencyMultiplier = 80;
    let paybackMonths = "60 - 90 Days";

    if (workloadHours === "Under 500 Hours / month") {
      baseAnnualHours = 4000;
      efficiencyMultiplier = 75;
      paybackMonths = "90 - 120 Days";
    } else if (workloadHours === "500 - 2,000 Hours / month") {
      baseAnnualHours = 15000;
      efficiencyMultiplier = 82;
      paybackMonths = "60 - 90 Days";
    } else if (workloadHours === "2,000 - 5,000 Hours / month") {
      baseAnnualHours = 42000;
      efficiencyMultiplier = 85;
      paybackMonths = "45 - 60 Days";
    } else {
      baseAnnualHours = 90000;
      efficiencyMultiplier = 88;
      paybackMonths = "30 - 45 Days";
    }

    const savedHours = Math.round((baseAnnualHours * efficiencyMultiplier) / 100);

    return {
      savedHours: savedHours.toLocaleString(),
      efficiencyRate: `${efficiencyMultiplier}%`,
      payback: paybackMonths
    };
  };

  const metrics = getCalculatedMetrics();

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
          service: "RPA, ML & AI",
          message: `[AUTOMATION & AI ROI ESTIMATE] Focus: ${operationalFocus} | Platform: ${techStack} | Workload: ${workloadHours} | Environment: ${deploymentTarget} | Est. Saved Hours: ${metrics.savedHours} hrs/yr | Notes: ${contactNotes || "None"}`,
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
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100 opacity-60 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Cognitive Automation & Enterprise Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Scale Smarter with Enterprise{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">
              RPA, Machine Learning & AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            Streamline business efficiency by automating repetitive operational toil and driving real-time intelligence. VIO bridges robotic process automation, predictive machine learning, and secure private generative AI to maximize operational agility, reduce human error, and deliver measurable ROI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#scoping-calculator"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Calculate Automation ROI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/book-a-call"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Schedule Technical Consultation</span>
            </Link>
          </div>

          {/* Trust and Certification Badges */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Enterprise RPA Certified Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Zero-Data-Retention Private GenAI</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>VA-SWaM Certified Public & Private Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Performance Metrics Ribbon */}
      <section className="py-12 bg-slate-50/80 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">85%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Manual Time Saved</div>
              <p className="text-xs text-slate-600 leading-snug">Average reduction in repetitive clerical data handling hours</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">10x</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cycle Acceleration</div>
              <p className="text-xs text-slate-600 leading-snug">Faster transaction processing across ERPs, claims, and billing</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">99.9%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Extraction Precision</div>
              <p className="text-xs text-slate-600 leading-snug">Multi-page IDP document accuracy with human-in-the-loop review</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">&lt; 90 Days</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Time-to-Value</div>
              <p className="text-xs text-slate-600 leading-snug">Positive net ROI realized through phased production bot deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Solutions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Core Service Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Intelligent Automation Engineered for Enterprise Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From rules-based task automation to cognitive deep learning, we deploy targeted solutions that eliminate operational friction and accelerate business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group hover:border-blue-300"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
                  {sol.badge}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {sol.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                  {sol.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {sol.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ideal For</div>
                <p className="text-xs text-slate-600 font-medium leading-normal">{sol.idealFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Six Technical Disciplines Grid */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-3">
              Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Full-Spectrum Machine Learning & Automation Tooling
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Our certified automation engineers and AI architects leverage battle-tested enterprise frameworks and sovereign LLMs to ensure rock-solid production reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DISCIPLINES.map((disc, idx) => {
              const DiscIcon = disc.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-blue-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-5">
                    <DiscIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{disc.title}</h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">{disc.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {disc.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Four-Stage Delivery Methodology */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Implementation Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Phased Automation & AI Delivery Roadmap
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We follow a disciplined engineering blueprint designed to derisk deployment, validate security boundaries, and guarantee rapid time-to-value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl font-extrabold text-blue-100 mb-4">{item.step}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>Timeline:</span>
                <span>{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Automation & AI ROI Scoping Calculator */}
      <section id="scoping-calculator" className="py-20 bg-[#071739] text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Context and Live Calculation Output */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Scoping Tool</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Calculate Your Enterprise Automation ROI
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Select your primary operational bottleneck and workload scale below to calculate your projected annual hours saved, efficiency multiplier, and estimated payback window.
              </p>

              {/* Dynamic Metrics Display Cards */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-blue-950/60 border border-blue-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-1">{metrics.savedHours}</div>
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Hours Saved / Yr</div>
                </div>

                <div className="bg-blue-950/60 border border-blue-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{metrics.efficiencyRate}</div>
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Efficiency Gain</div>
                </div>

                <div className="bg-blue-950/60 border border-blue-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-1">{metrics.payback}</div>
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Est. Payback</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-blue-900/30 border border-blue-800/60 space-y-3">
                <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">What You Get:</div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Detailed process-mining feasibility and automation suitability score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fixed-scope proof of concept (PoC) roadmap for high-frequency workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Security and data leakage risk assessment for generative AI adoption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Scoping Form & Direct Lead Submission */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Request Custom Automation Assessment</h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your parameters and contact details. A senior VIO AI & Automation architect will review your configuration within 1 business day.
              </p>

              {submitSuccess ? (
                <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
                  <h4 className="text-lg font-bold text-blue-900">Assessment Request Received!</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Thank you! Our automation architecture team has received your scoping parameters. We will prepare your detailed feasibility report and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitScoping} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      1. Operational Focus Area
                    </label>
                    <select
                      value={operationalFocus}
                      onChange={(e) => setOperationalFocus(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                    >
                      <option>Repetitive Back-Office Data Entry (RPA)</option>
                      <option>Document & Invoice Processing (IDP / OCR)</option>
                      <option>Predictive Analytics & Forecasting (Custom ML)</option>
                      <option>Agentic Generative AI & Enterprise RAG</option>
                      <option>Full-Stack Intelligent Automation (RPA + GenAI)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        2. Target Tech Stack
                      </label>
                      <select
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                      >
                        <option>UiPath / Microsoft Power Automate</option>
                        <option>Python ML (PyTorch / TensorFlow)</option>
                        <option>Private Generative AI / RAG</option>
                        <option>Platform-Agnostic / Unsure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        3. Monthly Manual Workload
                      </label>
                      <select
                        value={workloadHours}
                        onChange={(e) => setWorkloadHours(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                      >
                        <option>Under 500 Hours / month</option>
                        <option>500 - 2,000 Hours / month</option>
                        <option>2,000 - 5,000 Hours / month</option>
                        <option>5,000+ Hours / month</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      4. Deployment Environment
                    </label>
                    <select
                      value={deploymentTarget}
                      onChange={(e) => setDeploymentTarget(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                    >
                      <option>Enterprise Cloud (AWS / Azure / GCP)</option>
                      <option>On-Premises / Air-Gapped Datacenter</option>
                      <option>Hybrid Multi-Cloud Architecture</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="alex@enterprise.com"
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Enterprise Inc."
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Key Workflows or Specific Pain Points (Optional)</label>
                      <textarea
                        rows={2}
                        value={contactNotes}
                        onChange={(e) => setContactNotes(e.target.value)}
                        placeholder="e.g., Invoices in 5 formats, manual copy-paste into SAP, need private LLM"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Feasibility Estimate...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit for Expert Architecture Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Everything you need to know about enterprise RPA, machine learning, and private AI deployments.
          </p>
        </div>

        <AccordionFAQ faqs={RPA_FAQS} />
      </section>

      {/* 8. CTABanner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6">
        <CTABanner
          eyebrow="Ready to Automate Your Operations?"
          heading="Accelerate Efficiency with Enterprise AI & RPA"
          subheading="Partner with VIO to eradicate manual bottlenecks, deploy sovereign private AI copilots, and achieve measurable ROI within 90 days."
          primaryCtaText="Schedule Scoping Session"
          primaryCtaLink="/book-a-call"
          secondaryCtaText="Explore All Services"
          secondaryCtaLink="/services"
        />
      </section>
    </div>
  );
}
