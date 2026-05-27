"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateFormPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "UNLISTED">("PUBLIC");

  const createForm = trpc.form.createForm.useMutation({
    onSuccess(data) {
      router.push(`/form/${data.id}/builder`);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createForm.mutate({
      title,
      description,
      visibility,
    });
  }

  return (
    <div className="min-h-screen bg-workspace p-6 md:p-10 lg:p-12 antialiased font-sans text-brand-text flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full space-y-4">
        
        {/* NAV LINK */}
        <div className="flex items-center">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors duration-150 group"
          >
            <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span> Back to Dashboard
          </Link>
        </div>

        {/* PRIMARY FORM MODULE */}
        <form
          onSubmit={handleSubmit}
          className="bg-canvas/30 rounded-xl border border-brand-border/60 p-6 md:p-8 space-y-6 w-full"
        >
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-[#034F46] flex items-center justify-center">
                <span className="w-1 h-1 bg-[#E6EEDB] rounded-sm" />
              </div>
              <h1 className="text-lg font-medium tracking-tight text-brand-text">
                Create New Form
              </h1>
            </div>
            <p className="text-xs text-brand-muted">
              Configure your display options and visibility rules to open the design canvas.
            </p>
          </div>

          <hr className="border-brand-border/30" />

          {/* FIELD: TITLE */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-brand-muted">
              Form Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Customer Feedback Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-workspace/40 border border-brand-border/80 text-xs text-brand-text rounded-lg px-3.5 py-2.5 placeholder:text-brand-muted/40 focus:bg-canvas focus:border-[#034F46]/60 focus:ring-1 focus:ring-[#034F46]/10 outline-none transition-all"
            />
          </div>

          {/* FIELD: DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-brand-muted">
              Description
            </label>
            <textarea
              placeholder="Add guidelines or a brief context summary for this submission form..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-workspace/40 border border-brand-border/80 text-xs text-brand-text rounded-lg px-3.5 py-2.5 placeholder:text-brand-muted/40 focus:bg-canvas focus:border-[#034F46]/60 focus:ring-1 focus:ring-[#034F46]/10 outline-none transition-all resize-none"
            />
          </div>

          {/* FIELD: VISIBILITY */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-brand-muted">
              Visibility Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option: PUBLIC */}
              <div 
                onClick={() => setVisibility("PUBLIC")}
                className={`border rounded-lg p-4 cursor-pointer transition-all flex items-start gap-3 ${
                  visibility === "PUBLIC" 
                    ? "border-[#034F46] bg-[#034F46]/5" 
                    : "border-brand-border/50 bg-workspace/10 hover:bg-workspace/20 hover:border-brand-border/80"
                }`}
              >
                <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${visibility === "PUBLIC" ? "border-[#034F46]" : "border-brand-muted/60"}`}>
                  {visibility === "PUBLIC" && <div className="w-1.5 h-1.5 rounded-full bg-[#034F46]" />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-brand-text">Public</p>
                  <p className="text-[11px] text-brand-muted leading-normal">Discoverable across dashboard directories and shared paths.</p>
                </div>
              </div>

              {/* Option: UNLISTED */}
              <div 
                onClick={() => setVisibility("UNLISTED")}
                className={`border rounded-lg p-4 cursor-pointer transition-all flex items-start gap-3 ${
                  visibility === "UNLISTED" 
                    ? "border-[#034F46] bg-[#034F46]/5" 
                    : "border-brand-border/50 bg-workspace/10 hover:bg-workspace/20 hover:border-brand-border/80"
                }`}
              >
                <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${visibility === "UNLISTED" ? "border-[#034F46]" : "border-brand-muted/60"}`}>
                  {visibility === "UNLISTED" && <div className="w-1.5 h-1.5 rounded-full bg-[#034F46]" />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-brand-text">Unlisted</p>
                  <p className="text-[11px] text-brand-muted leading-normal">Hidden from dashboard directories. Accessible only via direct URL link.</p>
                </div>
              </div>
            </div>
          </div>

          {/* DISPATCH ACTION */}
          <button
            disabled={createForm.isPending}
            className="w-full bg-[#034F46] text-[#E6EEDB] rounded-lg py-3 text-xs font-medium transition-all hover:bg-[#023b34] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
          >
            {createForm.isPending ? "Creating form..." : "Open Canvas Builder →"}
          </button>
        </form>

      </div>
    </div>
  );
}