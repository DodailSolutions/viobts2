"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Zap,
  TrendingUp,
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
  Database,
  Network,
  Share2
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const CORE_SOLUTIONS = [
  {
    id: "domain-microservices",
    title: "Domain Microservices & Monolith Deconstruction",
    badge: "Modularity & Agility",
    description: "Break free from monolithic constraints without risking operational stability. We identify bounded contexts through Domain-Driven Design (DDD) and systematically extract independent, loosely-coupled microservices with dedicated data stores—eliminating single points of failure.",
    highlights: [
      "Progressive monolith decomposition with zero application downtime",
      "Database-per-service pattern ensuring complete data store autonomy",
      "Automated parallel validation and continuous data reconciliation",
      "Independent deployment pipelines empowering autonomous developer pods"
    ],
    idealFor: "Enterprises struggling with bloated codebases, slow release cycles, and cascading deployment failures."
  },
  {
    id: "api-gateway",
    title: "Enterprise API Gateways & Traffic Governance",
    badge: "Security & Sub-50ms Latency",
    description: "Establish a resilient, unified entry point for internal and external consumers. We engineer high-throughput API gateways utilizing Kong, Apigee, and Envoy that enforce zero-trust security, rate limiting, token validation, and automated API documentation.",
    highlights: [
      "Sub-50ms distributed routing, caching, and rate limiting",
      "Zero-trust security: mTLS, OAuth2/OIDC, and automated token introspection",
      "Automated OpenAPI 3.0 / Swagger schema validation and developer portals",
      "Intelligent Canary traffic shifting and circuit breaking"
    ],
    idealFor: "Organizations exposing public APIs, managing multi-tenant traffic, or securing mobile and web backends."
  },
  {
    id: "event-driven",
    title: "Event-Driven Messaging & Distributed Sagas",
    badge: "Resilience & Event Sourcing",
    description: "Decouple synchronous HTTP request-response bottlenecks. We construct high-throughput asynchronous messaging backbones using Apache Kafka and RabbitMQ with distributed Saga orchestration—guaranteeing eventual consistency across distributed domains.",
    highlights: [
      "Asynchronous pub/sub message brokers with exactly-once delivery semantics",
      "Distributed Saga patterns (orchestration & choreography) replacing two-phase commit",
      "Resilient Dead-Letter Queues (DLQ) and automated retry policies",
      "Event sourcing and Change Data Capture (CDC) with Debezium"
    ],
    idealFor: "High-volume transactional systems (Fintech, E-commerce, Logistics) requiring bulletproof resilience."
  }
];

const DISCIPLINES = [
  {
    icon: Network,
    title: "API Protocols & Contracts",
    tags: ["RESTful APIs", "gRPC / Protobuf", "GraphQL (Apollo Federation)", "OpenAPI 3.0", "AsyncAPI"],
    desc: "Designing strongly-typed, versioned API contracts engineered for backward compatibility and binary performance."
  },
  {
    icon: Layers,
    title: "API Gateways & Ingress",
    tags: ["Kong Gateway", "Google Apigee", "AWS API Gateway", "Traefik", "Envoy Proxy", "NGINX"],
    desc: "Deploying high-concurrency API gateways enforcing rate limiting, edge caching, and centralized authentication."
  },
  {
    icon: Zap,
    title: "Event Streaming & Message Queues",
    tags: ["Apache Kafka", "RabbitMQ", "AWS SQS/SNS", "Redis Pub/Sub", "Debezium CDC", "NATS"],
    desc: "Building event-driven backbones for distributed systems, microservices, and asynchronous background tasks."
  },
  {
    icon: Code2,
    title: "Microservice Frameworks",
    tags: ["Node.js / NestJS", "Go (Golang)", "Java / Spring Boot", "Python / FastAPI", ".NET Core"],
    desc: "Crafting lightweight, container-ready microservices optimized for minimal memory footprint and fast cold starts."
  },
  {
    icon: Boxes,
    title: "Service Mesh & Resiliency",
    tags: ["Istio Service Mesh", "Envoy", "Linkerd", "Circuit Breakers (Resilience4j)", "Cilium"],
    desc: "Managing East-West inter-service communication with dynamic traffic routing, mutual TLS, and fault injection."
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Security & Tracing",
    tags: ["OpenTelemetry (OTel)", "Jaeger", "OAuth2 / OIDC", "mTLS", "HashiCorp Vault", "Keycloak"],
    desc: "Implementing distributed end-to-end trace correlation and identity propagation across all microservice hops."
  }
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Domain Modeling & Dependency Mapping",
    desc: "We analyze your monolithic codebase, database relationships, and transaction boundaries to identify bounded contexts and map domain decoupling priorities.",
    duration: "Week 1 - 2"
  },
  {
    step: "02",
    title: "API Contract Design & Gateway Setup",
    desc: "Our architects define OpenAPI and gRPC contracts, deploy the enterprise API gateway layer, and establish security authentication baselines.",
    duration: "Week 2 - 4"
  },
  {
    step: "03",
    title: "Phased Service Extraction & Event Bus",
    desc: "We extract microservices progressively, implement event-driven CDC pipelines with Kafka, and test distributed sagas under peak simulation loads.",
    duration: "Week 4 - 8"
  },
  {
    step: "04",
    title: "Progressive Cutover & SRE Observability",
    desc: "We shift production traffic using Canary routing, verify distributed OpenTelemetry tracing, and train your teams on autonomous domain ownership.",
    duration: "Ongoing"
  }
];

const API_FAQS = [
  {
    question: "How does microservices architecture prevent system-wide outages (fault isolation)?",
    answer: "By decoupling services into isolated containers with dedicated databases, circuit breakers, and asynchronous message queues, an error or traffic spike in one component (e.g. notifications or reports) never cascades into core operations (e.g. checkout, payments, or user auth)."
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
  },
  {
    question: "Can VIO integrate legacy core systems with modern mobile and cloud APIs?",
    answer: "Yes. We engineer API abstraction and façade layers that wrap legacy mainframes, SQL databases, and SOAP endpoints with modern, rate-limited REST, gRPC, or GraphQL interfaces."
  }
];

export function ApiMicroservicesPageContent() {
  // Interactive Microservices Scoping Tool State
  const [currentArchitecture, setCurrentArchitecture] = useState("Monolithic Core (Single Codebase/DB)");
  const [primaryObjective, setPrimaryObjective] = useState("Break Down Monolith into Domain Microservices");
  const [serviceVolume, setServiceVolume] = useState("10 - 50 Microservices");
  const [trafficScale, setTrafficScale] = useState("1M - 10M Requests / day");

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
          service: "API & Microservices",
          message: `[API & MICROSERVICES ASSESSMENT] Architecture: ${currentArchitecture} | Objective: ${primaryObjective} | Volume: ${serviceVolume} | Traffic: ${trafficScale} | Notes: ${contactNotes || "None"}`,
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
            <Cpu className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Modular Microservices & API Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Decouple Monolithic Bottlenecks With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600">
              High-Performance API & Microservices
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Build modular, fault-isolated digital architectures engineered for independent component scalability and rapid time-to-market. VIO designs enterprise API gateways, event-driven backbones, and domain microservices that connect heterogeneous systems seamlessly.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#scoping-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Scope Microservices Roadmap</span>
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
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">99.99%</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Fault Isolation & Uptime</div>
              <p className="text-xs text-slate-500">Circuit breakers & containerized domain isolation</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight">10x</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Independent Scalability</div>
              <p className="text-xs text-slate-500">Scale hot services without whole-app overhead</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-1 tracking-tight">3x</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Faster Time-to-Market</div>
              <p className="text-xs text-slate-500">Autonomous pods releasing decoupled features</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/70 shadow-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-700 mb-1 tracking-tight">&lt; 50ms</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Distributed API Latency</div>
              <p className="text-xs text-slate-500">Binary gRPC protocols & edge gateway caching</p>
            </div>
          </div>
        </div>

        {/* Enterprise Grounding / Proven Credentials */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Engineered on Open Standards & Proven Enterprise Patterns
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-sm font-semibold">
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <Boxes className="w-4 h-4 text-blue-600" /> Domain-Driven Design (DDD)
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> OpenAPI 3.0 & AsyncAPI
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200">
              <FileCheck className="w-4 h-4 text-cyan-600" /> Certified Woman-Owned VA-SWaM
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Pillars of Modular Architecture
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              From monolith deconstruction and high-throughput API gateways to event-driven messaging, we architect composable systems built for long-term scalability.
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
            Six Specialized Microservices Disciplines
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We build and maintain resilient microservice ecosystems leveraging modern protocols, event streaming engines, and service mesh governance.
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
              Our 4-Stage Microservices Delivery Blueprint
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              A structured, low-risk extraction framework that guarantees continuous business continuity, transactional integrity, and zero unexpected downtime.
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

      {/* 6. Interactive Architecture Scoping Tool */}
      <section id="scoping-tool" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            Interactive Architecture Scoping
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scope Your Microservices Architecture
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Select your current application footprint to generate an optimal microservices blueprint and receive a direct roadmap from our enterprise architects.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmitScoping} className="space-y-8">
            {/* Step 1: Current Architecture */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                1. What is your current application architecture?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Monolithic Core (Single Codebase/DB)",
                  "Partially Decoupled / Distributed Monolith",
                  "Hybrid SOA & Legacy Middleware",
                  "Greenfield Microservices Design"
                ].map((arch) => (
                  <button
                    key={arch}
                    type="button"
                    onClick={() => setCurrentArchitecture(arch)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      currentArchitecture === arch
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{arch}</span>
                    {currentArchitecture === arch && <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Objective */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                2. What is your primary architectural objective?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Break Down Monolith into Domain Microservices",
                  "Deploy High-Throughput Enterprise API Gateway",
                  "Implement Asynchronous Event Streaming (Kafka/RabbitMQ)",
                  "Implement Zero-Trust API Security & OAuth2/mTLS",
                  "Improve API Latency & Independent Scalability",
                  "Establish Multi-Team API Contract Governance"
                ].map((obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setPrimaryObjective(obj)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      primaryObjective === obj
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{obj}</span>
                    {primaryObjective === obj && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Target Volume & Traffic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  3. Target Service Volume
                </label>
                <div className="space-y-2">
                  {[
                    "< 10 Microservices",
                    "10 - 50 Microservices",
                    "50+ Enterprise Microservices Mesh"
                  ].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setServiceVolume(vol)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        serviceVolume === vol
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{vol}</span>
                      {serviceVolume === vol && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  4. Expected Daily API Traffic Scale
                </label>
                <div className="space-y-2">
                  {[
                    "< 1M Requests / day",
                    "1M - 10M Requests / day",
                    "10M - 100M+ High-Concurrency Scale"
                  ].map((traf) => (
                    <button
                      key={traf}
                      type="button"
                      onClick={() => setTrafficScale(traf)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                        trafficScale === traf
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>{traf}</span>
                      {trafficScale === traf && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projected Architecture Box */}
            <div className="p-5 rounded-2xl bg-blue-50/90 border border-blue-200/80 text-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Projected Architecture & Scalability Gains</span>
              </div>
              <div className="text-sm font-medium text-slate-800">
                A modular microservices blueprint tailored for <strong>{currentArchitecture}</strong>, engineered for <strong>{serviceVolume}</strong> supporting <strong>{trafficScale}</strong>. Delivers <strong>99.99% fault isolation</strong> and <strong>3x faster feature velocity</strong>.
              </div>
              <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-4 pt-2 border-t border-blue-200/60">
                <span>✓ Database-per-Service Isolation</span>
                <span>✓ Sub-50ms Gateway Routing</span>
                <span>✓ Distributed Saga Transaction Resiliency</span>
              </div>
            </div>

            {/* Step 5: Contact & Submission */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-4">
                5. Where should we send the detailed microservices roadmap & architectural assessment?
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-emerald-900 mb-1">Architecture Request Received!</h4>
                  <p className="text-sm text-emerald-700">
                    A VIO principal microservices architect is reviewing your requirements and will contact you within 24 hours with an actionable roadmap.
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
                      placeholder="e.g. Jason Myers"
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
                      placeholder="j.myers@company.com"
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
                      placeholder="e.g. Acme FinTech Corp."
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Tech Stack & Specific Requirements</label>
                    <textarea
                      rows={3}
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="e.g. Monolithic Java Spring application with shared PostgreSQL database; need to decouple order processing and inventory into gRPC/REST microservices with Kafka..."
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
              Insights on fault isolation, monolith deconstruction, and distributed data consistency.
            </p>
          </div>

          <AccordionFAQ faqs={API_FAQS} />
        </div>
      </section>

      {/* 8. Closing CTA Banner */}
      <CTABanner
        eyebrow="READY TO MODERNIZE YOUR APPLICATION ARCHITECTURE?"
        heading="Decouple monolithic bottlenecks and scale with confidence."
        subheading="Schedule a technical consultation with VIO's principal microservices architects in Richmond, VA for a zero-obligation architecture review and monolith decoupling roadmap."
        primaryCtaText="Book Architecture Session"
        primaryCtaLink="/book-a-call"
        secondaryCtaText="Explore All Services"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
