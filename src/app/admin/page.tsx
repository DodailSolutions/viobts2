"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  TrendingUp,
  Users2,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  KeyRound,
  ExternalLink,
  Shield,
  PanelBottom,
  Activity,
  AlertTriangle,
  Lock,
  Search,
  Settings,
  Phone,
  Mail,
  Check,
  RefreshCw
} from "lucide-react";
import {
  cmsStore,
  LeadItem,
  AdminUserItem,
  RoleDefinitionItem,
  SecurityAuditLogItem,
  AppSecuritySettings
} from "@/lib/data";

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [pages, setPages] = useState(() => cmsStore.getPages());
  const [services, setServices] = useState(() => cmsStore.getServices());
  const [industries, setIndustries] = useState(() => cmsStore.getIndustries());
  const [caseStudies, setCaseStudies] = useState(() => cmsStore.getCaseStudies());
  const [blogs, setBlogs] = useState(() => cmsStore.getBlogs());
  const [leads, setLeads] = useState<LeadItem[]>(() => cmsStore.getLeads());
  const [users, setUsers] = useState<AdminUserItem[]>(() => cmsStore.getUsers());
  const [roles, setRoles] = useState<RoleDefinitionItem[]>(() => cmsStore.getRoles());
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLogItem[]>(() => cmsStore.getAuditLogs());
  const [securitySettings, setSecuritySettings] = useState<AppSecuritySettings>(() => cmsStore.getSecuritySettings());

  const [leadFilter, setLeadFilter] = useState<"all" | "new" | "contacted" | "qualified" | "closed">("all");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setPages(cmsStore.getPages());
    setServices(cmsStore.getServices());
    setIndustries(cmsStore.getIndustries());
    setCaseStudies(cmsStore.getCaseStudies());
    setBlogs(cmsStore.getBlogs());
    setLeads(cmsStore.getLeads());
    setUsers(cmsStore.getUsers());
    setRoles(cmsStore.getRoles());
    setAuditLogs(cmsStore.getAuditLogs());
    setSecuritySettings(cmsStore.getSecuritySettings());
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadItem["status"]) => {
    cmsStore.updateLeadStatus(leadId, newStatus);
    setLeads(cmsStore.getLeads());
    showNotification(`Lead status updated to "${newStatus}".`);
  };

  const filteredLeads = useMemo(() => {
    if (leadFilter === "all") return leads;
    return leads.filter((l) => l.status === leadFilter);
  }, [leads, leadFilter]);

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse py-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded-full" />
            <div className="h-9 w-96 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-10 w-36 bg-slate-200 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071739] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-slide-up text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#0c34cd] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span>ENTERPRISE CMS &amp; SECURITY SHIELD</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            VIO Executive Mission Control
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Real-time management for digital architecture, client proofs, inbound CRM leads, team RBAC, and SOC2/NIST application security.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0c34cd] hover:border-[#0c34cd] font-bold text-xs transition-all shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#0c34cd]" />
            <span>App Security</span>
          </Link>

          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0c34cd] hover:border-[#0c34cd] font-bold text-xs transition-all shadow-xs"
          >
            <Users2 className="w-4 h-4 text-[#0c34cd]" />
            <span>User Roles</span>
          </Link>

          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Page Builder</span>
          </Link>
        </div>
      </div>

      {/* Operational Health Strip */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white">Production Engine: 100% Operational</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5 text-cyan-300">
            <ShieldCheck className="w-4 h-4" />
            <span>SOC2 / NIST Hardened</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/80">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>24ms SSR Latency (99.999% Uptime)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {securitySettings.maintenanceMode ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Public Maintenance Active</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-cyan-200 border border-white/20 font-black text-[10px] uppercase tracking-wider">
              Public Live Access
            </span>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-white transition-colors"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pages</span>
            <FileCode className="w-4 h-4 text-[#0c34cd]" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{pages.length}</p>
            <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% Active SSR</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Core Pillars</span>
            <Layers className="w-4 h-4 text-[#0c34cd]" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{services.length}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">The 6 Pillars</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Case Proofs</span>
            <Building2 className="w-4 h-4 text-[#0c34cd]" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{caseStudies.length}</p>
            <p className="text-[10px] text-[#0c34cd] mt-1 font-semibold">ODGA, USAID, Wells Fargo</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inbound Leads</span>
            <MessageSquare className="w-4 h-4 text-[#0c34cd]" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#0c34cd]">{leads.length}</p>
            <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>{leads.filter((l) => l.status === "new").length} New Leads</span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Team Roles</span>
            <Users2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{users.length}</p>
            <p className="text-[10px] text-indigo-600 mt-1 font-semibold">{roles.length} Active Tiers</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">98%</p>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold">
              {securitySettings.twoFactorEnforced ? "2FA Enforced" : "Standard"}
            </p>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: Left = Interactive Inbound CRM / Right = Security & Performance Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Inbound Leads Stream (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0c34cd]" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Inbound Enterprise Leads CRM
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                Direct client inquiries submitted through public touchpoints.
              </p>
            </div>

            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#0c34cd] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Full CRM Stream</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2">
            {(["all", "new", "contacted", "qualified", "closed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setLeadFilter(status)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all capitalize ${
                  leadFilter === status
                    ? "bg-[#0c34cd] text-white shadow-2xs font-black"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status} ({status === "all" ? leads.length : leads.filter((l) => l.status === status).length})
              </button>
            ))}
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Lead / Company</th>
                  <th className="py-2.5 px-3">Interest</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{lead.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {lead.company ? `${lead.company} • ` : ""}{lead.email}
                      </p>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0c34cd] border border-blue-100 truncate max-w-[140px] block">
                        {lead.serviceInterest || "General"}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        lead.status === "new"
                          ? "bg-emerald-100 text-emerald-800"
                          : lead.status === "contacted"
                          ? "bg-blue-100 text-[#0c34cd]"
                          : lead.status === "qualified"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Application Security & Threat Monitor (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security Live Stream Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0c34cd]" />
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Security Event Stream &amp; Audit Trail
                </h3>
              </div>

              <Link
                href="/admin/settings"
                className="text-[11px] font-bold text-[#0c34cd] hover:underline"
              >
                Security Center
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">
                      {log.action}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      log.severity === "critical"
                        ? "bg-rose-100 text-rose-700"
                        : log.severity === "warning"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-[#0c34cd]"
                    }`}>
                      {log.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono truncate">{log.target}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-200/50">
                    <span>{log.actorName} ({log.ipAddress})</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Launchpad */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-2 border-b border-slate-100">
              Quick CMS Launchpad
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 hover:bg-blue-50 border border-blue-200 text-slate-900 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0c34cd]" />
                  <span className="text-xs font-bold text-[#0c34cd]">App Security &amp; Settings</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#0c34cd] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin/footer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <PanelBottom className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold">Footer Studio (All Devices)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c34cd] transition-colors" />
              </Link>

              <Link
                href="/admin/seo"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold">SEO &amp; Content Optimizer</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c34cd] transition-colors" />
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Users2 className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-semibold">User Roles &amp; Team Access</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c34cd] transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Role Distribution & Governance Preview Bar */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">User Role System &amp; Governance</h3>
            <p className="text-xs text-slate-500 font-normal">Active administrative accounts across the 5 RBAC tiers.</p>
          </div>

          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#0c34cd] font-bold text-xs hover:bg-[#0c34cd] hover:text-white transition-colors"
          >
            <span>Manage All Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {roles.map((r) => {
            const count = users.filter((u) => u.role === r.id).length;
            return (
              <div key={r.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  {r.name.split(" ")[0]}
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{count}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Members</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
