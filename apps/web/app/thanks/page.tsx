"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-workspace p-4 md:p-8 flex flex-col items-center justify-center antialiased font-sans text-brand-text">
      <div className="max-w-md w-full my-auto space-y-6">
        
        {/* MAIN SUCCESS WRAPPER CARD */}
        <div className="bg-canvas border border-brand-border rounded-2xl shadow-xl overflow-hidden text-center">
          
          {/* BRAND GRADIENT ACCENT BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#034F46] via-[#056d60] to-[#034F46]" />
          
          <div className="p-8 md:p-10 flex flex-col items-center justify-center gap-6">
            
            {/* SUCCESS CHECKMARK GRAPHIC */}
            <div className="w-12 h-12 rounded-full bg-[#034F46]/10 border border-[#034F46]/20 flex items-center justify-center text-[#034F46] shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* MESSAGE BODY BLOCK */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-text leading-tight">
                Thank you!
              </h1>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-sm mx-auto">
                Your response has been successfully submitted. The organizer has been notified and your data is safe.
              </p>
            </div>

            <hr className="w-16 border-brand-border/50" />

            {/* REDIRECT JOURNEY ROOT ACTION */}
            <div className="w-full">
              <Link
                href="/"
                className="block w-full bg-[#034F46] text-[#E6EEDB] text-xs font-semibold py-3 rounded-xl transition-all duration-200 hover:bg-[#023b34] active:scale-[0.99] shadow-sm"
              >
                Return to Home
              </Link>
            </div>

          </div>
        </div>

        {/* COMPACT SECURE COMPLIANCE MARKER */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wide text-brand-muted/40">
          <span>Form submission processed by</span>
          <span className="font-semibold text-brand-muted/60 tracking-tight">FormVerse</span>
        </div>
        
      </div>
    </div>
  );
}