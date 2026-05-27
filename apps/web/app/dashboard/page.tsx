"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";
import ResponsesChart from "~/components/ResponsesChart";

export default function DashboardPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Core Data Queries
  const {
    data: forms,
    isLoading: formsLoading,
    error: formsError,
  } = trpc.form.getMyForms.useQuery();

  const analytics = trpc.form.analytics.useQuery();

  // Optimistic/Loading invalidation wrapper
  const handleMutationSuccess = () => {
    void utils.form.getMyForms.invalidate();
    void utils.form.analytics.invalidate();
  };

  const publish = trpc.form.publishForm.useMutation({
    onSuccess: handleMutationSuccess,
  });

  const unpublish = trpc.form.unpublishForm.useMutation({
    onSuccess: handleMutationSuccess,
  });

  useEffect(() => {
    if (formsError || analytics.error) {
      router.push("/sign-in");
    }
  }, [formsError, analytics.error, router]);

  // Client-side search filtration
  const filteredForms = useMemo(() => {
    if (!forms) return [];
    return forms.filter((form) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [forms, searchQuery]);

  // Copy-to-Clipboard logic
  const handleCopyUrl = async (formId: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/f/${formId}`);
      setCopiedId(formId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link destination.", err);
    }
  };

  if (formsLoading || analytics.isLoading) {
    return (
      <div className="min-h-screen bg-workspace flex flex-col items-center justify-center gap-3 antialiased">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034F46] opacity-40" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#034F46]" />
        </div>
        <span className="font-sans text-xs font-medium text-brand-muted tracking-wide animate-pulse">
          Loading workspace...
        </span>
      </div>
    );
  }

  return (
    <>
      {/* PREMIUM INTERACTIVE FORM PATTERNS */}
      <style jsx global>{`
        .premium-search-field {
          width: 100% !important;
          background-color: rgba(3, 79, 70, 0.06) !important;
          border: 1px solid rgba(3, 79, 70, 0.2) !important;
          /* CHANGED: Forced input color to high-contrast dark slate */
          color: #111827 !important;
          font-weight: 500 !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }
        .premium-search-field:hover {
          background-color: rgba(3, 79, 70, 0.09) !important;
          border-color: rgba(3, 79, 70, 0.35) !important;
        }
        .premium-search-field:focus {
          /* CHANGED: Background shifts clean white on active focus */
          background-color: #ffffff !important;
          border-color: #034F46 !important;
          box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.15) !important;
        }
        .premium-search-field::placeholder {
          /* CHANGED: Increased contrast on placeholder text */
          color: rgba(17, 24, 39, 0.45) !important;
        }
      `}</style>

      <div className="min-h-screen bg-workspace p-6 md:p-10 lg:p-12 text-brand-text antialiased font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border/40 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded bg-[#034F46] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#E6EEDB] rounded-sm" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-brand-text">
                  Form<span className="text-[#034F46]">Verse</span>
                </h1>
                <span className="bg-[#034F46]/10 text-[#034F46] font-sans text-[10px] px-2 py-0.5 rounded font-bold tracking-wide border border-[#034F46]/10">
                  PRO
                </span>
              </div>
              <p className="text-xs text-brand-muted max-w-xl">
                Review automated workflow performance, aggregate submissions, and build high-conversion distribution forms.
              </p>
            </div>

            <Link
              href="/create-form"
              className="inline-flex items-center justify-center bg-[#034F46] text-[#E6EEDB] font-semibold text-xs px-5 py-3 rounded-xl shadow-sm transition-all duration-200 hover:bg-[#023b34] active:scale-[0.98] text-center"
            >
              Create New Form
            </Link>
          </div>

          {/* BENTO LAYOUT METRICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* METRIC 1: TOTAL FORMS */}
            <div className="bg-canvas border border-brand-border/50 rounded-2xl p-6 transition-all duration-200 hover:border-brand-border/80 hover:shadow-md group relative">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Total Forms
                </p>
                <div className="text-brand-muted group-hover:text-[#034F46] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-brand-text mt-3 tracking-tight">
                {analytics.data?.totalForms ?? 0}
              </h2>
              <p className="text-xs text-brand-muted mt-1.5">Created inside this workspace</p>
            </div>

            {/* METRIC 2: TOTAL RESPONSES */}
            <div className="bg-canvas border border-brand-border/50 rounded-2xl p-6 transition-all duration-200 hover:border-brand-border/80 hover:shadow-md group relative">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Total Responses
                </p>
                <div className="text-brand-muted group-hover:text-emerald-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-brand-text mt-3 tracking-tight">
                {analytics.data?.totalResponses ?? 0}
              </h2>
              <p className="text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live entry pipelines active
              </p>
            </div>

            {/* METRIC 3: RECENT CHANGES */}
            <div className="bg-canvas border border-brand-border/50 rounded-2xl p-6 transition-all duration-200 hover:border-brand-border/80 hover:shadow-md group relative">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Recent Changes
                </p>
                <div className="text-brand-muted group-hover:text-amber-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-brand-text mt-3 tracking-tight">
                {analytics.data?.recentForms?.length ?? 0}
              </h2>
              <p className="text-xs text-brand-muted mt-1.5">Updated within the last 30 days</p>
            </div>

            {/* TIMELINE VISUALIZATION */}
            <div className="lg:col-span-2 bg-canvas border border-brand-border/50 rounded-2xl p-6 transition-all duration-200 hover:border-brand-border/80 hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#034F46]" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    Submission Timeline
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-brand-muted uppercase bg-brand-text/5 px-2 py-0.5 rounded">Analytics Overview</span>
              </div>
              <div className="h-64 flex flex-col justify-end opacity-95 hover:opacity-100 transition-opacity duration-200">
                <ResponsesChart data={analytics.data?.responsesOverTime ?? []} />
              </div>
            </div>

            {/* LIVE ACTIVITY STREAM */}
            <div className="bg-canvas border border-brand-border/50 rounded-2xl p-6 flex flex-col transition-all duration-200 hover:border-brand-border/80 hover:shadow-md">
              <div className="border-b border-brand-border/40 pb-3 mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Recent Submissions Log
                </h2>
              </div>

              <div className="divide-y divide-brand-border/20 overflow-y-auto flex-1 max-h-64 pr-1 space-y-1">
                {!analytics.data?.recentResponses || analytics.data.recentResponses.length === 0 ? (
                  <p className="text-xs text-brand-muted py-6 text-center italic">No recent submission entries recorded.</p>
                ) : (
                  analytics.data.recentResponses.map((response: any) => (
                    <div
                      key={response.responseId}
                      className="flex justify-between items-center py-2.5 px-2 first:pt-0 last:pb-0 group transition-all duration-150 rounded-lg hover:bg-[#034F46]/5"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-brand-text group-hover:text-[#034F46] transition-colors max-w-[150px] truncate">
                          {response.formTitle}
                        </p>
                        <p className="text-[10px] text-brand-muted flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" /> Complete
                        </p>
                      </div>

                      <span className="text-xs text-brand-muted font-medium tabular-nums">
                        {new Date(response.submittedAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* FORMS CATALOG SECTION */}
            <div className="lg:col-span-3 bg-canvas border border-brand-border/50 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-border/40 pb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Forms Catalog ({filteredForms.length})
                </h2>
                {/* Filter Search Input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search forms by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full premium-search-field rounded-xl px-4 py-2 text-xs font-medium"
                  />
                </div>
              </div> 

              <div className="grid gap-3">
                {filteredForms.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-brand-border/60 rounded-xl bg-workspace/20">
                    <p className="text-xs text-brand-muted">No form layouts match your search filter criteria.</p>
                  </div>
                ) : (
                  filteredForms.map((form) => {
                    const isProcessing = 
                      (publish.status === "pending" && publish.variables?.formId === form.id) ||
                      (unpublish.status === "pending" && unpublish.variables?.formId === form.id);

                    return (
                      <div
                        key={form.id}
                        className={`group relative border border-brand-border/40 rounded-xl p-4 bg-workspace/5 hover:bg-[#034F46]/5 transition-all duration-200 hover:border-brand-border/80 ${
                          isProcessing ? "opacity-40 pointer-events-none" : ""
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div className="space-y-1">
                            <Link href={`/form/${form.id}/builder`} className="inline-block">
                              <h3 className="text-sm font-semibold text-brand-text group-hover:text-[#034F46] transition-colors duration-150">
                                {form.title}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-2 text-xs text-brand-muted">
                              <span className="uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-brand-text/5 text-brand-text/70 text-[10px] font-medium">
                                {form.visibility}
                              </span>
                              <span>•</span>
                              <span
                                className={`text-[11px] font-medium tracking-wide ${
                                  form.isPublished ? "text-[#034F46]" : "text-brand-muted"
                                }`}
                              >
                                {form.isPublished ? "Active & Public" : "Draft Mode"}
                              </span>
                            </div>
                          </div>

                          {/* INTERACTION ACTION BUTTONS */}
                          <div className="flex flex-wrap gap-2 items-center sm:justify-end font-semibold text-xs">
                            <Link
                              href={`/form/${form.id}/builder`}
                              className="border border-brand-border/80 bg-canvas px-3.5 py-2 rounded-xl text-brand-muted hover:text-brand-text hover:border-brand-text/60 transition-all shadow-sm"
                            >
                              Configure
                            </Link>

                            {form.isPublished && (
                              <button
                                onClick={() => handleCopyUrl(form.id)}
                                className={`border px-3.5 py-2 rounded-xl text-brand-muted transition-all bg-canvas shadow-sm ${
                                  copiedId === form.id
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                    : "border-brand-border/80 hover:text-brand-text hover:border-brand-text/60"
                                }`}
                              >
                                {copiedId === form.id ? "Copied!" : "Copy Link"}
                              </button>
                            )}

                            <button
                              disabled={isProcessing}
                              onClick={() => {
                                if (form.isPublished) {
                                  unpublish.mutate({ formId: form.id });
                                } else {
                                  publish.mutate({ formId: form.id });
                                }
                              }}
                              className={`px-3.5 py-2 rounded-xl transition-all border min-w-[90px] text-center font-semibold shadow-sm cursor-pointer ${
                                form.isPublished
                                  ? "border-brand-border/80 text-brand-muted hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 bg-canvas"
                                  : "bg-[#034F46] text-[#E6EEDB] border-transparent hover:bg-[#023b34]"
                              }`}
                            >
                              {isProcessing ? "..." : form.isPublished ? "Deactivate" : "Activate"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}