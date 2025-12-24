// src/helpers/notifications.ts
import { Page } from '@playwright/test'

/**
 *
 * @param {any} page
 */
export async function handleNotification(page: Page) {
  try {
    await page.locator('//h2[text()="Notification"]').waitFor({ state: 'visible', timeout: 5000 })
    await page.keyboard.press('Escape')
  } catch{}
}
