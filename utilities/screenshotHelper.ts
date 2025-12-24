import { Page, TestInfo } from '@playwright/test'
import fs from 'fs'
import path from 'path'

/**
 *
 * @param {Page} page - The Page object used for interacting with the web page.
 * @param {TestInfo} testInfo
 * @param {string} name
 */
export async function takeAndAttachScreenshot(
  page: Page,
  testInfo: TestInfo,
  name: string
) {
  const dir = path.join('screenshots', testInfo.title.replace(/\s+/g, '_'))
  fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(dir, `${name}.png`)
  const buffer = await page.screenshot({ path: filePath })

  await testInfo.attach(name, {
    body: buffer,
    contentType: 'image/png',
  })
}
