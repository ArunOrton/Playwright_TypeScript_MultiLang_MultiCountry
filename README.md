# TestAutomation — Project Overview

This repository contains an automated test framework using Playwright and a Page Object Model structure tailored for CCH test automation. The project is TypeScript-based and organizes tests, pages, locators, utilities, and test data to make writing, running, and maintaining tests straightforward.

## Quick summary

- Framework: Playwright with TypeScript
- Test style: Playwright Test runner, Page Object Model (pages + locators)
- Test files: `tests/`
- Page objects: `pages/`
- Locators: `locators/`
- Utilities & helpers: `utilities/`
- Environment/config files: `Playwright_configFiles/`

## Files & folders (high level)

- `tests/` — Playwright tests and base test setup (`baseTest.ts`).
- `pages/` — Page object classes (for pages such as login, dashboard, control page, etc.).
- `locators/` — Locator definitions per country/language and shared locators.
- `utilities/` — Helpers, constants, file readers, screenshots, and other utilities.
- `Playwright_configFiles/` — Playwright config variations used by the project, e.g. `playwright.config_CCC.ts`, `playwright.config_MDG.ts`, and `playwright.service.config.ts`.
- `scripts/` — project scripts such as `global-teardown.js`.
- `testData/` — test data per country and shared test data.
- `yaml/` — pipeline and test steps definitions used for CI.

## Prerequisites

- Node.js (recommended 16.x or later). If your environment requires a different Node version, align with the project CI settings.
- npm (or compatible package manager)

Note: Playwright and many dev deps require modern Node; Node 18+ is safe.

## Install

From the repository root:

```powershell
# install dependencies
npm ci
# or if you prefer
npm install
```

## Key npm scripts (from `package.json`)

You can run these scripts from the repository root using `npm run <script>`.

- `npm run teardown` — Runs `node scripts/global-teardown.js`.
- `npm test` — Runs `npx playwright test --headed=false` (default test run).
- `npm run TestCaseExecution` — Runs Playwright with `--project=TestCaseExecution` using `playwright.service.config.ts` with 5 workers.
- `npm run MdgCreate` — Runs Playwright with `--project=MdgCreate` using `playwright.service.config.ts` with 5 workers.
- `npm run lint` — Runs ESLint with `eslint.config.js` and auto-fix where possible.
- `npm run pre-push-msg` — Placeholder script that prints a pre-push message.

(Exact script details are read from `package.json` in the repo.)

## Running tests — common examples

Run the default tests (headless by default):

```powershell
npm test
```

Run the TestCaseExecution project (service config, parallel):

```powershell
npm run TestCaseExecution
```

Run the MDG create flows:

```powershell
npm run MdgCreate
```

Run Playwright directly and override flags (example, run headed):

```powershell
npx playwright test --headed
```

Run a single test file:

```powershell
npx playwright test tests/some.spec.ts
```

Run linting and auto-fix problems:

```powershell
npm run lint
```

## Configuration

- `Playwright_configFiles/` contains custom Playwright configs used across different CI or local runs. Choose the one matching the pipeline or execution mode. The `playwright.service.config.ts` file is used by some npm scripts for CI-style service runs.
- Environment variables are typically read using `dotenv`. See any `.env`-related usage in `utilities` or the test setup files. The codebase includes `auth-password-grant.ts` and other auth helpers for test sessions.

## Structure and conventions

- Page objects are located in `pages/` and should export classes that encapsulate page actions. Use `locators/` for selector definitions so tests remain readable and maintainable.
- Tests extend or use `baseTest.ts` in `tests/` to share fixtures and session setup.
- Country-specific test data and locators are separated into `testData/` and `locators/` subfolders.
- Reusable helpers (file handling, CSV readers, screenshot helpers, utils) live in `utilities/`.

## Adding a new test

1. Add any required test data to `testData/`.
2. Add page object or locator entries if needed (`pages/` or `locators/`).
3. Add a new Playwright test in `tests/` using the existing `baseTest` fixtures.
4. Run locally with `npm test` or targeted `npx playwright test tests/your.test.ts`.

## CI / Pipelines

This project includes pipeline YAML templates under `yaml/` for various jobs and country stages. The CI typically runs specific Playwright configs (see `Playwright_configFiles/`) and uses the `TestCaseExecution`/`MdgCreate` scripts for service-style executions.

## Troubleshooting

- If Playwright browsers are missing, run:

```powershell
npx playwright install
```

- If tests fail due to environment/config, verify environment variables and the config file (`Playwright_configFiles/*`).
- Check `scripts/global-teardown.js` if your test environment leaves sessions or resources behind.

## Notes & Tips

- The framework is organized to support multiple countries and locales via separate locator and test data files. When adding a new country, add its locators under `locators/` and its test data under `testData/`.
- Use the `utilities/` helpers (e.g., `screenshotHelper.ts`, `fileHandler.ts`) to keep tests concise and consistent.

## Files edited/created in this task

- `README_PROJECT.md` — New file added at repository root: full project overview and run instructions.

## What's next

- If you'd like, I can replace the existing `README.md` with this content (or merge parts into it), add a short `CONTRIBUTING.md`, or generate a small run script that wraps common `npx playwright` invocations.

---

If you want edits to the created README (shorter, more verbose, or targeted at new contributors vs. CI engineers), tell me which tone and I will update it. 