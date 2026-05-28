"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  // States for sandbox interactivity, mount hooks, and mobile menu
  const [activeTemplate, setActiveTemplate] = useState("Startup Feedback");
  const [previewMetric, setPreviewMetric] = useState(1204);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1210] via-[#021815] to-[#010908] text-[#f0f5eb] font-sans antialiased selection:bg-[#034F46]/30 overflow-x-hidden relative">
      {/* GLOBAL TYPOGRAPHY & INTERACTIVE KEYFRAME DEFINITIONS */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }
        @keyframes drift {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        @keyframes gridScan {
          0% {
            opacity: 0.12;
            transform: translateY(-20%);
          }
          50% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(20%);
            opacity: 0.12;
          }
        }
        @keyframes orbFloatOne {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
        }
        @keyframes orbFloatTwo {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1.05);
          }
          50% {
            transform: translate(-50px, 50px) scale(0.85);
          }
        }
        @keyframes textPulse {
          0%,
          100% {
            text-shadow: 0 0 0px transparent;
          }
          50% {
            text-shadow: 0 0 12px rgba(52, 211, 153, 0.4);
          }
        }
        .animate-text-pulse:hover {
          animation: textPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* AMBIENT BACKGROUND GLOW ENGINE & MOVING MESH */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f0f5eb 1px, transparent 1px), linear-gradient(to right, #f0f5eb 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "drift 24s linear infinite",
        }}
      />

      {/* Laser Grid Scan Line Overlay */}
      <div
        className="absolute inset-x-0 top-0 h-[150vh] bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none mix-blend-plus-lighter"
        style={{ animation: "gridScan 12s infinite ease-in-out" }}
      />

      {/* Dynamic Floating Ambient Orbs */}
      <div className="absolute top-[-5%] left-[-10%] w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full bg-[#034F46]/25 blur-[60px] md:blur-[120px] animate-[pulse_8s_infinite_ease-in-out] pointer-events-none" />
      <div className="absolute top-[25%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-emerald-950/20 blur-[80px] md:blur-[150px] animate-[pulse_10s_infinite_ease-in-out_2s] pointer-events-none" />

      <div
        className="absolute top-[45%] left-[12%] w-3 h-3 rounded-full bg-emerald-400/40 blur-[3px] pointer-events-none hidden md:block"
        style={{ animation: "orbFloatOne 14s infinite ease-in-out" }}
      />
      <div
        className="absolute top-[75%] right-[18%] w-4 h-4 rounded-full bg-teal-500/30 blur-[4px] pointer-events-none hidden md:block"
        style={{ animation: "orbFloatTwo 18s infinite ease-in-out" }}
      />

      {/* 1. NAVIGATION BAR */}
<nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1210]/70 border-b border-[#034F46]/20 transition-all duration-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 grid grid-cols-3 items-center">

    {/* LEFT: Logo ONLY */}
    <div className="flex items-center justify-start">
      <div
        className="flex items-center gap-2.5 group cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-emerald-400 to-[#034F46] transition-all duration-500 group-hover:rotate-180 group-hover:scale-125 shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]" />

        <span className="font-serif italic font-bold text-xl md:text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
          FormVerse
        </span>
      </div>
    </div>

    {/* CENTER: Navigation Links ONLY */}
    <div className="hidden md:flex items-center justify-center gap-8 font-mono text-[11px] tracking-widest uppercase text-[#f0f5eb]/60">
      <a
        href="#features"
        className="hover:text-emerald-400 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
      >
        Explore
      </a>

      <a
        href="#templates"
        className="hover:text-emerald-400 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
      >
        Blueprints
      </a>

      <a
        href="#pricing"
        className="hover:text-emerald-400 transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
      >
        Pricing
      </a>

      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="hover:text-emerald-400 transition-colors duration-200 hover:scale-105 transform transition-transform"
      >
        Github
      </a>
    </div>

    {/* RIGHT: Auth ONLY */}
    <div className="hidden md:flex items-center justify-end gap-4 font-mono text-[11px] tracking-widest uppercase text-[#f0f5eb]/60">
      <button
        onClick={() => router.push("/sign-in")}
        className="px-4 py-2 text-[#f0f5eb]/70 hover:text-white transition-colors duration-200 hover:translate-y-[-1px] transform"
      >
        Login
      </button>

      <button
        onClick={() => router.push("/sign-up")}
        className="relative group overflow-hidden bg-gradient-to-r from-[#034F46] to-[#046e61] text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(3,79,70,0.6)] active:scale-[0.97] hover:scale-[1.02] transform"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out -z-10" />
        <span className="relative z-10">Start Building</span>
      </button>
    </div>

          {/* Mobile Menu Action Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
            aria-label="Toggle Mobile Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#f0f5eb] transition-transform duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#f0f5eb] transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#f0f5eb] transition-transform duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 translate-y-[-8px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Drawer Slide Interface */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-[#0a1210]/95 border-b border-[#034F46]/30 backdrop-blur-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${mobileMenuOpen ? "max-h-[340px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}
        >
          <div className="flex flex-col items-center gap-5 font-mono text-xs uppercase tracking-widest text-[#f0f5eb]/80 px-6">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Explore
            </a>
            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Blueprints
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Pricing
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="py-1 hover:text-emerald-400"
            >
              Github
            </a>
            <hr className="w-full border-[#034F46]/20 my-1" />
            <div className="flex w-full gap-4 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/sign-in");
                }}
                className="flex-1 text-center py-3 border border-[#034F46]/40 rounded-xl text-sm"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/sign-up");
                }}
                className="flex-1 text-center py-3 bg-emerald-500 text-[#021815] font-bold rounded-xl text-sm"
              >
                Build
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO LAYER */}
      <section
        className={`max-w-5xl mx-auto px-4 sm:px-6 pt-12 md:pt-24 pb-16 text-center space-y-10 transition-all duration-1000 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
          {/* Engine Token Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#034F46]/40 border border-emerald-500/30 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.05)] hover:border-emerald-500/60 transition-colors duration-300 cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Form
            Generation Engine v2.0
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-white tracking-tight leading-[1.1] md:leading-[1.05] selection:bg-emerald-500/20">
            Build forms people <br />
            <span className="text-transparent font-sans not-italic font-extrabold bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text bg-[size:200%_auto] animate-[gradientMove_6s_linear_infinite] drop-shadow-sm">
              actually want to complete.
            </span>
          </h1>
          <p className="text-sm md:text-base text-[#f0f5eb]/70 max-w-xl md:text-lg md:max-w-2xl mx-auto leading-relaxed font-light transition-colors hover:text-white duration-300">
            Create dynamic schemas, capture hyper-structured analytical payloads, and isolate
            workflow drop-offs safely from one continuous micro-workspace.
          </p>
        </div>

        {/* Call to Actions Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 font-mono text-[11px] uppercase tracking-wider pt-2 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => router.push("/sign-up")}
            className="w-full sm:w-auto relative overflow-hidden bg-white text-[#021815] font-bold rounded-xl px-8 py-4 transition-all duration-300 hover:shadow-[0_0_35px_rgba(52,211,153,0.45)] hover:scale-[1.02] active:scale-[0.98] group"
          >
            {/* Text Glow Shimmer Accent Overlay */}
            <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent group-hover:animate-[shimmer_1.2s_infinite]" />
            Deploy New Pipeline
          </button>
          <a
            href="#templates"
            className="w-full sm:w-auto text-center backdrop-blur-md bg-white/[0.02] border border-white/10 text-white rounded-xl px-8 py-4 hover:bg-white/[0.08] hover:border-emerald-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
          >
            Explore Blueprints
          </a>
        </div>

        {/* Responsive Telemetry Stat Blocks */}
        <div className="pt-8 grid grid-cols-2 md:flex justify-center items-center gap-6 md:gap-16 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#f0f5eb]/40 border-t border-white/5 md:border-none">
          <div className="text-center md:text-left space-y-1 group cursor-default">
            <span className="block text-xl md:text-2xl font-bold font-sans text-white group-hover:text-emerald-400 transition-colors duration-300 tabular-nums">
              14,204,911
            </span>
            <span className="group-hover:text-white/60 transition-colors duration-300">
              responses captured
            </span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#034F46] animate-pulse" />
          <div className="text-center md:text-left space-y-1 col-span-2 md:col-span-1 border-t border-white/5 pt-4 md:pt-0 md:border-none group cursor-default">
            <span className="block text-xl md:text-2xl font-bold font-sans text-emerald-400 group-hover:scale-105 transform origin-left transition-all duration-300 tabular-nums">
              99.98%
            </span>
            <span className="group-hover:text-white/60 transition-colors duration-300">
              Uptime Validation
            </span>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE DASHBOARD PREVIEW PANEL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-28">
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-t-white/20 relative group hover:border-emerald-500/30 transition-all duration-500 animate-[floatSlow_9s_infinite_ease-in-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 md:pb-5 gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/20 hover:bg-red-500/60 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/20 hover:bg-yellow-500/60 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/20 hover:bg-emerald-500/60 transition-colors duration-200" />
              <span className="ml-2 font-mono text-[9px] md:text-[10px] text-[#f0f5eb]/50 uppercase tracking-widest truncate max-w-[180px] sm:max-w-none group-hover:text-emerald-400/80 transition-colors duration-300">
                FormVerse_Cloud_Workspace // Production
              </span>
            </div>
            <div className="flex items-center self-start sm:self-auto gap-2 text-emerald-400 font-mono text-[9px] tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </div>
          </div>

          {/* Interactive Card Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 my-5 md:my-6">
            <div
              className="backdrop-blur-md bg-white/[0.01] border border-white/5 rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/30 hover:scale-[1.02] transform hover:shadow-xl active:scale-[0.99]"
              onClick={() => setPreviewMetric((prev) => prev + 1)}
            >
              <div className="text-[#f0f5eb]/40 font-mono text-[9px] uppercase tracking-widest group-hover:text-[#f0f5eb]/60">
                Cumulative Submissions
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white mt-1 flex flex-wrap items-baseline gap-2 tabular-nums">
                {previewMetric.toLocaleString()}
                <span className="text-[8px] md:text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded tracking-wide animate-pulse">
                  ↑ Click Sandbox
                </span>
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/[0.01] border border-white/5 rounded-xl p-4 md:p-5 hover:border-white/10 transition-colors duration-300">
              <div className="text-[#f0f5eb]/40 font-mono text-[9px] uppercase tracking-widest">
                Live Schema Target Nodes
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white mt-1 tabular-nums">
                42 <span className="text-xs text-[#f0f5eb]/40 font-normal font-sans">Active</span>
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/[0.01] border border-white/5 rounded-xl p-4 md:p-5 hover:border-white/10 transition-colors duration-300">
              <div className="text-[#f0f5eb]/40 font-mono text-[9px] uppercase tracking-widest">
                Avg Completion Engine
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                84.2%
              </div>
            </div>
          </div>

          {/* Core Analytics Graph Overlay Vector */}
          <div className="backdrop-blur-md bg-black/20 border border-white/5 rounded-xl p-4 md:p-6 space-y-4">
            <div className="flex justify-between items-center gap-4">
              <span className="font-mono text-[9px] md:text-[10px] text-[#f0f5eb]/50 uppercase tracking-widest truncate">
                Payload Volume Throughput
              </span>
              <span className="font-mono text-[8px] md:text-[9px] text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded whitespace-nowrap">
                Realtime
              </span>
            </div>

            <div className="h-24 md:h-32 flex items-end gap-1 md:gap-2.5 pt-6 border-b border-white/10 group/graph">
              {[45, 28, 65, 38, 58, 85, 72, 95, 80, 115, 125, 145].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 group/bar relative flex justify-center h-full items-end transition-all duration-300 hover:flex-[1.5]"
                >
                  <div
                    style={{
                      height: `${mounted ? (val / 150) * 100 : 0}%`,
                      transitionDelay: `${idx * 25}ms`,
                    }}
                    className="w-full bg-gradient-to-t from-[#034F46]/20 to-emerald-500/40 border-t border-emerald-400/40 group-hover/bar:to-emerald-400 group-hover/bar:shadow-[0_0_20px_rgba(52,211,153,0.45)] group-hover/graph:opacity-40 group-hover/bar:!opacity-100 transition-all duration-500 ease-out rounded-t-[2px]"
                  />
                  <div className="absolute -top-7 bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-[8px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-20 transform translate-y-1 group-hover/bar:translate-y-0">
                    {(val * 1024).toLocaleString()}B
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-mono text-[7px] md:text-[8px] text-[#f0f5eb]/40 uppercase tracking-widest pt-1">
              <span>00:00 UTC Baseline</span>
              <span className="hidden sm:inline">Runtime Validation Cluster</span>
              <span>Synchronized</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENTO GRID FEATURES MATRIX */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5 space-y-10"
      >
        <div className="space-y-2">
          <div className="font-mono text-[10px] uppercase text-emerald-400 tracking-[0.3em] animate-text-pulse w-fit cursor-default">
            Architectural Parameters
          </div>
          <h2 className="text-2xl md:text-4xl font-serif italic text-white transition-all duration-300 hover:translate-x-1 transform inline-block">
            Engineered for precision enterprise workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1 — Double Width Section */}
          <div className="md:col-span-2 backdrop-blur-xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-3 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-300">
                01
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Granular Schema Fields
              </h3>
              <p className="text-xs md:text-sm text-[#f0f5eb]/60 leading-relaxed font-light max-w-xl">
                Construct recursive data collections flawlessly using highly conditional type
                arrays. Infinitely scale fields containing rigid regex expressions, multi-variable
                pickers, and cryptographic check validations natively.
              </p>
            </div>
          </div>

          {/* Card 2 — Standard Block */}
          <div className="backdrop-blur-xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-3 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-300">
                02
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Advanced Telemetry
              </h3>
              <p className="text-xs md:text-sm text-[#f0f5eb]/60 leading-relaxed font-light">
                Isolate performance blocks and layout friction points through continuous telemetry
                updates. Track entry logs safely without degrading render pipelines.
              </p>
            </div>
          </div>

          {/* Card 3 — Standard Block */}
          <div className="backdrop-blur-xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-3 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-300">
                03
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Public Endpoint Routing
              </h3>
              <p className="text-xs md:text-sm text-[#f0f5eb]/60 leading-relaxed font-light">
                Instantly map your created schema arrays directly to production target environments.
                Generate atomic static URLs immediately upon schema deployment.
              </p>
            </div>
          </div>

          {/* Card 4 — Double Width Stack Info */}
          <div className="md:col-span-2 backdrop-blur-xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="space-y-3 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold group-hover:scale-110 group-hover:border-emerald-400/40 transition-all duration-300">
                04
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                Type-Safe Infrastructure Stack
              </h3>
              <p className="text-xs md:text-sm text-[#f0f5eb]/60 leading-relaxed font-light max-w-xl">
                Driven strictly by Next.js edge performance layouts, tRPC operational networks, and
                Drizzle query layers. Enforce absolute consistency directly in your client
                application with auto-exportable JSON structures.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-2 font-mono text-[8px] md:text-[9px] text-[#f0f5eb]/40 uppercase tracking-wider relative z-10">
              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-white hover:bg-[#034F46]/40 hover:border-emerald-400/40 transition-all duration-200 cursor-default">
                NEXT.JS
              </span>
              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-white hover:bg-[#034F46]/40 hover:border-emerald-400/40 transition-all duration-200 cursor-default">
                TRPC
              </span>
              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-white hover:bg-[#034F46]/40 hover:border-emerald-400/40 transition-all duration-200 cursor-default">
                DRIZZLE
              </span>
              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-emerald-400 font-bold hover:bg-emerald-400 hover:text-black transition-all duration-200 cursor-default">
                ZOD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BLUEPRINT MANIFEST SWITCHER ENGINE */}
      <section
        id="templates"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5 space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="font-mono text-[10px] uppercase text-emerald-400 tracking-[0.3em] animate-text-pulse w-fit cursor-default">
              Workspace Blueprints
            </div>
            <h2 className="text-2xl md:text-3xl font-serif italic text-white">
              Pre-compiled configuration baselines.
            </h2>
          </div>

          {/* Controls Segment */}
          <div className="flex flex-col sm:flex-row gap-2 font-mono text-[10px] uppercase tracking-wider bg-black/40 p-1.5 rounded-xl border border-white/5 backdrop-blur-md self-start lg:self-auto w-full sm:w-auto relative z-20">
            {["Startup Feedback", "Anime Survey", "Hackathon Registration"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTemplate(t)}
                className={`px-3 md:px-4 py-2 rounded-lg transition-all duration-300 text-left sm:text-center relative overflow-hidden active:scale-[0.98] ${
                  activeTemplate === t
                    ? "bg-gradient-to-br from-[#034F46] to-[#046e61] text-white font-medium shadow-md border border-emerald-500/20 shadow-[0_4px_15px_rgba(3,79,70,0.3)]"
                    : "text-[#f0f5eb]/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sandbox Display Console */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 rounded-2xl p-5 md:p-8 min-h-60 flex flex-col justify-between transition-all duration-500 shadow-2xl relative group hover:border-emerald-500/30 overflow-hidden">
          {/* Internal Console Glow Follower */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.015] rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/[0.03] transition-colors duration-500" />

          <div className="space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-medium shadow-sm">
                Manifest Core Node
              </span>
              <span className="text-white/20 font-mono text-sm hidden sm:inline">/</span>
              <span className="text-xs text-emerald-300 font-mono tracking-wide break-all transition-all duration-300 group-hover:text-white">
                {activeTemplate.toLowerCase().replace(/\s+/g, "-")}.config.json
              </span>
            </div>

            {/* Smooth descriptive component crossfade wrapper */}
            <div className="transition-all duration-300 group-hover:translate-x-0.5 transform">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {activeTemplate} Object Structure
              </h3>
              <p className="text-xs md:text-sm text-[#f0f5eb]/70 max-w-2xl font-light leading-relaxed min-h-[40px] pt-1">
                {activeTemplate === "Startup Feedback" &&
                  "Isolate crucial micro-data variables mapping out precise onboarding execution paths, structural developer tool satisfaction levels, and active environment telemetry responses."}
                {activeTemplate === "Anime Survey" &&
                  "Community vector analytics indexing multi-attribute metadata indices, real-time tracking of release consumption, and aggregated volume configurations."}
                {activeTemplate === "Hackathon Registration" &&
                  "Highly descriptive nested structural payload mapping out production track declarations, external pipeline keys, programmatic partner requirements, and logic constraints."}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="font-mono text-[9px] md:text-[10px] text-[#f0f5eb]/40 tracking-wider flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              {activeTemplate === "Startup Feedback" && "Includes 4 fields • Validation Active"}
              {activeTemplate === "Anime Survey" && "Includes 6 fields • Unlisted Route Access"}
              {activeTemplate === "Hackathon Registration" &&
                "Includes 8 fields • Webhook Trigger Nodes"}
            </div>
            <button
              onClick={() => router.push("/explore")}
              className="font-mono text-[11px] uppercase text-emerald-400 hover:text-emerald-300 tracking-wider font-bold transition-all duration-300 flex items-center gap-1 self-start sm:self-auto group/btn"
            >
              Instantiate Object{" "}
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. RESPONSIVE PRICING MATRICES */}
      <section
        id="pricing"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5 space-y-10"
      >
        <div className="text-center space-y-2">
          <div className="font-mono text-[10px] uppercase text-emerald-400 tracking-[0.3em] animate-text-pulse">
            Operational Scaling Tiers
          </div>
          <h2 className="text-2xl md:text-4xl font-serif italic text-white">
            Scales dynamically with configuration limits.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {["Sandbox Core", "Professional Node", "Enterprise Mesh"].map((plan) => (
            <div
              key={plan}
              className={`backdrop-blur-xl border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-500 relative overflow-hidden group/card hover:-translate-y-1 transform ${
                plan === "Professional Node"
                  ? "bg-gradient-to-b from-[#034F46]/20 to-transparent border-emerald-500/40 shadow-2xl md:scale-[1.02] hover:shadow-emerald-500/5"
                  : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02] shadow-xl"
              }`}
            >
              {plan === "Professional Node" && (
                <div className="absolute top-3 right-3 bg-emerald-400 text-black font-mono font-bold text-[8px] tracking-widest uppercase px-2 py-0.5 rounded shadow animate-bounce [animation-duration:3s]">
                  Recommended
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-[#f0f5eb]/50 group-hover/card:text-emerald-400 transition-colors duration-300">
                  {plan}
                </h3>
                <div className="text-3xl md:text-4xl font-extrabold text-white pt-1 tabular-nums transition-transform duration-300 group-hover/card:scale-[1.02] origin-left">
                  {plan === "Sandbox Core" && "$0"}
                  {plan === "Professional Node" && "$19"}
                  {plan === "Enterprise Mesh" && "Custom"}
                  <span className="text-[9px] font-mono text-[#f0f5eb]/40 font-normal tracking-normal ml-1">
                    {plan === "Enterprise Mesh" ? "" : "/ month base"}
                  </span>
                </div>
              </div>

              <ul className="text-xs text-[#f0f5eb]/70 space-y-3 font-light border-t border-white/5 pt-4 transition-colors duration-300 group-hover/card:text-white">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 group-hover/card:scale-125 transition-transform" />
                  {plan === "Sandbox Core"
                    ? "3 Active Sub-Schemas"
                    : plan === "Professional Node"
                      ? "Unlimited Active Schemas"
                      : "Isolated Network Nodes"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 group-hover/card:scale-125 transition-transform" />
                  {plan === "Sandbox Core"
                    ? "100 monthly payloads"
                    : plan === "Professional Node"
                      ? "Advanced Telemetry Engines"
                      : "Dedicated Infrastructure"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 group-hover/card:scale-125 transition-transform" />
                  Zod Verification Protocol
                </li>
              </ul>

              <button
                onClick={() => router.push("/sign-up")}
                className={`w-full font-mono text-[10px] uppercase py-3 rounded-xl tracking-wider transition-all duration-300 font-bold transform hover:scale-[1.01] active:scale-[0.99] ${
                  plan === "Professional Node"
                    ? "bg-emerald-400 text-[#021815] hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                    : "bg-white/5 text-white border border-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                Initialize Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HIGH INTENSITY BLOCK CONVERSION HUB */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">
        <div className="relative rounded-3xl p-8 md:p-16 space-y-6 overflow-hidden bg-gradient-to-br from-[#034F46] via-[#023b34] to-[#011411] border border-emerald-500/30 shadow-[0_20px_50px_rgba(3,79,70,0.35)] group">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#E6EEDB_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/[0.03] to-emerald-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] cubic-bezier(0.4,0,0.2,1)" />

          <h2 className="text-2xl md:text-5xl font-serif italic tracking-tight text-white max-w-2xl mx-auto leading-tight transition-transform duration-500 group-hover:scale-[1.01]">
            Deploy secure data frameworks onto the live internet instantly.
          </h2>
          <p className="text-xs md:text-sm text-[#E6EEDB]/70 max-w-sm md:max-w-md mx-auto font-light leading-relaxed">
            Zero overhead server structures. Absolute validation mapping patterns configured in
            under two minutes flat.
          </p>

          <div className="pt-4 relative z-10">
            <button
              onClick={() => router.push("/sign-up")}
              className="w-full sm:w-auto bg-white text-[#034F46] font-mono text-[11px] font-extrabold uppercase tracking-widest px-8 md:px-10 py-4.5 md:py-5 rounded-xl shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] inline-block cursor-pointer"
            >
              Construct Initial Form Universe →
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER METADATA MARKUP */}
      <footer className="border-t border-white/5 bg-black/40 text-[#f0f5eb]/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <a href="#features" className="hover:text-emerald-400 transition-colors duration-200">
              Explore
            </a>
            <a href="#templates" className="hover:text-emerald-400 transition-colors duration-200">
              Blueprints
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors duration-200">
              Pricing
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Github
            </a>
          </div>

          <div className="text-center md:text-right tracking-wider text-[#f0f5eb]/30 hover:text-[#f0f5eb]/50 transition-colors duration-300">
            Engine Core <span className="text-white/60">Next.js Edge</span> •{" "}
            <span className="text-white/60">tRPC Mesh</span> •{" "}
            <span className="text-white/60">@TEJAS_DEV_code</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
