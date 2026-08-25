import React, { useState, useRef } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';

export default function CodeEditor() {
  const { currentProject, activeFilePath, setActiveFile, updateFileContent } = useProjectStore();
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const activeFile = currentProject?.files?.find((f) => f.path === activeFilePath) || currentProject?.files?.[0];

  const handleTextChange = (e) => {
    if (activeFile) {
      updateFileContent(activeFile.path, e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const updated = target.value.substring(0, start) + '  ' + target.value.substring(end);
      if (activeFile) {
        updateFileContent(activeFile.path, updated);
      }

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    if (activeFile?.content) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const lineNumbers = (activeFile?.content || '').split('\n').map((_, index) => index + 1);

  return (
    <div className="h-full flex flex-col bg-clay-950 text-clay-100 font-mono">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-clay-800 bg-clay-900 px-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 py-1">
          {currentProject?.files?.map((file) => {
            const isActive = file.path === (activeFile?.path || activeFilePath);
            return (
              <button
                key={file.path}
                onClick={() => setActiveFile(file.path)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-clay-950 text-white font-bold border border-clay-700 shadow-sm'
                    : 'text-clay-400 hover:bg-clay-800 hover:text-white'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-clay-400' : 'text-clay-500'}`} />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-clay-850 hover:bg-clay-800 text-clay-200 border border-clay-750 transition-all duration-200 active:scale-95 shadow-sm"
            title="Copy file content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-clay-850 hover:bg-clay-800 text-clay-200 border border-clay-750 transition-all duration-200 active:scale-95 shadow-sm"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 relative flex overflow-hidden font-mono text-xs">
        {/* Line Numbers */}
        <div className="w-12 py-3.5 bg-clay-950 text-clay-600 text-right pr-3 select-none overflow-hidden border-r border-clay-800/80 leading-5">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Textarea Code Input */}
        <div className="flex-1 relative h-full">
          <textarea
            ref={textareaRef}
            value={activeFile?.content || ''}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full h-full p-3.5 bg-transparent text-clay-100 resize-none font-mono text-xs leading-5 focus:outline-none selection:bg-clay-700 selection:text-white overflow-auto"
            placeholder="Type your code here..."
          />
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-clay-900 border-t border-clay-800 flex items-center justify-between text-[11px] text-clay-400 font-mono">
        <div className="flex items-center gap-3">
          <span>{activeFile?.language?.toUpperCase() || 'HTML'}</span>
          <span>UTF-8</span>
          <span>{lineNumbers.length} lines</span>
        </div>
        <div className="flex items-center gap-1.5 text-clay-300">
          <Sparkles className="w-3.5 h-3.5 text-clay-400" />
          <span>Live Sync Active</span>
        </div>
      </div>
    </div>
  );
}
