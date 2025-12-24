import { BrowserContext, Page, Locator   } from 'playwright'
import { TimeoutConstants } from './timeoutConstants'

/**
 * Waits for a new page event in the given browser context and sets its viewport size.
 * This function waits for a new page to be opened (for example, a pop-up page) and then
 * adjusts the size of the viewport according to the specified width and height parameters.
 * It then waits for the page to load completely before returning the page instance.
 *
 * @param {BrowserContext} context - The Playwright browser context, representing the browser environment.
 * @param {number} [widthParam=1520] - The width of the viewport for the new page (default is 1520).
 * @param {number} [heightParam=800] - The height of the viewport for the new page (default is 800).
 * @returns {Promise<Page>} - A Promise that resolves to the `Page` object representing the newly opened page.
 */
export async function getPageInstance(context: BrowserContext,
  widthParam:number = 1520, heightParam:number = 800) {
  let popUpPage: Page
  popUpPage = await context.waitForEvent('page')

  await popUpPage.setViewportSize({ width: widthParam, height: heightParam })
  await popUpPage.waitForLoadState()
  return popUpPage
}

/**
 * Waits for a new popup page to be opened from the active page and sets its viewport size.
 * This function waits for a popup page to be triggered from the given active page (e.g., a new tab or window),
 * then sets the viewport size according to the specified width and height parameters,
 * and waits for the page to load completely before returning the popup page instance.
 *
 * @param {Page} activePage - The active Playwright page object from which the popup is triggered.
 * @param {number} [widthParam=1520] - The width of the viewport for the new popup page (default is 1520).
 * @param {number} [heightParam=800] - The height of the viewport for the new popup page (default is 800).
 * @returns {Promise<Page>} - A Promise that resolves to the `Page` object representing the newly opened popup page.
 */
export async function getPageFromActiveInstance(activePage: Page,
  widthParam:number = 1520, heightParam:number = 800) {
  let popUpPage: Page
  popUpPage = await activePage.waitForEvent('popup')

  await popUpPage.setViewportSize({ width: widthParam, height: heightParam })
  await popUpPage.waitForLoadState()
  return popUpPage
}

/**
 * Waits for a selector to appear or disappear based on the specified state within a given timeout.
 * This function allows you to wait for a selector to become either visible or hidden on the page.
 * If the selector does not meet the expected state within the timeout, an error message is logged.
 *
 * @param {Page} page - The Playwright page object where the selector should be checked.
 * @param {string} selector - The CSS selector string for the element to be checked.
 * @param {'visible' | 'hidden'} state - The expected state of the selector. It can be either 'visible' or 'hidden'.
 * @param {number} [timeout=3000] - The maximum time (in milliseconds) to wait for the selector to appear or disappear (default is 3000).
 * @returns {Promise<void>} - A Promise that resolves with no value, but logs the outcome of the selector state check.
 */
export async function falseWaitForSelector(page: Page, selector: string,
  state: string, timeout: number = 3000): Promise<void> {
  try {
    switch(state) {
      case 'visible':
        await page.waitForSelector(selector, { state: 'visible', timeout: timeout })
        break
      case 'hidden':
        await page.waitForSelector(selector, { state: 'hidden', timeout: timeout })
        break

      default:
        break
    }
    console.log(`Selector '${selector}' appear of state : ${state} within ${timeout} milliseconds.`)
  }
  catch(error) {
    console.error(`Selector '${selector}' did not appear of state : ${state} within ${timeout} milliseconds.`, error)
  }

}
/**
 * Waits for a locator to either appear or disappear based on the specified state within a given timeout.
 * This function checks the state of the locator (either visible or hidden) within the specified timeout,
 * and logs the outcome (success or failure) to the console.
 *
 * @param {Locator} locator - The Playwright locator object for the element to be checked.
 * @param {'visible' | 'hidden'} state - The expected state of the locator. It can be either 'visible' or 'hidden'.
 * @param {number} [timeout=3000] - The maximum time (in milliseconds) to wait for the locator to appear or disappear (default is 3000).
 * @returns {Promise<void>} - A Promise that resolves with no value, but logs the outcome of the locator state check.
 */
export async function falseWaitForLocator(locator: Locator,
  state: string, timeout: number = 3000): Promise<void> {
  try {
    switch(state) {
      case 'visible':
        await locator.waitFor({ state: 'visible', timeout: timeout })
        break
      case 'hidden':
        await locator.waitFor({ state: 'hidden', timeout: timeout })
        break
      default:
        break
    }
    console.log(`Selector '${locator}' appear of state : ${state} within ${timeout} milliseconds.`)
  }
  catch(error) {
    console.warn(`Selector '${locator}' did not appear of state : ${state} within ${timeout} milliseconds.`, error)
  }

}

/**
 * Waits for the loading indicator (App Busy) to disappear before the app tile is displayed.
 * This function waits for the `#appsLoadingIndicator` element to become visible and then hidden,
 * indicating that the application has finished loading and is ready for interaction.
 *
 * @param {Page} page - The Playwright `Page` object representing the browser page.
 * @returns {Promise<void>} - A Promise that resolves with no value, but ensures the loading indicator is hidden.
 */
export async function waitForPopUpDisappear(page: Page) {
  // Wait for the 'App Busy' loading cursor to disappear before the app tile is displayed
  await falseWaitForSelector(page, '#appsLoadingIndicator', 'visible', 3000)
  await falseWaitForSelector(page, '#appsLoadingIndicator', 'hidden')
}

/**
 * Waits for the progress indicator or loading cursor to appear on the page.
 * This function waits for the `#progressIndicatorContainer` element to become visible,
 * indicating that the page is in a loading state.
 *
 * @param {Page} page - The Playwright `Page` object representing the browser page.
 * @returns {Promise<void>} - A Promise that resolves with no value after the progress indicator is visible.
 */
export async function waitForProgressIndicator(page: Page,) {
  // Wait for the progress indicator or loading cursor to disappear before the screen is displayed.
  await falseWaitForSelector(page, '#progressIndicatorContainer', 'visible', 3000)
}

/**
 * Reloads the browser page with the specified wait condition and timeout.
 * This function allows for reloading the page and waiting for the specified event to occur before the reload is considered complete.
 * It supports several wait conditions such as `load`, `domcontentloaded`, `networkidle`, and `commit`.
 *
 * @param {Page} page - The Playwright `Page` object representing the browser page to be reloaded.
 * @param {'load' | 'domcontentloaded' | 'networkidle' | 'commit'} [waitUntilParam='networkidle'] - The event to wait for before considering the reload complete.
 *   - `load`: Waits for the `load` event, meaning the entire page (including all resources like images, stylesheets, etc.) is loaded.
 *   - `domcontentloaded`: Waits for the `DOMContentLoaded` event, meaning the DOM is fully loaded, but some resources may still be loading.
 *   - `networkidle`: Waits until there are no more than 0 network connections for at least 500 ms.
 *   - `commit`: Waits for the initial page navigation request to be committed.
 * @param {number} [timeoutParam=TimeoutConstants.TIMEOUT_3_MINS] - The maximum time (in milliseconds) to wait for the page to reload.
 * @returns {Promise<void>} - A Promise that resolves with no value once the page reload completes.
 */
export async function reloadBrowser(page: Page, waitUntilParam: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' = 'networkidle',
  timeoutParam = TimeoutConstants.TIMEOUT_3_MINS) {
  await page.reload({ waitUntil: waitUntilParam,
    timeout: timeoutParam
  })
}
