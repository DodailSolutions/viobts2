import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Target, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  TrendingUp, 
  Scale, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  ExternalLink,
  Zap,
  Globe2,
  Cpu
} from "lucide-react";
import { CompanySubNav } from "@/components/shared/CompanySubNav";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Our Mission | Provide the Smartest Techniques in the Business | VIO",
  description: "At VIO, we don’t just provide IT staffing and consulting—we transform industries with the right talent, cutting-edge insights, and results-driven strategies.",
  alternates: {
    canonical: "/our-mission",
  },
  openGraph: {
    title: "Our Mission | VIO Business & Technology Solutions",
    description: "Provide the smartest techniques in the business through specialized data intelligence, agile innovation, and people-first culture.",
    url: "https://www.viobts.com/our-mission",
    type: "website",
  },
};

export default function OurMissionPage() {
  const missionPillars = [
    {
      icon: Users,
      badge: "TALENT & CONSULTING",
      title: "Transforming Industries with Elite Talent",
      description: "We don’t just provide IT staffing and consulting—we transform industries with the right talent, cutting-edge insights, and results-driven strategies. As a trusted partner, we help businesses unlock their full potential through specialized data intelligence and innovative solutions."
    },
    {
      icon: HeartHandshake,
      badge: "CLIENT-FIRST APPROACH",
      title: "Put Clients First, Think Ahead, Deliver Real Impact",
      description: "Our approach is simple: put clients first, think ahead, and deliver real impact. We tailor every strategy for maximum value, forging long-term partnerships built on integrity, transparency, and excellence."
    },
    {
      icon: Zap,
      badge: "AGILITY & INNOVATION",
      title: "Embracing Innovation & Rapid Technological Shifts",
      description: "In a fast-changing world, we embrace innovation and agility. By leveraging the latest technology and continuously expanding our expertise, we stay ahead of industry shifts—so our clients do too."
    },
    {
      icon: Scale,
      badge: "DIVERSITY & INCLUSION",
      title: "People-Powered: Diversity & Empowerment",
      description: "Success isn’t just about business—it’s about people. Diversity and inclusion power everything we do. We create a workplace where every individual is respected, empowered, and driven to make a difference."
    },
    {
      icon: Globe2,
      badge: "FORWARD MOMENTUM",
      title: "Shaping the Future, Together",
      description: "At VIO, we’re not just building solutions—we’re shaping the future. By merging visionary data intelligence with ethical execution, we build durable architectures that help organizations lead."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Sub-Navigation Bar */}
      <CompanySubNav currentTab="mission" />

      {/* Hero Section */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-black text-[#0c34cd] border border-blue-200 shadow-xs mb-6 uppercase tracking-wider">
          <Target className="w-4 h-4 text-[#0c34cd]" />
          <span>Our Mission • Purpose & Principles</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Provide the <span className="text-[#0c34cd]">Smartest Techniques</span> in the Business
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          At VIO, we don’t just provide IT staffing and consulting—we transform industries with the right talent, cutting-edge insights, and results-driven strategies. As a trusted partner, we help businesses unlock their full potential through specialized data intelligence and innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/viobts/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-[#0c34cd] hover:bg-[#092699] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Discovery Call</span>
          </a>
          <Link
            href="/who-we-are"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>Learn Who We Are</span>
            <ArrowRight className="w-4 h-4 text-[#0c34cd]" />
          </Link>
        </div>
      </section>

      {/* Manifesto Callout Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-[#071739] to-slate-900 text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
              The VIO Mission Statement
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              &ldquo;We’re not just building solutions—we’re shaping the future. Let’s move forward, together.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-2">
              Our approach is simple: put clients first, think ahead, and deliver real impact. We tailor every strategy for maximum value, forging long-term partnerships built on integrity, transparency, and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Mission Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-widest block mb-2">
            CORE TENETS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            How We Execute Our Mission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Five foundational principles that guide every client engagement, architecture blueprint, and team deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#0c34cd] hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0c34cd] flex items-center justify-center group-hover:bg-[#0c34cd] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#071739] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0c34cd]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>VIO Standard Practice</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission in Action: Measurable Impact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider block mb-1">
              PROVEN METRICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071739]">
              Our Mission Quantified
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Measurable value generated across Virginia state agencies, federal programs, and commercial market leaders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-3xl sm:text-4xl font-black text-[#0c34cd]">+25%</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Data Accessibility</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Delivered for DriveWealth</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-3xl sm:text-4xl font-black text-[#0c34cd]">90%</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">EA Alignment</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Implemented for USAID</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-3xl sm:text-4xl font-black text-[#0c34cd]">+9%</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Catalog Sales Bump</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Advance Auto Parts Cloud</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <p className="text-3xl sm:text-4xl font-black text-[#0c34cd]">10+ Yrs</p>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">Track Record</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Virginia SWaM Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTABanner */}
      <CTABanner
        eyebrow="ALIGN YOUR ENTERPRISE WITH OUR MISSION"
        heading="Let's Transform Your Industry Together."
        subheading="Schedule a consultation with our principal architects and discover how VIO can fuel your growth."
        primaryCtaText="Book a Consultation"
        primaryCtaLink="https://calendly.com/viobts/consultation"
        secondaryCtaText="Explore Our Vision"
        secondaryCtaLink="/vision"
      />
    </div>
  );
}
