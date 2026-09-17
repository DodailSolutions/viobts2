"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, Award, CheckCircle2, ArrowRight, X, ShieldCheck, Sparkles, Send } from "lucide-react";
import { CareerItem } from "@/lib/data";

interface CareersClientProps {
  careers: CareerItem[];
}

export function CareersClient({ careers }: CareersClientProps) {
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedJob(null);
      }, 3000);
    }, 600);
  };

  return (
    <div>
      {/* Open Positions List */}
      <div className="space-y-6">
        {careers.map((job) => (
          <div
            key={job.id}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider block">
                {job.department} • VIO Practice Pod
              </span>
              <h3 className="text-2xl font-extrabold text-[#071739] tracking-tight">
                {job.title}
              </h3>
              <p className="text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
                  {job.employmentType}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-[#0066cc]" />
                  {job.experienceLevel}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="px-7 py-3.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2"
            >
              <span>View Role & Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Role Details & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-[#071739] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-widest block mb-1">
              {selectedJob.department}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071739] tracking-tight mb-2">
              {selectedJob.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-6">
              {selectedJob.location} • {selectedJob.employmentType} • {selectedJob.experienceLevel}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              {selectedJob.description}
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold">Application Successfully Submitted</h4>
                <p className="text-xs text-slate-600">
                  Thank you for applying to VIO. Our engineering leadership team will review your application and respond within 3 business days.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-3">
                    Key Role Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-3">
                    Responsibilities & Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-3">
                    Benefits & Perks
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedJob.benefits.map((ben, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <Sparkles className="w-3.5 h-3.5 text-[#0066cc] shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Candidate Direct Application Form */}
                <form onSubmit={handleApply} className="space-y-4 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-[#071739]">Direct Application Form</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Corporate or Personal Email *"
                      required
                      className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn Profile or Portfolio URL *"
                      required
                      className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your experience and why you're interested in joining VIO *"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application for {selectedJob.title}</span>
                      </>
                    )}
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
