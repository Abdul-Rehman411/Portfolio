# CLI Portfolio

A command-line interface (CLI) inspired portfolio that simulates a terminal experience for showcasing your skills, projects, and professional journey. Built with Next.js, React, and Tailwind CSS, this portfolio lets visitors explore your work by typing commands.

## 🚀 Features

- **Interactive Commands:** Navigate the portfolio by typing commands like `help`, `about`, `projects`, and more.
- **Command Autocomplete & History:** Use ↑/↓ to scroll through past commands and Tab to autocomplete.
- **Keyword Highlighting:** Commands and output are styled for a terminal-like feel.
- **Responsive Design:** Built with Tailwind CSS to work well on desktop and mobile.
- **Auto-Scroll:** Terminal output auto-scrolls as new commands appear.

## 🧭 Available Commands

- `help` – List available commands
- `about` – View a short bio
- `skills` – See technical skills
- `projects` – Browse key projects
- `resume` – Open resume PDF (if provided)
- `clear` – Clear the terminal

You can customize these commands inside `components/CLI.jsx` in the `commands` object.

## 🛠️ Tech Stack

- **Next.js** – Framework for React with built-in routing and SSR
- **React** – UI component model and state management
- **Tailwind CSS** – Utility-first styling with responsive defaults

## 💻 Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**

### Install

```bash
git clone https://github.com/Abdul-Rehman411/cli-portfolio.git
cd cli-portfolio
npm install
```

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📚 Projects (as shown in portfolio)

1. **Iqrasity — Next-Gen Educational Marketplace**
   - https://iqrasity.org
   - A modern headless educational marketplace integrating Moodle LMS with Strapi CMS. Built a scalable Next.js frontend with hybrid data orchestration, dynamic mega-menu navigation, SSO authentication, automated LMS-CMS synchronization, and advanced SEO optimization for thousands of course pages.

2. **WhatChat**
   - https://github.com/Abdul-Rehman411/whatchat
   - A full-stack real-time chat application built with the MERN stack featuring Socket.IO messaging, JWT authentication, Cloudinary file uploads, and a responsive UI inspired by WhatsApp.

3. **TailorEase Platform**
   - https://tailorease.vercel.app
   - A custom tailoring platform connecting customers with tailors for personalized orders, featuring 3D virtual try-on, AI chatbot support, wallet payouts, and real-time order tracking.

4. **MedAlign Solutions**
   - https://medalignsolutions.com
   - A healthcare portfolio website built in WordPress with responsive layouts, chatbot integration, and consultation request forms.

5. **VLT Advisers**
   - https://vltadvisors.com
   - A financial consulting website built with WordPress featuring responsive layouts, modern design, and interactive client inquiry forms.

## 🎨 Customization

- Change the prompt UI by editing `components/CLI.jsx`.
- Add new commands by updating the `commands` object inside `components/CLI.jsx`.

---

> Built with Next.js, React, and Tailwind CSS — an interactive CLI portfolio that feels like a developer terminal.
