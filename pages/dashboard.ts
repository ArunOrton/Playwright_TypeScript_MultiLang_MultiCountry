import { Page } from 'playwright'
import { LocatorType } from '../../locators/ICountryLocator'
import { TimeoutConstants } from '../../utilities/utilitiesImports'
import { BasePage } from '../basePage'
import { expect } from 'playwright/test'

export class Dashboard extends BasePage {

  /**
       *Initializes the dashboard class with the provided page object.
       * @param {any} page - The Playwright page object used for interacting with the application.
       * @param {LocatorType} locatorTypeParam - The locator type parameter used for identifying elements on the page.
       */
  constructor(page: Page, locatorTypeParam: LocatorType) {
    super(page, locatorTypeParam)

  }

  /**
     * Verifies the absence of the search icon on the page.
     */
  async verifyAbsenceofSearchIcon():Promise<boolean> {
    const searchIcon = this.page.locator(this.locatorType.searchIcon)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.marketValue))
    await expect(searchIcon).toBeHidden()
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.newsTile))
    await this.webActions.Click(this.page.locator(this.locatorType.newsTile))
    return await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.searchIcon))
  }

  /**
   * Validates the search banner element on the page.
   */
  async validateSearchBanner():Promise<boolean> {
    const searchBanner = this.page.locator(this.locatorType.searchBannerInputField)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.marketValue))
    expect(await this.webActions.WaitForVisibleWithRetry(searchBanner)).toBe(true)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.newsTile))
    await this.webActions.Click(this.page.locator(this.locatorType.newsTile))
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.searchIcon))
    expect(searchBanner).toBeHidden()
    await this.webActions.Click(this.page.locator(this.locatorType.searchIcon))
    return await this.webActions.WaitForVisibleWithRetry(searchBanner)
  }

  /**
   * Validates the stock ticker text format.
   *
   * @param {string} tickerText - The text content of the stock ticker element.
   */
  async  validateStockTickerFn(tickerText: string): Promise<boolean> {
    const pattern = /^CCH\.L\s+\d+\.\d{2}\s+GBP$/ // Example pattern: "CCH.L 1234.56 GBP"
    return pattern.test(tickerText)
  }

  /**
   * Validates the stock ticker element on the page.
   */
  async validateStockTicker():Promise<boolean> {
    const stockTicker = this.page.locator(this.locatorType.stockTicker)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.marketValue))
    await this.webActions.WaitForVisibleWithRetry(stockTicker)
    await this.page.waitForTimeout(TimeoutConstants.TIMEOUT_5_SEC) // wait needed as locator is loaded but text not updated immediately
    const tickerText = await stockTicker.innerText()
    return this.validateStockTickerFn(tickerText)
  }

  /**
   *
   */
  async validateLogo():Promise<boolean> {
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.marketValue))
    const logoLocator = this.page.locator(this.locatorType.logo)
    expect(await this.webActions.WaitForVisibleWithRetry(logoLocator)).toBe(true)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.newsTile))
    await this.webActions.Click(this.page.locator(this.locatorType.newsTile))
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.searchIcon))
    await this.webActions.Click(this.page.locator(this.locatorType.logo), TimeoutConstants.TIMEOUT_5_SEC)
    return await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.myInfoBtn)) // homepage reference after clicking logo
  }

  /**
   * Validates the search functionality on the page.
   * @param {string} searchText - The text to search for in the search functionality.
   */
  async validateSearchFunctionality(searchText:string):Promise<boolean> {
    const searchBanner = this.page.locator(this.locatorType.searchBannerInputField)
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.marketValue))
    await this.webActions.Fill(searchBanner, searchText)
    await searchBanner.focus()
    await this.page.waitForTimeout(TimeoutConstants.TIMEOUT_2_SEC) // wait needed for input to register
    await searchBanner.press('Enter')
    await this.webActions.WaitForVisibleWithRetry(this.page.locator(this.locatorType.filesBtn))
    return await this.validateSearchResults(searchText)

  }

  /**
   * Validates the search results on the page.
   * @param {string} input - The text to validate against the search results.
   */
  async validateSearchResults(input: string): Promise<boolean> {
    const titles = this.page.locator('.template--listItem--newsTitle')
    await this.webActions.WaitForVisibleWithRetry(titles.first())
    // validate that at least first 6 titles contain the search text
    const count = await titles.count()
    const limit = Math.min(6, count)

    const searchText = input.toLowerCase()

    for(let i = 0; i < limit; i++) {
      const text = (await titles.nth(i).innerText()).toLowerCase()

      if(!text.includes(searchText)) {
        return false
      }
    }

    return true
  }

}