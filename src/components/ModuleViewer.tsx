import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  BookOpen,
  Code,
  ListChecks,
  CheckSquare,
  Square
} from 'lucide-react';
import { LessonModule } from '../types';

interface ModuleViewerProps {
  module: LessonModule;
  isStudied: boolean;
  onToggleStudied: (id: string) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  isStudied,
  onToggleStudied,
  onNavigateNext,
  onNavigatePrev,
  hasPrev,
  hasNext,
}) => {
  const [codeLanguage, setCodeLanguage] = useState<'ts' | 'js'>('ts');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  // Subtopic checklist tracking
  const [checkedSubtopics, setCheckedSubtopics] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('readwithak_subtopics');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleSubtopic = (subId: string) => {
    setCheckedSubtopics((prev) => {
      const next = { ...prev, [subId]: !prev[subId] };
      localStorage.setItem('readwithak_subtopics', JSON.stringify(next));
      return next;
    });
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Subtopic progress calculations
  const moduleSubtopics = module.subtopics || [];
  const completedSubtopicsCount = moduleSubtopics.filter((s) => !!checkedSubtopics[s.id]).length;
  const isAllSubtopicsDone = moduleSubtopics.length > 0 && completedSubtopicsCount === moduleSubtopics.length;

  const handleToggleAllSubtopics = () => {
    setCheckedSubtopics((prev) => {
      const next = { ...prev };
      const targetState = !isAllSubtopicsDone;
      moduleSubtopics.forEach((s) => {
        next[s.id] = targetState;
      });
      localStorage.setItem('readwithak_subtopics', JSON.stringify(next));
      return next;
    });
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors">
      {/* Header Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Module {module.number}
          </span>
          <span aria-hidden="true">·</span>
          <span>{module.trackLabel || module.track}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{module.readTimeMinutes} min read</span>
          </span>
        </div>

        {/* Mark as Studied Button */}
        <button
          onClick={() => onToggleStudied(module.id)}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            isStudied
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 border border-transparent'
          }`}
        >
          {isStudied ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Module Mastered</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Mark Module as Studied</span>
            </>
          )}
        </button>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-6 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {module.number}. {module.title}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {module.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          {module.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* SYLLABUS TOPIC CHECKLIST CARD */}
      {moduleSubtopics.length > 0 && (
        <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Module Syllabus Checklist ({completedSubtopicsCount}/{moduleSubtopics.length} Covered)
              </span>
            </div>

            <button
              onClick={handleToggleAllSubtopics}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-left sm:text-right"
            >
              {isAllSubtopicsDone ? 'Uncheck All' : 'Mark All Completed'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {moduleSubtopics.map((sub) => {
              const checked = !!checkedSubtopics[sub.id];

              return (
                <div
                  key={sub.id}
                  onClick={() => toggleSubtopic(sub.id)}
                  className={`p-2.5 rounded-lg border cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                    checked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-slate-400">
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className={`font-semibold ${checked ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                      {sub.title}
                    </div>
                    {sub.description && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {sub.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Takeaways Card */}
      <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-xl mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-3">
          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Core Invariants &amp; Architectural Rules</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {module.keyTakeaways.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {module.contentSections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{idx + 1}.</span>
              <span>{section.heading}</span>
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {section.body}
            </p>

            {/* Concept Callout */}
            {section.conceptCallout && (
              <div
                className={`p-4 rounded-lg border text-xs sm:text-sm ${
                  section.conceptCallout.type === 'tip'
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : section.conceptCallout.type === 'warning'
                    ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                    : 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {section.conceptCallout.type === 'tip' ? (
                    <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : section.conceptCallout.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                  <span>{section.conceptCallout.title}</span>
                </div>
                <p className="leading-relaxed">{section.conceptCallout.text}</p>
              </div>
            )}

            {/* Practical Code Snippet Box */}
            {section.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-md">
                {/* Code Top Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      {section.codeSnippet.fileName || 'sample.spec.ts'}
                    </span>
                    {section.codeSnippet.caption && (
                      <span className="hidden sm:inline text-xs text-slate-500">
                        — {section.codeSnippet.caption}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* TS / JS Switcher */}
                    <div className="flex items-center bg-slate-800 rounded p-0.5 text-[11px] font-mono">
                      <button
                        onClick={() => setCodeLanguage('ts')}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          codeLanguage === 'ts'
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        TS
                      </button>
                      <button
                        onClick={() => setCodeLanguage('js')}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          codeLanguage === 'js'
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        JS
                      </button>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() =>
                        handleCopyCode(
                          codeLanguage === 'ts' ? section.codeSnippet!.ts : section.codeSnippet!.js,
                          idx
                        )
                      }
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
                      title="Copy code to clipboard"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-slate-200 leading-relaxed">
                    {codeLanguage === 'ts' ? section.codeSnippet.ts : section.codeSnippet.js}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Embedded Interview Questions */}
      {module.interviewQuestions && module.interviewQuestions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Expected Interview Questions on this Topic
            </h3>
          </div>

          <div className="space-y-4">
            {module.interviewQuestions.map((q) => {
              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {q.difficulty} Level
                        </span>
                        <span>·</span>
                        <span className="capitalize">{q.category}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {q.question}
                      </h4>
                    </div>

                    <button className="p-1 text-slate-400 hover:text-slate-600 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Context Scenario */}
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 italic">
                    Scenario: {q.scenario}
                  </div>

                  {/* Expanded Answer */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                          High-Scoring Candidate Answer:
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.seniorAnswer}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                          Interviewer Intent &amp; Common Pitfalls:
                        </span>
                        <p className="text-amber-800 dark:text-amber-300 mb-2">
                          {q.interviewerIntent}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-amber-700 dark:text-amber-400">
                          {q.pitfalls.map((pitfall, pIdx) => (
                            <li key={pIdx}>{pitfall}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next Module Navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <button
          onClick={onNavigatePrev}
          disabled={!hasPrev}
          className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Module</span>
        </button>

        <button
          onClick={onNavigateNext}
          disabled={!hasNext}
          className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition-colors shadow-sm"
        >
          <span>Next Module</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
