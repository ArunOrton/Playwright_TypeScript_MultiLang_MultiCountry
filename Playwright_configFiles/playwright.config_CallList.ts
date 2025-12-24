import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter'
import { defineConfig, devices } from '@playwright/test'
import { secondaryTestData } from './utilities/secondaryTestData'
import * as dotenv from 'dotenv'
dotenv.config()

const country = process.env.COUNTRY as string
const data =  secondaryTestData(country)
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright'],
    ['junit', { outputFile: './test-results/e2e-junit-results.xml' }],
    [
      '@alex_neo/playwright-azure-reporter',
      {
        orgUrl: 'https://dev.azure.com/CCHBC',
        token: process.env.AZURE_TOKEN,
        planId: 262353,
        projectName: 'CCH SAFe Portfolio',
        environment: 'QA',
        logging: true,
        testRunTitle: 'Playwright Test Run',
        publishTestResultsMode: 'testResult',
        uploadAttachments: true,
        attachmentsType: ['screenshot', 'video', 'trace'],
        testRunConfig: {
          owner: {
            displayName: 'Prabhat Kumar',
          },
          comment: 'Playwright Test Run',
          // the configuration ids of this test run, use
          // https://dev.azure.com/{organization}/{project}/_apis/test/configurations to get the ids of  your project.
          // if multiple configuration ids are used in one run a testPointMapper should be used to pick the correct one,
          // otherwise the results are pushed to all.
          configurationIds: [data.configurationID], //D365_Sales_And_Cases
          // configurationIds: [2],
        },
      } as AzureReporterOptions,
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on',
    actionTimeout: 60000,
    navigationTimeout: 60000

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'GetSecrets',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome'
      },
      testMatch: /.*loadSecrets\.setup\.ts/,
    },
    {
      name: 'setup',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome'
      },
      dependencies: ['GetSecrets'],
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: process.env.AUTH_FILE,
      },
      dependencies: ['setup'],
      timeout: 1000000,
    },
    {
      name: 'sanity',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.AUTH_FILE },
      dependencies: ['setup'],
      testMatch: 'tests/sanity/*.spec.ts',
    },
    {
      name: 'callLists',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.AUTH_FILE },
      dependencies: ['setup'],
      testMatch: 'tests/callLists/*.spec.ts', // Assuming you have a setup file
    }, {
      name: 'automatedScheduleValidation',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.AUTH_FILE },
      dependencies: ['setup'],
      testMatch: 'tests/automatedScheduleValidation/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'userConfiguration',
      use: { ...devices['Desktop Chrome'],  channel: 'chrome' },
      testMatch: 'tests/userConfiguration.spec.ts', // Assuming you have a setup file
    },

    //  {
    //      name: 'Microsoft Edge',
    //      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //      timeout:500000,
    //    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})