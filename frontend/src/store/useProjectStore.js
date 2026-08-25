import { create } from 'zustand';
import { apiClient } from '../api/client';
import { INITIAL_FILES, VIEW_MODES, VIEWPORTS, STARTER_TEMPLATES } from '../types';

export const useProjectStore = create((set, get) => ({
  // State
  projects: [],
  currentProject: {
    id: 'default',
    title: 'Modern Web Prototype',
    description: 'Instant AI generated application starter',
    prompt: 'Create a modern landing page for an AI developer platform',
    framework: 'html-tailwind',
    files: INITIAL_FILES,
    created_at: Date.now() / 1000,
    updated_at: Date.now() / 1000,
  },
  activeFilePath: 'index.html',
  chatMessages: [
    {
      id: 'm-init',
      role: 'assistant',
      content: '👋 Welcome to Prompt2Web! Describe what you want to build or tell me what to change in the code, and I will update your live app instantly.',
      timestamp: Date.now() / 1000,
    },
  ],
  isGenerating: false,
  viewMode: VIEW_MODES.SPLIT,
  viewport: VIEWPORTS.DESKTOP,
  previewKey: 0,
  error: null,

  // Actions
  fetchProjects: async () => {
    try {
      const data = await apiClient.getProjects();
      if (data && data.length > 0) {
        set({ projects: data });
      } else {
        // Provide starter list if empty
        const defaultList = [
          {
            id: 'demo-1',
            title: 'Modern SaaS Platform',
            description: 'AI-assisted developer tools showcase',
            prompt: 'Create a modern dark SaaS landing page for an AI developer platform with feature highlights',
            framework: 'html-tailwind',
            files: INITIAL_FILES,
            updated_at: Date.now() / 1000,
          },
        ];
        set({ projects: defaultList });
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  },

  loadProject: async (projectId) => {
    try {
      const project = await apiClient.getProject(projectId);
      if (project) {
        set({
          currentProject: project,
          activeFilePath: project.files?.[0]?.path || 'index.html',
          previewKey: get().previewKey + 1,
        });
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    }
  },

  createNewProject: async (title, prompt = '', templateId = 'landing-page') => {
    set({ isGenerating: true, error: null });
    try {
      const selectedTemplate = STARTER_TEMPLATES.find((t) => t.id === templateId);
      const effectivePrompt = prompt || selectedTemplate?.prompt || 'Create a modern web application';
      
      const newProj = {
        id: `proj-${Date.now().toString(36)}`,
        title: title || 'New AI Project',
        description: effectivePrompt.slice(0, 80),
        prompt: effectivePrompt,
        framework: 'html-tailwind',
        files: JSON.parse(JSON.stringify(INITIAL_FILES)),
        created_at: Date.now() / 1000,
        updated_at: Date.now() / 1000,
      };

      await apiClient.createProject(newProj);

      set((state) => ({
        currentProject: newProj,
        projects: [newProj, ...state.projects],
        activeFilePath: 'index.html',
        chatMessages: [
          {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            content: `🚀 I've created your project **${newProj.title}** based on your prompt: "${effectivePrompt}". You can now customize or refine any part of it!`,
            timestamp: Date.now() / 1000,
          },
        ],
        isGenerating: false,
        previewKey: state.previewKey + 1,
      }));

      return newProj;
    } catch (err) {
      set({ error: err.message, isGenerating: false });
      throw err;
    }
  },

  setActiveFile: (path) => {
    set({ activeFilePath: path });
  },

  updateFileContent: (path, newContent) => {
    const { currentProject, previewKey } = get();
    if (!currentProject) return;

    const updatedFiles = currentProject.files.map((file) =>
      file.path === path ? { ...file, content: newContent } : file
    );

    set({
      currentProject: {
        ...currentProject,
        files: updatedFiles,
        updated_at: Date.now() / 1000,
      },
      previewKey: previewKey + 1,
    });
  },

  addFile: (name, path, language = 'html', content = '') => {
    const { currentProject } = get();
    if (!currentProject) return;

    const newFile = {
      name,
      path: path || name,
      language,
      type: 'file',
      content,
    };

    const exists = currentProject.files.some((f) => f.path === newFile.path);
    if (exists) {
      alert(`A file with path "${newFile.path}" already exists.`);
      return;
    }

    set({
      currentProject: {
        ...currentProject,
        files: [...currentProject.files, newFile],
      },
      activeFilePath: newFile.path,
    });
  },

  deleteFile: (filePath) => {
    const { currentProject, activeFilePath } = get();
    if (!currentProject) return;

    if (currentProject.files.length <= 1) {
      alert('Cannot delete the last remaining file in the project.');
      return;
    }

    const filtered = currentProject.files.filter((f) => f.path !== filePath);
    const nextActive = activeFilePath === filePath ? filtered[0].path : activeFilePath;

    set({
      currentProject: {
        ...currentProject,
        files: filtered,
      },
      activeFilePath: nextActive,
    });
  },

  setViewMode: (mode) => set({ viewMode: mode }),
  setViewport: (viewport) => set({ viewport }),
  refreshPreview: () => set((state) => ({ previewKey: state.previewKey + 1 })),

  sendChatMessage: async (messageText) => {
    if (!messageText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: Date.now() / 1000,
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, userMsg],
      isGenerating: true,
    }));

    try {
      const { currentProject, chatMessages } = get();
      const res = await apiClient.sendChatMessage(
        currentProject.id,
        messageText,
        chatMessages,
        currentProject.files
      );

      const assistantMsg = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: res.reply || 'I updated the code based on your prompt.',
        timestamp: Date.now() / 1000,
      };

      set((state) => ({
        chatMessages: [...state.chatMessages, assistantMsg],
        currentProject: {
          ...state.currentProject,
          files: res.updated_files || state.currentProject.files,
        },
        isGenerating: false,
        previewKey: state.previewKey + 1,
      }));
    } catch (err) {
      console.error('Chat error:', err);
      set((state) => ({
        isGenerating: false,
        chatMessages: [
          ...state.chatMessages,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: `⚠️ Sorry, there was an issue processing your request: ${err.message}`,
            timestamp: Date.now() / 1000,
          },
        ],
      }));
    }
  },

  // Helper to bundle all HTML, CSS, JS files for preview iframe
  getCompiledPreviewHtml: () => {
    const { currentProject } = get();
    if (!currentProject || !currentProject.files) return '<html><body>No project loaded</body></html>';

    const htmlFile = currentProject.files.find((f) => f.name.endsWith('.html') || f.path === 'index.html');
    const cssFiles = currentProject.files.filter((f) => f.name.endsWith('.css'));
    const jsFiles = currentProject.files.filter((f) => f.name.endsWith('.js'));

    let html = htmlFile ? htmlFile.content : '<div style="font-family: sans-serif; padding: 2rem; color: white;"><h1>No index.html file found.</h1></div>';

    // Inject CSS
    const combinedCss = cssFiles.map((f) => `/* ${f.name} */\n${f.content}`).join('\n\n');
    if (combinedCss) {
      if (html.includes('</head>')) {
        html = html.replace('</head>', `<style>\n${combinedCss}\n</style>\n</head>`);
      } else {
        html = `<style>\n${combinedCss}\n</style>\n` + html;
      }
    }

    // Inject JS
    const combinedJs = jsFiles.map((f) => `// ${f.name}\n${f.content}`).join('\n\n');
    if (combinedJs) {
      if (html.includes('</body>')) {
        html = html.replace('</body>', `<script>\n${combinedJs}\n</script>\n</body>`);
      } else {
        html = html + `\n<script>\n${combinedJs}\n</script>`;
      }
    }

    return html;
  },
}));
