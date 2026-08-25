# Prompt2Web ⚡

**Prompt2Web** is an AI-powered web development platform that transforms natural language prompts into responsive, interactive, and production-ready web applications with a live multi-file editor and instant preview sandbox.

---

## 📁 Project Structure

```text
Prompt2Web/
├── backend/
│   ├── requirements.txt      # FastAPI, Uvicorn & dependencies
│   └── app/
│       └── main.py           # FastAPI application endpoints & logic
│
└── frontend/
    ├── index.html            # Entry HTML document
    ├── package.json          # Node dependencies & scripts
    ├── vite.config.js        # Vite + React + Proxy configuration
    ├── tailwind.config.js    # Tailwind theme & color settings
    ├── postcss.config.js     # PostCSS plugins
    ├── README.md             # Project documentation
    └── src/
        ├── main.jsx          # React DOM entry point
        ├── App.jsx           # App routing & main layout
        ├── index.css         # Tailwind directives & global styling
        ├── types.js          # Models, templates & presets
        │
        ├── pages/
        │   ├── Landing.jsx   # Hero page & interactive prompt input
        │   ├── Dashboard.jsx # Projects manager & template gallery
        │   └── Editor.jsx    # Complete AI IDE & 3-panel workspace
        │
        ├── components/
        │   ├── ChatPanel.jsx # AI conversation & prompt refiner
        │   ├── PreviewFrame.jsx # Sandboxed live responsive preview
        │   ├── CodeEditor.jsx # Multi-file code editor with tabs
        │   └── FileTree.jsx  # File explorer & hierarchy
        │
        ├── store/
        │   └── useProjectStore.js # Zustand state management
        │
        └── api/
            └── client.js     # API client with seamless fallback
```

---

## 🚀 Quick Start Guide

### 1. Run the Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
# Or using uvicorn directly:
uvicorn app.main.py:app --reload --port 8000
```

The FastAPI backend will start at `http://localhost:8000`.  
API Docs (Swagger UI) available at `http://localhost:8000/docs`.

### 2. Run the Frontend (React + Vite + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend dev server will launch at `http://localhost:5173`.

---

## ✨ Key Features

- 🧠 **Instant Prompt-to-Code**: Convert natural language descriptions into multi-file web apps (HTML, CSS, JS).
- 💬 **Iterative AI Chat**: Chat with AI to add features, adjust colors, modify responsive breakpoints, and optimize layout.
- 💻 **Live Code Editor**: Tabbed code view with line numbers, instant editing, and copy/download controls.
- 📱 **Responsive Preview**: Switch between Desktop, Tablet, and Mobile viewport modes with live sandboxed reload.
- 📁 **File Hierarchy**: Expandable file tree with file creation, deletion, and seamless switching.
- ⚡ **Offline & Mock Ready**: Works seamlessly even without backend running thanks to intelligent mock fallback in `api/client.js`.
