"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { trpc } from "~/trpc/client";
import { FormPreview } from "~/components/FormPreview";

export default function PublicFormPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = trpc.form.getForm.useQuery({
    formId: id,
  });

  const submit = trpc.form.submitForm.useMutation({
    onSuccess() {
      window.location.href = "/thanks";
    },
  });

  const [values, setValues] = useState<Record<string, string>>({});

  function handleSubmit() {
    submit.mutate({
      formId: id,
      answers: Object.entries(values).map(([fieldId, value]) => ({
        fieldId,
        value,
      })),
    });
  }

  /* LOADING STATE */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-workspace flex flex-col items-center justify-center gap-3">
        <div className="w-5 h-5 rounded-full bg-[#034F46] animate-ping opacity-75" />
        <span className="text-xs text-brand-muted tracking-wide animate-pulse font-medium">
          Loading dynamic form layout...
        </span>
      </div>
    );
  }

  /* 404 / INACTIVE FORM STATE */
  if (!data || !data.form) {
    return (
      <div className="min-h-screen bg-workspace flex items-center justify-center p-4 antialiased font-sans text-brand-text">
        <div className="w-full max-w-sm bg-canvas border border-brand-border rounded-xl p-6 text-center space-y-5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m0-8v4m9-5a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold tracking-tight text-brand-text">
              Form Unavailable
            </h1>
            <p className="text-xs text-brand-muted leading-normal">
              This form link might be broken, deactivated, or deleted by the administrator.
            </p>
          </div>
          <div className="pt-1">
            <a
              href="/"
              className="block w-full text-xs bg-workspace border border-brand-border py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:border-brand-border/80 transition-all font-medium text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-workspace p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center antialiased font-sans text-brand-text">
      <div className="max-w-2xl w-full my-auto space-y-6">
        {/* HERO SURFACE WRAPPER */}
        <div className="bg-canvas border border-brand-border rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:border-brand-border/80">
          {/* VISUAL BRAND ACCENT TOP BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#034F46] via-[#056d60] to-[#034F46]" />

          <div className="p-6 md:p-10 space-y-8">
            {/* FORM TITLE & CONTEXT SECTION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-6 px-2 rounded bg-[#034F46]/10 text-[#034F46] border border-[#034F46]/20 flex items-center justify-center text-[10px] font-bold tracking-wider uppercase">
                  Official Form
                </div>
                <span className="text-xs text-brand-muted/60">•</span>
                <span className="text-xs text-brand-muted font-medium">
                  {data.fields?.length ?? 0}{" "}
                  {data.fields?.length === 1 ? "input requirement" : "input requirements"}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-text leading-tight">
                  {data.form.title}
                </h1>

                {data.form.description && (
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-xl">
                    {data.form.description}
                  </p>
                )}
              </div>
            </div>

            <hr className="border-brand-border/50" />

            {/* HIGHLIGHTED FIELDS CONTAINER MESH */}
            <div className="p-4 md:p-6 bg-workspace/40 border border-brand-border/60 rounded-xl shadow-inner relative group-hover:border-brand-border transition-colors">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-muted/50">
                  Live Environment
                </span>
              </div>

              {/* RENDERED FIELD INJECTS */}
              <div className="py-2 PublicFormPreviewHighlight">
                <FormPreview fields={data.fields} values={values} setValues={setValues} />
              </div>
            </div>

            {/* FORM SUBMISSION CONTROLS */}
            <div className="pt-2 space-y-4">
              <button
                onClick={handleSubmit}
                disabled={submit.isPending}
                className="w-full bg-[#034F46] text-[#E6EEDB] rounded-xl py-3.5 text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#023b34] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-sm font-sans"
              >
                {submit.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-[#E6EEDB]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing submission...
                  </>
                ) : (
                  "Submit Completed Form"
                )}
              </button>

              <p className="text-center text-[10px] text-brand-muted/50 leading-normal max-w-md mx-auto">
                By submitting this form, your context parameters will be securely handled in
                compliance with standard workspace processing protocols.
              </p>
            </div>
          </div>
        </div>

        {/* CLEAN MINIMAL BRAND FOOTER */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wide text-brand-muted/40">
          <span>Powered by</span>
          <span className="font-semibold text-brand-muted/60 tracking-tight">
            FormVerse Secure Workspace
          </span>
        </div>
      </div>
    </div>
  );
}
