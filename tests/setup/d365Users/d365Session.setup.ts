import { test as setup } from '@playwright/test'
import { getTestDataLogin, loginCredentialsPerformance } from '../../baseTest'
import { loginData } from '../../../testData/login_TestData'
const { countryBDUser } = getTestDataLogin()


if(process.env.REQUIREDD365 && process.env.REQUIREDD365 === 'True') {
  setup('D365 Country user - authentication', async ({ page, context }, testInfo) => {
    const pageUrl = loginData.UAT2Admin.uat2Url
    const credentials = { username: countryBDUser.username, password: countryBDUser.password }
    console.log(`Login Details: UserName ${credentials.username}`)
    await loginCredentialsPerformance(page, pageUrl, credentials, testInfo)
    await page.close()
    await context.close()
    console.log('Login successful')
  })
} else {
  console.log(`D365 stepup - authentication - skipped ${process.env.REQUIREDMDG}`)
};