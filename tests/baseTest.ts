import { test, expect, Page, TestInfo } from '@playwright/test'
import { Login } from '../pages/pageImports'
import { loginData } from '../testData/login_TestData'
import {  selectLangLocators, CustomNumeric, updateTagForTest, credentials, utils, TimeoutConstants,
  readTestCasesFromExcel, findCluster, waitForPopUpDisappear, readTestDataColumnFromExcel, excelToObject, Record, 
  secondaryTestData} from '../utilities/utilitiesImports'


import { commonLocators } from '../locators/commonLocators.ts'
import { Context } from 'vm'




/**
 * Logs in to Dynamics 365 and launches the URL, optionally saving the session.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @param {boolean} [isSaveSession=true] - Whether to save the session state (default is true).
 *
 *  * This function navigates to the D365 URL, performs login using the provided credentials,
 * and waits for the URL to load. If `isSaveSession` is true, it saves the session state
 * to the specified path in the environment variable `AUTH_FILE`.
 * @param {string} testInfoParam - The information of the testCase.
 */
async function d365LoginFunc(page: Page, isSaveSession:boolean = true, testInfoParam: TestInfo) {
  await test.step('D365Login and URL Launch', async()=>{
    console.log('D365Login Base setup: Started.')
    await page.goto(utils.url, { timeout: 120000 })
    await page.waitForURL(utils.url, { timeout: 120000 })
    const fn = new D365Login(page, testInfoParam)
    await fn.microsoftLogin(credentials.username, credentials.password)
    await page.waitForURL(utils.urlApps, {  timeout: TimeoutConstants.TIMEOUT_5_MINS })
    console.log(`Get URL after Login: ${page.url()}`)
    // Wait for the 'App Busy' loading cursor to disappear before the app tile is displayed
    await waitForPopUpDisappear(page)
    const dashboard = new Dashboard(page)
    await dashboard.openSalesHubFromBaseSession()
    if(isSaveSession) {
      await page.context().storageState({ path: process.env.D365_AUTH_FILE })
    }
    console.log('Base setup: Completed.')
  })
}

/**
 *
 * **
 * Logs in to SAP and launches the URL, optionally saving the session.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @param {TestInfo} testInfo - The information of the test.
 * @param {boolean} [isSaveSession=true] - Whether to save the session state (default is true).
 *
 *  * This function navigates to the SAP URL based on the cluster defined in the env file, performs login using the provided credentials,
 * and waits for the URL to load. If `isSaveSession` is true, it saves the session state
 * to the specified path in the environment variable `AUTH_FILE`.
 */
async function sapLoginFunc(page: Page, testInfo: TestInfo, isSaveSession:boolean = true) {
  await test.step('SapLogin and URL Launch', async()=>{
    console.log('Base SapLogin setup: Started.')
    const cluster = await findCluster()
    let url = ''
    if(cluster == 'cluster1') {
      url = utils.r02
    }
    else {
      url = utils.r03
    }
    console.log(`Base SapLogin setup for cluster ${cluster} and URL : ${url}: Started.`)
    await page.goto(url, { timeout: 120000 })

    const sapLoginObj = new Sap(page, testInfo)
    await sapLoginObj.sapLogin(credentials.sapUser, credentials.sapPass, '&sap-client=400&sap-language=EN#Shell-home')

    // Wait for the specific URL to load with an extended timeout (10 minutes = 600000 milliseconds)
    await page.waitForURL(new RegExp('&sap-client=400&sap-language=EN#Shell-home'), { timeout: 120000 })

    if(isSaveSession) {
      await page.context().storageState({ path: process.env.SAP_AUTH_FILE })
    }
    console.log('Base SapLogin setup: Completed.')
  })
}

/**
 *
 * **
 * Logs in to SAP and launches the URL, optionally saving the session.
 *
 * @param {Page} page - The Playwright page object representing the browser page.
 * @param {string} testInfo - The information of the test.
 * @param {boolean} [isSaveSession=true] - Whether to save the session state (default is true).
 *
 *  * This function navigates to the SAP URL based on the cluster defined in the env file, performs login using the provided credentials,
 * and waits for the URL to load. If `isSaveSession` is true, it saves the session state
 * to the specified path in the environment variable `AUTH_FILE`.
 */
async function mdgLoginFunc(page: Page, testInfo : TestInfo, isSaveSession:boolean = true) {
  await test.step('MDG login and URL Launch', async()=>{
    console.log('Base MDG Login setup: Started.')
    // const cluster = await findCluster()
    // if(cluster == 'cluster1') {
    //   await page.goto(utils.r02)
    // }
    // else {
    //   await page.goto(utils.r03)
    // }
    await page.goto(utils.mdgUrl, { timeout: 120000 })
    const mdgLoginObj = new Sap(page, testInfo)
    await mdgLoginObj.sapLogin(credentials.mdgUser, credentials.mdgPass, 'saml2=disabled&sap-client=400&sap-language=EN#Shell')
    await mdgLoginObj.ClickMDG()

    // Wait for the specific URL to load with an extended timeout (10 minutes = 600000 milliseconds)
    //await page.waitForURL(new RegExp('&saml2=disabled#Shell-home'), { timeout: 600000 })

    if(isSaveSession) {
      await page.context().storageState({ path: process.env.MDG_AUTH_FILE })
    }
    console.log('Base MdgLogin setup: Completed.')
  })
}

/**
 * Closes the provided page and context, and logs the cleanup process.
 *
 * @param {Page} page - The Playwright page object to be closed.
 * @param {Context} context - The Playwright context object to be closed.
 */
async function pageAndContextCleanUp(page: Page, context : Context) {
  await test.step('PageAndContextCleanUp', async()=>{
    console.log('EPageAndContextCleanUp: Started.')
    try {
      await page.close()
      await context.close()
      console.log('PageAndContextCleanUp: Completed.')
    }
    catch{
      console.error('Failed to close browser or context.')
    }
  })
}

/**
 *Logs into the application using the provided credentials.
 * @param {Page} page - The page object for navigating to the login page.
 * @param {string} pageUrl - The URL of the login page.
 * @param {object} credentials - The login credentials containing username and password.
 * @param {TestInfo} testInfo - The information of the test.
 * @param {boolean} [isSaveSession=true] - Whether to save the session state after login.
 */
async function loginCredentialsPerformance(page: Page, pageUrl: string, credentials: any, testInfo: TestInfo, isSaveSession: boolean = true) {
  test.setTimeout(600000)
  await page.setViewportSize({ width: CustomNumeric.WIDTH, height: CustomNumeric.HEIGHT })
  await page.goto(pageUrl, { timeout: 120000 })

  const login = new Login(page)
  await login.loginCredentials(credentials.username, credentials.password)
  if(process.env.WITHCACHE && process.env.WITHCACHE === 'true') {
    const account = new Account(page, testInfo)
    await account.clickOnAccountAndSearchAllAccount()
  }

  // Wait for the specific URL to load with an extended timeout (10 minutes = 600000 milliseconds)
  if(isSaveSession) {
    await page.context().storageState({ path: process.env.D365_AUTH_FILE })
  }
  console.log('Login Success using session storage.')


}

/**
 *Logs into the application using the provided credentials.
 * @param {Page} page - The page object for navigating to the login page.
 * @param {string} pageUrl - The URL of the login page.
 * @param {object} credentials - The login credentials containing username and password.
 * @param {TestInfo} testInfo - The information of the test.
 * @param {boolean} [isSaveSession=true] - Whether to save the session state after login.
 */
async function AdminloginCredentialsPerformance(page: Page, pageUrl: string, credentials: any, testInfo: TestInfo, isSaveSession: boolean = true) {
  test.setTimeout(600000)
  await page.setViewportSize({ width: CustomNumeric.WIDTH, height: CustomNumeric.HEIGHT })
  await page.goto(pageUrl, { timeout: 120000 })

  const login = new Login(page)
  await login.loginCredentials(credentials.username, credentials.password)
  if(process.env.WITHCACHE && process.env.WITHCACHE === 'true') {
    const account = new Account(page, testInfo)
    await account.clickOnAccountAndSearchAllAccount()
  }

  // Wait for the specific URL to load with an extended timeout (10 minutes = 600000 milliseconds)
  if(isSaveSession) {
    await page.context().storageState({ path: process.env.D365ADMIN_AUTH_FILE })
  }
  console.log('Login Success using session storage.')


}
/**
 *Closes the browser and the associated context.
 * @param {Page} page - The page object that needs to be closed.
 * @param {Context} context - The browser context that needs to be closed.
 */
async function browserClose(page: Page, context : Context) {
  console.log('Executing afterEach hook: Started.')
  await page.close()
  await context.close()
  console.log('Executing afterEach hook: Completed.')
}

/**
 *
 */
function getTestDataLogin() {
  //const country = countryIdentification()
  //const language = languageSelection()

  const country = process.env.COUNTRY as string
  const language = process.env.LANGUAGE as string

  //const creditsKey = getMappedCountry(country)
  let countryBDUser
  if(loginData && loginData[country]) {
    countryBDUser = loginData[country]
  } else {
    console.error(`No credentials found for the country: ${country}`)
    countryBDUser = null
  }

  const languageText = selectLangLocators(language)

  //const records = executeInputData(country)

  return { country, countryBDUser,  languageText }
}
/**
 *
 */
function getTestData(sheetName: string) {

  const country = process.env.COUNTRY as string
  const language = process.env.LANGUAGE as string

  //const creditsKey = getMappedCountry(country)
  let countryBDUser
  if(loginData && loginData[country as keyof typeof loginData]) {
    countryBDUser = loginData[country as keyof typeof loginData]
  } else {
    console.error(`No credentials found for the country: ${country}`)
    countryBDUser = null
  }
  const leadData = secondaryTestData(country)

  const languageText = selectLangLocators(language)

  const records = executeInputData(country, sheetName)

  return { country, countryBDUser,  languageText, records, leadData }
}

/**
 *Retrieves the input data file path based on the specified country.
 * @param {string} country - The name of the country to determine the file path.
 */
function executeInputData(country: string, sheetName: string) : Record[] {
  const excelFilePath = `testData/${country}/MDG_TestData_${country}.xlsx`
  const records = excelToObject(excelFilePath, sheetName)
  return records
}

/**
 *
 * @param {Page} page - The Playwright page object used for interacting with the application.
 * @param {string} testCaseName - The name of the testCase.
 */
async function goToD365Url(page: Page, testCaseName:string) {
  await page.setViewportSize({ width: CustomNumeric.WIDTH, height: CustomNumeric.HEIGHT })
  await page.goto(loginData.UAT2Admin.uat2Url, { timeout: 120000 })
  //await page.waitForURL(loginData.ENVT.uat2Url, { timeout: 120000 })
  console.log(`### ${testCaseName} : Started ###`)
}

/**
 *
 * @param {Page} page - The Playwright page object used for interacting with the application.
 */
export async function goToCrmUrl(page: Page) {
  await page.setViewportSize({ width: CustomNumeric.WIDTH, height: CustomNumeric.HEIGHT })
  await page.goto(loginData.ENVT.uat2Url)
}
/**
 *
 * @param {string} accountType - Defines the type of the account.
 */
function getAccountNumber(accountType: string) {
  const directAccountList = process.env.DIRECT_ACCOUNTNUMBERS as string
  const indirectAccountList = process.env.INDIRECT_ACCOUNTNUMBERS as string
  const accountNumber = accountType === 'DIRECT' ? directAccountList : indirectAccountList
  //const accountArray = JSON.parse(accountNumbers)
  //const accountList = Array.isArray(accountArray) ? accountArray : [accountArray];
  return JSON.parse(accountNumber)
}

/**
 *
 * @param {string} accountType - Defines the type of the account.
 * @param {string} accountInfo - The information of the account.
 */
function getAccountNumberFromEnvVariable(accountType: string, accountInfo: string) {
  let singleAccountNumber: string = ''

  if(process.env.TESTDATA === 'pipeline') {
    const directAccountList = process.env.DIRECT_ACCOUNTNUMBERS as string
    const indirectAccountList = process.env.INDIRECT_ACCOUNTNUMBERS as string
    const accountNumberEnv = accountType === 'DIRECT' ? directAccountList : indirectAccountList
    const accountArray = JSON.parse(accountNumberEnv)
    const accountNumberList = Array.isArray(accountArray) ? accountArray : [accountArray]
    console.log(accountNumberList)
    singleAccountNumber = accountNumberList[0]
    console.log(`Pipeline account NO :${singleAccountNumber}`)
  } else {
    const country = process.env.COUNTRY as string
    const accountFilepath = `testData/${country}/CCC_TestAccount_${country}`
    const countryWiseTestData = readTestCasesFromExcel(`${accountFilepath}.xlsx`)

    const accountInfoObject = countryWiseTestData[accountInfo]
    if(accountInfoObject && typeof accountInfoObject === 'object') {
      singleAccountNumber = accountInfoObject.account
    } else {
      console.warn(`No account data found for "${accountInfo}"`)
    }

    console.log(`Excel account NO :${singleAccountNumber}`)
  }

  return singleAccountNumber
}

/**
 *
 * @param {string} testcaseName - The name of the testCase.
 * @param {string} accountType - Defines the type of the account.
 */
function getAccountNumberAndMDGTicket(testcaseName: string, accountType: string = 'DIRECT') {
  const country = process.env.COUNTRY as string
  const accountFilepath = `testData/${country}/D365Change_TestAccount_${country}`
  const countryWiseTestData = readTestCasesFromExcel(`${accountFilepath}.xlsx`)
  const record: Record = new Record()
  const entry = countryWiseTestData[testcaseName]
  record.businessPartnerValue = entry.account
  record.excelTestData = entry.testData 
  console.log(`*** TestCase Name:${testcaseName}: Excel Account NO :${record.businessPartnerValue} / TestData "${record.excelTestData}" ***`)
  return record
}



/**
 *
 * @param {Page} page - The Playwright Page object used to perform browser actions during login
 * @param {boolean} isSaveSession - Whether to save the login session after successful authentication.
 * @param {string} testInfoParam - The information of the testCase.
 */
async function d365LoginFuncAdmin(page: Page, isSaveSession:boolean = true, testInfoParam: TestInfo) {
  await test.step('D365Login and URL Launch', async()=>{
    console.log('D365Login Base setup: Started.')
    const { countryBDUser } = getAdminUser()
    await page.goto(countryBDUser.uat2Url, { timeout: 120000 })
    // await page.waitForURL(countryBDUser.uat2Url, { timeout: 120000 })
    await page.locator('//div[contains(text(),"Use another account")]').click()
    const fn = new D365Login(page, testInfoParam)
    await fn.microsoftLoginWithoutDecrypt(countryBDUser.username, countryBDUser.password)
    await page.waitForURL(utils.urlApps, {  timeout: TimeoutConstants.TIMEOUT_5_MINS })
    console.log(`Get URL after Login: ${page.url()}`)
    // Wait for the 'App Busy' loading cursor to disappear before the app tile is displayed
    await waitForPopUpDisappear(page)
    const dashboard = new Dashboard(page)
    await dashboard.openSalesHubFromBaseSession()
    if(isSaveSession) {
      await page.context().storageState({ path: process.env.D365_AUTH_FILE })
    }
    console.log('Base setup: Completed.')
  })
}

/**
 *
 * @param {Page} page - The Playwright Page object used to perform browser actions during signOut
 */
async function signOut(page: Page) {
  await page.locator('//button[@id=\'mectrl_main_trigger\']').click()
  await page.locator(commonLocators.sigOutBtn).click()
  await page.locator('//div[contains(text(), \'Use another account\')]').click()
}

/**
 *
 */
function getAdminUser() {
  let countryBDUser = loginData['UAT2Admin']
  return {  countryBDUser   }
}

/**
 *
 * @param {Page} page - The Playwright Page object used to perform browser actions.
 */
async function getUserConfValue(page: Page) {
  const nation = process.env.COUNTRY as string
  await page.locator(commonLocators.countConf).click()
  const userLookup = await page.locator('//input[contains(@data-id,"quickFind_text_")]')
  await userLookup.click()
  await userLookup.fill(`${nation.replace(/_/g, ' ')}`)
  await userLookup.press('Enter')
  await page.locator(`//a[@aria-label="${nation.replace(/_/g, ' ')} Country Config"]`).click()
  await page.locator(commonLocators.relatedtab).click()
  await page.locator(commonLocators.cchfieldconfig).click()
  await page.locator(commonLocators.bdterriAssign).click()
  const requiredapp = await page .locator(commonLocators.delreqapp).textContent()
  return requiredapp
}


// Move this block to a dedicated test file or ensure it is only used in test files.
test.afterEach(async ({ }, testInfo) => {
  console.log(`Started Executing Tags in ADO with CI Value: ${process.env.ADOTAGS}`)
  const testDescription = testInfo.title
  if(!testDescription.includes('stepup - authentication')) {
    if(process.env.ADOTAGS && process.env.ADOTAGS === 'true') {
      let ciExecutionStatus = ''
      // Exclude session.setup test execution
      // Match the number in square brackets, e.g., [444896]
      const match = testDescription.match(/\[(\d+)\]/)
      const testNumber = match ? parseInt(match[1], 10) : null

      if(testNumber) {
        if(testInfo.status === 'passed') {
          ciExecutionStatus = 'automation_Passed'
        }
        else if(testInfo.status === 'failed') {
          ciExecutionStatus = 'automation_Failed'
        }
        console.log(`Executing post-test :Test Status: ${ciExecutionStatus}`)
        await updateTagForTest([testNumber], process.env.REMOVETAGNAME as string, [ciExecutionStatus])
        return
      }
      console.log(`Completed Executing Tags in ADO :Test Status: ${ciExecutionStatus}`)
    }
    else{
      console.log(`ByPassed  Executing Tags in ADO :Test Status: ${process.env.ADOTAGS}`)

    }
  }
})

/**
 *
 * @param {string} testcaseName - The name of the test case.
 */
function getTestCaseAndTestData(testcaseName: string): string | undefined {
  const country = process.env.COUNTRY as string
  const excelPath = `testData/${country}/CCC_TestAccount_${country}.xlsx`
  const testDataMap = readTestDataColumnFromExcel(excelPath)

  const testdata = testDataMap[testcaseName]

  if(testdata && testdata !== '') {
    console.log(`Test data has passed through excel for the test case "${testcaseName}" and the data is "${testdata}"`)
    return testdata
  } else {
    console.log(`No test data found for test case "${testcaseName}"`)
    return undefined
  }
}


export { test, expect, getTestData,  loginCredentialsPerformance, getUserConfValue, signOut, d365LoginFuncAdmin,
  browserClose, executeInputData, goToD365Url, getAccountNumber, sapLoginFunc, d365LoginFunc, pageAndContextCleanUp,
  mdgLoginFunc, getAccountNumberFromEnvVariable, getAccountNumberAndMDGTicket, getTestCaseAndTestData,AdminloginCredentialsPerformance, getTestDataLogin
 }