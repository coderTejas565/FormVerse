"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { trpc } from "~/trpc/client";

export default function ExplorePage() {
  const { data, isLoading, error } = trpc.form.exploreForms.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // High-performance client matching engine
  const filteredForms = useMemo(() => {
    if (!data) return [];
    return data.filter((form) => {
      const targetString = `${form.title} ${form.description ?? ""}`.toLowerCase();
      const matchesSearch = targetString.includes(searchQuery.toLowerCase());
      
      if (activeCategory === "All") return matchesSearch;
      if (activeCategory === "Recent") {
        // Sort/Filter layout logic helper if necessary
        return matchesSearch;
      }
      return matchesSearch;
    });
  }, [data, searchQuery, activeCategory]);

  // Premium Shimmer Skeleton Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-gray-900 antialiased font-sans">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-10">
          <div className="space-y-3 max-w-xl animate-pulse">
            <div className="h-4 w-28 bg-gray-100 rounded-md" />
            <div className="h-9 w-3/4 bg-gray-100 rounded-xl" />
            <div className="h-4 w-full bg-gray-100 rounded-md" />
          </div>
          <div className="h-14 w-full bg-gray-50/80 border border-gray-100 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((skeletonId) => (
              <div key={skeletonId} className="h-56 bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="w-16 h-4 bg-gray-50 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-2/3 bg-gray-100 rounded-md animate-pulse" />
                  <div className="h-3 w-full bg-gray-100 rounded-md animate-pulse" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded-md animate-pulse" />
                </div>
                <div className="border-t border-gray-50 pt-4 flex justify-between">
                  <div className="w-20 h-3 bg-gray-100 rounded animate-pulse" />
                  <div className="w-16 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error Pipeline State Layout
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-4 border border-red-100/80 shadow-inner">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-sm font-bold text-gray-900 tracking-tight">Sync Pipeline Severed</h1>
        <p className="text-xs text-gray-400 max-w-xs mt-1 leading-relaxed">
          Could not establish context handshake with public Formverse schema hubs.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-xs font-bold px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 outline-none active:scale-95"
        >
          Retry Connection Handshake
        </button>
      </div>
    );
  }

  // Empty Global Dataset State Layout
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4 border border-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-sm font-bold text-gray-900 tracking-tight">No Schema Clusters Live</h1>
        <p className="text-xs text-gray-400 max-w-xs mt-1">
          No operational blueprint schemas are currently deployed to the public registry.
        </p>
        <Link 
          href="/dashboard" 
          className="mt-4 inline-flex items-center text-xs font-bold text-white bg-[#10B981] px-4 py-2.5 rounded-xl hover:bg-[#059669] transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] outline-none"
        >
          Deploy First Blueprint
        </Link>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        body { background-color: #ffffff; }
        .search-focus-ring:focus-within {
          border-color: #10B981 !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12) !important;
        }
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 2px; }
      `}</style>

      <div className="min-h-screen bg-[#FFFFFF] text-gray-900 antialiased font-sans selection:bg-[#10B981]/10 selection:text-[#10B981]">
        
        {/* TOP SYSTEM MESH HUD ACCENT */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.025),transparent)] pointer-events-none border-b border-gray-100/50" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10 space-y-8">
          
          {/* HEADER LAYER SYSTEM */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold tracking-wider text-gray-400 uppercase font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> Registry Node Live
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                Explore Form <span className="text-[#10B981]">Universes</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-500 max-w-xl font-medium leading-relaxed">
                Analyze, distribute, and integrate responsive interface layouts deployed across the global decentralized workspace engine.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition-all bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 outline-none active:scale-[0.98]"
            >
              Console Workspace
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* SYSTEM CONTROL UTILITY BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/60 p-2 rounded-2xl border border-gray-100">
            {/* Category Node Pipeline Switcher */}
            <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {["All", "Popular", "Recent", "Enterprise"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap focus:outline-none ${
                    activeCategory === tab
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200/60"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Utility Input + System View Switcher Combo */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="relative w-full md:w-72 search-focus-ring rounded-xl transition-all border border-gray-200 bg-white">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Filter configuration blueprints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent pl-9 pr-4 py-2 text-xs font-medium text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>

              {/* Layout Display Grid/List Switcher Toggle */}
              <div className="hidden sm:flex items-center gap-0.5 bg-gray-200/50 p-1 rounded-xl border border-gray-200/20">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-1.5 rounded-lg transition-all text-gray-400 ${viewMode === mode ? "bg-white text-gray-800 shadow-xs" : "hover:text-gray-600"}`}
                  >
                    {mode === "grid" ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC RESULTS CONTROLLER ARCHITECTURE */}
          {filteredForms.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-gray-50/30">
              <p className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Zero Clusters Configured</p>
              <p className="text-xs text-gray-400 mt-1">Refactor search queries to synchronize index pools.</p>
            </div>
          ) : viewMode === "grid" ? (
            /* ADVANCED DYNAMIC GRID DESIGN SYSTEM */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map((form) => (
                <Link key={form.id} href={`/f/${form.id}`} className="group block focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 rounded-2xl">
                  <div className="h-full bg-[#FFFFFF] border border-gray-200/70 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-lg relative overflow-hidden group-hover:-translate-y-0.5">
                    
                    {/* ACCENT BRAND MARKER */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent group-hover:bg-[#10B981] transition-all" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-[#10B981]/5 border border-gray-100 text-gray-400 group-hover:text-[#10B981] flex items-center justify-center transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                          ID: {form.id.slice(0, 6)}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h2 className="text-base font-bold text-gray-900 group-hover:text-[#10B981] transition-colors line-clamp-1 tracking-tight">
                          {form.title}
                        </h2>
                        <p className="text-xs text-gray-400 font-medium line-clamp-3 leading-relaxed">
                          {form.description && form.description.trim() !== "" 
                            ? form.description 
                            : "No operational metadata specifications mapped to this public template system layout."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6 text-[11px] font-bold text-gray-400">
                      <span className="font-mono tracking-tight text-gray-400/80">
                        {form.createdAt ? new Date(form.createdAt).toLocaleDateString(undefined, {
                          month: "short", day: "numeric", year: "numeric"
                        }) : "-"}
                      </span>
                      <div className="inline-flex items-center gap-1 text-gray-500 group-hover:text-[#10B981] transition-colors">
                        Deploy Client
                        <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* STREAMLINED LIST MATRIX SYSTEM */
            <div className="border border-gray-200/60 rounded-2xl bg-white overflow-hidden shadow-xs divide-y divide-gray-100">
              {filteredForms.map((form) => (
                <Link key={form.id} href={`/f/${form.id}`} className="group flex items-center justify-between p-4 hover:bg-gray-50/60 transition-all focus:outline-none focus:bg-gray-50">
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#10B981]/10 text-gray-400 group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#10B981] transition-colors truncate">
                        {form.title}
                      </h3>
                      <p className="text-xs text-gray-400 truncate max-w-xl font-medium">
                        {form.description ?? "No layout description."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0 text-xs font-bold text-gray-400">
                    <span className="font-mono text-[11px] hidden sm:inline">
                      {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "-"}
                    </span>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#10B981] transform group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
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