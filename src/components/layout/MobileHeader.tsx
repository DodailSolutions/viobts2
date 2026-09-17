"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Calendar } from "lucide-react";

export function MobileHeader() {
  const pathname = usePathname();

  // Do not render public mobile header on admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-[#071739]/95 backdrop-blur-md border-b border-blue-900/60 px-4 flex items-center justify-between shadow-lg shadow-black/10">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-24 flex items-center">
          <Image
            src="/images/vio-logo.png"
            alt="VIO"
            width={96}
            height={46}
            className="h-7 w-auto object-contain object-left"
            priority
          />
        </div>
      </Link>

      <div className="flex items-center gap-2.5">
        <Link
          href="/search"
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Search VIO capabilities"
        >
          <Search className="w-4 h-4" />
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-sm hover:opacity-90 transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Call</span>
        </Link>
      </div>
    </header>
  );
}
