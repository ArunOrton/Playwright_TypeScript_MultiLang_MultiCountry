import { test as setup } from '@playwright/test'
import { sapLoginFunc, pageAndContextCleanUp } from '../../baseTest'
import { TimeoutConstants } from '../../../utilities/utilitiesImports'

if(process.env.REQUIREDSAP && process.env.REQUIREDSAP === 'True') {
  setup('SAP stepup - authentication', async ({ page, context }, testInfo) => {
    setup.setTimeout(TimeoutConstants.TIMEOUT_15_MINS)
    await sapLoginFunc(page, testInfo)
    await pageAndContextCleanUp(page, context)
  })
} else {
  console.log(`SAP stepup - authentication - skipped ${process.env.REQUIREDSAP}`)
}