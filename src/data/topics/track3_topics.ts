import { SubtopicItem } from '../../types';

// ==========================================
// MODULE 9: TEST DATA & TEST DESIGN (14 Topics)
// ==========================================
export const M09_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm9-1',
    title: 'Data-driven testing',
    description: 'Running parameterized test scenarios across multiple data inputs.',
    details: [
      'Executes the same test logic with different inputs, verifying various business rules and edge cases.'
    ]
  },
  {
    id: 'm9-2',
    title: 'Loop-based test generation',
    description: 'Generating individual test cases dynamically from array iterations.',
    details: [
      'Generate discrete `test()` blocks inside a `for...of` loop so each scenario reports as an independent test.'
    ]
  },
  {
    id: 'm9-3',
    title: 'test.describe() with multiple scenarios',
    description: 'Structuring parameterized test matrices.',
    details: [
      'Group related data scenarios under descriptive suite headings.'
    ]
  },
  {
    id: 'm9-4',
    title: 'JSON test data',
    description: 'Importing and typing static JSON fixtures.',
    details: [
      'Import static JSON fixtures: `import usersData from "../data/users.json"`.'
    ]
  },
  {
    id: 'm9-5',
    title: 'CSV test data',
    description: 'Parsing external CSV spreadsheets to drive test runs.',
    details: [
      'Use csv-parse to read tabular scenario inputs into array objects before running tests.'
    ]
  },
  {
    id: 'm9-6',
    title: 'Excel test data',
    description: 'Extracting scenarios from multi-sheet Excel workbooks.',
    details: [
      'Parse .xlsx workbooks with `xlsx` or `exceljs` for non-technical team members maintaining test matrices.'
    ]
  },
  {
    id: 'm9-7',
    title: 'Environment variables and .env',
    description: 'Managing environment-specific URLs, credentials, and secrets using dotenv.',
    details: [
      'Use `dotenv.config()` to load credentials into `process.env` securely without hardcoding secrets in git.'
    ]
  },
  {
    id: 'm9-8',
    title: 'Test data factories and builders',
    description: 'Using libraries like faker-js to generate dynamic, realistic mock data.',
    details: [
      'Dynamically construct realistic user profiles, addresses, and credit cards with `@faker-js/faker`.'
    ]
  },
  {
    id: 'm9-9',
    title: 'Positive and negative testing',
    description: 'Validating both expected happy paths and intentional failure paths.',
    details: [
      'Verify valid logins grant access; verify invalid passwords display correct validation error alerts.'
    ]
  },
  {
    id: 'm9-10',
    title: 'Boundary-value analysis',
    description: 'Testing minimum, nominal, and maximum input thresholds.',
    details: [
      'For an input accepting 1-100 characters: test length 0 (fail), 1 (pass), 100 (pass), 101 (fail).'
    ]
  },
  {
    id: 'm9-11',
    title: 'Equivalence partitioning',
    description: 'Dividing input data into valid and invalid equivalence classes.',
    details: [
      'Group inputs into partitions to reduce the number of tests while maintaining 100% boundary coverage.'
    ]
  },
  {
    id: 'm9-12',
    title: 'Independent and repeatable tests',
    description: 'Ensuring tests do not rely on previous tests to succeed.',
    details: [
      'Tests must be atomic and order-independent so they can run in any sequence or parallel worker.'
    ]
  },
  {
    id: 'm9-13',
    title: 'Unique data for parallel execution',
    description: 'Using timestamps or UUIDs to avoid database collision in parallel workers.',
    details: [
      'Append `Date.now()` or `crypto.randomUUID()` to emails and usernames to prevent duplicate key errors in parallel.'
    ]
  },
  {
    id: 'm9-14',
    title: 'Test cleanup and database state',
    description: 'Best practices for resetting database state between runs.',
    details: [
      'Use API delete calls or database transactions in fixture teardown to keep environments clean.'
    ]
  }
];

// ==========================================
// MODULE 10: API AUTOMATION & TESTING (19 Topics)
// ==========================================
export const M10_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm10-1',
    title: 'API testing fundamentals',
    description: 'Testing backend HTTP services without browser rendering overhead.',
    details: [
      'API tests execute directly over HTTP sockets without launching browser binaries, running 20x faster.'
    ]
  },
  {
    id: 'm10-2',
    title: 'APIRequestContext',
    description: 'Configuring base URLs, default headers, and credentials for headless API testing.',
    details: [
      'The core Playwright interface for making HTTP requests. Configured via `playwright.request.newContext()`.'
    ]
  },
  {
    id: 'm10-3',
    title: 'request.get() and request.post()',
    description: 'Executing GET queries and POST mutations with JSON payloads.',
    details: [
      '`await request.get("/api/users")` and `await request.post("/api/users", { data: { name: "Alice" } })`.'
    ]
  },
  {
    id: 'm10-4',
    title: 'request.put(), patch() and delete()',
    description: 'Full resource updates, partial modifications, and resource deletions.',
    details: [
      '`request.put()` replaces entire entity; `request.patch()` updates specific fields; `request.delete()` removes entity.'
    ]
  },
  {
    id: 'm10-5',
    title: 'GET, POST, PUT, PATCH and DELETE semantics',
    description: 'Idempotency and HTTP verb standards.',
    details: [
      'GET, PUT, and DELETE are idempotent; POST is non-idempotent. Test appropriate status codes (200, 201, 204).'
    ]
  },
  {
    id: 'm10-6',
    title: 'Headers, query parameters and path parameters',
    description: 'Passing params object, Authorization Bearer tokens, and custom tracking headers.',
    details: [
      '`request.get("/search", { params: { q: "playwright", page: 1 } })`.'
    ]
  },
  {
    id: 'm10-7',
    title: 'Authentication tokens and API keys',
    description: 'OAuth2 tokens, JWTs, and API key header injection.',
    details: [
      'Pass Bearer tokens in headers: `headers: { Authorization: \`Bearer \${jwtToken}\` }`.'
    ]
  },
  {
    id: 'm10-8',
    title: 'Request body and payload validation',
    description: 'Validating outbound JSON payloads and multipart/form-data.',
    details: [
      'Playwright automatically serializes JS objects passed to `data: payload` as `application/json`.'
    ]
  },
  {
    id: 'm10-9',
    title: 'Status code and response assertions',
    description: 'Asserting response.status() === 200/201 and response.ok().',
    details: [
      '`expect(response.status()).toBe(201)` and `expect(response.ok()).toBeTruthy()`.'
    ]
  },
  {
    id: 'm10-10',
    title: 'Response JSON validation',
    description: 'Parsing response.json() and asserting properties and values.',
    details: [
      '`const data = await response.json()`; assert `expect(data.id).toBeDefined()`.'
    ]
  },
  {
    id: 'm10-11',
    title: 'Response headers and content type',
    description: 'Validating content-type, cache-control, and rate-limiting headers.',
    details: [
      '`expect(response.headers()["content-type"]).toContain("application/json")`.'
    ]
  },
  {
    id: 'm10-12',
    title: 'API chaining and dependent requests',
    description: 'Extracting IDs or tokens from one API call to feed into the next call.',
    details: [
      'Chain operations: POST create user -> extract `userId` -> GET `/users/${userId}` -> DELETE `/users/${userId}`.'
    ]
  },
  {
    id: 'm10-13',
    title: 'API setup and cleanup',
    description: 'Seeding database state in beforeAll/beforeEach and cleaning up in afterEach.',
    details: [
      'Pre-seed test records via fast API calls before UI tests start.'
    ]
  },
  {
    id: 'm10-14',
    title: 'APIRequestContext vs page.request',
    description: 'Independent HTTP context vs page-bound context sharing browser cookies.',
    details: [
      '`page.request` automatically shares cookies and storage with the browser page session.'
    ]
  },
  {
    id: 'm10-15',
    title: 'API mocking and route interception',
    description: 'Fulfilling requests with custom responses using page.route().',
    details: [
      'Intercept outbound network requests and return mock responses: `route.fulfill({ status: 200, body: ... })`.'
    ]
  },
  {
    id: 'm10-16',
    title: 'Schema validation',
    description: 'Contract testing with JSON Schema (Ajv) or Zod schemas.',
    details: [
      'Validate response payloads against strict Zod or JSON Schemas to catch breaking contract changes.'
    ]
  },
  {
    id: 'm10-17',
    title: 'API negative testing',
    description: 'Testing 400 Bad Request, 401 Unauthorized, 403 Forbidden, and 404 Not Found.',
    details: [
      'Ensure missing fields trigger 400 Bad Request with informative validation messages.'
    ]
  },
  {
    id: 'm10-18',
    title: 'Response time checks',
    description: 'Asserting response.timing() latency to enforce performance SLAs.',
    details: [
      'Extract latency: `const ms = response.timing().responseEnd - response.timing().requestStart; expect(ms).toBeLessThan(500)`.'
    ]
  },
  {
    id: 'm10-19',
    title: 'UI and API combined testing',
    description: 'Hybrid pattern: seed data via API in 50ms, verify UI, cleanup via API.',
    details: [
      'The fastest way to test E2E: seed data via API, navigate directly to UI page, assert user experience, delete via API.'
    ]
  }
];

// ==========================================
// MODULE 11: NETWORK & ADVANCED UI (16 Topics)
// ==========================================
export const M11_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm11-1',
    title: 'page.route() and route.fulfill()',
    description: 'Intercepting network calls and stubbing custom HTTP responses.',
    details: [
      'Intercept matching URL patterns and return mock JSON payloads: `await page.route("**/api/user", r => r.fulfill({ body }))`.'
    ]
  },
  {
    id: 'm11-2',
    title: 'route.continue() and route.abort()',
    description: 'Forwarding requests with modified headers or aborting to simulate connection drops.',
    details: [
      '`route.continue({ headers })`: forwards request with custom headers. `route.abort()`: simulates network loss.'
    ]
  },
  {
    id: 'm11-3',
    title: 'page.on("request")',
    description: 'Listening to outbound HTTP requests dispatched by the page.',
    details: [
      'Log outbound telemetry or verify analytics beacons are fired with correct payload.'
    ]
  },
  {
    id: 'm11-4',
    title: 'page.on("response")',
    description: 'Monitoring responses received by the browser.',
    details: [
      'Track response status codes and detect 404 or 500 errors occurring in background calls.'
    ]
  },
  {
    id: 'm11-5',
    title: 'page.on("requestfailed")',
    description: 'Detecting network connection drops, CORS errors, and blocked assets.',
    details: [
      'Logs any failed network requests: `request.failure().errorText`.'
    ]
  },
  {
    id: 'm11-6',
    title: 'Mocking API responses',
    description: 'Replacing volatile backend data with stable, deterministic JSON fixtures.',
    details: [
      'Provides 100% test reliability even if backend microservices are temporarily offline.'
    ]
  },
  {
    id: 'm11-7',
    title: 'Network failures and offline testing',
    description: 'Simulating offline mode using context.setOffline(true) or aborting routes.',
    details: [
      'Verify PWA offline banners and graceful degradation when disconnected from the internet.'
    ]
  },
  {
    id: 'm11-8',
    title: 'Waiting for specific API responses',
    description: 'page.waitForResponse() to synchronize UI assertions with backend updates.',
    details: [
      '`const [res] = await Promise.all([page.waitForResponse(url), triggerAction])` prevents timing flakiness.'
    ]
  },
  {
    id: 'm11-9',
    title: 'WebSockets basics',
    description: 'Listening to WebSocket frame exchanges via page.on("websocket").',
    details: [
      'Inspect incoming and outgoing WebSocket frames for real-time chat, trading, and collaboration apps.'
    ]
  },
  {
    id: 'm11-10',
    title: 'Console message handling',
    description: 'Listening to page.on("console") and catching browser warnings/errors.',
    details: [
      'Assert that no unexpected `console.error` logs occur during user workflows.'
    ]
  },
  {
    id: 'm11-11',
    title: 'JavaScript errors and pageerror',
    description: 'Asserting that no unhandled JavaScript exceptions occur during test runs.',
    details: [
      '`page.on("pageerror", err => { throw new Error(\`Unhandled JS error: \${err.message}\`) })`.'
    ]
  },
  {
    id: 'm11-12',
    title: 'Handling shadow DOM',
    description: 'Playwright automatic piercing of open Shadow DOM trees without special syntax.',
    details: [
      'Playwright traverses open Shadow DOM roots automatically. No custom `shadowRoot` scripts required.'
    ]
  },
  {
    id: 'm11-13',
    title: 'Visual regression testing',
    description: 'expect(page).toHaveScreenshot() and pixel diff thresholds.',
    details: [
      'Compares live rendering against gold master screenshots, highlighting visual CSS regressions.'
    ]
  },
  {
    id: 'm11-14',
    title: 'Screenshots and screenshot comparison',
    description: 'Capturing element screenshots, masking dynamic timestamps, and baseline updates.',
    details: [
      'Use `{ mask: [page.getByTestId("timestamp")] }` to ignore dynamic dates in visual tests.'
    ]
  },
  {
    id: 'm11-15',
    title: 'Accessibility testing basics',
    description: 'Integrating @axe-core/playwright for automated WCAG accessibility audits.',
    details: [
      'Run automated WCAG 2.1 AA audits across pages to ensure color contrast and screen reader compliance.'
    ]
  },
  {
    id: 'm11-16',
    title: 'Handling dynamic tables and pagination',
    description: 'Iterating through paginated records and asserting sorting order.',
    details: [
      'Loop over pagination buttons while collecting row contents into an array for sort validation.'
    ]
  }
];

// ==========================================
// MODULE 12: CONFIGURATION & REPORTING (16 Topics)
// ==========================================
export const M12_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm12-1',
    title: 'playwright.config.ts',
    description: 'Central configuration file managing all test runner settings.',
    details: [
      'Defines test directory, timeouts, reporters, browser projects, and global test behavior.'
    ]
  },
  {
    id: 'm12-2',
    title: 'baseURL and projects',
    description: 'Configuring relative URLs and multi-browser execution projects.',
    details: [
      'Set `baseURL: "https://example.com"`, then write `page.goto("/login")` with clean relative paths.'
    ]
  },
  {
    id: 'm12-3',
    title: 'Browser-specific projects',
    description: 'Targeting Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari.',
    details: [
      'Configure projects matrix in `playwright.config.ts` to test across desktop and mobile viewports simultaneously.'
    ]
  },
  {
    id: 'm12-4',
    title: 'Retries and workers',
    description: 'Managing automatic retries on CI and worker process concurrency.',
    details: [
      'Set `retries: process.env.CI ? 2 : 0` and configure worker threads matching CPU cores.'
    ]
  },
  {
    id: 'm12-5',
    title: 'fullyParallel configuration',
    description: 'Running all tests inside all files completely in parallel.',
    details: [
      'When `fullyParallel: true`, tests within the same spec file execute across separate workers concurrently.'
    ]
  },
  {
    id: 'm12-6',
    title: 'Test timeout and expect timeout',
    description: 'Differentiating overall test timeout (30s) from assertion timeout (5s).',
    details: [
      'Test timeout caps total execution time. Expect timeout controls how long web-first assertions poll.'
    ]
  },
  {
    id: 'm12-7',
    title: 'Global timeout',
    description: 'Setting a maximum time limit for the entire test suite run.',
    details: [
      '`globalTimeout: 60 * 60 * 1000` prevents test suites from hanging indefinitely in CI.'
    ]
  },
  {
    id: 'm12-8',
    title: 'Reporter configuration',
    description: 'Configuring multiple reporters (html, list, dot, junit, json) simultaneously.',
    details: [
      'Combine `list` for terminal logging and `html` for interactive post-mortem artifact reports.'
    ]
  },
  {
    id: 'm12-9',
    title: 'HTML, list, line and JSON reporters',
    description: 'Generating interactive self-contained HTML reports for artifacts.',
    details: [
      'The HTML reporter generates a standalone web app with videos, traces, and screenshots embedded.'
    ]
  },
  {
    id: 'm12-10',
    title: 'Screenshots on failure',
    description: 'screenshot: "only-on-failure" for automated failure diagnostics.',
    details: [
      'Automatically captures high-res PNG screenshot only when a test throws an assertion error.'
    ]
  },
  {
    id: 'm12-11',
    title: 'Video recording',
    description: 'video: "retain-on-failure" capturing screen recordings of failing tests.',
    details: [
      'Records video of the test run, deleting it automatically if the test passes to save disk space.'
    ]
  },
  {
    id: 'm12-12',
    title: 'Trace Viewer',
    description: 'trace: "on-first-retry" providing complete DOM snapshots, network, and console.',
    details: [
      'Captures full interactive execution history: timeline, DOM snapshots, network, and console logs.'
    ]
  },
  {
    id: 'm12-13',
    title: 'Retries and flaky-test diagnosis',
    description: 'Understanding when retries hide bugs vs when they provide resilience.',
    details: [
      'Trace Viewer records traces on retry, allowing engineers to compare the failed run with the passing run.'
    ]
  },
  {
    id: 'm12-14',
    title: 'Sharding and parallel execution',
    description: 'Distributing tests across multiple machines via --shard=1/4.',
    details: [
      'Split test suites evenly across multiple CI runner nodes with zero test overlap.'
    ]
  },
  {
    id: 'm12-15',
    title: 'Test annotations and metadata',
    description: 'Attaching custom metadata, JIRA issue links, and bug tickets to test reports.',
    details: [
      '`test.info().annotations.push({ type: "issue", description: "JIRA-1042" })`.'
    ]
  },
  {
    id: 'm12-16',
    title: 'Environment-specific configuration',
    description: 'Switching configs dynamically between DEV, STAGING, and PROD.',
    details: [
      'Load appropriate `.env.dev` or `.env.staging` files based on `process.env.TEST_ENV`.'
    ]
  }
];
