import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, Play, RotateCcw } from 'lucide-react';

interface ActionCheck {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  failureReason?: string;
}

export const ActionabilitySimulator: React.FC = () => {
  const [scenario, setScenario] = useState<'normal' | 'animating' | 'obscured' | 'disabled' | 'detached'>('normal');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentCheckIndex, setCurrentCheckIndex] = useState<number>(-1);
  const [evaluationResult, setEvaluationResult] = useState<'idle' | 'success' | 'timed-out'>('idle');

  const getChecks = (): ActionCheck[] => {
    return [
      {
        id: 'attached',
        name: '1. Attached to DOM',
        description: 'Element node is connected to document.body and not removed by re-render.',
        passed: scenario !== 'detached',
        failureReason: 'Target element is not found in the DOM (Node is detached).'
      },
      {
        id: 'visible',
        name: '2. Visible',
        description: 'Computed style is not display:none or visibility:hidden, and bounding box > 0.',
        passed: scenario !== 'detached',
        failureReason: 'Element has 0x0 bounding box or is hidden.'
      },
      {
        id: 'stable',
        name: '3. Stable (Not Animating)',
        description: 'Element position and bounding box remain unchanged across two consecutive animation frames.',
        passed: scenario !== 'animating',
        failureReason: 'Element is currently undergoing CSS transition / transform.'
      },
      {
        id: 'receivesEvents',
        name: '4. Receives Events (Hit Target)',
        description: 'Hit-testing at center coordinates resolves to the element, not obscured by modal/banner.',
        passed: scenario !== 'obscured',
        failureReason: 'Element is covered by <div class="modal-backdrop">; click would hit overlay.'
      },
      {
        id: 'enabled',
        name: '5. Enabled',
        description: 'Element does not possess the HTML disabled attribute.',
        passed: scenario !== 'disabled',
        failureReason: 'Button has disabled="" attribute; cannot accept pointer clicks.'
      }
    ];
  };

  const runEvaluation = () => {
    setIsEvaluating(true);
    setEvaluationResult('idle');
    setCurrentCheckIndex(0);

    const checks = getChecks();
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < checks.length) {
        if (!checks[step - 1].passed) {
          clearInterval(interval);
          setIsEvaluating(false);
          setEvaluationResult('timed-out');
          return;
        }
        setCurrentCheckIndex(step);
      } else {
        clearInterval(interval);
        if (!checks[checks.length - 1].passed) {
          setIsEvaluating(false);
          setEvaluationResult('timed-out');
        } else {
          setIsEvaluating(false);
          setEvaluationResult('success');
        }
      }
    }, 450);
  };

  const checks = getChecks();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Actionability Engine &amp; Auto-Waiting Simulator
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            See exactly how Playwright guarantees reliability by testing 5 actionability invariants before clicking.
          </p>
        </div>

        <button
          onClick={runEvaluation}
          disabled={isEvaluating}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          {isEvaluating ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>Run locator.click()</span>
        </button>
      </div>

      {/* Scenario Selector */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
          Select Simulation Edge Case:
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'normal', label: 'All Nominal (Normal Click)' },
            { id: 'animating', label: 'CSS Slide-In Animation Active' },
            { id: 'obscured', label: 'Obscured by Modal Backdrop' },
            { id: 'disabled', label: 'Button is Disabled' },
            { id: 'detached', label: 'Element Detached from DOM' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setScenario(item.id as any);
                setEvaluationResult('idle');
                setCurrentCheckIndex(-1);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                scenario === item.id
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Check List */}
      <div className="space-y-3 mb-6">
        {checks.map((check, index) => {
          const isCurrent = currentCheckIndex === index && isEvaluating;
          const hasEvaluated = currentCheckIndex >= index && !isEvaluating;
          const isPassed = check.passed;

          return (
            <div
              key={check.id}
              className={`p-3.5 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-600'
                  : hasEvaluated
                  ? isPassed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCurrent ? (
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    ) : hasEvaluated ? (
                      isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 block" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{check.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{check.description}</div>
                    {hasEvaluated && !isPassed && (
                      <div className="mt-2 text-xs font-mono text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 p-2 rounded border border-rose-200 dark:border-rose-900">
                        {check.failureReason}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-[11px] font-mono">
                  {isCurrent && <span className="text-indigo-600 dark:text-indigo-400">Evaluating...</span>}
                  {hasEvaluated && isPassed && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">PASS</span>}
                  {hasEvaluated && !isPassed && <span className="text-rose-600 dark:text-rose-400 font-semibold">BLOCKED</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome Banner */}
      {evaluationResult !== 'idle' && (
        <div
          className={`p-4 rounded-lg border text-xs ${
            evaluationResult === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}
        >
          <div className="font-bold text-sm mb-1">
            {evaluationResult === 'success' ? 'Pointer Action Dispatched Successfully' : 'Auto-Wait Retrying (Action Timeout Protection)'}
          </div>
          <p>
            {evaluationResult === 'success'
              ? 'All 5 actionability invariants satisfied. Playwright dispatched native pointerdown, pointerup, and click events without flaky race conditions!'
              : 'Playwright paused execution and automatically polled for the element to satisfy actionability. In a real test, if the condition does not clear within 30,000ms, Playwright throws a detailed diagnostic snapshot rather than silently misclicking.'}
          </p>
        </div>
      )}
    </div>
  );
};
