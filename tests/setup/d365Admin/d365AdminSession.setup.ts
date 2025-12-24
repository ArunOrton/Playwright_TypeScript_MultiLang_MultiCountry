import { test as setup } from '@playwright/test'
import { AdminloginCredentialsPerformance } from '../../baseTest'
import { loginData } from '../../../testData/login_TestData'

if(process.env.REQUIREDD365 && process.env.REQUIREDD365 === 'True') {
  setup('D365 SA Admin Login - authentication', async ({ page, context }, testInfo) => {
    const pageUrl = loginData.UAT2Admin.uat2Url
    const credentials = { username: loginData.UAT2Admin.username, password: loginData.UAT2Admin.password }    
    console.log(`Login Details: UserName ${credentials.username}`)
    await AdminloginCredentialsPerformance(page, pageUrl, credentials, testInfo)
    await page.close()
    await context.close()
    console.log('Login successful')
  })
} else {
  console.log(`D365 stepup - authentication - skipped ${process.env.REQUIREDMDG}`)
};
