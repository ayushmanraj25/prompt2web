"""
Template Manager for Prompt2Web.
Loads templates (HTML, CSS, JS) from centralized static template files
rather than inlining styles and markup in the main backend application file.
"""

import os
from pathlib import Path
from typing import List, Dict, Optional
from pydantic import BaseModel

class FileItem(BaseModel):
    name: str
    path: str
    content: str
    language: Optional[str] = "html"
    type: Optional[str] = "file"

TEMPLATES_DIR = Path(__file__).parent / "templates"

_TEMPLATE_CACHE: Dict[str, str] = {}

def load_template_file(filename: str) -> str:
    """Reads a template file from the templates directory with in-memory caching."""
    if filename in _TEMPLATE_CACHE:
        return _TEMPLATE_CACHE[filename]
    
    file_path = TEMPLATES_DIR / filename
    if file_path.exists():
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            _TEMPLATE_CACHE[filename] = content
            return content
    
    return ""

def get_starter_files(template: str = "landing", prompt: str = "") -> List[FileItem]:
    """
    Generates initial starter files using centralized template files.
    CSS, HTML, and JS are cleanly separated into their own files.
    """
    safe_title = prompt.strip()[:40] if prompt else "Modern Web Application"
    description = (
        prompt.strip()
        if prompt.strip()
        else "Build dynamic, responsive web interfaces in seconds. Describe what you need, tweak live code, and export clean assets instantly."
    )

    # Load raw HTML and inject dynamic title / description
    raw_html = load_template_file("index.html")
    html_content = raw_html.replace("{{TITLE}}", safe_title).replace("{{DESCRIPTION}}", description)

    # Load centralized global stylesheet
    css_content = load_template_file("styles.css")

    # Load interactive script
    js_content = load_template_file("script.js")

    return [
        FileItem(name="index.html", path="index.html", content=html_content, language="html"),
        FileItem(name="styles.css", path="styles.css", content=css_content, language="css"),
        FileItem(name="script.js", path="script.js", content=js_content, language="javascript"),
    ]
