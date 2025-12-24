import { test as setup } from '@playwright/test'
import { pageAndContextCleanUp, mdgLoginFunc } from '../../baseTest'
import { TimeoutConstants } from '../../../utilities/utilitiesImports'


if(process.env.REQUIREDMDG && process.env.REQUIREDMDG === 'True') {
  setup('MDG stepup - authentication', async ({ page, context }, testInfo) => {
    setup.setTimeout(TimeoutConstants.TIMEOUT_5_MINS)
    await mdgLoginFunc(page, testInfo)
    await pageAndContextCleanUp(page, context)
  })
} else {
  console.log(`MDG stepup - authentication - skipped ${process.env.REQUIREDMDG}`)
};