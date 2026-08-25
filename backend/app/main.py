"""
Prompt2Web - AI-Powered Web Application Scaffolding & Code Generation Backend
FastAPI server providing endpoints for project management, AI code generation,
conversational code refinement, and live preview rendering with centralized global CSS.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import uuid
import time
import os

app = FastAPI(
    title="Prompt2Web API",
    description="Backend API for AI-assisted web application generation and live editing",
    version="1.0.0",
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------

class FileItem(BaseModel):
    name: str
    path: str
    content: str
    language: Optional[str] = "html"
    type: Optional[str] = "file"  # "file" or "folder"


class Project(BaseModel):
    id: str
    title: str
    description: Optional[str] = ""
    prompt: Optional[str] = ""
    framework: Optional[str] = "html-tailwind"
    files: List[FileItem] = []
    created_at: float = Field(default_factory=time.time)
    updated_at: float = Field(default_factory=time.time)


class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    prompt: Optional[str] = ""
    framework: Optional[str] = "html-tailwind"
    files: Optional[List[FileItem]] = None


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    files: Optional[List[FileItem]] = None


class GenerateRequest(BaseModel):
    prompt: str
    project_id: Optional[str] = None
    framework: Optional[str] = "html-tailwind"
    template: Optional[str] = "landing"


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str
    timestamp: Optional[float] = Field(default_factory=time.time)


class ChatRequest(BaseModel):
    project_id: str
    message: str
    history: Optional[List[ChatMessage]] = []
    current_files: Optional[List[FileItem]] = None


class PreviewRequest(BaseModel):
    files: List[FileItem]
    entry_file: Optional[str] = "index.html"


# ---------------------------------------------------------------------------
# Starter Template Generator with Centralized Global CSS
# ---------------------------------------------------------------------------

def get_starter_files(template: str = "landing", prompt: str = "") -> List[FileItem]:
    """Generates initial starter files with pure HTML semantics and centralized global CSS."""
    safe_title = prompt.strip()[:40] if prompt else "Modern Web Application"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{safe_title}</title>
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <!-- Central Global Stylesheet -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="app-body">
  <!-- Navigation -->
  <header class="app-header">
    <div class="header-container">
      <div class="logo-box">
        <div class="logo-badge">
          <i class="fa-solid fa-sparkles"></i>
        </div>
        <span class="logo-title">Prompt2Web</span>
      </div>

      <nav class="nav-links">
        <a href="#features" class="nav-link">Features</a>
        <a href="#demo" class="nav-link">Live Demo</a>
        <a href="#pricing" class="nav-link">Pricing</a>
      </nav>

      <div class="header-actions">
        <button id="theme-toggle" class="icon-btn">
          <i class="fa-solid fa-moon"></i>
        </button>
        <a href="#get-started" class="btn-primary">
          Get Started
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="hero-container">
    <div class="hero-content">
      <div class="hero-badge">
        <i class="fa-solid fa-wand-magic-sparkles"></i> AI Generated Web App
      </div>

      <h1 class="hero-heading">
        Turn Your Imagination Into <br />
        <span class="gradient-text">Production-Ready Web Apps</span>
      </h1>

      <p class="hero-subtext">
        {prompt if prompt else "Build dynamic, responsive web interfaces in seconds. Describe what you need, tweak live code, and export clean assets instantly."}
      </p>

      <div class="hero-button-group">
        <button onclick="handlePrimaryAction()" class="btn-primary btn-large">
          Explore App
        </button>
        <button onclick="toggleCounter()" class="btn-secondary btn-large">
          Interactive Test: <span id="counter" class="counter-highlight">0 clicks</span>
        </button>
      </div>

      <!-- Feature Grid -->
      <div id="features" class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-box bg-indigo-glow">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <h3 class="feature-title">Instant Generation</h3>
          <p class="feature-description">Prompt your vision and watch modern HTML, CSS, and JS generate in real-time.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box bg-purple-glow">
            <i class="fa-solid fa-code"></i>
          </div>
          <h3 class="feature-title">Live Multi-File Editor</h3>
          <p class="feature-description">Inspect structure, customize scripts, and preview edits in an isolated sandbox.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box bg-pink-glow">
            <i class="fa-solid fa-mobile-screen"></i>
          </div>
          <h3 class="feature-title">Responsive Viewports</h3>
          <p class="feature-description">Simulate Mobile, Tablet, and Desktop layouts seamlessly in one view.</p>
        </div>
      </div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>
"""

    css_content = """/* ==========================================================================
   Central Global Stylesheet - All Custom Properties, Components & Animations
   ========================================================================== */

:root {
  --bg-color: #020617;
  --header-bg: rgba(2, 6, 23, 0.85);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --card-bg: rgba(15, 23, 42, 0.7);
  --border-color: rgba(51, 65, 85, 0.7);
}

/* Global Reset */
* {
  box-sizing: border-box;
}

body.app-body {
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Global Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* Header & Navigation */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: var(--header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
}

.header-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-badge {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.logo-title {
  font-weight: 700;
  font-size: 1.125rem;
  background: linear-gradient(to right, #ffffff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #ffffff;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-btn {
  padding: 0.5rem;
  color: var(--text-muted);
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  color: #ffffff;
  background-color: #1e293b;
}

/* Global Buttons */
.btn-primary {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary);
  border-radius: 0.5rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
  background-color: #0f172a;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #1e293b;
}

.btn-large {
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
}

/* Hero Section */
.hero-container {
  padding-top: 8rem;
  padding-bottom: 5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.hero-content {
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  background-color: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-heading {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}

@media (min-width: 640px) {
  .hero-heading {
    font-size: 3.75rem;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtext {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 42rem;
  margin: 0;
  line-height: 1.6;
}

.hero-button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

@media (min-width: 640px) {
  .hero-button-group {
    flex-direction: row;
    width: auto;
  }
}

.counter-highlight {
  color: #818cf8;
  font-family: monospace;
  font-weight: bold;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  padding-top: 4rem;
  text-align: left;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.feature-card:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
}

.feature-icon-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.bg-indigo-glow {
  background-color: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.bg-purple-glow {
  background-color: rgba(168, 85, 247, 0.2);
  color: #c084fc;
}

.bg-pink-glow {
  background-color: rgba(236, 72, 153, 0.2);
  color: #f472b6;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.feature-description {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}
"""

    js_content = """// Interactive Logic for Generated Application
let count = 0;

function toggleCounter() {
  count += 1;
  const counterEl = document.getElementById('counter');
  if (counterEl) {
    counterEl.innerText = `${count} ${count === 1 ? 'click' : 'clicks'}`;
  }
}

function handlePrimaryAction() {
  alert('Welcome to your generated Prompt2Web app! Edit your prompt or code to build anything.');
}

// Initial listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('Prompt2Web Live Sandbox loaded successfully with Global CSS.');
});
"""

    return [
        FileItem(name="index.html", path="index.html", content=html_content, language="html"),
        FileItem(name="styles.css", path="styles.css", content=css_content, language="css"),
        FileItem(name="script.js", path="script.js", content=js_content, language="javascript"),
    ]


# ---------------------------------------------------------------------------
# In-Memory Project Store
# ---------------------------------------------------------------------------

_PROJECTS_DB: Dict[str, Project] = {}

# Seed starter project
_starter_id = "proj-default-1"
_PROJECTS_DB[_starter_id] = Project(
    id=_starter_id,
    title="Modern SaaS Showcase",
    description="Next-generation SaaS landing page with responsive layout and interactive demo.",
    prompt="Create a modern dark-mode SaaS landing page for an AI developer platform with feature cards, hero CTA, and dynamic counter.",
    framework="html-tailwind",
    files=get_starter_files("landing", "Modern SaaS AI Developer Platform"),
    created_at=time.time(),
    updated_at=time.time(),
)


# ---------------------------------------------------------------------------
# API Routes
# ---------------------------------------------------------------------------

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "Prompt2Web API",
        "version": "1.0.0",
        "endpoints": ["/api/health", "/api/projects", "/api/generate", "/api/chat", "/api/preview"],
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": time.time(), "projects_count": len(_PROJECTS_DB)}


@app.get("/api/projects", response_model=List[Project])
def get_projects():
    """List all saved projects."""
    return list(_PROJECTS_DB.values())


@app.post("/api/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
def create_project(project_data: ProjectCreate):
    """Create a new project."""
    project_id = f"proj-{uuid.uuid4().hex[:8]}"
    files = project_data.files if project_data.files else get_starter_files(prompt=project_data.prompt)
    
    new_project = Project(
        id=project_id,
        title=project_data.title,
        description=project_data.description or "",
        prompt=project_data.prompt or "",
        framework=project_data.framework or "html-tailwind",
        files=files,
        created_at=time.time(),
        updated_at=time.time(),
    )
    _PROJECTS_DB[project_id] = new_project
    return new_project


@app.get("/api/projects/{project_id}", response_model=Project)
def get_project(project_id: str):
    """Retrieve project by ID."""
    if project_id not in _PROJECTS_DB:
        raise HTTPException(status_code=404, detail="Project not found")
    return _PROJECTS_DB[project_id]


@app.put("/api/projects/{project_id}", response_model=Project)
def update_project(project_id: str, update_data: ProjectUpdate):
    """Update project metadata or file contents."""
    if project_id not in _PROJECTS_DB:
        raise HTTPException(status_code=404, detail="Project not found")

    project = _PROJECTS_DB[project_id]
    if update_data.title is not None:
        project.title = update_data.title
    if update_data.description is not None:
        project.description = update_data.description
    if update_data.files is not None:
        project.files = update_data.files
    project.updated_at = time.time()
    
    _PROJECTS_DB[project_id] = project
    return project


@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str):
    """Delete a project by ID."""
    if project_id not in _PROJECTS_DB:
        raise HTTPException(status_code=404, detail="Project not found")
    del _PROJECTS_DB[project_id]
    return {"message": f"Project {project_id} deleted successfully"}


@app.post("/api/generate")
def generate_project(req: GenerateRequest):
    """
    Generate or update a web application based on a natural language prompt.
    """
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    project_id = req.project_id or f"proj-{uuid.uuid4().hex[:8]}"
    generated_files = get_starter_files(template=req.template or "landing", prompt=prompt)

    project = Project(
        id=project_id,
        title=prompt[:32].title() if prompt else "Generated Web App",
        description=f"Generated from: '{prompt}'",
        prompt=prompt,
        framework=req.framework or "html-tailwind",
        files=generated_files,
        created_at=time.time(),
        updated_at=time.time(),
    )
    _PROJECTS_DB[project_id] = project

    return {
        "success": True,
        "project": project,
        "message": f"Successfully generated app for prompt: '{prompt}'",
    }


@app.post("/api/chat")
def chat_with_ai(req: ChatRequest):
    """
    Handles conversational interactions to refine, explain, or edit the current code and global styles.
    """
    message = req.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    project = _PROJECTS_DB.get(req.project_id)
    files = req.current_files or (project.files if project else [])

    reply_text = f"I have processed your request: '{message}'.\nI've updated the global stylesheet (styles.css) and component markup accordingly."

    updated_files = []
    for f in files:
        new_content = f.content
        if "color" in message.lower() or "dark" in message.lower() or "blue" in message.lower():
            if f.name == "styles.css":
                new_content += "\n/* AI Refinement: Global Theme Overrides */\n:root { --primary: #3b82f6; --primary-hover: #2563eb; }\n"
        updated_files.append(
            FileItem(
                name=f.name,
                path=f.path,
                content=new_content,
                language=f.language,
                type=f.type,
            )
        )

    if project:
        project.files = updated_files
        project.updated_at = time.time()
        _PROJECTS_DB[req.project_id] = project

    return {
        "reply": reply_text,
        "updated_files": updated_files,
        "timestamp": time.time(),
    }


@app.post("/api/preview")
def compile_preview(req: PreviewRequest):
    """
    Compiles multi-file project into a single bundled HTML payload for iframe rendering with global styles.
    """
    html_file = next((f for f in req.files if f.name == req.entry_file or f.path.endswith(".html")), None)
    css_files = [f for f in req.files if f.name.endswith(".css")]
    js_files = [f for f in req.files if f.name.endswith(".js")]

    if not html_file:
        return {"compiled_html": "<h1>No index.html file found.</h1>"}

    compiled_html = html_file.content

    # Inject global CSS
    combined_css = "\n".join([f"/* Global: {f.name} */\n{f.content}" for f in css_files])
    if combined_css and "</head>" in compiled_html:
        compiled_html = compiled_html.replace(
            "</head>", f"<style>\n{combined_css}\n</style>\n</head>"
        )

    # Inject global scripts
    combined_js = "\n".join([f"// Global: {f.name}\n{f.content}" for f in js_files])
    if combined_js and "</body>" in compiled_html:
        compiled_html = compiled_html.replace(
            "</body>", f"<script>\n{combined_js}\n</script>\n</body>"
        )

    return {"compiled_html": compiled_html}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
