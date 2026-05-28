"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { trpc } from "~/trpc/client";

export default function ExplorePage() {
  const { data, isLoading, error } = trpc.form.exploreForms.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Client-side quick filtering matching modern document hubs
  const filteredForms = useMemo(() => {
    if (!data) return [];
    return data.filter((form) => {
      const matchesSearch =
        form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (form.description && form.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (activeCategory === "All") return matchesSearch;
      // Optional category logic fallback if form contains a tag/category field
      return matchesSearch;
    });
  }, [data, searchQuery, activeCategory]);

  // Premium loading state matching design system guidelines
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center gap-4 antialiased">
        <div className="relative flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#097FE8] opacity-30" />
          <span className="relative inline-flex rounded-full h-5 w-5 bg-[#097FE8]" />
        </div>
        <span className="font-sans text-xs font-semibold text-gray-400 tracking-wider uppercase animate-pulse">
          Indexing public nodes...
        </span>
      </div>
    );
  }

  // Error State Layout
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-4 border border-red-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Sync Pipeline Severed</h1>
        <p className="text-xs text-gray-500 max-w-xs mt-1">
          Could not establish context handshake with public schema index pools.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-xs font-semibold px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all active:scale-95"
        >
          Retry Handshake
        </button>
      </div>
    );
  }

  // Empty State Layout
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4 border border-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Public Directory Empty</h1>
        <p className="text-xs text-gray-500 max-w-xs mt-1">
          No live form schemas are currently exposed to the public aggregation engine.
        </p>
        <Link 
          href="/dashboard" 
          className="mt-4 inline-flex items-center text-xs font-bold text-white bg-[#097FE8] px-4 py-2.5 rounded-xl hover:bg-[#086ecb] transition-colors shadow-sm"
        >
          Expose a Schema Layout
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* GLOBAL CLEAN INJECTION FOR PREMIUM LAYOUT */}
      <style jsx global>{`
        body {
          background-color: #ffffff;
        }
        .search-focus-ring:focus {
          border-color: #097FE8 !important;
          box-shadow: 0 0 0 3px rgba(9, 127, 232, 0.12) !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#FFFFFF] text-gray-900 antialiased font-sans selection:bg-[#097FE8]/10 selection:text-[#097FE8]">
        
        {/* TOP DECORATIVE GRID ACCENT */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-[linear-gradient(to_bottom,rgba(9,127,232,0.03),transparent)] pointer-events-none border-b border-gray-100/40" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10 space-y-10">
          
          {/* CORE HEADER INTRO */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                <span className="w-1 h-1 rounded-full bg-[#097FE8]" /> Public Directory
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Explore Public <span className="text-[#097FE8]">Schemas</span>
              </h1>
              <p className="text-sm text-gray-500 max-w-xl font-medium">
                Discover and access structured interface templates deployed dynamically by cross-functional team creators.
              </p>
            </div>

            {/* QUICK LINK ACTION */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-200/60 px-4 py-2.5 rounded-xl self-start md:self-auto"
            >
              Go to Workspace Console
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* DYNAMIC UTILITIES LAYOUT (SEARCH + TABS) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 p-2 rounded-2xl border border-gray-100">
            {/* Minimal Filter Tabs */}
            <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
              {["All", "Popular", "Recent"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                    activeCategory === tab
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200/40"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Standard Pure Clean Search Input */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Query schema blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-gray-900 placeholder-gray-400 outline-none transition-all search-focus-ring"
              />
            </div>
          </div>

          {/* SYSTEM GRID INDEX */}
          {filteredForms.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/20">
              <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">No Query Matches Found</p>
              <p className="text-xs text-gray-400 mt-1">Adjust your search parameters and reload the pipeline index.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <Link key={form.id} href={`/f/${form.id}`} className="group block h-full">
                  <div className="h-full bg-[#FFFFFF] border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group-hover:border-gray-300 group-hover:shadow-md relative overflow-hidden">
                    
                    {/* TOP ACCENT LIP */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#097FE8] transition-colors" />

                    <div className="space-y-3">
                      {/* CARD LOGO METRIC BLOCK */}
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#097FE8] group-hover:bg-[#097FE8]/5 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          ID: {form.id.slice(0, 6)}
                        </span>
                      </div>

                      {/* STRUCTURAL TEXT DETAILS */}
                      <div className="space-y-1.5">
                        <h2 className="text-base font-bold text-gray-900 group-hover:text-[#097FE8] transition-colors line-clamp-1 tracking-tight">
                          {form.title}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium line-clamp-3 leading-relaxed">
                          {form.description && form.description.trim() !== "" 
                            ? form.description 
                            : "No operational system layout guidelines provided for this schema footprint entry."}
                        </p>
                      </div>
                    </div>

                    {/* METRICS & ROUTE EMBEDFOOTER */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6 text-[11px] font-semibold text-gray-400">
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="tabular-nums font-medium">
                          {form.createdAt ? new Date(form.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }) : "-"}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-gray-500 group-hover:text-[#097FE8] font-bold transition-colors">
                        Launch Node
                        <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}