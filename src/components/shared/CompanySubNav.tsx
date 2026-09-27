"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Target, Compass, Sparkles } from "lucide-react";

interface SubNavProps {
  currentTab: "who-we-are" | "mission" | "vision";
}

export function CompanySubNav({ currentTab }: SubNavProps) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "who-we-are",
      label: "Who We Are",
      href: "/who-we-are",
      icon: Users,
      badge: "OVERVIEW",
      active: currentTab === "who-we-are" || pathname === "/who-we-are",
    },
    {
      id: "mission",
      label: "Our Mission",
      href: "/our-mission",
      icon: Target,
      badge: "PURPOSE",
      active: currentTab === "mission" || pathname === "/our-mission",
    },
    {
      id: "vision",
      label: "Our Vision",
      href: "/vision",
      icon: Compass,
      badge: "HORIZON",
      active: currentTab === "vision" || pathname === "/vision" || pathname === "/our-vision",
    },
  ];

  return (
    <div className="w-full flex justify-center py-4 px-4">
      <nav
        aria-label="Company section navigation"
        className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100/90 backdrop-blur-md border border-slate-200/90 shadow-xs gap-1 sm:gap-2"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                tab.active
                  ? "bg-[#0c34cd] text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                  : "text-slate-600 hover:text-[#0c34cd] hover:bg-white/80"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${tab.active ? "text-cyan-300" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              <span
                className={`hidden md:inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                  tab.active
                    ? "bg-white/20 text-cyan-200"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {tab.badge}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
