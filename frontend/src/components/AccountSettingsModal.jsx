import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  X,
  User,
  Key,
  Bot,
  Sliders,
  CreditCard,
  Coins,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function AccountSettingsModal({ isOpen, onClose, user, onUpdateUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || 'Ayushman Raj');
  const [supportCode, setSupportCode] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Lock background scrolling completely when modal is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    const updated = { ...user, name: nameInput.trim() };
    localStorage.setItem('prompt2web_user', JSON.stringify(updated));
    if (onUpdateUser) onUpdateUser(updated);
    setIsEditingName(false);
  };

  const handleGenerateSupportCode = () => {
    const code = `P2W-${Math.floor(1000 + Math.random() * 9000)}-AUTH`;
    setSupportCode(code);
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('prompt2web_user');
    localStorage.removeItem('prompt2web_projects');
    onClose();
    navigate('/');
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-modal-overlay select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overscrollBehavior: 'contain',
      }}
      onWheel={(e) => e.stopPropagation()}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[85vh] rounded-3xl bg-[#12151d] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-modal-pop my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ============================================================= */}
        {/* LEFT SIDEBAR (MATCHES media_1788378985440.png)                */}
        {/* ============================================================= */}
        <div className="w-full md:w-64 bg-[#0d0f14] border-b md:border-b-0 md:border-r border-white/5 p-4 sm:p-5 flex flex-col justify-between shrink-0 select-none">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase px-3 py-2 font-bold">
              ACCOUNT SETTINGS
            </div>

            {/* Profile Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4 text-slate-300" />
              <span className="truncate">{user?.name || 'Ayushman Raj'}</span>
            </button>

            {/* Universal Key */}
            <button
              type="button"
              onClick={() => setActiveTab('keys')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'keys'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Key className="w-4 h-4 text-slate-400" />
              <span>Universal Key</span>
            </button>

            {/* Manage Agents */}
            <button
              type="button"
              onClick={() => setActiveTab('agents')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'agents'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bot className="w-4 h-4 text-slate-400" />
              <span>Manage Agents</span>
            </button>

            {/* Preferences */}
            <button
              type="button"
              onClick={() => setActiveTab('preferences')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Preferences</span>
            </button>

            {/* Plans & Invoices */}
            <button
              type="button"
              onClick={() => setActiveTab('plans')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'plans'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Plans &amp; Invoices</span>
            </button>

            {/* Credit Usage */}
            <button
              type="button"
              onClick={() => setActiveTab('credits')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-sans flex items-center gap-3 transition-colors ${
                activeTab === 'credits'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Coins className="w-4 h-4 text-slate-400" />
              <span>Credit Usage</span>
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* RIGHT CONTENT PANEL (MATCHES media_1788378985440.png)         */}
        {/* ============================================================= */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 select-none font-sans">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Account settings</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section: Mobile Number */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-sm">Mobile Number</div>
              <p className="text-xs text-slate-400">The mobile number linked to your current account</p>
            </div>
            <div className="text-sm font-mono text-slate-200">+91 74858 56647</div>
          </div>

          {/* Section: Profile Picture */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-sm">Profile picture</div>
              <p className="text-xs text-slate-400">This image will be displayed publicly</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 text-white font-bold text-base flex items-center justify-center shadow">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>

          {/* Section: Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-sm">Name</div>
              <p className="text-xs text-slate-400">Your full name, as displayed everywhere</p>
            </div>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-medium transition-colors cursor-pointer border border-white/5"
              >
                <span>{user?.name || 'Ayushman Raj'}</span>
                <Pencil className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>

          {/* Section: Phone Number */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-sm">Phone Number</div>
              <p className="text-xs text-slate-400">Receive important updates and alerts on WhatsApp.</p>
            </div>
            <div className="text-sm font-mono text-slate-200">+91 74858 56647</div>
          </div>

          {/* Section: Support code */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-white/5">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-sm">Support code</div>
              <p className="text-xs text-slate-400">Share this with our support team if they ask for it.</p>
            </div>
            {supportCode ? (
              <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                {supportCode}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGenerateSupportCode}
                className="px-4 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Generate
              </button>
            )}
          </div>

          {/* ============================================================= */}
          {/* DELETE ACCOUNT SECTION (STRICTLY REQUESTED BY USER)           */}
          {/* ============================================================= */}
          <div className="pt-4 space-y-3 bg-rose-500/5 p-4 rounded-2xl border border-rose-500/20">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Permanently delete your account and all associated workspace projects. This action cannot be undone.
                </p>
              </div>

              {showDeleteConfirm ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer shadow-lg"
                  >
                    Confirm Delete
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
