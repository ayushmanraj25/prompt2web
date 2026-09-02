import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RotatingAiLogo from './RotatingAiLogo';
import {
  Mail,
  Smartphone,
  Github,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  User,
  Lock,
  Eye,
  EyeOff,
  X,
  Terminal,
} from 'lucide-react';

export default function AuthConsole({ isModal = false, onClose }) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('social'); // 'social' | 'email' | 'phone'
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleLoginSuccess = (providerOrType) => {
    const displayName = name.trim() || `${providerOrType} Creator`;
    const userEmail = email.trim() || (phoneNumber ? `${phoneNumber}@mobile.prompt2web.com` : `operator@${providerOrType.toLowerCase()}.com`);
    
    const mockUser = {
      name: displayName,
      email: userEmail,
      token: `auth_${Date.now()}`,
    };
    localStorage.setItem('prompt2web_user', JSON.stringify(mockUser));
    if (onClose) onClose();
    navigate('/dashboard');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    handleLoginSuccess('Email');
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    handleLoginSuccess('Phone');
  };

  return (
    <div className={`relative flex flex-col justify-between select-none ${isModal ? 'w-full' : 'w-full max-w-sm mx-auto'}`}>
      {/* Close button for Modal */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-30 outline-none"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* 3D Rotating AI Emblem */}
      <div className="flex justify-center pb-2">
        <RotatingAiLogo size={isModal ? 'md' : 'lg'} showDust={true} />
      </div>

      {/* Headings */}
      <div className="space-y-1.5 text-center py-1">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight font-sans leading-tight">
          Describe your idea
        </h2>
        <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-emerald-400 font-sans tracking-tight leading-tight">
          Build websites &amp; apps with AI
        </h3>
      </div>

      {/* ============================================================= */}
      {/* 1. SOCIAL BUTTONS VIEW (DEFAULT)                              */}
      {/* ============================================================= */}
      {authMode === 'social' && (
        <div className="w-full space-y-3.5 py-4 max-w-sm mx-auto animate-form-switch">
          {/* Big White Google Pill Button (Non-clickable for now) */}
          <div
            className="w-full py-4 px-5 rounded-full bg-white text-neutral-900 font-bold text-sm font-sans flex items-center justify-center gap-3 shadow-none cursor-default select-none opacity-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </div>

          {/* Circular Social Buttons: GitHub, Apple, Meta, DEV Login */}
          <div className="flex items-center justify-center gap-4 py-1">
            <div
              className="w-14 h-14 rounded-full bg-[#181b22] text-white flex items-center justify-center shadow-none border border-slate-800/80 cursor-default select-none opacity-90"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </div>

            <div
              className="w-14 h-14 rounded-full bg-[#181b22] text-white flex items-center justify-center shadow-none border border-slate-800/80 cursor-default select-none opacity-90"
              title="Apple"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.81 1.11-1.94.99-3.07-1 .04-2.16.66-2.82 1.43-.58.67-1.1 1.77-.96 2.87 1.12.09 2.13-.42 2.79-1.23z" />
              </svg>
            </div>

            <div
              className="w-14 h-14 rounded-full bg-[#181b22] text-[#1877F2] flex items-center justify-center shadow-none border border-slate-800/80 cursor-default select-none opacity-90"
              title="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>

            {/* Dev Login Bypass Button (Workable Instant Dashboard with Spring Animation) */}
            <button
              type="button"
              onClick={() => {
                const devUser = {
                  name: 'Dev Operator',
                  email: 'dev@prompt2web.com',
                  token: `dev_bypass_${Date.now()}`,
                };
                localStorage.setItem('prompt2web_user', JSON.stringify(devUser));
                if (onClose) onClose();
                navigate('/dashboard');
              }}
              className="w-14 h-14 rounded-full bg-[#181b22] hover:bg-emerald-950/50 text-emerald-400 hover:text-emerald-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_22px_rgba(16,185,129,0.5)] border border-emerald-500/60 hover:border-emerald-400 cursor-pointer group relative"
              title="Dev Login (Instant Workable Dashboard)"
            >
              <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -bottom-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-black text-[8px] font-mono leading-tight tracking-wider uppercase shadow">
                DEV
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-dashed border-slate-800" />
            <span className="bg-[#0e1014] px-3 text-xs font-mono text-slate-500 uppercase tracking-widest absolute">
              OR
            </span>
          </div>

          {/* Continue with Email */}
          <button
            type="button"
            onClick={() => setAuthMode('email')}
            className="w-full py-3.5 px-5 rounded-full bg-[#15181e] hover:bg-slate-800/90 border border-slate-800 hover:border-slate-600 text-slate-200 hover:text-white font-sans text-xs font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-none cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Continue with Email</span>
          </button>

          {/* Continue with Phone */}
          <button
            type="button"
            onClick={() => setAuthMode('phone')}
            className="w-full py-3.5 px-5 rounded-full bg-[#15181e] hover:bg-slate-800/90 border border-slate-800 hover:border-slate-600 text-slate-200 hover:text-white font-sans text-xs font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-none cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span>Continue with Phone</span>
          </button>
        </div>
      )}

      {/* ============================================================= */}
      {/* 2. CONTINUE WITH EMAIL VIEW (MATCHES media_1788376257793.png)  */}
      {/* ============================================================= */}
      {authMode === 'email' && (
        <form onSubmit={handleEmailSubmit} className="w-full space-y-3.5 py-4 max-w-sm mx-auto animate-form-switch">
          {/* Enter your name */}
          {!isSignIn && (
            <div className="relative flex items-center">
              <User className="absolute left-4.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full py-3.5 pl-12 pr-4 rounded-full bg-[#13161d] border border-slate-700/70 text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
          )}

          {/* Enter your email */}
          <div className="relative flex items-center">
            <Mail className="absolute left-4.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full py-3.5 pl-12 pr-4 rounded-full bg-[#13161d] border border-slate-700/70 text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          {/* Enter your password */}
          <div className="relative flex items-center">
            <Lock className="absolute left-4.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full py-3.5 pl-12 pr-12 rounded-full bg-[#13161d] border border-slate-700/70 text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4.5 text-slate-400 hover:text-white transition-colors cursor-pointer outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Submit Button: Get Started ➔ */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[#e2e2e5] hover:bg-white text-slate-950 font-bold text-sm font-sans flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <span>{isSignIn ? 'Sign In' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button: < Go Back */}
            <button
              type="button"
              onClick={() => setAuthMode('social')}
              className="w-full py-3.5 px-6 rounded-full bg-[#1a1d25] hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs font-sans flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-slate-700/60 hover:border-slate-500"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================= */}
      {/* 3. CONTINUE WITH PHONE VIEW (MATCHES media_1788376325170.png)  */}
      {/* ============================================================= */}
      {authMode === 'phone' && (
        <form onSubmit={handlePhoneSubmit} className="w-full space-y-3.5 py-4 max-w-sm mx-auto animate-form-switch">
          {/* Enter your name */}
          {!isSignIn && (
            <div className="relative flex items-center">
              <User className="absolute left-4.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full py-3.5 pl-12 pr-4 rounded-full bg-[#13161d] border border-slate-700/70 text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
          )}

          {/* Country Flag & Mobile Number Input */}
          <div className="flex items-center rounded-full bg-[#13161d] border border-slate-700/70 px-4 py-1.5 focus-within:border-slate-400 transition-colors">
            <div className="flex items-center gap-1.5 pr-3 border-r border-slate-700 text-xs font-sans text-slate-300 shrink-0">
              <span className="text-base select-none">🇮🇳</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-slate-200 pl-1">{countryCode}</span>
            </div>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full py-2 pl-3 pr-2 bg-transparent text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none"
            />
          </div>

          {/* Bottom Action Row: Dark Round Back Arrow + Get Code Pill */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAuthMode('social')}
              className="w-14 h-14 rounded-full bg-[#1a1d25] hover:bg-slate-800 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-700/60 hover:border-slate-500 cursor-pointer shrink-0"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-full bg-[#dedede] hover:bg-white text-slate-950 font-bold text-sm font-sans flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <span>Get code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Subtext: Terms & Privacy */}
      <p className="text-[11px] font-sans text-slate-500 text-center leading-relaxed pt-2">
        By continuing, you agree to our{' '}
        <span className="text-slate-300 underline cursor-pointer">Terms of Service</span> and{' '}
        <span className="text-slate-300 underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
}
