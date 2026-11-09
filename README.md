# ReadWithAK — Playwright & API Automation Guide

> A modern, interactive mastery platform for understanding Playwright and API test automation from first principles.

## Features

- **In-Depth Curriculum**: 9 core modules covering WebSocket/CDP architecture, BrowserContexts vs Pages, modern user-centric locators, auto-waiting actionability invariants, headless REST `APIRequestContext` testing, Bearer token auth persistence via `storageState`, network mocking with `page.route()`, hybrid UI+API testing, Page Object Model fixtures (`test.extend`), and CI/CD pipelines.
- **Interactive Labs & Visual Concept Simulators**:
  - **Architecture Visualizer**: Compare single persistent WebSocket communication (Playwright) against legacy HTTP REST WebDriver (Selenium).
  - **Actionability Engine Simulator**: Step-through simulation of the 5 checks Playwright performs before clicking (Attached, Visible, Stable, Receives Events, Enabled).
  - **API Request & Mocking Studio**: Execute live HTTP calls, inspect latency and headers, simulate 500 error mocks, and generate ready-to-copy Playwright code.
  - **Locator Resilience Tester**: Real-time evaluator comparing semantic accessibility roles against fragile XPaths and strictness violations.
- **Interview Preparation Hub**: Curated technical questions with senior candidate answers, scenario contexts, common traps/pitfalls, and an interactive Flashcard Practice Mode.
- **Progress Tracking & Verification**: Local progress tracking with studied checkmarks, completion percentage, and a personalized printable **ReadWithAK Mastery Certificate**.
- **Dark Mode**: Accessible dual-theme support with high-contrast Tailwind v4 `@custom-variant dark`.
- **Search & Filter**: Real-time instant search by keyword or tag (`#api`, `#mocking`, `#architecture`, etc.).

---

## Deploying to GitHub Pages

This repository is pre-configured for automated deployment to GitHub Pages via GitHub Actions:

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of ReadWithAK"
   git remote add origin https://github.com/<your-username>/ReadWithAK.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow will automatically build with **Node 20 LTS** and deploy to your GitHub Pages URL (`https://<your-username>.github.io/ReadWithAK/`).

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev

# 3. Build production bundle
npm run build
```
