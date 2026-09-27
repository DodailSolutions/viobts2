"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Compass, 
  ArrowRight, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail,
  Scale,
  Zap,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Search,
  SlidersHorizontal,
  Building2,
  Database,
  Cloud,
  Cpu,
  Workflow,
  Radio,
  Quote
} from "lucide-react";
import { CompanySubNav } from "@/components/shared/CompanySubNav";
import { CTABanner } from "@/components/sections/CTABanner";

export default function WhoWeArePage() {
  const [activeYear, setActiveYear] = useState<string>("2024");

  const milestones = [
    {
      year: "2024",
      tag: "STATE GOVERNMENT & GENAI",
      client: "Virginia Office of Data Governance and Analytics (ODGA)",
      headline: "Data Governance & Award-Winning GenAI Job Aid Solution",
      description: "Led data governance strategy and advanced analytics for ODGA, extending adoption to multiple Virginia agencies. Developed an award-winning GenAI-based job aid POC using public resources and websites.",
      kpis: [
        { label: "Agency Reach", value: "Multi-Agency" },
        { label: "Solution", value: "Award-Winning GenAI POC" },
        { label: "Discipline", value: "Data Governance" }
      ]
    },
    {
      year: "2023",
      tag: "FINTECH & BROKERAGE-AS-A-SERVICE",
      client: "DriveWealth",
      headline: "Enterprise Data Architecture & Fractional Trading Enablement",
      description: "Provided consulting and staffing for DriveWealth, improving data accessibility by 25% and ensuring governance compliance. Managed vendor enablement and offshore teams, increasing accuracy by 30% and revenue by 10%.",
      kpis: [
        { label: "Data Accessibility", value: "+25%" },
        { label: "Data Accuracy", value: "+30%" },
        { label: "Revenue Boost", value: "+10%" },
        { label: "Customer Retention", value: "+15%" }
      ]
    },
    {
      year: "2021",
      tag: "FEDERAL CYBERSECURITY & OBSERVABILITY",
      client: "USAID (CDM Program)",
      headline: "Centralized Logging Platform & Tableau Enterprise Visualization (TEV)",
      description: "Built a centralized logging platform and Tableau Enterprise Visualization (TEV) for USAID. Enabled real-time alerting and monitoring for the Continuous Diagnostics and Mitigation (CDM) Program, enhancing data-driven decision-making.",
      kpis: [
        { label: "Platform", value: "Tableau Enterprise (TEV)" },
        { label: "Capability", value: "Real-Time Telemetry" },
        { label: "Mandate", value: "Federal CDM Security" }
      ]
    },
    {
      year: "2020",
      tag: "RETAIL & OMNICHANNEL COMMERCE",
      client: "Advance Auto Parts",
      headline: "Omnichannel Catalog Data Centralization & Cloud Convergence",
      description: "Developed cloud solutions to centralize Omnichannel catalog data for Advance Auto Parts, boosting sales by 9%. Led vendor selection and contract establishment for data governance and modeling tools.",
      kpis: [
        { label: "Sales Impact", value: "+9% Boost" },
        { label: "Data Scope", value: "Omnichannel Catalog" },
        { label: "Cloud Governance", value: "Enterprise-Wide" }
      ]
    },
    {
      year: "2019",
      tag: "GLOBAL FINANCIAL INSTITUTIONS",
      client: "Wells Fargo",
      headline: "Program Management & Scalable Business Process Automation",
      description: "Led program management and business process automation for Wells Fargo, enhancing efficiency and customer experience. Implemented strategic consulting and automation, reducing costs and optimizing operations.",
      kpis: [
        { label: "Efficiency", value: "Streamlined" },
        { label: "Compliance", value: "Reg-Ready" },
        { label: "Operations", value: "Cost-Optimized" }
      ]
    },
    {
      year: "2018",
      tag: "LIFE SCIENCES & PHARMACEUTICALS",
      client: "Large Global Pharmaceutical Leader",
      headline: "Machine Learning, Advanced Analytics & Cloud Data Warehousing",
      description: "Designed machine learning, advanced analytics, cloud data warehousing, and metadata management features for a Large Pharmaceutical company. Enabled data-driven insights, resulting in a 5% increase in pharmaceutical sales.",
      kpis: [
        { label: "Sales Increase", value: "+5%" },
        { label: "Platform", value: "Cloud Data Warehouse" },
        { label: "AI/ML Focus", value: "Predictive Analytics" }
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Data Governance & GenAI Strategic Integration for Virginia State Agencies",
      client: "Virginia Office of Data Governance and Analytics (ODGA)",
      sector: "State & Public Sector",
      icon: Database,
      points: [
        "Developed and implemented a data governance strategy for the Virginia Office of Data Governance and Analytics (ODGA), extending this framework to multiple state agencies.",
        "Leveraged GenAI to develop job aids as an award-winning proof of concept (POC) solution utilizing publicly available resources and websites."
      ]
    },
    {
      title: "AI-Ready Enterprise Architecture and Governance for USAID",
      client: "USAID",
      sector: "Federal Government",
      icon: Cloud,
      points: [
        "Implemented a robust EA governance framework, aligning IT strategies with business objectives and achieving 90% alignment for new projects.",
        "Deployed a comprehensive EA framework, including Reference Architecture, Application Rationalization, and Data Architecture & Management, streamlining systems and eliminating redundancies by 25%.",
        "Optimized the technology lifecycle, resulting in a 20% reduction in costs.",
        "Enhanced platform governance through review and integration with industry-leading tools – Databricks and Snowflake, thereby supporting data-driven initiatives.",
        "Improved data quality by 30% through the implementation of MDM standards and expanded AI governance framework to include AI/ML use cases."
      ]
    },
    {
      title: "Data & Analytics Strategy for DriveWealth",
      client: "DriveWealth",
      sector: "Fintech & Brokerage-as-a-Service",
      icon: TrendingUp,
      points: [
        "Delivered consulting and staffing support for DriveWealth, executing end-to-end data management and architecture.",
        "Improved data accessibility by 25%, enhanced analytics capabilities, and ensured governance compliance, leading to a 15% increase in customer retention, faster trade execution, and expanded investment opportunities, including the launch of fractional trading.",
        "Led vendor enablement and offshore team management, boosting accuracy by 30% and driving a 10% revenue growth."
      ]
    },
    {
      title: "Real-Time Data Visualization and Alerting Platform for USAID CDM",
      client: "USAID (CDM Program)",
      sector: "Continuous Diagnostics & Mitigation",
      icon: BarChart3,
      points: [
        "Designed and implemented a Log Centralized Services Platform, integrated with Tableau Enterprise Visualization (TEV) to provide real-time alerting and data visualization.",
        "Empowered federal agencies to enhance data discovery capabilities, ensure real-time monitoring, and mitigate security risks more effectively."
      ]
    },
    {
      title: "Cloud Convergence and Data Governance for Advance Auto Parts",
      client: "Advance Auto Parts",
      sector: "Enterprise Omnichannel Commerce",
      icon: Building2,
      points: [
        "Delivered transformative cloud solutions that centralized Advance Auto Parts’ omnichannel catalog data, resulting in a 9% increase in sales.",
        "Optimized data access and visibility across the organization.",
        "Established critical vendor contracts for Data Governance and Modeling Tools, positioning the company for long-term success."
      ]
    },
    {
      title: "Business Process Automation for Wells Fargo",
      client: "Wells Fargo",
      sector: "Financial Services & Banking",
      icon: Workflow,
      points: [
        "Managed a comprehensive business process automation program for Wells Fargo, streamlining internal operations and increasing overall efficiency.",
        "Provided significant improvements in operational scalability and regulatory compliance, enabling Wells Fargo to deliver better service while adhering to stringent industry regulations."
      ]
    },
    {
      title: "Machine Learning & Advanced Analytics Platform for a Large Pharmaceutical Client",
      client: "Large Global Pharmaceutical Leader",
      sector: "Healthcare & Life Sciences",
      icon: Cpu,
      points: [
        "Architected and implemented emerging platform features for machine learning, advanced analytics, and metadata management.",
        "Contributed to a 5% increase in pharmaceutical sales by enhancing decision-making and data-driven insights.",
        "Delivered cloud data warehousing and advanced analytics to keep the client competitive in the fast-evolving pharmaceutical industry."
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Interactive Sub-Navigation Bar */}
      <CompanySubNav currentTab="who-we-are" />

      {/* Hero Section */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-black text-[#0c34cd] border border-blue-200 shadow-xs mb-6 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#0c34cd]" />
          <span>Smartest techniques in the business • VA-SWaM Certified</span>
        </div>

        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0c34cd] mb-3">
          Who We Are
        </p>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Enabling Businesses to Thrive with <span className="text-[#0c34cd]">Advanced Technology</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          VIO is a Richmond, Virginia-based technology services firm with over a decade of experience. Founded and led by passionate technologists, we take pride in our deep client relationships and a commitment to seeing their visions come to life. Our leadership team is actively involved in the day-to-day operations, ensuring a hands-on approach and a thorough understanding of your unique business needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/viobts/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-[#0c34cd] hover:bg-[#092699] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Call</span>
          </a>
          <a
            href="#milestones"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>Explore 10+ Year Track Record</span>
            <ChevronRight className="w-4 h-4 text-[#0c34cd]" />
          </a>
        </div>
      </section>

      {/* Meet Our Clients Strip */}
      <section className="border-y border-slate-100 bg-slate-50/70 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6">
            Meet Our Clients & Trusted Partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-85">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">Commonwealth of VA</span>
              <span className="text-[10px] text-slate-500">ODGA State Agencies</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">USAID</span>
              <span className="text-[10px] text-slate-500">Federal EA & CDM Program</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">DriveWealth</span>
              <span className="text-[10px] text-slate-500">Brokerage-as-a-Service</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">Advance Auto Parts</span>
              <span className="text-[10px] text-slate-500">Omnichannel Cloud Data</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">Wells Fargo</span>
              <span className="text-[10px] text-slate-500">Process Automation</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs font-bold text-slate-800 text-xs text-center flex flex-col justify-center min-h-[64px]">
              <span className="text-[#0c34cd] font-black text-sm">Fortune 50 Pharma</span>
              <span className="text-[10px] text-slate-500">Machine Learning & Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our MOTTO & VA-SWaM Ethos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#071739] to-blue-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                Our Motto
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Think bigger, build Smarter, solve harder.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-2">
                As a Founder-led and Woman-owned Small Business (VA-SWaM), VIO embodies the ethos of empowerment and equality. With over a decade of industry presence, the company has honed its craft to offer unparalleled services to a diverse clientele, spanning private enterprises, not-for-profit organizations, and public entities.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-2xl font-black text-cyan-300">10+ Years</p>
                <p className="text-xs text-slate-300 font-semibold">Decade of Excellence</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-2xl font-black text-cyan-300">VA-SWaM</p>
                <p className="text-xs text-slate-300 font-semibold">Certified Woman-Owned</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-2xl font-black text-cyan-300">Richmond, VA</p>
                <p className="text-xs text-slate-300 font-semibold">Headquartered in Virginia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Execution Disciplines: Measure, Analyse, Improve */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-widest block mb-2">
            The VIO Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Our Empirical Triad
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We don’t rely on guesswork. Every system we build and optimize is executed through rigorous measurement and continuous optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Measure */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#0c34cd] hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0c34cd] flex items-center justify-center mb-6 group-hover:bg-[#0c34cd] group-hover:text-white transition-colors">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#071739] mb-3">Measure</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              At VIO, we measure to improve, using precise metrics to ensure top-quality performance across every layer of architecture, latency, and business logic.
            </p>
          </div>

          {/* Analyse */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#0c34cd] hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0c34cd] flex items-center justify-center mb-6 group-hover:bg-[#0c34cd] group-hover:text-white transition-colors">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#071739] mb-3">Analyse</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We conduct thorough analyses to extract critical insights, ensuring informed decisions, eliminated bottlenecks, and optimized operational results.
            </p>
          </div>

          {/* Improve */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#0c34cd] hover:shadow-lg transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0c34cd] flex items-center justify-center mb-6 group-hover:bg-[#0c34cd] group-hover:text-white transition-colors">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#071739] mb-3">Improve</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              At VIO, continuous evolution is our standard. We iterate with precision to elevate system throughput, scalability, and long-term organizational agility.
            </p>
          </div>
        </div>
      </section>

      {/* Message from Our CEO Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-xs font-bold text-[#0c34cd] uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5 text-[#0c34cd]" />
                <span>Message From Our CEO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#071739]">
                Malathi Vakkalanka
              </h2>
              <p className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider">
                Founder & Chief Executive Officer, VIO LLC
              </p>
              <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium italic border-l-4 border-[#0c34cd] pl-4 pt-1">
                &ldquo;As CEO, I remain committed to VIO’s mission of delivering cutting-edge data solutions, fostering a culture of inclusivity and excellence, and contributing to the vibrant tech ecosystem in our region. I am excited to continue shaping the future of data intelligence and inspiring a new generation of leaders in the industry.&rdquo;
              </blockquote>
              <p className="text-sm sm:text-base font-bold text-[#071739] pt-2">
                We look forward to shaping the future of your organization.
              </p>
              <div className="pt-2">
                <a
                  href="https://calendly.com/viobts/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c34cd] hover:bg-[#092699] text-white text-xs font-bold transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Call with Malathi</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-2 border-b border-slate-100">
                Executive Profile
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Founder-led hands-on delivery and senior architectural oversight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Host of the <em>Voices of AI Leadership</em> executive series.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Certified Virginia SWaM partner championing diverse tech leadership.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Connect directly:</span>
                <a
                  href="https://www.linkedin.com/in/malathi-vakkalanka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0c34cd] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Track Record Timeline (2018 - 2024) */}
      <section id="milestones" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-widest block mb-2">
            PROVEN IMPACT OVER TIME
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Milestones of Enterprise Delivery
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Select a year to inspect the exact architectural impact delivered for state agencies, federal programs, and commercial leaders.
          </p>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {milestones.map((m) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setActiveYear(m.year)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeYear === m.year
                  ? "bg-[#0c34cd] text-white shadow-md shadow-blue-600/30 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m.year}
            </button>
          ))}
        </div>

        {/* Active Milestone Card */}
        {milestones.filter((m) => m.year === activeYear).map((m) => (
          <div
            key={m.year}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md animate-fade-in space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#0c34cd] border border-blue-200">
                  {m.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#071739] mt-2">
                  {m.client}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-4xl font-black text-[#0c34cd]">{m.year}</span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900">{m.headline}</h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {m.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              {m.kpis.map((k, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-lg sm:text-xl font-black text-[#0c34cd]">{k.value}</p>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Case Studies Deep Dive Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-widest block mb-2">
            DETAILED CASE HISTORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            Transformation in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Real outcomes from enterprise data modernization, federal EA governance, and business automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, idx) => {
            const Icon = cs.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#0c34cd] border border-blue-200">
                      {cs.sector}
                    </span>
                    <Icon className="w-5 h-5 text-[#0c34cd]" />
                  </div>

                  <h3 className="text-lg font-black text-[#071739] leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs font-bold text-[#0c34cd]">
                    Client Partner: {cs.client}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {cs.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link href="/case-studies" className="font-bold text-[#0c34cd] hover:underline inline-flex items-center gap-1">
                    <span>View case portfolio</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Building an AI Company? Community Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-[#0c34cd] to-indigo-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-cyan-200 border border-white/20 inline-flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Voices of AI Leadership</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Building an AI company?
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-normal">
              We host thoughtful conversations with founders, chief architects, and enterprise leaders building real-world AI products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://form.jotform.com/260083358883465"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white text-[#0c34cd] font-black text-xs hover:bg-cyan-50 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Join the Conversation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/podcast"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
            >
              Listen to Episodes
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <CTABanner
        eyebrow="ACCELERATE YOUR ENTERPRISE WITH VIO"
        heading="Ready to Transform Your Business? Let's Discuss How Our Data-Driven Solutions Can Fuel Your Growth"
        subheading="Book a strategic discovery consultation with our founder and chief solutions architects."
        primaryCtaText="Book a Call"
        primaryCtaLink="https://calendly.com/viobts/consultation"
        secondaryCtaText="Explore Case Studies"
        secondaryCtaLink="/case-studies"
      />
    </div>
  );
}
