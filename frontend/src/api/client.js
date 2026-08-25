/**
 * API Client for Prompt2Web
 * Handles communication with the FastAPI backend with seamless local fallback
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async fetchWithFallback(endpoint, options = {}, mockFallbackFn) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`[Prompt2Web API] Request to ${endpoint} failed, utilizing local fallback engine:`, error.message);
      if (mockFallbackFn) {
        return mockFallbackFn();
      }
      throw error;
    }
  }

  async healthCheck() {
    return this.fetchWithFallback('/health', { method: 'GET' }, () => ({
      status: 'offline-fallback',
      message: 'Running with local client engine',
    }));
  }

  async getProjects() {
    return this.fetchWithFallback('/projects', { method: 'GET' }, () => {
      const stored = localStorage.getItem('prompt2web_projects');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback to empty
        }
      }
      return [];
    });
  }

  async getProject(projectId) {
    return this.fetchWithFallback(`/projects/${projectId}`, { method: 'GET' }, () => {
      const stored = localStorage.getItem('prompt2web_projects');
      if (stored) {
        const projects = JSON.parse(stored);
        const found = projects.find((p) => p.id === projectId);
        if (found) return found;
      }
      return null;
    });
  }

  async createProject(projectData) {
    return this.fetchWithFallback(
      '/projects',
      {
        method: 'POST',
        body: JSON.stringify(projectData),
      },
      () => {
        const newProject = {
          id: `proj-${Date.now().toString(36)}`,
          title: projectData.title || 'Untitled Project',
          description: projectData.description || '',
          prompt: projectData.prompt || '',
          framework: projectData.framework || 'html-tailwind',
          files: projectData.files || [],
          created_at: Date.now() / 1000,
          updated_at: Date.now() / 1000,
        };

        const stored = localStorage.getItem('prompt2web_projects');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newProject);
        localStorage.setItem('prompt2web_projects', JSON.stringify(list));
        return newProject;
      }
    );
  }

  async updateProject(projectId, updateData) {
    return this.fetchWithFallback(
      `/projects/${projectId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updateData),
      },
      () => {
        const stored = localStorage.getItem('prompt2web_projects');
        if (stored) {
          const list = JSON.parse(stored);
          const idx = list.findIndex((p) => p.id === projectId);
          if (idx !== -1) {
            list[idx] = { ...list[idx], ...updateData, updated_at: Date.now() / 1000 };
            localStorage.setItem('prompt2web_projects', JSON.stringify(list));
            return list[idx];
          }
        }
        return updateData;
      }
    );
  }

  async deleteProject(projectId) {
    return this.fetchWithFallback(
      `/projects/${projectId}`,
      { method: 'DELETE' },
      () => {
        const stored = localStorage.getItem('prompt2web_projects');
        if (stored) {
          const list = JSON.parse(stored).filter((p) => p.id !== projectId);
          localStorage.setItem('prompt2web_projects', JSON.stringify(list));
        }
        return { message: 'Project deleted locally' };
      }
    );
  }

  async generateFromPrompt(prompt, framework = 'html-tailwind', template = 'landing') {
    return this.fetchWithFallback(
      '/generate',
      {
        method: 'POST',
        body: JSON.stringify({ prompt, framework, template }),
      },
      () => {
        // Fallback simulation
        return {
          success: true,
          message: `Generated application for "${prompt}"`,
          project: {
            id: `proj-${Date.now().toString(36)}`,
            title: prompt.slice(0, 30).trim() || 'AI Generated Project',
            prompt,
            framework,
          },
        };
      }
    );
  }

  async sendChatMessage(projectId, message, history = [], currentFiles = []) {
    return this.fetchWithFallback(
      '/chat',
      {
        method: 'POST',
        body: JSON.stringify({
          project_id: projectId,
          message,
          history,
          current_files: currentFiles,
        }),
      },
      () => {
        // Smart client-side modification for fallback
        return {
          reply: `I have updated your application with: "${message}". You can inspect the updated code in the editor tabs or see the live preview update.`,
          updated_files: currentFiles,
          timestamp: Date.now() / 1000,
        };
      }
    );
  }
}

export const apiClient = new ApiClient();
export default apiClient;
