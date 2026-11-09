# Playwright TypeScript Automation Framework

## Project Overview

This project is a test automation framework built with Playwright and TypeScript.

It demonstrates modern test automation practices by combining UI testing, API testing, and end-to-end business workflows in a clean and maintainable architecture.

The framework follows industry best practices such as the Page Object Model (POM), reusable fixtures, API abstraction, test data generation, and clear separation of responsibilities.

It was created as a portfolio project to demonstrate my approach to designing a well-structured automation framework from scratch, with a strong focus on code quality, reusability, maintainability, and clear separation of responsibilities.

## Why this project?

I created this project to deepen my knowledge of Playwright and TypeScript by designing and implementing a complete automation framework.

The goal was to build something closer to a real-world automation framework used in a professional project than a collection of demo tests.

## Features

| Feature                    | Purpose                                                                        |
| -------------------------- | ------------------------------------------------------------------------------ |
| UI Testing                 | Automates end-to-end browser scenarios using Playwright                        |
| Cross-Browser Testing      | Runs UI tests across Chromium, Firefox, and WebKit                             |
| Multi-Tab Testing          | Validates new browser tabs using Playwright popup and browser context events   |
| File Upload Testing        | Validates CSV uploads, including successful uploads and file size restrictions |
| File Download Testing      | Validates browser downloads, filenames, and downloaded file content            |
| API Testing                | Validates REST API endpoints independently from the UI                         |
| Business Flows             | Combines API and UI interactions into reusable business scenarios              |
| Page Object Model          | Encapsulates page elements and user interactions                               |
| Fixtures                   | Provides reusable test setup and dependency injection                          |
| Test Data Generator        | Creates unique test data using Faker                                           |
| AI Failure Analyzer        | Analyzes final test failures using AI and generates structured failure reports |
| Secret Redaction           | Sanitizes sensitive data before failure context is sent for AI analysis        |
| HTML Reports               | Generates Playwright HTML execution reports                                    |
| GitHub Actions & GitLab CI | Runs automated checks and test execution in CI pipelines                       |
| ESLint & Prettier          | Ensures consistent code quality and formatting                                 |

## Tech Stack

| Technology     | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| Playwright     | Browser automation, API testing, fixtures, assertions, and test reporting |
| TypeScript     | Static typing and maintainable test code                                  |
| Node.js        | Runtime environment for the automation framework                          |
| OpenAI API     | AI-powered analysis of Playwright test failures                           |
| Faker          | Generation of unique and dynamic test data                                |
| dotenv         | Loading environment-specific configuration                                |
| ESLint         | Static code analysis and enforcement of coding standards                  |
| Prettier       | Consistent automatic code formatting                                      |
| GitHub Actions | Continuous integration and automated test execution                       |
| GitLab CI      | Continuous integration, automated test execution, and artifact collection |

## Project Structure

```text
playwright-typescript-automation-framework/
│
├── src/
│   ├── ai/
│   │   ├── failure-analyzer.ts
│   │   ├── openai-client.ts
│   │   ├── secret-redactor.ts
│   │   └── source-code-extractor.ts
│   │
│   ├── api/
│   │   ├── articles.api.ts
│   │   └── users.api.ts
│   │
│   ├── components/
│   │   └── header.component.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── fixtures/
│   │   └── test.fixture.ts
│   │
│   ├── flows/
│   │   └── realworld.flow.ts
│   │
│   ├── pages/
│   │   ├── article.page.ts
│   │   ├── base.page.ts
│   │   ├── editor.page.ts
│   │   ├── file-download.page.ts
│   │   ├── file-upload.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── profile.page.ts
│   │   ├── settings.page.ts
│   │   └── signUp.page.ts
│   │
│   ├── reporters/
│   │   └── ai-failure-reporter.ts
│   │
│   ├── test-data/
│   │   ├── files/
│   │   │   ├── contacts.csv
│   │   │   └── large-file.csv
│   │   ├── article.data.ts
│   │   └── user.data.ts
│   │
│   └── types/
│
├── tests/
│   ├── api/
│   │   ├── articles.api.spec.ts
│   │   └── users.api.spec.ts
│   ├── unit/
│   │   └── secret-redactor.spec.ts
│   ├── file-download.spec.ts
│   ├── file-upload.spec.ts
│   └── *.spec.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .gitlab-ci.yml
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

| Directory / File    | Purpose                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `.github/workflows` | Contains GitHub Actions workflows responsible for continuous integration and automated test execution. |
| `.gitlab-ci.yml`    | Defines the GitLab CI pipeline, automated checks, test execution, and artifact collection.             |
| `src/ai`            | Contains AI failure analysis, OpenAI integration, secret redaction, and source code extraction.        |
| `src/api`           | Provides reusable API clients and methods for interacting with REST endpoints.                         |
| `src/components`    | Contains reusable UI components shared across multiple pages.                                          |
| `src/config`        | Stores environment configuration and framework settings.                                               |
| `src/fixtures`      | Defines reusable Playwright fixtures and dependency injection for tests.                               |
| `src/flows`         | Encapsulates reusable business workflows that combine multiple UI and API operations.                  |
| `src/pages`         | Contains Page Object Model classes responsible for page locators and interactions.                     |
| `src/reporters`     | Contains custom Playwright reporters, including AI-assisted failure reporting.                         |
| `src/test-data`     | Stores reusable test data, generators, and data-related utilities.                                     |
| `src/types`         | Contains TypeScript interfaces and types used across the framework.                                    |
| `tests`             | Contains UI, API, end-to-end, and unit test specifications.                                            |
| `tests/api`         | Contains tests focused specifically on REST API validation.                                            |
| `tests/unit`        | Contains focused unit tests for framework utilities and components.                                    |

## Installation

Clone the repository:

```bash
git clone https://github.com/Kubraus/playwright-typescript-automation-framework.git
```

Navigate to the project directory:

```bash
cd playwright-typescript-automation-framework
```

Install project dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

The framework is now ready to use.

## Environment Configuration

Create a `.env` file in the project root.

```env
BASE_URL=https://demo.realworld.show
API_URL=https://api.realworld.show/api
# Optional - required only for AI failure analysis
OPENAI_API_KEY=your_openai_api_key
```

| Variable         | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `BASE_URL`       | Base URL of the web application used for UI tests.    |
| `API_URL`        | Base URL used by the framework for API communication. |
| `OPENAI_API_KEY` | Optional API key used by the AI Failure Analyzer.     |

The `OPENAI_API_KEY` is optional for normal test execution. If it is not configured, the test suite can still run, but AI failure analysis will not be generated.

Environment files and API keys must not be committed to the repository. In CI, the OpenAI API key should be provided through protected CI/CD secrets or variables rather than stored in source code.

## Available Scripts

| Command                   | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `npm test`                | Runs the complete Playwright test suite.                |
| `npm run test:headed`     | Runs tests in headed mode.                              |
| `npm run test:api`        | Runs API tests only.                                    |
| `npm run test:smoke`      | Runs tests tagged with `@smoke`.                        |
| `npm run test:regression` | Runs the complete regression test suite.                |
| `npm run test:stable`     | Runs tests using a single worker for maximum stability. |
| `npm run test:debug`      | Runs tests in Playwright Inspector.                     |
| `npm run report`          | Opens the Playwright HTML report.                       |
| `npm run lint`            | Runs ESLint.                                            |
| `npm run format`          | Formats the project using Prettier.                     |
| `npm run typecheck`       | Runs TypeScript type checking.                          |
| `npm run check`           | Formats, lints, and type-checks the project.            |
| `npm run build`           | Compiles the TypeScript project.                        |

### Running Tests in a Specific Browser

UI tests can be executed against a specific browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

API and unit tests run only in the Chromium project to avoid duplicating browser-independent tests across projects.

## File Upload and Download Testing

The framework includes automated file upload and download scenarios using Playwright and TypeScript.

Both features follow the Page Object Model (POM) pattern and use custom Playwright fixtures for reusable page interactions.

### File Upload

File upload tests are executed against the [ExpandTesting practice application](https://practice.expandtesting.com/upload).

The scenarios cover:

- Successful upload of a valid CSV file.
- Validation of the uploaded filename.
- Rejection of CSV files exceeding the application's 500 KB size limit.
- Cross-browser execution using Chromium, Firefox, and WebKit.

**Known issue:** The external ExpandTesting application exhibits environment-dependent behavior when validating oversized CSV uploads in WebKit. During local testing on Windows, the application accepted files exceeding 500 KB, while the same validation test passed in GitHub Actions on Ubuntu. The test retains its strict assertion across all three browsers to make such differences visible.

### File Download

The file download test uses an isolated HTML page with a `data:` URL to provide deterministic browser download behavior without relying on an external server.

The test validates:

- Download initiation using Playwright's `download` event.
- The suggested filename.
- Successful download completion.
- Saving the file to the test output directory.
- Exact content of the downloaded TXT file.

This scenario verifies browser download handling and file validation. It does not test a real HTTP file-download endpoint.

### Running File Tests

Run upload and download tests across all configured browser projects:

```bash
npx playwright test tests/file-upload.spec.ts tests/file-download.spec.ts
```

Run download tests in WebKit only:

```bash
npx playwright test tests/file-download.spec.ts --project=webkit
```

Repeat the download test to investigate stability:

```bash
npx playwright test tests/file-download.spec.ts --project=firefox --repeat-each=5
```

The file upload tests depend on the availability and behavior of the external ExpandTesting application. The isolated download test does not require an external application.

## Framework Architecture

The framework follows a layered architecture that separates test logic from UI interactions, API communication, and business workflows.

This approach improves maintainability, readability, scalability, and code reusability while keeping each layer focused on a single responsibility.

```text
                Test Specification
                        │
                        ▼
                  Playwright Fixture
                        │
                        ▼
                  Business Flow Layer
                 ┌────────┴────────┐
                 ▼                 ▼
          Page Object Layer     API Layer
                 │                 │
                 └────────┬────────┘
                          ▼
                 RealWorld Application
```

| Layer                   | Responsibility                                                                 |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Test Specification**  | Defines the test scenario and expected outcome without implementation details. |
| **Playwright Fixtures** | Provides reusable test setup and dependency injection.                         |
| **Business Flows**      | Encapsulates complete business scenarios by combining UI and API operations.   |
| **Page Objects**        | Encapsulate page locators and UI interactions following the Page Object Model. |
| **API Layer**           | Provides reusable methods for communicating with REST API endpoints.           |

## Design Decisions

The framework was designed with maintainability, scalability, and separation of responsibilities in mind.

### Business Flow Layer

Business Flows encapsulate complete user scenarios instead of exposing low-level UI interactions to tests.

This keeps test cases concise, easier to understand, and minimizes duplicated logic.

### Separate API Layer

REST API communication is isolated from UI interactions.

This enables API-only testing, simplifies test setup, and allows UI and API layers to evolve independently.

### Page Object Model

Page Objects are responsible only for page interactions and locators.

Business logic is intentionally kept outside of Page Objects to maintain clear responsibilities.

### Playwright Fixtures

Fixtures provide dependency injection and reusable test setup, reducing duplication and improving test readability.

### Environment Configuration

Environment-specific values are stored in a `.env` file, making the framework portable across different environments without code changes.

### Single Worker Execution

Although the framework supports parallel execution, the public RealWorld application occasionally becomes unstable under concurrent load.

For this reason, the default configuration uses a single worker to ensure stable and deterministic test execution.

### Timeout Configuration

The framework uses explicit timeout settings to control test execution and improve failure diagnostics:

| Setting            | Value      | Purpose                                   |
| ------------------ | ---------- | ----------------------------------------- |
| Test timeout       | 30 seconds | Maximum duration of an individual test    |
| Assertion timeout  | 5 seconds  | Maximum wait for an assertion to pass     |
| Action timeout     | 10 seconds | Maximum duration of browser actions       |
| Navigation timeout | 15 seconds | Maximum duration of navigation operations |

CI retries failed tests up to two times, while local execution runs without retries by default.

### Playwright Trace Viewer

Playwright Trace Viewer supports detailed investigation of test execution, including actions, locator resolution, auto-waiting behavior, network activity, and DOM snapshots.

Traces are collected automatically on the first retry. For local debugging, tracing can also be enabled explicitly:

```bash
npx playwright test tests/multiple-tabs.spec.ts --project=chromium --trace on
```

The resulting traces can be opened from the Playwright HTML report.

## AI Failure Analyzer

The framework includes a custom AI-powered failure analyzer integrated with the Playwright reporter lifecycle. It automatically collects diagnostic information from failed tests, sanitizes sensitive data, and uses the OpenAI API to generate a structured failure analysis.

### How It Works

```text
Failed / Timed-Out Test
          │
          ▼
AI Failure Reporter
          │
          ├── Error Message
          ├── Stack Trace
          └── Relevant Source Code
                    │
                    ▼
             Secret Redaction
                    │
                    ▼
               OpenAI API
                    │
                    ▼
         Structured AI Analysis
                    │
                    ▼
test-results/ai-failure-analysis.md
```

For each eligible failure, the analyzer:

1. Processes tests that finish with a `failed` or `timedOut` status.
2. Analyzes only the final failed attempt when Playwright retries are enabled, avoiding duplicate AI requests.
3. Prefers an error containing source location information and falls back to extracting the location from the stack trace.
4. Extracts the failing source line together with three lines before and after it to provide relevant code context.
5. Sanitizes the collected diagnostic data before it is included in the AI prompt.
6. Sends the sanitized failure context to the OpenAI API.
7. Generates a structured Markdown analysis containing:
   - Failure Summary
   - Evidence
   - Possible Causes
   - Suggested Next Steps

### Security and Reliability

The analyzer is designed so that AI integration does not become a dependency for successful test execution.

- Bearer tokens and supported password formats are redacted before diagnostic context is sent for analysis.
- ANSI terminal formatting is removed from error messages and stack traces.
- Source file extraction is restricted to files inside the project directory.
- AI requests have a 30-second timeout and API retries are disabled to avoid unnecessarily delaying the test run.
- Analyzer requests and responses are created with `store: false`.
- A maximum of five AI analyses can be started during a single test run to control API usage, cost, and execution time.
- AI analyses can run concurrently and the reporter waits for all started analyses using `Promise.allSettled()`.
- Failures in the AI integration are handled independently and do not cause the Playwright test suite to fail.
- If no valid AI analyses are produced, an outdated AI failure report is removed instead of being reused.

### AI Failure Report

When at least one analysis is successfully generated, the reporter creates:

```text
test-results/ai-failure-analysis.md
```

Each failed test receives its own section containing the structured AI analysis. In CI, the report can be collected as a pipeline artifact for later inspection.

The analyzer is intentionally diagnostic: the AI is instructed to base its conclusions only on the supplied failure evidence, distinguish facts from hypotheses, avoid inventing unsupported application behavior, and never recommend weakening secret sanitization.

## Multi-Tab Testing and Debugging

The framework includes browser tab handling tests in `tests/multiple-tabs.spec.ts`, using a public demo application to demonstrate Playwright's multi-page capabilities.

The tests cover:

- Opening and validating a new tab using `page.waitForEvent('popup')`.
- Detecting a new page using `browserContext.waitForEvent('page')`.
- Verifying elements in both the original and newly opened tabs.

### Playwright Trace Viewer

Playwright Trace Viewer supports detailed investigation of test execution, including actions, locator resolution, auto-waiting behavior, network activity, and DOM snapshots.

Traces are collected automatically on the first retry. For local debugging, tracing can also be enabled explicitly:

```bash
npx playwright test tests/multiple-tabs.spec.ts --project=chromium --trace on
```

The resulting traces can be opened from the Playwright HTML report.

## Reports

The framework provides two complementary reporting mechanisms.

### Playwright HTML Report

After a test run, Playwright generates its standard HTML report.

Open it with:

```bash
npm run report
```

or:

```bash
npx playwright show-report
```

The HTML report provides:

- Test execution results
- Failure details and stack traces
- Screenshots and traces when configured
- Retry information
- Test duration and execution metadata

### AI Failure Report

When the AI Failure Analyzer successfully processes one or more failures, it generates:

```text
test-results/ai-failure-analysis.md
```

The report complements the Playwright HTML report with structured AI-assisted diagnostics for failed tests.

It includes:

- A concise failure summary
- Evidence extracted from the test failure
- Possible causes supported by the available evidence
- Suggested diagnostic or corrective next steps

In CI, the AI failure report can be collected as a pipeline artifact together with the standard Playwright test artifacts.

## CI/CD

The framework includes CI pipelines for both GitHub Actions and GitLab CI.

The framework uses CI pipelines to automate project validation and test execution, helping detect code quality issues and test failures before changes are integrated.

### GitHub Actions

The GitHub Actions workflow is defined in:

```text
.github/workflows/playwright.yml
```

It provides automated test execution for the GitHub repository.

The GitHub Actions pipeline also executes file upload and download tests across Chromium, Firefox, and WebKit.

These tests cover successful CSV uploads, file size validation, browser download events, filename verification, and downloaded file content validation.

Playwright reports and test artifacts are uploaded after execution, including when tests fail, to support debugging and failure analysis.

### GitLab CI

The GitLab pipeline is defined in:

```text
.gitlab-ci.yml
```

The pipeline performs automated project validation and Playwright test execution. Test artifacts are preserved after execution so that reports and failure diagnostics can be inspected directly from the pipeline.

When the OpenAI API key is configured as a protected CI/CD variable, failed tests can also produce the AI-assisted failure report:

```text
test-results/ai-failure-analysis.md
```

The AI integration remains optional: missing or unsuccessful AI analysis does not prevent the Playwright test suite from completing normally.

## Lessons Learned

Building this framework provided valuable experience beyond writing automated tests.

Some of the most important lessons learned include:

- Designing a maintainable automation architecture from scratch.
- Applying software engineering principles to test automation.
- Separating business logic from UI interactions.
- Building reusable API and business flow layers.
- Structuring Playwright projects for long-term maintainability.
- Configuring code quality tools such as ESLint and Prettier.
- Integrating GitHub Actions and GitLab CI for continuous integration.
- Understanding the challenges of testing against public demo environments.
- Designing a resilient AI-assisted failure analysis workflow with secret sanitization and controlled API usage.

## Future Improvements

Planned improvements include:

- Multi-provider AI architecture with support for additional AI providers such as Anthropic Claude.
- Extended secret redaction for additional credential and token formats.
- Additional unit tests for AI analyzer components.
- Visual regression testing.
- Accessibility testing.
- Performance testing.
- Dockerized test execution.
- Parallel execution across CI workers.

---

This project is actively maintained as part of my professional portfolio and continuous learning journey in Playwright, TypeScript, and modern test automation.
