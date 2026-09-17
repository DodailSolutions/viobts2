"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: INITIAL_SERVICES[0].title,
    industryInterest: INITIAL_INDUSTRIES[0].title,
    budget: "$50k - $100k",
    timeline: "1-3 months",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase mb-3">
          START A CONVERSATION
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Let's Build <span className="text-gradient-cyan">What's Next</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Connect directly with VIO's architecture team for a complimentary technical consultation and scoping session.
        </p>
      </section>

      {/* Form & Contact Details Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                DIRECT CHANNELS
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Richmond, Virginia Headquarters</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We operate across the United States with dedicated delivery pods in Virginia and remote distributed squads nationwide.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Headquarters</p>
                    <p className="text-xs text-slate-500">Richmond, Virginia, United States</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Inquiries & RFPs</p>
                    <p className="text-xs text-slate-500">contact@viobts.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Phone</p>
                    <p className="text-xs text-slate-500">+1 (804) 555-0199</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VA-SWaM Certified Woman-Owned Enterprise</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                What to expect next:
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>Confidentiality & Non-Disclosure (NDA) ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>Initial architecture review within 24 business hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>Direct discussion with a Principal Architect</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm">
            {success ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Received</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to VIO. Our architecture team has received your submission and will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      serviceInterest: INITIAL_SERVICES[0].title,
                      industryInterest: INITIAL_INDUSTRIES[0].title,
                      budget: "$50k - $100k",
                      timeline: "1-3 months",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Schedule Consultation or Request Proposal
                </h3>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company / Agency Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Organization"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (804) 555-0100"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Service Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    >
                      {INITIAL_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Industry Sector
                    </label>
                    <select
                      value={formData.industryInterest}
                      onChange={(e) => setFormData({ ...formData, industryInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    >
                      {INITIAL_INDUSTRIES.map((ind) => (
                        <option key={ind.id} value={ind.title}>
                          {ind.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Anticipated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    >
                      <option value="Under $50k">Under $50,000</option>
                      <option value="$50k - $100k">$50,000 - $100,000</option>
                      <option value="$100k - $250k">$100,000 - $250,000</option>
                      <option value="$250k+">$250,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Target Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white"
                    >
                      <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                      <option value="1-3 months">1 - 3 months</option>
                      <option value="3-6 months">3 - 6 months</option>
                      <option value="Exploring options">Exploring options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current challenge, desired architectural outcome, or workforce needs..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
