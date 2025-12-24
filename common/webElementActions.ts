import { Locator, test } from '@playwright/test'
import { TimeoutConstants } from '../utilities/timeoutConstants'

export class WebElementActions {
  globaltimeout: number = TimeoutConstants.TIMEOUT_30_SEC

  /**
   * Constructor for the class, initializes the page.
   *
   */
  constructor() {
    if(process.env.PERFORMANCE_WAITTIME) {
      this.globaltimeout = Number(process.env.PERFORMANCE_WAITTIME)
    }
  }


  /**
 * Focuses on the element and fills it with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The Playwright locator to focus on and fill with text.
 * @param {string} textData - The text data to fill into the locator.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the action fails (optional, default is 3).
 */
  async FocusAndFill(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`FocusAndFill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.focus()
          await locator.fill(textData)
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`FocusAndFill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached. FocusAndFill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }
  /**
 * Clears the element's content and fills it with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The locator of the element to clear and fill.
 * @param {string} textData - The text data to fill into the element.
 * @param customError
 * @param {number} [timeout] - The timeout to wait for the element to become visible (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The number of retry attempts before throwing an error if the element cannot be cleared and filled (optional, default is 3)..
 */
  async ClearAndFill(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`ClearAndFill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.clear()
          await locator.fill(textData)
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClearAndFill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached. ClearAndFill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }
  /**
 * Clears the element, fills it with an empty string, and then fills it with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The Playwright locator to clear and fill with text.
 * @param {string} textData - The text data to fill into the locator after clearing.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the action fails (optional, default is 3).
 */
  async ClearEmptyAndFill(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`ClearEmptyAndFill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.clear()
          await locator.fill('')
          await locator.fill(textData)
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClearEmptyAndFill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry reached. ClearEmptyAndFill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
 * Clicks the element, clears it, and fills it with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
  * @param {Locator} locator - The Playwright locator to click, clear, and fill with text.
 * @param {string} textData - The text data to fill into the locator after clicking and clearing.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the action fails (optional, default is 3).
 */
  async ClickClearEmptyAndFill(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`ClearEmptyAndFill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.click()
          await locator.clear()
          await locator.fill(textData)
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClearEmptyAndFill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry reached. ClearEmptyAndFill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }
  /**
 * Clicks the element, clears it, and fills it with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
  * @param {Locator} locator - The Playwright locator to click, clear, and fill with text.
 * @param {string} textData - The text data to fill into the locator after clicking and clearing.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the action fails (optional, default is 3).
 */
  async FillAndEnter(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`ClearEmptyAndFill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.click()
          await locator.clear()
          await locator.fill(textData)
          await locator.press('Enter')
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClearEmptyAndFill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry reached. ClearEmptyAndFill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
 * Fills the element with the specified text.
 * Retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The locator identifying the input element to be filled.
 * @param {string} textData - The text to be filled into the input element.
 * @param customError
 * @param {number} [timeout] - The timeout duration (in milliseconds) to wait for the element to be visible. Defaults to 30 seconds.
 * @param {number} [maxRetries] - The maximum number of retry attempts in case of failure. Defaults to 3.
 */
  async Fill(locator: Locator, textData: string, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`Fill Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.fill(textData)
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`Fill operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry reached. Fill operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
   * Clicks the element and retries the action up to the specified number of attempts if it fails.
    * @param {Locator} locator - The locator of the element to be clicked.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to become visible. Defaults to 30 seconds.
 * @param {number} [maxRetries] - The maximum number of retry attempts before throwing an error. Defaults to 3 retries.
 *
   */
  async Click(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          //await locator.hover()
          await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`Click operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }
  /**
   * Clicks the element and retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The locator of the element to be clicked.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to become visible. Defaults to 30 seconds.
 * @param {number} [maxRetries] - The maximum number of retry attempts before throwing an error. Defaults to 3 retries.
 *
   */
  async ForceClick(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Force Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          //await locator.hover()
          await locator.click({ force: true }) // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ForceClick failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Force click: Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
   *
   * @param {Locator} locator - The locator of the element to be clicked.
   * @param {number} [timeout] - The timeout duration (in milliseconds) between retry attempts. Defaults to 5000ms (5 seconds).
   * @param {number} [maxRetries] - The maximum number of retry attempts if the attribute retrieval fails. Defaults to 1.
   */
  async ClickAll(locator: Locator, timeout = TimeoutConstants.TIMEOUT_5_SEC, maxRetries = 1): Promise<void> {
    let remaining = await locator.count()

    if(remaining === 0) {
      console.warn(`No elements found for locator: ${locator}`)
      return
    }
    else {
      console.log(`Total elements found : ${remaining} for locator: ${locator}`)
    }

    // Loop until all clickable elements are handled
    while(remaining > 0) {
      let clickedAtLeastOne = false

      for(let i = 0; i < remaining; i++) {
        const element = locator.nth(i)
        console.log(`Iteration  : ${i} for locator: ${element}`)
        let retryAttempt = 0
        let success = false

        await test.step(`Attempting click on element #${i + 1}`, async () => {
          while(!success && retryAttempt <= maxRetries) {
            try {
              retryAttempt++
              await element.waitFor({ state: 'visible', timeout })
              await element.scrollIntoViewIfNeeded()
              await element.click()
              success = true
              clickedAtLeastOne = true
              console.warn(`Element #${i} click completed for element ${element}`)
              break
            } catch(exception) {
              if(retryAttempt >= maxRetries) {
                console.warn(`Element #${i + 1} click failed after ${maxRetries} retries.`, exception)
              }
            }
          }
        })
      }

      // Recalculate the remaining elements to handle
      remaining = await locator.count()
      console.log(`Taking re-count : ${remaining}`)

      if(!clickedAtLeastOne) {
        console.warn('No elements could be clicked. Ending loop to avoid infinite retry.')
        break
      }
    }
  }



  /**
   *
   * @param {Locator} locator - The locator of the element to be clicked.
   * @param customError
   * @param {number} [timeout] - The timeout duration (in milliseconds) between retry attempts. Defaults to 30000ms (30 seconds).
   * @param {number} [maxRetries] - The maximum number of retry attempts if the attribute retrieval fails. Defaults to 3.
   */
  async ClickWitOutScroll(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClickWitOutScroll operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
   * Clicks the element without throwing an exception after the maximum retries.
  * @param {Locator} locator - The Playwright locator for the element to click.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the click action fails (optional, default is 3).
   */
  async ClickWithNoException(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            console.error(`ClickWithNoException: Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`, exception)
          }
        }
      }
    })
  }

  /**
 * Double-clicks the element without throwing an exception after the maximum retries.
 * @param {Locator} locator - The Playwright locator for the element to double-click.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the double-click action fails (optional, default is 3).
 */
  async dbClickWithNoException(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          await locator.dblclick() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            console.error(`dbClickWithNoException: Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`, exception)
          }
        }
      }
    })
  }
  /**
 * Hover over the specified element and perform a click action.
 *
 * @param {Locator} locator - The Playwright Locator for the element to hover over and click.
 * @param customError
 * @param {number} timeout - The maximum time to wait for the element to become visible before attempting the hover and click action. Default is `TimeoutConstants.TIMEOUT_30_SEC`.
 * @param {number} maxRetries - The maximum number of retry attempts if the click action fails. Default is 3.
 * @returns {Promise<void>} - A promise that resolves when the hover and click action is successful or the maximum retry attempts are reached.
 */
  async hOverAndClick(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          await locator.hover({ timeout: timeout })
          await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`Click operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Element click failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }
  /**
 * Hovers over the element.
 * Retries the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The Playwright locator for the element to hover over.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the hover action fails (optional, default is 3).
 */
  async hOverOnly(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<boolean>  {
    let success = false
    let retryAttempt = 1
    await test.step(`hOverOnly Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded({ timeout: timeout })
          await locator.hover({ timeout: timeout })
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`hOverOnly operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Hover Element failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
    return success
  }

  /**
 * Hovers over the element without throwing an exception after the maximum retries.
 * @param {Locator} locator - The Playwright locator for the element to hover over.
 * @param {number} [timeout] - The timeout duration in milliseconds (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the hover action fails (optional, default is 3).
 * @returns {Promise<boolean>} - A promise that resolves to `true` when the hover action is successful, or `false` if it fails after max retries.
 */
  async hOverWithNoException(locator: Locator, timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<boolean>  {
    let success = false
    let retryAttempt = 1
    await test.step(`hoverOnly Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded({ timeout: timeout })
          await locator.hover({ timeout: timeout })
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            console.error(`Max retry attempts reached:Hover Element failed on attempt #${retryAttempt} for locator ${locator}.`, exception)
          }
        }
      }
    })
    return success
  }
  /**
 * Waits for the element to become visible and fail if element is not visible
  * @param {Locator} locator - The Playwright locator for the element to wait for visibility.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to be visible (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the element is not visible (optional, default is 3).
 * @param {boolean} [isLog=true] - Whether to log an error after max retries if the element is still not visible (optional, default is true).

 */
  async WaitForHiddenWithRetry(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3, isLog = true): Promise<boolean> {
    let success = false
    let retryAttempt = 1
    await test.step(`WaitForHiddenWithRetry Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'hidden', timeout })
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          console.error('WaitForHiddenWithRetry:Retry failed with error.', exception)
          // Optionally, add a small delay before retrying to avoid rapid successive attempts
          //await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay
        }
      }
      if(!success && isLog)
      { console.error(`WaitForHiddenWithRetry: Attempt #${retryAttempt} failed for locator ${locator}.`) }
    })
    return success
  }

  /**
 * Waits for the element to become visible and fail if element is not visible
  * @param {Locator} locator - The Playwright locator for the element to wait for visibility.
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to be visible (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the element is not visible (optional, default is 3).
 * @param {boolean} [isLog=true] - Whether to log an error after max retries if the element is still not visible (optional, default is true).

 * @param customError
 */
  async WaitForVisibleWithRetry(locator: Locator, timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3, isLog = true, customError = '',): Promise<boolean> {
    let success = false
    let retryAttempt = 1
    await test.step(`WaitForVisibleWithRetry Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          console.error('Retry failed with error:', exception)
          // Optionally, add a small delay before retrying to avoid rapid successive attempts
          //await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second delay
        }
      }
      if(!success && isLog)
      { console.error(`WaitForVisibleWithRetry: Attempt #${retryAttempt} failed for locator ${locator}.`) }
    })
    return success
  }

  /**
 * Waits for the element to become visible and fail if element is not visible
  * @param {Locator} locators - The Playwright locator for the element to wait for visibility.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to be visible (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The maximum number of retry attempts if the element is not visible (optional, default is 3).
   */
  async WaitForVisibleForLocators(locators: Locator[], customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<Locator | null> {
    let retryAttempt = 1
    let foundLocator: Locator | null = null

    await test.step('WaitForVisibleWithRetry Action for multiple locators', async () => {
      while(!foundLocator && retryAttempt <= maxRetries) {
        for(const locator of locators) {
          try {
            await locator.waitFor({ state: 'visible', timeout })
            foundLocator = locator
            break // Exit inner loop as soon as one is visible
          } catch(error) {
            console.error('Retry failed with error:', error)
            // Continue trying other locators
          }
        }

        if(!foundLocator) {
          retryAttempt++
          await new Promise(resolve => setTimeout(resolve, 1000)) // wait before retrying
        }
      }

      if(!foundLocator) {
        console.error(`WaitForVisibleWithRetry: No locator became visible after ${retryAttempt} attempts.`)
      }
    })

    return foundLocator
  }


  /**
 * Waits for the element to become visible, throwing an exception if it fails after the maximum retries.
* @param {Locator} locator - The locator for the element to wait for.
 * @param customError
 * @param {number} [timeout] - The timeout duration (in milliseconds) to wait for the element to become visible. Defaults to 30 seconds.
 * @param {number} [maxRetries] - The maximum number of retry attempts if the element is not visible. Defaults to 3.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the element becomes visible within the retries, `false` otherwise.
 * @throws {Error} Throws an error if the maximum number of retries is reached and the element is still not visible.
 */
  async ExceptionWaitForVisibleWithRetry(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<boolean> {
    let success = false
    let retryAttempt = 1
    await test.step(`WaitForVisibleWithRetry Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ExceptionWaitForVisibleWithRetry operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Hover ExceptionWaitForVisibleWithRetry failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }

    })
    return success
  }

  /**
 * Retrieves the specified attribute of an element, retrying up to the given number of attempts.
 * @param {Locator} locator - The locator for the element from which the attribute will be retrieved.
 * @param {string} [attribute='value'] - The name of the attribute to retrieve. Defaults to 'value'.
 * @param {number} timeoutParam - The timeout in milliseconds to wait for the popup proceeding.
 * @param {number} [maxRetries] - The maximum number of retry attempts if the attribute retrieval fails. Defaults to 4.
 */
  async getElementAttribute(locator: Locator, attribute: string = 'value', timeoutParam = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<string> {
    let attempt = 0
    let attributeValue : string = ''
    let success = false
    await test.step(`getElementAttribute Action: ${locator}`, async()=>{
      while(!success && attempt <= maxRetries) {
        try {
          attributeValue = await locator.getAttribute(attribute, { timeout: timeoutParam }) ?? ''
          if(attributeValue !== '') {
            console.log(`Attribute "${attribute}" found with value: ${attributeValue}`)
            success = true
          }
        } catch(e) {
          console.warn(`Attempt ${attempt + 1}: Failed to retrieve attribute "${attribute}".`, e)
        }
        attempt++
        if(attempt <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    })
    return attributeValue
  }

  /**
 * Clicks a locator and waits for a dropdown (or expected element) to become visible.
 * Retries the action if the expected element is not visible.
 *
 * @param {Locator} clickLocator - The locator of the element to click that triggers the dropdown.
 * @param {Locator} expectLocator - The locator of the expected dropdown element to become visible.
 * @param {number} [maxRetries] - The maximum number of retry attempts if the dropdown does not become visible. Defaults to 4.
 * @param {number} [retryDelay] - The delay between each retry in milliseconds. Defaults to 10 seconds.
 */
  async RetryTillDropdownVisible(clickLocator: Locator, expectLocator: Locator, maxRetries = 3, retryDelay: number = TimeoutConstants.TIMEOUT_10_SEC
  ): Promise<boolean> {
    let attempt = 0
    await test.step(`RetryTill DropdownVisible: ${clickLocator}`, async()=>{
      while(attempt <= maxRetries) {
        try {
          await this.Click(clickLocator)
          if(await this.WaitForVisibleWithRetry(expectLocator)) {
            console.log(`${expectLocator} is visible after ${attempt + 1} attempt(s).`)
            return true
          }
        } catch(error) {
          console.error('Retry failed with error:', error)
        }
        attempt++
        if(attempt <= maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        }
      }
      console.error(`RetryTillDropdownVisible failed: "${clickLocator}" and ExpectedLocator: "${expectLocator}" not visible after ${maxRetries} attempts.`)
    })
    return false
  }

  /**
 * Focuses on the element and clicks it, retrying the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The locator of the element to be focused on and clicked.
 * @param customError
 * @param {number} [timeout] - The timeout duration in milliseconds to wait for the element to become visible. Defaults to 30 seconds.
 * @param {number} [maxRetries] - The maximum number of retry attempts before throwing an error. Defaults to 3 retries.
 */
  async FocusAndClick(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Focus And Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          await locator.focus()
          await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`FocusAndClick operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:FocusAndClick failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
 * Focuses on the element, retrying the action up to the specified number of attempts if it fails.
 * @param {Locator} locator - The locator of the element to focus on.
 * @param customError
 * @param {number} [timeout] - The timeout to wait for the element to become visible (optional, default is 30 seconds).
 * @param {number} [maxRetries] - The number of retry attempts before throwing an error if the element cannot be focused (optional, default is 3).
 */
  async Focus(locator: Locator, customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3) : Promise<void>  {
    let success = false
    let retryAttempt = 1
    await test.step(`Focus And Click Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.scrollIntoViewIfNeeded()
          await locator.focus()
          //await locator.click() // Ensure the correct method is used for clicking
          success = true // If no exception, mark success
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`Focus operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry attempts reached:Focus click failed on attempt #${retryAttempt} for locator ${locator}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
 * Click on the specified element and then clear its content.
 *
 * @param {Locator} locator - The Playwright Locator representing the element to be clicked and cleared.
 * @param customError
 * @param {number} timeout - The maximum time to wait for the element to become visible before performing the click and clear actions. Default is `TimeoutConstants.TIMEOUT_30_SEC`.
 * @param {number} maxRetries - The maximum number of retry attempts if the action fails. Default is 3.
 * @returns {Promise<void>} - A promise that resolves when the click and clear action is successfully performed or the maximum retries are reached.
 */
  async ClickClearEmpty(locator: Locator,  customError = '', timeout = TimeoutConstants.TIMEOUT_30_SEC, maxRetries = 3): Promise<void> {
    let success = false
    let retryAttempt = 1
    await test.step(`ClickClearEmpty Action: ${locator}`, async()=>{
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          await locator.click()
          await locator.clear()
          success = true // Mark as successful if no exception occurs
        } catch(exception) {
          if(retryAttempt >= maxRetries) {
            if(customError !== '') {
              console.error(`ClickClearEmpty operation failed.#${customError}.`)
              throw new Error(customError)   // custom error shown in Playwright
            }
            console.error(`Max retry reached. ClickClearEmpty operation failed.#${retryAttempt}.`)
            throw exception
          }
        }
      }
    })
  }

  /**
   *
   * @param {Locator} clickLocator - The locator of the element to click that triggers the dropdown.
   * @param {Locator} expectLocator - The locator of the expected dropdown element to become visible.
   * @param {number} maxRetries - The maximum number of retry attempts if the dropdown does not become visible. Defaults to 4.
   * @param {number} retryDelay - The delay between each retry in milliseconds. Defaults to 10 seconds.
   */
  async retryTillVisible(
    clickLocator: Locator,
    expectLocator: Locator,
    maxRetries: number = 4,
    retryDelay: number = TimeoutConstants.TIMEOUT_5_SEC
  ): Promise<boolean> {
    let attempt = 0
    await test.step(`RetryTill DropdownVisible: ${clickLocator}`, async () => {
      while(attempt < maxRetries) {
        try {
          await this.Click(clickLocator)
          if(
            await this.WaitForVisibleWithRetry(
              expectLocator, '',
              TimeoutConstants.TIMEOUT_15_SEC,
              2
            )
          ) {
            console.log(
              `${expectLocator} is visible after ${attempt + 1} attempt(s).`
            )
            return true
          }
        } catch(error) {
          console.warn(`Attempt ${attempt + 1} failed: ${error}`)
        }
        attempt++
        if(attempt < maxRetries) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
        }
      }
      console.error(
        `RetryTillVisible failed: "${clickLocator}" and ExpectedLocator: "${expectLocator}" not visible after ${maxRetries} attempts.`
      )
    })
    return false
  }

  /**
   *
  * @param {Locator} locator - The Playwright Locator representing the element to be clicked and cleared.
  * @param {number} timeout - The maximum time to wait for the element to become visible before performing the click and clear actions. Default is `TimeoutConstants.TIMEOUT_5_MIN`.
  * @param {number} maxRetries - The maximum number of retry attempts if the action fails. Default is 3.
  * @param {boolean} isLog - Whether to log actions during the wait and retry process.
   */
  async waitForElementVisibleAndThrowError(locator: Locator,
    timeout: number = TimeoutConstants.TIMEOUT_5_MINS,
    maxRetries: number = 3,
    isLog: boolean = true
  ): Promise<void> {
    let success = false
    let retryAttempt = 1
    const startTime = Date.now()

    await test.step(`WaitForVisibleWithRetryAction: ${locator}`, async () => {
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout })
          success = true
        } catch(error) {
          await new Promise(resolve => setTimeout(resolve, 1000)) // 1 sec delay between retries
          console.error('Retry failed with error:', error)
        }
      }
      const elapsedTime = Date.now() - startTime

      if(success) {
        if(isLog) {
          console.log(
            `Element "${locator}" visible after ${retryAttempt} attempt(s) and ${elapsedTime}ms total wait.`
          )
        }
      } else {
        const errorMessage = `Element "${locator}" NOT Loaded after ${retryAttempt} attempt(s), total waited: ${elapsedTime}ms.`
        if(isLog) { console.error(errorMessage) }
        throw new Error(errorMessage)
      }
    })
  }

  /**
   *
   *@param {Locator} locator - The Playwright Locator representing the element to be clicked and cleared.
   * @param {Locator} refreshButton - The Locator used to refresh the UI when the element is not visible.
   * @param {number} maxRetries - The maximum number of retry attempts if the action fails. Default is 3.
   * @param {boolean} isLog - Whether to log actions during the wait and retry process.
   */
  async waitForElementVisibleWithRefreshAndThrowError(
    locator: Locator,
    refreshButton: Locator,
    maxRetries: number = 3,
    isLog: boolean = true
  ): Promise<void> {
    let success = false
    let retryAttempt = 1
    const startTime = Date.now()

    await test.step(`WaitForElementVisibleWithRefresh: ${locator}`, async () => {
      while(!success && retryAttempt <= maxRetries) {
        try {
          retryAttempt++
          await locator.waitFor({ state: 'visible', timeout: 5000 }) // Short timeout per attempt
          success = true
        } catch(error) {
          if(isLog) {
            console.warn(`Attempt ${retryAttempt}: Element not visible, refreshing...`, error)
          }
          try {
            await refreshButton.click()
          } catch(refreshError) {
            console.error(`Error while trying to click refresh: ${refreshError}`)
          }
          await new Promise(resolve => setTimeout(resolve, 1000)) // Optional delay between retries
        }
      }

      const elapsedTime = Date.now() - startTime

      if(success) {
        if(isLog) {
          console.log(
            `Element "${locator}" became visible after ${retryAttempt} attempt(s) and ${elapsedTime}ms total wait.`
          )
        }
      } else {
        const errorMessage = `Element "${locator}" NOT visible after ${retryAttempt} attempt(s), total waited: ${elapsedTime}ms.`
        if(isLog) { console.error(errorMessage) }
        throw new Error(errorMessage)
      }
    })
  }


}