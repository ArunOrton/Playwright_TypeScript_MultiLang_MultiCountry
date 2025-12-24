import { commonLocators } from './commonLocators'

interface ICountryLocator {
  cookiesConsentYes: string,
  goToTop: string,
  countryName: string,
}

export type LocatorType = ICountryLocator & typeof commonLocators;