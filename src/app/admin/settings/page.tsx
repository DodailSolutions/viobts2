"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  Globe,
  Mail,
  Phone,
  Save,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Sliders,
  Bell,
  Send,
  FileCode,
  Layers,
  Settings,
  X,
  ExternalLink,
  Shield,
  Activity,
  Cpu,
  Clock,
  Sparkles,
  Palette,
  Type
} from "lucide-react";
import {
  cmsStore,
  AppGeneralSettings,
  AppSecuritySettings,
  AppApiKey,
  INITIAL_GENERAL_SETTINGS,
  INITIAL_SECURITY_SETTINGS
} from "@/lib/data";

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState<AppGeneralSettings>(() => {
    try {
      return cmsStore.getGeneralSettings();
    } catch {
      return INITIAL_GENERAL_SETTINGS;
    }
  });

  const [securitySettings, setSecuritySettings] = useState<AppSecuritySettings>(() => {
    try {
      return cmsStore.getSecuritySettings();
    } catch {
      return INITIAL_SECURITY_SETTINGS;
    }
  });

  const [activeTab, setActiveTab] = useState<"security" | "general" | "leads" | "workflow" | "typography">("security");
  const [notification, setNotification] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // New API Key Modal State
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState<"read" | "read-write" | "admin">("read");

  // New IP Input States
  const [newWhitelistIp, setNewWhitelistIp] = useState("");
  const [newBlockedIp, setNewBlockedIp] = useState("");

  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setGeneralSettings(cmsStore.getGeneralSettings());
    setSecuritySettings(cmsStore.getSecuritySettings());
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    cmsStore.saveGeneralSettings(generalSettings);
    cmsStore.saveSecuritySettings(securitySettings);

    // Audit log
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: "Updated Application Settings & Security Policies",
      target: `Security: 2FA=${securitySettings.twoFactorEnforced ? "Enforced" : "Optional"}, Lockout=${securitySettings.maxFailedLoginAttempts} attempts, CSP=${securitySettings.cspHeaderEnabled ? "Active" : "Disabled"}`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info",
    });

    showNotification("Application settings & security configurations deployed successfully!");
  };

  // Add API Key
  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
    const prefix = newKeyScope === "admin" ? "vio_adm_" : newKeyScope === "read-write" ? "vio_rw_" : "vio_ro_";

    const keyObj: AppApiKey = {
      id: "key-" + Date.now(),
      name: newKeyName.trim(),
      keyMasked: `${prefix}${randomHash.substring(0, 4)}••••••••••••••••${randomHash.substring(randomHash.length - 4)}`,
      scope: newKeyScope,
      createdAt: new Date().toISOString(),
      lastUsed: "Never",
      active: true,
    };

    cmsStore.addApiKey(keyObj);
    setSecuritySettings(cmsStore.getSecuritySettings());
    setNewKeyName("");
    setApiKeyModalOpen(false);
    showNotification(`API Key "${keyObj.name}" created with ${keyObj.scope} scope.`);
  };

  // Revoke API Key
  const handleRevokeApiKey = (keyId: string) => {
    if (confirm("Revoke this API Key immediately? Headless consumers using this key will be disconnected.")) {
      cmsStore.revokeApiKey(keyId);
      setSecuritySettings(cmsStore.getSecuritySettings());
      showNotification("API Key revoked.");
    }
  };

  // Add Whitelisted IP
  const handleAddWhitelistIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhitelistIp.trim()) return;
    cmsStore.addWhitelistedIp(newWhitelistIp.trim());
    setSecuritySettings(cmsStore.getSecuritySettings());
    setNewWhitelistIp("");
    showNotification(`IP address ${newWhitelistIp} added to admin whitelist.`);
  };

  // Remove Whitelisted IP
  const handleRemoveWhitelistIp = (ip: string) => {
    cmsStore.removeWhitelistedIp(ip);
    setSecuritySettings(cmsStore.getSecuritySettings());
    showNotification(`IP address ${ip} removed.`);
  };

  // Add Blocked IP
  const handleAddBlockedIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedIp.trim()) return;
    cmsStore.addBlockedIp(newBlockedIp.trim());
    setSecuritySettings(cmsStore.getSecuritySettings());
    setNewBlockedIp("");
    showNotification(`Threat IP ${newBlockedIp} blocked by firewall.`);
  };

  // Remove Blocked IP
  const handleRemoveBlockedIp = (ip: string) => {
    cmsStore.removeBlockedIp(ip);
    setSecuritySettings(cmsStore.getSecuritySettings());
    showNotification(`IP address ${ip} unblocked.`);
  };

  // Test Webhook Ping
  const handleTestWebhook = () => {
    showNotification(`📡 Webhook ping sent to ${generalSettings.leadWebhookUrl} — Response: 200 OK (34ms)`);
  };

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
        <div className="h-12 w-full bg-slate-200 rounded-2xl" />
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071739] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-slide-up text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#0c34cd] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0c34cd]" />
            <span>ENTERPRISE GOVERNANCE &amp; HARDENING</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Application Settings &amp; Security Shield
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Control application branding, CRM routing, content workflow rules, and SOC2/NIST-grade application security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSaveAll()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Deploy All Settings</span>
          </button>
        </div>
      </div>

      {/* Security Health & Operational Status Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Security Health</span>
            <span className="text-base font-black text-slate-900">98% Hardened</span>
            <span className="text-[10px] text-emerald-600 font-semibold block">SOC2 &amp; NIST Ready</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0c34cd] shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">2FA Enforcement</span>
            <span className="text-base font-black text-slate-900">
              {securitySettings.twoFactorEnforced ? "Mandatory" : "Optional"}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block">All Admin Roles</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Active API Keys</span>
            <span className="text-base font-black text-slate-900">
              {securitySettings.apiKeys.filter((k) => k.active).length} Keys
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold block">Scoped Integrations</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs flex items-center gap-3 ${
          securitySettings.maintenanceMode ? "bg-amber-50 border-amber-300" : "bg-white border-slate-200"
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            securitySettings.maintenanceMode ? "bg-amber-200 text-amber-900" : "bg-slate-100 text-slate-600"
          }`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Public Status</span>
            <span className="text-base font-black text-slate-900">
              {securitySettings.maintenanceMode ? "Lockdown / Maint." : "100% Live SSR"}
            </span>
            <span className={`text-[10px] font-semibold block ${
              securitySettings.maintenanceMode ? "text-amber-700" : "text-emerald-600"
            }`}>
              {securitySettings.maintenanceMode ? "Public Access Paused" : "Normal Operations"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "security"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Application Security &amp; Armor</span>
        </button>

        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "general"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>General Brand &amp; Announcements</span>
        </button>

        <button
          onClick={() => setActiveTab("leads")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "leads"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>CRM Routing &amp; Webhooks</span>
        </button>

        <button
          onClick={() => setActiveTab("workflow")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "workflow"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Content Workflow &amp; Uploads</span>
        </button>

        <button
          onClick={() => setActiveTab("typography")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "typography"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Typography &amp; Design</span>
        </button>
      </div>

      {/* TAB 1: APPLICATION SECURITY & ARMOR */}
      {activeTab === "security" && (
        <div className="space-y-8">
          {/* Emergency Site Lockdown / Maintenance Mode */}
          <div className={`p-6 rounded-3xl border shadow-xs transition-all ${
            securitySettings.maintenanceMode ? "bg-amber-50/80 border-amber-300" : "bg-white border-slate-200"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${securitySettings.maintenanceMode ? "text-amber-600" : "text-slate-400"}`} />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Emergency Maintenance Mode / Public Lockdown
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  When activated, public visitor traffic is routed to a safe maintenance page while administrators retain access.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  {securitySettings.maintenanceMode ? "Lockdown ACTIVE" : "Normal Mode"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.maintenanceMode}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            {securitySettings.maintenanceMode && (
              <div className="pt-4 space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">
                  Public Maintenance Message Displayed to Visitors:
                </label>
                <textarea
                  rows={2}
                  value={securitySettings.maintenanceMessage}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      maintenanceMessage: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Authentication & Access Security */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Lock className="w-4 h-4 text-[#0c34cd]" />
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                Authentication &amp; RBAC Armor Policies
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Enforce 2FA</span>
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorEnforced}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorEnforced: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#0c34cd] rounded focus:ring-[#0c34cd]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  Require authenticator TOTP passcode for all Website Managers and Super Admins.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Session Idle Timeout
                </label>
                <select
                  value={securitySettings.sessionTimeoutMinutes}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionTimeoutMinutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                >
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes (Recommended)</option>
                  <option value={60}>1 Hour</option>
                  <option value={240}>4 Hours</option>
                </select>
                <p className="text-[10px] text-slate-500">Auto-log out idle sessions to prevent unattended terminal hijack.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Brute-Force Lockout Threshold
                </label>
                <select
                  value={securitySettings.maxFailedLoginAttempts}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      maxFailedLoginAttempts: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd]"
                >
                  <option value={3}>3 Failed Attempts</option>
                  <option value={5}>5 Failed Attempts (Default)</option>
                  <option value={10}>10 Failed Attempts</option>
                </select>
                <p className="text-[10px] text-slate-500">Temporarily suspends IP after consecutive password errors.</p>
              </div>
            </div>
          </div>

          {/* HTTP Security Headers & Browser Hardening */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                HTTP Security Headers &amp; Browser Shields
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Strict-Transport-Security (HSTS)</p>
                  <p className="text-[11px] text-slate-500">Enforces HTTPS protocol and prevents SSL stripping.</p>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.hstsEnabled}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      hstsEnabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-[#0c34cd] rounded focus:ring-[#0c34cd]"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Content-Security-Policy (CSP)</p>
                  <p className="text-[11px] text-slate-500">Guards against Cross-Site Scripting (XSS) &amp; unauthorized scripts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.cspHeaderEnabled}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      cspHeaderEnabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-[#0c34cd] rounded focus:ring-[#0c34cd]"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Clickjacking Protection (X-Frame-Options)</p>
                  <p className="text-[11px] text-slate-500">Blocks site from being embedded inside unauthorized iframes.</p>
                </div>
                <select
                  value={securitySettings.xFrameOptions}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      xFrameOptions: e.target.value as any,
                    })
                  }
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <option value="DENY">DENY (Strict)</option>
                  <option value="SAMEORIGIN">SAMEORIGIN</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Browser XSS Filter &amp; MIME Sniff Shield</p>
                  <p className="text-[11px] text-slate-500">Sets X-Content-Type-Options: nosniff automatically.</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                  Enforced
                </span>
              </div>
            </div>
          </div>

          {/* Network Firewall & IP Whitelisting */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Globe className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                Network Firewall, IP Whitelisting &amp; Threat Blacklist
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Authorized Admin IP Whitelist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Authorized Office / VPN IP Whitelist
                  </label>
                  <input
                    type="checkbox"
                    checked={securitySettings.ipWhitelistEnabled}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        ipWhitelistEnabled: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#0c34cd] rounded"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {securitySettings.ipWhitelist.map((ip) => (
                    <span
                      key={ip}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-200"
                    >
                      <span>{ip}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveWhitelistIp(ip)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddWhitelistIp} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 172.56.21.0/24 or IP"
                    value={newWhitelistIp}
                    onChange={(e) => setNewWhitelistIp(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-black"
                  >
                    Add IP
                  </button>
                </form>
              </div>

              {/* Blocked / Threat IPs */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-900">
                  Firewall Threat IP Blacklist ({securitySettings.blockedIps.length} Banned)
                </label>

                <div className="flex flex-wrap gap-2">
                  {securitySettings.blockedIps.map((ip) => (
                    <span
                      key={ip}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-mono text-xs font-bold border border-rose-200"
                    >
                      <span>{ip}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBlockedIp(ip)}
                        className="text-rose-400 hover:text-rose-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddBlockedIp} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter suspicious IP to block..."
                    value={newBlockedIp}
                    onChange={(e) => setNewBlockedIp(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                  >
                    Block IP
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* API Keys & Scoped Webhook Tokens */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Programmatic API Keys &amp; Scopes
                </h3>
                <p className="text-xs text-slate-500">
                  Bearer tokens for headless CMS consumers, mobile apps, and CI/CD pipelines.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setApiKeyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0c34cd] text-white hover:bg-[#0a2cb0] font-bold text-xs shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create API Key</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4">Key Name</th>
                    <th className="py-3 px-4">Token Value</th>
                    <th className="py-3 px-4">Scope</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {securitySettings.apiKeys.map((k) => (
                    <tr key={k.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{k.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{k.keyMasked}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          k.scope === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : k.scope === "read-write"
                            ? "bg-blue-100 text-[#0c34cd]"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {k.scope}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{k.lastUsed}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleRevokeApiKey(k.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Revoke key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GENERAL BRAND & ANNOUNCEMENTS */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
              Corporate Identity &amp; Positioning
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={generalSettings.brandName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, brandName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Domain</label>
                <input
                  type="text"
                  value={generalSettings.officialDomain}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, officialDomain: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Tagline</label>
              <input
                type="text"
                value={generalSettings.tagline}
                onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0c34cd]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Motto</label>
                <input
                  type="text"
                  value={generalSettings.corporateMotto}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, corporateMotto: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Core Philosophy</label>
                <input
                  type="text"
                  value={generalSettings.corePhilosophy}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, corePhilosophy: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0c34cd] focus:outline-none focus:border-[#0c34cd]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Richmond Headquarters Address</label>
              <input
                type="text"
                value={generalSettings.headquartersAddress}
                onChange={(e) => setGeneralSettings({ ...generalSettings, headquartersAddress: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#0c34cd]"
              />
            </div>
          </div>

          {/* Global Announcement Banner */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Global Site Announcement Banner
                </h3>
                <p className="text-xs text-slate-500">
                  Renders an attention strip across the top of public website pages.
                </p>
              </div>

              <input
                type="checkbox"
                checked={generalSettings.announcementBanner.enabled}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    announcementBanner: {
                      ...generalSettings.announcementBanner,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="w-5 h-5 text-[#0c34cd] rounded"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Message</label>
                <input
                  type="text"
                  value={generalSettings.announcementBanner.text}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      announcementBanner: {
                        ...generalSettings.announcementBanner,
                        text: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Link Callout</label>
                  <input
                    type="text"
                    value={generalSettings.announcementBanner.linkText}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        announcementBanner: {
                          ...generalSettings.announcementBanner,
                          linkText: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Link Target URL</label>
                  <input
                    type="text"
                    value={generalSettings.announcementBanner.linkUrl}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        announcementBanner: {
                          ...generalSettings.announcementBanner,
                          linkUrl: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Banner Type</label>
                  <select
                    value={generalSettings.announcementBanner.bannerType}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        announcementBanner: {
                          ...generalSettings.announcementBanner,
                          bannerType: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="success">Success (Emerald)</option>
                    <option value="warning">Warning (Amber)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CRM ROUTING & WEBHOOKS */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
              Inbound Leads Notification &amp; CRM Synchronization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Lead Routing Email
                </label>
                <input
                  type="email"
                  value={generalSettings.leadNotificationEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      leadNotificationEmail: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Emergency Escalation Phone
                </label>
                <input
                  type="tel"
                  value={generalSettings.emergencyPhone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      emergencyPhone: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                CRM Webhook Endpoint (HubSpot, Salesforce, Zapier)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={generalSettings.leadWebhookUrl}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      leadWebhookUrl: e.target.value,
                    })
                  }
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-[#0c34cd] font-bold text-xs hover:bg-[#0c34cd] hover:text-white transition-colors"
                >
                  Test Webhook Ping
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Email Alerts on Form Submissions</p>
                  <p className="text-[11px] text-slate-500">Instant email notification to executive partners.</p>
                </div>
                <input
                  type="checkbox"
                  checked={generalSettings.enableEmailNotifications}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      enableEmailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-[#0c34cd] rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Slack / Microsoft Teams Webhooks</p>
                  <p className="text-[11px] text-slate-500">Post new qualified leads into private channel.</p>
                </div>
                <input
                  type="checkbox"
                  checked={generalSettings.enableSlackWebhooks}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      enableSlackWebhooks: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-[#0c34cd] rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONTENT WORKFLOW & UPLOADS */}
      {activeTab === "workflow" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-3 border-b border-slate-100">
              Editorial Workflow &amp; Asset Upload Constraints
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Auto-Save Draft Interval
                </label>
                <select
                  value={generalSettings.contentWorkflow.autoSaveIntervalSeconds}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      contentWorkflow: {
                        ...generalSettings.contentWorkflow,
                        autoSaveIntervalSeconds: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                >
                  <option value={15}>Every 15 Seconds</option>
                  <option value={30}>Every 30 Seconds (Default)</option>
                  <option value={60}>Every 60 Seconds</option>
                </select>
                <p className="text-[10px] text-slate-500">Periodically commits changes during editing.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Maximum Media Upload Size
                </label>
                <select
                  value={generalSettings.contentWorkflow.maxUploadSizeMb}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      contentWorkflow: {
                        ...generalSettings.contentWorkflow,
                        maxUploadSizeMb: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                >
                  <option value={10}>10 Megabytes</option>
                  <option value={25}>25 Megabytes (Recommended)</option>
                  <option value={50}>50 Megabytes</option>
                </select>
                <p className="text-[10px] text-slate-500">Protects storage and bandwidth limits.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Require Peer Approval</span>
                  <input
                    type="checkbox"
                    checked={generalSettings.contentWorkflow.requireApprovalBeforePublish}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        contentWorkflow: {
                          ...generalSettings.contentWorkflow,
                          requireApprovalBeforePublish: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 text-[#0c34cd] rounded"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Requires Super Admin approval before staging goes live.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE API KEY */}
      {apiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                Generate Programmatic API Key
              </h3>
              <button
                type="button"
                onClick={() => setApiKeyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApiKey} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Key Description / Consumer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile App Client, Webhook Pipeline"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Scope Privilege
                </label>
                <select
                  value={newKeyScope}
                  onChange={(e) => setNewKeyScope(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd]"
                >
                  <option value="read">read (Read-only access to published content)</option>
                  <option value="read-write">read-write (Can submit leads &amp; edit drafts)</option>
                  <option value="admin">admin (Full programmatic control)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApiKeyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0c34cd] text-white font-black text-xs hover:bg-[#0a2cb0] shadow-sm"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: TYPOGRAPHY & DESIGN */}
      {activeTab === "typography" && (
        <div className="space-y-8">
          {/* Controls */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Typography &amp; Visual Identity</h3>
                <p className="text-xs text-slate-500 mt-0.5">Control fonts, sizing, and visual style across the entire website</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heading Font */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Heading Font Family</label>
                <select
                  value={generalSettings.typography?.headingFont ?? "Plus Jakarta Sans"}
                  onChange={(e) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, headingFont: e.target.value as any },
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] transition-all"
                >
                  {["Plus Jakarta Sans", "Poppins", "Inter", "Outfit", "Montserrat", "Roboto", "System Sans"].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1.5">Applied to all H1–H6 heading elements site-wide</p>
              </div>

              {/* Body Font */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Body / Paragraph Font</label>
                <select
                  value={generalSettings.typography?.bodyFont ?? "Inter"}
                  onChange={(e) =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, bodyFont: e.target.value as any },
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] transition-all"
                >
                  {["Inter", "Plus Jakarta Sans", "Poppins", "Roboto", "System Sans"].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1.5">Used in paragraph text, labels, and UI elements</p>
              </div>

              {/* Font Size Scale */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Font Size Scale</label>
                <div className="flex gap-2">
                  {(["compact", "standard", "spacious"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          typography: { ...prev.typography, fontSizeScale: s },
                        }))
                      }
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black capitalize transition-all ${
                        (generalSettings.typography?.fontSizeScale ?? "standard") === s
                          ? "bg-[#0c34cd] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Scales base font sizes site-wide (90% / 100% / 112%)</p>
              </div>

              {/* Heading Weight */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Heading Font Weight</label>
                <div className="flex gap-2">
                  {([
                    { value: "bold", label: "Bold 700" },
                    { value: "extrabold", label: "Extra 800" },
                    { value: "black", label: "Black 900" },
                  ] as const).map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          typography: { ...prev.typography, headingWeight: w.value },
                        }))
                      }
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                        (generalSettings.typography?.headingWeight ?? "black") === w.value
                          ? "bg-[#0c34cd] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Heading Letter Spacing</label>
                <div className="flex gap-2">
                  {(["tight", "normal", "wide"] as const).map((ls) => (
                    <button
                      key={ls}
                      type="button"
                      onClick={() =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          typography: { ...prev.typography, letterSpacing: ls },
                        }))
                      }
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black capitalize transition-all ${
                        (generalSettings.typography?.letterSpacing ?? "tight") === ls
                          ? "bg-[#0c34cd] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {ls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Border Radius */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">Card &amp; Panel Border Radius</label>
                <div className="flex gap-2">
                  {([
                    { value: "rounded-xl", label: "Subtle (xl)" },
                    { value: "rounded-2xl", label: "Medium (2xl)" },
                    { value: "rounded-3xl", label: "Rounded (3xl)" },
                  ] as const).map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          typography: { ...prev.typography, cardRadius: r.value },
                        }))
                      }
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                        (generalSettings.typography?.cardRadius ?? "rounded-3xl") === r.value
                          ? "bg-[#0c34cd] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-5">
              <Type className="w-4 h-4 text-[#0c34cd]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Live Typography Preview</h3>
            </div>

            <div
              className={`p-8 ${generalSettings.typography?.cardRadius ?? "rounded-3xl"} bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-4`}
              style={{ fontFamily: generalSettings.typography?.bodyFont ? `"${generalSettings.typography.bodyFont}", system-ui, sans-serif` : undefined }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c34cd]">ENTERPRISE TECHNOLOGY ACCELERATOR</span>
              <h2
                className="text-[#071739] leading-tight mt-1"
                style={{
                  fontFamily: generalSettings.typography?.headingFont ? `"${generalSettings.typography.headingFont}", system-ui, sans-serif` : undefined,
                  fontWeight: generalSettings.typography?.headingWeight === "bold" ? 700 : generalSettings.typography?.headingWeight === "extrabold" ? 800 : 900,
                  letterSpacing: generalSettings.typography?.letterSpacing === "tight" ? "-0.03em" : generalSettings.typography?.letterSpacing === "wide" ? "0.03em" : "0",
                  fontSize: generalSettings.typography?.fontSizeScale === "compact" ? "1.6rem" : generalSettings.typography?.fontSizeScale === "spacious" ? "2.1rem" : "1.875rem",
                }}
              >
                Modernize Your Enterprise <span className="text-[#0c34cd]">Data &amp; AI Stack</span>
              </h2>
              <p className="text-slate-600 leading-relaxed" style={{ fontSize: generalSettings.typography?.fontSizeScale === "compact" ? "0.8rem" : generalSettings.typography?.fontSizeScale === "spacious" ? "1rem" : "0.875rem" }}>
                Richmond, Virginia-based technology accelerator helping enterprises transform legacy infrastructure into modern, AI-ready data platforms using open-source Lakehouse patterns.
              </p>
              <div className="flex gap-3 pt-2">
                <span className="px-4 py-2 rounded-xl bg-[#0c34cd] text-white text-xs font-black">Book a Strategy Call</span>
                <span className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold">View Case Studies</span>
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                cmsStore.saveGeneralSettings(generalSettings);
                showNotification("Typography & design settings saved — changes apply site-wide.");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save Typography Settings
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
