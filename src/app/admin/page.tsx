"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCode,
  Layers,
  Building2,
  MessageSquare,
  ArrowRight,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import { cmsStore, LeadItem } from "@/lib/data";

export default function AdminDashboardPage() {
  const pages = cmsStore.getPages();
  const services = cmsStore.getServices();
  const industries = cmsStore.getIndustries();
  const caseStudies = cmsStore.getCaseStudies();
  const blogs = cmsStore.getBlogs();
  const leads = cmsStore.getLeads();

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Headless Visual CMS Engine
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            VIO Executive Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Visual Page Builder</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Published Pages</span>
            <FileCode className="w-5 h-5 text-brand-blue" />
          </div>
          <p className="text-3xl font-black text-slate-900">{pages.length}</p>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Active SSR</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Core Services</span>
            <Layers className="w-5 h-5 text-brand-blue" />
          </div>
          <p className="text-3xl font-black text-slate-900">{services.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">
            The 6 Pillars & expandable
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Case Proofs</span>
            <Building2 className="w-5 h-5 text-brand-blue" />
          </div>
          <p className="text-3xl font-black text-slate-900">{caseStudies.length}</p>
          <p className="text-[11px] text-brand-blue mt-1">
            ODGA, USAID, DriveWealth+
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Inbound Leads</span>
            <MessageSquare className="w-5 h-5 text-brand-blue" />
          </div>
          <p className="text-3xl font-black text-brand-blue">{leads.length}</p>
          <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Live CRM Capture Active</span>
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Leads Stream & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inbound Leads */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Inbound Submissions</h2>
              <p className="text-xs text-slate-500">Direct inquiries from Book a Call & Contact forms</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Full CRM Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold bg-blue-50 text-brand-blue border border-blue-100">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {lead.company ? `${lead.company} • ` : ""}{lead.email}
                  </p>
                  <p className="text-xs text-brand-blue mt-1">
                    Interest: {lead.serviceInterest || "General Advisory"}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-[11px] text-slate-500 mb-2">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href="/admin/leads"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
                  >
                    Manage Lead
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick CMS Launchpad
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/pages/pg-home"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <span className="text-xs font-semibold">Edit Homepage Sections</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue transition-colors" />
              </Link>

              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <span className="text-xs font-semibold">Manage 6 Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue transition-colors" />
              </Link>

              <Link
                href="/admin/case-studies"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <span className="text-xs font-semibold">Manage Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue transition-colors" />
              </Link>

              <Link
                href="/admin/blogs"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <span className="text-xs font-semibold">Write New Article</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue transition-colors" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200/80 shadow-sm">
            <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
              Zero Code Limitations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every page and section is dynamic. You can add unlimited custom blocks, reorder them live, modify copy and imagery, and publish instantaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
