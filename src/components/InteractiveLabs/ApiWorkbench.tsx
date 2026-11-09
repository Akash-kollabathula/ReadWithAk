import React, { useState } from 'react';
import { Send, Copy, Check, Terminal, Code2, Globe, Shield, Gauge } from 'lucide-react';

export const ApiWorkbench: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'MOCK'>('GET');
  const [endpoint, setEndpoint] = useState<string>('https://jsonplaceholder.typicode.com/posts/1');
  const [token, setToken] = useState<string>('readwithak_jwt_bearer_token_xyz');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify({ title: 'Mastering Playwright API Automation', body: 'Step by step guide with ReadWithAK', userId: 1 }, null, 2)
  );
  const [mockStatusCode, setMockStatusCode] = useState<number>(200);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'response' | 'code'>('response');
  const [copied, setCopied] = useState<boolean>(false);

  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    timingMs: number;
    headers: Record<string, string>;
    body: any;
  } | null>({
    status: 200,
    statusText: 'OK',
    timingMs: 84,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'max-age=43200',
      'x-powered-by': 'Playwright APIRequestContext'
    },
    body: {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam'
    }
  });

  const handleSendRequest = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    if (method === 'MOCK') {
      setTimeout(() => {
        const duration = Math.round(performance.now() - startTime + 12);
        setIsLoading(false);
        setResponse({
          status: mockStatusCode,
          statusText: mockStatusCode === 200 ? 'OK (Mocked via page.route)' : mockStatusCode === 500 ? 'Internal Server Error (Simulated)' : 'Payment Required (Mocked)',
          timingMs: duration,
          headers: {
            'content-type': 'application/json',
            'x-mocked-by': 'Playwright route.fulfill()'
          },
          body: mockStatusCode === 200
            ? { success: true, message: 'VIP tier profile mocked data loaded successfully' }
            : { error: 'Payment gateway timeout', code: 'GATEWAY_ERR_500' }
        });
      }, 300);
      return;
    }

    try {
      let res;
      if (method === 'GET') {
        res = await fetch(endpoint);
      } else if (method === 'POST') {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        });
      } else if (method === 'PUT') {
        res = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        });
      } else {
        res = await fetch(endpoint, { method: 'DELETE' });
      }

      const data = await res.json().catch(() => ({ status: 'No JSON body returned' }));
      const duration = Math.round(performance.now() - startTime);

      setResponse({
        status: res.status,
        statusText: res.statusText || 'OK',
        timingMs: duration,
        headers: {
          'content-type': res.headers.get('content-type') || 'application/json',
          'date': new Date().toUTCString(),
          'x-engine': 'playwright-request'
        },
        body: data,
      });
    } catch (err: any) {
      setResponse({
        status: 500,
        statusText: 'Network Exception',
        timingMs: Math.round(performance.now() - startTime),
        headers: {},
        body: { error: err.message },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaywrightCodeSnippet = () => {
    if (method === 'MOCK') {
      return `import { test, expect } from '@playwright/test';

test('mock API network route with status ${mockStatusCode}', async ({ page }) => {
  // 1. Intercept matching network call before page requests it
  await page.route('${endpoint}', async (route) => {
    await route.fulfill({
      status: ${mockStatusCode},
      contentType: 'application/json',
      body: JSON.stringify(${JSON.stringify(response?.body || {}, null, 2)}),
    });
  });

  // 2. Navigate and verify UI reaction
  await page.goto('https://example.com/checkout');
  ${mockStatusCode >= 400 
    ? "await expect(page.getByRole('alert')).toBeVisible();" 
    : "await expect(page.getByText('VIP tier')).toBeVisible();"}
});`;
    }

    const payloadStr = method === 'POST' || method === 'PUT' ? `,\n    data: ${requestBody},\n    headers: {\n      'Authorization': 'Bearer ${token}',\n      'Content-Type': 'application/json'\n    }` : `,\n    headers: {\n      'Authorization': 'Bearer ${token}'\n    }`;

    return `import { test, expect } from '@playwright/test';

test('API Automation: ${method} ${endpoint}', async ({ request }) => {
  const response = await request.${method.toLowerCase()}('${endpoint}'${payloadStr});

  // 1. Verify HTTP Status code & ok status
  expect(response.status()).toBe(${response?.status || 200});
  expect(response.ok()).toBeTruthy();

  // 2. Validate latency SLA
  const timing = response.timing();
  expect(timing.responseEnd - timing.requestStart).toBeLessThan(800);

  // 3. Assert response payload contract
  const body = await response.json();
  expect(body).toBeDefined();
});`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getPlaywrightCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive API Request &amp; Mocking Workbench</span>
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Execute real HTTP calls with Playwright's APIRequestContext or test network route mocking.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveView('response')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeView === 'response'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Response &amp; Headers</span>
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeView === 'code'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Generated Playwright Test</span>
          </button>
        </div>
      </div>

      {/* Request Configurator Bar */}
      <div className="flex flex-col lg:flex-row items-stretch gap-2 mb-4">
        {/* Method Picker */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg shrink-0">
          {(['GET', 'POST', 'PUT', 'DELETE', 'MOCK'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMethod(m);
                if (m === 'MOCK') {
                  setEndpoint('**/api/v1/profile');
                } else if (endpoint === '**/api/v1/profile') {
                  setEndpoint('https://jsonplaceholder.typicode.com/posts/1');
                }
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                method === m
                  ? m === 'GET'
                    ? 'bg-emerald-600 text-white'
                    : m === 'POST'
                    ? 'bg-indigo-600 text-white'
                    : m === 'PUT'
                    ? 'bg-amber-600 text-white'
                    : m === 'DELETE'
                    ? 'bg-rose-600 text-white'
                    : 'bg-purple-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* URL Input */}
        <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2">
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200 outline-none"
            placeholder="https://api.example.com/v1/endpoint"
          />
        </div>

        {/* Send Action */}
        <button
          onClick={handleSendRequest}
          disabled={isLoading}
          className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <Send className={`w-3.5 h-3.5 ${isLoading ? 'animate-pulse' : ''}`} />
          <span>{isLoading ? 'Executing...' : method === 'MOCK' ? 'Simulate Mock Route' : 'Send Request'}</span>
        </button>
      </div>

      {/* Preset Quick Selectors */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        <span className="text-slate-400">Quick Presets:</span>
        <button
          onClick={() => {
            setMethod('GET');
            setEndpoint('https://jsonplaceholder.typicode.com/posts/1');
          }}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          GET Single Post
        </button>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <button
          onClick={() => {
            setMethod('POST');
            setEndpoint('https://jsonplaceholder.typicode.com/posts');
            setRequestBody(JSON.stringify({ title: 'New Article', body: 'Test content', userId: 1 }, null, 2));
          }}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          POST Create Resource
        </button>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <button
          onClick={() => {
            setMethod('MOCK');
            setEndpoint('**/api/checkout/pay');
            setMockStatusCode(500);
          }}
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          Mock 500 Server Error
        </button>
      </div>

      {/* Conditional Panels: Body / Auth Header / Mock Status */}
      {method === 'MOCK' ? (
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg mb-4 text-xs">
          <label className="font-semibold text-purple-900 dark:text-purple-200 block mb-1.5">
            Simulate Response Status Code (route.fulfill):
          </label>
          <div className="flex gap-2">
            {[200, 401, 404, 500, 503].map((code) => (
              <button
                key={code}
                onClick={() => setMockStatusCode(code)}
                className={`px-2.5 py-1 rounded font-mono font-bold transition-all ${
                  mockStatusCode === code
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : (method === 'POST' || method === 'PUT') && (
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
            Request JSON Payload:
          </label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={4}
            className="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 outline-none"
          />
        </div>
      )}

      {/* Content View: Response Inspector OR Code Generator */}
      {activeView === 'response' ? (
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  (response?.status || 200) < 300
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {response?.status} {response?.statusText}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-200">{response?.timingMs}ms</span>
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">Playwright APIRequestContext</span>
          </div>

          {/* Response JSON Body */}
          <div className="max-h-64 overflow-y-auto">
            <pre className="text-emerald-300 leading-relaxed">
              {JSON.stringify(response?.body, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs relative">
          <button
            onClick={handleCopyCode}
            className="absolute top-3 right-3 px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          <pre className="text-indigo-200 overflow-x-auto leading-relaxed pt-6">
            {getPlaywrightCodeSnippet()}
          </pre>
        </div>
      )}
    </div>
  );
};
