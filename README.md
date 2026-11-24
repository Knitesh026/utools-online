# uTools.online — Precision Studio Web Utilities

> **Designed, Engineered & Maintained by [Prematech Digital](https://prematech.co.in/)**

uTools.online is a client-side utility workbench providing **53+ free browser-native tools** and **6 in-depth reference guides** across **PDF**, **Image**, **Text & Developer**, **Converter**, **Finance & Math**, and **Security** categories. Every calculation, file transformation, and format conversion runs locally inside your browser using the Web Crypto API, HTML5 Canvas, PDF.js, and pdf-lib — with **zero server uploads** and **zero accounts required**.

---

## Key Highlights

- **uTools Precision Studio Design System**
  - **Typography**: `Bricolage Grotesque` (architectural display headings), `Plus Jakarta Sans` (high-legibility UI body), and `JetBrains Mono` (tabular metrics, hashes, and code telemetry).
  - **Surface & Depth**: Warm Alabaster (`#F8FAFC`) canvas, Deep Obsidian (`#0A0F1D`) ink, Signature Crimson (`#ED2B3E`) and Electric Cobalt (`#2563EB`) accents, tactile `1px` crisp borders, and multi-layered studio elevation shadows.
  - **Interactive Motion**: Spring/quartic easing transitions (`cubic-bezier(0.16, 1, 0.3, 1)`), tactile button press physics (`scale(0.97)`), mouse-tracking radial spotlight bento cards, interactive Hero mini-workbench previews, and full `prefers-reduced-motion` accessibility support.
  - **Global Command Palette (`⌘K` / `Ctrl+K`)**: Instant keyboard-navigable search across all 53+ tools and 6 long-form guides from anywhere in the app.
- **100% Client-Side Privacy**
  - Files and text inputs never leave the user's device.
- **Comprehensive Editorial & Reference Documentation**
  - Every tool page includes a structured reference article (`ToolArticle`) with worked examples, step-by-step instructions, best practices, limitations, and JSON-LD FAQ schema.

---

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI / shadcn primitives
- **Document & Media Engines**: `pdf-lib`, `pdfjs-dist`, `jspdf`, `qrcode`, HTML5 Canvas, Web Crypto API
- **SEO & Prerendering**: Custom `SEOPage` metadata manager + Playwright static prerendering (`scripts/prerender.mjs`) and automated quality auditing (`scripts/adsense-audit.mjs`)

---

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle + prerender all routes
npm run build

# Run SEO, accessibility & layout audit
npm run audit:adsense
```

---

## Attribution & Credits

- **Creator, Designer & Maintainer**: [Prematech Digital](https://prematech.co.in/)
- **Website**: [https://prematech.co.in/](https://prematech.co.in/)
- **Production URL**: [https://utoolss.online/](https://utoolss.online/)
