# Premium Personal Portfolio & Interactive Showcase

An ultra-premium, interactive developer portfolio showcasing expertise, certifications, projects, and skills. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Framer Motion** for state-of-the-art visual effects, smooth transitions, and high-performance micro-interactions.

<img width="1876" height="872" alt="Portfolio Showcase" src="https://github.com/user-attachments/assets/9eb637f7-313b-4a8e-ac44-160a60650951" />

---

## 🚀 Key Features

*   **Premium Interactive Canvas**: A responsive particle engine that generates non-blocking ambient particles using a custom-seeded PRNG, keeping layout shifts at zero.
*   **Mouse-Reactive Glow Spotlight**: Fluid cursor spotlighting implemented with Framer Motion springs for deep visual immersion on desktop screens.
*   **Advanced Scroll Animations**: Interactive card rotations, orbital nodes, timeline paths, and fade-ins driven by Framer Motion and AOS.
*   **Production-Ready Contact Gateway**: Built-in contact form fully integrated with EmailJS, complete with front-end validation, custom error reporting, and dynamic toast alerts.
*   **Optimized Performance**: Zero external library bloat, lazy-evaluated layouts, CSS-driven hardware-accelerated animations, and Tailwind v4 setup.

---

## 🛠️ Tech Stack & Libraries

*   **Framework**: [React 19](https://react.dev/)
*   **Bundler & Dev Tools**: [Vite 8](https://vite.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation Library**: [Framer Motion 12](https://www.framer.com/motion/) & [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
*   **Communication Gateway**: [@emailjs/browser](https://www.emailjs.com/)

---

## 📂 Directory Layout

```text
├── .vscode/               # Workspace specific settings (linter configurations)
├── public/                # Static public assets
├── src/
│   ├── components/        # Reusable visual components (Hero, Skills, ExpertiseCard, Contact, etc.)
│   ├── App.jsx            # Main app router / setup
│   ├── index.css          # Core styles, keyframes, and Tailwind entries
│   └── main.jsx           # App bootstrapping entry point
├── .env                   # Local environment credentials (EmailJS variables)
├── package.json           # Scripts, dependencies, and project metadata
└── vite.config.js         # Bundler configuration
```

---

## ⚙️ Local Development Setup

Follow these steps to set up the project locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 2. Clone the Repository & Navigate
```bash
git clone https://github.com/Abhik-08/Portofolio-basic.git
cd video_portfolio-main/video_portfolio-main
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the root of the project (if not already present) and populate it with your EmailJS credentials:

```ini
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 5. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Build

To compile a minified, production-ready bundle, run:
```bash
npm run build
```
This builds static assets into the `dist` directory which can be easily hosted on platforms like Netlify, Vercel, or GitHub Pages.

---

## 💡 About this template

This project was bootstrapped using the official React + Vite template.
*   **@vitejs/plugin-react** uses [Oxc](https://oxc.rs)
*   **@vitejs/plugin-react-swc** uses [SWC](https://swc.rs/)
