import { englishLocators } from '../locators/englishLocators'

/**
 *Selects locators based on the specified language.
 * @param {string} language - The language for which the locators will be selected (e.g., "English").
 */
export function selectLangLocators(language : string) {
  let locators
  switch(language) {
    case 'english':
      locators = englishLocators
      return locators
    default :
      locators = englishLocators
      return locators
  }
}
