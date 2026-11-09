import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, Server, Monitor, Cpu, RefreshCw } from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [engine, setEngine] = useState<'playwright' | 'selenium'>('playwright');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [log, setLog] = useState<string>('Ready to test packet roundtrip.');

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);
    setLog(engine === 'playwright' 
      ? 'Step 1/2: Multiplexed binary frame dispatched via persistent WebSocket pipe...' 
      : 'Step 1/4: Test script initiating new HTTP POST /session/element handshake...');

    if (engine === 'playwright') {
      setTimeout(() => {
        setActiveStep(1);
        setLog('Step 2/2: Chromium CDP engine received command directly. DOM updated in <1ms!');
        setTimeout(() => {
          setIsRunning(false);
          setActiveStep(2);
        }, 600);
      }, 500);
    } else {
      setTimeout(() => {
        setActiveStep(1);
        setLog('Step 2/4: chromedriver.exe receiving HTTP request over local TCP port 9515...');
        setTimeout(() => {
          setActiveStep(2);
          setLog('Step 3/4: Driver translates JSON payload to browser internal command...');
          setTimeout(() => {
            setActiveStep(3);
            setLog('Step 4/4: Browser executes action. Driver serializes HTTP 200 JSON wire response (~38ms).');
            setIsRunning(false);
          }, 700);
        }, 700);
      }, 700);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Interactive Architecture Lab: Protocol Latency Comparison
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare Playwright's single WebSocket pipeline against Selenium's HTTP REST driver middleman.
          </p>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => { setEngine('playwright'); setActiveStep(-1); setLog('Switched to Playwright.'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              engine === 'playwright'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Playwright (WebSocket / CDP)
          </button>
          <button
            onClick={() => { setEngine('selenium'); setActiveStep(-1); setLog('Switched to Selenium.'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              engine === 'selenium'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Legacy WebDriver (HTTP REST)
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stage */}
      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Node 1: Test Runner */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-slate-400">Node.js Process</span>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Test Script</div>
            <div className="text-xs text-slate-500 mt-1">page.click('button')</div>
          </div>

          {/* Connection Line & Middleman */}
          <div className="flex flex-col items-center justify-center px-2 py-4">
            {engine === 'playwright' ? (
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>Single Persistent WebSocket</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full bg-emerald-500 transition-all duration-300 ${
                      isRunning ? 'w-full animate-pulse' : 'w-full opacity-60'
                    }`}
                  />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">Zero Middleman · Sub-ms Latency</div>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>HTTP POST / REST Call</span>
                </div>
                {/* Standalone Driver Middleman */}
                <div className="my-2 p-2 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 rounded-md text-center">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400">chromedriver.exe</div>
                  <div className="text-[10px] text-slate-400">Separate OS Process (Port 9515)</div>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Serializing JSON Wire protocol</div>
              </div>
            )}
          </div>

          {/* Node 3: Target Browser Engine */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <Monitor className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-slate-400">Browser Engine</span>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {engine === 'playwright' ? 'Chromium / WebKit / Firefox' : 'Browser Instance'}
            </div>
            <div className="text-xs text-slate-500 mt-1">Direct CDP / WebSocket Pipe</div>
          </div>
        </div>

        {/* Live Simulation Log */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            <span>{log}</span>
          </div>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Simulate Command</span>
          </button>
        </div>
      </div>

      {/* Architecture Spec Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">Playwright Architecture</div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct WebSocket pipe: sub-millisecond execution.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Bi-directional: Browser pushes network and console events automatically.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Lightweight BrowserContext isolation in &lt;2ms.</span>
            </li>
          </ul>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">Legacy WebDriver (Selenium)</div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>Independent HTTP round-trip per action (15-50ms latency).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>One-way request-response: cannot listen for live browser events easily.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>Must launch new browser OS process per test for real isolation.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
