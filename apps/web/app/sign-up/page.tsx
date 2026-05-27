"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess(data) {
      console.log("User created:", data);
      window.location.href = "/dashboard";
    },
    onError(error) {
      alert(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    signup.mutate({
      fullName,
      email,
      password,
    });
  }

  return (
    <>
      {/* BRAND-ALIGNED INPUT SYSTEM OVERRIDES */}
      <style jsx global>{`
        .premium-auth-mesh input[type="text"],
        .premium-auth-mesh input[type="email"],
        .premium-auth-mesh input[type="password"] {
          width: 100% !important;
          background-color: rgba(3, 79, 70, 0.08) !important;
          border: 1px solid rgba(3, 79, 70, 0.25) !important;
          border-radius: 0.75rem !important;
          padding: 0.875rem 1rem !important;
          font-size: 0.8125rem !important;
          color: var(--brand-text, #ffffff) !important;
          outline: none !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .premium-auth-mesh input:hover {
          background-color: rgba(3, 79, 70, 0.12) !important;
          border-color: rgba(3, 79, 70, 0.45) !important;
        }

        .premium-auth-mesh input:focus {
          background-color: rgba(3, 79, 70, 0.04) !important;
          border-color: #034F46 !important;
          box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.2) !important;
        }

        /* HIGH VISIBILITY PLACEHOLDER OVERRIDES */
        .premium-auth-mesh input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="min-h-screen bg-workspace flex items-center justify-center p-4 antialiased font-sans text-brand-text">
        <div className="w-full max-w-md my-auto space-y-6">
          
          {/* MAIN SURFACE WRAPPER */}
          <div className="bg-canvas border border-brand-border rounded-2xl shadow-xl overflow-hidden">
            
            {/* BRAND ACCENT TOP BAR */}
            <div className="h-1.5 w-full bg-[#034F46]" />
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 premium-auth-mesh">
              
              {/* HEADER BLOCK */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 group">
                  <div className="w-3.5 h-3.5 rounded bg-[#034F46] flex items-center justify-center">
                    <span className="w-1 h-1 bg-[#E6EEDB] rounded-sm" />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-brand-text">
                    Get Started with FormVerse
                  </h1>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Create your account to design gorgeous forms, accept immediate responses, and gather insights.
                </p>
              </div>

              <hr className="border-brand-border/40" />

              {/* FULL NAME FIELD */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide text-brand-text opacity-90">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rowan Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="font-sans"
                />
              </div>

              {/* EMAIL FIELD */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide text-brand-text opacity-90">
                  Email Address
                </label>
                <input 
                  type="email"
                  required
                  placeholder="name@domain.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="font-sans"
                />
              </div>

              {/* PASSWORD FIELD */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide text-brand-text opacity-90">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-sans"
                />
              </div>

              {/* ACTION TRIGGER */}
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={signup.isPending}
                  className="w-full bg-[#034F46] text-[#E6EEDB] rounded-xl py-3 text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#023b34] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-sm font-sans"
                >
                  {signup.isPending ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-[#E6EEDB]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Create Free Account"
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* SIMPLISTIC MINIMAL PLATFORM STAMP */}
          <div className="flex items-center justify-center gap-1 text-[10px] text-brand-muted/40 font-medium">
            <span>Powered by</span>
            <span className="font-semibold text-brand-muted/60">FormVerse Studio</span>
          </div>

        </div>
      </div>
    </>
  );
}