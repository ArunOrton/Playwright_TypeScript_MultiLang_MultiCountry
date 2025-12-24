import { format } from 'date-fns'
import { LocatorType,englishLocators } from '../locators/locatorImports'
import { TimeoutConstants, IAttribute, AttributeType } from '../utilities/utilitiesImports'
import { WebElementActions } from '../common/webElementActions'
import { Page, TestInfo } from 'playwright/test'
import { ControlPage } from './controlPage'

export class BasePage extends ControlPage {
  page: any
  testInfo: TestInfo
  webActions : WebElementActions

  /**
     *Initializes the class with a page object for performing actions.
     * @param {any} page - The page object for browser interactions.
     * @param {TestInfo} testInfoParam - The TestInfo object providing metadata and context about the current test.
     * @param sheetName
     */
  constructor(page: Page, testInfoParam: TestInfo, sheetName: string) {
    super(sheetName)
    this.page = page
    this.webActions = new WebElementActions()
    this.testInfo = testInfoParam
  }
  /**
   *Returns a Playwright locator for an element that contains the specified text.
   * @param {string} name - The visible text to search for in the element.
   */
  loc_getByText(name: string) {
    return this.page.getByText(name)
  }

  /**
   * @param {string} text - The value of the `aria-label` attribute to search for in the input element.
   */
  loc_Label_AriaLabel(text : string) { return (`//label[@aria-label="${text}"]`) }

  /**
   * @param {string} text - The value of the `aria-label` attribute to search for in the input element.
   */
  loc_Input_AriaLabel(text : string) { return (`//input[@aria-label="${text}"]`) }
  /**
    * @param {string} text - The text content of the `div` element to search for.
   */
  loc_Input_Text(text : string) { return (`//input[text()="${text}"]`) }
  /**
   * @param {string} text - The value of the `aria-label` attribute to search for in the button element.
   */
  loc_Button_AriaLabel(text : string) { return (`//button[@aria-label="${text}"]`) }

  /**
    * @param {string} text - The text content of the `div` element to search for.
   */
  loc_Div_Text(text : string) { return (`//div[text()="${text}"]`) }

  /**
   * @param {string} text - The text content of the `span` element to search for.
   */
  loc_Span_Text(text : string) { return (`//span[text()="${text}"]`) }

  /**
   * @param {string} text - The text content of the `a` element to search for.
   */
  loc_a_Title(text : string) { return (`//a[@title="${text}"]`) }

  /**
   * @param {string} text - The text content of the `input` element to search for.
   */
  loc_input_Title(text : string) { return (`(//input[@title="${text}"])[1]`) }

  /**
   * Generates a CSS selector for an `input` element that has a specific `appmagic-control` attribute.
 *
 * @param {string} inputName - The value of the `appmagic-control` attribute to identify the `input` element.
   */
  loc_Input_AppMagic(inputName: string) { return `//input[appmagic-control="${inputName}"]` }

  /**
    * Generates an XPath expression for a button element that contains the specified aria-label.
 *
 * @param {string} text - The aria-label text to match in the button element.
   */
  loc_Button_Contains_AriaLabel(text: string) { return `//button[contains(@aria-label,"${text}")]` }
  /**
   * Generates an XPath expression for a div element with a specific data-text attribute value.
 *
 * @param {string} text - The value of the data-text attribute to match in the div element.
   */
  loc_Div_DataText(text: string) { return `//div[data-text="${text}"]` }
  /**
   * Generates an XPath expression for a button element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the button element.
   */
  loc_Button_DataId(text: string) { return `//button[@data-id="${text}"]` }
  /**
    * Generates an XPath expression for a div element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the div element.
   */
  loc_Div_title(text: string) { return `//div[@title="${text}"]` }
  /**
   * Generates an XPath expression for a button element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the button element.
   */
  loc_Button_title(text: string) { return `//button[@title="${text}"]` }
  /**
   * Generates an XPath expression for a div element with a specific role attribute value.
 *
 * @param {string} text - The value of the role attribute to match in the div element.
   */
  loc_Div_role(text: string) { return `//div[@role="${text}"]` }
  /**
   * Generates an XPath expression for a span element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the span element.
   */
  loc_Span_DataId(text: string) { return `//span[@data-id="${text}"]` }
  /**
   * Generates an XPath expression for a ul element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the ul element.
   */
  loc_Ul_title(text: string) { return `//ul[@title="${text}"]` }
  /**
   * Generates an XPath expression for a div element with a specific class attribute value.
 *
 * @param {string} text - The value of the class attribute to match in the div element.
   */
  loc_Div_Class(text: string) { return `//div[@class="${text}"]` }
  /**
    * Generates an XPath expression for an input element whose id attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the id attribute of the input element.
   */
  loc_Input_Contains_Id(text: string) { return `//input[contains(@id,"${text}")]` }
  /**
    * Generates an XPath expression for a span element whose class attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the class attribute of the span element.
   */
  loc_Span_Contains_Class(text: string) { return `//span[contains(@class,"${text}")]` }
  /**
    * Generates an XPath expression for a span element whose class attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the class attribute of the span element.
   */
  loc_Span_Contains_Title(text: string) { return `//span[contains(@title,"${text}")]` }

  /**
 * Generates an XPath expression for an `i` element within a `span` element, where the `i` element has a specific data-icon attribute value.
 *
 * @param {string} text - The value of the data-icon attribute to match in the `i` element inside the `span` element.
   */
  loc_Span_I_DataIcon(text: string) { return `//span/i[@data-icon="${text}"` }
  /**
    * Generates an XPath expression for a button element whose class attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the class attribute of the button element.
   */
  loc_Button_Contains_Class(text: string) { return `//button[contains(@class,"${text}")]` }
  /**
   * Generates an XPath expression for an anchor (`a`) element with a specific text content.
 *
 * @param {string} text - The exact text content to match in the anchor (`a`) element.
   */
  loc_a_Text(text: string) { return `//a[text()="${text}"]` }
  /**
    * Generates an XPath expression for a-link element whose attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the contains attribute of the alink element.
   */
  loc_a_Contains_Text(text: string) { return `//a[contains(text(),"${text}")]` }
  /**
    * Generates an XPath expression for a link element whose  attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the  attribute of the link element.
   */
  loc_a_Contains_Id(text: string) { return `//a[contains(@id,"${text}")]` }
  /**
    * Generates an XPath expression for a link element whose  attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the  attribute of the link element.
   */
  loc_span_input_Contains_Id(text: string) { return `//span//input[contains(@id,"${text}")]` }
  /**
  * Generates an XPath expression for a list item (`li`) element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the list item (`li`) element.
   */
  loc_Li_DataID(text: string) { return `//li[@data-id="${text}"]` }
  /**
  * Generates an XPath expression for a list item (`li`) element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the list item (`li`) element.
   */
  loc_Li_Title(text: string) { return `//li[@title="${text}"]` }
  /**
   * Generates an XPath expression for an input element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the input element.
   */
  loc_Input_DataId(text: string) { return `//input[@data-id="${text}"]` }
  /**
   * Generates an XPath expression for an `i` element inside a `span` element, with a specific data-icon-name attribute value.
 *
 * @param {string} text - The value of the data-icon-name attribute to match in the `i` element inside the `span` element.
   */
  loc_Span_i_DataIconName(text: string) { return `//span/i[@data-icon-name="${text}"]` }
  /**
    * Generates an XPath expression for a list item (`li`) element with a specific aria-label attribute value.
 *
 * @param {string} text - The value of the aria-label attribute to match in the list item (`li`) element.
   */
  loc_Li_ArialLabel(text: string) { return `//li[@aria-label="${text}"]` }
  /**
    * Generates an XPath expression for a button element with a specific value attribute.
 *
 * @param {string} text - The value of the value attribute to match in the button element.
   */
  loc_Button_Value(text: string) { return `//button[@value="${text}"]` }
  /**
   *
   * Generates an XPath expression for an input element with a specific type attribute value.
 *
 * @param {string} text - The value of the type attribute to match in the input element.
   */
  loc_Input_Type(text: string) { return `//input[@type="${text}"]` }
  /**
    * Generates an XPath expression for a div element inside a list item (`li`), where the div's id attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the id attribute of the div element inside the li element.
   */
  loc_Li_Div_Contains_Id(text: string) { return `//li/div[contains(@id,"${text}")]` }
  /**
  * Generates an XPath expression for a div element with a specific aria-label attribute value.
 *
 * @param {string} text - The value of the aria-label attribute to match in the div element.
   */
  loc_Div_AriaLabel(text: string) { return `//div[@aria-label="${text}"]` }
  /**
  * Generates an XPath expression for a div element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the div element.
   */
  loc_Div_Dataid(text: string) { return `//div[@data-id="${text}"]` }
  /**
    * Generates an XPath expression for an `h3` element with specific text content.
 *
 * @param {string} text - The exact text content to match in the `h3` element.
   */
  loc_H3_Text(text: string) { return `//h3[text()="${text}"]` }
  /**
    * Generates an XPath expression for an `h1` element with specific text content.
 *
 * @param {string} text - The exact text content to match in the `h1` element.
   */
  loc_H1_Text(text: string) { return `//h1[text()="${text}"]` }
  /**
    * Generates an XPath expression for an `h2` element with specific text content.
 *
 * @param {string} text - The exact text content to match in the `h2` element.
   */
  loc_H2_Text(text: string) { return `//h2[text()="${text}"]` }
  /**
   * Generates an XPath expression for an input element whose data-id attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the data-id attribute of the input element.
   */
  loc_Input_Contains_DataId(text: string) { return `//input[contains(@data-id,"${text}")]` }
  /**
   /**
 * Generates an XPath expression for a div element that contains specific text.
 *
 * @param {string} text - The substring to match within the text content of the div element.
   */
  loc_Div_Contains_Text(text: string) { return `//div[contains(text(),"${text}")]` }
  /**
   *
    * Generates an XPath expression for a span element that contains specific text.
 *
 * @param {string} text - The substring to match within the text content of the span element.
   */
  loc_Span_Contains_text(text: string) { return `//span[contains(text(),"${text}")]` }
  /**
   * Generates an XPath expression for a button element with a specific data-title attribute value.
 *
 * @param {string} text - The value of the data-title attribute to match in the button element.
   */
  loc_Button_Data_Title(text: string) { return `//button[@data-title="${text}"]` }
  /**
    * Generates an XPath expression for a div element whose class attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the class attribute of the div element.
   */
  loc_Div_Contains_class(text: string) { return `//div[contains(@class,"${text}")]` }
  /**
    * Generates an XPath expression for a button element with a specific name attribute value.
 *
 * @param {string} text - The value of the name attribute to match in the button element.
   */
  loc_Button_Name(text: string) { return `//button[@name="${text}"]` }
  /**
  * Generates an XPath expression for a span element inside a div element that contains specific text.
 *
 * @param {string} text - The exact text content to match in the span element inside the div element.
   */
  loc_Div_Span_Text(text: string) { return `//div/span[text()="${text}"]` }
  /**
   * Generates an XPath expression for a label element that contains specific text.
 *
 * @param {string} text - The exact text content to match in the label element.
   */
  loc_Label_Text(text: string) { return `//label[text()="${text}"]` }
  /**
    * Generates an XPath expression for an input element with a specific name attribute value.
 *
 * @param {string} text - The value of the name attribute to match in the input element.
   */
  loc_Input_Name(text: string) { return `//input[@name="${text}"]` }
  /**
    * Generates an XPath expression for an input element with a specific name attribute value.
 *
 * @param {string} text - The value of the name attribute to match in the input element.
   */
  loc_Input_Value(text: string) { return `//input[@value="${text}"]` }
  /**
   * Generates an XPath expression for an input element whose name attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the name attribute of the input element.
   */
  loc_Input_Conatains_Name(text: string) { return `//input[contains(@name,"${text}")]` }
  /**
    * Generates an XPath expression for an input element whose value attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the value attribute of the input element.
   */
  loc_Input_Conatains_Value(text: string) { return `//input[contains(@value,"${text}")]` }
  /**
  * Generates an XPath expression for an input element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the input element.
   */
  loc_Input_Title(text: string) { return `//input[@title="${text}"]` }
  /**
  * Generates an XPath expression for a div element whose title attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the title attribute of the div element.
   */
  loc_Div_Contains_Title(text: string) { return `//div[contains(@title,"${text}")]` }
  /**
   * Generates an XPath expression for an input element whose title attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the title attribute of the input element.
   */
  loc_Input_Contains_Title(text: string) { return `//input[contains(@title,"${text}")]` }
  /**
   * Generates an XPath expression for a span element whose id attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the id attribute of the span element.
   */
  loc_Span_Contains_Id(text: string) { return `//span[contains(@id,"${text}")]` }
  /**
 * Generates an XPath expression for a span element with a specific title attribute value.
 *
 * @param {string} text - The value of the title attribute to match in the span element.
 * */
  loc_Span_Title(text: string) { return `//span[@title="${text}"]` }
  /**
 * Generates an XPath expression for a span element inside a div element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the span element inside the div element.
 * */
  loc_Span_Label_Title(text: string) { return `//span/label[@title="${text}"]` }
  /**
 * Generates an XPath expression for a span element inside a div element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the span element inside the div element.
 * */

  /**
   * Generates an XPath expression for a span element inside a div element with a specific data-id attribute value.
 *
 * @param {string} text - The value of the data-id attribute to match in the span element inside the div element.
   */
  loc_Div_Span_DataId(text: string) { return `//div/span[@data-id="${text}"]` }
  /**
 * Generates an XPath expression for a button element whose id attribute contains a specific substring.
 *
 * @param {string} text - The substring to match within the id attribute of the button element.
 */
  loc_Button_Contains_Id(text: string) { return `'//button[contains(@id,"${text}")]` }

  /**
   *Returns an XPath locator for an <h1> element with the specified title.
   * @param {string} text - The exact title text of the <h1> element.
   */
  loc_h1_Title(text: string) { return `//h1[@title="${text}"]` }

  /**
   *Returns an XPath locator for an <h3> element containing the specified text.
   * @param {string} text - The partial text content to match within the <h3> element.
   */
  loc_H3_Contains_Text(text: string) { return `//h3[contains(text(),"${text}"]` }

  /**
 * Returns an XPath locator for an element with the given ARIA role and label.
 * @param {string} label - The ARIA label of the element.
 * @param {string} role - The ARIA role of the element.
   */
  loc_TextWithRole(label: string, role: string) {
    return `//div[text()="${label}" and @role="${role}"]`
  }

  /**
   *
   * @param {string} name - The name of the label to be retrieved.
   */
  getByLabel(name: string) {
    return this.page.getByLabel(name)
  }
  /**
   * Returns an XPath locator for a <tr> element with the specified ARIA label.
   * @param {string} text - The ARIA label text to match.
   */
  loc_Tr_Aria_Label(text:string) { return `//tr[@aria-label="${text}"]` }

  /**
   * Returns an XPath locator for an <input> element with the given placeholder text.
   * @param {string} text - The placeholder text of the input.
   */
  loc_Input_Placeholder(text:string) { return `//input[@placeholder="${text}"]` }

  /**
     *Opens the lead or opportunity section in the sales hub based on the provided name.
     * @param {string} salesName - The name of the section to open (e.g., "Lead" or "Opportunity").
     */
  async openSalesHubLeadOrOpportunity(salesName) {
    await this.clickTile(commonLocators.salesHub)
    await this.clickSideTab(salesName)
    await new Promise(f => setTimeout(f, TimeoutConstants.TIMEOUT_5_SEC))
  }
  /**
     *Retrieves the label text of an element using its locator ID.
     * @param {string} commlocatorID - The locator ID of the element.
     */
  async getLabelText(commlocatorID) {
    const value = await this.page.locator(commlocatorID)
    await value.scrollIntoViewIfNeeded()
    await value.click()
    return await value.inputValue()
  }
  /**
   *
   * @param {string} commlocatorID - The unique ID used to identify the common locator.
   * @param {string} [position='first'] - The position of the label to retrieve.
   */
  async getLabelTextByIndex(commlocatorID: string, position :string = 'first') {
    let locator = await this.page.locator(commlocatorID).first()
    switch(position) {
      case 'first':
        locator = await this.page.locator(commlocatorID).first()
        break
      case 'last':
        locator = await this.page.locator(commlocatorID).last()
        break
      default:
        break
    }
    await locator.scrollIntoViewIfNeeded()
    await locator.click()
    return await locator.inputValue()
  }
  /**
     *Retrieves the text content of an element based on its locator.
     * @param {string} txtlocator - The locator of the element.
     */
  async getTextContent(txtlocator) {
    const txtvalue = await this.page.locator(txtlocator)
    const onTxtVal = await txtvalue.textContent()
    return await onTxtVal
  }
  /**
     *Retrieves the label text associated with a specific input field.
     * @param {string} cdcLocatorText - The aria-label locator of the input field.
     */
  async getLabelForCDC(cdcLocatorText) {
    const value = await this.page.locator(`//input[@aria-label="${cdcLocatorText}"]`)
    await value.click()
    await value.scrollIntoViewIfNeeded()
    return await value.inputValue()
  }
  /**
     *Retrieves the text of a button based on its "aria-label".
     * @param {string} textOnButton - The aria-label of the button.
     */
  async getButtonText(textOnButton) {
    const value = await this.page.locator(`//button[@aria-label="${textOnButton}"]`)
    return await value.textContent()
  }

  /**
     *Selects and interacts with a specific frame within the page.
     * @param {string} frameLocator - The locator of the frame to interact with.
     */
  async selectFrame(frameLocator) {
    const frameElmt = await this.page.frameLocator(frameLocator)
    return frameElmt
  }

  /**
   *Clicks on a specific tile within the sales hub interface.
   * @param {string} salesHub - The identifier of the tile to click.
   */
  async clickTile(salesHub) {
    const frameElmt = await this.selectFrame(commonLocators.appLandingFrame)
    await frameElmt.locator(salesHub).click()
  }

  /**
   *Selects and clicks a side tab identified by its ID.
   * @param {string} tabName - The ID of the tab to click.
   */
  async clickSideTab(tabName) {
    const leadTab = await this.page.locator(`#${tabName}`)
    await leadTab.click()
  }

  /**
   *Clicks on the refresh button
   */
  async clickRefreshButton() {
    const refBtn = await this.page.locator(commonLocators.refresh)
    await refBtn.click({ force: true })
  }

  // async clickSaveandGoBack() {
  //  await this.webActions.Click(this.account.clickSave)
  //  await this.webActions.Click(this.account.goBack)
  // }

  /**
   *Clicks a button identified by its role and name.
   * @param {string} buttonName - The name of the button to click.
   */
  async clickButtonByRole(buttonName) {
    const btnName = await this.page.getByRole('button', { name: buttonName })
    await this.page.waitForTimeout(TimeoutConstants.TIMEOUT_1_SEC)
    await btnName.click()
  }

  /**
   *Clicks a button identified by its "aria-label".
   * @param {string} moreBtnName - The aria-label of the button to click.
   */
  async clickMoreOptionsBtn(moreBtnName) {
    const moreOptionClick = await this.page.locator(`//button[@aria-label="${moreBtnName}"]`)
    await moreOptionClick.click({ timeout: TimeoutConstants.TIMEOUT_5_SEC })
    await this.page.getByRole('menuitem', { name: 'Refresh' }).click()
  }

  /**
     *Compares two JSON arrays and identifies missing items in the actual array.
     * @param {any[]} expectedArray - The expected array of values.
     * @param {any[]} actualArray - The actual array of values to compare.
     */
  async compareJsonArrays(expectedArray, actualArray) {
    const missingLeadHeadingItems = expectedArray.filter((value) => !actualArray.includes(value))
    return missingLeadHeadingItems
  }

  /**
   *Retrives the territory name
   */
  async getTerritoryName() {
    return await this.page.locator(commonLocators.getTerritoryName)
  }

  /**
   *Retrives the access denied error popup
   */
  async getAccessDeniedName() {
    return await this.page.locator(commonLocators.accessDeniedPopup)
  }

  // 355241 Validate if a input field in mandatory. Pass aria-label value as parameter
  /**
     *Validates whether a specified field is marked as mandatory.
     * @param {string} fieldName - The locator of the field to validate.
     */
  async validateMandatory(fieldName) {
    const inputFieldLoc = await this.page.locator(fieldName)
    const ariaRequired = await inputFieldLoc.getAttribute('aria-required')
    const htmlRequired = await inputFieldLoc.getAttribute('required')
    if(ariaRequired === 'true' || htmlRequired !== null) {
      console.log(fieldName + ' input field is mandatory.')
    } else {
      console.log(fieldName + ' input field is not mandatory.')
    }
  }

  /**
     *Handles the pop up on save and clicks on it.
     * @param {string} calledMethodName - The name of the method that triggered the popup, used for logging or debugging.
     * @param {number} timeoutParam - The timeout in milliseconds to wait for the popup before proceeding.
     */
  async popupHandleOnSave(calledMethodName:string,  timeoutParam = TimeoutConstants.TIMEOUT_5_SEC) {
    await this.page
      .waitForSelector(commonLocators.ignoreSaveBtn, { timeout: timeoutParam })
      .then(async () => {
        await this.page.locator(commonLocators.ignoreSaveBtn).click({ timeout: timeoutParam })
      })
      .catch(() => {
        console.log(`${calledMethodName} :No Duplicate Rule popup appeared on Save.`)
      })
  }

  /**
     *Handles the business errro pop up on save and clicks on it.
     * @param {string} calledMethodName - The name of the method that triggered the popup, used for logging or debugging.
     * @param {number} timeoutParam - The timeout in milliseconds to wait for the popup before proceeding.
     */
  async businessProcessErrorPopupOnSave(calledMethodName:string, timeoutParam = TimeoutConstants.TIMEOUT_5_SEC) {
    await this.page
      .waitForSelector('//button[@title=\'Ok\' or @title=\'OK\']', { timeout: timeoutParam })
      .then(async () => {
        await this.page.locator('//button[@title=\'Ok\' or @title=\'OK\']').click()
      })
      .catch(() => {
        console.log(`${calledMethodName} :Business Process Error appeared`)
      })
  }
  /**
   *
   */
  async clickOkButtonWarnings() {
    await this.webActions.ClickAll(await this.page.locator('//button[@title=\'Ok\' or @title=\'OK\']'))
  }

  /**
     *scrolls into territory on the opportunity page.
     */
  async scrollToTerritoryInOpportunity() {
    //await this.page.locator('//textarea[@data-id="proposedsolution.fieldControl-text-box-text"]').click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.locator(commonLocators.scrollToTerritoryInOpportunity).scrollIntoViewIfNeeded()
    await this.page.locator(commonLocators.scrollToTerritoryInOpportunity).click()
  }

  /**
   *Refreshes the page and checks for the specified territory data based on the sales name.
   * @param {string} salesName - The sales name to validate ("Lead" or "Opportunity").
   * @param {any} leadData - The data object containing territory details.
   * @param {boolean} isPopup - Indicates if the operation involves a popup.
   */
  async refreshForTerritory(salesName, leadData, isPopup) {
    let refreshRetry = 1
    let maxRetries = isPopup ? 4 : 5
    let element
    do {
      if(salesName === 'Lead') {
        await this.page.waitForSelector(commonLocators.refresh)
        await this.page.locator(commonLocators.refresh).click({ force: true })
        // await this.refreshPopUp()
        element = isPopup ? await this.getAccessDeniedName() : await this.getTerritoryName()
        await new Promise(f => setTimeout(f, TimeoutConstants.TIMEOUT_3_SEC))
        if(!isPopup) { await this.doPageScroll(commonLocators.scrollClassification) }
      } else if(salesName === 'Opportunity') {
        await this.opportunityRefresh()
        element = await this.page.getByLabel(leadData.BDterritory, { exact: true })
      }

      await new Promise(resolve => setTimeout(resolve, TimeoutConstants.TIMEOUT_10_SEC))

      if(!(await element.isVisible())) {
        console.log(isPopup ? 'Access Denied Error not visible' : `Territory not loaded refreshing for ${refreshRetry} time`)
        refreshRetry++
      } else {
        break
      }
    } while(refreshRetry <= maxRetries)
  }

  /**
     *Validates the content of an email by accessing the frame specified by its class name.
     * @param {string} frameClassName - The class name of the frame containing the email content.
     */
  async validateEmailContent(frameClassName) {
    const emailBody = await this.page.frameLocator(`${frameClassName}`)
    // let concatenatedString = '';
    // for(let i=0;i<=4;i++){
    const emaillocator = await emailBody.locator('//div[@data-wrapper="true"]//p').nth(0).innerText()
    const emailContent = await emaillocator.replace(/\xA0/g, ' ')
    //console.log(emailContent)
    // concatenatedString += `${emailContent}`;
    // }
    return await emailContent
  }

  /**
   *Retrieves the name of the main owner from the specified locator.
   * @param {string} owner - The identifier of the owner.
   */
  async getMainOwnerName(owner) {
    const name = await this.page.locator(`//div/a[contains(@aria-label, "${owner}") and @href]`).first()
    const ownerName = await name.textContent()
    return await ownerName
  }

  /**
   *Checks if a field identified by its data ID name is editable.
   * @param {string}  dataIDName - The locator of the field to check.
   */
  async checkFieldEditable(dataIDName) {
    try {
      const fieldLoc = await this.page.locator(dataIDName).first()
      await fieldLoc.scrollIntoViewIfNeeded()
      await fieldLoc.hover()
      const isEditable = await this.page.locator(dataIDName, (field) => {
        return this.checkReadOnly(field)
      })
      return await this.getFieldStatus(dataIDName, isEditable)
    } catch(error) {
      console.error('An error occurred:', error)
      return false
    }
  }
  /**
   *
   * @param {string} locatorString - the locator type to be provided.
   */
  async checkFieldEditableSanity(locatorString: string): Promise<boolean> {
    try {
      const field = this.page.locator(locatorString).first()
      await this.webActions.hOverWithNoException(field, TimeoutConstants.TIMEOUT_5_SEC, 3)
      const tag = await field.evaluate(el => el.tagName.toLowerCase())   // Check if it's a native editable field
      if(['input', 'textarea', 'select'].includes(tag)) {
        const isNativeEditable = await field.evaluate((el: HTMLInputElement) => {
          const style = window.getComputedStyle(el)
          return (
            !el.disabled &&
            !el.readOnly &&
            style.pointerEvents !== 'none' &&
            style.visibility !== 'hidden' &&
            style.display !== 'none' &&
            el.offsetParent !== null
          )
        })

        console.log(`Field '${locatorString}' is ${isNativeEditable ? '' : 'NOT '}editable (native input).`)
        return isNativeEditable
      }
      const closeButton = field.locator('button.ms-TagItem-close, button[title*="Remove"]')
      const searchButton = field.locator('button[aria-label*="Search"], button[title*="Search"]')

      const hasCloseButton = await closeButton.count() > 0
      const isSearchButtonVisible = await searchButton.first().isVisible().catch(() => false)

      const isEditable = hasCloseButton || isSearchButtonVisible

      console.log(`Field '${locatorString}' is ${isEditable ? '' : 'NOT '}editable (custom lookup).`)
      return isEditable

    } catch(error) {
      console.error(`❌ Error in checkFieldEditable("${locatorString}"):`, error)
      return false
    }
  }
  /**
     *Determines the editable status of a field based on its data ID name.
     * @param {string} dataIDName - The data ID name of the field.
     * @param {boolean} isEditable - Indicates whether the field should be editable.
     */
  async getFieldStatus(dataIDName, isEditable) {
    //const fieldName = dataIDName.split('.')[0];
    if(isEditable) {
      console.log('Field locator ' + dataIDName + ' is not editable.')
      return true
    } else {
      console.log('Field locator ' + dataIDName + ' is editable.')
      return false
    }
  }
  /**
     *Checks if a given field is read-only or disabled.
     * @param {any} field - The field to be checked.
     */
  async checkReadOnly(field) {
    // Check if the field is disabled or read-only
    const isDisabled = field.getAttribute('disabled') !== null
    const isReadOnly = field.getAttribute('readonly') !== null
    return isDisabled || isReadOnly
  }

  /**
     *Retrives current ISO Time
     */
  async getCurrentIsoTime() {
    const currentDate = new Date()
    //console.log("Current date and time : " +currentDate)
    const isoTime = currentDate.toISOString()
    console.log('ISO date and time : ' + isoTime)
    const date = new Date(isoTime)
    const formattedDate = format(date, 'M/d/yyyy')
    console.log('date in field: ' + formattedDate)
    return formattedDate
  }

  /**
   *Clicks on the popup arriving after clicking on refresh.
   */
  async refreshPopUp() {
    try {
      await this.page
        .waitForSelector(commonLocators.refreshPopUpBtn, { timeout: TimeoutConstants.TIMEOUT_5_SEC })
        .then(async () => {
          await this.page.locator(commonLocators.refreshPopUpBtn).click()
        }).catch(() => {
          console.log('')
        })
    } catch{
      console.log('Save changes dialog on refresh click not appeared')
    }
  }

  /**
   *Clears the text of a specified field.
   * @param {string} locator - The locator of the field to clear.
   */
  async clearTextField(locator) {
    await this.page.locator(locator).scrollIntoViewIfNeeded()
    await this.page.locator(locator).fill('')
  }

  /**
   *Performs a scroll operation on the page to bring the specified element into view.
   * @param {string} scrollElmt - The locator of the element to scroll to.
   */
  async doPageScroll(scrollElmt) {
    const outletAddress = await this.page.locator(scrollElmt)
    await outletAddress.scrollIntoViewIfNeeded()
  }

  /**
   *Clicks on Read only Grid View.
   */
  async clickReadOnlyGrid() {
    await this.page
      .waitForSelector(commonLocators.readOnlyGrid, { timeout: TimeoutConstants.TIMEOUT_10_SEC })
      .then(async () => {
        await this.page.locator(commonLocators.readOnlyGrid).click()
      }).catch(() => {
        console.log('Read Only Grid View didn\'t appear')
      })
  }

  /**
     *Retrieves the value of an opportunity row from a specified div element.
     * @param {string} rowValue - The value to locate within the div element.
     */
  async getOppRowValue(rowValue) {
    const contactOnRow = await this.page.locator(`//div//div[contains(text(), '${rowValue}')]`).first()
    return await contactOnRow.textContent()
  }

  /**
     *Retrieves the value of an opportunity row from a specified div element.
     * @param {string} rowValue - The value to locate within the div element.
     */
  async getOppRowValForAcc(rowValue) {
    const contactOnRow = await this.page.locator(`//div//span[contains(text(), '${rowValue}')]`).first()
    return await contactOnRow.textContent()
  }

  /**
     *Retrieves the value of an opportunity row from a specified div element.
     * @param {string} rowValue - The value to locate within the div element.
     */
  async getOppRowValueFromDiv(rowValue) {
    const contactOnRow = await this.page.locator(`//div//div[contains(@id, 'tooltip')][contains(text(), '${rowValue}')]`).first()
    return await contactOnRow.textContent()
  }

  /**
   *Checks and fills mandatory fields in a form. If saving is enabled, it will attempt to save after filling.
   * @param {object} record - The record containing the mandatory field values (e.g., firstName).
   * @param {boolean} isSave - A flag to indicate if the form should be saved after filling.
   * @param {number} maxRetries - The maximum number of retries allowed for filling the fields.
   */
  async checkAndFillMandatory(record, isSave, maxRetries = 5) {
    let retries = 0
    let nameFilledSuccessfully  = false

    while(retries < maxRetries && !nameFilledSuccessfully) {
      try {
        let fName = await this.getLabelText(commonLocators.firstName)
        let lName = await this.getLabelText(commonLocators.lastName)
        if(fName === '') {
          await this.page.locator(commonLocators.firstName).fill(record.firstName)
          fName = await this.getLabelText(commonLocators.firstName)
        }
        if(lName === '') {
          await this.page.locator(commonLocators.lastName).fill(record.lastName)
          lName = await this.getLabelText(commonLocators.lastName)
        }

        if(isSave) {
          if((fName !== '') && (lName !== '')) {
            await this.page.locator(commonLocators.saveLead).click({ force: true })
            await this.popupHandleOnSave(isSave)
          }
        }

        // Check if the error is still present
        await this.page.waitForTimeout(TimeoutConstants.TIMEOUT_3_SEC)
        const errorFNameVisible = await this.page.isVisible('//span[contains(text(), \'First Name: Required fields must be filled in.\')]')
        // Check if the error is still present
        const errorLNameVisible = await this.page.isVisible('//span[contains(text(), \'Last Name: Required fields must be filled in.\')]')

        if(!errorFNameVisible && !errorLNameVisible) {
          nameFilledSuccessfully  = true
        } else {
          retries++
        }

      } catch(error) {
        console.error('Error while trying to fill the first and last name:', error)
        retries++
      }
    }
    if(!nameFilledSuccessfully) {
      throw new Error('Failed to fill the first and last name correctly after multiple attempts.')
    }
  }

  /**
   *Refreshes the opportunity page clicking on more
   */
  async opportunityRefresh() {
    if(await this.IsButtonVisible(commonLocators.oppMoreButton)) {
      await this.page.locator(commonLocators.oppMoreButton).click()
      await this.page.getByRole('menuitem', { name: 'Refresh' }).click()
    } else {
      await this.page.locator(commonLocators.refreshOpportunity).click({ force: true })
    }
  }

  /**
     *Checks if a button is visible within a given number of retries and delays between attempts.
     * @param {string} btnName - The button's name or locator.
     * @param {number} retries - The number of retries to check the button visibility.
     * @param {number} delay - The delay in milliseconds between retries.
     */
  async IsButtonVisible(btnName, retries = 3, delay = TimeoutConstants.TIMEOUT_1_SEC) {
    for(let i = 0; i < retries; i++) {
      try {
        const result = await this.page.locator(btnName).isVisible()
        if(result) {
          return true
        }
      } catch{
        // Ignore errors during retries
      }
      await this.page.waitForTimeout(delay)
    }
    return false
  }

  /**
   *Checks if a button is visible within a given number of retries and delays between attempts.
   * @param {string} btnName - The button's name or locator.
   * @param {number} retries - The number of retries to check the button visibility.
   * @param {number} delay - The delay in milliseconds between retries.
   */
  async buttonVisibleClick(btnName, retries = 3, delay = TimeoutConstants.TIMEOUT_3_SEC) {
    for(let i = 0; i < retries; i++) {
      try {
        const result = await this.page.locator(btnName).isVisible()
        if(result) {
          await this.page.locator(btnName).click()
        }
      } catch{
        console.log('Button not visible')
      }
      await this.page.waitForTimeout(delay)
    }
  }

  /**
   *Clicks on the sign out button.
   */
  async signOutPage() {
    await this.page.locator(commonLocators.accManagerBtn).click()
    await this.page.locator(commonLocators.signOutBtn).click({ timeout: TimeoutConstants.TIMEOUT_5_SEC })
  }

  /**
   * Scrolls to the top of the page.
   *
   * @returns {Promise<void>} - A promise that resolves when the scroll operation is complete.
  */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollBy(0, -window.innerHeight)
    })
  }

  /**
   *
   */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(async () => {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      for(let i = 0; i < document.body.scrollHeight; i += 100) {
        window.scrollTo(0, i)
        await delay(100)
      }
    })
  }

  /**
   * Scrolls the page by the specified top and bottom values.
   *
   * @param {number} top - The number of pixels to scroll horizontally.
   * @param {number} bottom - The number of pixels to scroll vertically.
   * @returns {Promise<void>} - A promise that resolves when the scroll operation is complete.
  */
  async scroll(top: string, bottom: string): Promise<void> {
    await this.page.evaluate(({ top, bottom }) => {
      window.scrollBy(Number(top), Number(bottom))
    }, { top, bottom })
  }

  /**
   *Returns a Playwright locator for a dropdown element with the specified accessible name.
   * @param {string} name - The accessible name (label) of the dropdown element.
   */
  getByRoleDropdown(name :string) {
    return this.page.getByRole('combobox', { name })
  }

  /**
   *Returns a Playwright locator for an option element within a dropdown or listbox, identified by its name.
   * @param {string} name - The name or label of the option to select.
   */
  getByRoleOption(name: string) {
    return this.page.getByRole('option', { name })
  }

  /**
   *
   * @param {AttributeType} type - The type of attributes to fetch
   */
  async  getAttributesSet(type: AttributeType): Promise<IAttribute[]> {
    const commonAttributes: IAttribute[] = [
      { text: 'Call Concept & Frequency (CCAF)', xpath: commonLocators.CCAF, code: 'Z_CCAF' },
      { text: 'Customer seasonality', xpath: commonLocators.customerSeasonality, code: 'Z_CCAF_SEASONALITY' },
      { text: 'Local Customer Segmentation', xpath: commonLocators.localCustomerSegmentation, code: 'ZLOCAL_SEGMENTATION' },
      { text: 'High Season To', xpath: commonLocators.highSeasonTo, code: 'ZCCAF_HIGH_SEASON_TO' },
      { text: 'High Season From', xpath: commonLocators.highSeasonFrom, code: 'ZCCAF_HIGH_SEASON_FROM' },
    ]

    const extraAttributes: IAttribute[] = [
      { text: 'Valid from date season 2', xpath: commonLocators.validFromDateSeason2, code: '' },
      { text: 'Valid to date season 2', xpath: commonLocators.validToDateSeason2, code: '' },
      { text: 'RED Customer', xpath: commonLocators.redCustomer, code: 'ZRED_OUTLET' },
      { text: 'BD Service Time', xpath: commonLocators.bdServiceTime, code: 'ZSERVICE_TIME' },
      { text: 'Focus Outlet', xpath: commonLocators.focusOutlet, code: 'ZFOCUS_OUTLET' },
    ]
    let result: any[] = []
    switch(type) {
      case 'Wave0':
        result = commonAttributes
        break
      case 'Wave1':
        result = [...commonAttributes, ...extraAttributes]
        break
    }

    return result // optional fallback
  }
}