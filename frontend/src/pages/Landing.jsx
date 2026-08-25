import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { STARTER_TEMPLATES } from '../types';
import { ArrowRight, Terminal, Activity, ArrowUpRight, Loader2, Sparkles } from 'lucide-react';

export default function Landing() {
  const [promptText, setPromptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user = localStorage.getItem('prompt2web_user');
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    }, 400);
  };

  const handleSelectBlueprint = (tpl) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = localStorage.getItem('prompt2web_user');
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-ochre-600 text-clay-100 flex flex-col selection:bg-clay-800 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-clay-800/80 bg-clay-900/95 backdrop-blur sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-clay-800 border border-clay-700 flex items-center justify-center font-bold text-clay-200 text-lg shadow-inner hover:scale-105 transition-transform">
              ⚡
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-mono">
              PROMPT<span className="text-clay-400">2</span>WEB
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="px-5 py-2.5 text-xs font-mono font-bold text-clay-200 hover:text-white hover:bg-clay-800 rounded-xl border border-clay-800 transition-all duration-200 active:scale-95 shadow-sm"
            >
              SIGN IN
            </Link>
            <Link
              to="/auth"
              className="btn-terracotta text-xs font-mono group"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with Generous Padding and Slide-up Animation */}
      <main className="flex-1 py-20 sm:py-28 px-8 max-w-7xl mx-auto w-full space-y-20 animate-slide-up">
        {/* Hero Section */}
        <section className="text-center space-y-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-700 bg-clay-900/90 text-clay-200 text-xs font-mono tracking-wider shadow hover:border-clay-500 transition-colors">
            <Activity className="w-3.5 h-3.5 text-clay-400 animate-pulse" /> SYSTEM ACTIVE • V1.0
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight font-mono drop-shadow-md">
            PROMPT <span className="text-clay-900 inline-block hover:rotate-12 transition-transform">➔</span> WEB
          </h1>

          <p className="text-base sm:text-lg text-clay-950 font-medium max-w-xl mx-auto leading-relaxed">
            Autonomous web application generator. Transform natural language prompts into production-ready web prototypes.
          </p>

          {/* Minimalist Prompt Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <form
              onSubmit={handleStart}
              className="p-3 rounded-2xl bg-clay-900 border border-clay-700 flex flex-col sm:flex-row gap-3 shadow-2xl focus-within:border-clay-500 focus-within:ring-2 focus-within:ring-clay-600/30 transition-all duration-300"
            >
              <div className="flex-1 flex items-center gap-3 px-4">
                <Terminal className="w-5 h-5 text-clay-400 shrink-0" />
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Enter application prompt..."
                  className="w-full bg-transparent text-sm text-white placeholder-clay-500 focus:outline-none py-2 font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-terracotta text-xs shrink-0 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>LAUNCHING...</span>
                  </>
                ) : (
                  <>
                    <span>BUILD NOW</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Core System KPIs Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Latency</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">0.4s</div>
            <span className="kpi-sub">Avg Compile Time</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Output</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">100%</div>
            <span className="kpi-sub">Clean Semantic HTML</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Viewports</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">3x</div>
            <span className="kpi-sub">Desktop • Tablet • Mobile</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Setup</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">0s</div>
            <span className="kpi-sub">Instant Live Sandbox</span>
          </div>
        </section>

        {/* Starter KPI Blueprints */}
        <section className="space-y-8 pt-6 border-t border-clay-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight font-mono">
                STARTER BLUEPRINTS
              </h2>
              <p className="text-xs font-mono text-clay-950 font-semibold mt-1">Pre-configured architectural templates</p>
            </div>
            <span className="text-xs font-mono text-clay-200 bg-clay-900 border border-clay-800 px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-clay-400" />
              <span>4 Blueprints Available</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STARTER_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleSelectBlueprint(tpl)}
                className="clay-card cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-clay-400 group-hover:text-clay-300 transition-colors">BLUEPRINT</span>
                    <ArrowUpRight className="w-4 h-4 text-clay-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-clay-300 transition-colors">
                    {tpl.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-clay-950 border border-clay-800 text-clay-300 group-hover:border-clay-700 transition-colors">
                      Multi-File
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-clay-950 border border-clay-800 text-clay-300 group-hover:border-clay-700 transition-colors">
                      Tailwind
                    </span>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between text-xs font-mono text-clay-400 group-hover:text-white transition-colors">
                  <span>DEPLOY</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-clay-800/80 py-8 px-8 text-center text-xs font-mono text-clay-200 bg-clay-950">
        PROMPT2WEB ENGINE • 2026
      </footer>
    </div>
  );
}
