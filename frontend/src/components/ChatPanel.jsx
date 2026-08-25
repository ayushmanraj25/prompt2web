import React, { useState, useRef, useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Send, Sparkles, Bot, User, Loader2, Wand2 } from 'lucide-react';

const SUGGESTED_ACTIONS = [
  'Add dark/light mode toggle',
  'Make navigation sticky with blur',
  'Add testimonial customer reviews',
  'Add modern hover micro-interactions',
  'Add FAQ accordion section',
];

export default function ChatPanel() {
  const { chatMessages, isGenerating, sendChatMessage } = useProjectStore();
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isGenerating]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;

    sendChatMessage(inputPrompt.trim());
    setInputPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleApplySuggestion = (text) => {
    if (isGenerating) return;
    sendChatMessage(text);
  };

  return (
    <div className="h-full flex flex-col bg-clay-900 border-r border-clay-800">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-clay-800 bg-clay-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-clay-800 border border-clay-700 flex items-center justify-center text-clay-200 shadow-inner font-mono">
            <Sparkles className="w-4 h-4 text-clay-400" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">AI AGENT</h2>
            <p className="text-[10px] text-clay-400 font-mono">CODE ITERATION ENGINE</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> READY
        </span>
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-lg bg-clay-800 border border-clay-700 flex items-center justify-center shrink-0 mt-0.5 text-clay-300">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs font-mono leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-clay-800 text-white border border-clay-700 rounded-br-none'
                    : 'bg-clay-950 text-clay-200 border border-clay-800 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[9px] mt-1.5 text-right font-mono ${
                    isUser ? 'text-clay-400' : 'text-clay-500'
                  }`}
                >
                  {new Date((msg.timestamp || Date.now() / 1000) * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {isUser && (
                <div className="w-6 h-6 rounded-lg bg-clay-750 border border-clay-700 flex items-center justify-center shrink-0 mt-0.5 text-clay-200">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isGenerating && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-clay-950 border border-clay-800 text-xs font-mono text-clay-300 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-clay-400" />
            <span>AI IS UPDATING COMPONENT ARCHITECTURE...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Actions */}
      <div className="px-3.5 pt-2.5 pb-2 border-t border-clay-800/80 bg-clay-950/40">
        <p className="text-[10px] font-mono font-bold text-clay-400 mb-1.5 flex items-center gap-1.5 uppercase">
          <Wand2 className="w-3 h-3 text-clay-400" /> Quick Refinements
        </p>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto max-h-16">
          {SUGGESTED_ACTIONS.map((action, idx) => (
            <button
              key={idx}
              disabled={isGenerating}
              onClick={() => handleApplySuggestion(action)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-clay-950 hover:bg-clay-800 hover:text-white border border-clay-800 text-clay-300 transition-all duration-200 active:scale-95 shrink-0 disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3.5 bg-clay-950 border-t border-clay-800">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Instruct AI to modify design or logic..."
            className="w-full clay-input pr-12 text-xs font-mono resize-none"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="absolute right-2.5 bottom-3.5 p-2 rounded-lg btn-terracotta disabled:opacity-40 transition-transform active:scale-95 shadow"
            title="Send prompt"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <p className="text-[10px] font-mono text-clay-500 mt-2 text-center">
          Press <kbd className="bg-clay-900 border border-clay-800 px-1 rounded text-clay-300">Enter</kbd> to send.
        </p>
      </div>
    </div>
  );
}
