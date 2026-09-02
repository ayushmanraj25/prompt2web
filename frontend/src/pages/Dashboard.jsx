import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { apiClient } from '../api/client';
import Footer from '../components/Footer';
import AccountSettingsModal from '../components/AccountSettingsModal';
import {
  LayoutGrid,
  Globe,
  Image as ImageIcon,
  Plus,
  Mic,
  ArrowUp,
  LogOut,
  User,
  Sun,
  Moon,
  Monitor,
  Check,
  Sparkles,
  Download,
  Copy,
  X,
  RefreshCw,
  Zap,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { fetchProjects, createNewProject } = useProjectStore();
  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);

  // Active Tab: 'FSWD' or 'IMAGE'
  const [activeTab, setActiveTab] = useState('FSWD'); // 'FSWD' | 'IMAGE'
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);

  // Image Generation States (Groq Llama-3.3-70B + FLUX.1)
  const [aspectRatio, setAspectRatio] = useState('1:1'); // '1:1' | '16:9' | '9:16'
  const [imageResult, setImageResult] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [generationStep, setGenerationStep] = useState(''); // 'groq' | 'flux' | ''

  // Profile Dropdown & Language State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en'); // 'en' | 'hi'
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  // Workable Theme State: 'dark' | 'light' | 'system'
  const [theme, setTheme] = useState(() => localStorage.getItem('prompt2web_theme') || 'dark');

  // Speech Dictation
  const [isListening, setIsListening] = useState(false);

  // Initialize User & Projects
  useEffect(() => {
    const storedUser = localStorage.getItem('prompt2web_user');
    if (!storedUser) {
      const defaultUser = { name: 'Ayushman Raj', email: 'ayushman@prompt2web.com' };
      localStorage.setItem('prompt2web_user', JSON.stringify(defaultUser));
      setUser(defaultUser);
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: 'Ayushman Raj', email: 'ayushman@prompt2web.com' });
      }
    }

    fetchProjects();
  }, [fetchProjects]);

  // Lock background scroll when Image Modal is open
  useEffect(() => {
    if (showImageModal) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [showImageModal]);

  // Workable Theme Sync with DOM
  useEffect(() => {
    localStorage.setItem('prompt2web_theme', theme);
    const root = document.documentElement;

    const applyTheme = () => {
      if (theme === 'light') {
        root.classList.add('light-mode');
      } else if (theme === 'dark') {
        root.classList.remove('light-mode');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.remove('light-mode');
        } else {
          root.classList.add('light-mode');
        }
      }
    };

    applyTheme();

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileMenu(false);
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('prompt2web_user');
    navigate('/');
  };

  const handlePromptSubmit = async (e) => {
    e?.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);

    // =========================================================================
    // 2-STAGE IMAGE GENERATION (GROQ LLAMA-3.3-70B + FLUX.1 DIFFUSION)
    // =========================================================================
    if (activeTab === 'IMAGE') {
      const promptToGenerate = promptInput.trim();
      setShowImageModal(true);
      setIsImageLoading(true);
      setImageError(false);
      setImageResult({
        original_prompt: promptToGenerate,
        enhanced_prompt: '⚡ Groq Llama-3.3-70B is analyzing and enhancing your visual prompt with professional cinematography attributes...',
        image_url: '',
      });
      setGenerationStep('Groq Llama-3.3-70B is engineering your prompt...');

      try {
        const res = await apiClient.generateImage(promptToGenerate, {
          aspect_ratio: aspectRatio,
          enhance_with_groq: true,
        });
        setImageResult(res);
        setGenerationStep('FLUX.1 Diffusion is synthesizing your high-resolution image...');
      } catch (err) {
        console.error('Failed to generate image:', err);
        setImageError(true);
      } finally {
        setIsGenerating(false);
        setGenerationStep('');
      }
      return;
    }

    // =========================================================================
    // FSWD FULLSTACK WEB APP GENERATION
    // =========================================================================
    try {
      const generatedTitle =
        promptInput.trim().slice(0, 32).replace(/[^\w\s]/gi, '').trim() ||
        'Fullstack Web App';

      const project = await createNewProject(
        generatedTitle,
        promptInput.trim(),
        'landing-page'
      );

      setTimeout(() => {
        navigate(`/editor/${project.id}`);
      }, 350);
    } catch (err) {
      console.error('Failed to create project:', err);
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!imageResult?.image_url) return;
    try {
      const res = await fetch(imageResult.image_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt2web-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageResult.image_url, '_blank');
    }
  };

  const handleCopyPrompt = () => {
    if (!imageResult?.enhanced_prompt) return;
    navigator.clipboard.writeText(imageResult.enhanced_prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPromptInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white relative overflow-x-hidden animate-fadeIn">
      {/* ================================================================= */}
      {/* 1. TOP NAVBAR (WITH ELEGANT SUBTLE BORDER)                        */}
      {/* ================================================================= */}
      <header className="relative z-40 bg-[#08090b]/40 backdrop-blur-sm px-6 sm:px-12 py-5 flex items-center justify-between select-none border-b border-white/[0.08]">
        {/* Left: Home Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-[#14171f]/90 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2.5 text-sm font-sans font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-white/5 cursor-pointer shadow-sm"
        >
          <LayoutGrid className="w-4 h-4 text-slate-400" />
          <span>Home</span>
        </button>

        {/* Right: User Avatar Trigger (Opens Clean Profile Dropdown) */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowLangMenu(false);
            }}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold text-sm flex items-center justify-center select-none cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-90 shadow-md"
            title={user?.name || 'Ayushman Raj'}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </button>

          {/* ============================================================= */}
          {/* PROFILE DROPDOWN                                              */}
          {/* ============================================================= */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#161922] border border-slate-700/90 p-3 shadow-2xl z-50 animate-modal-pop text-sm font-sans space-y-3">
              {/* Heading: User Name */}
              <div className="px-3 py-2 border-b border-white/5">
                <div className="font-bold text-white text-sm truncate">{user?.name || 'Ayushman Raj'}</div>
                <div className="text-[11px] text-slate-400 truncate">{user?.email || 'ayushman@prompt2web.com'}</div>
              </div>

              {/* Menu Items: Account Settings & Language */}
              <div className="space-y-1 text-slate-300 text-xs font-medium">
                {/* Account Setting */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountSettingsOpen(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </button>

                {/* Language (English & Hindi) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span>Language</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono uppercase">
                      {selectedLang === 'hi' ? 'Hindi' : 'English'}
                    </span>
                  </button>

                  {/* Language Flyout: ONLY English & Hindi */}
                  {showLangMenu && (
                    <div className="absolute right-full top-0 mr-2 w-48 rounded-2xl bg-[#161922] border border-slate-700 p-2 shadow-2xl z-50 animate-modal-pop text-xs space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang('en');
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                          selectedLang === 'en'
                            ? 'bg-white/10 text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇺🇸</span>
                          <span>English</span>
                        </span>
                        {selectedLang === 'en' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang('hi');
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                          selectedLang === 'hi'
                            ? 'bg-white/10 text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇮🇳</span>
                          <span>Hindi (हिंदी)</span>
                        </span>
                        {selectedLang === 'hi' && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: Logout + Fully Workable Theme Switcher */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between px-1">
                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-xs font-semibold cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4 stroke-[2.2]" />
                  <span>Logout</span>
                </button>

                {/* Workable Theme Switcher Pill */}
                <div className="flex items-center gap-1 p-1 rounded-full bg-[#0d0f14] border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-slate-700 text-amber-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Light mode"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      theme === 'system'
                        ? 'bg-slate-700 text-sky-400 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="System default"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-slate-700 text-sky-300 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Dark mode"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. MAIN HERO PROMPT SECTION                                       */}
      {/* ================================================================= */}
      <section className="relative w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-8 pt-16 sm:pt-20 pb-36 z-10 select-none">
        <div className="relative z-10 w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl flex flex-col items-center space-y-10">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-center font-sans max-w-3xl leading-[1.2]">
            {activeTab === 'IMAGE'
              ? 'Imagine with Groq & FLUX. You can change everything later.'
              : 'Start with one prompt. You can change everything later.'}
          </h1>

          {/* Prompt Container with Tabs */}
          <div className="w-full flex flex-col items-start">
            {/* Tabs: [FSWD] & [IMAGE] */}
            <div className="flex items-center gap-2 ml-3">
              <button
                type="button"
                onClick={() => setActiveTab('FSWD')}
                className={`px-6 py-2.5 rounded-t-2xl text-sm font-sans font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === 'FSWD'
                    ? 'bg-[#181b24] text-white border-t border-x border-slate-700/80 shadow-md'
                    : 'bg-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className={`w-4 h-4 ${activeTab === 'FSWD' ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>FSWD</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('IMAGE')}
                className={`px-6 py-2.5 rounded-t-2xl text-sm font-sans font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === 'IMAGE'
                    ? 'bg-[#181b24] text-white border-t border-x border-slate-700/80 shadow-md'
                    : 'bg-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className={`w-4 h-4 ${activeTab === 'IMAGE' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>IMAGE</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  GROQ + FLUX
                </span>
              </button>
            </div>

            {/* Prompt Box with Aspect Ratio Selector for IMAGE mode */}
            <form
              onSubmit={handlePromptSubmit}
              className="w-full rounded-3xl bg-[#181b24] border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative transition-all focus-within:border-slate-500"
            >
              {/* Aspect Ratio Selector (Visible in IMAGE mode) */}
              {activeTab === 'IMAGE' && (
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.04]">
                  <span className="text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Aspect Ratio:</span>
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                    {[
                      { label: '1:1 Square', value: '1:1' },
                      { label: '16:9 Cinema', value: '16:9' },
                      { label: '9:16 Story', value: '9:16' },
                    ].map((ratio) => (
                      <button
                        key={ratio.value}
                        type="button"
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                          aspectRatio === ratio.value
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                ref={textareaRef}
                rows={4}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSubmit();
                  }
                }}
                placeholder={
                  activeTab === 'FSWD'
                    ? 'Describe your idea we will bring it to life..'
                    : 'Describe any image (e.g. "a futuristic cyberpunk supercar in rain") - Groq will enhance & FLUX will generate it..'
                }
                className="w-full bg-transparent text-white placeholder:text-slate-500 font-sans text-base sm:text-lg resize-none focus:outline-none leading-relaxed"
                autoFocus
              />

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                {/* Left: Plus Attachment Button */}
                <button
                  type="button"
                  onClick={() => alert('Attachment & context file upload ready.')}
                  className="w-9 h-9 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Attach Context / Mockups"
                >
                  <Plus className="w-5 h-5" />
                </button>

                {/* Center Generation Status indicator */}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{generationStep || 'Generating AI art...'}</span>
                  </div>
                )}

                {/* Right: Mic Dictation + Up Arrow Submit */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'hover:bg-white/10 text-slate-400 hover:text-white'
                    }`}
                    title={isListening ? 'Listening...' : 'Voice Dictation'}
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  <button
                    type="submit"
                    disabled={!promptInput.trim() || isGenerating}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      promptInput.trim() && !isGenerating
                        ? 'bg-white hover:bg-neutral-200 text-slate-950 cursor-pointer hover:scale-105 active:scale-90 shadow-lg'
                        : 'bg-white/15 text-slate-500 cursor-not-allowed'
                    }`}
                    title={activeTab === 'IMAGE' ? 'Generate AI Image' : 'Generate Project'}
                  >
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. SECTION ON SCROLL: START BUILDING WITH PROMPT2WEB              */}
      {/* ZERO DIVIDING HORIZONTAL LINE (SEAMLESS INTEGRATION)             */}
      {/* WITH LIVE INFINITE LOOPING 3D PERSPECTIVE GRID MOTION             */}
      {/* ================================================================= */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden py-36 px-6 text-center select-none border-none">
        <div className="relative z-10 flex flex-col items-center space-y-5 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-sans">
            Start building with
          </h2>

          {/* Glowing Green LED Dot-Matrix Typography for PROMPT2WEB */}
          <div className="w-full flex justify-center py-4">
            <svg viewBox="0 0 960 130" className="w-full max-w-3xl sm:max-w-4xl h-auto select-none overflow-visible">
              <defs>
                <pattern id="greenDotLed" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                  <circle cx="3.5" cy="3.5" r="2.35" fill="#22c55e" />
                </pattern>
                <filter id="neonLedGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="url(#greenDotLed)"
                filter="url(#neonLedGlow)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontWeight="900"
                fontSize="62"
                letterSpacing="8"
              >
                PROMPT2WEB
              </text>
            </svg>
          </div>

          {/* Center "Keep Building" Pill Button */}
          <div className="pt-8">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (textareaRef.current) {
                  setTimeout(() => textareaRef.current?.focus(), 450);
                }
              }}
              className="px-10 py-4 rounded-full bg-white hover:bg-neutral-100 text-slate-950 font-extrabold text-base font-sans transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              Keep Building
            </button>
          </div>
        </div>

        {/* LIVE 3D PERSPECTIVE GRID: ZERO BORDER LINE + SEAMLESS DEPTH FADE */}
        <div className="absolute inset-x-0 bottom-0 h-[520px] pointer-events-none overflow-hidden flex justify-center z-0">
          <div
            className="w-[160%] h-[720px] border-none animate-live-grid"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(380px) rotateX(66deg)',
              transformOrigin: 'top center',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0) 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,0) 85%)',
            }}
          />
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. REUSABLE ENTERPRISE FOOTER                                     */}
      {/* ================================================================= */}
      <Footer />

      {/* ================================================================= */}
      {/* 5. ACCOUNT SETTINGS MODAL                                         */}
      {/* ================================================================= */}
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      {/* ================================================================= */}
      {/* 6. GROQ + FLUX.1 GENERATED IMAGE SHOWCASE MODAL                   */}
      {/* (MOUNTED VIA CREATEPORTAL AT DOCUMENT BODY LEVEL)                 */}
      {/* ================================================================= */}
      {showImageModal && imageResult && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-modal-overlay select-none"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#12151d] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-modal-pop my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: High-Res Image Display with Loading Shimmer */}
            <div className="w-full md:w-3/5 bg-black/90 flex items-center justify-center p-4 relative min-h-[380px] overflow-hidden">
              {/* Animated Loading Overlay */}
              {isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e1117]/95 z-20 space-y-4 p-6 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-emerald-400 font-bold animate-pulse flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{generationStep || 'FLUX.1 is rendering your masterpiece...'}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      High-resolution diffusion synthesis typically takes 3–5 seconds
                    </p>
                  </div>
                </div>
              )}

              {/* Generated Image Tag */}
              {imageResult.image_url ? (
                <img
                  key={imageResult.image_url}
                  src={imageResult.image_url}
                  alt={imageResult.original_prompt}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setIsImageLoading(false);
                    setImageError(true);
                  }}
                  className={`max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl border border-white/5 transition-opacity duration-500 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="eager"
                />
              ) : null}

              {!isImageLoading && !imageError && (
                <span className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>FLUX.1 Diffusion (1024px)</span>
                </span>
              )}

              {imageError && (
                <div className="text-center p-6 space-y-3 z-10">
                  <p className="text-xs text-rose-400 font-sans">Network timeout loading image preview.</p>
                  {imageResult.image_url && (
                    <a
                      href={imageResult.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs inline-block font-sans"
                    >
                      Open Image in New Tab
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right: Groq Prompt Engineering & Actions Panel */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                      Groq ⚡ Llama-3.3-70B
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Original Prompt */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                    Your Original Prompt:
                  </span>
                  <p className="text-xs text-slate-300 font-sans italic bg-white/5 p-2.5 rounded-xl border border-white/5">
                    "{imageResult.original_prompt}"
                  </p>
                </div>

                {/* Groq Enhanced Master Prompt */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Groq Enhanced Master Prompt:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="text-[11px] font-sans text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed bg-[#181b24] p-3 rounded-xl border border-slate-700/80 max-h-40 overflow-y-auto">
                    {imageResult.enhanced_prompt}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Download & Regenerate */}
              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-slate-950 font-bold text-xs font-sans flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 stroke-[2.2]" />
                  <span>Download High-Res PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowImageModal(false);
                    handlePromptSubmit();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs font-sans flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate New Variation</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
