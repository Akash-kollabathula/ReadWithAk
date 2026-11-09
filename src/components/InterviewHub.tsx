import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  CheckCircle, 
  Bookmark, 
  Code2, 
  Copy, 
  Check, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { ALL_INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { InterviewQnA } from '../types';

export const InterviewHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('readwithak_interview_mastered');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('readwithak_interview_mastered', JSON.stringify(next));
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (code: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredQuestions = ALL_INTERVIEW_QUESTIONS.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.seniorAnswer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const masteredCount = Object.values(masteredIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              <span>Expected Technical Interview Questions</span>
              <span aria-hidden="true">·</span>
              <span>FAANG &amp; High-Growth Tech Tested</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Playwright &amp; API Automation Interview Hub
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Rigorous, scenario-based interview questions with senior-level answers, common candidate pitfalls, and actionable technical takeaways.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Flashcard Toggle */}
            <button
              onClick={() => {
                setFlashcardMode(!flashcardMode);
                setActiveCardIndex(0);
                setCardRevealed(false);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                flashcardMode
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{flashcardMode ? 'Exit Flashcard Mode' : 'Practice Flashcard Mode'}</span>
            </button>

            {/* Mastered Counter */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <CheckCircle className="w-4 h-4" />
              <span>{masteredCount} / {ALL_INTERVIEW_QUESTIONS.length} Mastered</span>
            </div>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interview questions by keyword, flaky test scenario, or API..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 overflow-x-auto text-xs font-medium">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'core', label: 'Core & Locators' },
              { id: 'api', label: 'API & GraphQL' },
              { id: 'debugging', label: 'Debugging & Flakes' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'cicd', label: 'CI/CD & Sharding' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-md transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {flashcardMode && filteredQuestions.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-colors max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
            <span>Card {activeCardIndex + 1} of {filteredQuestions.length}</span>
            <span className="capitalize">{filteredQuestions[activeCardIndex].difficulty} Level</span>
          </div>

          {/* Flashcard Body */}
          <div className="min-h-56 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {filteredQuestions[activeCardIndex].question}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-6">
              Scenario: {filteredQuestions[activeCardIndex].scenario}
            </p>

            {cardRevealed ? (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
                <div>
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    Senior Candidate Answer:
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {filteredQuestions[activeCardIndex].seniorAnswer}
                  </p>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                    What NOT to say (Interviewer Red Flags):
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-300">
                    {filteredQuestions[activeCardIndex].pitfalls.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                <button
                  onClick={() => setCardRevealed(true)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
                >
                  Reveal Senior Answer &amp; Pitfalls
                </button>
              </div>
            )}
          </div>

          {/* Flashcard Bottom Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setActiveCardIndex((prev) => Math.max(0, prev - 1));
                setCardRevealed(false);
              }}
              disabled={activeCardIndex === 0}
              className="px-3 py-1.5 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40"
            >
              Previous Card
            </button>

            <button
              onClick={() => toggleMastered(filteredQuestions[activeCardIndex].id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                masteredIds[filteredQuestions[activeCardIndex].id]
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>
                {masteredIds[filteredQuestions[activeCardIndex].id] ? 'Mastered!' : 'Mark as Mastered'}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveCardIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1));
                setCardRevealed(false);
              }}
              disabled={activeCardIndex === filteredQuestions.length - 1}
              className="px-4 py-1.5 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40"
            >
              Next Card
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD ACCORDION LIST */
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isExpanded = !!expandedIds[q.id];
            const isMastered = !!masteredIds[q.id];

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-5 transition-all ${
                  isMastered
                    ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/10'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {q.difficulty}
                      </span>
                      <span>·</span>
                      <span className="capitalize">{q.category}</span>
                      {isMastered && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Mastered
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {q.question}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      Context: {q.scenario}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleMastered(q.id, e)}
                      title={isMastered ? 'Marked as mastered' : 'Mark as mastered'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isMastered
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Answer Body */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        High-Scoring Candidate Answer:
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.seniorAnswer}
                      </p>
                    </div>

                    {/* Code Snippet if applicable */}
                    {q.codeExample && (
                      <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs font-mono">
                        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800">
                          <span className="text-slate-400">{q.codeExample.description}</span>
                          <button
                            onClick={(e) => handleCopyCode(q.codeExample!.ts, q.id, e)}
                            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-slate-200 flex items-center gap-1"
                          >
                            {copiedCodeId === q.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedCodeId === q.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="p-3 overflow-x-auto text-emerald-300">
                          {q.codeExample.ts}
                        </pre>
                      </div>
                    )}

                    {/* Pitfalls & Interviewer Intent */}
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs">
                      <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                        Why Interviewers Ask This:
                      </span>
                      <p className="text-amber-800 dark:text-amber-300 mb-2">
                        {q.interviewerIntent}
                      </p>

                      <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                        Common Traps / Red Flags:
                      </span>
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
      )}
    </div>
  );
};
