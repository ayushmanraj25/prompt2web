import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MatrixBackground from './components/MatrixBackground';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

export default function App() {
  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('prompt2web_theme') || 'dark';
      const root = document.documentElement;
      if (savedTheme === 'light') {
        root.classList.add('light-mode');
      } else if (savedTheme === 'dark') {
        root.classList.remove('light-mode');
      } else {
        // System
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.remove('light-mode');
        } else {
          root.classList.add('light-mode');
        }
      }
    };

    applyTheme();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans selection:bg-sky-500 selection:text-white relative">
      {/* 100% STATIONARY BACKGROUND WITH MONOSPACE CODE GLYPHS MATCHING SCREENSHOT 2 */}
      <MatrixBackground />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:projectId" element={<Editor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
