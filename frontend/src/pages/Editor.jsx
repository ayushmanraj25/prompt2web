import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { VIEW_MODES } from '../types';
import ChatPanel from '../components/ChatPanel';
import FileTree from '../components/FileTree';
import CodeEditor from '../components/CodeEditor';
import PreviewFrame from '../components/PreviewFrame';
import {
  ArrowLeft,
  Columns,
  Code2,
  Eye,
  Save,
  Download,
  PanelLeftClose,
  PanelLeft,
  Check,
} from 'lucide-react';

export default function Editor() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    currentProject,
    loadProject,
    viewMode,
    setViewMode,
  } = useProjectStore();

  const [showChat, setShowChat] = useState(true);
  const [showExplorer, setShowExplorer] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExportZip = () => {
    if (!currentProject?.files) return;
    const htmlFile = currentProject.files.find((f) => f.name === 'index.html');
    if (htmlFile) {
      const blob = new Blob([htmlFile.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentProject.title || 'project'}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-clay-950 text-clay-100 overflow-hidden select-none animate-fade-in">
      {/* Top Application Bar */}
      <header className="h-14 border-b border-clay-800 bg-clay-900/95 px-5 flex items-center justify-between shrink-0 z-20 shadow-md">
        {/* Left: Back & Project Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl text-clay-300 hover:text-white hover:bg-clay-800 border border-clay-800 transition-all duration-200 active:scale-95"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-clay-800" />

          <div className="flex items-center gap-2.5">
            <span className="font-bold text-xs text-white truncate max-w-[160px] sm:max-w-xs font-mono">
              {currentProject?.title || 'UNTITLED WORKSPACE'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-clay-950 text-clay-300 border border-clay-800 font-mono">
              v1.0
            </span>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="hidden md:flex items-center bg-clay-950 p-1 rounded-xl border border-clay-800">
          <button
            onClick={() => setViewMode(VIEW_MODES.SPLIT)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 active:scale-95 ${
              viewMode === VIEW_MODES.SPLIT
                ? 'bg-clay-800 text-white font-bold shadow border border-clay-700'
                : 'text-clay-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>SPLIT</span>
          </button>

          <button
            onClick={() => setViewMode(VIEW_MODES.CODE)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 active:scale-95 ${
              viewMode === VIEW_MODES.CODE
                ? 'bg-clay-800 text-white font-bold shadow border border-clay-700'
                : 'text-clay-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>CODE</span>
          </button>

          <button
            onClick={() => setViewMode(VIEW_MODES.PREVIEW)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 active:scale-95 ${
              viewMode === VIEW_MODES.PREVIEW
                ? 'bg-clay-800 text-white font-bold shadow border border-clay-700'
                : 'text-clay-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PREVIEW</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Toggle Panels */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-2 rounded-xl text-xs transition-all duration-200 active:scale-95 ${
              showChat ? 'bg-clay-800 text-clay-200 border border-clay-700 shadow' : 'text-clay-400 hover:bg-clay-800'
            }`}
            title="Toggle AI Chat Panel"
          >
            {showChat ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-clay-800 hover:bg-clay-750 text-clay-200 text-xs font-mono border border-clay-700 transition-all duration-200 active:scale-95 shadow"
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSaved ? 'SAVED' : 'SAVE'}</span>
          </button>

          <button
            onClick={handleExportZip}
            className="btn-terracotta text-xs font-mono py-1.5 px-3.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT</span>
          </button>
        </div>
      </header>

      {/* Main 3-Panel Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: AI Chat Panel */}
        {showChat && (
          <div className="w-80 sm:w-96 shrink-0 h-full transition-all duration-300 animate-slide-up">
            <ChatPanel />
          </div>
        )}

        {/* Center/Right Combined Workspace */}
        <div className="flex-1 flex h-full overflow-hidden">
          {/* Code Section (FileTree + CodeEditor) */}
          {(viewMode === VIEW_MODES.SPLIT || viewMode === VIEW_MODES.CODE) && (
            <div
              className={`flex h-full border-r border-clay-800 transition-all duration-300 ${
                viewMode === VIEW_MODES.SPLIT ? 'w-1/2' : 'w-full'
              }`}
            >
              {/* Explorer Sidebar */}
              {showExplorer && (
                <div className="w-48 shrink-0 h-full border-r border-clay-800/80 bg-clay-950">
                  <FileTree />
                </div>
              )}

              {/* Code Editor */}
              <div className="flex-1 h-full overflow-hidden">
                <CodeEditor />
              </div>
            </div>
          )}

          {/* Live Preview Section */}
          {(viewMode === VIEW_MODES.SPLIT || viewMode === VIEW_MODES.PREVIEW) && (
            <div
              className={`h-full transition-all duration-300 ${
                viewMode === VIEW_MODES.SPLIT ? 'w-1/2' : 'w-full'
              }`}
            >
              <PreviewFrame />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
