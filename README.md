# 🏥 Ansh Healthcare

**Modernized Scalable Pharmaceutical Distribution Ecosystem**

[![React Version](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite Framework](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Modernized](https://img.shields.io/badge/Architecture-Modernized-brightgreen)](https://github.com/padmanshu-pare/Ansh-Healthcare)

## 📌 Overview

Ansh Healthcare is a massive medical ecosystem and premier wholesale pharmaceutical distributor serving **5+ major cities since 2013**. This repository contains the complete codebase for the modernized Ansh Healthcare web platform, fully transitioned from a legacy static structure to a high-performance, component-based React architecture.

Through this modernization, we've redefined the pharmaceutical supply chain's digital presence—marrying **Scale with Precision**.

---

## 🛠️ Technological Backbone

The application is built on a high-end, contemporary tech stack designed for speed, SEO, and maintainability:

*   **Frontend Library**: [React 18](https://reactjs.org/) — Utilizing `useState`, `useEffect`, `useMemo`, and `useRef` for high-performance interactive states.
*   **Build Environment**: [Vite](https://vite.dev/) — Enabling rapid Hot Module Replacement (HMR) and optimized distribution builds.
*   **Routing**: [React Router](https://reactrouter.com/) — For seamless single-page application navigation.
*   **Styling Architecture**: **Vanilla CSS Design System** — A custom, global CSS architecture using tokens for glassmorphism, responsive grids, and dynamic animations.
*   **Iconography**: FontAwesome 6 (Professional Suite).
*   **Typography**: Inter (Google Fonts) for clinical legibility and professional aesthetic.

---

## 🔥 Key Modern Features

### 1. 🔍 Interactive "Magnifier" Inspection
A high-performance product zoom feature implemented in the `<ProductModal />`. It calculates the relative coordinates of the cursor to provide a **2.5x targeted zoom** in real-time, allowing specialists to inspect product labels and formulations with extreme clarity.

### 2. ⚡ Dynamic Product Engine
The entire product portfolio is driven by a structured data system (`src/data/products.js`). 
- **Real-time Filtering**: Sort products by Gastroenterology, Cardiology, Neurology, Diabetology, and more.
- **Instant Search**: Search through brands and compositions with zero latency.

### 3. 🌊 Kinetic Scroll-Reveal Animations
Custom-built `useScrollReveal` hook leveraging the **Intersection Observer API** to provide smooth, high-energy entrance animations for sections and counters.

### 4. 💬 Integrated Support & Inquiry
Fully functional inquiry forms with validation and direct-to-WhatsApp "Emergency" support cloud, optimizing the B2B partner acquisition funnel.

---

## 📂 Project Governance & Structure

The repository follows a clean, modular directory structure for maximum developer productivity:

```bash
├── public/                # Static assets & Public Product Images
├── src/
│   ├── components/       # Atomized UI components (Header, Modals, Popups)
│   ├── data/             # The Product Data Source (formulations database)
│   ├── hooks/            # Encapsulated logic & animations (useScrollReveal)
│   ├── pages/            # Core views (Home, Dynamic Catalog)
│   ├── App.jsx           # Master Layout & Routing Controller
│   ├── index.css         # The Design System & Global Token Registry
│   └── main.jsx          # React Mounting Controller
├── legacy_html/          # Source Code Archive (For historical reference)
└── README.md             # This document
```

---

## 🚀 Deployment & Local Development

### Installation & Run

```bash
# 1. Clone the project
git clone https://github.com/padmanshu-pare/Ansh-Healthcare.git

# 2. Navigate to directory
cd "ANSH HEALTHCARE"

# 3. Install core dependencies
npm install

# 4. Fire up the development environment
npm run dev

# 5. Compile for high-performance production
npm run build
```

The site will be available by default at **`http://localhost:5173/`**.

---

## 📅 Roadmap & Milestones

- [x] **Phase 1**: Architecture Modernization (React Migration).
- [x] **Phase 2**: High-Performance Interactive Scaling (Zoom & Filters).
- [x] **Phase 3**: Responsive Global Design System Implementation.
- [x] **Phase 4**: SEO & Metadata Infrastructure.
- [ ] **Phase 5**: Analytics & Conversion Tracking Integration (Upcoming).

---

## 📄 License & Legal

Copyright © 2026 Ansh Healthcare Ltd.
*Pan-India distribution and personalized healthcare. Join 200+ specialists relying on Ansh Healthcare.*

For wholesale inquiries, please use the integrated contact portal or reach out via [WhatsApp](https://wa.me/+919425326084).
