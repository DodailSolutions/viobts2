"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  Building2,
  Calendar,
  DollarSign
} from "lucide-react";
import { cmsStore, LeadItem } from "@/lib/data";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>(cmsStore.getLeads());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const filtered = leads.filter((l) => {
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.serviceInterest && l.serviceInterest.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStatusChange = (id: string, status: LeadItem["status"]) => {
    cmsStore.updateLeadStatus(id, status);
    setLeads(cmsStore.getLeads());
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Service", "Budget", "Timeline", "Status", "Date", "Message"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.company || ""}"`,
      `"${l.serviceInterest || ""}"`,
      `"${l.budget || ""}"`,
      `"${l.timeline || ""}"`,
      l.status,
      l.createdAt,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vio-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    qualified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    proposal: "bg-purple-50 text-purple-700 border-purple-200",
    won: "bg-green-50 text-green-700 border-green-200",
    lost: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">
            Inbound Opportunities
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Leads & Consultations CRM
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review submissions from Book a Call & Contact forms, update deal pipelines, and export records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 text-brand-blue" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["all", "new", "contacted", "qualified", "proposal", "won", "lost"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filterStatus === st
                  ? "bg-brand-blue text-white font-bold shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name, email, company..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue shadow-sm"
          />
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Contact</th>
                <th className="p-4">Interest & Budget</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                    <p className="text-slate-500 text-xs">{lead.email}</p>
                    {lead.company && (
                      <p className="text-slate-400 text-[11px] mt-0.5">{lead.company}</p>
                    )}
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-brand-blue">
                      {lead.serviceInterest || "General Advisory"}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {lead.budget ? `Budget: ${lead.budget}` : ""}
                      {lead.timeline ? ` • ${lead.timeline}` : ""}
                    </p>
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border bg-white focus:outline-none ${
                        STATUS_COLORS[lead.status] || "text-slate-700 border-slate-200"
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-brand-blue border border-slate-200 transition-colors shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedLead.name}</h3>
                <p className="text-xs text-slate-500">{selectedLead.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  STATUS_COLORS[selectedLead.status]
                }`}
              >
                {selectedLead.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {selectedLead.company && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-blue" />
                  <span className="text-slate-700 font-semibold">{selectedLead.company}</span>
                </div>
              )}
              {selectedLead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  <span className="text-slate-700">{selectedLead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span className="text-slate-700">
                  Received on {new Date(selectedLead.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Submission Message:
              </p>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </p>
            </div>

            {selectedLead.notes && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                <strong>Internal Note:</strong> {selectedLead.notes}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <a
                href={`mailto:${selectedLead.email}`}
                className="px-4 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
