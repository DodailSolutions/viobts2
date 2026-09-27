"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Plus,
  Trash2,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Layers,
  Building2,
  Home,
  Calendar,
  Menu as MenuIcon,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mic,
  Users,
  Phone,
  Sparkles,
  Search,
  Eye,
  Smartphone,
  Monitor,
  RotateCcw,
  CheckCircle2,
  Sliders,
  CornerDownRight,
  Edit2,
  X
} from "lucide-react";
import {
  cmsStore,
  NavigationMenu,
  MenuItem,
  MenuPlacement,
  PageItem,
  ServiceItem,
  IndustryItem
} from "@/lib/data";

const PLACEMENT_METADATA: Record<MenuPlacement, { title: string; desc: string; icon: any; maxRecommended?: number }> = {
  header_main: {
    title: "Desktop Header Navigation",
    desc: "Primary horizontal top navigation with multi-column mega menus",
    icon: Monitor,
    maxRecommended: 7
  },
  header_cta: {
    title: "Header Right Action (CTA)",
    desc: "High-contrast action button on top right of desktop header",
    icon: Sparkles,
    maxRecommended: 1
  },
  mobile_dock: {
    title: "Mobile Bottom Dock Bar",
    desc: "Persistent native-like bottom dock bar on mobile viewports (5 slots recommended)",
    icon: Smartphone,
    maxRecommended: 5
  },
  mobile_drawer: {
    title: "Mobile Slideout Drawer",
    desc: "Comprehensive navigation links displayed when mobile drawer is opened",
    icon: MenuIcon
  },
  footer_primary: {
    title: "Footer Primary Column",
    desc: "Main navigation column in global website footer",
    icon: Layers
  },
  footer_secondary: {
    title: "Footer Secondary Column",
    desc: "Secondary resources or company column in global website footer",
    icon: Building2
  },
  unassigned: {
    title: "Custom / Unassigned",
    desc: "Standalone or specialized landing page menus not bound to global layout slots",
    icon: Sliders
  }
};

const AVAILABLE_ICONS = [
  "Home", "Layers", "Building2", "Calendar", "Menu", "Briefcase", "BookOpen", "Mic", "Users", "Phone", "Sparkles", "Search"
];

function getIconComponent(name?: string) {
  switch (name) {
    case "Home": return Home;
    case "Layers": return Layers;
    case "Building2": return Building2;
    case "Calendar": return Calendar;
    case "Menu": return MenuIcon;
    case "Briefcase": return Briefcase;
    case "BookOpen": return BookOpen;
    case "Mic": return Mic;
    case "Users": return Users;
    case "Phone": return Phone;
    case "Sparkles": return Sparkles;
    case "Search": return Search;
    default: return null;
  }
}

export default function AdminMenusPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [menus, setMenus] = useState<NavigationMenu[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  // Editing Item Modal / Form
  const [editingItem, setEditingItem] = useState<{
    item: MenuItem;
    parentId?: string; // if child of an item
  } | null>(null);

  // Quick Add Form
  const [quickAddType, setQuickAddType] = useState<"page" | "service" | "industry" | "custom">("page");
  const [customLabel, setCustomLabel] = useState("");
  const [customHref, setCustomHref] = useState("");
  const [customBadge, setCustomBadge] = useState("");
  const [customIcon, setCustomIcon] = useState("Layers");
  const [customHighlight, setCustomHighlight] = useState(false);
  const [customTarget, setCustomTarget] = useState<"_self" | "_blank">("_self");

  // CMS reference sources
  const [allPages, setAllPages] = useState<PageItem[]>([]);
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [allIndustries, setAllIndustries] = useState<IndustryItem[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const loadedMenus = cmsStore.getMenus();
    setMenus(loadedMenus);
    if (loadedMenus.length > 0) {
      setSelectedMenuId(loadedMenus[0].id);
    }
    setAllPages(cmsStore.getPages());
    setAllServices(cmsStore.getServices());
    setAllIndustries(cmsStore.getIndustries());
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const currentMenu = useMemo(() => {
    return menus.find((m) => m.id === selectedMenuId) || menus[0];
  }, [menus, selectedMenuId]);

  if (!isMounted) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div className="h-10 bg-slate-200 rounded w-1/3 animate-pulse" />
        <div className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-80 bg-slate-100 rounded-2xl animate-pulse md:col-span-2" />
        </div>
      </div>
    );
  }

  // Handle Save Menu
  const handleSaveMenu = (updatedMenu: NavigationMenu) => {
    cmsStore.saveMenu(updatedMenu);
    setMenus(cmsStore.getMenus());
    showNotification(`Menu "${updatedMenu.name}" saved successfully! Front-end navigation updated.`);
  };

  // Handle Create New Menu
  const handleCreateNewMenu = () => {
    const created = cmsStore.createMenu({
      name: "New Custom Menu",
      slug: `custom-nav-${Date.now().toString().slice(-4)}`,
      description: "Custom navigation menu",
      placement: "unassigned",
      isActive: true,
      items: [
        {
          id: `item-${Date.now()}-1`,
          label: "Home",
          href: "/",
          order: 1,
          icon: "Home"
        }
      ]
    });
    const updated = cmsStore.getMenus();
    setMenus(updated);
    setSelectedMenuId(created.id);
    showNotification("New navigation menu created!");
  };

  // Handle Delete Menu
  const handleDeleteMenu = (menuId: string) => {
    if (menus.length <= 1) {
      alert("At least one navigation menu must be maintained in the system.");
      return;
    }
    const toDelete = menus.find((m) => m.id === menuId);
    if (!confirm(`Are you sure you want to delete menu "${toDelete?.name}"?`)) {
      return;
    }
    cmsStore.deleteMenu(menuId);
    const updated = cmsStore.getMenus();
    setMenus(updated);
    setSelectedMenuId(updated[0].id);
    showNotification(`Menu deleted.`);
  };

  // Handle Placement Change for current menu
  const handlePlacementChange = (newPlacement: MenuPlacement) => {
    if (!currentMenu) return;
    cmsStore.updateMenuPlacement(currentMenu.id, newPlacement);
    const updated = cmsStore.getMenus();
    setMenus(updated);
    showNotification(`Placement updated to "${PLACEMENT_METADATA[newPlacement]?.title || newPlacement}".`);
  };

  // Move Item Up or Down
  const handleMoveItem = (index: number, direction: "up" | "down") => {
    if (!currentMenu) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentMenu.items.length) return;

    const newItems = [...currentMenu.items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updated = {
      ...currentMenu,
      items: newItems.map((item, idx) => ({ ...item, order: idx + 1 }))
    };
    handleSaveMenu(updated);
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    if (!currentMenu) return;
    const newItems = currentMenu.items.filter((item) => item.id !== itemId);
    const updated = {
      ...currentMenu,
      items: newItems.map((item, idx) => ({ ...item, order: idx + 1 }))
    };
    handleSaveMenu(updated);
  };

  // Add Item to Menu
  const handleAddItem = (item: Omit<MenuItem, "id" | "order">) => {
    if (!currentMenu) return;
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      order: currentMenu.items.length + 1
    };
    const updated = {
      ...currentMenu,
      items: [...currentMenu.items, newItem]
    };
    handleSaveMenu(updated);
    setCustomLabel("");
    setCustomHref("");
    setCustomBadge("");
    setCustomHighlight(false);
  };

  // Add Child Item to a parent item
  const handleAddChildItem = (parentId: string, label: string, href: string) => {
    if (!currentMenu) return;
    const newItems = currentMenu.items.map((item) => {
      if (item.id === parentId) {
        const children = item.children || [];
        const newChild: MenuItem = {
          id: `child-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          label,
          href,
          order: children.length + 1,
          target: "_self"
        };
        return { ...item, children: [...children, newChild] };
      }
      return item;
    });
    handleSaveMenu({ ...currentMenu, items: newItems });
  };

  // Remove Child Item
  const handleRemoveChildItem = (parentId: string, childId: string) => {
    if (!currentMenu) return;
    const newItems = currentMenu.items.map((item) => {
      if (item.id === parentId && item.children) {
        return {
          ...item,
          children: item.children.filter((c) => c.id !== childId)
        };
      }
      return item;
    });
    handleSaveMenu({ ...currentMenu, items: newItems });
  };

  // Quick Add Presets
  const handleQuickAddPage = (page: PageItem) => {
    handleAddItem({
      label: page.title,
      href: page.slug === "home" ? "/" : `/${page.slug}`,
      target: "_self",
      icon: page.slug === "home" ? "Home" : "BookOpen"
    });
  };

  const handleQuickAddService = (srv: ServiceItem) => {
    handleAddItem({
      label: srv.title,
      href: `/services/${srv.slug}`,
      target: "_self",
      icon: "Layers"
    });
  };

  const handleQuickAddIndustry = (ind: IndustryItem) => {
    handleAddItem({
      label: ind.title,
      href: `/industries/${ind.slug}`,
      target: "_self",
      icon: "Building2"
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#0c34cd] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0c34cd] border border-blue-200">
              Navigation Architecture & Placements
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Menu Studio & Placement Manager
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Build bespoke navigation hierarchies, nested dropdowns, and dynamically bind menus to Desktop Header, Mobile Dock, CTA, or Drawers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm("Reset all menus and placement configurations to default state?")) {
                cmsStore.resetMenus();
                setMenus(cmsStore.getMenus());
                showNotification("All navigation menus reset to default.");
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            title="Reset to initial state"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleCreateNewMenu}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0c34cd] hover:bg-[#0a2cb0] shadow-md shadow-blue-900/10 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Menu</span>
          </button>
        </div>
      </div>

      {/* Placement Matrix Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 text-white shadow-xl border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-300" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white">
              Global Layout Placement Assignments
            </h2>
          </div>
          <span className="text-[11px] text-cyan-200/80 font-mono">
            Active Frontend Placements
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(["header_main", "header_cta", "mobile_dock", "mobile_drawer"] as MenuPlacement[]).map((placement) => {
            const meta = PLACEMENT_METADATA[placement];
            const Icon = meta.icon;
            const assignedMenu = menus.find((m) => m.placement === placement && m.isActive);

            return (
              <div
                key={placement}
                className="bg-white/10 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-cyan-200 flex items-center gap-1">
                      <Icon className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{meta.title}</span>
                    </span>
                    <span className={`w-2 h-2 rounded-full ${assignedMenu ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </div>
                  <p className="text-[11px] text-white/70 line-clamp-1 mb-2">
                    {meta.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                    {assignedMenu ? assignedMenu.name : "None assigned"}
                  </span>
                  {assignedMenu && (
                    <button
                      onClick={() => setSelectedMenuId(assignedMenu.id)}
                      className="text-[10px] font-bold text-cyan-300 hover:text-white underline"
                    >
                      Edit Menu
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Menu Selector & Metadata & Quick Add (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Menu Selector Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#0c34cd]" />
                <span>Select Menu to Edit</span>
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {menus.length} Menus
              </span>
            </div>

            <div className="space-y-2">
              {menus.map((menu) => {
                const isSelected = menu.id === selectedMenuId;
                const placementMeta = PLACEMENT_METADATA[menu.placement];
                return (
                  <button
                    key={menu.id}
                    onClick={() => setSelectedMenuId(menu.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50/80 border-[#0c34cd] text-[#0c34cd] shadow-xs"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{menu.name}</span>
                        {menu.isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {menu.items.length} items •{" "}
                        <span className="font-semibold text-blue-600">
                          {placementMeta?.title || menu.placement}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {menu.placement === "unassigned" ? "Custom" : "Assigned"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Metadata & Placement Control */}
          {currentMenu && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Menu Configuration</span>
                <span className="text-[11px] font-mono text-slate-400">ID: {currentMenu.id}</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Menu Display Name
                </label>
                <input
                  type="text"
                  value={currentMenu.name}
                  onChange={(e) => {
                    const updated = { ...currentMenu, name: e.target.value };
                    handleSaveMenu(updated);
                  }}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Layout Placement Slot
                </label>
                <select
                  value={currentMenu.placement}
                  onChange={(e) => handlePlacementChange(e.target.value as MenuPlacement)}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd] bg-white font-medium"
                >
                  <option value="header_main">Desktop Header Navigation</option>
                  <option value="header_cta">Header Right Action (CTA)</option>
                  <option value="mobile_dock">Mobile Bottom Dock Bar</option>
                  <option value="mobile_drawer">Mobile Slideout Drawer</option>
                  <option value="footer_primary">Footer Primary Column</option>
                  <option value="footer_secondary">Footer Secondary Column</option>
                  <option value="unassigned">Custom / Inactive (Unassigned)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Assigning this menu will automatically bind it to the target frontend container.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  value={currentMenu.description || ""}
                  onChange={(e) => {
                    const updated = { ...currentMenu, description: e.target.value };
                    handleSaveMenu(updated);
                  }}
                  placeholder="e.g. Primary site-wide navigation"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentMenu.isActive}
                    onChange={(e) => {
                      const updated = { ...currentMenu, isActive: e.target.checked };
                      handleSaveMenu(updated);
                    }}
                    className="w-4 h-4 text-[#0c34cd] rounded"
                  />
                  <span className="text-xs font-bold text-slate-700">Active Status</span>
                </label>

                <button
                  type="button"
                  onClick={() => handleDeleteMenu(currentMenu.id)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Menu</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Add from CMS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Plus className="w-4 h-4 text-[#0c34cd]" />
              <span>Quick Add to Menu</span>
            </h3>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              {(["page", "service", "industry", "custom"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setQuickAddType(type)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${
                    quickAddType === type
                      ? "bg-white text-[#0c34cd] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {quickAddType === "page" && (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {allPages.map((pg) => (
                  <div
                    key={pg.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{pg.title}</p>
                      <p className="text-[10px] text-slate-500">/{pg.slug}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickAddPage(pg)}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0c34cd] font-bold text-[11px] hover:bg-blue-100"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {quickAddType === "service" && (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {allServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{srv.title}</p>
                      <p className="text-[10px] text-slate-500">/services/{srv.slug}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickAddService(srv)}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0c34cd] font-bold text-[11px] hover:bg-blue-100"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {quickAddType === "industry" && (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {allIndustries.map((ind) => (
                  <div
                    key={ind.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{ind.title}</p>
                      <p className="text-[10px] text-slate-500">/industries/{ind.slug}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickAddIndustry(ind)}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0c34cd] font-bold text-[11px] hover:bg-blue-100"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {quickAddType === "custom" && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Item Label / Title *
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="e.g. Schedule Consultation"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    URL or Path *
                  </label>
                  <input
                    type="text"
                    value={customHref}
                    onChange={(e) => setCustomHref(e.target.value)}
                    placeholder="/contact or https://calendly.com/..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Badge Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={customBadge}
                      onChange={(e) => setCustomBadge(e.target.value)}
                      placeholder="NEW / HOT"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Icon
                    </label>
                    <select
                      value={customIcon}
                      onChange={(e) => setCustomIcon(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd] bg-white"
                    >
                      {AVAILABLE_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={customTarget === "_blank"}
                      onChange={(e) => setCustomTarget(e.target.checked ? "_blank" : "_self")}
                      className="w-3.5 h-3.5 text-[#0c34cd] rounded"
                    />
                    <span className="text-slate-700">Open in New Tab</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={customHighlight}
                      onChange={(e) => setCustomHighlight(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#0c34cd] rounded"
                    />
                    <span className="text-slate-700 font-bold">CTA Button</span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={!customLabel || !customHref}
                  onClick={() => {
                    handleAddItem({
                      label: customLabel,
                      href: customHref,
                      badge: customBadge || undefined,
                      icon: customIcon,
                      target: customTarget,
                      highlight: customHighlight
                    });
                  }}
                  className="w-full py-2 rounded-xl bg-[#0c34cd] text-white font-bold text-xs hover:bg-[#0a2cb0] disabled:opacity-50 transition-colors shadow-xs"
                >
                  + Add Custom Link to Menu
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Menu Hierarchy & Interactive Tree (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentMenu && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {currentMenu.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#0c34cd]">
                      {PLACEMENT_METADATA[currentMenu.placement]?.title || currentMenu.placement}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Drag or use arrows to rearrange items. Expand parent items to manage multi-level dropdowns.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("desktop")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        previewMode === "desktop"
                          ? "bg-white text-[#0c34cd] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("mobile")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        previewMode === "mobile"
                          ? "bg-white text-[#0c34cd] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleSaveMenu(currentMenu)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0c34cd] hover:bg-[#0a2cb0] flex items-center gap-1.5 shadow-md shadow-blue-900/10"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Menu</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-6 space-y-3">
                {currentMenu.items.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                    <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">This menu is currently empty</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Use the "Quick Add to Menu" panel on the left to add pages, services, or custom URLs.
                    </p>
                  </div>
                ) : (
                  currentMenu.items.map((item, index) => {
                    const Icon = getIconComponent(item.icon);
                    const hasChildren = item.children && item.children.length > 0;

                    return (
                      <div
                        key={item.id}
                        className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
                      >
                        {/* Parent Item Row */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Order indicator */}
                            <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                              {index + 1}
                            </span>

                            {Icon && (
                              <div className="p-1.5 rounded-lg bg-blue-50 text-[#0c34cd] border border-blue-100">
                                <Icon className="w-4 h-4" />
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-cyan-100 text-cyan-800 border border-cyan-200">
                                    {item.badge}
                                  </span>
                                )}
                                {item.highlight && (
                                  <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-blue-600 text-white">
                                    CTA Highlight
                                  </span>
                                )}
                                {item.target === "_blank" && (
                                  <span title="Opens in new tab">
                                    <ExternalLink className="w-3 h-3 text-slate-400" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {item.href}
                              </p>
                            </div>
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center gap-1">
                            {/* Move Up / Down */}
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveItem(index, "up")}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 disabled:opacity-30"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === currentMenu.items.length - 1}
                              onClick={() => handleMoveItem(index, "down")}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 disabled:opacity-30"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Item */}
                            <button
                              type="button"
                              onClick={() => setEditingItem({ item })}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-[#0c34cd] hover:bg-white border border-slate-200"
                              title="Edit item attributes"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Item */}
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-white border border-slate-200"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Child Items / Nested Sub-menu */}
                        <div className="pl-6 border-l-2 border-blue-200 space-y-2 mt-2">
                          {hasChildren && (
                            <div className="space-y-1.5">
                              {item.children!.map((child) => (
                                <div
                                  key={child.id}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                                    <div>
                                      <span className="font-bold text-slate-800">{child.label}</span>
                                      <span className="text-[10px] text-slate-400 ml-2 font-mono">{child.href}</span>
                                    </div>
                                    {child.badge && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleRemoveChildItem(item.id, child.id)}
                                    className="p-1 text-slate-400 hover:text-red-600"
                                    title="Remove sub-item"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Sub-Item Inline Form */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Sub-item title..."
                              id={`sub-label-${item.id}`}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white flex-1 focus:outline-none focus:ring-1 focus:ring-[#0c34cd]"
                            />
                            <input
                              type="text"
                              placeholder="/path or url..."
                              id={`sub-href-${item.id}`}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white flex-1 focus:outline-none focus:ring-1 focus:ring-[#0c34cd]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const labelInput = document.getElementById(`sub-label-${item.id}`) as HTMLInputElement;
                                const hrefInput = document.getElementById(`sub-href-${item.id}`) as HTMLInputElement;
                                if (labelInput?.value && hrefInput?.value) {
                                  handleAddChildItem(item.id, labelInput.value, hrefInput.value);
                                  labelInput.value = "";
                                  hrefInput.value = "";
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0c34cd] text-xs font-bold hover:bg-blue-100 transition-colors whitespace-nowrap"
                            >
                              + Add Sub-Item
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Live Navigation Visualizer */}
          {currentMenu && (
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-300" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Live Rendering Preview: {previewMode === "desktop" ? "Desktop Header Bar" : "Mobile Navigation"}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-cyan-200/80">
                  Target: {PLACEMENT_METADATA[currentMenu.placement]?.title}
                </span>
              </div>

              {previewMode === "desktop" ? (
                <div className="bg-[#0c34cd] p-4 rounded-xl border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold tracking-tight text-white">VIO</span>
                    <span className="text-[10px] text-white/60 tracking-wider">PREVIEW</span>
                  </div>

                  <nav className="flex items-center gap-2">
                    {currentMenu.items.map((item) => (
                      <div key={item.id} className="relative group">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1 ${
                            item.highlight
                              ? "bg-white text-[#0c34cd] shadow-md"
                              : "text-white/90 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {item.label}
                          {item.children && item.children.length > 0 && (
                            <ChevronDown className="w-3 h-3 text-white/70" />
                          )}
                          {item.badge && (
                            <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black bg-cyan-300 text-blue-950">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </nav>
                </div>
              ) : (
                <div className="max-w-sm mx-auto bg-[#0c34cd] p-3 rounded-2xl border border-white/20 flex items-center justify-around shadow-2xl">
                  {currentMenu.items.slice(0, 5).map((item) => {
                    const Icon = getIconComponent(item.icon) || Home;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center justify-center p-1 ${
                          item.highlight
                            ? "bg-white text-[#0c34cd] px-3 py-1 rounded-full font-bold shadow-md"
                            : "text-white/80"
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-0.5" />
                        <span className="text-[9px] font-bold">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-up space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-[#0c34cd]" />
                <span>Edit Navigation Item</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Item Label</label>
              <input
                type="text"
                value={editingItem.item.label}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, label: e.target.value }
                  });
                }}
                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Destination URL / Path</label>
              <input
                type="text"
                value={editingItem.item.href}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, href: e.target.value }
                  });
                }}
                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  value={editingItem.item.badge || ""}
                  onChange={(e) => {
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, badge: e.target.value || undefined }
                    });
                  }}
                  placeholder="e.g. NEW"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
                <select
                  value={editingItem.item.icon || "Layers"}
                  onChange={(e) => {
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, icon: e.target.value }
                    });
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0c34cd] bg-white"
                >
                  {AVAILABLE_ICONS.map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={editingItem.item.target === "_blank"}
                  onChange={(e) => {
                    setEditingItem({
                      ...editingItem,
                      item: {
                        ...editingItem.item,
                        target: e.target.checked ? "_blank" : "_self"
                      }
                    });
                  }}
                  className="w-3.5 h-3.5 text-[#0c34cd] rounded"
                />
                <span className="text-slate-700">Open in New Tab</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={!!editingItem.item.highlight}
                  onChange={(e) => {
                    setEditingItem({
                      ...editingItem,
                      item: {
                        ...editingItem.item,
                        highlight: e.target.checked
                      }
                    });
                  }}
                  className="w-3.5 h-3.5 text-[#0c34cd] rounded"
                />
                <span className="text-slate-700 font-bold">CTA Button Styling</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!currentMenu) return;
                  const newItems = currentMenu.items.map((i) =>
                    i.id === editingItem.item.id ? editingItem.item : i
                  );
                  handleSaveMenu({ ...currentMenu, items: newItems });
                  setEditingItem(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#0c34cd] text-white text-xs font-bold hover:bg-[#0a2cb0] shadow-md shadow-blue-900/10"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
