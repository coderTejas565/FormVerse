"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trpc } from "~/trpc/client";

export default function ResponsesClient() {
  const searchParams = useSearchParams();
  const targetFormId = searchParams.get("formId");

  const { data = [], isLoading } = trpc.form.getResponses.useQuery();

  // Premium Shimmer Skeleton Loading Table
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-gray-900 antialiased font-sans">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-20 bg-gray-100 rounded-md" />
            <div className="h-8 w-64 bg-gray-100 rounded-xl" />
          </div>
          <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
            <div className="h-12 bg-gray-50 border-b border-gray-100" />
            {[1, 2, 3].map((rowId) => (
              <div key={rowId} className="p-6 border-b border-gray-50 flex items-start gap-6 animate-pulse">
                <div className="w-1/4 space-y-2"><div className="h-4 bg-gray-100 rounded w-3/4" /></div>
                <div className="w-1/4 space-y-2"><div className="h-4 bg-gray-100 rounded w-1/2" /></div>
                <div className="w-2/4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredResponses = data;
  const activeFormTitle = filteredResponses.length > 0 ? filteredResponses[0]?.formTitle : null;

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #ffffff;
        }
        .focus-brand-ring:focus {
          border-color: #034F46 !important;
          box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.12) !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#FFFFFF] text-gray-900 antialiased font-sans selection:bg-[#034F46]/10 selection:text-[#034F46]">
        
        {/* DECORATIVE TOP GRADIENT ACCENT */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[linear-gradient(to_bottom,rgba(3,79,70,0.02),transparent)] pointer-events-none border-b border-gray-100/40" />

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 space-y-8">
          
          {/* HEADER SECTOR LAYOUT */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard" 
                  className="text-xs font-bold text-gray-400 hover:text-[#034F46] transition-colors tracking-wide uppercase font-mono"
                >
                  Dashboard
                </Link>
                <span className="text-gray-300 text-xs">/</span>
                <span className="text-xs font-semibold text-gray-400 font-mono uppercase">Log Pipeline</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mt-1">
                {activeFormTitle ?? "Form Responses"}
              </h1>
            </div>

            {targetFormId && (
              <Link 
                href="/responses" 
                className="inline-flex items-center text-xs font-bold text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl transition-all shadow-xs focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 outline-none self-start sm:self-auto active:scale-95"
              >
                Clear Context Filter
              </Link>
            )}
          </div>

          {/* DYNAMIC CONTENT SWITCHER */}
          {!filteredResponses.length ? (
            /* EMPTY LOGGER LAYOUT STATE */
            <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-gray-50/20">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a2 2 0 012-2h2a2 2 0 012 2v4a13.916 13.916 0 001.408 6.442l.053.088m-4.7-2.112a13.945 13.945 0 01-1.124-4.335m4.715 4.335a13.946 13.946 0 001.124-4.335M7 11c.53 0 1.03-.21 1.41-.59A2.011 2.011 0 009 9V7M17 11a2.011 2.011 0 01-.59 1.41c-.38.38-.88.59-1.41.59V9a2 2 0 012-2v2z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Zero Payload Logged</p>
              <p className="text-xs text-gray-400/80 mt-1">This context pipeline has not collected any structured telemetry responses.</p>
            </div>
          ) : (
            /* PROFESSIONAL LOG ENTRY GRID-TABLE */
            <div className="border border-gray-200/80 rounded-2xl bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold tracking-wider text-gray-400 uppercase font-mono">
                      <th className="py-4 px-6 font-semibold">Form Target Reference</th>
                      <th className="py-4 px-6 font-semibold">Timestamp Node</th>
                      <th className="py-4 px-6 font-semibold">Payload Content Schema</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-xs text-gray-600 font-medium">
                    {filteredResponses.map((response) => (
                      <tr 
                        key={response.responseId} 
                        className="hover:bg-gray-50/30 transition-colors group"
                      >
                        {/* FORM MATCH ELEMENT */}
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-center gap-2 max-w-[200px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#034F46] transition-colors shrink-0" />
                            <span className="text-gray-900 font-bold tracking-tight truncate">
                              {response.formTitle}
                            </span>
                          </div>
                        </td>

                        {/* TIME EMBED ELEMENT */}
                        <td className="py-5 px-6 align-top text-gray-400 font-mono tracking-tight whitespace-nowrap">
                          {response.submittedAt ? new Date(response.submittedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : "-"}
                        </td>

                        <td className="py-5 px-6 align-top">
                          <div className="space-y-2 max-w-2xl">
                            {response.answers.map((answer) => (
                              <div 
                                key={answer.fieldId} 
                                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 bg-gray-50/50 hover:bg-gray-50 border border-gray-200/40 rounded-xl px-3 py-2 transition-all"
                              >
                                <span className="font-mono text-[10px] font-bold text-gray-400 bg-white border border-gray-200/60 rounded px-1.5 py-0.5 shadow-2xs tracking-wider uppercase shrink-0 self-start">
                                  KEY: {answer.fieldId.slice(0, 6)}
                                </span>
                                <span className="text-gray-700 leading-relaxed break-all font-sans text-xs pt-0.5">
                                  {answer.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}