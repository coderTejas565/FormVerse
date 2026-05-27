"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trpc } from "~/trpc/client";

export default function ResponsesPage() {
  const searchParams = useSearchParams();
  const targetFormId = searchParams.get("formId"); // Read the specific form filter

  const { data, isLoading } = trpc.form.getResponses.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-workspace flex flex-col items-center justify-center gap-3 antialiased">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034F46] opacity-40" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#034F46]" />
        </div>
        <span className="font-sans text-xs font-medium text-brand-muted tracking-wide animate-pulse">
          Loading incoming submissions...
        </span>
      </div>
    );
  }

  // Filter responses locally if a specific form identifier is passed from the catalog card
  const filteredResponses =
    targetFormId && data
      ? data.filter(
          (response) =>
            response.answers.some((a) => a.formId === targetFormId) ||
            response.formTitle === data.find((d) => d.responseId === d.responseId)?.formTitle,
        )
      : // Note: If your tRPC response data objects have a explicit `formId` field directly on the root object,
        // change the code line above to: `data.filter((response) => response.formId === targetFormId)`
        data;

  // Find the title of the specific form if filtering
  const activeFormTitle = targetFormId && filteredResponses?.[0]?.formTitle;

  return (
    <div className="min-h-screen bg-workspace p-6 md:p-10 lg:p-12 text-brand-text antialiased font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* BREADCRUMB / HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border/40 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-brand-muted font-medium mb-1">
              <Link href="/dashboard" className="hover:text-[#034F46] transition-colors">
                Workspace
              </Link>
              <span>/</span>
              <span className="text-brand-text/60">Submissions Log</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-text">
              {activeFormTitle ? `${activeFormTitle} ` : "Form Submissions "}
              <span className="text-[#034F46]">Stream</span>
            </h1>
            <p className="text-xs text-brand-muted max-w-xl">
              {targetFormId
                ? `Showing exclusive submission inputs captured explicitly for this dynamic workspace route.`
                : `Inspect structured user input metrics, field identifiers, and submission history endpoints in real-time.`}
            </p>
          </div>

          {/* Reset Filter Button if viewing isolated data */}
          {targetFormId && (
            <Link
              href="/responses"
              className="inline-flex items-center justify-center border border-brand-border/80 bg-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm hover:border-brand-text/40 transition-all text-brand-muted hover:text-brand-text"
            >
              Clear Filter (Show All)
            </Link>
          )}
        </div>

        {/* SUBMISSIONS TABLE CONTAINER */}
        <div className="bg-canvas border border-brand-border/50 rounded-2xl overflow-hidden shadow-sm">
          {!filteredResponses || filteredResponses.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-brand-border/40 rounded-2xl m-4 bg-workspace/10">
              <p className="text-xs text-brand-muted font-medium italic">
                No structural payloads found matching this pipeline lookup parameters.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-brand-border/40 bg-workspace/20 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    <th className="py-4 px-6 font-semibold">Originating Form</th>
                    <th className="py-4 px-6 font-semibold">Timestamp</th>
                    <th className="py-4 px-6 font-semibold">Structured Answers Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/20 text-xs">
                  {filteredResponses.map((response) => (
                    <tr
                      key={response.responseId}
                      className="hover:bg-[#034F46]/5 transition-colors duration-150 group"
                    >
                      {/* FORM TITLE */}
                      <td className="py-5 px-6 vertical-top align-top max-w-[200px]">
                        <p className="font-semibold text-brand-text group-hover:text-[#034F46] transition-colors duration-150 text-sm truncate">
                          {response.formTitle}
                        </p>
                        <span className="text-[10px] text-brand-muted font-mono block mt-1 truncate">
                          ID: {response.responseId.slice(0, 8)}...
                        </span>
                      </td>

                      {/* TIMESTAMP BADGE */}
                      <td className="py-5 px-6 vertical-top align-top whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-text/5 text-brand-text/80 font-medium tabular-nums text-[11px]">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          {response.submittedAt
                            ? new Date(response.submittedAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </span>
                      </td>

                      {/* RESPONSES LOG GRID */}
                      <td className="py-5 px-6 align-top">
                        <div className="grid gap-2.5 max-w-2xl">
                          {response.answers.map((answer) => (
                            <div
                              key={answer.fieldId}
                              className="bg-workspace/30 border border-brand-border/30 rounded-xl p-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4 hover:border-brand-border/70 transition-colors"
                            >
                              <div className="sm:w-1/3 min-w-[120px]">
                                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">
                                  {answer.fieldLabel || `Field Key`}
                                </span>
                                <span className="text-[9px] text-brand-muted/60 font-mono block truncate">
                                  #{answer.fieldId.slice(0, 6)}
                                </span>
                              </div>

                              <div className="sm:w-2/3 text-slate-900 font-medium break-all text-[13px] bg-white/60 px-3 py-1.5 rounded-lg border border-brand-border/10">
                                {answer.value || (
                                  <span className="italic text-brand-muted/50 text-xs">
                                    No input provided
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
