import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-28 pb-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-bold text-brand-cyan tracking-widest uppercase">
          Error 404
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The requested enterprise blueprint or page has moved, or does not exist in the current architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-white transition-all shadow-glow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-panel text-slate-300 hover:text-white font-semibold text-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Platform</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
