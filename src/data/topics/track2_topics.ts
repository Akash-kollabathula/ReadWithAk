import { SubtopicItem } from '../../types';

// ==========================================
// MODULE 5: ASSERTIONS & WAITING (14 Topics)
// ==========================================
export const M05_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm5-1',
    title: 'expect() and assertion basics',
    description: 'Jest/Playwright test assertion syntax and matchers.',
    details: [
      'Playwright extends the Jest `expect()` library with asynchronous, auto-retrying web matchers.',
      'Always `await` assertions that target locators: `await expect(locator).toBeVisible()`.'
    ]
  },
  {
    id: 'm5-2',
    title: 'toBeVisible() and toBeHidden()',
    description: 'Checking visibility while auto-waiting for animation or async fetch.',
    details: [
      '`toBeVisible()` verifies the element is in the DOM, has a non-empty bounding box, and is not hidden by CSS.',
      '`toBeHidden()` passes if element is either missing from the DOM or has `display: none` / `visibility: hidden`.'
    ]
  },
  {
    id: 'm5-3',
    title: 'toHaveText() and toContainText()',
    description: 'Verifying exact vs partial string matching inside elements.',
    details: [
      '`toHaveText("Exact Title")`: requires exact text match, ignoring extra whitespace.',
      '`toContainText("Partial")`: passes if substring exists anywhere within element or its children.'
    ]
  },
  {
    id: 'm5-4',
    title: 'toHaveValue()',
    description: 'Checking current input field or form control value.',
    details: [
      'Verifies the `.value` property of `<input>`, `<textarea>`, or `<select>` elements.',
      'Example: `await expect(page.getByLabel("Email")).toHaveValue("alex@example.com")`.'
    ]
  },
  {
    id: 'm5-5',
    title: 'toHaveAttribute()',
    description: 'Asserting HTML attributes like disabled, href, src, or custom data-attrs.',
    details: [
      '`await expect(link).toHaveAttribute("href", "/dashboard")`.',
      'Supports regex: `await expect(img).toHaveAttribute("src", /banner-.*\\.png/)`.'
    ]
  },
  {
    id: 'm5-6',
    title: 'toHaveURL() and toHaveTitle()',
    description: 'Verifying browser navigation, redirects, and page titles.',
    details: [
      'Auto-retries until the browser completes redirection and navigation.',
      'Example: `await expect(page).toHaveURL(/\\/dashboard/)`.'
    ]
  },
  {
    id: 'm5-7',
    title: 'toHaveCount()',
    description: 'Asserting exact number of matching elements in a locator query.',
    details: [
      '`await expect(page.getByRole("listitem")).toHaveCount(5)` auto-waits until exactly 5 items render.'
    ]
  },
  {
    id: 'm5-8',
    title: 'Soft assertions',
    description: 'expect.soft() allowing tests to continue after non-critical verification failures.',
    details: [
      '`await expect.soft(badge).toHaveText("VIP")`: logs a failure if incorrect, but executes remaining steps.',
      'Use for checking independent UI layout elements; never use on prerequisite steps.'
    ]
  },
  {
    id: 'm5-9',
    title: 'Web-first assertions and auto-retry',
    description: 'Why await expect(locator) retries until timeout while sync expect() does not.',
    details: [
      'Web-first assertions repeatedly poll the element every 100ms for up to 5,000ms.',
      'Eliminates race conditions where elements take 300ms to fetch data and render.'
    ]
  },
  {
    id: 'm5-10',
    title: 'expect.poll()',
    description: 'Polling custom asynchronous functions or backend states repeatedly until true.',
    details: [
      'Polls an arbitrary async function: `await expect.poll(async () => fetchStatus()).toBe("READY")`.'
    ]
  },
  {
    id: 'm5-11',
    title: 'expect.toPass()',
    description: 'Retrying an entire code block until all assertions pass within a timeout.',
    details: [
      'Retries a multi-step block until assertions succeed: `await expect(async () => { await page.reload(); await expect(item).toBeVisible(); }).toPass()`.'
    ]
  },
  {
    id: 'm5-12',
    title: 'Timeouts and assertion timeout',
    description: 'Configuring action timeouts, navigation timeouts, and assertion timeouts.',
    details: [
      'Default test timeout: 30,000ms. Default assertion timeout: 5,000ms. Default navigation timeout: 30,000ms.'
    ]
  },
  {
    id: 'm5-13',
    title: 'Auto-waiting vs explicit waiting',
    description: 'When Playwright waits automatically and when explicit event listeners are needed.',
    details: [
      'Playwright auto-waits for actionability before actions and condition satisfaction during assertions.',
      'Explicit waiting is needed only for events: `page.waitForEvent("popup")` or `page.waitForResponse(...)`.'
    ]
  },
  {
    id: 'm5-14',
    title: 'Why waitForTimeout() should be avoided',
    description: 'The hidden CI cost and flakiness caused by hardcoded sleep timeouts.',
    details: [
      '`page.waitForTimeout(5000)` pauses execution blindly. If the element loads in 100ms, you waste 4.9s.',
      'In CI with 500 tests, hardcoded sleeps add hours of wasted runtime. Always use web-first assertions.'
    ]
  }
];

// ==========================================
// MODULE 6: BROWSER & PAGE HANDLING (14 Topics)
// ==========================================
export const M06_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm6-1',
    title: 'Launching browsers',
    description: 'Browser types (chromium, firefox, webkit), launch options, slowMo, and channel arguments.',
    details: [
      '`chromium.launch({ headless: false, slowMo: 100 })` slows execution down by 100ms for visual observation.',
      '`channel: "chrome"` uses locally installed Google Chrome instead of bundled Chromium.'
    ]
  },
  {
    id: 'm6-2',
    title: 'Creating and closing browser contexts',
    description: 'Context lifecycle, independent cookies, cache, and manual close.',
    details: [
      '`const context = await browser.newContext()` creates a clean incognito session.',
      '`await context.close()` cleans up cookies and cache immediately.'
    ]
  },
  {
    id: 'm6-3',
    title: 'Multiple tabs and pages',
    description: 'Managing multiple page instances within the same BrowserContext.',
    details: [
      'Calling `context.newPage()` multiple times creates multiple tabs that share the same cookies and login session.'
    ]
  },
  {
    id: 'm6-4',
    title: 'Handling popups and new windows',
    description: 'Waiting for popup events with Promise.all and interacting with child windows.',
    details: [
      'Use `Promise.all([page.waitForEvent("popup"), click])` to capture the new window reference safely.'
    ]
  },
  {
    id: 'm6-5',
    title: 'BrowserContext isolation',
    description: 'How incognito contexts guarantee complete test independence.',
    details: [
      'No state leaks between tests. Context A cannot read cookies or localStorage from Context B.'
    ]
  },
  {
    id: 'm6-6',
    title: 'Multiple users in separate contexts',
    description: 'Simulating concurrent users (Buyer and Seller) in the same test.',
    details: [
      'Test chat apps, collaborative documents, or buyer/seller marketplace transactions in one test.'
    ]
  },
  {
    id: 'm6-7',
    title: 'Frames and iframes',
    description: 'Understanding nested iframes and cross-domain security boundaries.',
    details: [
      'Iframes represent embedded HTML documents. Playwright pierces them safely without driver switching.'
    ]
  },
  {
    id: 'm6-8',
    title: 'frameLocator()',
    description: 'Piercing through iframes seamlessly with chainable frame locators.',
    details: [
      '`page.frameLocator("iframe#checkout").getByRole("button", { name: "Pay" })`.'
    ]
  },
  {
    id: 'm6-9',
    title: 'Dialogs: alert, confirm, prompt',
    description: 'Listening to page.on("dialog") and accepting/dismissing native dialogs.',
    details: [
      'Playwright auto-dismisses dialogs by default so tests don’t freeze. Register `page.on("dialog")` to accept.'
    ]
  },
  {
    id: 'm6-10',
    title: 'Authentication with storageState',
    description: 'Saving and reusing cookies and localStorage to bypass repeated logins.',
    details: [
      'Log in once, save state: `await context.storageState({ path: "auth.json" })`, and reuse across all tests.'
    ]
  },
  {
    id: 'm6-11',
    title: 'Cookies and localStorage',
    description: 'context.cookies(), context.addCookies(), and page.evaluate for storage.',
    details: [
      'Directly seed or inspect cookies: `await context.addCookies([{ name: "session", value: "abc", domain: "..." }])`.'
    ]
  },
  {
    id: 'm6-12',
    title: 'SessionStorage handling',
    description: 'Setting and asserting window.sessionStorage values.',
    details: [
      '`await page.evaluate(() => sessionStorage.setItem("pref", "dark"))`.'
    ]
  },
  {
    id: 'm6-13',
    title: 'Browser permissions',
    description: 'Granting permissions for geolocation, camera, microphone, and clipboard.',
    details: [
      '`await context.grantPermissions(["geolocation", "notifications"], { origin: "https://example.com" })`.'
    ]
  },
  {
    id: 'm6-14',
    title: 'Viewport, device emulation and geolocation',
    description: 'Emulating iPhones, iPads, dark mode, high-DPI screens, and GPS coordinates.',
    details: [
      '`devices["Pixel 7"]` sets viewport, deviceScaleFactor, isMobile: true, and touch screen emulation.'
    ]
  }
];

// ==========================================
// MODULE 7: FORMS & FILE HANDLING (12 Topics)
// ==========================================
export const M07_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm7-1',
    title: 'Radio buttons and checkboxes',
    description: 'setChecked, isChecked, check, and uncheck methods.',
    details: [
      '`locator.setChecked(true)` checks the radio button if unchecked; `expect(locator).toBeChecked()`.'
    ]
  },
  {
    id: 'm7-2',
    title: 'Single-select and multi-select dropdowns',
    description: 'Selecting multiple values simultaneously from multi-select elements.',
    details: [
      '`selectOption(["val1", "val2"])` on a `<select multiple>` element selects all specified options.'
    ]
  },
  {
    id: 'm7-3',
    title: 'Date pickers',
    description: 'Interacting with native HTML5 date inputs and custom JavaScript calendar widgets.',
    details: [
      'For `<input type="date">`, use `fill("2026-11-08")` directly, bypassing fragile calendar popups.'
    ]
  },
  {
    id: 'm7-4',
    title: 'Form validation',
    description: 'Asserting HTML5 validity (checkValidity, validationMessage) and error UI states.',
    details: [
      'Assert invalid email inputs trigger HTML5 validation: `await expect(input).toHaveJSProperty("validity.valid", false)`.'
    ]
  },
  {
    id: 'm7-5',
    title: 'File upload: single and multiple files',
    description: 'setInputFiles with buffer uploads and directory uploads.',
    details: [
      'Pass file paths or upload buffers directly in memory: `setInputFiles({ name: "test.txt", mimeType: "text/plain", buffer: Buffer.from("data") })`.'
    ]
  },
  {
    id: 'm7-6',
    title: 'File download handling',
    description: 'Capturing page.waitForEvent("download") and saving files locally.',
    details: [
      'Downloads are saved to a temporary location. Call `await download.saveAs("report.pdf")` to persist.'
    ]
  },
  {
    id: 'm7-7',
    title: 'Download path and suggested filename',
    description: 'download.suggestedFilename() and download.saveAs(filepath).',
    details: [
      '`download.suggestedFilename()` returns the filename suggested by the `Content-Disposition` header.'
    ]
  },
  {
    id: 'm7-8',
    title: 'Working with CSV and JSON',
    description: 'Parsing CSV data with csv-parse and JSON payloads with JSON.parse.',
    details: [
      'Verify that exported CSV files match the table data rendered in the UI.'
    ]
  },
  {
    id: 'm7-9',
    title: 'Reading Excel files',
    description: 'Extracting test data matrices from .xlsx spreadsheets using xlsx or exceljs.',
    details: [
      'Use `xlsx.readFile("data.xlsx")` to feed spreadsheet rows into data-driven tests.'
    ]
  },
  {
    id: 'm7-10',
    title: 'Writing test data to files',
    description: 'Persisting execution outputs, IDs, and logs to JSON/CSV files on disk.',
    details: [
      'Write generated order numbers or transaction IDs to disk for downstream verification steps.'
    ]
  },
  {
    id: 'm7-11',
    title: 'Handling large file uploads',
    description: 'Streaming file buffers and managing timeout extensions for large media.',
    details: [
      'Extend action timeout when testing large 100MB+ file uploads: `setInputFiles(largeFile, { timeout: 60000 })`.'
    ]
  },
  {
    id: 'm7-12',
    title: 'Validating uploaded and downloaded files',
    description: 'Asserting downloaded file size, mime-type, and text content integrity.',
    details: [
      'Verify that `fs.statSync(filePath).size > 0` and content matches expected business invoices.'
    ]
  }
];

// ==========================================
// MODULE 8: HOOKS, FIXTURES & TEST ORG (15 Topics)
// ==========================================
export const M08_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm8-1',
    title: 'test() and test.describe()',
    description: 'Structuring test files, suites, and nested describe blocks.',
    details: [
      '`test.describe("Group", () => { ... })` creates logical test suites with isolated hooks.'
    ]
  },
  {
    id: 'm8-2',
    title: 'beforeAll, beforeEach, afterEach, afterAll',
    description: 'Execution lifecycle hooks and their execution order.',
    details: [
      '`beforeAll` runs once per worker before any test in file. `beforeEach` runs before each individual test.'
    ]
  },
  {
    id: 'm8-3',
    title: 'Built-in fixtures: page, browser, context, request',
    description: 'Default injected test parameters provided by @playwright/test.',
    details: [
      'Playwright injects these automatically into test arguments based on destructuring.'
    ]
  },
  {
    id: 'm8-4',
    title: 'Custom fixtures',
    description: 'Writing modular, reusable fixtures that package test setup and teardown.',
    details: [
      'Encapsulates setup before `await use()` and automatic teardown after `await use()`.'
    ]
  },
  {
    id: 'm8-5',
    title: 'Fixture scope: test vs worker',
    description: 'Per-test fixtures vs shared worker-scoped database connection fixtures.',
    details: [
      'Test-scoped fixtures run for every test; worker-scoped fixtures run once per worker process.'
    ]
  },
  {
    id: 'm8-6',
    title: 'Fixture dependencies and composition',
    description: 'Composing fixtures that depend on other fixtures cleanly.',
    details: [
      'A `loggedInPage` fixture can depend on `{ page, request }`, keeping dependencies explicit.'
    ]
  },
  {
    id: 'm8-7',
    title: 'test.use()',
    description: 'Overriding fixture options, viewport, baseURL, and storageState per suite.',
    details: [
      '`test.use({ viewport: { width: 375, height: 667 } })` overrides settings for a specific describe block.'
    ]
  },
  {
    id: 'm8-8',
    title: 'test.extend()',
    description: 'Creating typed custom test runners with injected domain fixtures.',
    details: [
      '`export const test = baseTest.extend<MyFixtures>({ ... })`.'
    ]
  },
  {
    id: 'm8-9',
    title: 'Page Object Model (POM)',
    description: 'Designing clean, maintainable Page Object classes with encapsulated locators.',
    details: [
      'Encapsulates UI interactions and selectors into dedicated classes; never put assertions in POM.'
    ]
  },
  {
    id: 'm8-10',
    title: 'Reusable components and page classes',
    description: 'Component Object Model for shared navbars, modals, and tables.',
    details: [
      'Model reusable sub-components (Header, Sidebar, SearchModal) as separate classes.'
    ]
  },
  {
    id: 'm8-11',
    title: 'Base fixtures and dependency injection',
    description: 'Injecting POM instances directly into test arguments.',
    details: [
      'Test signatures become clean: `test("login", async ({ loginPage, dashboardPage }) => { ... })`.'
    ]
  },
  {
    id: 'm8-12',
    title: 'Test setup and teardown',
    description: 'Ensuring reliable cleanup using automatic fixture teardown after await use().',
    details: [
      'Cleanup after `await use()` executes even if the test fails or throws an exception.'
    ]
  },
  {
    id: 'm8-13',
    title: 'Global setup and teardown',
    description: 'Executing code once before any worker starts (e.g. database seeding, global auth).',
    details: [
      'Configured in `playwright.config.ts` via `globalSetup: "./global-setup.ts"`.'
    ]
  },
  {
    id: 'm8-14',
    title: 'Test annotations: skip, only, fixme, slow',
    description: 'Managing test execution flow and triaging known bugs.',
    details: [
      '`test.skip()` skips the test. `test.fixme()` marks a known issue. `test.slow()` triples the timeout.'
    ]
  },
  {
    id: 'm8-15',
    title: 'Tags and test filtering',
    description: 'Tagging tests with @smoke, @regression, @api and filtering via --grep.',
    details: [
      '`test("login @smoke", async () => {})`; run using `npx playwright test --grep "@smoke"`.'
    ]
  }
];
