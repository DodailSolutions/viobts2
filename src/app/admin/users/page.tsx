"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users2,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  KeyRound,
  Lock,
  Mail,
  Building,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  Edit3,
  Trash2,
  Check,
  Shield,
  Activity,
  Download,
  Plus,
  SlidersHorizontal,
  Unlock,
  Globe,
  FileText,
  TrendingUp,
  Sliders,
  CheckSquare,
  Square,
  XCircle,
  Eye,
  Settings,
  LayoutGrid,
  Table
} from "lucide-react";
import { 
  cmsStore, 
  AdminUserItem, 
  UserRole, 
  RoleDefinitionItem, 
  SecurityAuditLogItem,
  ALL_AVAILABLE_PERMISSIONS,
  ROLE_PRESET_TEMPLATES,
  RoleTemplateItem
} from "@/lib/data";

const ROLE_COLOR_PRESETS = [
  { label: "Royal Blue (Primary)", badgeBg: "bg-blue-100", badgeText: "text-[#0c34cd]" },
  { label: "Emerald Green", badgeBg: "bg-emerald-100", badgeText: "text-emerald-800" },
  { label: "Royal Purple", badgeBg: "bg-purple-100", badgeText: "text-purple-800" },
  { label: "Sky Cyan", badgeBg: "bg-sky-100", badgeText: "text-sky-800" },
  { label: "Amber Gold", badgeBg: "bg-amber-100", badgeText: "text-amber-800" },
  { label: "Rose Crimson", badgeBg: "bg-rose-100", badgeText: "text-rose-800" },
  { label: "Slate Neutral", badgeBg: "bg-slate-100", badgeText: "text-slate-800" },
];

export default function AdminUserRolesPage() {
  const [users, setUsers] = useState<AdminUserItem[]>(() => cmsStore.getUsers());
  const [roles, setRoles] = useState<RoleDefinitionItem[]>(() => cmsStore.getRoles());
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLogItem[]>(() => cmsStore.getAuditLogs());

  const [activeTab, setActiveTab] = useState<"users" | "roles" | "audit">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");

  // User Modals State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Role Modals State (Create / Edit)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState<"create" | "edit">("create");
  const [roleForm, setRoleForm] = useState<{
    id: string;
    name: string;
    description: string;
    badgeBg: string;
    badgeText: string;
    permissions: string[];
    isSystem?: boolean;
  }>({
    id: "",
    name: "",
    description: "",
    badgeBg: "bg-blue-100",
    badgeText: "text-[#0c34cd]",
    permissions: ["pages:view", "services:view"],
    isSystem: false,
  });

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "editor" as UserRole,
    department: "Engineering & Cloud",
    sendInviteEmail: true,
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === "all" || u.role === selectedRoleFilter;
    const matchesStatus = selectedStatusFilter === "all" || u.status === selectedStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle Quick Role Change
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const userToUpdate = users.find((u) => u.id === userId);
    if (!userToUpdate) return;

    const oldRoleName = roles.find((r) => r.id === userToUpdate.role)?.name || userToUpdate.role;
    const newRoleName = roles.find((r) => r.id === newRole)?.name || newRole;

    const updatedUser: AdminUserItem = {
      ...userToUpdate,
      role: newRole,
    };

    cmsStore.saveUser(updatedUser);
    setUsers(cmsStore.getUsers());

    // Record Audit Log
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: `Updated role from ${oldRoleName} to ${newRoleName}`,
      target: `${updatedUser.name} (${updatedUser.email})`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: newRole === "super_admin" ? "warning" : "info"
    });
    setAuditLogs(cmsStore.getAuditLogs());

    showNotification(`Role for ${updatedUser.name} updated to ${newRoleName}`);
  };

  // Handle Status Toggle (Active / Suspended)
  const handleStatusToggle = (userId: string) => {
    const userToUpdate = users.find((u) => u.id === userId);
    if (!userToUpdate) return;

    if (userToUpdate.role === "super_admin" && users.filter(u => u.role === "super_admin").length <= 1) {
      alert("Cannot suspend the only Super Administrator of the system.");
      return;
    }

    const newStatus = userToUpdate.status === "active" ? "suspended" : "active";
    const updatedUser: AdminUserItem = {
      ...userToUpdate,
      status: newStatus,
    };

    cmsStore.saveUser(updatedUser);
    setUsers(cmsStore.getUsers());

    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: newStatus === "active" ? "Reactivated Account" : "Suspended Account Access",
      target: `${updatedUser.name} (${updatedUser.email})`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: newStatus === "suspended" ? "critical" : "info"
    });
    setAuditLogs(cmsStore.getAuditLogs());

    showNotification(`Account status for ${updatedUser.name} changed to ${newStatus.toUpperCase()}`);
  };

  // Handle Delete User
  const handleDeleteUser = (userId: string, name: string) => {
    const userToDelete = users.find((u) => u.id === userId);
    if (userToDelete?.role === "super_admin") {
      alert("Super Administrator accounts cannot be deleted directly.");
      return;
    }

    if (confirm(`Are you sure you want to revoke and delete all access for ${name}?`)) {
      cmsStore.deleteUser(userId);
      setUsers(cmsStore.getUsers());

      cmsStore.addAuditLog({
        actorName: "Adithya Buddhavarapu",
        actorEmail: "theoracle@viobts.com",
        action: "Permanently Revoked Access & Deleted Account",
        target: `${name}`,
        ipAddress: "172.56.21.94 (Richmond, VA)",
        timestamp: "Just now",
        severity: "critical"
      });
      setAuditLogs(cmsStore.getAuditLogs());

      showNotification(`User ${name} has been removed from the organization.`);
    }
  };

  // Handle Invite / Add User Submit
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created: AdminUserItem = {
      id: "usr-" + Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: newUser.sendInviteEmail ? "invited" : "active",
      twoFactorEnabled: false,
      lastActive: newUser.sendInviteEmail ? "Invite Sent (Pending)" : "Never",
      createdAt: new Date().toISOString()
    };

    cmsStore.saveUser(created);
    setUsers(cmsStore.getUsers());

    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: `Created user account with role: ${newUser.role}`,
      target: `${created.name} (${created.email})`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info"
    });
    setAuditLogs(cmsStore.getAuditLogs());

    setIsInviteModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "editor",
      department: "Engineering & Cloud",
      sendInviteEmail: true,
    });

    showNotification(`New user invitation dispatched to ${created.email}`);
  };

  // Selected Role Template & Filter State
  const [rolesViewMode, setRolesViewMode] = useState<"cards" | "matrix">("cards");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("website_manager");
  const [permFilterText, setPermFilterText] = useState<string>("");
  const [editingOriginalRoleId, setEditingOriginalRoleId] = useState<string | null>(null);

  // Open Create Role Modal (optional template pre-population)
  const openCreateRoleModal = (presetTemplateId?: string) => {
    setRoleModalMode("create");
    setEditingOriginalRoleId(null);
    const tpl = ROLE_PRESET_TEMPLATES.find(t => t.id === presetTemplateId) 
      || ROLE_PRESET_TEMPLATES.find(t => t.id === "website_manager") 
      || ROLE_PRESET_TEMPLATES[0];

    setSelectedTemplateId(tpl.id);
    setRoleForm({
      id: tpl.id === "custom_role" ? "" : tpl.id,
      name: tpl.id === "custom_role" ? "" : tpl.name,
      description: tpl.description,
      badgeBg: tpl.badgeBg,
      badgeText: tpl.badgeText,
      permissions: [...tpl.recommendedPermissions],
      isSystem: false,
    });
    setPermFilterText("");
    setIsRoleModalOpen(true);
  };

  // Open Edit Role Modal (edit capabilities for both new & created roles)
  const openEditRoleModal = (role: RoleDefinitionItem) => {
    setRoleModalMode("edit");
    setEditingOriginalRoleId(role.id);
    setSelectedTemplateId(role.id);
    setRoleForm({
      id: role.id,
      name: role.name,
      description: role.description,
      badgeBg: role.badgeBg,
      badgeText: role.badgeText,
      permissions: [...role.permissions],
      isSystem: role.isSystem,
    });
    setPermFilterText("");
    setIsRoleModalOpen(true);
  };

  // Direct 1-click toggle of role capability from Matrix view (both new and created roles)
  const handleToggleRoleCapability = (roleId: string, permId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (role.id === "super_admin") {
      showNotification("Super Administrator retains complete platform authority by design.");
      return;
    }

    const hasPerm = role.permissions.includes(permId);
    const updatedPermissions = hasPerm 
      ? role.permissions.filter(p => p !== permId)
      : [...role.permissions, permId];

    const updatedRole: RoleDefinitionItem = {
      ...role,
      permissions: updatedPermissions
    };

    cmsStore.saveRole(updatedRole);
    setRoles(cmsStore.getRoles());

    const permObj = ALL_AVAILABLE_PERMISSIONS.find(p => p.id === permId);
    const permName = permObj ? permObj.name : permId;

    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: hasPerm ? `Revoked capability: ${permName}` : `Granted capability: ${permName}`,
      target: `Role: ${role.name}`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "info"
    });
    setAuditLogs(cmsStore.getAuditLogs());

    showNotification(
      hasPerm 
        ? `Revoked "${permName}" from ${role.name}` 
        : `Granted "${permName}" to ${role.name}`
    );
  };

  // Apply a template within the modal
  const handleApplyTemplate = (tpl: RoleTemplateItem) => {
    setSelectedTemplateId(tpl.id);
    setRoleForm((prev) => ({
      ...prev,
      name: roleModalMode === "create" ? (tpl.id === "custom_role" ? "" : tpl.name) : prev.name,
      id: roleModalMode === "create" ? (tpl.id === "custom_role" ? "" : tpl.id) : prev.id,
      description: tpl.description,
      badgeBg: tpl.badgeBg,
      badgeText: tpl.badgeText,
      permissions: [...tpl.recommendedPermissions],
    }));
  };

  // Master Privilege Controls
  const handleGrantAllPermissions = () => {
    setRoleForm((prev) => ({
      ...prev,
      permissions: ALL_AVAILABLE_PERMISSIONS.map(p => p.id)
    }));
  };

  const handleRevokeAllPermissions = () => {
    setRoleForm((prev) => ({
      ...prev,
      permissions: []
    }));
  };

  // Toggle single permission privilege
  const handleTogglePermission = (permId: string) => {
    setRoleForm((prev) => {
      const exists = prev.permissions.includes(permId);
      return {
        ...prev,
        permissions: exists 
          ? prev.permissions.filter((p) => p !== permId)
          : [...prev.permissions, permId]
      };
    });
  };

  // Toggle all permissions in a category
  const handleToggleCategoryPermissions = (category: string) => {
    const categoryPerms = ALL_AVAILABLE_PERMISSIONS.filter(p => p.category === category).map(p => p.id);
    const allSelected = categoryPerms.every(id => roleForm.permissions.includes(id));

    setRoleForm((prev) => {
      if (allSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter(p => !categoryPerms.includes(p))
        };
      } else {
        const set = new Set([...prev.permissions, ...categoryPerms]);
        return {
          ...prev,
          permissions: Array.from(set)
        };
      }
    });
  };

  // Save Role Submit
  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleForm.name.trim()) return;

    const roleId = roleModalMode === "create"
      ? (roleForm.id.trim() || roleForm.name.toLowerCase().replace(/[^a-z0-9]/g, "_"))
      : (roleForm.id.trim() || editingOriginalRoleId || roleForm.name.toLowerCase().replace(/[^a-z0-9]/g, "_"));

    const roleToSave: RoleDefinitionItem = {
      id: roleId,
      name: roleForm.name.trim(),
      description: roleForm.description.trim() || "Custom enterprise role with tailored permissions.",
      badgeBg: roleForm.badgeBg,
      badgeText: roleForm.badgeText,
      permissions: roleForm.permissions,
      isSystem: roleForm.isSystem || false,
    };

    // If ID changed during edit of a created role, migrate assigned users and delete old key
    if (editingOriginalRoleId && editingOriginalRoleId !== roleToSave.id) {
      users.forEach(u => {
        if (u.role === editingOriginalRoleId) {
          cmsStore.saveUser({ ...u, role: roleToSave.id });
        }
      });
      cmsStore.deleteRole(editingOriginalRoleId);
      setUsers(cmsStore.getUsers());
    }

    cmsStore.saveRole(roleToSave);
    setRoles(cmsStore.getRoles());

    // Record Audit Log
    cmsStore.addAuditLog({
      actorName: "Adithya Buddhavarapu",
      actorEmail: "theoracle@viobts.com",
      action: roleModalMode === "create" ? `Created custom role: ${roleToSave.name}` : `Updated capabilities for role: ${roleToSave.name}`,
      target: `Role ID: ${roleToSave.id} (${roleToSave.permissions.length} capabilities)`,
      ipAddress: "172.56.21.94 (Richmond, VA)",
      timestamp: "Just now",
      severity: "warning"
    });
    setAuditLogs(cmsStore.getAuditLogs());

    setIsRoleModalOpen(false);
    showNotification(
      roleModalMode === "create"
        ? `New role "${roleToSave.name}" created with configured capabilities!`
        : `Capabilities for role "${roleToSave.name}" updated successfully!`
    );
  };

  // Delete Role
  const handleDeleteRole = (role: RoleDefinitionItem) => {
    if (role.isSystem || role.id === "super_admin") {
      alert(`The "${role.name}" is a protected core system role and cannot be deleted.`);
      return;
    }

    const assignedUsers = users.filter((u) => u.role === role.id);
    if (assignedUsers.length > 0) {
      alert(`Cannot delete role "${role.name}" because ${assignedUsers.length} active member(s) are currently assigned to it. Please reassign those members before deleting.`);
      return;
    }

    if (confirm(`Are you sure you want to permanently delete the custom role "${role.name}"?`)) {
      cmsStore.deleteRole(role.id);
      setRoles(cmsStore.getRoles());

      cmsStore.addAuditLog({
        actorName: "Adithya Buddhavarapu",
        actorEmail: "theoracle@viobts.com",
        action: `Permanently deleted role: ${role.name}`,
        target: `Role ID: ${role.id}`,
        ipAddress: "172.56.21.94 (Richmond, VA)",
        timestamp: "Just now",
        severity: "critical"
      });
      setAuditLogs(cmsStore.getAuditLogs());

      showNotification(`Role "${role.name}" has been deleted.`);
    }
  };

  const getRoleBadgeStyle = (roleId: string) => {
    const roleDef = roles.find((r) => r.id === roleId);
    if (!roleDef) return "bg-slate-100 text-slate-800 border-slate-200";
    return `${roleDef.badgeBg} ${roleDef.badgeText} border border-current/20`;
  };

  // Group permissions by category for the modal
  const permissionCategories = Array.from(new Set(ALL_AVAILABLE_PERMISSIONS.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
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
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            User Roles &amp; Team Access Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">
            Govern administrative permissions, create custom roles, edit privileges, enforce 2FA, and inspect audit lineages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openCreateRoleModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0c34cd] hover:border-[#0c34cd] font-bold text-xs transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#0c34cd]" />
            <span>Create New Role</span>
          </button>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Administrators</span>
            <Users2 className="w-5 h-5 text-[#0c34cd]" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{users.length}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{users.filter(u => u.status === "active").length} Active Accounts</span>
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Configured Roles</span>
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{roles.length}</p>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              {roles.filter(r => !r.isSystem).length} Custom Role(s) Active
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">2FA Compliance</span>
            <KeyRound className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-600">
              {Math.round((users.filter(u => u.twoFactorEnabled).length / users.length) * 100)}%
            </p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">
              SOC2 &amp; NIST 800-53 Standard
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Security Audits</span>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{auditLogs.length}</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Lineage events recorded
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "users"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Team Members ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "roles"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Roles &amp; Permissions Matrix ({roles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "audit"
              ? "bg-[#0c34cd] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Security Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: Team Members Management */}
      {activeTab === "users" && (
        <div className="space-y-5">
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0c34cd] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                aria-label="Filter by role"
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#0c34cd]"
              >
                <option value="all">All Roles</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                aria-label="Filter by account status"
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#0c34cd]"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="invited">Pending Invites</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-black uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-6">User / Member</th>
                    <th className="py-4 px-6">Assigned Role</th>
                    <th className="py-4 px-6">Department</th>
                    <th className="py-4 px-6">2FA Security</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Last Active</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredUsers.map((user) => {
                    return (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Member Details */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0c34cd] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-black text-slate-900">{user.name}</p>
                              <p className="text-[11px] text-slate-500 font-mono">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Assigned Role & Quick Selector */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                              aria-label={`Change role for ${user.name}`}
                              className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wide border cursor-pointer focus:outline-none ${getRoleBadgeStyle(user.role)}`}
                            >
                              {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                const targetRole = roles.find((r) => r.id === user.role);
                                if (targetRole) openEditRoleModal(targetRole);
                              }}
                              title="Edit capabilities for this role"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0c34cd] hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          {user.department}
                        </td>

                        {/* 2FA Status */}
                        <td className="py-4 px-6">
                          {user.twoFactorEnabled ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>2FA Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                              <ShieldAlert className="w-3 h-3 text-amber-600" />
                              <span>Not Configured</span>
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {user.status === "active" && (
                            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-black text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Active</span>
                            </span>
                          )}
                          {user.status === "invited" && (
                            <span className="inline-flex items-center gap-1.5 text-amber-600 font-black text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <span>Invited</span>
                            </span>
                          )}
                          {user.status === "suspended" && (
                            <span className="inline-flex items-center gap-1.5 text-rose-600 font-black text-[11px]">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span>Suspended</span>
                            </span>
                          )}
                        </td>

                        {/* Last Active */}
                        <td className="py-4 px-6 text-slate-500 font-medium text-[11px]">
                          {user.lastActive}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStatusToggle(user.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                                user.status === "active"
                                  ? "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 border border-slate-200"
                                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              }`}
                              title={user.status === "active" ? "Suspend user access" : "Reactivate user access"}
                            >
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                <Users2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold">No team members match your filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedRoleFilter("all"); setSelectedStatusFilter("all"); }}
                  className="mt-2 text-xs font-bold text-[#0c34cd] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Roles & Permissions Matrix with Create / Edit / Delete */}
      {activeTab === "roles" && (
        <div className="space-y-6">
          {/* Header Action Banner inside Roles Tab */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-[#0c34cd] text-[10px] font-black uppercase tracking-wider mb-2">
                <Sliders className="w-3 h-3" />
                <span>Fine-Grained Privilege Governance</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Role &amp; Privilege Authority Matrix
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-0.5 max-w-2xl leading-relaxed">
                Configure roles like <strong>Website Manager</strong>, <strong>Content Writer</strong>, <strong>SEO Expert</strong>, <strong>Lead Manager</strong>, or create any bespoke role with granular privileges. Edit capabilities for both new and created roles.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Switcher */}
              <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setRolesViewMode("cards")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    rolesViewMode === "cards"
                      ? "bg-[#0c34cd] text-white shadow-xs font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Role Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRolesViewMode("matrix")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    rolesViewMode === "matrix"
                      ? "bg-[#0c34cd] text-white shadow-xs font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Capabilities Matrix</span>
                </button>
              </div>

              <button
                onClick={() => openCreateRoleModal("website_manager")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c34cd] hover:bg-[#0a2cb0] text-white font-black text-xs transition-all shadow-md shadow-blue-700/20 hover:scale-105 active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Role</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: Role Cards & Presets View */}
          {rolesViewMode === "cards" && (
            <div className="space-y-6">
              {/* Quick Blueprint Presets Bar */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0c34cd]" />
                    <span>Instant Role Blueprints (1-Click to Create &amp; Customize)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">Click any blueprint to pre-fill</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {ROLE_PRESET_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => openCreateRoleModal(tpl.id)}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#0c34cd] bg-slate-50/70 hover:bg-blue-50/40 text-left transition-all group hover:scale-[1.02] shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${tpl.badgeBg} ${tpl.badgeText} border border-current/20`}>
                            {tpl.recommendedPermissions.length} Privileges
                          </span>
                          <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c34cd] transition-colors" />
                        </div>
                        <p className="text-xs font-black text-slate-900 group-hover:text-[#0c34cd] transition-colors">
                          {tpl.name}
                        </p>
                        <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 font-normal leading-tight">
                          {tpl.description}
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-[#0c34cd] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <span>Instantiate</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => {
                  const assignedCount = users.filter((u) => u.role === role.id).length;
                  const coveragePct = Math.round((role.permissions.length / ALL_AVAILABLE_PERMISSIONS.length) * 100);

                  // Detect active capability sectors
                  const hasPages = role.permissions.some(p => p.startsWith("pages:") || p.startsWith("website:"));
                  const hasSeo = role.permissions.some(p => p.startsWith("seo:"));
                  const hasContent = role.permissions.some(p => p.startsWith("content:") || p.startsWith("blogs:"));
                  const hasServices = role.permissions.some(p => p.startsWith("services:") || p.startsWith("casestudies:"));
                  const hasLeads = role.permissions.some(p => p.startsWith("leads:") || p.startsWith("analytics:"));
                  const hasAdmin = role.permissions.some(p => p.startsWith("users:") || p.startsWith("roles:") || p.startsWith("settings:") || p.startsWith("audit:"));

                  return (
                    <div
                      key={role.id}
                      className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between group hover:border-[#0c34cd] hover:shadow-xl transition-all relative overflow-hidden"
                    >
                      <div>
                        {/* Top Row: Badge & Members Count */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-black ${role.badgeBg} ${role.badgeText} border border-current/20`}>
                            {role.name}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                            {assignedCount} Member{assignedCount !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                          {role.description}
                        </p>

                        {/* Sector Clearance Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {hasPages && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0c34cd] text-[10px] font-bold border border-blue-200">
                              Pages &amp; Layouts
                            </span>
                          )}
                          {hasSeo && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                              SEO &amp; Growth
                            </span>
                          )}
                          {hasContent && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              Editorial &amp; Blogs
                            </span>
                          )}
                          {hasServices && (
                            <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
                              Service Pillars
                            </span>
                          )}
                          {hasLeads && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                              Inbound CRM
                            </span>
                          )}
                          {hasAdmin && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                              Platform Admin
                            </span>
                          )}
                        </div>

                        {/* Privilege Coverage Meter Bar */}
                        <div className="mb-5 pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
                            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Privilege Coverage:</span>
                            <span className="text-[#0c34cd] font-mono">
                              {role.permissions.length} / {ALL_AVAILABLE_PERMISSIONS.length} ({coveragePct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-[#0c34cd] rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, coveragePct)}%` }}
                            />
                          </div>
                        </div>

                        {/* Permissions Granted List */}
                        <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                              Granted Privileges ({role.permissions.length}):
                            </p>
                          </div>

                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 scrollbar-none">
                            {role.permissions.map((p, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="font-mono text-[11px] font-semibold">{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom: System Lock vs Edit/Delete Controls */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        {role.isSystem ? (
                          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Core System Role</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[11px]">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Custom Role</span>
                          </div>
                        )}

                        {/* Role Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditRoleModal(role)}
                            className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-[#0c34cd] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all font-bold text-xs flex items-center gap-1.5"
                            title={`Edit ${role.name} capabilities`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Capabilities</span>
                          </button>

                          {!role.isSystem && (
                            <button
                              onClick={() => handleDeleteRole(role)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
                              title={`Delete ${role.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: Interactive Capabilities Matrix View */}
          {rolesViewMode === "matrix" && (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/70 text-[#0c34cd] text-[10px] font-black uppercase tracking-wider mb-1.5">
                    <Table className="w-3 h-3" />
                    <span>Live Role Capability Matrix</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900">
                    Direct Capability Authorizations (Click to Toggle for Both New &amp; Created Roles)
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    Click any checkbox in the matrix to grant or revoke that capability in real-time. Changes take effect immediately.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Live RBAC Synced
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-600">
                      <th className="py-4 px-6 min-w-[280px]">Operational Capability / Privilege</th>
                      {roles.map((role) => (
                        <th key={role.id} className="py-4 px-4 min-w-[170px] text-center border-l border-slate-200/70">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${role.badgeBg} ${role.badgeText} border border-current/20`}>
                              {role.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              {users.filter(u => u.role === role.id).length} assigned
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              <button
                                type="button"
                                onClick={() => openEditRoleModal(role)}
                                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#0c34cd] hover:border-[#0c34cd] text-[10px] font-bold transition-all shadow-2xs"
                                title={`Edit capabilities for ${role.name}`}
                              >
                                Edit Role
                              </button>
                              {!role.isSystem && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRole(role)}
                                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete role"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionCategories.map((cat) => {
                      const catPerms = ALL_AVAILABLE_PERMISSIONS.filter(p => p.category === cat);
                      return (
                        <React.Fragment key={cat}>
                          <tr className="bg-slate-100/70 border-y border-slate-200 font-black text-slate-800 text-[11px] uppercase tracking-wider">
                            <td colSpan={roles.length + 1} className="py-2.5 px-6">
                              <span className="text-[#0c34cd]">{cat}</span>
                              <span className="text-[10px] text-slate-500 font-normal ml-2 lowercase font-mono">
                                ({catPerms.length} capabilities)
                              </span>
                            </td>
                          </tr>
                          {catPerms.map((perm) => (
                            <tr key={perm.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-6">
                                <p className="font-bold text-slate-900 text-xs">{perm.name}</p>
                                <p className="text-[11px] text-slate-500 leading-snug">{perm.description}</p>
                                <span className="text-[9px] font-mono text-slate-400">{perm.id}</span>
                              </td>
                              {roles.map((role) => {
                                const isSuperAdmin = role.id === "super_admin";
                                const isGranted = role.permissions.includes(perm.id);

                                return (
                                  <td key={role.id} className="py-3 px-4 text-center border-l border-slate-100">
                                    {isSuperAdmin ? (
                                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#0c34cd] text-[10px] font-black border border-blue-200/80" title="Super Admin has mandatory platform clearance">
                                        <Lock className="w-3 h-3" />
                                        <span>Granted</span>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => handleToggleRoleCapability(role.id, perm.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border transition-all ${
                                          isGranted 
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200" 
                                            : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                                        }`}
                                        title={isGranted ? `Click to revoke "${perm.name}" from ${role.name}` : `Click to grant "${perm.name}" to ${role.name}`}
                                      >
                                        {isGranted ? (
                                          <>
                                            <Check className="w-3 h-3 stroke-[3]" />
                                            <span>Granted</span>
                                          </>
                                        ) : (
                                          <>
                                            <X className="w-3 h-3 stroke-[2.5]" />
                                            <span>Denied</span>
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Security & Audit Log */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Security &amp; Administrative Event Lineage</h3>
              <p className="text-xs text-slate-500 font-normal">Immutable audit trail of role creations, edits, administrative elevations, and access revocations.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Live SysLog Active
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Administrator</th>
                  <th className="py-3.5 px-6">Action Performed</th>
                  <th className="py-3.5 px-6">Target Resource</th>
                  <th className="py-3.5 px-6">Origin IP</th>
                  <th className="py-3.5 px-6 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-slate-900">{log.actorName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{log.actorEmail}</p>
                    </td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-mono text-[11px]">
                      {log.target}
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 font-mono text-[11px]">
                      {log.ipAddress}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        log.severity === "critical"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : log.severity === "warning"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-blue-100 text-[#0c34cd] border border-blue-200"
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ROLE MODAL */}
      {isRoleModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsRoleModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0c34cd]" />
                  <h3 className="text-lg font-black text-slate-900">
                    {roleModalMode === "create" ? "Create New Enterprise Role" : `Edit Role: ${roleForm.name}`}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Configure role title, select a blueprint preset, and fine-tune exact privilege authorizations.
                </p>
              </div>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRoleSubmit} className="space-y-6">
              {/* Quick Role Template Selector */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2 flex items-center justify-between">
                  <span>1. Start from Role Blueprint Template</span>
                  <span className="text-[10px] text-slate-400 font-normal">Pre-loads standard privilege sets</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {ROLE_PRESET_TEMPLATES.map((tpl) => {
                    const isSelected = selectedTemplateId === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleApplyTemplate(tpl)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected 
                            ? "bg-blue-50/80 border-[#0c34cd] ring-2 ring-[#0c34cd]/20 shadow-xs" 
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#0c34cd]" : "bg-slate-300"}`} />
                          <span className="text-[9px] font-mono font-bold text-slate-400">
                            {tpl.recommendedPermissions.length} perms
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-900 leading-tight">
                          {tpl.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Role Title & Key */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Website Manager, SEO Expert..."
                    value={roleForm.name}
                    onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Role Identifier Key
                  </label>
                  <input
                    type="text"
                    disabled={roleModalMode === "edit"}
                    placeholder="e.g. website_manager, seo_expert"
                    value={roleForm.id}
                    onChange={(e) => setRoleForm({ ...roleForm, id: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#0c34cd] ${
                      roleModalMode === "edit" ? "opacity-60 cursor-not-allowed" : "focus:bg-white"
                    }`}
                  />
                  {roleModalMode === "create" && (
                    <p className="text-[10px] text-slate-400 mt-1">Leave blank to auto-generate from title.</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Role Authority &amp; Scope Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe the operational responsibilities and governance boundaries for this role..."
                  value={roleForm.description}
                  onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#0c34cd] focus:bg-white font-normal text-slate-800"
                />
              </div>

              {/* Badge Color Preset Picker */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-2">
                  Role Badge Visual Identity
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROLE_COLOR_PRESETS.map((preset, pIdx) => {
                    const isSelected = roleForm.badgeBg === preset.badgeBg && roleForm.badgeText === preset.badgeText;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setRoleForm({ ...roleForm, badgeBg: preset.badgeBg, badgeText: preset.badgeText })}
                        className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 border ${
                          isSelected
                            ? `${preset.badgeBg} ${preset.badgeText} border-[#0c34cd] shadow-xs scale-105 ring-2 ring-[#0c34cd]/20`
                            : `${preset.badgeBg} ${preset.badgeText} opacity-75 hover:opacity-100 border-transparent`
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Granular Privilege Clearance & Access Controls */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-900 tracking-wider">
                      Privilege Clearance &amp; Access Controls
                    </label>
                    <p className="text-[11px] text-slate-500 font-normal">
                      Control which operational privileges to grant or deny for this role.
                    </p>
                  </div>

                  {/* Master Grant / Revoke Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleGrantAllPermissions}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold border border-emerald-200 transition-colors flex items-center gap-1"
                    >
                      <CheckSquare className="w-3 h-3" />
                      <span>Grant All ({ALL_AVAILABLE_PERMISSIONS.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRevokeAllPermissions}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 text-[11px] font-bold border border-slate-200 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Revoke All</span>
                    </button>
                  </div>
                </div>

                {/* Privilege Coverage Meter & Search Bar */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0c34cd] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      {Math.round((roleForm.permissions.length / ALL_AVAILABLE_PERMISSIONS.length) * 100)}%
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        {roleForm.permissions.length} of {ALL_AVAILABLE_PERMISSIONS.length} Privileges Granted
                      </p>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {roleForm.permissions.length === ALL_AVAILABLE_PERMISSIONS.length
                          ? "Unrestricted administrative clearance across all platform capabilities."
                          : roleForm.permissions.length === 0
                          ? "No privileges granted. Account will have no administrative write clearance."
                          : "Selective privilege authorization active."}
                      </p>
                    </div>
                  </div>

                  {/* Search Filter Input */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter privileges..."
                      value={permFilterText}
                      onChange={(e) => setPermFilterText(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0c34cd]"
                    />
                    {permFilterText && (
                      <button
                        type="button"
                        onClick={() => setPermFilterText("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categorized Permissions Grid */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {permissionCategories.map((category) => {
                    const categoryPerms = ALL_AVAILABLE_PERMISSIONS.filter(p => {
                      if (p.category !== category) return false;
                      if (!permFilterText.trim()) return true;
                      const q = permFilterText.toLowerCase();
                      return (
                        p.name.toLowerCase().includes(q) ||
                        p.id.toLowerCase().includes(q) ||
                        p.description.toLowerCase().includes(q)
                      );
                    });

                    if (categoryPerms.length === 0) return null;

                    const allSelected = categoryPerms.every(p => roleForm.permissions.includes(p.id));
                    const grantedCount = categoryPerms.filter(p => roleForm.permissions.includes(p.id)).length;

                    return (
                      <div key={category} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900">{category}</span>
                            <span className="text-[10px] text-slate-500 font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {grantedCount} / {categoryPerms.length} granted
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleCategoryPermissions(category)}
                            className="text-[10px] font-bold text-[#0c34cd] hover:underline"
                          >
                            {allSelected ? "Revoke All in Category" : "Grant All in Category"}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {categoryPerms.map((perm) => {
                            const checked = roleForm.permissions.includes(perm.id);
                            return (
                              <div
                                key={perm.id}
                                onClick={() => handleTogglePermission(perm.id)}
                                className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                                  checked 
                                    ? "bg-white border-blue-200 shadow-2xs" 
                                    : "bg-slate-100/60 border-slate-200 hover:bg-white/80 opacity-75 hover:opacity-100"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleTogglePermission(perm.id)}
                                    className="mt-0.5 w-4 h-4 text-[#0c34cd] rounded border-slate-300 focus:ring-0 cursor-pointer"
                                  />
                                  <div>
                                    <p className="text-xs font-black text-slate-800 leading-none">
                                      {perm.name}
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-snug font-normal">
                                      {perm.description}
                                    </p>
                                    <p className="text-[9px] text-slate-400 mt-1 font-mono">
                                      {perm.id}
                                    </p>
                                  </div>
                                </div>

                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black shrink-0 ${
                                  checked 
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                    : "bg-slate-200/70 text-slate-500"
                                }`}>
                                  {checked ? "Granted" : "Denied"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0c34cd] text-white text-xs font-black hover:bg-[#0a2cb0] shadow-md shadow-blue-700/20 transition-all hover:scale-105 active:scale-95"
                  >
                    {roleModalMode === "create" ? "Create Role Definition" : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITE / ADD MEMBER MODAL */}
      {isInviteModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsInviteModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Invite New Team Member</h3>
                <p className="text-xs text-slate-500 font-normal">Assign role privileges and configure administrative access.</p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Sterling"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rachel.sterling@viobts.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Assign Role Privilege
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.permissions.length} perms)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Department / Squad
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud & GovSolutions"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0c34cd] focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newUser.sendInviteEmail}
                    onChange={(e) => setNewUser({ ...newUser, sendInviteEmail: e.target.checked })}
                    className="w-4 h-4 text-[#0c34cd] rounded border-slate-300 focus:ring-0"
                  />
                  <span className="text-xs text-slate-700 font-semibold">
                    Send secure invite link with 2FA setup token
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0c34cd] text-white text-xs font-black hover:bg-[#0a2cb0] shadow-md shadow-blue-700/20"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
