"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, Award, CheckCircle2, ArrowRight, X } from "lucide-react";
import { INITIAL_CAREERS, CareerItem } from "@/lib/data";

export default function CareersPage() {
  const careers = INITIAL_CAREERS;
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
    }, 2500);
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          JOIN VIO ENGINEERING
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Build for the <span className="text-gradient-cyan">Next Decade</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          We are a culture of autonomous builders, cloud architects, and data engineers. Work on mission-critical platforms with freedom and high accountability.
        </p>
      </section>

      {/* Culture Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Think Bigger</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We tackle enterprise-scale challenges that touch millions of citizens and billions in transactions.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-brand-blue mb-2">Build Smarter</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Prioritizing automated pipelines, clean domain boundaries, and zero architectural bloat.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Solve Harder</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We persist until the root cause is resolved and continuous measurement proves victory.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">
          Open Positions
        </h2>

        <div className="space-y-6">
          {careers.map((job) => (
            <div
              key={job.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div>
                <span className="text-xs font-bold text-brand-blue tracking-wider uppercase mb-1 block">
                  {job.department}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    {job.employmentType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-brand-blue" />
                    {job.experienceLevel}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm shrink-0"
              >
                View Role & Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
              {selectedJob.department}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-4">{selectedJob.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">{selectedJob.description}</p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold">Application Received</p>
                <p className="text-xs text-slate-600 mt-1">Our talent squad will review your details shortly.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Key Requirements:
                </h3>
                <ul className="space-y-2 mb-6">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Benefits & Perks:
                </h3>
                <ul className="space-y-2 mb-8">
                  {selectedJob.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleApply} className="space-y-4 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">Apply for this position</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="LinkedIn or GitHub Profile URL"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                  <textarea
                    rows={3}
                    placeholder="Brief intro on why you'd be a great fit for VIO"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
