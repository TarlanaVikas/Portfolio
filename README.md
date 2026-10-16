# Vikas Tarlana: Portfolio

Static dark editorial portfolio built with React, Vite and TypeScript. Plain CSS and a small Canvas background (no animation library, no backend). Chosen for a tiny bundle (~52 KB gzipped JS) and easy editing.

## Run locally (Windows / VS Code)
Requires Node.js 18+.
```
npm install
npm run dev
```
Production check:
```
npm run build
npm run preview
```

## Update content
All text, links, projects, certifications, experience and education live in `src/data.ts`.
- **Add a project:** add an object to `projects` (set `live` only if a real deployment exists).
- **Add a certification:** add to `certs`.
- **Replace resume:** overwrite `public/Vikas-Tarlana-Resume.pdf`.
- **Colors/fonts:** CSS variables at the top of `src/styles.css`.
- **Background animation:** `Backdrop` in `src/App.tsx` (disabled automatically under `prefers-reduced-motion`).
- **SEO:** after deploying, add a canonical URL and `og:url` in `index.html`.

## Deploy to Vercel
Push to GitHub, import the repo in Vercel (framework: Vite, build `npm run build`, output `dist`). No environment variables are needed.
