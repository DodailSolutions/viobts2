import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
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
  Zap
} from "lucide-react";
import { Methodology } from "@/components/sections/Methodology";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Who We Are | Founder-Led, VA-SWaM Certified Excellence",
  description: "Richmond, VA-headquartered woman-owned technology accelerator led by CEO Malathi Vakkalanka. 10+ years delivering elite engineering talent, cloud enablement, and data solutions.",
  alternates: {
    canonical: "/who-we-are",
  },
  openGraph: {
    title: "Who We Are | VIO Technology Accelerator",
    description: "Richmond, VA-headquartered woman-owned VA-SWaM certified technology consulting partner led by CEO Malathi Vakkalanka.",
    url: "https://viobts.com/who-we-are",
    type: "website",
    images: [
      {
        url: "/images/vio-logo.png",
        width: 1200,
        height: 630,
        alt: "VIO Who We Are",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Are | VIO Technology Accelerator",
    description: "Richmond, VA woman-owned VA-SWaM certified technology consulting partner. 10+ years track record.",
    images: ["/images/vio-logo.png"],
  },
};

export default function WhoWeArePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Who We Are | VIO",
    "description": "Richmond, VA-headquartered woman-owned VA-SWaM certified technology consulting partner led by CEO Malathi Vakkalanka.",
    "url": "https://viobts.com/who-we-are",
    "mainEntity": {
      "@type": "Organization",
      "name": "VIO",
      "founder": {
        "@type": "Person",
        "name": "Malathi Vakkalanka",
        "jobTitle": "Founder & CEO"
      },
      "slogan": "Think bigger, build Smarter, solve harder.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Richmond",
        "addressRegion": "VA",
        "addressCountry": "US"
      }
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-bold text-[#0066cc] border border-blue-200/80 mb-6 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
          <span>VA-SWaM Certified • Richmond, Virginia • 10+ Years</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#071739] tracking-tight leading-[1.12] mb-6">
          Architects of Measurable <span className="text-[#0066cc]">Business Velocity</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
          VIO is a founder-led, woman-owned enterprise technology consulting partner headquartered in Richmond, Virginia. We bridge the gap between ambitious business visions and high-throughput software execution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all shadow-md shadow-blue-500/20"
          >
            Start a Conversation
          </Link>
          <Link
            href="/case-studies"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs"
          >
            Explore Client Proof
          </Link>
        </div>
      </section>

      {/* Corporate Story & Leadership */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-[#0066cc] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>THE VIO STORY & LEADERSHIP</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071739] leading-tight">
                Over a decade of solving complex enterprise challenges.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Founded and headquartered in Richmond, Virginia, VIO was established with an unapologetic engineering ethos: eliminate bureaucratic friction, prioritize empirical system measurement, and deliver rock-solid architectures that empower businesses to scale.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Led by CEO <strong>Malathi Vakkalanka</strong>, our hands-on leadership team takes deep pride in operating as a certified woman-owned Small, Women-owned, and Minority-owned (VA-SWaM) enterprise. We proudly serve public sector agencies such as the Commonwealth of Virginia (ODGA) and USAID, as well as tier-1 commercial leaders including DriveWealth, Advance Auto Parts, and Wells Fargo.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-2xl font-black text-[#0066cc]">10+ Years</p>
                  <p className="text-xs text-slate-500 font-medium">Founder-Led Engineering</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-2xl font-black text-[#0066cc]">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Woman-Owned VA-SWaM</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-2xl font-black text-[#0066cc]">Richmond, VA</p>
                  <p className="text-xs text-slate-500 font-medium">Corporate Headquarters</p>
                </div>
              </div>
            </div>

            {/* Leadership Spotlight Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-slate-50 border border-blue-200/80 shadow-md">
              <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider block mb-2">
                Executive Leadership
              </span>
              <h3 className="text-2xl font-extrabold text-[#071739] mb-1">
                Malathi Vakkalanka
              </h3>
              <p className="text-xs font-semibold text-[#0066cc] mb-4">
                Founder & Chief Executive Officer
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                A hands-on technologist and business leader dedicated to data intelligence, AI innovation, and executive mentorship. Host of the <em>"Voices of AI Leadership"</em> series connecting builders and founders across the modern technology landscape.
              </p>
              
              <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs mb-4">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Corporate Motto</p>
                <blockquote className="text-sm font-bold text-[#0066cc] italic">
                  &ldquo;Think bigger, build Smarter, solve harder.&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                  Richmond, VA
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                  +1 804 821 6588
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Mission & Vision */}
      <section id="mission" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-[#0066cc] w-fit mb-6 border border-blue-100">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#071739] mb-4">Our Mission</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              To provide the smartest techniques in the business. We transform industries by delivering cutting-edge data solutions, providing expert IT talent, and utilizing results-driven strategies to help businesses unlock their full potential.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-[#0066cc] w-fit mb-6 border border-blue-100">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#071739] mb-4">Our Vision</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Shaping a better tomorrow through integrity, innovation, and sustainability. To be the trusted partner that brings client visions to life by solving complex technological bottlenecks and turning them into durable competitive advantages.
            </p>
          </div>
        </div>
      </section>

      {/* Official 4 Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0066cc] uppercase tracking-widest block mb-2">
            GUIDING PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071739] tracking-tight">
            Our Core Values
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            The operational pillars that define how we build software, treat our partners, and hold ourselves accountable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Value 1 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071739] mb-2">
              Client-Centric Approach
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Prioritizing your mission to deliver tailored architectures that drive lasting impact, quantifiable efficiency, and genuine long-term partnerships.
            </p>
          </div>

          {/* Value 2 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-5">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071739] mb-2">
              Integrity & Transparency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Uncompromising honesty, transparent sprint telemetry, and ethical execution across every deliverable, contract, and architecture recommendation.
            </p>
          </div>

          {/* Value 3 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071739] mb-2">
              Inclusivity & Excellence
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fostering a diverse, high-performing culture where top engineering talent collaborates to surpass standard industry benchmarks.
            </p>
          </div>

          {/* Value 4 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071739] mb-2">
              Empowerment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Empowering both internal engineering pods and client teams with the knowledge, autonomy, and state-of-the-art tools to lead in their domains.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Signature Methodology */}
      <Methodology />

      {/* Final CTA */}
      <CTABanner
        eyebrow="JOIN FORCES WITH VIO"
        heading="Experience the difference of a true technology accelerator."
        subheading="Let's discuss how our founder-led team and VA-SWaM certified delivery can accelerate your digital roadmap."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Capabilities"
        secondaryCtaLink="/services"
      />
    </div>
  );
}
