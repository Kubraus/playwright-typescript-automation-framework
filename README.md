# Playwright TypeScript Automation Framework

## Project Overview

This project is a test automation framework built with Playwright and TypeScript.

It demonstrates modern test automation practices by combining UI testing, API testing, and end-to-end business workflows in a clean and maintainable architecture.

The framework follows industry best practices such as the Page Object Model (POM), reusable fixtures, API abstraction, test data generation, and clear separation of responsibilities.

It was created as a portfolio project to demonstrate my approach to designing a well-structured automation framework from scratch, with a strong focus on code quality, reusability, maintainability, and clear separation of responsibilities.

## Why this project?

I created this project to deepen my knowledge of Playwright and TypeScript by designing and implementing a complete automation framework.

My goal was not only to automate tests, but also to apply software engineering principles such as modular architecture, maintainability, and code reusability.

## Features

| Feature             | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| UI Testing          | Automates end-to-end browser scenarios using Playwright           |
| API Testing         | Validates REST API endpoints independently from the UI            |
| Business Flows      | Combines API and UI interactions into reusable business scenarios |
| Page Object Model   | Encapsulates page elements and user interactions                  |
| Fixtures            | Provides reusable test setup and dependency injection             |
| Test Data Generator | Creates unique test data using Faker                              |
| HTML Reports        | Generates Playwright HTML execution reports                       |
| ESLint & Prettier   | Ensures consistent code quality and formatting                    |

## Tech Stack

| Technology     | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| Playwright     | Browser automation, API testing, fixtures, assertions, and test reporting |
| TypeScript     | Static typing and maintainable test code                                  |
| Node.js        | Runtime environment for the automation framework                          |
| Faker          | Generation of unique and dynamic test data                                |
| dotenv         | Loading environment-specific configuration                                |
| ESLint         | Static code analysis and enforcement of coding standards                  |
| Prettier       | Consistent automatic code formatting                                      |
| GitHub Actions | Continuous integration and automated test execution                       |

## Project Structure

The project is organized into dedicated layers to keep test code modular, readable, and easy to maintain.

```text
.
├── .github
│   └── workflows
├── src
│   ├── api
│   ├── components
│   ├── config
│   ├── fixtures
│   ├── flows
│   ├── pages
│   ├── test-data
│   └── types
├── tests
│   └── api
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

| Directory           | Purpose                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `.github/workflows` | Contains GitHub Actions workflows responsible for continuous integration and automated test execution. |
| `src/api`           | Provides reusable API clients and methods for interacting with REST endpoints.                         |
| `src/components`    | Contains reusable UI components shared across multiple pages.                                          |
| `src/config`        | Stores environment configuration and framework settings.                                               |
| `src/fixtures`      | Defines reusable Playwright fixtures and dependency injection for tests.                               |
| `src/flows`         | Encapsulates reusable business workflows that combine multiple UI and API operations.                  |
| `src/pages`         | Contains Page Object Model classes responsible for page locators and interactions.                     |
| `src/test-data`     | Stores reusable test data, generators, and data-related utilities.                                     |
| `src/types`         | Contains TypeScript interfaces and types used across the framework.                                    |
| `tests`             | Contains UI, API, and end-to-end test specifications.                                                  |
| `tests/api`         | Contains tests focused specifically on REST API validation.                                            |

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
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

The framework is now ready to use.

## Environment Configuration

The framework uses a `.env` file to manage environment-specific configuration.

Create a `.env` file in the project root with the required variables:

```env
BASE_URL=https://demo.realworld.show
API_URL=https://api.realworld.show/api
```

| Variable   | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| `BASE_URL` | Base URL of the web application used for UI tests.                    |
| `API_URL`  | Base URL of the REST API used for API testing and business workflows. |

## Available Scripts

| Command               | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `npm test`            | Runs the complete Playwright test suite.                    |
| `npm run test:headed` | Runs tests in headed mode.                                  |
| `npm run test:api`    | Runs API tests only.                                        |
| `npm run test:all`    | Runs all tests using a single worker for maximum stability. |
| `npm run test:debug`  | Runs tests in Playwright Inspector.                         |
| `npm run report`      | Opens the Playwright HTML report.                           |
| `npm run lint`        | Runs ESLint.                                                |
| `npm run format`      | Formats the project using Prettier.                         |
| `npm run typecheck`   | Runs TypeScript type checking.                              |
| `npm run check`       | Formats, lints, and type-checks the project.                |

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

## Reports

The framework uses the built-in Playwright HTML Reporter.

After executing the test suite, an interactive HTML report can be opened using:

```bash
npm run report
```

The report includes:

- Test execution summary
- Passed and failed tests
- Error details
- Execution time
- Screenshots and traces (when available)

## Lessons Learned

Building this framework provided valuable experience beyond writing automated tests.

Some of the most important lessons learned include:

- Designing a maintainable automation architecture from scratch.
- Applying software engineering principles to test automation.
- Separating business logic from UI interactions.
- Building reusable API and business flow layers.
- Structuring Playwright projects for long-term maintainability.
- Configuring code quality tools such as ESLint and Prettier.
- Integrating GitHub Actions for continuous integration.
- Understanding the challenges of testing against public demo environments.

## Future Improvements

Potential future enhancements include:

- AI-assisted test data generation.
- AI-powered test failure analysis.
- File upload and download testing.
- CSV import and export validation.
- Docker support for local execution.
- Cross-browser execution in CI.
- Performance and accessibility testing.
- Additional end-to-end business scenarios.

---

This project is actively maintained as part of my professional portfolio and continuous learning journey in Playwright, TypeScript, and modern test automation.
