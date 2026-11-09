import { SubtopicItem } from '../../types';

// ==========================================
// MODULE 13: FRAMEWORK DEVELOPMENT (16 Topics)
// ==========================================
export const M13_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm13-1',
    title: 'Standard framework folder structure',
    description: 'Organizing tests, pages, fixtures, utils, config, and data.',
    details: [
      'Separates concerns cleanly into `/pages`, `/fixtures`, `/tests`, `/utils`, `/config`, and `playwright.config.ts`.'
    ]
  },
  {
    id: 'm13-2',
    title: 'Page Object Model implementation',
    description: 'Encapsulating pages into maintainable, typed TypeScript classes.',
    details: [
      'Page Objects should expose high-level business actions (`login()`, `search()`) and return locators; assertions stay in specs.'
    ]
  },
  {
    id: 'm13-3',
    title: 'Page Component Object Model',
    description: 'Decomposing complex UIs into reusable sub-components (nav, modals, tables).',
    details: [
      'Model repeated UI elements (Navbar, FilterSidebar, ModalDialog) as standalone component classes.'
    ]
  },
  {
    id: 'm13-4',
    title: 'Custom fixtures and base test',
    description: 'Injecting pages, API clients, and database handles via test.extend.',
    details: [
      'Inject pre-initialized Page Objects into tests without manual `new LoginPage(page)` instantiations.'
    ]
  },
  {
    id: 'm13-5',
    title: 'Reusable utilities and helper functions',
    description: 'Date formatters, string generators, and file readers.',
    details: [
      'Centralize common logic like random string generation and date manipulation in a `/utils` folder.'
    ]
  },
  {
    id: 'm13-6',
    title: 'Centralized locators and test data',
    description: 'Managing constants and locator strategies without duplication.',
    details: [
      'Store selector constants or locators within page classes to prevent duplicate queries.'
    ]
  },
  {
    id: 'm13-7',
    title: 'Environment configuration management',
    description: 'Supporting multiple environments (DEV, QA, STAGING, PROD) cleanly.',
    details: [
      'Dynamically set `baseURL`, credentials, and flags based on the target deployment environment.'
    ]
  },
  {
    id: 'm13-8',
    title: 'Authentication reuse',
    description: 'Configuring auth.setup.ts to authenticate once and share storageState.',
    details: [
      'Perform login in a setup project once, save cookies to `storageState.json`, and inject into all test projects.'
    ]
  },
  {
    id: 'm13-9',
    title: 'API client wrapper',
    description: 'Building typed API client classes wrapping APIRequestContext.',
    details: [
      'Wrap `request.post` and `request.get` inside dedicated API service classes (`UserService`, `OrderService`).'
    ]
  },
  {
    id: 'm13-10',
    title: 'Logging and error handling',
    description: 'Structured test logging with winston or test.step annotations.',
    details: [
      'Wrap test actions in `test.step("description", async () => {})` to produce clean hierarchical step reports.'
    ]
  },
  {
    id: 'm13-11',
    title: 'Custom assertions',
    description: 'Writing domain-specific assertions using expect.extend().',
    details: [
      'Create custom business matchers: `await expect(cart).toHaveTotalAmount(150)`.'
    ]
  },
  {
    id: 'm13-12',
    title: 'Test data management',
    description: 'Creating, maintaining, and tearing down dynamic test data.',
    details: [
      'Create data dynamically per test and clean up in fixture teardown to prevent stale test data build-up.'
    ]
  },
  {
    id: 'm13-13',
    title: 'Framework design principles',
    description: 'KISS, DRY, and clean architecture applied to automation.',
    details: [
      'Keep tests readable, eliminate duplicated selectors, and avoid over-engineering abstractions.'
    ]
  },
  {
    id: 'm13-14',
    title: 'SOLID principles applied to automation',
    description: 'Single Responsibility, Open/Closed, and Dependency Inversion in test code.',
    details: [
      'SRP: POMs handle interactions, specs handle assertions. Dependency Inversion: inject fixtures rather than hardcoding instances.'
    ]
  },
  {
    id: 'm13-15',
    title: 'Reusable test architecture',
    description: 'Creating modular frameworks shared across multiple web apps.',
    details: [
      'Publish common fixtures and utilities as an internal npm package for multi-repo micro-frontends.'
    ]
  },
  {
    id: 'm13-16',
    title: 'Framework maintainability and scalability',
    description: 'Review processes, type safety, and scaling to 10,000+ tests.',
    details: [
      'Enforce TypeScript strict mode, linter rules (`eslint-plugin-playwright`), and code reviews.'
    ]
  }
];

// ==========================================
// MODULE 14: GIT, JENKINS, CI/CD & DOCKER (16 Topics)
// ==========================================
export const M14_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm14-1',
    title: 'Git basics: clone, add, commit, push',
    description: 'Core version control commands and Git hygiene.',
    details: [
      'Clone repositories, commit atomic changes with clear messages, and push branches to remote remotes.'
    ]
  },
  {
    id: 'm14-2',
    title: 'Branches, merge and merge conflicts',
    description: 'Feature branching, resolving merge conflicts, and rebase strategies.',
    details: [
      'Create feature branches (`git checkout -b feature/test-auth`), rebase onto main, and resolve conflicts cleanly.'
    ]
  },
  {
    id: 'm14-3',
    title: 'GitHub pull requests and code reviews',
    description: 'Automating automated status checks on pull requests.',
    details: [
      'Require Playwright CI checks to pass before merging pull requests into main.'
    ]
  },
  {
    id: 'm14-4',
    title: 'GitHub Actions workflow YAML',
    description: 'Writing syntax for triggers, jobs, steps, matrices, and runners.',
    details: [
      'Define automated CI pipelines in `.github/workflows/playwright.yml`.'
    ]
  },
  {
    id: 'm14-5',
    title: 'Jenkins pipeline basics',
    description: 'Declarative Jenkinsfiles with stage("Test") and parallel execution.',
    details: [
      'Run Playwright tests inside Jenkins declarative pipelines with Docker agents.'
    ]
  },
  {
    id: 'm14-6',
    title: 'Running Playwright in CI',
    description: 'Executing tests reliably in headless Linux environments.',
    details: [
      'Set `CI: true` environment variable to enable retries, HTML reporting, and forbid `.only` blocks.'
    ]
  },
  {
    id: 'm14-7',
    title: 'Installing browsers in CI',
    description: 'npx playwright install --with-deps for Linux system library dependencies.',
    details: [
      '`--with-deps` installs missing Linux system libraries (libgtk, libasound, libnss) required for headless browsers.'
    ]
  },
  {
    id: 'm14-8',
    title: 'Environment secrets and credentials',
    description: 'Injecting ${{ secrets.API_KEY }} into CI runners securely.',
    details: [
      'Pass secrets via GitHub Actions secrets into `env` blocks without printing to console logs.'
    ]
  },
  {
    id: 'm14-9',
    title: 'Docker fundamentals',
    description: 'Containers, images, volumes, and running hermetic test environments.',
    details: [
      'Docker containers provide hermetic execution with identical fonts, operating system libraries, and rendering.'
    ]
  },
  {
    id: 'm14-10',
    title: 'Playwright Docker images',
    description: 'Using official mcr.microsoft.com/playwright:v1.40.0-jammy containers.',
    details: [
      'Official Microsoft Docker images have all browser engines pre-installed, skipping the 300MB download on every run.'
    ]
  },
  {
    id: 'm14-11',
    title: 'Linux commands and shell basics',
    description: 'Essential bash commands (grep, curl, export, chmod, env).',
    details: [
      'Script setup commands, environment variables, and artifact copying in CI runner shell scripts.'
    ]
  },
  {
    id: 'm14-12',
    title: 'Artifacts, reports and trace retention',
    description: 'Uploading playwright-report and traces using actions/upload-artifact.',
    details: [
      'Upload HTML reports and `trace.zip` files with `actions/upload-artifact@v4` with 30-day retention.'
    ]
  },
  {
    id: 'm14-13',
    title: 'Scheduled and pull-request test runs',
    description: 'Triggering regression suites via cron schedules and push events.',
    details: [
      'Configure nightly regression runs via cron: `schedule: [{ cron: "0 2 * * *" }]`.'
    ]
  },
  {
    id: 'm14-14',
    title: 'Parallel CI execution',
    description: 'Using GitHub Actions matrix runners to distribute shards.',
    details: [
      'Matrix strategy running shards 1/4, 2/4, 3/4, 4/4 concurrently across separate virtual machines.'
    ]
  },
  {
    id: 'm14-15',
    title: 'Failure notifications',
    description: 'Broadcasting test failures to Slack or Microsoft Teams via webhooks.',
    details: [
      'Send immediate webhook alerts containing failed test names and links to the HTML report artifact.'
    ]
  },
  {
    id: 'm14-16',
    title: 'CI debugging and environment differences',
    description: 'Diagnosing fonts, timezone, and network differences between local and CI.',
    details: [
      'Diagnose why tests pass on Mac/Windows but fail on Ubuntu (font antialiasing, timezone, CPU constraints).'
    ]
  }
];

// ==========================================
// MODULE 15: ADVANCED, AI & INTERVIEW (20 Topics)
// ==========================================
export const M15_SUBTOPICS: SubtopicItem[] = [
  {
    id: 'm15-1',
    title: 'Flaky tests: root causes and prevention',
    description: 'Systematic diagnosis of timing, state pollution, and network race conditions.',
    details: [
      'Identify root causes: lack of web-first assertions, non-unique test data, and un-waited background network calls.'
    ]
  },
  {
    id: 'm15-2',
    title: 'Debugging with Playwright Inspector',
    description: 'PWDEBUG=1 step-by-step interactive debugger and action recording.',
    details: [
      'Set `PWDEBUG=1` to open the visual step-by-step debugger with locator picking.'
    ]
  },
  {
    id: 'm15-3',
    title: 'Debugging with VS Code',
    description: 'Using official Playwright VS Code extension with live breakpoints and picking locators.',
    details: [
      'Set inline breakpoints, step over actions, view locator highlights in real time, and run single tests directly from the editor.'
    ]
  },
  {
    id: 'm15-4',
    title: 'Debugging using Trace Viewer',
    description: 'Scrubbing through DOM snapshots and network calls in trace.playwright.dev.',
    details: [
      'Inspect before/after DOM snapshots, network waterfall, console logs, and exact mouse coordinates at failure.'
    ]
  },
  {
    id: 'm15-5',
    title: 'Retries vs fixing the root cause',
    description: 'Why retries mask underlying design defects and when retries are acceptable.',
    details: [
      'Retries are a temporary CI safety net, not a permanent fix for race conditions or data collisions.'
    ]
  },
  {
    id: 'm15-6',
    title: 'Test stability and reliability metrics',
    description: 'Tracking pass rate, flake percentage, and execution duration trends.',
    details: [
      'Track 99%+ pass rates and alert on tests that pass only on retries.'
    ]
  },
  {
    id: 'm15-7',
    title: 'Cross-browser testing',
    description: 'Handling browser-specific quirks across Chromium, WebKit, and Firefox.',
    details: [
      'Address date picker differences, WebKit flexbox rendering, and Firefox clipboard permissions.'
    ]
  },
  {
    id: 'm15-8',
    title: 'Mobile emulation',
    description: 'Testing touch gestures, mobile viewports, and orientation changes.',
    details: [
      'Emulate touch events, device pixel ratio, and mobile viewports with `devices["Pixel 7"]`.'
    ]
  },
  {
    id: 'm15-9',
    title: 'Accessibility and performance checks',
    description: 'Integrating axe-core and Core Web Vitals profiling into regression runs.',
    details: [
      'Run automated axe-core accessibility scans and check Largest Contentful Paint (LCP) performance metrics.'
    ]
  },
  {
    id: 'm15-10',
    title: 'Database validation with SQL',
    description: 'Querying PostgreSQL/MySQL directly in test steps to verify backend state.',
    details: [
      'Query the database directly using Node.js `pg` or `mysql2` to assert data integrity without waiting for the UI.'
    ]
  },
  {
    id: 'm15-11',
    title: 'End-to-end workflow automation',
    description: 'Complex multi-step journeys spanning email verification, payment, and invoices.',
    details: [
      'Test complete user journeys: register account -> check email inbox via API -> verify link -> purchase.'
    ]
  },
  {
    id: 'm15-12',
    title: 'Role-based access and multi-user workflows',
    description: 'Testing concurrent collaborator interactions across isolated BrowserContexts.',
    details: [
      'Simulate an Admin assigning a ticket and a Customer receiving it in real-time across two BrowserContexts.'
    ]
  },
  {
    id: 'm15-13',
    title: 'Security considerations in test automation',
    description: 'Preventing credential leaks, managing API secrets, and testing CSP headers.',
    details: [
      'Never commit production credentials; ensure automated tests do not bypass Content Security Policy headers.'
    ]
  },
  {
    id: 'm15-14',
    title: 'Playwright MCP server',
    description: 'Connecting LLMs to live browser automation using the Model Context Protocol.',
    details: [
      'The Model Context Protocol (MCP) allows AI models to control browser sessions, query the DOM accessibility tree, and perform actions directly.'
    ]
  },
  {
    id: 'm15-15',
    title: 'Playwright Agents',
    description: 'Autonomous browser agents that navigate, plan actions, and inspect state.',
    details: [
      'AI agents that dynamically plan steps, explore user flows, and report visual and functional defects.'
    ]
  },
  {
    id: 'm15-16',
    title: 'Agent planning, generation and healing',
    description: 'Self-healing locators and autonomous recovery when DOM selectors change.',
    details: [
      'AI models analyze accessibility trees to identify target buttons even when underlying CSS classes or tag names shift.'
    ]
  },
  {
    id: 'm15-17',
    title: 'AI-assisted test creation and debugging',
    description: 'Leveraging LLMs for test generation, code reviews, and failure root-cause analysis.',
    details: [
      'Pass failure traces and DOM snapshots to LLMs to automatically diagnose root causes and suggest code fixes.'
    ]
  },
  {
    id: 'm15-18',
    title: 'Coding problems in TypeScript',
    description: 'Classic algorithmic problems asked in automation coding rounds (strings, arrays, promises).',
    details: [
      'Practice reverse string, array deduplication, anagram detection, and async retry utilities in TypeScript.'
    ]
  },
  {
    id: 'm15-19',
    title: 'Real-time production troubleshooting scenarios',
    description: 'Diagnosing flaky tests during live releases and emergency hotfix verification.',
    details: [
      'How to triage CI blockers, isolate environmental flakes, and run targeted smoke suites during production deploys.'
    ]
  },
  {
    id: 'm15-20',
    title: 'Framework architecture and project explanation',
    description: 'How to describe your test automation framework structure in senior interviews.',
    details: [
      'Articulate your framework in 5 clear layers: Runner/Config, POM/Components, Fixture DI, Data Factories, and CI/CD pipelines.'
    ]
  }
];
