import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { FileCode, FileType, FileText, Plus, Trash2, Folder, ChevronRight, ChevronDown } from 'lucide-react';

export default function FileTree() {
  const { currentProject, activeFilePath, setActiveFile, addFile, deleteFile } = useProjectStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.html')) return <FileCode className="w-4 h-4 text-clay-400" />;
    if (fileName.endsWith('.css')) return <FileType className="w-4 h-4 text-amber-400" />;
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return <FileText className="w-4 h-4 text-clay-300" />;
    return <FileText className="w-4 h-4 text-clay-500" />;
  };

  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    let name = newFileName.trim();
    let lang = 'html';
    if (name.endsWith('.css')) lang = 'css';
    else if (name.endsWith('.js')) lang = 'javascript';
    else if (!name.includes('.')) {
      name += '.html';
    }

    addFile(name, name, lang, `/* New file: ${name} */\n`);
    setNewFileName('');
    setIsAdding(false);
  };

  return (
    <div className="h-full flex flex-col bg-clay-950 border-r border-clay-800 select-none font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-clay-800 bg-clay-900/60">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-clay-300 uppercase tracking-wider hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-clay-400" /> : <ChevronRight className="w-3.5 h-3.5 text-clay-400" />}
          <span>Explorer</span>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="p-1 rounded-lg text-clay-400 hover:text-white hover:bg-clay-800 transition-all active:scale-95"
          title="New File"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Project Folder Header */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-clay-400">
            <Folder className="w-3.5 h-3.5 text-clay-400" />
            <span className="truncate">{currentProject?.title || 'Project Files'}</span>
          </div>

          {/* New File Inline Form */}
          {isAdding && (
            <form onSubmit={handleCreateFile} className="px-2 py-1">
              <input
                type="text"
                autoFocus
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => !newFileName && setIsAdding(false)}
                placeholder="filename.js..."
                className="w-full bg-clay-900 border border-clay-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-clay-500 font-mono"
              />
            </form>
          )}

          {/* File List */}
          <div className="space-y-1">
            {currentProject?.files?.map((file) => {
              const isActive = activeFilePath === file.path;
              return (
                <div
                  key={file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono cursor-pointer transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-clay-850 text-white font-bold border border-clay-700 shadow-sm'
                      : 'text-clay-400 hover:bg-clay-900 hover:text-clay-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getFileIcon(file.name)}
                    <span className="truncate">{file.name}</span>
                  </div>

                  {currentProject.files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete file "${file.name}"?`)) {
                          deleteFile(file.path);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-clay-500 hover:text-red-400 hover:bg-clay-800 transition"
                      title="Delete File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="p-3 border-t border-clay-800 text-[10px] text-clay-500 flex justify-between items-center font-mono">
        <span>{currentProject?.files?.length || 0} files</span>
        <span>HTML5</span>
      </div>
    </div>
  );
}
