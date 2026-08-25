# Prompt2Web ⚡

AI-powered web development platform that transforms natural language prompts into responsive, interactive web applications with a live multi-file editor and instant preview sandbox.

---

## ✨ Features

- 🧠 **Instant Prompt-to-Code**: Generate multi-file web applications (HTML, CSS, JS) directly from natural language prompts.
- 💬 **Iterative AI Chat**: Refine code, customize styles, and add features through conversational AI.
- 💻 **Live Code Editor**: Interactive multi-file code editor with live editing and instant updates.
- 📱 **Responsive Preview**: Test designs instantly across Desktop, Tablet, and Mobile viewports.
- 📁 **Multi-File Workspace**: Manage and edit interconnected HTML, CSS, and JS project files seamlessly.

---

## 🚀 Running the Application

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
> Backend runs at `http://localhost:8000` (Swagger UI at `http://localhost:8000/docs`)

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
> Frontend runs at `http://localhost:5173`
