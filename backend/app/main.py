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

try:
    from app.template_manager import FileItem, get_starter_files
except ImportError:
    from template_manager import FileItem, get_starter_files

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
# Data Models (FileItem imported from template_manager)
# ---------------------------------------------------------------------------

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
# In-Memory Project Store
# ---------------------------------------------------------------------------

_PROJECTS_DB: Dict[str, Project] = {}

# Seed starter project using centralized templates
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
