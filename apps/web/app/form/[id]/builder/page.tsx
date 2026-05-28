"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "~/trpc/client";
import { FormPreview } from "~/components/FormPreview";
import Link from "next/link";

export default function FormBuilderPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const utils = trpc.useUtils();

  const { data, isLoading, isFetching, error } = trpc.form.getMyForm.useQuery(
    { formId: id },
    { retry: false },
  );

  const addField = trpc.form.addField.useMutation({
    onSuccess() {
      utils.form.getMyForm.invalidate({ formId: id });
      setLabel("");
      setType("TEXT");
      setOptions("");
      setRequired(false);
    },
  });

  const publish = trpc.form.publishForm.useMutation({
    onSuccess() {
      utils.form.getMyForm.invalidate({ formId: id });
    },
  });

  const unpublish = trpc.form.unpublishForm.useMutation({
    onSuccess() {
      utils.form.getMyForm.invalidate({ formId: id });
    },
  });

  const [label, setLabel] = useState("");
  const [type, setType] = useState("TEXT");
  const [options, setOptions] = useState("");
  const [required, setRequired] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-workspace flex flex-col items-center justify-center gap-3">
        <div className="w-4 h-4 rounded-full bg-[#034F46] animate-ping opacity-75" />
        <span className="text-xs text-brand-muted tracking-wide animate-pulse font-sans">
          Loading builder environment...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-workspace flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-canvas border border-brand-border rounded-xl p-6 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-md font-bold tracking-tight text-brand-text">
              Failed to load form
            </h1>
            <p className="text-xs text-brand-muted leading-normal">
              The requested form layout could not be found or you do not have permission to edit it.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-xs bg-brand-text text-canvas px-4 py-2.5 rounded-xl hover:opacity-90 transition-all font-semibold"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const form = data?.form;
  const fields = data?.fields ?? [];

  if (!form) return null;

  function handleAddField() {
    if (!label.trim()) return;

    addField.mutate({
      formId: id,
      label,
      type: type as any,
      required,
      options:
        type === "SELECT"
          ? options
              .split(",")
              .map((o) => o.trim())
              .filter(Boolean)
          : undefined,
    });
  }

  return (
    <>
      <style jsx global>{`
        .premium-input-style {
          background-color: rgba(3, 79, 70, 0.06) !important;
          border: 1px solid rgba(3, 79, 70, 0.2) !important;
          color: #E6EEDB !important;-webkit-text-fill-color: #E6EEDB !important;caret-color: #E6EEDB !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }
        .premium-input-style:hover {
          background-color: rgba(3, 79, 70, 0.09) !important;
          border-color: rgba(3, 79, 70, 0.35) !important;
        }
        .premium-input-style:focus {
          background-color: transparent !important;
          border-color: #034f46 !important;
          box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.15) !important;
        }
        .premium-input-style::placeholder {
          color: rgba(255, 255, 255, 0.35) !important;
        }
      `}</style>

      <div className="min-h-screen bg-workspace p-4 md:p-8 lg:p-12 text-brand-text antialiased font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* TOP CONTROLS ACCENT HEADER */}
          <div className="bg-canvas border border-brand-border/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="p-1.5 rounded-lg bg-workspace border border-brand-border text-brand-muted hover:text-brand-text transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </Link>
                <span className="text-xs text-brand-border">/</span>
                <h1 className="text-md font-bold tracking-tight text-brand-text truncate">
                  {form.title}
                </h1>
              </div>

              <p className="text-xs text-brand-muted truncate max-w-md">
                {form.description || "No layout description provided."}
              </p>

              <div className="flex items-center gap-3 pt-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    form.isPublished
                      ? "bg-emerald-500/5 text-emerald-700 border-emerald-500/20"
                      : "bg-workspace border-brand-border text-brand-muted"
                  }`}
                >
                  {form.isPublished ? "LIVE" : "DRAFT"}
                </span>

                {form.isPublished && (
                  <div className="text-xs text-brand-muted flex items-center gap-1.5">
                    <span className="text-brand-muted opacity-80">Public Link:</span>
                    <span className="text-brand-text font-medium select-all underline underline-offset-2 decoration-brand-border">
                      {window.location.origin}/f/{id}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-semibold">
              <button
                onClick={() =>
                  form.isPublished
                    ? unpublish.mutate({ formId: id })
                    : publish.mutate({ formId: id })
                }
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl transition-all border text-center cursor-pointer shadow-sm ${
                  form.isPublished
                    ? "border-brand-border bg-canvas text-red-600 hover:bg-red-50/50"
                    : "bg-[#034F46] text-[#E6EEDB] border-transparent hover:bg-[#023b34]"
                }`}
              >
                {form.isPublished ? "Unpublish Form" : "Publish Live"}
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 sm:flex-none bg-canvas border border-brand-border px-4 py-2.5 rounded-xl text-brand-text hover:border-brand-border/80 transition-all cursor-pointer shadow-sm"
              >
                Save & Close
              </button>
            </div>
          </div>

          {/* INTERACTIVE WORKING DESIGN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* COLUMN LEFT: INPUT CREATION & FIELDS TREE */}
            <div className="lg:col-span-5 space-y-6">
              {/* ADD ELEMENT COMPONENT CONTAINER */}
              <div className="bg-canvas border border-brand-border/50 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-1.5 border-b border-brand-border/40 pb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#034F46]" />
                  <h2 className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                    Add Form Element
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold tracking-wide text-brand-muted uppercase">
                      Input Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Work Email Address"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full premium-input-style text-xs rounded-xl px-4 py-2.5 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold tracking-wide text-brand-muted uppercase">
                      Element Type
                    </label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full premium-input-style text-xs rounded-xl px-4 py-2.5 font-medium appearance-none cursor-pointer"
                      >
                        <option value="TEXT" className="bg-canvas">
                          Short Answer (Text)
                        </option>
                        <option value="EMAIL" className="bg-canvas">
                          Email Address
                        </option>
                        <option value="NUMBER" className="bg-canvas">
                          Number Input
                        </option>
                        <option value="TEXTAREA" className="bg-canvas">
                          Long Answer (Textarea)
                        </option>
                        <option value="SELECT" className="bg-canvas">
                          Dropdown Select Menu
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-muted text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {type === "SELECT" && (
                    <div className="space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
                      <label className="block text-[11px] font-semibold tracking-wide text-brand-muted uppercase">
                        Menu List Items
                      </label>
                      <textarea
                        placeholder="Separate list values using commas (e.g. Design, Engineering, Marketing)"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                        rows={3}
                        className="w-full premium-input-style text-xs rounded-xl px-4 py-2.5 font-medium resize-none"
                      />
                    </div>
                  )}

                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 text-xs font-medium text-brand-muted select-none cursor-pointer w-fit hover:text-brand-text transition-colors">
                      <input
                        type="checkbox"
                        checked={required}
                        onChange={(e) => setRequired(e.target.checked)}
                        className="rounded border-brand-border text-[#034F46] focus:ring-0 focus:ring-offset-0 h-4 w-4 accent-[#034F46] cursor-pointer bg-workspace"
                      />
                      Mark field schema as required
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleAddField}
                  disabled={addField.isPending}
                  className="w-full bg-canvas border border-brand-border text-xs py-2.5 rounded-xl text-brand-text hover:border-[#034F46]/60 hover:bg-[#034F46]/5 transition-all disabled:opacity-40 disabled:pointer-events-none font-semibold cursor-pointer shadow-sm"
                >
                  {addField.isPending ? "Adding elements..." : "Add Element to Layout"}
                </button>
              </div>

              {/* ACTIVE SPECIFICATION SCHEMA PANEL */}
              <div className="bg-canvas border border-brand-border/50 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="border-b border-brand-border/40 pb-2">
                  <h2 className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                    Form Outline Summary ({fields.length})
                  </h2>
                </div>

                <div className="space-y-2 max-h-65 overflow-y-auto pr-1">
                  {fields.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-brand-border/60 rounded-xl bg-workspace/10">
                      <p className="text-brand-muted text-xs font-medium">
                        No custom components built into layout yet.
                      </p>
                    </div>
                  ) : (
                    fields.map((field: any) => (
                      <div
                        key={field.id}
                        className="border border-brand-border/30 rounded-xl p-3 bg-workspace/5 flex justify-between items-center gap-3 hover:bg-workspace/20 transition-all shadow-xs"
                      >
                        <div className="space-y-0.5 truncate">
                          <span className="text-xs font-semibold text-brand-text block truncate">
                            {field.label}
                          </span>
                          <span className="text-[10px] text-brand-muted font-medium uppercase tracking-wide block">
                            Type: <span className="text-[#034F46]">{field.type}</span>
                          </span>
                        </div>

                        {field.required && (
                          <span className="text-[9px] font-bold bg-red-500/5 text-red-600 px-2 py-0.5 rounded-md border border-red-500/10 uppercase tracking-wider">
                            Required
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN RIGHT: INTERACTIVE DYNAMIC RENDER LIVE CANVAS */}
            <div className="lg:col-span-7 bg-canvas border border-brand-border/50 rounded-2xl p-6 space-y-4 lg:sticky lg:top-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    Interactive Preview Canvas
                  </h2>
                </div>
              </div>

              {/* NESTED RENDER DISPLAY PREVIEW CONTAINER */}
              <div className="bg-workspace/10 border border-brand-border/40 rounded-xl p-5 min-h-95 flex flex-col justify-between">
                <FormPreview fields={fields} values={values} setValues={setValues} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
