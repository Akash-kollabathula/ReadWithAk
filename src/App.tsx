import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  BookOpen, 
  Zap, 
  Terminal, 
  HelpCircle, 
  GitBranch, 
  Award, 
  Flame,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { MODULES_DATA } from './data/modulesData';
import { ALL_INTERVIEW_QUESTIONS } from './data/interviewQuestions';
import { LessonModule, ActiveTab } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ModuleViewer } from './components/ModuleViewer';
import { ArchitectureVisualizer } from './components/InteractiveLabs/ArchitectureVisualizer';
import { ActionabilitySimulator } from './components/InteractiveLabs/ActionabilitySimulator';
import { LocatorPlayground } from './components/InteractiveLabs/LocatorPlayground';
import { ApiWorkbench } from './components/InteractiveLabs/ApiWorkbench';
import { InterviewHub } from './components/InterviewHub';
import { GitHubPagesDeployModal } from './components/GitHubPagesDeployModal';
import { CertificateModal } from './components/CertificateModal';
import { Footer } from './components/Footer';

export default function App() {
  // Dark mode initial state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('readwithak_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');

  // Selected module in curriculum view
  const [selectedModuleId, setSelectedModuleId] = useState<string>(() => {
    try {
      const last = localStorage.getItem('readwithak_last_module');
      return last || MODULES_DATA[0].id;
    } catch {
      return MODULES_DATA[0].id;
    }
  });

  // Studied modules tracker
  const [studiedModules, setStudiedModules] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('readwithak_studied');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Search & Tag Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modals
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('readwithak_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('readwithak_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist last module
  useEffect(() => {
    localStorage.setItem('readwithak_last_module', selectedModuleId);
  }, [selectedModuleId]);

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        window.scrollTo({ top: 300, behavior: 'smooth' });
        const searchInput = document.querySelector('input[placeholder*="Search by keyword"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle studied module
  const handleToggleStudied = (id: string) => {
    setStudiedModules((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('readwithak_studied', JSON.stringify(next));
      return next;
    });
  };

  const completedCount = Object.values(studiedModules).filter(Boolean).length;
  const totalModules = MODULES_DATA.length;

  // Next unstudied module
  const nextModuleToStudy = MODULES_DATA.find((m) => !studiedModules[m.id]) || MODULES_DATA[0];

  const handleResumeNext = () => {
    setSelectedModuleId(nextModuleToStudy.id);
    setActiveTab('curriculum');
    const viewerElement = document.getElementById('curriculum-viewer');
    if (viewerElement) {
      viewerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter modules based on search query and tag
  const filteredModules = MODULES_DATA.filter((m) => {
    const matchesSearch =
      searchQuery === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === null ||
      m.tags.includes(selectedTag) ||
      m.track === selectedTag;

    return matchesSearch && matchesTag;
  });

  const currentModule = MODULES_DATA.find((m) => m.id === selectedModuleId) || MODULES_DATA[0];
  const currentModuleIndex = MODULES_DATA.findIndex((m) => m.id === currentModule.id);

  const handleNavigateNext = () => {
    if (currentModuleIndex < MODULES_DATA.length - 1) {
      setSelectedModuleId(MODULES_DATA[currentModuleIndex + 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleNavigatePrev = () => {
    if (currentModuleIndex > 0) {
      setSelectedModuleId(MODULES_DATA[currentModuleIndex - 1].id);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenSearch={() => {
          window.scrollTo({ top: 300, behavior: 'smooth' });
          const searchInput = document.querySelector('input[placeholder*="Search by keyword"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
        completedCount={completedCount}
        totalModules={totalModules}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Hero Header Strip */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        completedCount={completedCount}
        totalModules={totalModules}
        onResumeNext={handleResumeNext}
        nextModuleToStudy={nextModuleToStudy}
      />

      {/* Primary Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Mode Sub-Bar */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Modules &amp; Deep-Dive Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'labs'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Architecture &amp; Actionability Labs</span>
          </button>

          <button
            onClick={() => setActiveTab('api-workbench')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'api-workbench'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive API Request Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('interview-hub')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'interview-hub'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interview Q&amp;A Hub ({ALL_INTERVIEW_QUESTIONS.length})</span>
          </button>
        </div>

        {/* TAB 1: CURRICULUM & MODULE VIEWER */}
        {activeTab === 'curriculum' && (
          <div id="curriculum-viewer" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar: Module Index (4 cols) */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sticky top-20">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Curriculum Index
                  </span>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                    {completedCount}/{totalModules} Done
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {filteredModules.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No modules match "{searchQuery}".
                    </div>
                  ) : (
                    filteredModules.map((m) => {
                      const isSelected = m.id === selectedModuleId;
                      const isDone = !!studiedModules[m.id];

                      return (
                        <div
                          key={m.id}
                          onClick={() => setSelectedModuleId(m.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-all border flex items-start gap-3 select-none ${
                            isSelected
                              ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-white'
                              : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {/* Studied Checkmark Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStudied(m.id);
                            }}
                            className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600"
                            title={isDone ? 'Studied' : 'Mark as studied'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                                Module {m.number}
                              </span>
                              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                                {m.subtopics?.length || 0} topics
                              </span>
                            </div>
                            <div className="text-xs font-semibold truncate leading-snug">
                              {m.title}
                            </div>
                          </div>

                          {isSelected && (
                            <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-2" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </aside>

            {/* Right Main Content: Module Viewer (8 cols) */}
            <section className="lg:col-span-8">
              <ModuleViewer
                module={currentModule}
                isStudied={!!studiedModules[currentModule.id]}
                onToggleStudied={handleToggleStudied}
                onNavigateNext={handleNavigateNext}
                onNavigatePrev={handleNavigatePrev}
                hasPrev={currentModuleIndex > 0}
                hasNext={currentModuleIndex < MODULES_DATA.length - 1}
              />
            </section>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'labs' && (
          <div className="space-y-8">
            {/* Lab 1: Architecture Visualizer */}
            <ArchitectureVisualizer />

            {/* Lab 2: Actionability Simulator */}
            <ActionabilitySimulator />

            {/* Lab 3: Locator Playground */}
            <LocatorPlayground />
          </div>
        )}

        {/* TAB 3: API WORKBENCH */}
        {activeTab === 'api-workbench' && (
          <div className="space-y-6">
            <ApiWorkbench />
          </div>
        )}

        {/* TAB 4: INTERVIEW HUB */}
        {activeTab === 'interview-hub' && (
          <div>
            <InterviewHub />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* GitHub Pages Deploy Modal */}
      <GitHubPagesDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        completedCount={completedCount}
        totalModules={totalModules}
      />
    </div>
  );
}
