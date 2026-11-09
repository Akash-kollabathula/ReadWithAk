import React from 'react';
import { GitBranch, BookOpen, Terminal, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDeployModal: () => void;
  onOpenCertificate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenDeployModal,
  onOpenCertificate,
}) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              ReadWithAK
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The premier interactive guide for understanding Playwright and API automation from first principles.
              Designed with practical code, actionable diagrams, real interview preparation, and continuous integration readiness.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
              <span>TypeScript</span>
              <span>·</span>
              <span>Playwright v1.40+</span>
              <span>·</span>
              <span>GitHub Pages Ready</span>
            </div>
          </div>

          {/* Curriculum Links */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-200 block mb-2">
              Curriculum &amp; Labs
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Full Modules Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('labs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  CDP Architecture Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('api-workbench');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  API Request &amp; Mocking Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('interview-hub');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  FAANG Interview Prep Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Deployment & Resources */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-200 block mb-2">
              Deployment &amp; Badges
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={onOpenDeployModal}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Pages Workflow</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeployModal}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Playwright CI Pipeline</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCertificate}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Verify Mastery Certificate
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Unboxed Strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} ReadWithAK. Open educational resource for test automation engineers.
          </div>
          <div className="flex items-center gap-3">
            <span>Built with Playwright, React &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
