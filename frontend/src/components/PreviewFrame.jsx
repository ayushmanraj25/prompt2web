import React, { useEffect, useState, useMemo } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { VIEWPORTS } from '../types';
import { RotateCw, ExternalLink, Monitor, Tablet, Smartphone } from 'lucide-react';

export default function PreviewFrame() {
  const { currentProject, viewport, setViewport, previewKey, refreshPreview, getCompiledPreviewHtml } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const compiledHtml = useMemo(() => {
    return getCompiledPreviewHtml();
  }, [currentProject, previewKey]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [compiledHtml, previewKey]);

  const handleOpenInNewTab = () => {
    const blob = new Blob([compiledHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const getFrameDimensions = () => {
    switch (viewport) {
      case VIEWPORTS.MOBILE:
        return 'w-[375px] h-[667px] my-auto rounded-3xl shadow-2xl border-4 border-clay-800 transition-all duration-300';
      case VIEWPORTS.TABLET:
        return 'w-[768px] h-[90%] my-auto rounded-2xl shadow-2xl border-2 border-clay-800 transition-all duration-300';
      case VIEWPORTS.DESKTOP:
      default:
        return 'w-full h-full transition-all duration-300';
    }
  };

  return (
    <div className="h-full flex flex-col bg-clay-950 font-mono">
      {/* Preview Navigation & Viewport Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-clay-800 bg-clay-900/90">
        <div className="flex items-center gap-1.5 bg-clay-950 p-1 rounded-xl border border-clay-800">
          <button
            onClick={() => setViewport(VIEWPORTS.DESKTOP)}
            className={`p-1.5 rounded-lg transition-all duration-200 active:scale-95 ${
              viewport === VIEWPORTS.DESKTOP ? 'bg-clay-800 text-white font-bold shadow' : 'text-clay-400 hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport(VIEWPORTS.TABLET)}
            className={`p-1.5 rounded-lg transition-all duration-200 active:scale-95 ${
              viewport === VIEWPORTS.TABLET ? 'bg-clay-800 text-white font-bold shadow' : 'text-clay-400 hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport(VIEWPORTS.MOBILE)}
            className={`p-1.5 rounded-lg transition-all duration-200 active:scale-95 ${
              viewport === VIEWPORTS.MOBILE ? 'bg-clay-800 text-white font-bold shadow' : 'text-clay-400 hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address bar simulator */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-clay-950 border border-clay-800 rounded-xl text-xs text-clay-400 max-w-sm flex-1 mx-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate font-mono text-[11px]">https://preview.prompt2web.internal/{currentProject?.id || 'sandbox'}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={refreshPreview}
            className="p-2 rounded-xl text-clay-400 hover:text-white hover:bg-clay-800 border border-clay-800 transition-all duration-200 active:scale-95"
            title="Reload Preview"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-clay-300' : ''}`} />
          </button>

          <button
            onClick={handleOpenInNewTab}
            className="p-2 rounded-xl text-clay-400 hover:text-white hover:bg-clay-800 border border-clay-800 transition-all duration-200 active:scale-95"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-3 bg-clay-950 relative">
        <div className={`overflow-hidden bg-white shadow-2xl ${getFrameDimensions()}`}>
          <iframe
            key={previewKey}
            title="Live Application Preview"
            srcDoc={compiledHtml}
            sandbox="allow-scripts allow-modals allow-same-origin allow-popups"
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
