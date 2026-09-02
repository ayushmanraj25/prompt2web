import React, { useState, useEffect, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RotatingAiLogo from '../components/RotatingAiLogo';
import AuthConsole from '../components/AuthConsole';
import Footer from '../components/Footer';
import {
  ArrowRight,
  Mail,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Github,
  ChevronDown,
  ChevronUp,
  Globe,
  Bot,
  Zap,
  Play,
  Heart,
  Moon,
  MousePointer2,
  X,
} from 'lucide-react';



/**
 * HeroCarousel
 * Isolated component with independent timer and slide state.
 * Prevents re-rendering the rest of Landing page on slide transition.
 * Uses persistent horizontal transform track with zero unmounting and zero CLS layout shifts.
 */
const HeroCarousel = memo(function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Smooth auto-cycle through 4 project previews
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full lg:flex-1 min-w-0 rounded-[40px] bg-gradient-to-b from-[#2d83b4] via-[#2488a6] to-[#40b5bb] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl h-[620px] max-h-[620px] select-none">
      {/* HORIZONTAL SLIDING TRACK - ZERO UNMOUNT / ZERO BLINK */}
      <div className="flex-1 w-full overflow-hidden relative flex flex-col justify-between">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate3d(-${activeSlide * 100}%, 0, 0)`,
          }}
        >
          {/* ============================================================= */}
          {/* SLIDE 0: BUILT FOR TEAMS (TREK VIBE MULTIPLAYER CANVAS)       */}
          {/* ============================================================= */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between">
            {/* Top Team Header */}
            <div className="text-center space-y-1 z-10 pt-2 h-16 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md border-2 border-[#2488a6]">
                    🏛️
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md border-2 border-[#2488a6]">
                    👨‍✈️
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md border-2 border-[#2488a6]">
                    🤠
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md border-2 border-[#2488a6]">
                    👩‍🎨
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  Built for teams
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-white/90 max-w-md mx-auto">
                Build, test and deploy with your favourite people in real-time, from concept to launch.
              </p>
            </div>

            {/* Collaborative Browser Mockup with Realtime Cursors */}
            <div className="h-[430px] flex items-center justify-center z-10 w-full px-2 sm:px-4">
              <div className="w-full max-w-2xl rounded-2xl bg-white text-slate-900 shadow-2xl border-4 border-slate-900 overflow-hidden relative select-none">
                <div className="h-8 bg-[#f1f5f9] px-4 flex items-center justify-between border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">trekvibe.com</span>
                  <div className="w-8" />
                </div>

                <div className="p-6 relative bg-gradient-to-b from-white via-[#f8fafc] to-[#e2e8f0] text-slate-900">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200/80">
                    <div className="font-extrabold text-sm font-sans tracking-tight">Trek Vibe</div>
                    <div className="hidden sm:flex items-center gap-5 text-xs text-slate-500 font-sans">
                      <span>Home</span>
                      <span>About Us</span>
                      <span>Treks</span>
                      <span>Contact</span>
                    </div>
                    <div className="relative">
                      <button type="button" className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold">
                        Join Now
                      </button>
                      <div className="absolute -top-3 -right-10 flex items-center gap-1 animate-bounce z-20">
                        <MousePointer2 className="w-4 h-4 text-sky-500 fill-sky-500" />
                        <span className="px-2 py-0.5 rounded-md bg-sky-500 text-white font-bold text-[10px] shadow">
                          Chris
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-6 text-center space-y-3 relative max-w-lg mx-auto">
                    <div className="relative inline-block border-2 border-sky-400 rounded-lg p-2 bg-sky-50/40">
                      <span className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-sky-500 text-white text-[9px] font-mono font-bold">
                        &lt;h1&gt;
                      </span>
                      <h2 className="text-xl sm:text-2xl font-serif font-medium text-slate-900 leading-snug">
                        Step into the wild, breathe freedom, let Every trek tell your story.
                      </h2>
                      <div className="absolute -bottom-4 -left-6 flex items-center gap-1 z-20">
                        <MousePointer2 className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[10px] shadow">
                          Jane
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      A welcoming community of nature lovers, adventurers, and explorers as we uncover paths less traveled together.
                    </p>

                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button type="button" className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5">
                        <span>Start Trekking</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button type="button" className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-sm">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-mono border border-slate-200">
                      ⚡ Made with Prompt2Web
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 1: 10M+ USERS + 3 DEVICES (SPIDER-MAN, IPHONE, STORE)   */}
          {/* ============================================================= */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between">
            <div className="text-center space-y-1 z-10 pt-2 h-16 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-2">
                <svg className="w-7 h-7 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 2C9 5 7 9 7 14c0 3 1.5 6 5 8" />
                  <path d="M7 5c-2 1-3 3-3 5s1 3 3 3" />
                  <path d="M6 11c-2 1-3 3-3 5s1 3 3 2" />
                  <path d="M7 17c-1.5 1-2 2.5-1.5 4" />
                </svg>
                <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">10M+ users</span>
                <svg className="w-7 h-7 text-white/90 -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 2C9 5 7 9 7 14c0 3 1.5 6 5 8" />
                  <path d="M7 5c-2 1-3 3-3 5s1 3 3 3" />
                  <path d="M6 11c-2 1-3 3-3 5s1 3 3 2" />
                  <path d="M7 17c-1.5 1-2 2.5-1.5 4" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-white/90 max-w-sm mx-auto">
                worldwide building &amp; launching real applications in minutes.
              </p>
            </div>

            {/* Triple Device Showcase */}
            <div className="h-[430px] flex items-center justify-center gap-4 sm:gap-6 z-10 overflow-hidden relative">
              {/* Device 1: Spider-Man Dark Browser */}
              <div className="hidden md:block w-48 lg:w-56 h-[340px] rounded-2xl bg-[#0f1115] border border-black/40 shadow-2xl overflow-hidden transform -translate-x-3 opacity-90 transition-all hover:opacity-100">
                <div className="h-7 bg-[#181a1f] px-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">spiderman.app</span>
                </div>
                <div className="p-3 text-center space-y-2 text-white font-sans">
                  <div className="h-28 bg-gradient-to-b from-rose-900/60 to-black rounded-lg p-2 flex flex-col justify-end">
                    <span className="text-xl font-black text-white font-mono leading-none">SPIDER-MAN</span>
                    <span className="text-[9px] text-sky-300 font-bold">MULTIVERSE</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-center gap-1 text-xs">🕷️ 🕷️ 🕷️ 🕷️</div>
                    <p className="text-[9px] text-slate-300 leading-tight">When space-time tears...</p>
                  </div>
                  <button type="button" className="w-full py-1.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                    Watch Trailer
                  </button>
                </div>
              </div>

              {/* Device 2: Center Realistic iPhone Mockup */}
              <div className="w-[220px] sm:w-[240px] h-[420px] sm:h-[430px] rounded-[44px] bg-black border-[7px] border-[#181b22] shadow-2xl overflow-hidden relative z-20 flex flex-col justify-between select-none">
                <div className="h-6 w-full flex items-center justify-between px-6 pt-1 text-[10px] text-white font-mono z-30">
                  <span>9:41</span>
                  <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px]">5G</span>
                    <div className="w-3 h-1.5 border border-white rounded-sm bg-white" />
                  </div>
                </div>

                <div className="px-3.5 py-2 flex-1 flex flex-col justify-between font-sans text-white text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 font-medium">Daily Vitals</div>
                      <div className="text-xs font-bold">Sarah Jenkins</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-amber-200 overflow-hidden text-[9px] flex items-center justify-center font-bold text-black">
                      SJ
                    </div>
                  </div>

                  <div className="bg-[#181a1f] p-3 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-emerald-400 font-bold">Optimal Rhythm</span>
                      <span className="text-slate-400 font-mono">72 BPM</span>
                    </div>
                    <div className="h-10 flex items-end justify-between gap-1 px-1">
                      {[40, 65, 45, 85, 95, 55, 75, 90, 60].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-2.5 rounded-t-sm transition-all ${
                            i === 4 ? 'bg-rose-500' : 'bg-emerald-400/80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#181a1f] p-2.5 rounded-xl border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-300">Sleep Score</span>
                      <span className="text-sky-400 font-bold">88%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full w-[88%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-[#181a1f] p-2 rounded-xl border border-white/5">
                      <div className="text-slate-400 text-[8px]">Hydration</div>
                      <div className="font-bold text-xs text-white">2.4 L</div>
                    </div>
                    <div className="bg-[#181a1f] p-2 rounded-xl border border-white/5">
                      <div className="text-slate-400 text-[8px]">Calories</div>
                      <div className="font-bold text-xs text-white">1,840</div>
                    </div>
                  </div>
                </div>

                <div className="h-5 flex justify-center items-center pb-1">
                  <div className="w-24 h-1 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Device 3: Ink & Chaos Storefront */}
              <div className="hidden md:block w-48 lg:w-56 h-[340px] rounded-2xl bg-[#fdfaf3] text-black border border-black/30 shadow-2xl overflow-hidden transform translate-x-3 opacity-90 transition-all hover:opacity-100 font-sans select-none">
                <div className="h-7 bg-[#ede8dc] px-3 flex items-center justify-between border-b border-black/10">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-600">inkandchaos.com</span>
                </div>
                <div className="p-3 text-center space-y-2">
                  <div className="text-lg font-serif font-black tracking-widest text-neutral-900 leading-none pt-1">
                    INK &amp; CHAOS
                  </div>
                  <p className="text-[9px] text-neutral-600 tracking-wider uppercase">Fine Stationery</p>
                  <div className="h-28 bg-[#f5efe3] rounded-lg p-2 border border-neutral-300/80 flex items-center justify-center">
                    <span className="text-xs font-serif italic text-neutral-700">Artisan Journal No. 4</span>
                  </div>
                  <button type="button" className="w-full py-1.5 rounded-full bg-neutral-900 text-white font-bold text-[10px]">
                    Add to Cart — $34
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 2: FINTECH & REAL-TIME TRADING (NEXUS CRYPTO TERMINAL)  */}
          {/* ============================================================= */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between">
            <div className="text-center space-y-1 z-10 pt-2 h-16 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="text-xl">📈</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  High-Frequency FinTech
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-white/90 max-w-md mx-auto">
                Real-time WebSocket depth charts, instant order routing &amp; live transaction feeds.
              </p>
            </div>

            {/* FinTech Dark Terminal Mockup */}
            <div className="h-[430px] flex items-center justify-center z-10 w-full px-2 sm:px-4">
              <div className="w-full max-w-2xl rounded-2xl bg-[#090b0e] text-white shadow-2xl border-4 border-slate-900 overflow-hidden relative select-none">
                <div className="h-8 bg-[#12161f] px-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 pl-2">nexus-terminal.io</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className="text-emerald-400 font-bold">BTC/USD $94,320.00 (+5.8%)</span>
                    <span className="text-sky-400 font-bold">ETH $3,420.50</span>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-12 gap-4">
                  {/* Left: Candlestick simulator */}
                  <div className="col-span-8 bg-[#0e121a] p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">1H Candlestick Chart</span>
                      <span className="text-emerald-400">Vol: 42,910 BTC</span>
                    </div>
                    {/* Simulated Candlesticks */}
                    <div className="h-40 flex items-end justify-between gap-1.5 pt-4 px-2 border-b border-slate-800">
                      {[
                        { h: 60, up: true },
                        { h: 45, up: false },
                        { h: 80, up: true },
                        { h: 70, up: false },
                        { h: 95, up: true },
                        { h: 85, up: true },
                        { h: 110, up: true },
                        { h: 90, up: false },
                        { h: 125, up: true },
                        { h: 140, up: true },
                        { h: 130, up: false },
                        { h: 155, up: true },
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center justify-end h-full w-full">
                          <div className={`w-[1px] h-2 ${bar.up ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                          <div
                            style={{ height: `${bar.h}px` }}
                            className={`w-3.5 rounded-sm ${
                              bar.up ? 'bg-emerald-400/90' : 'bg-rose-500/90'
                            }`}
                          />
                          <div className={`w-[1px] h-2 ${bar.up ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>EMA(20): $93,810</span>
                      <span className="text-emerald-400 font-bold">RSI(14): 64.2 (Bullish)</span>
                    </div>
                  </div>

                  {/* Right: Order Book & Execution */}
                  <div className="col-span-4 bg-[#0e121a] p-3 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-2 font-mono text-[10px]">
                    <div className="font-bold text-slate-300">Live Order Depth</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-rose-400">
                        <span>94,330</span><span>0.84 BTC</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>94,325</span><span>1.22 BTC</span>
                      </div>
                      <div className="border-y border-slate-800 py-0.5 text-center font-bold text-white">
                        $94,320.00 Spread 0.50
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>94,315</span><span>2.10 BTC</span>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>94,310</span><span>3.45 BTC</span>
                      </div>
                    </div>
                    <div className="pt-2 flex gap-1.5">
                      <button type="button" className="flex-1 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px]">
                        BUY
                      </button>
                      <button type="button" className="flex-1 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-[10px]">
                        SELL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 3: AI CLOUD STUDIO & ZERO-CONFIG FULLSTACK COMPILER     */}
          {/* ============================================================= */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between">
            <div className="text-center space-y-1 z-10 pt-2 h-16 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="text-xl">⚡</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  Prompt2Web Cloud Studio
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-white/90 max-w-md mx-auto">
                AI agents that architect semantic HTML, compile CSS &amp; deploy to cloud edge in seconds.
              </p>
            </div>

            {/* Cloud IDE & Live Preview Mockup */}
            <div className="h-[430px] flex items-center justify-center z-10 w-full px-2 sm:px-4">
              <div className="w-full max-w-2xl rounded-2xl bg-[#0b0e14] text-white shadow-2xl border-4 border-slate-900 overflow-hidden relative select-none font-mono">
                <div className="h-8 bg-[#151922] px-4 flex items-center justify-between border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] text-slate-300 pl-2">prompt2web-studio / workspace</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400">Deployed to Vercel</span>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-12 gap-3 h-[270px]">
                  {/* Left: Code Editor View */}
                  <div className="col-span-6 bg-[#080a0f] p-3 rounded-xl border border-slate-800/80 text-[10px] leading-relaxed space-y-1 overflow-hidden">
                    <div className="text-slate-500 pb-1 border-b border-slate-800">// Generated in 1.4s by AI Agent</div>
                    <div><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-300">App</span>() &#123;</div>
                    <div className="pl-3"><span className="text-purple-400">const</span> [metrics] = <span className="text-sky-400">useLiveTelemetry</span>();</div>
                    <div className="pl-3"><span className="text-purple-400">return</span> (</div>
                    <div className="pl-6 text-emerald-300">&lt;<span className="text-rose-400">main</span> className="dashboard"&gt;</div>
                    <div className="pl-9 text-slate-300">&lt;<span className="text-sky-300">MetricGrid</span> items=&#123;metrics&#125; /&gt;</div>
                    <div className="pl-9 text-slate-300">&lt;<span className="text-sky-300">DeployPipeline</span> auto=&#123;true&#125; /&gt;</div>
                    <div className="pl-6 text-emerald-300">&lt;/<span className="text-rose-400">main</span>&gt;</div>
                    <div className="pl-3">);</div>
                    <div>&#125;</div>
                  </div>

                  {/* Right: Live Interactive Output Preview */}
                  <div className="col-span-6 bg-white text-slate-900 p-3 rounded-xl shadow-inner flex flex-col justify-between font-sans">
                    <div className="flex items-center justify-between border-b pb-2 text-[10px]">
                      <span className="font-bold">App Preview</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[9px]">LIVE</span>
                    </div>
                    <div className="space-y-2 py-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span>Active Telemetry</span>
                        <span className="text-sky-600">99.98% Up</span>
                      </div>
                      <div className="h-16 bg-slate-100 rounded-lg p-2 flex items-end gap-1 justify-between">
                        {[50, 70, 40, 90, 80, 60, 95].map((val, idx) => (
                          <div key={idx} style={{ height: `${val}%` }} className="w-3 bg-sky-500 rounded-t" />
                        ))}
                      </div>
                    </div>
                    <button type="button" className="w-full py-1.5 rounded-md bg-slate-950 text-white font-bold text-[10px] flex items-center justify-center gap-1">
                      <span>Open in Browser</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="px-4 py-2 bg-[#12161f] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>● TypeScript 5.4 • TailwindCSS • React 18</span>
                  <span className="text-sky-400 font-bold">Zero Setup Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Carousel Navigation Controls (4 Slides) */}
      <div className="flex items-center justify-center gap-3 pt-3 z-30 select-none">
        <button
          type="button"
          onClick={() => setActiveSlide((prev) => (prev - 1 + 4) % 4)}
          className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-transform active:scale-90 outline-none focus:outline-none focus:ring-0 ring-0 border-none cursor-pointer"
          title="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 outline-none focus:outline-none focus:ring-0 ring-0 border-none cursor-pointer ${
                activeSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActiveSlide((prev) => (prev + 1) % 4)}
          className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-transform active:scale-90 outline-none focus:outline-none focus:ring-0 ring-0 border-none cursor-pointer"
          title="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

export default function Landing() {
  const navigate = useNavigate();
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when Auth modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [isAuthModalOpen]);

  const handleOAuthLogin = (provider) => {
    const mockUser = {
      name: `${provider} Operator`,
      email: `operator@${provider.toLowerCase()}.com`,
      token: `auth_${provider}_${Date.now()}`,
    };
    localStorage.setItem('prompt2web_user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const featureTabs = [
    {
      id: 0,
      icon: <Globe className="w-5 h-5" />,
      title: 'Build websites and mobile apps',
      description:
        'Transform your ideas into fully functional websites and mobile apps with instant deployment, seamless data connections, and powerful scalability.',
    },
    {
      id: 1,
      icon: <Bot className="w-5 h-5" />,
      title: 'Build custom agents',
      description:
        'Create autonomous AI agents tailored to your business logic that analyze, automate, and execute tasks 24/7 with zero configuration.',
    },
    {
      id: 2,
      icon: <Zap className="w-5 h-5" />,
      title: 'Build powerful integrations',
      description:
        'Connect with APIs, databases, payment gateways, and third-party tools seamlessly with automatic API scaffolding and clean code.',
    },
  ];

  const faqs = [
    {
      q: 'What is Prompt2Web and how does it work?',
      a: 'Prompt2Web is an AI-powered development platform that transforms your ideas into fully functional applications. Simply describe what you want to build in natural language, and our AI handles the coding, design, and deployment. No programming experience required.',
    },
    {
      q: 'What can I build with Prompt2Web?',
      a: 'You can build everything from high-converting marketing landing pages, SaaS dashboards, and e-commerce stores to real-time Web3 terminals, portfolio websites, and internal business tools with complete multi-device responsiveness.',
    },
    {
      q: "How does Prompt2Web's pricing work?",
      a: 'Prompt2Web offers a free starter tier with full access to the AI prompt studio and live sandboxes. Pro plans include unlimited workspace generations, custom domain deployments, and priority LLM token allocation.',
    },
    {
      q: 'Do I need coding experience to use Prompt2Web?',
      a: 'Not at all! Prompt2Web is designed for non-technical founders, operators, and developers alike. You simply describe your vision in conversational language, and the platform generates clean semantic HTML, global CSS, and reactive JS automatically.',
    },
    {
      q: 'How is Prompt2Web different from other no-code platforms?',
      a: 'Unlike clunky visual drag-and-drop builders that produce bloated, unmaintainable code, Prompt2Web strictly enforces clean architecture with a single centralized styles.css, semantic HTML5, and zero vendor lock-in.',
    },
    {
      q: 'What happens to the code Prompt2Web creates?',
      a: 'You own 100% of your code. You can download a full, clean ZIP of your project anytime and run it locally, push to GitHub, or deploy it instantly to Vercel, Netlify, or any standard web server.',
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* ================================================================= */}
      {/* FLOATING TOP-RIGHT "GET STARTED" BUTTON (APPEARS ON SCROLL)       */}
      {/* ================================================================= */}
      <div
        className={`fixed top-5 right-6 sm:right-10 z-50 transition-all duration-300 ${
          isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 -translate-y-3 pointer-events-none scale-95'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-slate-950 font-bold text-xs font-sans flex items-center gap-2 shadow-2xl transition-all active:scale-95 cursor-pointer outline-none border border-black/10"
        >
          <span>Get Started</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ================================================================= */}
      {/* 1. TOP NAVBAR (SCROLLS AWAY ON PAGE SCROLL)                       */}
      {/* ================================================================= */}
      <header className="relative z-40 bg-transparent border-none">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <RotatingAiLogo size="sm" showDust={false} />
            <span className="font-extrabold text-2xl tracking-tight text-white font-sans lowercase">
              prompt<span className="text-sky-400">2</span>web
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Teams
            </a>
            <a href="#faqs" className="hover:text-white transition-colors">
              FAQs
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-slate-950 font-bold text-xs font-sans flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-none cursor-pointer outline-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. HERO SPLIT: AUTH CONSOLE + ISOLATED BLUE CAROUSEL              */}
      {/* ================================================================= */}
      <main className="max-w-[1520px] mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 flex flex-col lg:flex-row items-stretch justify-between gap-8 sm:gap-12">
        {/* LEFT COLUMN: INTERACTIVE AUTH CONSOLE (SOCIAL, EMAIL, PHONE) */}
        <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 flex flex-col justify-center py-6 px-4 sm:px-6 z-10">
          <AuthConsole />
        </div>

        {/* RIGHT COLUMN: ISOLATED CAROUSEL (NEVER RE-RENDERS PARENT LANDING) */}
        <HeroCarousel />
      </main>

      {/* ================================================================= */}
      {/* 3. WHAT CAN PROMPT2WEB DO FOR YOU? (SCREENSHOT 3)                 */}
      {/* ================================================================= */}
      <section id="features" className="max-w-[1520px] mx-auto w-full px-4 sm:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            What can Prompt2Web do for you?
          </h2>
          <p className="text-slate-400 text-sm font-sans leading-relaxed">
            From concept to deployment, Prompt2Web handles every aspect of software development so you can focus on what matters most - your vision!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Feature Selector Tabs */}
          <div className="lg:col-span-5 space-y-6">
            {featureTabs.map((tab) => {
              const isActive = activeFeatureTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isActive ? 'bg-transparent text-white' : 'hover:bg-white/[0.02] text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    <h3
                      className={`text-xl font-bold font-sans ${
                        isActive ? 'text-sky-400' : 'text-white'
                      }`}
                    >
                      {tab.title}
                    </h3>
                  </div>

                  {isActive && (
                    <p className="mt-3 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed pl-8 animate-fade-in">
                      {tab.description}
                    </p>
                  )}

                  <div className="mt-6 border-b border-slate-800/80" />
                </div>
              );
            })}
          </div>

          {/* Right Showcase: Bookstore Mockup */}
          <div className="lg:col-span-7 rounded-[36px] bg-gradient-to-tr from-[#1b6b93] via-[#318ea8] to-[#4fc0d0] p-6 sm:p-8 relative overflow-hidden shadow-2xl flex items-center justify-center min-h-[480px]">
            <div className="w-full max-w-xl rounded-2xl bg-white text-slate-900 shadow-2xl overflow-hidden border border-black/20 select-none">
              <div className="h-10 bg-[#f8fafc] px-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-sans">
                  <span>Home</span>
                  <span>Library</span>
                  <span>Community</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-slate-900 text-white text-[10px] font-bold">
                  Sign Up
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700">Explore Best Sellers</div>
                  <div className="text-[10px] text-sky-600 font-semibold">View All ➔</div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <div className="h-32 rounded-lg bg-[#e29578] p-2 flex flex-col justify-between text-white">
                      <span className="text-[8px] font-bold">THE LOOTING</span>
                      <span className="text-[10px] font-black leading-tight">MACHINE</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-800 truncate">The Looting Machine</div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-32 rounded-lg bg-[#ffddd2] p-2 flex flex-col justify-between text-slate-900">
                      <span className="text-[8px] font-bold">FOCUS</span>
                      <span className="text-[10px] font-black leading-tight">Hyperfocus</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-800 truncate">Chris Bailey</div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-32 rounded-lg bg-[#e76f51] p-2 flex flex-col justify-between text-white">
                      <span className="text-[8px] font-bold">VOICE</span>
                      <span className="text-[10px] font-black leading-tight">SPEAK NO FEAR</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-800 truncate">Speak with No Fear</div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-32 rounded-lg bg-[#2a9d8f] p-2 flex flex-col justify-between text-white">
                      <span className="text-[8px] font-bold">STRATEGY</span>
                      <span className="text-[10px] font-black leading-tight">ILLUSION</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-800 truncate">Richard Shotton</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-4 right-6 w-36 h-72 rounded-[32px] bg-black border-[5px] border-slate-900 shadow-2xl overflow-hidden z-20">
              <div className="pt-1.5 flex justify-center">
                <div className="w-14 h-3 bg-black rounded-full" />
              </div>
              <div className="p-2 text-white text-[8px] font-sans space-y-2">
                <div className="font-bold text-amber-300">Book Hub</div>
                <div className="h-28 rounded bg-[#e29578] p-1.5 flex flex-col justify-end text-[8px] font-black">
                  MACHINE
                </div>
                <div className="h-16 rounded bg-[#2a9d8f] p-1.5 flex flex-col justify-end text-[8px] font-black">
                  ILLUSION
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. FAQS ACCORDION (EXACT SCREENSHOT 2 MATCH)                      */}
      {/* ================================================================= */}
      <section id="faqs" className="max-w-[1520px] mx-auto w-full px-4 sm:px-8 py-20">
        <div className="max-w-4xl mx-auto space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="border-b border-slate-800/80 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-sans font-bold text-base sm:text-lg transition-colors hover:text-sky-300"
                >
                  <span className={isOpen ? 'text-sky-400' : 'text-white'}>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-sky-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="pb-6 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed max-w-3xl animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. HIGH-CONVERSION SKY CLOUDS BANNER (SCREENSHOT 1)               */}
      {/* ================================================================= */}
      <section className="w-full relative overflow-hidden py-24 sm:py-32 my-6">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/sky_clouds_banner.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black text-white font-sans tracking-tight drop-shadow-md">
            Start building on Prompt2Web today.
          </h2>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-slate-950 font-bold text-sm font-sans transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl cursor-pointer outline-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. COMPLETE ENTERPRISE FOOTER (MATCHES media_1788374932451.png)   */}
      {/* ================================================================= */}
      <Footer />

      {/* ================================================================= */}
      {/* 8. AUTH POPUP MODAL (MATCHES media_1788375547581.png)             */}
      {/* ================================================================= */}
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-modal-overlay"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="w-full max-w-[480px] rounded-[36px] bg-[#11141b] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Code Glyph Watermark inside modal matching screenshot */}
            <div className="absolute inset-0 pointer-events-none select-none p-5 opacity-15 font-mono text-[11px] text-slate-400 tracking-[0.25em] leading-relaxed whitespace-pre overflow-hidden">
              {`F W Q R - U & σ 8    V + D U F
F N T R G U Z I U . N K λ S    θ * v B
Q G M O T σ Z R V N    O C & . M π
Q V . * @ X & R . θ . V λ    V S S
C 0 N + Z C + N U T L    Q Q σ J . K
+ U N δ . H Ω Ω Z W λ    A Z X . R
μ φ * * - M U M E * v    H L M X & H
F γ U δ S X Z Ω U β l    O & O P C
- S & β R + T D    S A + B O D Y`}
            </div>

            <AuthConsole isModal={true} onClose={() => setIsAuthModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
