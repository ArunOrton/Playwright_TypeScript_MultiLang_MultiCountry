import { Locator, Page, TestInfo, expect } from '@playwright/test'
import CryptoJS from 'crypto-js'
import { BasePage } from './basePage'

/**
 * Page Object Model for Microsoft / D365 login flow.
 * Handles navigation, credential decryption, login retries,
 * and resilient input handling.
 */
export class D365Login extends BasePage {

  /**
   * Creates an instance of D365Login.
   *
   * @param page - Playwright Page instance
   * @param testInfoParam - Playwright TestInfo metadata
   */
  constructor(page: Page, testInfoParam: TestInfo) {
    super(page, testInfoParam)
  }

  /* =========================
     Locators
     ========================= */

  /**
   * Username / email input field
   */
  get userName(): Locator {
    return this.page.locator(this.loc_Input_Type('email'))
  }

  /**
   * Generic Next / Submit button
   */
  get nextButton(): Locator {
    return this.page.locator(this.loc_Input_Type('submit'))
  }

  /**
   * Password input field
   */
  get password(): Locator {
    return this.page.locator(this.loc_Input_Type('password'))
  }

  /**
   * Login error message container
   */
  get loginError(): Locator {
    return this.page.locator('//div[@role="alert"]/div')
  }

  /* =========================
     Navigation
     ========================= */

  /**
   * Navigates to the given URL and validates page load.
   *
   * @param url - Target application URL
   * @throws Error if URL validation fails
   */
  async goTo(url: string): Promise<void> {
    await this.page.goto(url)
    await this.page.waitForLoadState('load', { timeout: 10_000 })
    expect(this.page.url()).toContain(url)
  }

  /* =========================
     Login APIs
     ========================= */

  /**
   * Logs into Microsoft/D365 by decrypting credentials first.
   *
   * @param encryptedUsername - AES encrypted username
   * @param encryptedPassword - AES encrypted password
   */
  async microsoftLogin(
    encryptedUsername: string,
    encryptedPassword: string
  ): Promise<void> {
    console.log('Microsoft Login: Started.')

    const username: string = CryptoJS.AES.decrypt(
      encryptedUsername,
      'myUserKey'
    ).toString(CryptoJS.enc.Utf8)

    const password: string = CryptoJS.AES.decrypt(
      encryptedPassword,
      'myPasswordKey'
    ).toString(CryptoJS.enc.Utf8)

    await this.performLogin(username, password)

    console.log('Microsoft Login: Completed.')
  }

  /**
   * Logs into Microsoft/D365 using encrypted credentials
   * without exposing decrypted values to the caller.
   *
   * @param encryptedUsername - AES encrypted username
   * @param encryptedPassword - AES encrypted password
   */
  async microsoftLoginWithoutDecrypt(
    encryptedUsername: string,
    encryptedPassword: string
  ): Promise<void> {
    console.log('Microsoft Login: Started.')

    const username: string = CryptoJS.AES.decrypt(
      encryptedUsername,
      'myUserKey'
    ).toString(CryptoJS.enc.Utf8)

    const password: string = CryptoJS.AES.decrypt(
      encryptedPassword,
      'myPasswordKey'
    ).toString(CryptoJS.enc.Utf8)

    await this.performLogin(username, password)

    console.log('Microsoft Login: Completed.')
  }

  /* =========================
     Internal Helpers
     ========================= */

  /**
   * Executes the core login flow after credentials are ready.
   *
   * @param username - Decrypted username
   * @param password - Decrypted password
   */
  private async performLogin(
    username: string,
    password: string
  ): Promise<void> {
    await this.userName.fill(username)
    await this.nextButton.click()

    await this.page.waitForLoadState('load')

    await this.page.waitForSelector(
      '//input[@type="password" and @aria-required="true"]',
      { state: 'visible', timeout: 600_000 }
    )

    await this.fillPasswordWithRetry(this.page, password)
  }

  /**
   * Fills the password field and retries submission if login errors appear.
   *
   * @param page - Playwright Page instance
   * @param password - Decrypted password
   * @param maxRetries - Maximum retry attempts (default: 5)
   * @throws Error if all retries fail
   */
  async fillPasswordWithRetry(
    page: Page,
    password: string,
    maxRetries: number = 5
  ): Promise<void> {
    let retries = 0

    while (retries < maxRetries) {
      try {
        await this.password.fill(password)
        await this.nextButton.click()

        await page.waitForTimeout(2000)

        const errorVisible: boolean = await page.isVisible('#passwordError')
        if (!errorVisible) {
          return
        }

        retries++
        console.log(`Retrying password entry (${retries}/${maxRetries})`)
      } catch (error) {
        console.error('Password fill attempt failed:', error)
        retries++
      }
    }

    throw new Error(
      'Failed to fill the password correctly after multiple attempts.'
    )
  }

  /**
   * Safely fills an input field.
   * Falls back to sequential key presses if `.fill()` fails.
   *
   * @param locator - Target input locator
   * @param value - Value to enter
   */
  async locatorFill(
    locator: Locator,
    value: string
  ): Promise<void> {
    await locator.waitFor({ state: 'visible' })
    await locator.focus()

    try {
      await locator.fill(value)
    } catch {
      await locator.pressSequentially(value)
    }
  }
}
