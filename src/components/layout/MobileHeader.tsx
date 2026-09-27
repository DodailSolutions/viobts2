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
    <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-[#0c34cd]/95 backdrop-blur-md border-b border-white/20 px-4 flex items-center justify-between shadow-lg shadow-[#0c34cd]/20">
      <Link href="/" className="flex items-center py-1">
        <Image
          src="/images/vio-logo.png"
          alt="VIO"
          width={100}
          height={48}
          className="h-7 w-auto object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-2">
        <a
          href="https://www.linkedin.com/company/viobts/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-colors"
          aria-label="VIO Official LinkedIn"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>

        <Link
          href="/search"
          className="p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-colors"
          aria-label="Search VIO capabilities"
        >
          <Search className="w-4 h-4" />
        </Link>

        <Link
          href="https://calendly.com/viobts/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0c34cd] font-extrabold text-xs shadow-md shadow-black/10 hover:bg-cyan-50 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-[#0c34cd]" />
          <span>Book Call</span>
        </Link>
      </div>
    </header>
  );
}
