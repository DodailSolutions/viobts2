"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Sparkles, Clock, Lock } from "lucide-react";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES } from "@/lib/data";

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: INITIAL_SERVICES[0]?.title || "Technology Workforce",
    industryInterest: INITIAL_INDUSTRIES[0]?.title || "Banking & Financial Services",
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-[#0066cc] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>DIRECT CHANNELS</span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#071739] tracking-tight">
            Richmond, Virginia Headquarters
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Headquartered in Richmond, VA, VIO operates nationwide with dedicated on-site delivery pods across the mid-Atlantic and remote distributed engineering squads.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#071739]">Corporate Headquarters</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Richmond, Virginia, United States</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#071739]">Direct Telephone</p>
                <a href="tel:+18048216588" className="text-xs text-[#0066cc] font-semibold hover:underline mt-0.5 block">
                  +1 804 821 6588
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#071739]">Corporate Inquiries & RFPs</p>
                <a href="mailto:info@viobts.com" className="text-xs text-[#0066cc] font-semibold hover:underline mt-0.5 block">
                  info@viobts.com
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0066cc]">
              <ShieldCheck className="w-4 h-4" />
              <span>VA-SWaM Certified Woman-Owned Enterprise</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 shadow-2xs">
          <h3 className="text-xs font-bold text-[#071739] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0066cc]" />
            <span>What to expect next:</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
              <span>Immediate Non-Disclosure Agreement (NDA) on request</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
              <span>Architecture scoping session within 24 business hours</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
              <span>Direct discussion with a Principal Enterprise Architect</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Inquiry Form */}
      <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {success ? (
          <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#071739]">Inquiry Successfully Received</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for contacting VIO. Our principal architecture squad has received your request and will reach out within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  serviceInterest: INITIAL_SERVICES[0]?.title || "Technology Workforce",
                  industryInterest: INITIAL_INDUSTRIES[0]?.title || "Banking & Financial Services",
                  budget: "$50k - $100k",
                  timeline: "1-3 months",
                  message: "",
                });
              }}
              className="px-6 py-2.5 rounded-xl bg-[#071739] text-xs font-semibold text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h3 className="text-2xl font-extrabold text-[#071739] tracking-tight mb-1">
                Schedule Consultation or Request RFP
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Complimentary 30-minute discovery session with principal technical leadership.
              </p>
            </div>

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
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                  placeholder="sarah@enterprise.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                  placeholder="Organization or State Agency"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (804) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                  Anticipated Budget Scope
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
                >
                  <option value="Under $50k">Under $50,000</option>
                  <option value="$50k - $100k">$50,000 - $100,000</option>
                  <option value="$100k - $250k">$100,000 - $250,000</option>
                  <option value="$250k+">$250,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Delivery Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
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
                Project Scope & Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Outline your architectural challenge, technical stack requirements, or team augmentation needs..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066cc] focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Consultation Request...</span>
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
  );
}
