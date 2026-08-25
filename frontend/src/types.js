/**
 * Prompt2Web - Data Shapes, Constants & Starter Templates
 */

export const VIEW_MODES = {
  SPLIT: 'split',
  CODE: 'code',
  PREVIEW: 'preview',
};

export const VIEWPORTS = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
};

export const STARTER_TEMPLATES = [
  {
    id: 'landing-page',
    title: 'SaaS Landing Page',
    description: 'High-converting hero section with feature grid, pricing cards, and interactive CTA.',
    icon: 'Sparkles',
    prompt: 'Create a high-converting modern dark SaaS landing page for an AI developer platform with feature highlights, testimonials, and dynamic pricing toggle.',
  },
  {
    id: 'portfolio',
    title: 'Creative Portfolio',
    description: 'Modern developer & designer showcase with project gallery, skills chips, and contact form.',
    icon: 'Briefcase',
    prompt: 'Build a sleek personal portfolio for a senior full-stack engineer with an interactive project showcase, skills grid, and contact modal.',
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Data metrics view with statistics cards, revenue chart placeholder, and recent user tables.',
    icon: 'BarChart3',
    prompt: 'Design a clean SaaS analytics dashboard with metrics overview, progress indicators, recent transactions table, and quick filter pills.',
  },
  {
    id: 'ecommerce',
    title: 'Minimalist Store',
    description: 'E-commerce product catalog with interactive cart drawer, product cards, and filter tags.',
    icon: 'ShoppingBag',
    prompt: 'Build a modern minimalist e-commerce store with product grid, category tabs, dynamic shopping cart drawer, and checkout button.',
  },
];

export const INITIAL_FILES = [
  {
    name: 'index.html',
    path: 'index.html',
    language: 'html',
    type: 'file',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prompt2Web - AI Generated App</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <!-- Central Global Stylesheet -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="app-body">
  <!-- Navbar -->
  <nav class="app-navbar">
    <div class="navbar-container">
      <div class="brand-logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Prompt2Web</span>
      </div>
      <div class="nav-actions">
        <button onclick="handleExplore()" class="btn-cta">
          Get Started
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-section">
    <span class="badge-pill">
      ✨ Prompt-Powered Generation
    </span>
    <h1 class="hero-title">
      Build and Ship Web Apps <br/>
      <span class="hero-gradient-text">At Lightning Speed</span>
    </h1>
    <p class="hero-description">
      Your prompt was successfully transformed into this interactive web prototype. Edit the prompt or files directly to customize it further!
    </p>

    <!-- Interactive Component -->
    <div class="hero-actions">
      <button id="counter-btn" onclick="incrementCounter()" class="counter-btn">
        <i class="fa-solid fa-heart heart-icon"></i>
        <span>Likes: <strong id="like-count" class="counter-number">0</strong></span>
      </button>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    name: 'styles.css',
    path: 'styles.css',
    language: 'css',
    type: 'file',
    content: `/* ==========================================================================
   Global Stylesheet for Generated Application
   ========================================================================== */

:root {
  --bg-color: #0B0F19;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --card-bg: rgba(22, 30, 46, 0.7);
  --border-color: rgba(51, 65, 85, 0.6);
}

/* Global Body Reset & Font */
.app-body {
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
}

/* Navigation Bar */
.app-navbar {
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.logo-text {
  font-weight: 700;
  font-size: 1.125rem;
  color: #ffffff;
}

/* Buttons */
.btn-cta {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-cta:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-cta:active {
  transform: translateY(0);
}

/* Hero Section */
.hero-section {
  padding: 5rem 1.5rem;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.badge-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.25);
  display: inline-block;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin: 0;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.hero-gradient-text {
  background: linear-gradient(to right, #818cf8, #c084fc, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  color: var(--text-muted);
  font-size: 1.125rem;
  max-width: 36rem;
  margin: 0;
  line-height: 1.6;
}

.hero-actions {
  padding-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.counter-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.counter-btn:hover {
  background-color: #334155;
}

.counter-btn:active {
  transform: scale(0.97);
}

.heart-icon {
  color: #ec4899;
}

.counter-number {
  color: #818cf8;
}
`,
  },
  {
    name: 'script.js',
    path: 'script.js',
    language: 'javascript',
    type: 'file',
    content: `// Interactive Application Logic
let count = 0;

function incrementCounter() {
  count += 1;
  const countEl = document.getElementById('like-count');
  if (countEl) {
    countEl.innerText = count;
  }
}

function handleExplore() {
  alert('You can modify this code in the editor or instruct the AI assistant to add more components!');
}

console.log('App sandbox initialized successfully.');
`,
  },
];
