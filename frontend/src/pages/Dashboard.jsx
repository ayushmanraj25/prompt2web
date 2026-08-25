import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { STARTER_TEMPLATES } from '../types';
import {
  Plus,
  Search,
  FolderCode,
  Calendar,
  Sparkles,
  X,
  LogOut,
  User,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, fetchProjects, createNewProject } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('landing-page');
  const [isCreating, setIsCreating] = useState(false);
  const [user, setUser] = useState(null);
  const [navigatingId, setNavigatingId] = useState(null);

  useEffect(() => {
    fetchProjects();
    const storedUser = localStorage.getItem('prompt2web_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: 'Operator', email: 'op@prompt2web.io' });
      }
    } else {
      setUser({ name: 'Operator', email: 'op@prompt2web.io' });
    }
  }, [fetchProjects]);

  const handleLogout = () => {
    localStorage.removeItem('prompt2web_user');
    navigate('/auth');
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsCreating(true);
    try {
      const proj = await createNewProject(newTitle.trim(), newPrompt.trim(), selectedTemplate);
      setShowNewModal(false);
      navigate(`/editor/${proj.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenProject = (id) => {
    setNavigatingId(id);
    setTimeout(() => {
      navigate(`/editor/${id}`);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-ochre-600 text-clay-100 flex flex-col selection:bg-clay-800 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-clay-800/80 bg-clay-900/95 backdrop-blur sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-clay-800 border border-clay-700 flex items-center justify-center text-clay-200 font-bold text-base shadow-inner font-mono group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <span className="font-extrabold text-lg text-white font-mono tracking-tight">PROMPT2WEB</span>
          </div>

          <div className="flex items-center gap-5">
            {/* Operator Tag */}
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-clay-950 border border-clay-800 text-xs font-mono">
              <User className="w-3.5 h-3.5 text-clay-400" />
              <span className="text-clay-200 font-bold">{user?.name || 'OPERATOR'}</span>
            </div>

            <button
              onClick={() => setShowNewModal(true)}
              className="btn-terracotta text-xs font-mono group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>NEW WORKSPACE</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl text-clay-300 hover:text-white hover:bg-clay-800 border border-clay-800 transition-all duration-200 active:scale-95 shadow-sm"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace with Generous Padding and Slide-up Animation */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-14 space-y-12 animate-slide-up">
        {/* Top KPI Metrics Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Workspaces</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">{projects.length.toString().padStart(2, '0')}</div>
            <span className="kpi-sub">Active Units</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Uptime</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">99.9%</div>
            <span className="kpi-sub">Sandbox Health</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Latency</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">42ms</div>
            <span className="kpi-sub">Compile Speed</span>
          </div>

          <div className="kpi-tile group">
            <span className="kpi-label group-hover:text-clay-300 transition-colors">Integrity</span>
            <div className="kpi-value group-hover:scale-105 transition-transform origin-left">100%</div>
            <span className="kpi-sub">Zero Config</span>
          </div>
        </section>

        {/* Workspace Action Bar */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-clay-800/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase drop-shadow-sm">
              DEPLOYED WORKSPACES
            </h1>
            <p className="text-xs font-mono text-clay-950 font-bold mt-1">
              INSPECT • RUN • CONFIGURE
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-clay-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH WORKSPACES..."
              className="w-full clay-input pl-11 text-xs font-mono uppercase"
            />
          </div>
        </section>

        {/* Project KPI Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center rounded-3xl border border-dashed border-clay-700 bg-clay-900/90 space-y-5 shadow-xl animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-clay-800 text-clay-300 flex items-center justify-center mx-auto border border-clay-700">
              <FolderCode className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-mono uppercase">NO ACTIVE WORKSPACES</h3>
              <p className="text-xs font-mono text-clay-400">Initialize a new web prototype to begin.</p>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="btn-terracotta inline-flex items-center gap-2 text-xs font-mono"
            >
              <Plus className="w-4 h-4" /> INITIALIZE
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project.id)}
                className="clay-card cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono bg-clay-950 text-clay-200 border border-clay-800 font-semibold group-hover:border-clay-700 transition-colors">
                      {project.framework || 'HTML5 + TAILWIND'}
                    </span>
                    <span className="text-clay-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-mono group-hover:text-clay-300 transition-colors line-clamp-1">
                    {project.title || 'UNTITLED WORKSPACE'}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                    <div className="bg-clay-950 p-2.5 rounded-lg border border-clay-850">
                      <span className="text-clay-500 text-[10px] block">FILES</span>
                      <span className="text-clay-200 font-bold">{project.files?.length || 3} UNITS</span>
                    </div>
                    <div className="bg-clay-950 p-2.5 rounded-lg border border-clay-850">
                      <span className="text-clay-500 text-[10px] block">STATUS</span>
                      <span className="text-emerald-400 font-bold">READY</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-clay-800/80 mt-6 flex items-center justify-between text-xs font-mono text-clay-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date((project.updated_at || Date.now() / 1000) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-clay-200 font-bold group-hover:text-white transition-colors flex items-center gap-1">
                    {navigatingId === project.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>OPENING...</span>
                      </>
                    ) : (
                      <>
                        <span>LAUNCH</span>
                        <span className="group-hover:translate-x-1 transition-transform">➔</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Project Modal with Smooth Animated Pop */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-clay-900 border border-clay-700 rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-modal-pop">
            <div className="flex items-center justify-between border-b border-clay-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-clay-300" />
                <h2 className="text-base font-bold text-white font-mono uppercase">NEW WORKSPACE</h2>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded-lg text-clay-400 hover:text-white hover:bg-clay-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-clay-300 uppercase">
                  Workspace Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Analytics Platform"
                  className="w-full clay-input text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-clay-300 uppercase">
                  Instruction Prompt
                </label>
                <textarea
                  rows={3}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Describe your design specifications..."
                  className="w-full clay-input text-xs font-mono resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-clay-300 uppercase">
                  Blueprint Template
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {STARTER_TEMPLATES.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                        selectedTemplate === tpl.id
                          ? 'border-clay-400 bg-clay-800 text-white font-bold shadow-md scale-[1.02]'
                          : 'border-clay-800 bg-clay-950/70 text-clay-400 hover:bg-clay-800'
                      }`}
                    >
                      <div className="text-xs font-mono">{tpl.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="btn-clay-ghost text-xs font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !newTitle.trim()}
                  className="btn-terracotta text-xs font-mono"
                >
                  {isCreating ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      BUILDING...
                    </span>
                  ) : (
                    'CREATE WORKSPACE'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
