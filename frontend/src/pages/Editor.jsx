import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { LayoutGrid, ArrowLeft } from 'lucide-react';

/**
 * =============================================================================
 * PROMPT2WEB - WORKSPACE EDITOR (CANVAS STUDIO)
 * =============================================================================
 * Current Status: Clean Canvas Scaffold with Project Theme (#08090b)
 * Previous terracotta / clay layout has been completely removed as requested.
 * Ready for new workspace architecture, custom studio features, and layout.
 * =============================================================================
 */

export default function Editor() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { currentProject, loadProject } = useProjectStore();

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans flex flex-col selection:bg-sky-500 selection:text-white relative overflow-hidden animate-fadeIn">
      {/* ===================================================================== */}
      {/* TOP NAVBAR (MATCHES PROMPT2WEB UNIFIED HEADER THEME)                   */}
      {/* ===================================================================== */}
      <header className="relative z-40 bg-[#08090b]/40 backdrop-blur-sm px-6 sm:px-12 py-5 flex items-center justify-between select-none border-b border-white/[0.08]">
        {/* Back to Dashboard / Home */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl bg-[#14171f]/90 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2.5 text-sm font-sans font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-white/5 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Dashboard</span>
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Current Project Title */}
          <span className="font-bold text-sm text-white truncate max-w-[200px] sm:max-w-xs font-sans">
            {currentProject?.title || 'New Workspace'}
          </span>
        </div>

        {/* Right Header Placeholder (Actions / Status) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 rounded-xl bg-[#14171f]/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-2 text-xs font-medium transition-all cursor-pointer border border-white/5"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* MAIN WORKSPACE CANVAS (CLEAN BLANK CANVAS FOR NEW ARCHITECTURE)       */}
      {/* ===================================================================== */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 select-none">
        {/*
          TODO: New Workspace Architecture
          ---------------------------------
          1. AI Agent Interactive Chat Panel (New design aligned with #08090b theme)
          2. Multi-file Code Editor (Tabs, Monaco/Prism, syntax highlighting)
          3. Live Device Preview Frame (Desktop, Tablet, Mobile)
          4. Deployment & Cloud Export Engine
        */}
      </main>

      {/* ===================================================================== */}
      {/* BOTTOM STATUS BAR (PLACEHOLDER FOR SYSTEM METRICS & SYNC STATE)       */}
      {/* ===================================================================== */}
      {/* 
        <footer className="h-8 border-t border-white/[0.06] bg-[#08090b]/60 px-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Ready</span>
          <span>Prompt2Web Studio</span>
        </footer>
      */}
    </div>
  );
}
