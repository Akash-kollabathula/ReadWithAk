import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

interface LocatorEvaluation {
  status: 'recommended' | 'fragile' | 'strictness-violation' | 'not-found';
  matchedCount: number;
  score: number;
  badge: string;
  rationale: string;
  highlightedElementId?: string;
}

export const LocatorPlayground: React.FC = () => {
  const [selectorInput, setSelectorInput] = useState<string>("page.getByRole('button', { name: 'Complete Order' })");

  const evaluateSelector = (input: string): LocatorEvaluation => {
    const trimmed = input.trim();

    if (trimmed.includes("getByRole('button', { name: 'Complete Order' })") || trimmed.includes('Complete Order')) {
      return {
        status: 'recommended',
        matchedCount: 1,
        score: 100,
        badge: 'Accessibility-First (Gold Standard)',
        rationale: 'Resilient against DOM restructuring. Mirrors how real users and assistive technology locate the primary CTA.',
        highlightedElementId: 'btn-order',
      };
    }

    if (trimmed.includes("getByLabel('Cardholder Name')") || trimmed.includes('Cardholder Name')) {
      return {
        status: 'recommended',
        matchedCount: 1,
        score: 95,
        badge: 'User-Facing Accessible Label',
        rationale: 'Targets the associated <label> element, ensuring high test resilience and enforcing a11y standards.',
        highlightedElementId: 'input-name',
      };
    }

    if (trimmed.includes("getByTestId('billing-email')") || trimmed.includes('getByTestId')) {
      return {
        status: 'recommended',
        matchedCount: 1,
        score: 85,
        badge: 'Explicit Test ID Escape Hatch',
        rationale: 'Decoupled from CSS styles. Good fallback when semantic accessibility roles are not viable.',
        highlightedElementId: 'input-email',
      };
    }

    if (trimmed.startsWith('//') || trimmed.includes('/div[') || trimmed.includes('xpath')) {
      return {
        status: 'fragile',
        matchedCount: 1,
        score: 25,
        badge: 'Fragile Implementation XPath',
        rationale: 'Brittle! A single wrapper <div> or minor redesign will immediately break this test in CI.',
        highlightedElementId: 'btn-order',
      };
    }

    if (trimmed === 'button' || trimmed === "page.locator('button')") {
      return {
        status: 'strictness-violation',
        matchedCount: 2,
        score: 15,
        badge: 'Strictness Mode Violation',
        rationale: 'Playwright throws an error! 2 buttons match ("Complete Order" and "Cancel"). Refine with role or name.',
      };
    }

    if (trimmed.includes('.btn') || trimmed.includes('#submit')) {
      return {
        status: 'fragile',
        matchedCount: 1,
        score: 40,
        badge: 'CSS Class Dependency',
        rationale: 'Coupled to styling details. If Tailwind/CSS classes are refactored, the test silently fails.',
        highlightedElementId: 'btn-order',
      };
    }

    return {
      status: 'not-found',
      matchedCount: 0,
      score: 0,
      badge: 'Zero Elements Matched',
      rationale: 'Playwright locator did not resolve to any element in the simulated DOM tree.',
    };
  };

  const evaluation = evaluateSelector(selectorInput);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Interactive Locator Resilience &amp; Strictness Tester</span>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Test your locators in real time. See how Playwright enforces strictness and why user-facing roles defeat fragile XPaths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Locator Input & Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
              Enter Playwright Locator:
            </label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2">
              <input
                type="text"
                value={selectorInput}
                onChange={(e) => setSelectorInput(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 outline-none"
                placeholder="page.getByRole('button', { name: 'Complete Order' })"
              />
            </div>
          </div>

          {/* Quick Click Samples */}
          <div>
            <span className="text-xs text-slate-400 block mb-1.5">Try these locators:</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setSelectorInput("page.getByRole('button', { name: 'Complete Order' })")}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 font-mono text-[11px]"
              >
                getByRole (Recommended)
              </button>
              <button
                onClick={() => setSelectorInput("page.getByLabel('Cardholder Name')")}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 font-mono text-[11px]"
              >
                getByLabel
              </button>
              <button
                onClick={() => setSelectorInput("page.locator('button')")}
                className="px-2 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded font-mono text-[11px]"
              >
                page.locator('button') (Strictness Error)
              </button>
              <button
                onClick={() => setSelectorInput("/html/body/div[2]/form/div[3]/button[1]")}
                className="px-2 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded font-mono text-[11px]"
              >
                Absolute XPath (Fragile)
              </button>
            </div>
          </div>

          {/* Evaluation Card */}
          <div
            className={`p-4 rounded-lg border text-xs transition-all ${
              evaluation.status === 'recommended'
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : evaluation.status === 'fragile'
                ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                {evaluation.status === 'recommended' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : evaluation.status === 'fragile' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                )}
                <span>{evaluation.badge}</span>
              </div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                Resilience Score: {evaluation.score}/100
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{evaluation.rationale}</p>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Elements Matched: {evaluation.matchedCount}</span>
              <span>Strictness Check: {evaluation.matchedCount === 1 ? 'PASSED (Unique)' : 'FAILED'}</span>
            </div>
          </div>
        </div>

        {/* Right: Simulated Live DOM Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <div className="text-[11px] font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>Simulated Application DOM</span>
            <span>Live Preview</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <label
                htmlFor="ch-name"
                className="text-[11px] font-medium text-slate-700 dark:text-slate-300 block mb-1"
              >
                Cardholder Name
              </label>
              <input
                id="ch-name"
                type="text"
                readOnly
                value="Alex Rivera"
                className={`w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded outline-none transition-all ${
                  evaluation.highlightedElementId === 'input-name'
                    ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Billing Email (data-testid="billing-email")
              </label>
              <input
                type="email"
                readOnly
                value="alex@readwithak.dev"
                data-testid="billing-email"
                className={`w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded outline-none transition-all ${
                  evaluation.highlightedElementId === 'input-email'
                    ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/20'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-indigo-600 rounded transition-all ${
                  evaluation.highlightedElementId === 'btn-order' || evaluation.matchedCount === 2
                    ? 'ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900 shadow-md'
                    : ''
                }`}
              >
                Complete Order
              </button>
              <button
                type="button"
                className={`py-1.5 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded ${
                  evaluation.matchedCount === 2 ? 'ring-2 ring-rose-500 ring-offset-2' : ''
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
