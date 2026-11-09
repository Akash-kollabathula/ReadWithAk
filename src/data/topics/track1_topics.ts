import { SubtopicItem } from '../../types';

// ==========================================
// MODULE 1: PLAYWRIGHT FUNDAMENTALS (10 Topics)
// ==========================================
export const M01_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm1-1',
    title: 'What is Playwright?',
    description: 'Next-generation end-to-end and API testing framework created by Microsoft for modern web apps.',
    details: [
      'Playwright is an open-source automation library designed specifically for modern Single-Page Applications (SPAs) and Progressive Web Apps (PWAs).',
      'It supports Chromium, WebKit (Safari), and Firefox on Windows, Linux, and macOS with 100% native engine parity.',
      'Unlike legacy tools that rely on third-party plugins, Playwright provides out-of-the-box support for API testing, network mocking, visual regression, mobile emulation, and multi-tab/multi-origin workflows.'
    ],
    codeSnippet: {
      fileName: 'tests/intro.spec.ts',
      caption: 'Basic Playwright test structure',
      description: 'First basic Playwright test',
      ts: `import { test, expect } from '@playwright/test';

test('first Playwright test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});`,
      js: `const { test, expect } = require('@playwright/test');

test('first Playwright test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});`
    },
    bestPractices: [
      'Always use @playwright/test runner rather than standalone playwright library in test suites.',
      'Rely on built-in fixtures (page, request, context) instead of manual instantiation.'
    ],
    interviewTip: 'Interviewers often ask what makes Playwright unique: highlight single-tool unification for both UI and headless API automation.'
  },
  {
    id: 'm1-2',
    title: 'Playwright architecture and how it works',
    description: 'Persistent WebSocket connection to browser process, multiplexing commands with zero HTTP handshake overhead.',
    details: [
      'Playwright launches browser binaries with a remote debugging pipe or WebSocket server enabled.',
      'A single persistent WebSocket connection stays open between the Node.js runner and the browser engine.',
      'Commands and events (DOM mutations, network requests, console errors) are multiplexed over this bi-directional pipe in under 1ms, eliminating the HTTP round-trip latency that plagued Selenium WebDriver.'
    ],
    codeSnippet: {
      fileName: 'tests/cdp-session.spec.ts',
      caption: 'Direct CDP session inspection',
      description: 'Communicating directly with browser engine protocol',
      ts: `import { test } from '@playwright/test';

test('inspect direct browser socket session', async ({ page, context }) => {
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  cdp.on('Network.requestWillBeSent', (e) => {
    console.log('Direct engine event:', e.request.url);
  });
  await page.goto('https://example.com');
});`,
      js: `const { test } = require('@playwright/test');

test('inspect direct browser socket session', async ({ page, context }) => {
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await page.goto('https://example.com');
});`
    },
    bestPractices: [
      'Understand that Playwright runs out-of-process, giving it complete OS-level control without iframe sandbox limitations.'
    ],
    interviewTip: 'Emphasize that Playwright uses one persistent WebSocket pipe vs. Selenium sending discrete HTTP POST requests for every action.'
  },
  {
    id: 'm1-3',
    title: 'Playwright vs Selenium vs Cypress',
    description: 'Out-of-process multi-tab/origin control vs in-iframe limitations and slow HTTP JSON Wire protocol.',
    details: [
      'Selenium: Relies on HTTP REST WebDriver protocol. Separate driver process (chromedriver) per browser. Slow (30-50ms per action) and prone to stale elements.',
      'Cypress: Injected inside an iframe in the same browser window. Limited to single-tab and single-origin; cannot handle multi-tab or native Safari engines natively; slow execution on large suites.',
      'Playwright: Runs outside the browser over WebSocket. Supports real WebKit, multi-tab, multi-origin, multi-user contexts, and native auto-waiting.'
    ],
    bestPractices: [
      'When migrating from Cypress or Selenium, highlight the removal of custom sleep timeouts and the native multi-tab support.'
    ],
    interviewTip: 'Prepare a 3-point comparison: protocol architecture (WebSocket vs HTTP vs in-browser JS), multi-tab/origin capabilities, and auto-waiting resilience.'
  },
  {
    id: 'm1-4',
    title: 'Supported browsers: Chromium, Firefox, WebKit',
    description: 'Evergreen browser engine binaries compiled with native debugging hooks for exact platform parity.',
    details: [
      'Chromium: Engine powering Google Chrome, Microsoft Edge, Brave, and Opera.',
      'Firefox: Mozilla’s Gecko rendering engine with native CDP-equivalent protocol patches.',
      'WebKit: The open-source engine powering Apple Safari, running natively on Windows, Linux, and macOS without needing macOS hardware for CI.'
    ],
    codeSnippet: {
      fileName: 'playwright.config.ts',
      caption: 'Configuring multi-engine projects',
      description: 'Configuring Chromium, Firefox, and WebKit',
      ts: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});`,
      js: `const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});`
    },
    interviewTip: 'Highlight that Playwright tests real WebKit on Linux CI servers, not an emulated Chrome user-agent.'
  },
  {
    id: 'm1-5',
    title: 'Playwright Test Runner',
    description: 'Built-in parallel runner with smart retries, sharding, tracing, and multi-reporter capabilities.',
    details: [
      '@playwright/test is a purpose-built test runner designed for asynchronous browser automation.',
      'Features built-in parallel worker processes, test sharding for distributed CI, fixture dependency injection, and automatic trace/screenshot generation upon failure.'
    ],
    bestPractices: [
      'Do not use Jest or Mocha with Playwright for modern projects; @playwright/test is dramatically faster and has first-class web fixtures.'
    ]
  },
  {
    id: 'm1-6',
    title: 'Installation and project setup',
    description: 'Scaffolding projects via npm init playwright@latest with TypeScript configurations.',
    details: [
      'Run `npm init playwright@latest` in an empty directory.',
      'The wizard prompts for: TypeScript or JavaScript, test folder location, GitHub Actions workflow creation, and downloading browser binaries (~300MB).'
    ],
    codeSnippet: {
      fileName: 'terminal',
      caption: 'Quick scaffolding CLI command',
      description: 'Scaffolding command',
      ts: `# Initialize Playwright project with TypeScript and GitHub Actions
npm init playwright@latest --yes --quiet --lang=ts`,
      js: `# Initialize with JavaScript
npm init playwright@latest --yes --quiet --lang=js`
    }
  },
  {
    id: 'm1-7',
    title: 'Playwright CLI commands',
    description: 'npx playwright test, codegen, show-trace, show-report, and test --headed.',
    details: [
      '`npx playwright test`: Runs all tests headlessly.',
      '`npx playwright test --headed`: Runs tests with visible browser UI.',
      '`npx playwright test --debug`: Opens the Playwright Inspector for step-by-step debugging.',
      '`npx playwright codegen <url>`: Launches the test generator to record user clicks and generate clean code.',
      '`npx playwright show-report`: Opens the interactive HTML test report.',
      '`npx playwright show-trace <trace.zip>`: Opens the full Trace Viewer.'
    ]
  },
  {
    id: 'm1-8',
    title: 'Understanding package.json and dependencies',
    description: 'Managing @playwright/test, @types/node, typescript, and script configurations.',
    details: [
      '`@playwright/test`: The core testing engine and assertions.',
      'Scripts in package.json should define: `"test": "playwright test"`, `"test:ui": "playwright test --ui"`, `"test:debug": "playwright test --debug"`.'
    ]
  },
  {
    id: 'm1-9',
    title: 'Running tests in headed and headless mode',
    description: 'Fast headless execution in CI vs visual headed debugging with --headed and --debug.',
    details: [
      'Headless mode runs without displaying a graphical window. It uses ~40% less memory and runs 2x faster, making it standard for CI.',
      'Headed mode (`--headed`) opens the visible browser window, perfect for local development and visual verification.'
    ]
  },
  {
    id: 'm1-10',
    title: 'Browser, BrowserContext and Page',
    description: 'Heavy OS browser process hosting lightweight incognito contexts that spawn tabs/pages.',
    details: [
      'Browser: The physical OS process running Chromium, Firefox, or WebKit.',
      'BrowserContext: An ultra-fast, isolated incognito session inside the browser (<2ms creation time). Has independent cookies, cache, and localStorage.',
      'Page: A single tab or window inside a BrowserContext.'
    ],
    codeSnippet: {
      fileName: 'tests/hierarchy.spec.ts',
      caption: 'Browser vs Context vs Page instantiation',
      description: 'Manual hierarchy control',
      ts: `import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const context1 = await browser.newContext(); // User A (clean storage)
const context2 = await browser.newContext(); // User B (clean storage)

const page1 = await context1.newPage(); // Tab for User A
const page2 = await context2.newPage(); // Tab for User B`,
      js: `const { chromium } = require('@playwright/test');
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();`
    }
  }
];

// ==========================================
// MODULE 2: TYPESCRIPT & JAVASCRIPT BASICS (12 Topics)
// ==========================================
export const M02_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm2-1',
    title: 'Variables: let, const, var',
    description: 'Block scoping vs function scoping and why var is banned in modern code.',
    details: [
      '`const`: Immutable reference. Use by default for all locators, page handles, and imported modules.',
      '`let`: Mutable block-scoped variable. Use when re-assigning values (e.g. counters, extracted IDs).',
      '`var`: Function-scoped and hoisted. Prone to leakage and race conditions in async loops. Never use var.'
    ]
  },
  {
    id: 'm2-2',
    title: 'Data types and type annotations',
    description: 'Primitives (string, number, boolean) and TypeScript type annotations.',
    details: [
      'TypeScript adds static type safety to Playwright tests: `string`, `number`, `boolean`, `null`, `undefined`, and union types like `"admin" | "customer"`.',
      'Types catch typos in locator names and API payloads before running tests.'
    ],
    codeSnippet: {
      fileName: 'src/types-example.ts',
      caption: 'TypeScript types in test automation',
      description: 'Type annotations',
      ts: `interface OrderPayload {
  orderId: string;
  amount: number;
  isExpedited: boolean;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
}

const order: OrderPayload = {
  orderId: 'ORD-101',
  amount: 49.99,
  isExpedited: true,
  status: 'SHIPPED',
};`,
      js: `const order = {
  orderId: 'ORD-101',
  amount: 49.99,
  isExpedited: true,
  status: 'SHIPPED',
};`
    }
  },
  {
    id: 'm2-3',
    title: 'Functions and arrow functions',
    description: 'Standard functions, arrow functions, implicit returns, and lexical this binding.',
    details: [
      'Arrow functions `() => {}` preserve the lexical `this` context from their enclosing scope.',
      'Used everywhere in Playwright test blocks: `test("name", async ({ page }) => { ... })`.'
    ]
  },
  {
    id: 'm2-4',
    title: 'Arrays and array methods',
    description: 'map(), filter(), find(), some(), every(), and reduce() for processing test data.',
    details: [
      'Extracting table row text: `await page.getByRole("row").allTextContents()` returns `string[]`.',
      'Use `filter()` to verify subsets of rows, `map()` to clean strings, and `some()` to verify presence.'
    ],
    codeSnippet: {
      fileName: 'tests/array-methods.spec.ts',
      caption: 'Processing text lists with array methods',
      description: 'Array processing in tests',
      ts: `const rows = await page.getByRole('row').allInnerTexts();
const prices = rows
  .filter((r) => r.includes('$'))
  .map((r) => parseFloat(r.replace(/[^0-9.]/g, '')));

const total = prices.reduce((acc, curr) => acc + curr, 0);
expect(total).toBeGreaterThan(0);`,
      js: `const rows = await page.getByRole('row').allInnerTexts();
const prices = rows.filter(r => r.includes('$'));`
    }
  },
  {
    id: 'm2-5',
    title: 'Strings and string methods',
    description: 'Template literals, includes(), startsWith(), slice(), and regex matching.',
    details: [
      'Template literals ``${var}`` make dynamic locators easy: `page.getByRole("heading", { name: \`Order #\${id}\` })`.',
      'Use regular expressions in locators for case-insensitivity: `page.getByRole("button", { name: /submit/i })`.'
    ]
  },
  {
    id: 'm2-6',
    title: 'Objects and destructuring',
    description: 'Object property access, spread operator (...), and extracting fixture parameters.',
    details: [
      'Playwright test arguments use destructuring: `test("name", async ({ page, request, context }) => {})`.',
      'The spread operator `...devices["iPhone 14"]` is used to inherit device settings in `playwright.config.ts`.'
    ]
  },
  {
    id: 'm2-7',
    title: 'Loops and conditional statements',
    description: 'for...of loops with async/await vs problematic Array.forEach.',
    details: [
      'CRITICAL: Never use `forEach` with async/await! `forEach` does not await asynchronous callbacks.',
      'Always use `for (const item of items) { await page.click(...) }` for sequential async actions.'
    ]
  },
  {
    id: 'm2-8',
    title: 'Promises and async/await',
    description: 'Promise lifecycle (pending, fulfilled, rejected) and clean async/await syntax.',
    details: [
      'Every Playwright action (`goto`, `click`, `fill`) returns a Promise.',
      'Forgetting `await` starts the action in background without waiting for completion, leading to race condition failures.'
    ]
  },
  {
    id: 'm2-9',
    title: 'Callbacks and error handling',
    description: 'try/catch blocks, finally clauses, and custom error classes.',
    details: [
      'Use `try/catch/finally` when executing actions that might throw or when cleaning up temporary resources.',
      'In Playwright, prefer web-first assertions or soft assertions over empty catch blocks.'
    ]
  },
  {
    id: 'm2-10',
    title: 'Interfaces, types and classes',
    description: 'TypeScript interfaces, union types, and Page Object Model class definitions.',
    details: [
      'Classes form the foundation of the Page Object Model (POM).',
      'TypeScript interfaces define properties for fixtures, user models, and environment configurations.'
    ],
    codeSnippet: {
      fileName: 'pages/login.page.ts',
      caption: 'POM class definition with TypeScript',
      description: 'Page Object Model class',
      ts: `import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
  }

  async login(user: string) {
    await this.usernameInput.fill(user);
  }
}`,
      js: `class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
  }
  async login(user) { await this.usernameInput.fill(user); }
}`
    }
  },
  {
    id: 'm2-11',
    title: 'Modules: import and export',
    description: 'ES modules (import/export), named exports, and default exports.',
    details: [
      'Use named exports `export const test = ...` to allow multiple exports per file.',
      'Playwright natively supports ES module syntax with TypeScript without extra Babel configurations.'
    ]
  },
  {
    id: 'm2-12',
    title: 'Map, Set and optional chaining',
    description: 'Unique values with Set, key-value stores with Map, and ?. optional chaining.',
    details: [
      '`Set`: Eliminates duplicate items extracted from UI lists: `const uniqueIds = new Set(await ids.allInnerTexts())`.',
      'Optional chaining `?.`: Safely accesses nested properties: `const token = response?.body?.auth?.token`.'
    ]
  }
];

// ==========================================
// MODULE 3: LOCATORS & ELEMENT IDENTIFICATION (15 Topics)
// ==========================================
export const M03_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm3-1',
    title: 'getByRole()',
    description: 'Locating elements by ARIA accessibility roles: button, heading, checkbox, dialog, tab, etc.',
    details: [
      'The #1 recommended locator in Playwright. Locates elements by their accessibility role and accessible name.',
      'Ensures your application is accessible to screen readers while making your tests immune to CSS class refactors.'
    ],
    codeSnippet: {
      fileName: 'tests/getbyrole.spec.ts',
      caption: 'Role locator examples',
      description: 'getByRole usage',
      ts: `// Target button with accessible name
await page.getByRole('button', { name: 'Submit Payment' }).click();

// Target level 1 heading
await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome');

// Target checkbox
await page.getByRole('checkbox', { name: 'I agree to terms' }).check();`,
      js: `await page.getByRole('button', { name: 'Submit' }).click();`
    }
  },
  {
    id: 'm3-2',
    title: 'getByText()',
    description: 'Locating elements by text content with exact or substring matching.',
    details: [
      '`page.getByText("Welcome")` matches any element containing that text.',
      'Use `{ exact: true }` when you need strict equality to avoid partial substring collisions.'
    ]
  },
  {
    id: 'm3-3',
    title: 'getByLabel()',
    description: 'Locating form control inputs using associated <label> text.',
    details: [
      'Targets `<input>`, `<textarea>`, or `<select>` by their associated `<label>` tag.',
      'Encourages proper `<label for="id">` HTML accessibility best practices.'
    ]
  },
  {
    id: 'm3-4',
    title: 'getByPlaceholder()',
    description: 'Locating input fields by placeholder text.',
    details: [
      'Useful for search inputs or form fields before a label is present: `page.getByPlaceholder("Search products...")`.'
    ]
  },
  {
    id: 'm3-5',
    title: 'getByAltText()',
    description: 'Locating images and graphics by alt attribute text.',
    details: [
      'Validates that company logos and product thumbnails have accessible alt text: `page.getByAltText("Company Logo")`.'
    ]
  },
  {
    id: 'm3-6',
    title: 'getByTitle()',
    description: 'Locating elements with HTML title attributes (tooltips, icons).',
    details: [
      'Finds elements with `title="close"` or icon buttons with HTML tooltips.'
    ]
  },
  {
    id: 'm3-7',
    title: 'getByTestId()',
    description: 'Resilient escape hatch for custom data-testid attributes.',
    details: [
      'Finds elements with `data-testid="submit-btn"`.',
      'The testId attribute name can be customized in `playwright.config.ts` via `testIdAttribute: "data-qa"`.'
    ]
  },
  {
    id: 'm3-8',
    title: 'locator() with CSS selectors',
    description: 'When and how to use CSS selector syntax safely without fragility.',
    details: [
      'Use semantic CSS selectors like `page.locator("nav > ul > li")`.',
      'Avoid long generated class names (e.g. `.css-1x2y3z`) that change with every build.'
    ]
  },
  {
    id: 'm3-9',
    title: 'XPath selectors',
    description: 'Understanding XPath syntax and why user-facing locators should be preferred.',
    details: [
      'XPath syntax: `page.locator("//button[text()=\'Save\']")`.',
      'Discouraged in modern Playwright tests because absolute XPaths break easily when DOM structure shifts.'
    ]
  },
  {
    id: 'm3-10',
    title: 'Chaining and filtering locators',
    description: 'parent.locator().filter({ hasText }) to pinpoint specific rows in tables/lists.',
    details: [
      'Locators can be chained: `page.getByRole("list").getByRole("listitem")`.',
      'Use `.filter({ hasText: "Target" })` to isolate a specific card or row without complex XPath axes.'
    ],
    codeSnippet: {
      fileName: 'tests/chaining.spec.ts',
      caption: 'Chaining and filtering',
      description: 'Chaining locators',
      ts: `const productRow = page.getByRole('row')
  .filter({ hasText: 'Mechanical Keyboard' });

await productRow.getByRole('button', { name: 'Add to Cart' }).click();`,
      js: `const row = page.getByRole('row').filter({ hasText: 'Keyboard' });
await row.getByRole('button').click();`
    }
  },
  {
    id: 'm3-11',
    title: 'Locator strictness and ambiguity',
    description: 'Playwright strict mode: throwing exceptions when multiple elements match an action.',
    details: [
      'Playwright enforces strict mode: if an action like `locator.click()` resolves to >1 element, it throws a `StrictModeViolation`.',
      'This prevents tests from accidentally clicking the wrong button (e.g. mobile hidden button vs desktop button).'
    ]
  },
  {
    id: 'm3-12',
    title: 'nth(), first() and last()',
    description: 'Explicit index selectors when ordering is intentional.',
    details: [
      '`locator.first()`: selects first match.',
      '`locator.last()`: selects last match.',
      '`locator.nth(2)`: selects 3rd match (0-indexed). Use only when list order is an explicit invariant.'
    ]
  },
  {
    id: 'm3-13',
    title: 'hasText and has filters',
    description: 'Filtering locators by nested child elements or inner text.',
    details: [
      '`locator.filter({ has: page.getByRole("button") })`: filters parent cards that contain a button.',
      '`locator.filter({ hasNotText: "Out of Stock" })`: excludes sold-out items.'
    ]
  },
  {
    id: 'm3-14',
    title: 'Reusable locator methods',
    description: 'Encapsulating locator definitions inside Page Objects for DRY maintenance.',
    details: [
      'Declare locators as readonly properties in Page Objects: `readonly submitBtn = page.getByRole("button", { name: "Submit" })`.'
    ]
  },
  {
    id: 'm3-15',
    title: 'Handling dynamic elements',
    description: 'Strategies for dynamically generated IDs, animated modals, and infinite lists.',
    details: [
      'Never rely on auto-generated IDs like `#btn_482918`.',
      'Use text, ARIA roles, or data-testid attributes that remain constant across deployments.'
    ]
  }
];

// ==========================================
// MODULE 4: ACTIONS & WEB INTERACTIONS (13 Topics)
// ==========================================
export const M04_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm4-1',
    title: 'click() and dblclick()',
    description: 'Single and double clicks with button options (left, right, middle) and modifiers.',
    details: [
      'Auto-waits for element to be attached, visible, stable, enabled, and receive events before clicking.',
      'Supports modifiers: `locator.click({ modifiers: ["Shift"] })` and options like `{ button: "right" }` for context menus.'
    ]
  },
  {
    id: 'm4-2',
    title: 'fill() and clear()',
    description: 'Fast programmatic input value setting with auto-clearing and change events.',
    details: [
      '`locator.fill("text")` automatically clears existing text and dispatches all `input` and `change` events in <5ms.',
      '`locator.clear()` empties the input field cleanly.'
    ]
  },
  {
    id: 'm4-3',
    title: 'press() and keyboard actions',
    description: 'Dispatching keyboard events (Enter, Escape, Tab, Control+A).',
    details: [
      '`locator.press("Enter")`: sends a keystroke directly to the targeted locator.',
      '`page.keyboard.press("Control+A")`: global keyboard shortcuts across the document.'
    ]
  },
  {
    id: 'm4-4',
    title: 'check() and uncheck()',
    description: 'Interacting with native checkboxes and radio elements.',
    details: [
      '`locator.check()` checks the box only if it is not already checked (idempotent).',
      '`locator.uncheck()` unchecks it safely.'
    ]
  },
  {
    id: 'm4-5',
    title: 'selectOption()',
    description: 'Selecting options in HTML <select> by value, label, or index.',
    details: [
      'Supports selection by visible label: `selectOption({ label: "California" })`, by value: `selectOption("CA")`, or multiple items: `selectOption(["red", "blue"])`.'
    ]
  },
  {
    id: 'm4-6',
    title: 'hover()',
    description: 'Moving pointer over elements to trigger hover states, tooltips, and sub-menus.',
    details: [
      'Simulates real mouse movement. Scrolls element into view and dispatches `mouseenter` and `mouseover` events.'
    ]
  },
  {
    id: 'm4-7',
    title: 'dragTo()',
    description: 'Native drag-and-drop actions between source and target locators.',
    details: [
      '`await source.dragTo(target)` calculates exact coordinates and dispatches dragstart, dragover, and drop events.'
    ]
  },
  {
    id: 'm4-8',
    title: 'File upload with setInputFiles()',
    description: 'Uploading single or multiple files without native OS file dialog popups.',
    details: [
      'Interacts directly with `<input type="file">`.',
      'Pass an array of file paths: `locator.setInputFiles(["file1.png", "file2.pdf"])`.'
    ]
  },
  {
    id: 'm4-9',
    title: 'Handling dropdowns and autocomplete',
    description: 'Interacting with custom headless dropdowns, combo boxes, and search autocompletes.',
    details: [
      'For custom div-based dropdowns: 1. Click input, 2. Type search query, 3. `page.getByRole("option", { name: "Option" }).click()`.'
    ]
  },
  {
    id: 'm4-10',
    title: 'Mouse and keyboard operations',
    description: 'Low-level mouse.move, mouse.down, mouse.up, and keyboard.type.',
    details: [
      'Used for drawing on canvas elements, custom sliders, or signature pads: `page.mouse.move(x, y)`, `down()`, `up()`.'
    ]
  },
  {
    id: 'm4-11',
    title: 'Editable fields and contenteditable',
    description: 'Typing into rich text editors, WYSIWYG boxes, and contenteditable divs.',
    details: [
      'For `contenteditable="true"` divs, use `locator.click()` followed by `page.keyboard.type("content")`.'
    ]
  },
  {
    id: 'm4-12',
    title: 'Scrolling and off-screen elements',
    description: 'Playwright automatic scrolling into view and manual scrollIntoViewIfNeeded.',
    details: [
      'Playwright automatically scrolls elements into the viewport before clicking.',
      'Manual scrolling: `locator.scrollIntoViewIfNeeded()`.'
    ]
  },
  {
    id: 'm4-13',
    title: 'Handling disabled and read-only controls',
    description: 'Asserting disabled states and verifying read-only invariants.',
    details: [
      'Playwright refuses to click disabled buttons by default (fails actionability).',
      'Assert disabled state using `await expect(button).toBeDisabled()`.'
    ]
  }
];
