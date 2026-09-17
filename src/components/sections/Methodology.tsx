"use client";

import React from "react";
import { Gauge, LineChart, Zap, CheckCircle2, ArrowRight, Activity, RefreshCw } from "lucide-react";

interface Stage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables?: string[];
}

interface MethodologyProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  stages?: Stage[];
}

const STAGE_CONFIGS = [
  {
    icon: Gauge,
    color: "blue",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    deliverables: [
      "Empirical Architecture Baseline Audit",
      "Telemetry & Metric Instrumentation",
      "Friction & Latency Bottleneck Mapping"
    ]
  },
  {
    icon: LineChart,
    color: "cyan",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-600",
    deliverables: [
      "Root-Cause Structural Diagnosis",
      "Architectural Debt & Risk Scoring",
      "Measurable Target ROI Roadmapping"
    ]
  },
  {
    icon: Zap,
    color: "indigo",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    deliverables: [
      "Dedicated High-Velocity Sprints",
      "Zero-Downtime Microservices Migration",
      "Automated CI/CD & Telemetry Feedback"
    ]
  }
];

export function Methodology({
  eyebrow = "VIO CORE PHILOSOPHY",
  heading = "Measure → Analyse → Improve",
  subheading = "A proven, repeatable architectural cycle that transforms legacy complexity into quantifiable enterprise velocity and verified ROI.",
  stages = [
    {
      step: "01",
      title: "MEASURE",
      tagline: "Understand performance through meaningful telemetry.",
      description: "We audit your existing systems, telemetry, and delivery pipelines to establish empirical baselines and identify hidden friction points.",
    },
    {
      step: "02",
      title: "ANALYSE",
      tagline: "Turn unstructured telemetry into strategic foresight.",
      description: "Our senior architects dissect system bottlenecks, architectural debt, and operational data silos to formulate precise intervention plans.",
    },
    {
      step: "03",
      title: "IMPROVE",
      tagline: "Continuously optimize velocity and business outcomes.",
      description: "We deploy hardened microservices, automated pipelines, and intelligent workflows, iterating continuously to maximize enterprise velocity.",
    },
  ],
}: MethodologyProps) {
  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-200">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {subheading}
            </p>
          )}
        </div>

        {/* 3 Steps Connected Grid */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {stages.map((stage, idx) => {
              const config = STAGE_CONFIGS[idx % STAGE_CONFIGS.length];
              const Icon = config.icon;
              const deliverables = stage.deliverables || config.deliverables;

              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                        {stage.step}
                      </span>
                      <div className={`p-4 rounded-2xl ${config.bg} ${config.text} border ${config.border} shadow-xs group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Stage Title */}
                    <div className="mb-4">
                      <span className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                        PHASE {stage.step}
                      </span>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight mt-2">
                        {stage.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {stage.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                      {stage.description}
                    </p>

                    {/* Enterprise Deliverables */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">
                        Key Deliverables
                      </p>
                      <ul className="space-y-2">
                        {deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">Phase Output</span>
                    <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore Deliverables</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
