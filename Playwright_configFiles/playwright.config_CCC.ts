import { defineConfig } from '@playwright/test'
import devices from '@playwright/test'
import * as dotenv from 'dotenv'
import { joinTestCaseNamesByIds, secondaryTestData } from './utilities/utilitiesImports'
import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter'
dotenv.config()

const country = process.env.COUNTRY as string
const data =  secondaryTestData(country)


let NAMEOFTHETESTCASES : string[] = []
let configurationIds :Number[] = []
if(process.env.REQUIREDD365 && process.env.REQUIREDD365 === 'True') {
  configurationIds  = data.e2eConfigurationID.split(',').map(id => Number(id.trim()))
}
else if(process.env.REQUIREDD365API && process.env.REQUIREDD365API === 'True') {
  configurationIds  = data.decoupleConfigurationID.split(',').map(id => Number(id.trim()))
}


console.log(`---ENV Running Country: ${process.env.COUNTRY} and Execution Type ${process.env.TESTTYPE} ---`)
console.log(`---ENV Direct Account: ${process.env.DIRECT_ACCOUNTNUMBERS}  In-Direct Account: ${process.env.INDIRECT_ACCOUNTNUMBERS} ---`)
console.log(`---ENV D365 UI: ${process.env.REQUIREDD365} / D365 API: ${process.env.REQUIREDD365API} ---`)
console.log(`---ENV SAP  SAP-CRM : ${process.env.REQUIREDSAP} / MDG : ${process.env.REQUIREDMDG} ---`)
console.log(`---ENV TESTDATA FORMAT: ${process.env.TESTDATA} / Test configuration:${data.configurationID} / convert : ${configurationIds}/ TESPLANTYPE Value: ${process.env.TESTPLANTYPE} `)

NAMEOFTHETESTCASES = joinTestCaseNamesByIds()
console.log(`---ENV D365SUITE: ${process.env.testName} TESTCASEID: ${process.env.TESTCASEID} Name of the Testcase :${NAMEOFTHETESTCASES} ---`)


export default defineConfig({
  testDir: './tests',
  expect: { timeout: 10000 },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
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
        planId: 578336,
        projectName: 'CCH SAFe Portfolio',
        environment: 'QA',
        logging: true,
        testRunTitle: 'Playwright Test Run',
        publishTestResultsMode: 'testResult',
        uploadAttachments: true,
        attachmentsType: ['screenshot', 'video', 'trace'],
        testRunConfig: {
          owner: {
            displayName: 'Swathi Deivendiran',
          },
          comment: 'Playwright Test Run',
          // the configuration ids of this test run, use
          // https://dev.azure.com/{organization}/{project}/_apis/test/configurations to get the ids of  your project.
          // if multiple configuration ids are used in one run a testPointMapper should be used to pick the correct one,
          // otherwise the results are pushed to all.
          configurationIds: configurationIds,
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
    video: 'on',
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    actionTimeout: 60000,
    navigationTimeout: 60000,
    permissions: [],
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled'],
    }
  },

  /* Configure projects for major browsers */
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome'
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'TestCaseExecution',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: NAMEOFTHETESTCASES, // Assuming you have a setup file
    },
    {
      name: 'OtherMDRequest',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/autoApproval/others/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'contacts',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/autoApproval/contacts/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'PartnerMDRequest',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/autoApproval/partner/**/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'appointments',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/d365Approval/appointments/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'bpTerritory',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/d365Approval/bpTerritory/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'customerGroup4',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/d365Approval/customerGroup4/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'marketingAttribute',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/d365Approval/marketingAttribute/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'rtmApprovalReject',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/d365Approval/rtmApprovalReject/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'approval',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/bsoApproval/approval/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'rejection',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/bsoApproval/rejection/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'MDRequest',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/**/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'bank',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/functional/autoApproval/bank/*.spec.ts', // Assuming you have a setup file
    },
    {
      name: 'sanity',
      use: { ...devices['Desktop Chrome'],  storageState: process.env.D365_AUTH_FILE, channel: 'chrome' },
      dependencies: ['setup'],
      testMatch: 'tests/sanity/*.spec.ts', // Assuming you have a setup file
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})