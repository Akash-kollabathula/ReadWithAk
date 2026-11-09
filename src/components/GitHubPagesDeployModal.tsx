import React, { useState } from 'react';
import { X, Copy, Check, GitBranch, Terminal, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';

interface GitHubPagesDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesDeployModal: React.FC<GitHubPagesDeployModalProps> = ({ isOpen, onClose }) => {
  const [activeWorkflow, setActiveWorkflow] = useState<'pages' | 'playwright'>('pages');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const deployYaml = `name: Deploy ReadWithAK to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment to prevent race conditions
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js (Node 20 LTS)
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Web Bundle
        run: npm run build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const playwrightCiYaml = `name: Playwright Test Automation Suite CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js 20 LTS
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Install Playwright Browsers with OS Dependencies
        run: npx playwright install --with-deps

      - name: Run Playwright Tests (Parallel)
        run: npx playwright test
        env:
          CI: true

      - name: Upload HTML Test Report Artifact
        uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`;

  const currentYaml = activeWorkflow === 'pages' ? deployYaml : playwrightCiYaml;
  const currentFileName = activeWorkflow === 'pages' ? '.github/workflows/deploy.yml' : '.github/workflows/playwright.yml';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              GitHub Pages &amp; CI/CD Deployment Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Steps Explainer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                1. Enable GitHub Pages
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                In your GitHub repo: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">Settings &gt; Pages</code>, set Source to <strong>GitHub Actions</strong>.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                2. Node 20 LTS Tested
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                The workflow uses Node 20 LTS for lightning-fast build and deterministic <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">npm ci</code> caching.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                3. Relative Assets Ready
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">vite.config.ts</code> already contains <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">base: './'</code> so assets load seamlessly.
              </p>
            </div>
          </div>

          {/* Workflow Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveWorkflow('pages')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeWorkflow === 'pages'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              deploy.yml (GitHub Pages Website)
            </button>
            <button
              onClick={() => setActiveWorkflow('playwright')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeWorkflow === 'playwright'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              playwright.yml (Automated Test CI Pipeline)
            </button>
          </div>

          {/* Code Viewer */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs font-mono">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <span className="text-slate-400">{currentFileName}</span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied YAML!' : 'Copy Workflow File'}</span>
              </button>
            </div>
            <pre className="p-4 text-emerald-300 overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
              {currentYaml}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ReadWithAK · GitHub Pages CI/CD</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
