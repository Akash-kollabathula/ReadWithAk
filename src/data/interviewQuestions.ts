import { InterviewQnA } from '../types';

export const ALL_INTERVIEW_QUESTIONS: InterviewQnA[] = [
  {
    id: 'q-vs-cypress-selenium',
    question: 'Why choose Playwright over Selenium and Cypress for modern automation?',
    difficulty: 'Senior',
    category: 'architecture',
    scenario: 'The engineering manager asks for a rigorous justification before migrating the automation tech stack.',
    seniorAnswer: 'Playwright overcomes the fundamental architecture flaws of both predecessors: Unlike Selenium, it bypasses HTTP request-per-action latency by using a single persistent WebSocket connection directly into the browser engine. Unlike Cypress, which runs inside an iframe with single-tab, single-domain limitations, Playwright runs out-of-process with full multi-tab, multi-origin, multi-user context support and native Safari (WebKit) engine execution. Additionally, Playwright provides built-in actionability auto-waiting, native network mocking, and headless API testing with zero external plugins.',
    interviewerIntent: 'Checks if you have experienced the actual technical limitations of Cypress/Selenium and understand browser architecture.',
    pitfalls: [
      'Giving superficial answers like "Playwright is newer" or "Playwright is Microsoft so it is better".',
      'Failing to mention the WebSocket vs HTTP protocol distinction.'
    ]
  },
  {
    id: 'q-auto-waiting-internals',
    question: 'Explain how Playwright Auto-Waiting works internally before performing an action like locator.click().',
    difficulty: 'Mid',
    category: 'core',
    scenario: 'An element takes 800ms to fade in and slide into position. Explain what Playwright does.',
    seniorAnswer: 'Before dispatching any user action (e.g. click), Playwright automatically runs an actionability check loop that verifies: 1) Attached: element is connected to the DOM, 2) Visible: has non-empty bounding box and not computed as display:none/visibility:hidden, 3) Stable: consecutive animation frames show unchanged position/scale, 4) Receives Events: hit-testing confirms the element is not covered by modal backdrops or floating headers, 5) Enabled: not disabled via HTML attribute. If any condition is false, Playwright retries repeatedly until the action timeout (30s) expires. This eliminates arbitrary thread sleeps.',
    interviewerIntent: 'Tests deep knowledge of Playwright actionability engine and debugging skills for timeout exceptions.',
    pitfalls: [
      'Assuming Playwright just uses a blind 5-second delay.',
      'Not knowing about the "Receives Events" hit-test check (which catches obscured elements).'
    ]
  },
  {
    id: 'q-api-graphql-mocking',
    question: 'In API automation, how do you mock a specific GraphQL query when all requests hit the same /graphql POST endpoint?',
    difficulty: 'Senior',
    category: 'api',
    scenario: 'Your single-page app sends 10 different queries to https://api.company.com/graphql. You only want to mock GetUserProfile without breaking other queries.',
    seniorAnswer: 'Because all GraphQL queries share the same URL and method (POST /graphql), URL matching alone is insufficient. We use page.route("**//graphql", async (route) => { ... }) and inspect route.request().postDataJSON(). We check if postData.operationName === "GetUserProfile". If it matches, we call route.fulfill({ status: 200, body: JSON.stringify({ data: { user: mockUser } }) }). If it does NOT match, we call route.continue() so real GraphQL traffic flows through untouched.',
    interviewerIntent: 'Validates real-world experience handling modern GraphQL APIs and conditional network routing.',
    pitfalls: [
      'Fulfilling all /graphql calls with one static mock, which breaks all other background queries.'
    ],
    codeExample: {
      ts: `await page.route('**/graphql', async (route) => {
  const payload = route.request().postDataJSON();
  if (payload?.operationName === 'GetUserProfile') {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { user: { id: 1, name: 'Alice', role: 'admin' } } }),
    });
  } else {
    await route.continue();
  }
});`,
      js: `await page.route('**/graphql', async (route) => {
  const payload = route.request().postDataJSON();
  if (payload?.operationName === 'GetUserProfile') {
    await route.fulfill({ status: 200, body: JSON.stringify({ data: { user: { name: 'Alice' } } }) });
  } else {
    await route.continue();
  }
});`,
      description: 'Selective GraphQL query interception based on operationName'
    }
  },
  {
    id: 'q-api-response-timing',
    question: 'How do you measure API response latency and assert Performance SLAs in Playwright tests?',
    difficulty: 'Mid',
    category: 'api',
    scenario: 'The SLA requires that the checkout price calculation API responds in under 400ms.',
    seniorAnswer: 'Playwright APIResponse objects provide a native response.timing() method. This returns detailed network timing milestones in milliseconds: startTime, domainLookupStart/End, connectStart/End, requestStart, responseStart, and responseEnd. We calculate latency as (responseEnd - requestStart) or measure overall execution with process.hrtime() / performance.now(). We then assert expect(duration).toBeLessThan(400). Additionally, response.ok() verifies the HTTP 2xx status.',
    interviewerIntent: 'Checks if you know how to write non-functional performance validation as part of your automated API suites.',
    pitfalls: [
      'Relying on external libraries when Playwright has built-in timing instrumentation.'
    ],
    codeExample: {
      ts: `const response = await request.get('/api/v1/checkout/calculate');
expect(response.ok()).toBeTruthy();

const timing = response.timing();
const latencyMs = timing.responseEnd - timing.requestStart;
expect(latencyMs).toBeLessThan(400); // Enforce 400ms SLA!`,
      js: `const response = await request.get('/api/v1/checkout/calculate');
const timing = response.timing();
expect(timing.responseEnd - timing.requestStart).toBeLessThan(400);`,
      description: 'Extracting network milestones and enforcing latency SLAs'
    }
  },
  {
    id: 'q-flaky-tests-mitigation',
    question: 'What are the top 3 causes of test flakiness in Playwright and how do you systematically eliminate them?',
    difficulty: 'Lead',
    category: 'debugging',
    scenario: 'Your test suite passes locally but experiences 8% random failures in CI.',
    seniorAnswer: 'The top 3 causes are: 1) Test State Pollution / Non-isolated data (e.g. tests modifying the same user account concurrently in parallel workers. Fix: unique UUID-prefixed test data per worker or isolated databases). 2) Missing Web-First Assertions (e.g. using expect(await locator.isVisible()).toBe(true) which executes once without retrying, instead of await expect(locator).toBeVisible() which automatically retries). 3) Background Animations & Race Conditions (e.g. clicking before CSS translate transitions complete. Fix: use proper locator chaining, disable CSS animations via page.emulateMedia({ reducedMotion: "reduce" }), or await page.waitForLoadState("networkidle") only when strictly necessary).',
    interviewerIntent: 'Tests leadership in QA engineering, systemic debugging ability, and CI stability ownership.',
    pitfalls: [
      'Answering "Just bump the timeout to 60 seconds" or "Set retries to 3 in CI" (retries hide architectural bugs!).'
    ]
  },
  {
    id: 'q-schema-validation',
    question: 'How do you perform JSON Schema validation in Playwright to protect against backend contract regressions?',
    difficulty: 'Senior',
    category: 'api',
    scenario: 'Backend engineers deploy a breaking schema change that renames "userId" to "id". How do you catch this?',
    seniorAnswer: 'We pair Playwright playwright.request with schema validators like Ajv or Zod. In the test, after awaiting response.json(), we validate the body against a defined JSON Schema definition (or Zod schema). If required fields are missing, types are incorrect (string instead of number), or unexpected properties appear, the schema validator throws with exact path diagnostics before UI flows even start.',
    interviewerIntent: 'Assesses whether you view API testing as full contract and data integrity verification, not just status code 200 checks.',
    pitfalls: [
      'Only checking expect(res.status()).toBe(200) without validating the payload structure.'
    ],
    codeExample: {
      ts: `import { test, expect } from '@playwright/test';
import { z } from 'zod';

const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  isActive: z.boolean(),
});

test('validate user API contract schema', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const body = await response.json();

  // Throws informative error if backend contract regresses
  const result = UserResponseSchema.safeParse(body);
  expect(result.success).toBeTruthy();
});`,
      js: `// Using Ajv or Zod for response schema assertions
const response = await request.get('/api/users/1');
const body = await response.json();
expect(body).toHaveProperty('id');
expect(typeof body.email).toBe('string');`,
      description: 'Zod/Ajv schema validation on API response'
    }
  },
  {
    id: 'q-soft-assertions',
    question: 'What are Soft Assertions in Playwright, when are they beneficial, and when are they dangerous?',
    difficulty: 'Mid',
    category: 'core',
    scenario: 'A test checks 10 attributes on an account settings page.',
    seniorAnswer: 'Standard expect() halts test execution immediately upon first failure. expect.soft() logs the failure, marks the test as failed, but continues executing the remaining steps. This is beneficial for checking independent UI elements (e.g. verifying 10 labels, header links, and badges on a dashboard) so you get a complete list of failures in a single run. It is dangerous if applied to critical preconditions—for instance, if soft assertion fails on "User Created", continuing with "User Place Order" will cause confusing cascading errors. Rule: Never use soft assertions on prerequisite steps.',
    interviewerIntent: 'Checks if you understand assertion strategy, error containment, and failure diagnosis.',
    pitfalls: [
      'Using expect.soft() before steps that depend on the previous step having succeeded.'
    ]
  },
  {
    id: 'q-multi-tab-popups',
    question: 'How do you handle popup windows and new browser tabs in Playwright?',
    difficulty: 'Mid',
    category: 'core',
    scenario: 'Clicking "Pay with PayPal" opens a new tab or popup window.',
    seniorAnswer: 'We use page.waitForEvent("popup") wrapped inside Promise.all concurrently with the click action that triggers the popup: const [popup] = await Promise.all([ page.waitForEvent("popup"), page.getByRole("button", { name: "Pay with PayPal" }).click() ]); This prevents race conditions where the popup opens before the event listener is attached. We then interact with popup.getByRole(...) just like any regular page.',
    interviewerIntent: 'Tests async programming mastery and handling of real-world multi-window interactions.',
    pitfalls: [
      'Calling page.waitForEvent("popup") after the click action (which can cause a timeout if the popup opened quickly).'
    ],
    codeExample: {
      ts: `// Race-condition free popup handling
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('button', { name: 'Login with OAuth' }).click(),
]);

await popup.getByLabel('Email').fill('user@readwithak.dev');
await popup.getByRole('button', { name: 'Authorize' }).click();`,
      js: `const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('button', { name: 'OAuth' }).click(),
]);
await popup.getByLabel('Email').fill('user@readwithak.dev');`,
      description: 'Promise.all pattern for handling popups safely'
    }
  },
  {
    id: 'q-trace-viewer-debugging',
    question: 'How do you debug a test that only fails intermittently on a remote headless Linux CI runner?',
    difficulty: 'Senior',
    category: 'debugging',
    scenario: 'Test fails on GitHub Actions once every 10 runs, but always passes on your local MacBook.',
    seniorAnswer: 'We configure Playwright Trace Viewer in playwright.config.ts with trace: "on-first-retry" or "retain-on-failure". When a failure occurs, Playwright generates a trace.zip file uploaded as a CI artifact. We download the trace and run npx playwright show-trace trace.zip (or open trace.playwright.dev). The Trace Viewer provides a full timeline scrubber with complete DOM snapshots before and after each action, console logs, network request/response headers and bodies, and exact visual cursor positions. We can inspect the exact DOM state at the millisecond of failure without guessing.',
    interviewerIntent: 'Validates senior-level observability, root-cause analysis, and remote debugging expertise.',
    pitfalls: [
      'Saying "Add console.log() and run it again" or "Take 50 screenshots".'
    ]
  },
  {
    id: 'q-parallelism-sharding',
    question: 'How does Playwright manage parallel execution, and how does Sharding work across multiple CI machines?',
    difficulty: 'Lead',
    category: 'cicd',
    scenario: 'You want to run a 2,000-test suite in under 3 minutes across 5 parallel GitHub Actions matrix nodes.',
    seniorAnswer: 'Playwright achieves parallelism via OS worker processes. By default, it allocates workers based on CPU cores (or configured via workers: 4). Each worker runs its own isolated browser process. For scaling across multiple CI servers, Playwright supports native Sharding via CLI flags: npx playwright test --shard=1/5, --shard=2/5, etc. Playwright evenly distributes test files across the shards with zero overlap. Each shard produces a blob test report, which can be merged into a single comprehensive HTML report using npx playwright merge-reports.',
    interviewerIntent: 'Evaluates your enterprise architecture skills, distributed CI test infrastructure design, and cost scaling strategies.',
    pitfalls: [
      'Confusing multi-threading with multi-process workers.',
      'Not knowing how to merge shard reports into one final report.'
    ]
  }
];
