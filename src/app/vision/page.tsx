import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Leaf, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Zap,
  Target,
  Users,
  Cpu,
  Workflow,
  Network
} from "lucide-react";
import { CompanySubNav } from "@/components/shared/CompanySubNav";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Our Vision | Make a Future Where Innovation Drives Progress | VIO",
  description: "At VIO, we envision a future where innovation drives progress, transforms industries, and creates boundless opportunities for businesses and individuals alike.",
  alternates: {
    canonical: "/vision",
  },
  openGraph: {
    title: "Our Vision | VIO Business & Technology Solutions",
    description: "Make a future where innovation drives progress. Building an ecosystem where businesses are free from limitations to explore their true potential.",
    url: "https://www.viobts.com/vision",
    type: "website",
  },
};

export default function VisionPage() {
  const visionPillars = [
    {
      icon: TrendingUp,
      badge: "BOUNDLESS OPPORTUNITY",
      title: "Driving Future Progress",
      description: "At VIO, we envision a future where innovation drives progress, transforms industries, and creates boundless opportunities for businesses and individuals alike. Our goal is to empower organizations with tools and strategies that ensure they remain competitive in an ever-changing landscape."
    },
    {
      icon: Zap,
      badge: "ACCELERATION",
      title: "Catalyzing Transformation",
      description: "At the core of our vision is the belief that innovation is the foundation for growth. We aspire to act as a catalyst that accelerates industries by driving efficiency, scalability, and digital resilience across private and public sectors."
    },
    {
      icon: Globe2,
      badge: "GLOBAL CONNECTIVITY",
      title: "Meaningful Impact & Sustainability",
      description: "Beyond technology, we aim to inspire positive change by fostering a culture of collaboration, creativity, and excellence, working toward a smarter, more sustainable, and interconnected world."
    },
    {
      icon: Network,
      badge: "UNBOUNDED POTENTIAL",
      title: "Building an Unbounded Ecosystem",
      description: "Our dream is to build an ecosystem where businesses are no longer bound by limitations but are free to explore their true potential. We engineer the underlying digital scaffolding that liberates teams to create and scale without technical debt."
    },
    {
      icon: ShieldCheck,
      badge: "VALUES-LED",
      title: "Grounded in Integrity & Innovation",
      description: "This vision guides everything we do at VIO, from the services we provide to the partnerships we nurture. By staying true to our values of integrity, innovation, and sustainability, we are not just envisioning a better tomorrow — we are actively shaping it."
    }
  ];

  const futureHorizons = [
    {
      title: "Agentic AI & Next-Gen Automation",
      description: "Deploying self-healing architectures and specialized multi-agent systems that autonomously streamline enterprise operations.",
      icon: Cpu
    },
    {
      title: "Democratic Data Intelligence",
      description: "Making real-time analytics and predictive lakehouse modeling intuitive and accessible across non-technical stakeholders.",
      icon: Layers
    },
    {
      title: "Sustainable & Resilient Infrastructure",
      description: "Designing cloud architectures that minimize carbon footprint, optimize compute lifecycle costs, and ensure zero-downtime resilience.",
      icon: Leaf
    },
    {
      title: "Inclusive Leadership & Mentorship Pipelines",
      description: "Expanding Virginia's tech ecosystem by nurturing diverse engineering talent and supporting female founders in technology.",
      icon: Users
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Sub-Navigation Bar */}
      <CompanySubNav currentTab="vision" />

      {/* Hero Section */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-black text-[#0c34cd] border border-blue-200 shadow-xs mb-6 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#0c34cd]" />
          <span>Our Vision • Shaping Tomorrow</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Make a Future Where <span className="text-[#0c34cd]">Innovation Drives Progress</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          At VIO, we envision a future where innovation drives progress, transforms industries, and creates boundless opportunities for businesses and individuals alike. We aim to bridge the gap between challenges and solutions by fostering a culture of collaboration, creativity, and excellence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/viobts/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-[#0c34cd] hover:bg-[#092699] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Vision Consultation</span>
          </a>
          <Link
            href="/our-mission"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>Read Our Mission</span>
            <ArrowRight className="w-4 h-4 text-[#0c34cd]" />
          </Link>
        </div>
      </section>

      {/* Vision Statement Hero Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0c34cd] to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-cyan-200 border border-white/20">
              The Vision Horizon
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              &ldquo;Our dream is to build an ecosystem where businesses are no longer bound by limitations but are free to explore their true potential.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-normal pt-2">
              By staying true to our values of integrity, innovation, and sustainability, we are not just envisioning a better tomorrow — we are actively shaping it.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Pillars of Our Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-widest block mb-2">
            STRATEGIC CORNERSTONES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071739] tracking-tight">
            How We Shape the Future
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            The guiding cornerstones that inspire our engineering teams, executive advisory, and client partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionPillars.map((p, idx) => {
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
                  <span>Forward Trajectory</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Future Horizons: Roadmap to 2030 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0c34cd] uppercase tracking-wider block mb-1">
              INNOVATION ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071739]">
              Future Horizons for Enterprise Tech
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Where VIO is pioneering next-generation technology capabilities for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureHorizons.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0c34cd] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#071739] mb-1">{h.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{h.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <CTABanner
        eyebrow="BUILD THE FUTURE WITH VIO"
        heading="Ready to Turn Your Vision into Reality?"
        subheading="Let's connect and discuss how our forward-thinking architectures can accelerate your competitive edge."
        primaryCtaText="Book a Consultation"
        primaryCtaLink="https://calendly.com/viobts/consultation"
        secondaryCtaText="Explore Who We Are"
        secondaryCtaLink="/who-we-are"
      />
    </div>
  );
}
