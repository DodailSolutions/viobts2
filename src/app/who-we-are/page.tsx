import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, HeartHandshake, Target, Compass, ArrowRight } from "lucide-react";
import { Methodology } from "@/components/sections/Methodology";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Who We Are | 10+ Years of Enterprise Excellence | VIO",
  description: "Founder-led, woman-owned VA-SWaM certified technology accelerator headquartered in Richmond, Virginia with a 10+ year track record.",
};

export default function WhoWeArePage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-brand-blue border border-blue-200/80 mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-brand-blue" />
          <span>VA-SWaM Certified • Richmond, Virginia • 10+ Years</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Architects of Measurable <span className="text-gradient-cyan">Business Velocity</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          VIO is a founder-led, woman-owned enterprise technology consulting partner. We bridge the chasm between ambitious business visions and high-throughput software execution.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
          >
            Start a Conversation
          </Link>
          <Link
            href="/case-studies"
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Explore Client Proof
          </Link>
        </div>
      </section>

      {/* Corporate Story & Track Record */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
                THE VIO STORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Over a decade of solving hard technical problems.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded in Richmond, Virginia, VIO was established with an unapologetic engineering ethos: eliminate the fluff, prioritize empirical system measurement, and deliver rock-solid architectures that empower businesses to scale.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                As a certified woman-owned Small, Women-owned, and Minority-owned (SWaM) enterprise, we take deep pride in serving both public sector institutions like Virginia State Agencies and USAID, as well as high-throughput commercial giants like DriveWealth and Advance Auto Parts.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-brand-blue">10+ Years</p>
                  <p className="text-xs text-slate-500">Continuous Track Record</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-brand-blue">100%</p>
                  <p className="text-xs text-slate-500">Woman-Owned VA-SWaM</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <p className="text-2xl font-black text-brand-blue">Richmond, VA</p>
                  <p className="text-xs text-slate-500">Headquarters</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Our Corporate Motto
              </h3>
              <blockquote className="text-xl font-bold text-brand-blue italic mb-6">
                "Think bigger, build Smarter, solve harder."
              </blockquote>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                This motto drives every sprint, every architecture review, and every production release we deliver for our clients.
              </p>
              <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm">
                <p className="text-xs font-bold text-slate-800 mb-1">Our Core Philosophy</p>
                <p className="text-xs text-brand-blue font-semibold">Measure → Analyse → Improve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-brand-blue w-fit mb-6 border border-blue-100">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To serve as the definitive technology accelerator for modern enterprises and public sector leaders by deploying elite engineering talent, resilient cloud native pipelines, and data intelligence that compound measurable business value.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-brand-blue w-fit mb-6 border border-blue-100">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To be the most trusted, agile technology partner recognized globally for transforming complex technological bottlenecks into elegant, high-impact competitive advantages without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Signature Methodology */}
      <Methodology />

      {/* Final CTA */}
      <CTABanner
        eyebrow="JOIN FORCES WITH VIO"
        heading="Experience the difference of a true technology partner."
        subheading="Let's discuss how our founder-led team can accelerate your mission."
        primaryCtaText="Book a Call"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
