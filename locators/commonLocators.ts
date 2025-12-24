
export const commonLocators  =  {
  username: '#i0116',
  password: '#i0118',
  marketValue: '(//div[contains(@class,"megaNav__topBar__market")]//div[contains(@style,"color: rgb")])[1]',
  currentLanguage: '//i[@data-icon-name="ChevronDown"]/parent::span[contains(@class,"title")]',
  languageDropdown: '(//div[@data-ktp-target="true" and @role="combobox"])[1]',
  englishLanguageOption: '//span[text()="English" and contains(@class,"ms-Dropdown-optionText")]',
  newsTile: '(//a[@aria-label="News Card"])[1]',
  searchIcon: '//div[contains(@class,"searchIcon")]',
  searchBannerInputField: '//input[@role="searchbox"]',
  stockTicker: '(//div[contains(@class,"megaNav__topBar__market")]//div[@style="color: black;"])[1]',
  logo: '//a[contains(@class,"burgerMenu")]/following-sibling::div[contains(@class,"megaNav__logo")]//img[@alt="home"]',
  myInfoBtn: '#WelcomeButton',
  filesBtn: '//button[@name="Files"]'
}