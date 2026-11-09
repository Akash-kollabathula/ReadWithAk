import { LessonModule } from '../types';

export const MODULES_DATA: LessonModule[] = [
  // MODULE 1
  {
    id: 'm01-playwright-fundamentals',
    number: '01',
    track: 'track-1-foundations',
    trackLabel: 'Track 1: Fundamentals & Language',
    title: 'Playwright Fundamentals',
    subtitle: 'Architecture, supported browser engines, CLI tooling, and core hierarchy',
    summary: 'Master the core mechanics of Playwright: single-connection WebSocket CDP communication, multi-browser engine support (Chromium, Firefox, WebKit), installation workflows, CLI commands, and the Browser > BrowserContext > Page hierarchy.',
    readTimeMinutes: 10,
    tags: ['#fundamentals', '#architecture', '#cdp', '#cli', '#contexts'],
    subtopics: [
      { id: 'm1-1', title: 'What is Playwright?', description: 'Next-generation end-to-end and API testing framework created by Microsoft for modern web apps.' },
      { id: 'm1-2', title: 'Playwright architecture and how it works', description: 'Persistent WebSocket connection to browser process, multiplexing commands with zero HTTP handshake overhead.' },
      { id: 'm1-3', title: 'Playwright vs Selenium vs Cypress', description: 'Out-of-process multi-tab/origin control vs in-iframe limitations and slow HTTP JSON Wire protocol.' },
      { id: 'm1-4', title: 'Supported browsers: Chromium, Firefox, WebKit', description: 'Evergreen browser engine binaries compiled with native debugging hooks for exact platform parity.' },
      { id: 'm1-5', title: 'Playwright Test Runner', description: 'Built-in parallel runner with smart retries, sharding, tracing, and multi-reporter capabilities.' },
      { id: 'm1-6', title: 'Installation and project setup', description: 'Scaffolding projects via npm init playwright@latest with TypeScript configurations.' },
      { id: 'm1-7', title: 'Playwright CLI commands', description: 'npx playwright test, codegen, show-trace, show-report, and test --headed.' },
      { id: 'm1-8', title: 'Understanding package.json and dependencies', description: 'Managing @playwright/test, @types/node, typescript, and script configurations.' },
      { id: 'm1-9', title: 'Running tests in headed and headless mode', description: 'Fast headless execution in CI vs visual headed debugging with --headed and --debug.' },
      { id: 'm1-10', title: 'Browser, BrowserContext and Page', description: 'Heavy OS browser process hosting lightweight incognito contexts that spawn tabs/pages.' }
    ],
    keyTakeaways: [
      'Playwright bypasses HTTP REST latency by maintaining a single persistent WebSocket connection to browser engines.',
      'BrowserContext provides full incognito session isolation in under 2ms without restarting browser binaries.',
      'WebKit testing uses the real Apple WebKit engine on Linux/Windows, not a simulated user-agent string.',
      'The CLI provides native recording (codegen), execution, debugging (PWDEBUG=1), and trace inspection.'
    ],
    contentSections: [
      {
        heading: 'Playwright WebSocket Architecture vs Selenium & Cypress',
        body: 'Selenium issues discrete HTTP requests over the JSON Wire protocol for every locator find and action, causing 20-50ms latency per step. Cypress injects JavaScript directly into an iframe inside a browser tab, which confines tests to a single browser tab and causes memory leak issues on large suites. Playwright runs out-of-process as a Node.js process connected directly to the browser engine over a duplex WebSocket pipe, giving it native multi-tab, multi-origin, and sub-millisecond execution capabilities.',
        conceptCallout: {
          type: 'tip',
          title: 'Evergreen Engines vs System Browsers',
          text: 'Playwright downloads patched open-source engine binaries (Chromium, Firefox, WebKit) so tests run deterministically across macOS, Linux, and Windows with identical rendering.'
        }
      },
      {
        heading: 'Core Hierarchy: Browser -> BrowserContext -> Page',
        body: 'A single Browser instance is launched once per worker process. Each test gets a fresh, isolated BrowserContext with clean cookies, cache, and localStorage. Multiple pages/tabs can exist inside one context, sharing cookies like real browser tabs.',
        codeSnippet: {
          fileName: 'tests/fundamentals.spec.ts',
          description: 'Spawning isolated contexts and running CLI tests',
          caption: 'Browser, Context, and Page interaction',
          ts: `import { test, expect, chromium } from '@playwright/test';

test('inspect browser, context, and page lifecycle', async () => {
  // Launch heavy OS browser process once
  const browser = await chromium.launch({ headless: true });

  // Spawn lightweight isolated incognito session (takes <2ms)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
  });

  // Open a new tab in this context
  const page = await context.newPage();
  await page.goto('https://demo.playwright.dev/todomvc');

  await expect(page).toHaveTitle(/TodoMVC/);

  // Clean teardown in milliseconds
  await context.close();
  await browser.close();
});`,
          js: `const { test, expect, chromium } = require('@playwright/test');

test('inspect browser, context, and page lifecycle', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page).toHaveTitle(/TodoMVC/);
  await context.close();
  await browser.close();
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-fund-1',
        question: 'How does Playwright manage to run tests 5-10x faster than traditional Selenium WebDriver frameworks?',
        difficulty: 'Senior',
        category: 'architecture',
        scenario: 'An engineering director is skeptical about migrating from Selenium Grid to Playwright.',
        seniorAnswer: 'Playwright replaces discrete HTTP REST handshakes with a single bi-directional WebSocket connection directly to browser engine internals (CDP in Chromium). Secondly, instead of rebooting browser binaries for every test, it reuses the browser process and creates lightweight, isolated BrowserContexts in milliseconds. Thirdly, built-in actionability auto-waiting eliminates arbitrary sleep timeouts.',
        interviewerIntent: 'Checks if you understand network protocols, process lifecycles, and synchronization mechanics.',
        pitfalls: ['Claiming Playwright runs inside the browser DOM like Cypress.']
      }
    ]
  },

  // MODULE 2
  {
    id: 'm02-typescript-javascript-basics',
    number: '02',
    track: 'track-1-foundations',
    trackLabel: 'Track 1: Fundamentals & Language',
    title: 'TypeScript & JavaScript Basics for Automation',
    subtitle: 'Essential modern language features: async/await, typing, arrays, destructuring, and classes',
    summary: 'Everything a test automation engineer needs in TypeScript/JavaScript: let/const scope, async/await and Promises, array transformations (map, filter, reduce), object destructuring, optional chaining, interfaces, and modules.',
    readTimeMinutes: 11,
    tags: ['#typescript', '#javascript', '#async', '#promises', '#typing'],
    subtopics: [
      { id: 'm2-1', title: 'Variables: let, const, var', description: 'Block scoping vs function scoping and why var is banned in modern code.' },
      { id: 'm2-2', title: 'Data types and type annotations', description: 'Primitives (string, number, boolean) and TypeScript type annotations.' },
      { id: 'm2-3', title: 'Functions and arrow functions', description: 'Standard functions, arrow functions, implicit returns, and lexical this binding.' },
      { id: 'm2-4', title: 'Arrays and array methods', description: 'map(), filter(), find(), some(), every(), and reduce() for processing test data.' },
      { id: 'm2-5', title: 'Strings and string methods', description: 'Template literals, includes(), startsWith(), slice(), and regex matching.' },
      { id: 'm2-6', title: 'Objects and destructuring', description: 'Object property access, spread operator (...), and extracting fixture parameters.' },
      { id: 'm2-7', title: 'Loops and conditional statements', description: 'for...of loops with async/await vs problematic Array.forEach.' },
      { id: 'm2-8', title: 'Promises and async/await', description: 'Promise lifecycle (pending, fulfilled, rejected) and clean async/await syntax.' },
      { id: 'm2-9', title: 'Callbacks and error handling', description: 'try/catch blocks, finally clauses, and custom error classes.' },
      { id: 'm2-10', title: 'Interfaces, types and classes', description: 'TypeScript interfaces, union types, and Page Object Model class definitions.' },
      { id: 'm2-11', title: 'Modules: import and export', description: 'ES modules (import/export), named exports, and default exports.' },
      { id: 'm2-12', title: 'Map, Set and optional chaining', description: 'Unique values with Set, key-value stores with Map, and ?. optional chaining.' }
    ],
    keyTakeaways: [
      'Every Playwright call returns a Promise; forgetting await is the #1 beginner syntax bug.',
      'Never use Array.forEach with async/await because it does not wait for asynchronous promises; use for...of instead.',
      'Object destructuring is how Playwright injects built-in fixtures like test("name", async ({ page, request }) => {}).',
      'TypeScript interfaces provide compile-time safety for API request payloads and Page Object parameters.'
    ],
    contentSections: [
      {
        heading: 'Async/Await and the Promise Pitfall in Test Automation',
        body: 'Playwright commands like page.goto(), locator.click(), and response.json() are asynchronous operations that return Promises. If you forget await, the action starts in the background and the test finishes prematurely before the action resolves.',
        codeSnippet: {
          fileName: 'src/ts-basics-demo.ts',
          description: 'Async loops and TypeScript interfaces in automation',
          caption: 'Proper async for...of loop and destructuring',
          ts: `// 1. TypeScript Interface for Test Data Contract
interface UserAccount {
  id: number;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions?: string[];
}

// 2. Processing data arrays with async/await
async function provisionUsers(users: UserAccount[]) {
  // CRITICAL: Use for...of instead of users.forEach for async operations!
  for (const user of users) {
    const formattedEmail = user.email.toLowerCase().trim();
    const hasAdminAccess = user.role === 'admin' && (user.permissions?.includes('ALL') ?? false);

    console.log(\`Provisioning user \${user.id}: \${formattedEmail} [Admin: \${hasAdminAccess}]\`);
  }
}

// 3. Object Destructuring in Playwright Fixture Parameters
const testRunner = async ({ page, request }: { page: any; request: any }) => {
  // Destructured variables ready for immediate use
  await page.goto('https://example.com');
};`,
          js: `async function provisionUsers(users) {
  for (const user of users) {
    const formattedEmail = user.email.toLowerCase().trim();
    console.log(\`Provisioning user \${user.id}: \${formattedEmail}\`);
  }
}`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-ts-1',
        question: 'Why does using Array.prototype.forEach with async/await cause flaky or skipped tests in Playwright?',
        difficulty: 'Mid',
        category: 'core',
        scenario: 'A developer wrote [1,2,3].forEach(async (id) => await page.click(...)) and tests pass without executing clicks.',
        seniorAnswer: 'Array.prototype.forEach executes its callback synchronously and ignores any Promise returned by the async callback function. It does not await each iteration before moving to the next, nor does it return a Promise that the parent test can await. Consequently, the test runner finishes immediately while background promises are still executing. To run async operations sequentially in order, always use standard for...of loops or Promise.all() for concurrent operations.',
        interviewerIntent: 'Checks JavaScript event loop understanding and async execution comprehension.',
        pitfalls: ['Saying "forEach works fine with async if you return the promise".']
      }
    ]
  },

  // MODULE 3
  {
    id: 'm03-locators-and-element-identification',
    number: '03',
    track: 'track-1-foundations',
    trackLabel: 'Track 1: Fundamentals & Language',
    title: 'Locators & Element Identification',
    subtitle: 'User-facing accessibility locators, strictness, filtering, and dynamic selectors',
    summary: 'Master Playwright\'s locator engine: getByRole, getByText, getByLabel, getByPlaceholder, getByTestId, locator strictness, chaining, hasText filtering, and handling dynamic UI elements.',
    readTimeMinutes: 12,
    tags: ['#locators', '#getbyrole', '#strictness', '#selectors', '#filters'],
    subtopics: [
      { id: 'm3-1', title: 'getByRole()', description: 'Locating elements by ARIA accessibility roles: button, heading, checkbox, dialog, tab, etc.' },
      { id: 'm3-2', title: 'getByText()', description: 'Locating elements by text content with exact or substring matching.' },
      { id: 'm3-3', title: 'getByLabel()', description: 'Locating form control inputs using associated <label> text.' },
      { id: 'm3-4', title: 'getByPlaceholder()', description: 'Locating input fields by placeholder text.' },
      { id: 'm3-5', title: 'getByAltText()', description: 'Locating images and graphics by alt attribute text.' },
      { id: 'm3-6', title: 'getByTitle()', description: 'Locating elements with HTML title attributes (tooltips, icons).' },
      { id: 'm3-7', title: 'getByTestId()', description: 'Resilient escape hatch for custom data-testid attributes.' },
      { id: 'm3-8', title: 'locator() with CSS selectors', description: 'When and how to use CSS selector syntax safely without fragility.' },
      { id: 'm3-9', title: 'XPath selectors', description: 'Understanding XPath syntax and why user-facing locators should be preferred.' },
      { id: 'm3-10', title: 'Chaining and filtering locators', description: 'parent.locator().filter({ hasText }) to pinpoint specific rows in tables/lists.' },
      { id: 'm3-11', title: 'Locator strictness and ambiguity', description: 'Playwright strict mode: throwing exceptions when multiple elements match an action.' },
      { id: 'm3-12', title: 'nth(), first() and last()', description: 'Explicit index selectors when ordering is intentional.' },
      { id: 'm3-13', title: 'hasText and has filters', description: 'Filtering locators by nested child elements or inner text.' },
      { id: 'm3-14', title: 'Reusable locator methods', description: 'Encapsulating locator definitions inside Page Objects for DRY maintenance.' },
      { id: 'm3-15', title: 'Handling dynamic elements', description: 'Strategies for dynamically generated IDs, animated modals, and infinite lists.' }
    ],
    keyTakeaways: [
      'Locators represent a way to find elements at any given moment; they re-evaluate dynamically on every action.',
      'Strictness mode is enabled by default: actions throw an error if more than one element matches.',
      'Prefer getByRole and getByLabel over CSS classes to ensure accessibility compliance and immunity to design refactors.',
      'Use locator.filter({ hasText: "item" }) to target specific rows inside data grids without fragile indexing.'
    ],
    contentSections: [
      {
        heading: 'The Locator Preference Priority',
        body: 'Playwright prioritizes selectors that reflect how real users interact with software: 1. `getByRole()` (accessible role + name), 2. `getByLabel()` (form inputs), 3. `getByPlaceholder()`, 4. `getByText()`, 5. `getByTestId()` (reliable fallback), and lastly CSS/XPath.',
        codeSnippet: {
          fileName: 'tests/locators-mastery.spec.ts',
          description: 'Modern locator chaining and strictness management',
          caption: 'User-facing locators and filtering',
          ts: `import { test, expect } from '@playwright/test';

test('advanced locator strategies and filtering', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  // 1. User-facing placeholder input
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Write Unit Tests');
  await input.press('Enter');
  await input.fill('Deploy to GitHub Pages');
  await input.press('Enter');

  // 2. Chaining & filtering: Target a specific row inside listitem elements
  const targetRow = page.getByRole('listitem')
    .filter({ hasText: 'Deploy to GitHub Pages' });

  // 3. Child locator within the filtered row
  await targetRow.getByRole('checkbox').check();

  // 4. Verification with web-first auto-retrying assertion
  await expect(targetRow).toHaveClass(/completed/);

  // 5. Handling dynamic list counts
  const allItems = page.getByRole('listitem');
  expect(await allItems.count()).toBe(2);
});`,
          js: `const { test, expect } = require('@playwright/test');

test('advanced locator strategies', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByPlaceholder('What needs to be done?').fill('Task 1');
  await page.keyboard.press('Enter');
  const row = page.getByRole('listitem').filter({ hasText: 'Task 1' });
  await row.getByRole('checkbox').check();
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-loc-deep-1',
        question: 'Why does Playwright avoid finding elements eagerly like Selenium’s driver.findElement()?',
        difficulty: 'Senior',
        category: 'core',
        scenario: 'An interviewer asks why page.locator() does not return a Promise and does not require await.',
        seniorAnswer: 'In Selenium, driver.findElement() executes immediately over HTTP, finding the DOM element at that exact microsecond. If the element later re-renders, it throws a StaleElementReferenceException. In contrast, Playwright’s page.locator() is a lazy descriptor; it does not execute a DOM query until an actual action or assertion is performed. Every time you call locator.click() or expect(locator).toBeVisible(), Playwright dynamically queries the DOM and runs actionability checks, eliminating stale element exceptions entirely.',
        interviewerIntent: 'Checks if you understand lazy evaluation vs eager evaluation and why Playwright tests do not suffer from stale element errors.',
        pitfalls: ['Saying page.locator() is slow because it runs twice.']
      }
    ]
  },

  // MODULE 4
  {
    id: 'm04-actions-and-web-interactions',
    number: '04',
    track: 'track-1-foundations',
    trackLabel: 'Track 1: Fundamentals & Language',
    title: 'Actions & Web Interactions',
    subtitle: 'Click, fill, press, hover, drag, file uploads, dropdowns, and scrolling',
    summary: 'Master every user interaction in Playwright: click, dblclick, fill vs type, press, selectOption, dragTo, setInputFiles for single/multi uploads, keyboard shortcuts, contenteditable fields, and handling off-screen or read-only controls.',
    readTimeMinutes: 12,
    tags: ['#actions', '#interactions', '#uploads', '#dropdowns', '#scrolling'],
    subtopics: [
      { id: 'm4-1', title: 'click() and dblclick()', description: 'Single and double clicks with button options (left, right, middle) and modifiers.' },
      { id: 'm4-2', title: 'fill() and clear()', description: 'Fast programmatic input value setting with auto-clearing and change events.' },
      { id: 'm4-3', title: 'press() and keyboard actions', description: 'Dispatching keyboard events (Enter, Escape, Tab, Control+A).' },
      { id: 'm4-4', title: 'check() and uncheck()', description: 'Interacting with native checkboxes and radio elements.' },
      { id: 'm4-5', title: 'selectOption()', description: 'Selecting options in HTML <select> by value, label, or index.' },
      { id: 'm4-6', title: 'hover()', description: 'Moving pointer over elements to trigger hover states, tooltips, and sub-menus.' },
      { id: 'm4-7', title: 'dragTo()', description: 'Native drag-and-drop actions between source and target locators.' },
      { id: 'm4-8', title: 'File upload with setInputFiles()', description: 'Uploading single or multiple files without native OS file dialog popups.' },
      { id: 'm4-9', title: 'Handling dropdowns and autocomplete', description: 'Interacting with custom headless dropdowns, combo boxes, and search autocompletes.' },
      { id: 'm4-10', title: 'Mouse and keyboard operations', description: 'Low-level mouse.move, mouse.down, mouse.up, and keyboard.type.' },
      { id: 'm4-11', title: 'Editable fields and contenteditable', description: 'Typing into rich text editors, WYSIWYG boxes, and contenteditable divs.' },
      { id: 'm4-12', title: 'Scrolling and off-screen elements', description: 'Playwright automatic scrolling into view and manual scrollIntoViewIfNeeded.' },
      { id: 'm4-13', title: 'Handling disabled and read-only controls', description: 'Asserting disabled states and verifying read-only invariants.' }
    ],
    keyTakeaways: [
      'fill() clears the field first and dispatches change and input events in one step; use pressSequentially() only when testing keystroke-by-keystroke autocompletes.',
      'setInputFiles() interacts directly with the input[type=file] element without opening cumbersome OS file dialogs.',
      'Playwright automatically scrolls off-screen elements into the viewport before clicking.',
      'All actions automatically perform the 5 actionability checks before dispatching events.'
    ],
    contentSections: [
      {
        heading: 'File Uploads and Complex Dropdown Selection',
        body: 'Playwright handles file uploads natively through the browser protocol. You never need to interact with the OS file system picker.',
        codeSnippet: {
          fileName: 'tests/actions-demo.spec.ts',
          description: 'File upload, dropdown selection, and keyboard navigation',
          caption: 'Comprehensive web action examples',
          ts: `import { test, expect } from '@playwright/test';
import path from 'path';

test('file uploads, dropdowns, and drag-and-drop', async ({ page }) => {
  await page.goto('https://example.com/forms');

  // 1. Single and Multi-file upload via setInputFiles
  const fileInput = page.getByLabel('Upload Documents');
  await fileInput.setInputFiles([
    path.join(__dirname, 'test-files', 'sample.pdf'),
    path.join(__dirname, 'test-files', 'invoice.csv'),
  ]);

  // Clear uploaded files
  // await fileInput.setInputFiles([]);

  // 2. Select Dropdown by Label or Value
  await page.getByLabel('Country').selectOption({ label: 'United States' });

  // 3. Native drag and drop
  const dragSource = page.locator('#item-draggable');
  const dropTarget = page.locator('#drop-container');
  await dragSource.dragTo(dropTarget);

  // 4. Keyboard Shortcuts
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
});`,
          js: `const { test, expect } = require('@playwright/test');
const path = require('path');

test('file uploads and dropdowns', async ({ page }) => {
  await page.goto('https://example.com/forms');
  await page.getByLabel('Upload').setInputFiles('sample.pdf');
  await page.getByLabel('Country').selectOption({ label: 'United States' });
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-act-1',
        question: 'What is the exact difference between locator.fill() and locator.pressSequentially() in Playwright?',
        difficulty: 'Mid',
        category: 'core',
        scenario: 'A test typing a 50-character address takes 3 seconds when using pressSequentially.',
        seniorAnswer: 'locator.fill() sets the input element value directly via the DOM property and triggers all input and change events almost instantaneously (<5ms). It also automatically clears the existing field. In contrast, pressSequentially() simulates a real human typing character-by-character, dispatching keydown, keypress, and keyup events with delays between strokes. Use fill() for 95% of form inputs for fast execution; reserve pressSequentially() only when testing debounced live search filters or masked credit card inputs.',
        interviewerIntent: 'Checks practical performance awareness and deep knowledge of DOM event dispatching.',
        pitfalls: ['Saying they are identical or using pressSequentially for standard forms.']
      }
    ]
  },

  // MODULE 5
  {
    id: 'm05-assertions-and-waiting',
    number: '05',
    track: 'track-2-core-engine',
    trackLabel: 'Track 2: Core Browser Engine & Test Design',
    title: 'Assertions & Waiting Strategies',
    subtitle: 'Web-first assertions, auto-retry, expect.poll(), soft assertions, and anti-patterns',
    summary: 'Master deterministic verification: web-first assertions (toBeVisible, toHaveText, toHaveValue, toHaveURL), auto-retry mechanisms, soft assertions with expect.soft(), custom polling with expect.poll(), expect.toPass(), and why page.waitForTimeout() is an anti-pattern.',
    readTimeMinutes: 11,
    tags: ['#assertions', '#webfirst', '#autowait', '#expectpoll', '#softassertions'],
    subtopics: [
      { id: 'm5-1', title: 'expect() and assertion basics', description: 'Jest/Playwright test assertion syntax and matchers.' },
      { id: 'm5-2', title: 'toBeVisible() and toBeHidden()', description: 'Checking visibility while auto-waiting for animation or async fetch.' },
      { id: 'm5-3', title: 'toHaveText() and toContainText()', description: 'Verifying exact vs partial string matching inside elements.' },
      { id: 'm5-4', title: 'toHaveValue()', description: 'Checking current input field or form control value.' },
      { id: 'm5-5', title: 'toHaveAttribute()', description: 'Asserting HTML attributes like disabled, href, src, or custom data-attrs.' },
      { id: 'm5-6', title: 'toHaveURL() and toHaveTitle()', description: 'Verifying browser navigation, redirects, and page titles.' },
      { id: 'm5-7', title: 'toHaveCount()', description: 'Asserting exact number of matching elements in a locator query.' },
      { id: 'm5-8', title: 'Soft assertions', description: 'expect.soft() allowing tests to continue after non-critical verification failures.' },
      { id: 'm5-9', title: 'Web-first assertions and auto-retry', description: 'Why await expect(locator) retries until timeout while sync expect() does not.' },
      { id: 'm5-10', title: 'expect.poll()', description: 'Polling custom asynchronous functions or backend states repeatedly until true.' },
      { id: 'm5-11', title: 'expect.toPass()', description: 'Retrying an entire code block until all assertions pass within a timeout.' },
      { id: 'm5-12', title: 'Timeouts and assertion timeout', description: 'Configuring action timeouts, navigation timeouts, and assertion timeouts.' },
      { id: 'm5-13', title: 'Auto-waiting vs explicit waiting', description: 'When Playwright waits automatically and when explicit event listeners are needed.' },
      { id: 'm5-14', title: 'Why waitForTimeout() should be avoided', description: 'The hidden CI cost and flakiness caused by hardcoded sleep timeouts.' }
    ],
    keyTakeaways: [
      'await expect(locator).toBeVisible() retries continuously until the assertion passes or the timeout expires.',
      'Synchronous assertions like expect(await locator.isVisible()).toBe(true) DO NOT RETRY and cause intermittent flakiness.',
      'expect.soft() logs errors and marks the test as failed, but allows subsequent assertions to execute for complete diagnostic reporting.',
      'Use expect.poll() when checking third-party APIs or database updates that take time to settle.'
    ],
    contentSections: [
      {
        heading: 'The Fatal Flaw of Synchronous Assertions vs Web-First Assertions',
        body: 'Writing `expect(await locator.isVisible()).toBe(true)` is the leading cause of flaky tests. In this statement, `await locator.isVisible()` checks the DOM at a single microsecond and returns a boolean. If the element is still fading in, it returns `false`, and `expect(false).toBe(true)` fails immediately with zero retries. In contrast, `await expect(locator).toBeVisible()` is a web-first assertion: Playwright repeatedly re-checks the locator every 100ms for up to 5,000ms until it passes.',
        codeSnippet: {
          fileName: 'tests/assertions-demo.spec.ts',
          description: 'Web-first assertions, soft assertions, and expect.poll()',
          caption: 'Resilient assertion strategies',
          ts: `import { test, expect } from '@playwright/test';

test('web-first assertions and polling patterns', async ({ page, request }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Buy Groceries');
  await input.press('Enter');

  // ✅ Web-first assertion (auto-retries up to 5s)
  await expect(page.getByRole('listitem')).toHaveText(['Buy Groceries']);

  // ✅ Soft assertions: Verify multiple attributes without stopping execution
  await expect.soft(input).toHaveValue('');
  await expect.soft(page.getByRole('heading', { level: 1 })).toHaveText('todos');

  // ✅ expect.poll: Poll an async API or database call until it matches
  await expect.poll(async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/todos/1');
    return res.status();
  }, {
    message: 'Backend API failed to become healthy within timeout',
    intervals: [200, 500, 1000],
    timeout: 5000,
  }).toBe(200);
});`,
          js: `const { test, expect } = require('@playwright/test');

test('web-first assertions', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.getByPlaceholder('What needs to be done?').fill('Task');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listitem')).toBeVisible();
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-ass-1',
        question: 'Why is `await expect(locator).toBeVisible()` fundamentally different from `expect(await locator.isVisible()).toBe(true)`?',
        difficulty: 'Senior',
        category: 'core',
        scenario: 'A junior QA writes boolean assertions and tests fail randomly on CI runners.',
        seniorAnswer: 'The first form is a Web-First Assertion. It takes the locator itself and polls the DOM repeatedly until the element satisfies visibility conditions or hits the assertion timeout (default 5s). The second form evaluates locator.isVisible() once synchronously, receives a static boolean (false if the network or animation is delayed by 10ms), and asserts expect(false).toBe(true) which fails instantly without retrying.',
        interviewerIntent: 'Checks if the engineer understands Playwright’s auto-retrying assertion architecture.',
        pitfalls: ['Saying they both do the same thing.']
      }
    ]
  },

  // MODULE 6
  {
    id: 'm06-browser-and-page-handling',
    number: '06',
    track: 'track-2-core-engine',
    trackLabel: 'Track 2: Core Browser Engine & Test Design',
    title: 'Browser & Page Handling',
    subtitle: 'Contexts, popups, tabs, iframes, dialogs, storageState, cookies, and device emulation',
    summary: 'Master multi-page and environment management: handling popups and tabs, iframes with frameLocator(), native alert/confirm/prompt dialogs, storageState for global auth, cookies, sessionStorage, device emulation, and geolocation.',
    readTimeMinutes: 13,
    tags: ['#contexts', '#popups', '#iframes', '#dialogs', '#storagestate', '#emulation'],
    subtopics: [
      { id: 'm6-1', title: 'Launching browsers', description: 'Browser types (chromium, firefox, webkit), launch options, slowMo, and channel arguments.' },
      { id: 'm6-2', title: 'Creating and closing browser contexts', description: 'Context lifecycle, independent cookies, cache, and manual close.' },
      { id: 'm6-3', title: 'Multiple tabs and pages', description: 'Managing multiple page instances within the same BrowserContext.' },
      { id: 'm6-4', title: 'Handling popups and new windows', description: 'Waiting for popup events with Promise.all and interacting with child windows.' },
      { id: 'm6-5', title: 'BrowserContext isolation', description: 'How incognito contexts guarantee complete test independence.' },
      { id: 'm6-6', title: 'Multiple users in separate contexts', description: 'Simulating concurrent users (Buyer and Seller) in the same test.' },
      { id: 'm6-7', title: 'Frames and iframes', description: 'Understanding nested iframes and cross-domain security boundaries.' },
      { id: 'm6-8', title: 'frameLocator()', description: 'Piercing through iframes seamlessly with chainable frame locators.' },
      { id: 'm6-9', title: 'Dialogs: alert, confirm, prompt', description: 'Listening to page.on("dialog") and accepting/dismissing native dialogs.' },
      { id: 'm6-10', title: 'Authentication with storageState', description: 'Saving and reusing cookies and localStorage to bypass repeated logins.' },
      { id: 'm6-11', title: 'Cookies and localStorage', description: 'context.cookies(), context.addCookies(), and page.evaluate for storage.' },
      { id: 'm6-12', title: 'SessionStorage handling', description: 'Setting and asserting window.sessionStorage values.' },
      { id: 'm6-13', title: 'Browser permissions', description: 'Granting permissions for geolocation, camera, microphone, and clipboard.' },
      { id: 'm6-14', title: 'Viewport, device emulation and geolocation', description: 'Emulating iPhones, iPads, dark mode, high-DPI screens, and GPS coordinates.' }
    ],
    keyTakeaways: [
      'Playwright automatically dismisses native alert dialogs by default; register a page.on("dialog") handler to accept them.',
      'frameLocator() allows targeting elements inside iframes just like normal page locators.',
      'Handling new tabs/popups requires Promise.all([page.waitForEvent("popup"), clickAction]) to avoid race conditions.',
      'Device emulation (devices["iPhone 14 Pro"]) accurately simulates viewport, user agent, touch events, and device scale factor.'
    ],
    contentSections: [
      {
        heading: 'Handling Iframes and Dialogs Elegantly',
        body: 'In legacy tools, switching to an iframe required driver.switchTo().frame() and driver.switchTo().defaultContent(). In Playwright, `frameLocator()` is composable and auto-waits for the frame to load.',
        codeSnippet: {
          fileName: 'tests/browser-page-handling.spec.ts',
          description: 'Iframes, dialog handling, and popup windows',
          caption: 'Modern frameLocator and dialog listeners',
          ts: `import { test, expect } from '@playwright/test';

test('handling iframes, dialogs, and popup tabs', async ({ page }) => {
  // 1. Handling Native Browser Alert / Confirm Dialogs
  page.on('dialog', async (dialog) => {
    console.log(\`Dialog message: \${dialog.message()}\`);
    await dialog.accept(); // or dialog.dismiss()
  });

  await page.goto('https://example.com/iframe-demo');

  // 2. Piercing into an iframe with frameLocator
  const paymentFrame = page.frameLocator('iframe#stripe-payment-frame');
  await paymentFrame.getByPlaceholder('Card number').fill('4242424242424242');
  await paymentFrame.getByRole('button', { name: 'Pay' }).click();

  // 3. Race-free Popup / New Tab Handling
  const [popupPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'Open Terms in New Tab' }).click(),
  ]);

  await popupPage.waitForLoadState('domcontentloaded');
  await expect(popupPage).toHaveTitle(/Terms of Service/);
  await popupPage.close();
});`,
          js: `const { test, expect } = require('@playwright/test');

test('iframes and dialogs', async ({ page }) => {
  page.on('dialog', async (dialog) => await dialog.accept());
  await page.goto('https://example.com/iframe-demo');
  const frame = page.frameLocator('iframe#stripe-payment-frame');
  await frame.getByPlaceholder('Card number').fill('424242424242');
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-bph-1',
        question: 'Why does Playwright auto-dismiss JavaScript dialogs by default, and how do you handle an alert or prompt?',
        difficulty: 'Mid',
        category: 'core',
        scenario: 'A page triggers window.confirm("Are you sure?"). In Selenium this hangs the test; what happens in Playwright?',
        seniorAnswer: 'JavaScript dialogs (alert, confirm, prompt) block the browser thread. In Playwright, if no listener is registered, dialogs are dismissed automatically so tests never freeze or hang in CI. To handle a dialog explicitly, you register a listener before triggering the action using page.on("dialog", async (dialog) => { await dialog.accept(); }). You can also inspect dialog.message() or supply text via dialog.accept("my response").',
        interviewerIntent: 'Validates understanding of browser event listeners and CI freeze prevention.',
        pitfalls: ['Registering the page.on("dialog") handler after the click that opens the dialog.']
      }
    ]
  },

  // MODULE 7
  {
    id: 'm07-forms-and-file-handling',
    number: '07',
    track: 'track-2-core-engine',
    trackLabel: 'Track 2: Core Browser Engine & Test Design',
    title: 'Forms & File Handling',
    subtitle: 'Complex inputs, date pickers, downloads, CSV/JSON parsing, and Excel files',
    summary: 'Master enterprise form and file automation: radio buttons, multi-select menus, custom date pickers, form validation states, single and multi-file downloads with suggested filenames, CSV/JSON processing, and Excel test data extraction.',
    readTimeMinutes: 12,
    tags: ['#forms', '#downloads', '#csv', '#json', '#excel', '#validation'],
    subtopics: [
      { id: 'm7-1', title: 'Radio buttons and checkboxes', description: 'setChecked, isChecked, check, and uncheck methods.' },
      { id: 'm7-2', title: 'Single-select and multi-select dropdowns', description: 'Selecting multiple values simultaneously from multi-select elements.' },
      { id: 'm7-3', title: 'Date pickers', description: 'Interacting with native HTML5 date inputs and custom JavaScript calendar widgets.' },
      { id: 'm7-4', title: 'Form validation', description: 'Asserting HTML5 validity (checkValidity, validationMessage) and error UI states.' },
      { id: 'm7-5', title: 'File upload: single and multiple files', description: 'setInputFiles with buffer uploads and directory uploads.' },
      { id: 'm7-6', title: 'File download handling', description: 'Capturing page.waitForEvent("download") and saving files locally.' },
      { id: 'm7-7', title: 'Download path and suggested filename', description: 'download.suggestedFilename() and download.saveAs(filepath).' },
      { id: 'm7-8', title: 'Working with CSV and JSON', description: 'Parsing CSV data with csv-parse and JSON payloads with JSON.parse.' },
      { id: 'm7-9', title: 'Reading Excel files', description: 'Extracting test data matrices from .xlsx spreadsheets using xlsx or exceljs.' },
      { id: 'm7-10', title: 'Writing test data to files', description: 'Persisting execution outputs, IDs, and logs to JSON/CSV files on disk.' },
      { id: 'm7-11', title: 'Handling large file uploads', description: 'Streaming file buffers and managing timeout extensions for large media.' },
      { id: 'm7-12', title: 'Validating uploaded and downloaded files', description: 'Asserting downloaded file size, mime-type, and text content integrity.' }
    ],
    keyTakeaways: [
      'File downloads do not clutter your default OS Downloads folder; Playwright saves them to a temp folder and exposes a Download object.',
      'Always trigger downloads using Promise.all([page.waitForEvent("download"), clickAction]) to prevent race conditions.',
      'Use download.saveAs(path) to persist the file to a known location for checksum and content verification.',
      'CSV and Excel data can be read in Node.js test setup to drive data-driven tests.'
    ],
    contentSections: [
      {
        heading: 'Capturing and Validating File Downloads',
        body: 'When a user clicks "Download Report", the browser triggers a download event. Playwright intercepts this event cleanly without needing browser profile adjustments or third-party auto-click tools.',
        codeSnippet: {
          fileName: 'tests/download-validation.spec.ts',
          description: 'Capturing file downloads and parsing contents',
          caption: 'Download event handling and CSV parsing',
          ts: `import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('capture download and verify file content', async ({ page }) => {
  await page.goto('https://example.com/reports');

  // Promise.all prevents missing fast download events
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export CSV' }).click(),
  ]);

  // Assert suggested file name
  expect(download.suggestedFilename()).toBe('monthly-report.csv');

  // Save download to known test artifacts folder
  const destinationPath = path.join(__dirname, 'downloads', download.suggestedFilename());
  await download.saveAs(destinationPath);

  // Read and verify file contents
  const fileContent = fs.readFileSync(destinationPath, 'utf-8');
  expect(fileContent).toContain('TransactionID,Amount,Status');
  expect(fileContent).toContain('COMPLETED');

  // Clean up
  fs.unlinkSync(destinationPath);
});`,
          js: `const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('capture download', async ({ page }) => {
  await page.goto('https://example.com/reports');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export' }).click(),
  ]);
  const filePath = await download.path();
  expect(fs.existsSync(filePath)).toBeTruthy();
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-form-1',
        question: 'How do you test and verify file downloads in headless CI environments without native dialogs?',
        difficulty: 'Senior',
        category: 'debugging',
        scenario: 'CI runs in Docker where there is no GUI or OS download folder.',
        seniorAnswer: 'Playwright handles downloads via browser protocol events rather than OS dialogs. We wrap the trigger click inside Promise.all with page.waitForEvent("download"). Once the promise resolves, we obtain a Download instance. We can inspect download.suggestedFilename(), save the file using await download.saveAs(targetPath), and read the file from the filesystem using Node.js fs module to verify headers, row counts, and data integrity before deleting the temporary artifact.',
        interviewerIntent: 'Checks real-world experience with CI file pipelines and headless browser event architecture.',
        pitfalls: ['Relying on hardcoded paths like C:/Users/Admin/Downloads.']
      }
    ]
  },

  // MODULE 8
  {
    id: 'm08-hooks-fixtures-and-organization',
    number: '08',
    track: 'track-2-core-engine',
    trackLabel: 'Track 2: Core Browser Engine & Test Design',
    title: 'Hooks, Fixtures & Test Organization',
    subtitle: 'test.describe, lifecycle hooks, built-in vs custom fixtures, test.extend, and POM',
    summary: 'Master test architecture and composition: test() and test.describe(), lifecycle hooks (beforeAll, beforeEach, afterEach, afterAll), built-in fixtures, custom fixtures with test.extend(), fixture scoping (test vs worker), and Page Object Model best practices.',
    readTimeMinutes: 13,
    tags: ['#fixtures', '#hooks', '#pom', '#testextend', '#organization'],
    subtopics: [
      { id: 'm8-1', title: 'test() and test.describe()', description: 'Structuring test files, suites, and nested describe blocks.' },
      { id: 'm8-2', title: 'beforeAll, beforeEach, afterEach, afterAll', description: 'Execution lifecycle hooks and their execution order.' },
      { id: 'm8-3', title: 'Built-in fixtures: page, browser, context, request', description: 'Default injected test parameters provided by @playwright/test.' },
      { id: 'm8-4', title: 'Custom fixtures', description: 'Writing modular, reusable fixtures that package test setup and teardown.' },
      { id: 'm8-5', title: 'Fixture scope: test vs worker', description: 'Per-test fixtures vs shared worker-scoped database connection fixtures.' },
      { id: 'm8-6', title: 'Fixture dependencies and composition', description: 'Composing fixtures that depend on other fixtures cleanly.' },
      { id: 'm8-7', title: 'test.use()', description: 'Overriding fixture options, viewport, baseURL, and storageState per suite.' },
      { id: 'm8-8', title: 'test.extend()', description: 'Creating typed custom test runners with injected domain fixtures.' },
      { id: 'm8-9', title: 'Page Object Model (POM)', description: 'Designing clean, maintainable Page Object classes with encapsulated locators.' },
      { id: 'm8-10', title: 'Reusable components and page classes', description: 'Component Object Model for shared navbars, modals, and tables.' },
      { id: 'm8-11', title: 'Base fixtures and dependency injection', description: 'Injecting POM instances directly into test arguments.' },
      { id: 'm8-12', title: 'Test setup and teardown', description: 'Ensuring reliable cleanup using automatic fixture teardown after await use().' },
      { id: 'm8-13', title: 'Global setup and teardown', description: 'Executing code once before any worker starts (e.g. database seeding, global auth).' },
      { id: 'm8-14', title: 'Test annotations: skip, only, fixme, slow', description: 'Managing test execution flow and triaging known bugs.' },
      { id: 'm8-15', title: 'Tags and test filtering', description: 'Tagging tests with @smoke, @regression, @api and filtering via --grep.' }
    ],
    keyTakeaways: [
      'Playwright Fixtures provide on-demand dependency injection: code only runs if the test requests the fixture.',
      'Fixtures co-locate setup and teardown: code before await use() is setup; code after await use() is teardown.',
      'Worker-scoped fixtures execute once per worker process (ideal for expensive database connections or server boots).',
      'Prefer injecting Page Objects via test.extend() rather than creating manual new LoginPage(page) instances.'
    ],
    contentSections: [
      {
        heading: 'Why Playwright Fixtures Beat Traditional BeforeEach Hooks',
        body: 'In traditional frameworks, `beforeEach` runs unconditionally for every test in the file, even if a test does not need that setup. Playwright fixtures are lazy-loaded: if a test asks for `{ adminPage }`, only then does the fixture execute. When the test ends, teardown runs automatically.',
        codeSnippet: {
          fileName: 'fixtures/custom-fixtures.ts',
          description: 'Custom fixture with dependency injection and teardown',
          caption: 'test.extend with automatic teardown',
          ts: `import { test as base, expect, Page } from '@playwright/test';

// 1. Define Page Object
export class DashboardPage {
  constructor(readonly page: Page) {}
  async goto() { await this.page.goto('/dashboard'); }
  async getMetricsCount() { return this.page.getByRole('article').count(); }
}

// 2. Extend test with custom fixtures
type MyFixtures = {
  dashboardPage: DashboardPage;
  testUserRecord: { id: string; email: string };
};

export const test = base.extend<MyFixtures>({
  // Test-scoped fixture with setup and teardown
  testUserRecord: async ({ request }, use) => {
    // SETUP: Create temporary user record via API
    const res = await request.post('/api/users', { data: { email: 'temp@test.com' } });
    const user = await res.json();

    // Hand over user to the test
    await use(user);

    // TEARDOWN: Clean up user from database automatically!
    await request.delete(\`/api/users/\${user.id}\`);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await use(dashboard);
  },
});

export { expect };`,
          js: `const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  dashboardPage: async ({ page }, use) => {
    await page.goto('/dashboard');
    await use(page);
  },
});
module.exports = { test, expect };`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-fix-1',
        question: 'Explain the lifecycle of a Playwright fixture with setup and teardown using `await use()`.',
        difficulty: 'Senior',
        category: 'core',
        scenario: 'An architect asks how your team manages database cleanup after test failures.',
        seniorAnswer: 'A Playwright fixture function receives two parameters: dependencies (e.g. { page, request }) and a use callback. The code executing before await use(fixtureValue) is the setup phase (e.g. creating test data, launching contexts). Calling await use() passes the value to the test and suspends fixture execution until the test completes (or fails). The code immediately following await use() is the teardown phase, which is guaranteed to run even if the test throws an assertion error. This ensures reliable cleanup without scattered afterEach hooks.',
        interviewerIntent: 'Checks understanding of cooperative multitasking, generator-like flow, and robust teardown patterns.',
        pitfalls: ['Thinking teardown only runs if tests pass.']
      }
    ]
  },

  // MODULE 9
  {
    id: 'm09-test-data-and-test-design',
    number: '09',
    track: 'track-2-core-engine',
    trackLabel: 'Track 2: Core Browser Engine & Test Design',
    title: 'Test Data & Test Design Strategies',
    subtitle: 'Data-driven testing, factories, parameterization, boundary analysis, and isolation',
    summary: 'Master robust test design: data-driven execution with loops, JSON/CSV/Excel test datasets, environment variables with .env, test data factories and builders, boundary-value analysis, equivalence partitioning, unique data generation for parallel execution, and cleanup strategies.',
    readTimeMinutes: 11,
    tags: ['#testdata', '#datadriven', '#factories', '#boundary', '#isolation'],
    subtopics: [
      { id: 'm9-1', title: 'Data-driven testing', description: 'Running parameterized test scenarios across multiple data inputs.' },
      { id: 'm9-2', title: 'Loop-based test generation', description: 'Generating individual test cases dynamically from array iterations.' },
      { id: 'm9-3', title: 'test.describe() with multiple scenarios', description: 'Structuring parameterized test matrices.' },
      { id: 'm9-4', title: 'JSON test data', description: 'Importing and typing static JSON fixtures.' },
      { id: 'm9-5', title: 'CSV test data', description: 'Parsing external CSV spreadsheets to drive test runs.' },
      { id: 'm9-6', title: 'Excel test data', description: 'Extracting scenarios from multi-sheet Excel workbooks.' },
      { id: 'm9-7', title: 'Environment variables and .env', description: 'Managing environment-specific URLs, credentials, and secrets using dotenv.' },
      { id: 'm9-8', title: 'Test data factories and builders', description: 'Using libraries like faker-js to generate dynamic, realistic mock data.' },
      { id: 'm9-9', title: 'Positive and negative testing', description: 'Validating both expected happy paths and intentional failure paths.' },
      { id: 'm9-10', title: 'Boundary-value analysis', description: 'Testing minimum, nominal, and maximum input thresholds.' },
      { id: 'm9-11', title: 'Equivalence partitioning', description: 'Dividing input data into valid and invalid equivalence classes.' },
      { id: 'm9-12', title: 'Independent and repeatable tests', description: 'Ensuring tests do not rely on previous tests to succeed.' },
      { id: 'm9-13', title: 'Unique data for parallel execution', description: 'Using timestamps or UUIDs to avoid database collision in parallel workers.' },
      { id: 'm9-14', title: 'Test cleanup and database state', description: 'Best practices for resetting database state between runs.' }
    ],
    keyTakeaways: [
      'Parameterized tests should generate separate test() entries inside a loop so failures are isolated.',
      'Always append unique UUIDs or Date.now() to emails, usernames, and order IDs to allow collision-free parallel runs.',
      'Never hardcode secrets or URLs in test files; use process.env and .env files.',
      'Independent and atomic tests are essential for reliable parallelization and retries.'
    ],
    contentSections: [
      {
        heading: 'Data-Driven Parameterized Test Generation',
        body: 'Instead of writing one giant test that checks 5 credentials, loop over an array of test cases and generate individual `test()` blocks. If one case fails, the other 4 still execute and report independently.',
        codeSnippet: {
          fileName: 'tests/data-driven.spec.ts',
          description: 'Dynamic parameterized test generation with unique data',
          caption: 'Loop-based test generation with isolated reporting',
          ts: `import { test, expect } from '@playwright/test';

// Test data matrix
const testScenarios = [
  { role: 'Standard User', username: 'user_std', expectedBadge: 'Standard', maxLimit: 100 },
  { role: 'Manager', username: 'user_mgr', expectedBadge: 'Manager VIP', maxLimit: 500 },
  { role: 'Admin', username: 'user_adm', expectedBadge: 'Super Admin', maxLimit: 9999 },
];

test.describe('Role-Based Access Control Scenarios', () => {
  for (const scenario of testScenarios) {
    test(\`Verify access permissions for \${scenario.role}\`, async ({ page }) => {
      // Generate unique session identifier to prevent parallel collisions
      const uniqueId = \`\${scenario.username}_\${Date.now()}\`;

      await page.goto('/login');
      await page.getByPlaceholder('Username').fill(uniqueId);
      await page.getByRole('button', { name: 'Sign In' }).click();

      // Verify role badge
      await expect(page.getByTestId('user-badge')).toHaveText(scenario.expectedBadge);
    });
  }
});`,
          js: `const { test, expect } = require('@playwright/test');

const scenarios = ['User', 'Admin'];
for (const role of scenarios) {
  test(\`Login as \${role}\`, async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Role').fill(role);
  });
}`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-data-1',
        question: 'How do you design test data to ensure 50 parallel workers run without causing database race conditions?',
        difficulty: 'Senior',
        category: 'core',
        scenario: 'When running with workers: 4, tests fail because two workers try to register "admin@test.com" at the same time.',
        seniorAnswer: 'Test data must be completely decoupled and unique per worker. We implement a Test Data Factory pattern that generates randomized, unique identifiers using UUIDs or timestamp prefixes (e.g. user_${testInfo.workerIndex}_${Date.now()}@readwithak.dev). Alternatively, we isolate databases per worker using test-specific database schemas or tenant IDs, and use API fixtures to seed and clean up records atomically per test.',
        interviewerIntent: 'Evaluates your experience with distributed test architecture, multi-worker concurrency, and state isolation.',
        pitfalls: ['Saying "just run tests sequentially with workers: 1" (which ruins CI execution speed).']
      }
    ]
  },

  // MODULE 10
  {
    id: 'm10-api-automation-and-testing',
    number: '10',
    track: 'track-3-api-network',
    trackLabel: 'Track 3: Deep API Automation & Network',
    title: 'API Automation & Testing in Depth',
    subtitle: 'Headless APIRequestContext, CRUD, Bearer auth, JSON schema, status codes, and hybrid flows',
    summary: 'Comprehensive API automation: playwright.request, APIRequestContext vs page.request, GET/POST/PUT/PATCH/DELETE semantics, Bearer auth, query & path params, status assertions, JSON body validation, API chaining, contract schema verification with Zod/Ajv, performance latency SLAs, and hybrid UI+API tests.',
    readTimeMinutes: 15,
    tags: ['#api', '#request', '#rest', '#jwt', '#schemavalidation', '#hybrid'],
    subtopics: [
      { id: 'm10-1', title: 'API testing fundamentals', description: 'Testing backend HTTP services without browser rendering overhead.' },
      { id: 'm10-2', title: 'APIRequestContext', description: 'Configuring base URLs, default headers, and credentials for headless API testing.' },
      { id: 'm10-3', title: 'request.get() and request.post()', description: 'Executing GET queries and POST mutations with JSON payloads.' },
      { id: 'm10-4', title: 'request.put(), patch() and delete()', description: 'Full resource updates, partial modifications, and resource deletions.' },
      { id: 'm10-5', title: 'GET, POST, PUT, PATCH and DELETE semantics', description: 'Idempotency and HTTP verb standards.' },
      { id: 'm10-6', title: 'Headers, query parameters and path parameters', description: 'Passing params object, Authorization Bearer tokens, and custom tracking headers.' },
      { id: 'm10-7', title: 'Authentication tokens and API keys', description: 'OAuth2 tokens, JWTs, and API key header injection.' },
      { id: 'm10-8', title: 'Request body and payload validation', description: 'Validating outbound JSON payloads and multipart/form-data.' },
      { id: 'm10-9', title: 'Status code and response assertions', description: 'Asserting response.status() === 200/201 and response.ok().' },
      { id: 'm10-10', title: 'Response JSON validation', description: 'Parsing response.json() and asserting properties and values.' },
      { id: 'm10-11', title: 'Response headers and content type', description: 'Validating content-type, cache-control, and rate-limiting headers.' },
      { id: 'm10-12', title: 'API chaining and dependent requests', description: 'Extracting IDs or tokens from one API call to feed into the next call.' },
      { id: 'm10-13', title: 'API setup and cleanup', description: 'Seeding database state in beforeAll/beforeEach and cleaning up in afterEach.' },
      { id: 'm10-14', title: 'APIRequestContext vs page.request', description: 'Independent HTTP context vs page-bound context sharing browser cookies.' },
      { id: 'm10-15', title: 'API mocking and route interception', description: 'Fulfilling requests with custom responses using page.route().' },
      { id: 'm10-16', title: 'Schema validation', description: 'Contract testing with JSON Schema (Ajv) or Zod schemas.' },
      { id: 'm10-17', title: 'API negative testing', description: 'Testing 400 Bad Request, 401 Unauthorized, 403 Forbidden, and 404 Not Found.' },
      { id: 'm10-18', title: 'Response time checks', description: 'Asserting response.timing() latency to enforce performance SLAs.' },
      { id: 'm10-19', title: 'UI and API combined testing', description: 'Hybrid pattern: seed data via API in 50ms, verify UI, cleanup via API.' }
    ],
    keyTakeaways: [
      'Use the { request } fixture for pure API testing without opening browser windows.',
      'APIRequestContext handles cookie storage, session persistence, and automatic JSON stringification.',
      'Combine UI and API tests to bypass slow, repetitive UI flows and save 80% test execution time.',
      'Contract validation with schema libraries ensures backend API regressions are caught before they break UI tests.'
    ],
    contentSections: [
      {
        heading: 'Complete Production API Suite: Auth, Chaining, and Latency SLAs',
        body: 'Here is an enterprise-grade API test demonstrating authentication, extracting tokens, chaining requests, asserting headers, and checking latency SLAs.',
        codeSnippet: {
          fileName: 'tests/api/api-mastery.spec.ts',
          description: 'Full CRUD, token injection, and timing assertions',
          caption: 'Advanced Playwright APIRequestContext testing',
          ts: `import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('E-Commerce Orders API Suite', () => {
  let createdOrderId: number;
  const authToken = 'bearer_mock_jwt_token_999';

  test('POST /posts - Create resource with auth and assert latency', async ({ request }) => {
    const payload = {
      title: 'Automation Hardware Order',
      body: 'Item details: 1x Mechanical Keyboard',
      userId: 42,
    };

    const response = await request.post(\`\${BASE_URL}/posts\`, {
      data: payload,
      headers: {
        'Authorization': \`Bearer \${authToken}\`,
        'Content-Type': 'application/json',
      },
    });

    // 1. Assert Status & Content Type
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    // 2. Validate Performance Latency SLA (< 600ms)
    const timing = response.timing();
    const durationMs = timing.responseEnd - timing.requestStart;
    expect(durationMs).toBeLessThan(600);

    // 3. Validate Response Payload
    const data = await response.json();
    expect(data.title).toBe(payload.title);
    expect(data.id).toBeDefined();

    createdOrderId = data.id;
  });

  test('GET /posts/1 - Retrieve and validate schema properties', async ({ request }) => {
    const response = await request.get(\`\${BASE_URL}/posts/1\`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(typeof body.title).toBe('string');
  });

  test('DELETE /posts/1 - Teardown resource', async ({ request }) => {
    const response = await request.delete(\`\${BASE_URL}/posts/1\`);
    expect(response.status()).toBe(200);
  });
});`,
          js: `const { test, expect } = require('@playwright/test');

test('API POST and latency check', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'Test', userId: 1 },
  });
  expect(response.status()).toBe(201);
  const timing = response.timing();
  expect(timing.responseEnd - timing.requestStart).toBeLessThan(800);
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-api-deep-1',
        question: 'What is the exact difference between `request` and `page.request` in Playwright?',
        difficulty: 'Senior',
        category: 'api',
        scenario: 'An engineer wants to know when to use the test request fixture vs page.request.',
        seniorAnswer: 'The { request } fixture is an independent APIRequestContext created per test. It does not share cookies, storage, or cache with any browser Page. It is meant for headless API automation. In contrast, page.request is an APIRequestContext bound to that specific page’s BrowserContext. Requests made via page.request automatically share the page’s cookies, authentication tokens, and session state. If your user logs in via the UI, page.request can immediately call authenticated backend endpoints without manually parsing and passing Bearer headers.',
        interviewerIntent: 'Checks deep architectural understanding of session sharing and authentication contexts.',
        pitfalls: ['Thinking they are identical or interchangeable.']
      }
    ]
  },

  // MODULE 11
  {
    id: 'm11-network-mocking-and-advanced-ui',
    number: '11',
    track: 'track-3-api-network',
    trackLabel: 'Track 3: Deep API Automation & Network',
    title: 'Network Interception, Mocking & Advanced UI',
    subtitle: 'page.route, fulfill, abort, network events, WebSockets, shadow DOM, and visual regression',
    summary: 'Master advanced browser control: intercepting and stubbing network requests with page.route(), simulating 500 server errors, offline mode, waiting for network responses, WebSocket monitoring, console and pageerror capture, shadow DOM piercing, and pixel-perfect visual regression testing.',
    readTimeMinutes: 14,
    tags: ['#network', '#mocking', '#pageroute', '#shadowdom', '#visualregression'],
    subtopics: [
      { id: 'm11-1', title: 'page.route() and route.fulfill()', description: 'Intercepting network calls and stubbing custom HTTP responses.' },
      { id: 'm11-2', title: 'route.continue() and route.abort()', description: 'Forwarding requests with modified headers or aborting to simulate connection drops.' },
      { id: 'm11-3', title: 'page.on("request")', description: 'Listening to outbound HTTP requests dispatched by the page.' },
      { id: 'm11-4', title: 'page.on("response")', description: 'Monitoring responses received by the browser.' },
      { id: 'm11-5', title: 'page.on("requestfailed")', description: 'Detecting network connection drops, CORS errors, and blocked assets.' },
      { id: 'm11-6', title: 'Mocking API responses', description: 'Replacing volatile backend data with stable, deterministic JSON fixtures.' },
      { id: 'm11-7', title: 'Network failures and offline testing', description: 'Simulating offline mode using context.setOffline(true) or aborting routes.' },
      { id: 'm11-8', title: 'Waiting for specific API responses', description: 'page.waitForResponse() to synchronize UI assertions with backend updates.' },
      { id: 'm11-9', title: 'WebSockets basics', description: 'Listening to WebSocket frame exchanges via page.on("websocket").' },
      { id: 'm11-10', title: 'Console message handling', description: 'Listening to page.on("console") and catching browser warnings/errors.' },
      { id: 'm11-11', title: 'JavaScript errors and pageerror', description: 'Asserting that no unhandled JavaScript exceptions occur during test runs.' },
      { id: 'm11-12', title: 'Handling shadow DOM', description: 'Playwright automatic piercing of open Shadow DOM trees without special syntax.' },
      { id: 'm11-13', title: 'Visual regression testing', description: 'expect(page).toHaveScreenshot() and pixel diff thresholds.' },
      { id: 'm11-14', title: 'Screenshots and screenshot comparison', description: 'Capturing element screenshots, masking dynamic timestamps, and baseline updates.' },
      { id: 'm11-15', title: 'Accessibility testing basics', description: 'Integrating @axe-core/playwright for automated WCAG accessibility audits.' },
      { id: 'm11-16', title: 'Handling dynamic tables and pagination', description: 'Iterating through paginated records and asserting sorting order.' }
    ],
    keyTakeaways: [
      'page.route() intercepts requests at the network layer before they reach the wire, allowing instant response fulfillment.',
      'Playwright automatically pierces open Shadow DOM boundaries: locator("custom-button") works seamlessly without special flags.',
      'Visual regression with toHaveScreenshot() catches accidental CSS and layout regressions.',
      'Use page.waitForResponse(predicate) when a UI action triggers an asynchronous fetch that must complete before checking UI updates.'
    ],
    contentSections: [
      {
        heading: 'Simulating Edge Cases: 500 Server Errors & Offline Mode',
        body: 'Testing error boundaries in manual QA is difficult because you cannot easily crash production APIs on demand. Playwright lets you mock 500 status codes, network latency, or offline states in 2 lines.',
        codeSnippet: {
          fileName: 'tests/network-mocking.spec.ts',
          description: 'Network interception, 500 simulation, and waiting for responses',
          caption: 'page.route and page.waitForResponse',
          ts: `import { test, expect } from '@playwright/test';

test('simulate 500 server error and verify graceful error UI', async ({ page }) => {
  // 1. Intercept payment endpoint and simulate 500 Internal Server Error
  await page.route('**/api/checkout/pay', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Payment gateway timeout. Please retry.' }),
    });
  });

  await page.goto('https://example.com/checkout');
  await page.getByRole('button', { name: 'Pay Now' }).click();

  // Assert user-friendly alert banner appears
  await expect(page.getByRole('alert')).toContainText('Payment gateway timeout');
});

test('wait for specific background API response', async ({ page }) => {
  await page.goto('https://example.com/feed');

  // Concurrently wait for response while triggering refresh
  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes('/api/feed') && res.status() === 200),
    page.getByRole('button', { name: 'Refresh Feed' }).click(),
  ]);

  const json = await response.json();
  expect(json.items.length).toBeGreaterThan(0);
});`,
          js: `const { test, expect } = require('@playwright/test');

test('mock 500 error', async ({ page }) => {
  await page.route('**/api/**', async (route) => {
    await route.fulfill({ status: 500, body: 'Error' });
  });
  await page.goto('https://example.com');
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-net-1',
        question: 'How do you handle shadow DOM elements in Playwright compared to Selenium?',
        difficulty: 'Senior',
        category: 'core',
        scenario: 'Your application uses Web Components (e.g. <custom-card> <#shadow-root> <button>).',
        seniorAnswer: 'In Selenium, you had to retrieve the shadow root element using driver.executeScript("return arguments[0].shadowRoot", element) and search within that context. In Playwright, all CSS and text locators pierce open Shadow DOM boundaries automatically by default. You simply write page.getByRole("button", { name: "Save" }) or page.locator("custom-card button"), and Playwright traverses into the shadow root transparently without any extra code.',
        interviewerIntent: 'Checks if you are familiar with modern Web Components and Playwright’s locator engine conveniences.',
        pitfalls: ['Saying you need to write custom JavaScript executeScript calls.']
      }
    ]
  },

  // MODULE 12
  {
    id: 'm12-configuration-and-reporting',
    number: '12',
    track: 'track-3-api-network',
    trackLabel: 'Track 3: Deep API Automation & Network',
    title: 'Configuration & Reporting',
    subtitle: 'playwright.config.ts, workers, timeouts, HTML reporters, Trace Viewer, and sharding',
    summary: 'Master test configuration and execution architecture: playwright.config.ts, baseURL, browser projects, retries, workers, fullyParallel, reporter configuration (HTML, JSON, list), failure screenshots, video recording, Trace Viewer, and test sharding.',
    readTimeMinutes: 12,
    tags: ['#config', '#reporting', '#traceviewer', '#workers', '#sharding'],
    subtopics: [
      { id: 'm12-1', title: 'playwright.config.ts', description: 'Central configuration file managing all test runner settings.' },
      { id: 'm12-2', title: 'baseURL and projects', description: 'Configuring relative URLs and multi-browser execution projects.' },
      { id: 'm12-3', title: 'Browser-specific projects', description: 'Targeting Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari.' },
      { id: 'm12-4', title: 'Retries and workers', description: 'Managing automatic retries on CI and worker process concurrency.' },
      { id: 'm12-5', title: 'fullyParallel configuration', description: 'Running all tests inside all files completely in parallel.' },
      { id: 'm12-6', title: 'Test timeout and expect timeout', description: 'Differentiating overall test timeout (30s) from assertion timeout (5s).' },
      { id: 'm12-7', title: 'Global timeout', description: 'Setting a maximum time limit for the entire test suite run.' },
      { id: 'm12-8', title: 'Reporter configuration', description: 'Configuring multiple reporters (html, list, dot, junit, json) simultaneously.' },
      { id: 'm12-9', title: 'HTML, list, line and JSON reporters', description: 'Generating interactive self-contained HTML reports for artifacts.' },
      { id: 'm12-10', title: 'Screenshots on failure', description: 'screenshot: "only-on-failure" for automated failure diagnostics.' },
      { id: 'm12-11', title: 'Video recording', description: 'video: "retain-on-failure" capturing screen recordings of failing tests.' },
      { id: 'm12-12', title: 'Trace Viewer', description: 'trace: "on-first-retry" providing complete DOM snapshots, network, and console.' },
      { id: 'm12-13', title: 'Retries and flaky-test diagnosis', description: 'Understanding when retries hide bugs vs when they provide resilience.' },
      { id: 'm12-14', title: 'Sharding and parallel execution', description: 'Distributing tests across multiple machines via --shard=1/4.' },
      { id: 'm12-15', title: 'Test annotations and metadata', description: 'Attaching custom metadata, JIRA issue links, and bug tickets to test reports.' },
      { id: 'm12-16', title: 'Environment-specific configuration', description: 'Switching configs dynamically between DEV, STAGING, and PROD.' }
    ],
    keyTakeaways: [
      'Trace Viewer is Playwright\'s killer debugging feature: a complete timeline scrubber with full DOM snapshots and network calls.',
      'Configure trace: "on-first-retry" or "retain-on-failure" in CI to avoid burning disk space while guaranteeing failure diagnosis.',
      'fullyParallel: true runs tests within the same file in parallel, multiplying speed on multi-core runners.',
      'Sharding (--shard=x/y) allows dividing a 40-minute suite across 5 CI machines to finish in 8 minutes.'
    ],
    contentSections: [
      {
        heading: 'Production-Grade playwright.config.ts',
        body: 'A production config balances execution speed, failure diagnostics, and multi-browser matrix coverage.',
        codeSnippet: {
          fileName: 'playwright.config.ts',
          description: 'Enterprise Playwright configuration file',
          caption: 'playwright.config.ts with traces and projects',
          ts: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`,
          js: `const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: { trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-cfg-1',
        question: 'What is Playwright Trace Viewer, and why is it superior to screenshot-on-failure or video recording?',
        difficulty: 'Senior',
        category: 'debugging',
        scenario: 'A test fails randomly on a Linux headless CI container once every 20 runs.',
        seniorAnswer: 'A screenshot only shows the final moment of failure; a video only shows low-resolution visual pixels. The Playwright Trace Viewer captures a complete recording of the entire test execution. When you open a trace.zip file in npx playwright show-trace, you get: 1) An interactive timeline showing action-by-action steps, 2) A live interactive DOM snapshot before and after each action with computed styles, 3) Full network waterfall with all request and response headers and bodies, 4) Browser console logs and page errors, and 5) Exact mouse coordinates. You can inspect the real DOM elements at the moment of failure as if you had DevTools open during the run.',
        interviewerIntent: 'Checks if the engineer leverages modern observability tooling rather than old-fashioned console.logs.',
        pitfalls: ['Confusing trace viewer with standard console logs.']
      }
    ]
  },

  // MODULE 13
  {
    id: 'm13-framework-development',
    number: '13',
    track: 'track-4-devops-enterprise',
    trackLabel: 'Track 4: Enterprise Architecture & DevOps',
    title: 'Framework Development & Architecture',
    subtitle: 'Standard folder structures, POM, SOLID principles, API wrappers, and scalability',
    summary: 'Design enterprise-scale test frameworks from scratch: standard folder architecture, Page Object Model, Component Object Model, centralized locators, environment management, authentication re-use, API client wrappers, custom assertions, logging, and SOLID software engineering principles.',
    readTimeMinutes: 14,
    tags: ['#framework', '#pom', '#solid', '#architecture', '#scalability'],
    subtopics: [
      { id: 'm13-1', title: 'Standard framework folder structure', description: 'Organizing tests, pages, fixtures, utils, config, and data.' },
      { id: 'm13-2', title: 'Page Object Model implementation', description: 'Encapsulating pages into maintainable, typed TypeScript classes.' },
      { id: 'm13-3', title: 'Page Component Object Model', description: 'Decomposing complex UIs into reusable sub-components (nav, modals, tables).' },
      { id: 'm13-4', title: 'Custom fixtures and base test', description: 'Injecting pages, API clients, and database handles via test.extend.' },
      { id: 'm13-5', title: 'Reusable utilities and helper functions', description: 'Date formatters, string generators, and file readers.' },
      { id: 'm13-6', title: 'Centralized locators and test data', description: 'Managing constants and locator strategies without duplication.' },
      { id: 'm13-7', title: 'Environment configuration management', description: 'Supporting multiple environments (DEV, QA, STAGING, PROD) cleanly.' },
      { id: 'm13-8', title: 'Authentication reuse', description: 'Configuring auth.setup.ts to authenticate once and share storageState.' },
      { id: 'm13-9', title: 'API client wrapper', description: 'Building typed API client classes wrapping APIRequestContext.' },
      { id: 'm13-10', title: 'Logging and error handling', description: 'Structured test logging with winston or test.step annotations.' },
      { id: 'm13-11', title: 'Custom assertions', description: 'Writing domain-specific assertions using expect.extend().' },
      { id: 'm13-12', title: 'Test data management', description: 'Creating, maintaining, and tearing down dynamic test data.' },
      { id: 'm13-13', title: 'Framework design principles', description: 'KISS, DRY, and clean architecture applied to automation.' },
      { id: 'm13-14', title: 'SOLID principles applied to automation', description: 'Single Responsibility, Open/Closed, and Dependency Inversion in test code.' },
      { id: 'm13-15', title: 'Reusable test architecture', description: 'Creating modular frameworks shared across multiple web apps.' },
      { id: 'm13-16', title: 'Framework maintainability and scalability', description: 'Review processes, type safety, and scaling to 10,000+ tests.' }
    ],
    keyTakeaways: [
      'Apply the Single Responsibility Principle: Page Objects should only model interactions; assertions belong in the test specs.',
      'Use Component Objects for reusable widgets (Header, Footer, Navigation, Modal) to avoid duplicate locators.',
      'Wrap test actions in test.step("Step description", async () => {}) to produce clean hierarchical reports.',
      'Centralize authentication in a setup project to avoid running UI login thousands of times.'
    ],
    contentSections: [
      {
        heading: 'Enterprise Framework Folder Structure',
        body: 'A production Playwright framework should be structured cleanly so dozens of engineers can contribute without conflicts.',
        codeSnippet: {
          fileName: 'framework-structure.txt',
          description: 'Recommended folder organization',
          caption: 'Scalable Playwright project structure',
          ts: `├── .github/
│   └── workflows/
│       ├── deploy.yml            # GitHub Pages deployment workflow
│       └── playwright.yml        # PR and regression test CI pipeline
├── config/
│   ├── dev.env
│   └── staging.env
├── fixtures/
│   └── base-test.ts              # test.extend() with injected POMs & API clients
├── pages/
│   ├── base.page.ts              # Common navigation and wait methods
│   ├── components/               # Component Objects (Navbar, Footer, Modals)
│   │   └── navbar.component.ts
│   └── checkout.page.ts          # Page Object classes
├── tests/
│   ├── auth.setup.ts             # Global login saving to storageState
│   ├── api/                      # Headless API tests
│   └── e2e/                      # Hybrid and UI test specs
├── utils/
│   ├── api-client.ts             # Wrapped APIRequestContext methods
│   └── test-data-generator.ts    # Unique UUID / factory generator
├── playwright.config.ts          # Multi-project configuration
└── package.json`,
          js: `// Follow this modular directory structure for enterprise scalability`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-fwk-1',
        question: 'Should Page Object Model (POM) classes contain assertions like expect(button).toBeVisible()?',
        difficulty: 'Senior',
        category: 'architecture',
        scenario: 'A team is debating whether assertions belong inside Page Objects or test spec files.',
        seniorAnswer: 'According to the Single Responsibility Principle and industry best practice, Page Objects should NOT contain assertions. The Page Object’s responsibility is to model the application UI structure and provide user interactions (methods that return locators or perform clicks/fills). The test spec’s responsibility is to verify requirements and make assertions. If you embed assertions inside Page Objects, you violate SRP, make the Page Object non-reusable across different scenarios (e.g. testing both positive and negative cases), and hide test criteria inside implementation classes.',
        interviewerIntent: 'Assesses architectural maturity and software engineering principles in QA.',
        pitfalls: ['Saying Page Objects should assert everything to save lines of code.']
      }
    ]
  },

  // MODULE 14
  {
    id: 'm14-git-jenkins-cicd-and-docker',
    number: '14',
    track: 'track-4-devops-enterprise',
    trackLabel: 'Track 4: Enterprise Architecture & DevOps',
    title: 'Git, Jenkins, CI/CD & Docker',
    subtitle: 'GitHub Actions, Jenkins pipelines, Docker containers, secrets, and report artifacts',
    summary: 'Master continuous testing pipelines: Git workflows (branches, PRs, merge conflicts), GitHub Actions workflow YAML, Jenkinsfile declarative pipelines, running Playwright in headless CI, browser caching, Docker container execution (mcr.microsoft.com/playwright), Linux shell basics, secrets management, and artifact report hosting on GitHub Pages.',
    readTimeMinutes: 13,
    tags: ['#cicd', '#githubactions', '#jenkins', '#docker', '#githubpages', '#devops'],
    subtopics: [
      { id: 'm14-1', title: 'Git basics: clone, add, commit, push', description: 'Core version control commands and Git hygiene.' },
      { id: 'm14-2', title: 'Branches, merge and merge conflicts', description: 'Feature branching, resolving merge conflicts, and rebase strategies.' },
      { id: 'm14-3', title: 'GitHub pull requests and code reviews', description: 'Automating automated status checks on pull requests.' },
      { id: 'm14-4', title: 'GitHub Actions workflow YAML', description: 'Writing syntax for triggers, jobs, steps, matrices, and runners.' },
      { id: 'm14-5', title: 'Jenkins pipeline basics', description: 'Declarative Jenkinsfiles with stage("Test") and parallel execution.' },
      { id: 'm14-6', title: 'Running Playwright in CI', description: 'Executing tests reliably in headless Linux environments.' },
      { id: 'm14-7', title: 'Installing browsers in CI', description: 'npx playwright install --with-deps for Linux system library dependencies.' },
      { id: 'm14-8', title: 'Environment secrets and credentials', description: 'Injecting ${{ secrets.API_KEY }} into CI runners securely.' },
      { id: 'm14-9', title: 'Docker fundamentals', description: 'Containers, images, volumes, and running hermetic test environments.' },
      { id: 'm14-10', title: 'Playwright Docker images', description: 'Using official mcr.microsoft.com/playwright:v1.40.0-jammy containers.' },
      { id: 'm14-11', title: 'Linux commands and shell basics', description: 'Essential bash commands (grep, curl, export, chmod, env).' },
      { id: 'm14-12', title: 'Artifacts, reports and trace retention', description: 'Uploading playwright-report and traces using actions/upload-artifact.' },
      { id: 'm14-13', title: 'Scheduled and pull-request test runs', description: 'Triggering regression suites via cron schedules and push events.' },
      { id: 'm14-14', title: 'Parallel CI execution', description: 'Using GitHub Actions matrix runners to distribute shards.' },
      { id: 'm14-15', title: 'Failure notifications', description: 'Broadcasting test failures to Slack or Microsoft Teams via webhooks.' },
      { id: 'm14-16', title: 'CI debugging and environment differences', description: 'Diagnosing fonts, timezone, and network differences between local and CI.' }
    ],
    keyTakeaways: [
      'In Linux CI environments, you must run npx playwright install --with-deps to install required OS libraries (libgtk, libasound, etc.).',
      'The official Docker image mcr.microsoft.com/playwright comes pre-baked with all browser binaries and OS dependencies.',
      'Always set if: ${{ !cancelled() }} on upload-artifact steps so test reports are published even when tests fail.',
      'Deploy test reports to GitHub Pages for instant team-wide access without downloading zip files.'
    ],
    contentSections: [
      {
        heading: 'Complete Matrix Sharding Workflow in GitHub Actions',
        body: 'Divide a 1,000-test suite across 4 parallel Linux runners. Each runner executes its shard, uploads its blob report, and a final step merges them into one HTML report.',
        codeSnippet: {
          fileName: '.github/workflows/sharded-tests.yml',
          description: 'GitHub Actions workflow with 4 parallel shards and report merge',
          caption: 'Parallel matrix sharding workflow',
          ts: `name: Playwright Parallel Matrix Suite

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      
      # Run specific shard
      - name: Run Shard \${{ matrix.shardIndex }} of \${{ matrix.shardTotal }}
        run: npx playwright test --shard=\${{ matrix.shardIndex }}/\${{ matrix.shardTotal }}
        env:
          CI: true

      - name: Upload Shard Blob
        uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: blob-report-\${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1`,
          js: `# See YAML tab for GitHub Actions syntax`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-cicd-1',
        question: 'Why do Playwright tests pass on a developer’s MacBook but fail with missing font or timeout errors on Linux CI?',
        difficulty: 'Senior',
        category: 'cicd',
        scenario: 'A visual regression screenshot test passes locally on macOS but fails by 3% pixel difference on Ubuntu CI.',
        seniorAnswer: 'Three major environment differences cause this: 1) Font rendering: macOS uses CoreText with subpixel anti-aliasing, whereas Linux uses FreeType, causing different text glyph widths and visual diff failures. Fix: run visual tests inside the official Playwright Docker container or on Linux runners only. 2) Missing OS libraries: Linux requires specific graphics and audio shared objects (fixed via npx playwright install --with-deps). 3) CPU resource constraints: GitHub Actions 2-core runners have lower CPU, causing animations to take longer to settle. Fix: disable CSS animations via page.emulateMedia({ reducedMotion: "reduce" }).',
        interviewerIntent: 'Tests real-world production DevOps debugging expertise.',
        pitfalls: ['Blaming Playwright instead of understanding OS-level font and rendering differences.']
      }
    ]
  },

  // MODULE 15
  {
    id: 'm15-advanced-production-and-interview',
    number: '15',
    track: 'track-4-devops-enterprise',
    trackLabel: 'Track 4: Enterprise Architecture & DevOps',
    title: 'Advanced, Production & Interview Topics',
    subtitle: 'Flaky test root causes, Playwright MCP server, Playwright Agents, AI test healing, and FAANG scenarios',
    summary: 'Master cutting-edge and lead-level automation topics: root-cause flaky test elimination, debugging with Playwright Inspector and VS Code extension, cross-browser quirks, database validation with SQL, Playwright Model Context Protocol (MCP) server, Playwright Agents, AI-assisted test generation/healing, TypeScript coding algorithms, and real-time production troubleshooting.',
    readTimeMinutes: 15,
    tags: ['#advanced', '#ai', '#mcp', '#agents', '#flakytests', '#sql', '#interview'],
    subtopics: [
      { id: 'm15-1', title: 'Flaky tests: root causes and prevention', description: 'Systematic diagnosis of timing, state pollution, and network race conditions.' },
      { id: 'm15-2', title: 'Debugging with Playwright Inspector', description: 'PWDEBUG=1 step-by-step interactive debugger and action recording.' },
      { id: 'm15-3', title: 'Debugging with VS Code', description: 'Using official Playwright VS Code extension with live breakpoints and picking locators.' },
      { id: 'm15-4', title: 'Debugging using Trace Viewer', description: 'Scrubbing through DOM snapshots and network calls in trace.playwright.dev.' },
      { id: 'm15-5', title: 'Retries vs fixing the root cause', description: 'Why retries mask underlying design defects and when retries are acceptable.' },
      { id: 'm15-6', title: 'Test stability and reliability metrics', description: 'Tracking pass rate, flake percentage, and execution duration trends.' },
      { id: 'm15-7', title: 'Cross-browser testing', description: 'Handling browser-specific quirks across Chromium, WebKit, and Firefox.' },
      { id: 'm15-8', title: 'Mobile emulation', description: 'Testing touch gestures, mobile viewports, and orientation changes.' },
      { id: 'm15-9', title: 'Accessibility and performance checks', description: 'Integrating axe-core and Core Web Vitals profiling into regression runs.' },
      { id: 'm15-10', title: 'Database validation with SQL', description: 'Querying PostgreSQL/MySQL directly in test steps to verify backend state.' },
      { id: 'm15-11', title: 'End-to-end workflow automation', description: 'Complex multi-step journeys spanning email verification, payment, and invoices.' },
      { id: 'm15-12', title: 'Role-based access and multi-user workflows', description: 'Testing concurrent collaborator interactions across isolated BrowserContexts.' },
      { id: 'm15-13', title: 'Security considerations in test automation', description: 'Preventing credential leaks, managing API secrets, and testing CSP headers.' },
      { id: 'm15-14', title: 'Playwright MCP server', description: 'Connecting LLMs to live browser automation using the Model Context Protocol.' },
      { id: 'm15-15', title: 'Playwright Agents', description: 'Autonomous browser agents that navigate, plan actions, and inspect state.' },
      { id: 'm15-16', title: 'Agent planning, generation and healing', description: 'Self-healing locators and autonomous recovery when DOM selectors change.' },
      { id: 'm15-17', title: 'AI-assisted test creation and debugging', description: 'Leveraging LLMs for test generation, code reviews, and failure root-cause analysis.' },
      { id: 'm15-18', title: 'Coding problems in TypeScript', description: 'Classic algorithmic problems asked in automation coding rounds (strings, arrays, promises).' },
      { id: 'm15-19', title: 'Real-time production troubleshooting scenarios', description: 'Diagnosing flaky tests during live releases and emergency hotfix verification.' },
      { id: 'm15-20', title: 'Framework architecture and project explanation', description: 'How to describe your test automation framework structure in senior interviews.' }
    ],
    keyTakeaways: [
      'Playwright MCP (Model Context Protocol) enables AI agents to control browsers natively, inspect DOM accessibility trees, and perform self-healing assertions.',
      'Autonomous Playwright Agents can generate test flows, plan actions, and automatically heal broken locators when class names or DOM structures shift.',
      'Never treat retries as a solution to flakiness: retries are a safety net while root causes (race conditions, un-isolated data) must be fixed.',
      'Connecting directly to a database via SQL in test fixtures allows instant state verification without depending on UI latency.'
    ],
    contentSections: [
      {
        heading: 'The Future: Playwright MCP Server & Autonomous AI Agents',
        body: 'The Model Context Protocol (MCP) connects modern LLMs directly to browser automation runtimes. Through the Playwright MCP server, an AI agent can inspect the accessibility tree, execute resilient actions, diagnose failures in real-time, and auto-heal broken test steps when application UI evolves.',
        codeSnippet: {
          fileName: 'tests/ai-mcp-agent.spec.ts',
          description: 'AI-assisted testing and SQL database verification',
          caption: 'Modern AI agent & database validation',
          ts: `import { test, expect } from '@playwright/test';
// Optional DB client (pg, mysql2)
// import { dbClient } from '../utils/db';

test('autonomous workflow with direct database verification', async ({ page, request }) => {
  const orderNumber = \`ORD-\${Date.now()}\`;

  await page.goto('/checkout');
  await page.getByPlaceholder('Order Reference').fill(orderNumber);
  await page.getByRole('button', { name: 'Submit Purchase' }).click();

  // 1. UI Confirmation
  await expect(page.getByRole('alert')).toContainText('Order Placed Successfully');

  // 2. Direct Backend Database Validation (Eliminates UI reliance)
  // const dbRecord = await dbClient.query('SELECT status FROM orders WHERE id = $1', [orderNumber]);
  // expect(dbRecord.rows[0].status).toBe('PAID');

  // 3. Playwright MCP / Agent inspection concept:
  // AI Agents use the accessible ARIA tree rather than raw CSS, ensuring immunity to styling updates.
  const accessibilitySnapshot = await page.accessibility.snapshot();
  expect(accessibilitySnapshot).toBeDefined();
});`,
          js: `const { test, expect } = require('@playwright/test');

test('database and accessibility check', async ({ page }) => {
  await page.goto('/checkout');
  const snapshot = await page.accessibility.snapshot();
  expect(snapshot).toBeDefined();
});`
        }
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-adv-1',
        question: 'How do you structure and explain your test automation framework in a Senior / Lead QA Engineer interview?',
        difficulty: 'Lead',
        category: 'architecture',
        scenario: 'The interviewer asks: "Walk me through the architecture of your current Playwright automation framework."',
        seniorAnswer: 'I explain our framework in 5 clear architectural tiers: 1) Core Runner & Configuration: Playwright TypeScript with multi-browser projects, fullyParallel execution, and baseURL management. 2) Page Object & Component Layer: Clean separation of concerns with encapsulated user actions and zero assertions in Page Objects. 3) Dependency Injection via Fixtures: Custom test.extend() fixtures that inject authenticated contexts (storageState), API clients, and database connection handles with automated setup and teardown. 4) Data & Hybrid Strategy: Dynamic data factories generating unique UUID-prefixed entities, with state seeded via fast API calls before UI assertions. 5) DevOps & Observability: GitHub Actions CI with 4-way matrix sharding, automatic trace artifact uploads on failure, and HTML reports published directly to GitHub Pages.',
        interviewerIntent: 'Assesses architectural clarity, communication skills, and enterprise-level engineering leadership.',
        pitfalls: ['Giving a vague answer like "We have page objects and some tests in a folder".']
      }
    ]
  }
];
