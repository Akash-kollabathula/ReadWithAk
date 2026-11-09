import React from 'react';
import { Search, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { LessonModule } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  completedCount: number;
  totalModules: number;
  onResumeNext: () => void;
  nextModuleToStudy?: LessonModule;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  completedCount,
  totalModules,
  onResumeNext,
  nextModuleToStudy,
}) => {
  const percent = Math.round((completedCount / totalModules) * 100);

  const tags = [
    { label: 'All 15 Modules', value: null },
    { label: 'Track 1: Fundamentals (M1-M4)', value: 'track-1-foundations' },
    { label: 'Track 2: Core Engine (M5-M8)', value: 'track-2-core-engine' },
    { label: 'Track 3: Deep API & Network (M9-M12)', value: 'track-3-api-network' },
    { label: 'Track 4: Enterprise & AI (M13-M15)', value: 'track-4-devops-enterprise' },
    { label: 'API Testing', value: '#api' },
    { label: 'Network Mocking', value: '#mocking' },
    { label: 'Locators', value: '#locators' },
    { label: 'CI/CD & Docker', value: '#cicd' },
    { label: 'AI & MCP Server', value: '#mcp' },
  ];

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed Metadata Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
          <span>ReadWithAK Complete 15-Module Syllabus</span>
          <span aria-hidden="true">·</span>
          <span>Playwright &amp; API In-Depth</span>
          <span aria-hidden="true">·</span>
          <span>Zero Flakiness Engineering</span>
        </div>

        {/* Primary Headline with text-wrap balance */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance max-w-4xl">
          Master Playwright &amp; API Automation in Depth
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          From persistent WebSocket architecture and zero-sleep actionability to headless REST execution,
          network mocking with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">page.route()</code>,
          and senior interview questions. Designed for engineers who want deep practical understanding.
        </p>

        {/* Action & Search Bar Strip */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-4 max-w-3xl">
          {/* Search Input Box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, locator, API method, or concept..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Continue / Resume Action */}
          {nextModuleToStudy && (
            <button
              onClick={onResumeNext}
              className="px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all shrink-0 hover:translate-x-0.5"
            >
              <span>{completedCount === 0 ? 'Start Module 01' : 'Resume Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress Strip */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-32 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {percent}% Completed
            </span>
            <span className="text-xs text-slate-400">
              ({completedCount} of {totalModules} modules studied)
            </span>
          </div>

          {nextModuleToStudy && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
              <span>Up next:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {nextModuleToStudy.title}
              </span>
            </div>
          )}
        </div>

        {/* Filter Tabs (Interactive Segmented Buttons) */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {tags.map((t) => {
            const isActive = selectedTag === t.value;
            return (
              <button
                key={t.label}
                onClick={() => setSelectedTag(t.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
