"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  Cloud, 
  Database, 
  Lock, 
  Briefcase, 
  Layers, 
  Building2, 
  Calendar,
  Send,
  Loader2,
  ChevronRight
} from "lucide-react";
import { AccordionFAQ } from "@/components/sections/AccordionFAQ";
import { CTABanner } from "@/components/sections/CTABanner";

const STAFFING_MODELS = [
  {
    id: "full-time",
    title: "Full-Time Placements",
    badge: "Direct Hire & Strategic Roles",
    description: "Connecting organizations with elite, qualified professionals for permanent technical roles. We manage the end-to-end recruitment process from deep technical vetting to executive alignment and onboarding.",
    highlights: [
      "Rigorous technical architecture & coding assessments",
      "Cultural & behavioral alignment verification",
      "Executive search & specialized leadership recruitment",
      "Guaranteed replacement & retention support"
    ],
    idealFor: "Building permanent core engineering teams, tech leads, and principal domain architects."
  },
  {
    id: "contract",
    title: "Contract Staffing",
    badge: "Agile Surge Capacity",
    description: "Providing high-velocity IT professionals to accelerate ongoing sprints, handle seasonal volume surges, and address specialized technical skill gaps on demand with zero administrative friction.",
    highlights: [
      "Rapid deployment active in sprints in 5 to 10 business days",
      "Flexible engagement models (hourly, monthly, or milestone-based)",
      "VIO handles payroll, benefits, and statutory compliance",
      "Seamless contract-to-hire option available"
    ],
    idealFor: "Meeting urgent sprint deadlines, seasonal demands, and temporary niche technical gaps."
  },
  {
    id: "project-teams",
    title: "Project-Based Teams & Pods",
    badge: "Managed Engineering Squads",
    description: "Delivering autonomous, cross-functional engineering pods led by a seasoned delivery lead. We take full ownership of technical milestones from initial architecture through production release.",
    highlights: [
      "Turnkey squads: Architects, Full-Stack Engineers, QA & DevOps",
      "Complete sprint telemetry, KPI tracking, and transparent reporting",
      "Pre-aligned collaboration tools and automated CI/CD practices",
      "Quantifiable outcome accountability"
    ],
    idealFor: "End-to-end cloud migrations, data lakehouse builds, and modern product overhauls."
  }
];

const DISCIPLINES = [
  {
    icon: Cpu,
    title: "Software Development",
    tags: ["React", "Next.js", "Node.js", "Python", "Go", "Java", "Microservices", "REST/gRPC"],
    desc: "Frontend, backend, and distributed systems engineers building responsive, scalable applications."
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    tags: ["AWS", "Google Cloud", "Azure", "Terraform", "Kubernetes", "Docker", "GitOps", "CI/CD"],
    desc: "Cloud native architects automating infrastructure, container orchestration, and continuous release pipelines."
  },
  {
    icon: Database,
    title: "Big Data & Analytics",
    tags: ["Snowflake", "BigQuery", "Databricks", "Kafka", "dbt", "Airflow", "PostgreSQL", "Spark"],
    desc: "Data engineers and lakehouse architects designing streaming pipelines and business intelligence layers."
  },
  {
    icon: Lock,
    title: "Cybersecurity & Governance",
    tags: ["Zero-Trust", "SOC2", "HIPAA", "FedRAMP", "NIST 800-53", "IAM", "DevSecOps", "PenTesting"],
    desc: "Information assurance specialists ensuring regulatory compliance and hardened security postures."
  },
  {
    icon: Sparkles,
    title: "AI, ML & Automation",
    tags: ["LLMs", "Agentic Systems", "PyTorch", "TensorFlow", "UiPath", "LangChain", "RPA", "Computer Vision"],
    desc: "Machine learning specialists deploying generative AI, predictive models, and robotic process automation."
  },
  {
    icon: ShieldCheck,
    title: "Public Sector & SWaM Staffing",
    tags: ["VA-SWaM", "State Agencies", "USAID", "ODGA", "Public Sector Compliance", "Background Cleared"],
    desc: "Certified woman-owned small business delivery for state and federal digital public infrastructure."
  }
];

const VETTING_PROCESS = [
  {
    step: "01",
    title: "Requirements Discovery",
    desc: "We analyze your exact technical requirements, tech stack constraints, team culture, and delivery milestones."
  },
  {
    step: "02",
    title: "Strategic AI Sourcing",
    desc: "We leverage proprietary sourcing channels, executive networks, and AI screening to identify top 5% candidates."
  },
  {
    step: "03",
    title: "Deep Technical Vetting",
    desc: "Live coding interviews, architectural problem-solving, and peer code reviews led by senior VIO architects."
  },
  {
    step: "04",
    title: "Frictionless Onboarding",
    desc: "Smooth integration into your sprint rhythms, Git repositories, and communication channels within days."
  }
];

const FAQS = [
  {
    question: "What staffing models does VIO offer for Technology Workforce?",
    answer: "VIO provides three flexible staffing models: Full-Time Placements for permanent technical roles, Contract Staffing for project surges and temporary demands, and Project-Based Teams (managed pods) led by delivery leads to execute complete roadmaps."
  },
  {
    question: "How does VIO screen and vet technical talent?",
    answer: "We utilize an end-to-end recruitment process combining AI-driven strategic sourcing with rigorous technical evaluations, live coding architecture assessments, and cultural alignment checks conducted by senior engineering leads."
  },
  {
    question: "How quickly can VIO deploy engineering resources to our team?",
    answer: "Our pre-vetted talent pool allows engineers to be onboarded and active in your sprints in as little as 5 to 10 business days."
  },
  {
    question: "Is VIO certified for government and public sector staffing?",
    answer: "Yes. VIO is a certified woman-owned Small, Women-owned, and Minority-owned (VA-SWaM) enterprise in the Commonwealth of Virginia with an extensive track record serving Virginia state agencies (such as ODGA) and USAID."
  },
  {
    question: "Can we convert a contract engineer to full-time?",
    answer: "Yes, we support flexible contract-to-hire arrangements, allowing organizations to evaluate technical execution and cultural fit before making a permanent hiring commitment."
  }
];

export function TechnologyWorkforcePageContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    model: "Contract Staffing",
    rolesNeeded: "",
    timeline: "Immediate (< 2 weeks)",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.company,
          serviceInterest: `Technology Workforce (${formState.model})`,
          industryInterest: "Enterprise IT Staffing",
          budget: "$50k+",
          timeline: formState.timeline,
          message: `Roles: ${formState.rolesNeeded} | Notes: ${formState.notes}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-[#0066cc] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066cc] font-bold">Technology Workforce</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#0066cc] uppercase">
            CUSTOMIZED IT STAFFING & TALENT SOLUTIONS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Technology <span className="text-[#0066cc]">Workforce Solutions</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
          Connecting businesses with top-tier technology professionals to bridge critical talent gaps, accelerate delivery velocity, and deliver specialized technical solutions across cloud, data, and software engineering.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#request-talent"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4" />
            <span>Request Talent Scoping</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#staffing-models"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Explore Staffing Models</span>
          </a>
        </div>
      </section>

      {/* Verified Metrics Counter Row */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/90 shadow-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#0066cc]">65%</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Faster Time-to-Hire</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#0066cc]">50+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Enterprise Deployments</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#0066cc]">99.8%</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Retention & Satisfaction</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/70 text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#0066cc]">10+ Yrs</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Founder-Led Track Record</p>
          </div>
        </div>
      </section>

      {/* 3 Core Staffing Models */}
      <section id="staffing-models" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
            FLEXIBLE ENGAGEMENT ARCHITECTURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Customized Staffing Solutions
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Whether you need a specialized engineer to augment an active sprint or a complete managed team to drive an architectural overhaul, VIO provides tailored engagement models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STAFFING_MODELS.map((model) => (
            <div
              key={model.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0066cc] border border-blue-100 mb-4">
                  {model.badge}
                </span>
                <h3 className="text-2xl font-black text-[#071739] tracking-tight mb-3">
                  {model.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {model.description}
                </p>

                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Key Capabilities:
                </h4>
                <ul className="space-y-2.5 mb-6">
                  {model.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 mb-4">
                  <strong>Ideal for:</strong> {model.idealFor}
                </p>
                <a
                  href="#request-talent"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066cc] hover:text-[#0052a3]"
                >
                  <span>Select {model.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Disciplines */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#f8fafc]/70 rounded-3xl border border-slate-200/80 my-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
            CROSS-FUNCTIONAL EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Specialized Technical Disciplines
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            We source, evaluate, and place practitioners across mission-critical enterprise engineering domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISCIPLINES.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#071739] mb-2">{d.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{d.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Vetting & Delivery Process */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
            METHODICAL EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Our End-to-End Vetting & Delivery Process
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Applying our signature Measure → Analyse → Improve doctrine to talent acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VETTING_PROCESS.map((step) => (
            <div
              key={step.step}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs relative"
            >
              <span className="text-3xl font-black text-[#0066cc]/20 block mb-3 font-mono">
                {step.step}
              </span>
              <h3 className="text-lg font-bold text-[#071739] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Talent Request / Scoping Form */}
      <section id="request-talent" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-blue-950/5">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0066cc] uppercase tracking-widest block mb-1">
              REQUEST TECHNICAL TALENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071739] tracking-tight">
              Scope Your Workforce Needs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              Tell us about your technical gaps, desired engagement model, and timeline. A principal talent architect will respond within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold">Talent Request Received</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for submitting your staffing requirements. A VIO talent architect will review your technical parameters and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Agency Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="Enterprise or Agency"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone Number</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+1 (804) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Staffing Model</label>
                  <select
                    value={formState.model}
                    onChange={(e) => setFormState({ ...formState, model: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  >
                    <option value="Contract Staffing">Contract Staffing (Surge & Temporary)</option>
                    <option value="Full-Time Placements">Full-Time Placements (Direct Hire)</option>
                    <option value="Project-Based Teams">Project-Based Teams (Managed Pods)</option>
                    <option value="Contract-to-Hire">Contract-to-Hire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Onboarding Timeline</label>
                  <select
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                  >
                    <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                    <option value="2-4 weeks">2 - 4 weeks</option>
                    <option value="1-2 months">1 - 2 months</option>
                    <option value="Exploring options">Exploring options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Roles & Disciplines Needed *</label>
                <input
                  type="text"
                  required
                  value={formState.rolesNeeded}
                  onChange={(e) => setFormState({ ...formState, rolesNeeded: e.target.value })}
                  placeholder="e.g. 2 Senior React Engineers, 1 Cloud Architect (AWS/Terraform)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Details / Requirements</label>
                <textarea
                  rows={3}
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  placeholder="Tell us about the project context, technical stack, or special clearance/compliance requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Talent Scoping Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <AccordionFAQ
        eyebrow="WORKFORCE FAQS"
        heading="Frequently Asked Questions: Technology Workforce"
        faqs={FAQS}
      />

      {/* Closing CTA Banner */}
      <CTABanner
        eyebrow="ACCELERATE YOUR CAPACITY"
        heading="Bridge your technical gaps with VIO's elite talent."
        subheading="Book a complimentary 30-minute discovery session with our talent and delivery directors."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="View All Capabilities"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
