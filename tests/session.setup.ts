import { test as setup } from '@playwright/test'
import { loginFunc } from '../tests/baseTest'
import { loginData } from '../testData/testDataImport'
import { secondaryTestData, businessRole } from '../utilities/utilImport'
import { Login, UserRoleBusinessUnit, CountryTerritoryConfiguration } from '../pages/pageImport'

setup('Call Lists - User Configuration', async ({ page, context }) => {
  setup.setTimeout(2100000)

  const country = process.env.COUNTRY as string
  const role = 'CCA'

  // Clear context
  await context.clearCookies()
  await context.clearPermissions()
  await context.storageState({ path: 'empty.json' }) // optional

  await page.setViewportSize({ width: 1511, height: 733 })

  // Admin login
  await page.goto(loginData.admin.pageUrl)
  const login = new Login(page)
  await login.loginCredentials(loginData.admin.username, loginData.admin.password)

  // Load test data
  const testData = await secondaryTestData(country)
  const roleList = await businessRole(role)

  // Configure Business Unit and Role
  const roleBUConfig = new UserRoleBusinessUnit(page)
  console.log(`\n<<<<< Prerequisites >>>>>\n`)
  console.log(`Configuring Business Unit, Role, and Territory before running the tests`)
  console.log(`Country: "${country}"\n`)

  await roleBUConfig.userRoleBusinessUnitConfig(loginData.CCA.saName, testData.businessUnit, roleList)

  // Configure Country/Territory
  const countryConfig = new CountryTerritoryConfiguration(page)
  await countryConfig.userCountryTerritoryConfig(loginData.CCA.saName, country)

  console.log('\n<<<<< Configuration Completed >>>>>\n')

  await page.close()
  await context.close()
})

setup('Call Lists - authentication', async ({ page, context }) => {
  setup.setTimeout(600000)
  const pageUrl = loginData.CCA.pageUrl
  const credentials = { username: loginData.CCA.username, password: loginData.CCA.password }
  await loginFunc(page, pageUrl, credentials)
  await page.close()
  await context.close()
  console.log(`Logged in with ${loginData.CCA.saName} successfully`)
})