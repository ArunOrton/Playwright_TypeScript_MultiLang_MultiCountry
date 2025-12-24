/**
 *A function that handles the business role configuration based on the provided role.
 * @param {string} role - The business role to be configured
 */
export function businessRole(role : string) {
  let roleList : string[]
  switch(role) {
    case 'BD':
      roleList = ['CCH Business Developer', 'Sales Enterprise app access']
      return roleList
    case 'CCA':
      roleList = ['CCH Contact Center Agent', 'Sales Enterprise app access']
      return roleList
    default :
      console.log('Invalid Role: ' + role)
      break
  }

}


// The value returned from this function is use to set on the country configration(App Settings -> Users) page
// for 'Country/Region' field
/**
 *A function that configures settings or behavior based on the provided country.
 * @param {string} country - The name of the country, which will dictate the configuration
 */
export function countryNameChangeConfig(country : string) {
  switch(country) {
    case 'Republic of Ireland' :
    case 'Ireland' :
      return 'Ireland'
    case 'Northern Ireland' :
    case 'United Kingdom':
    case 'Great Britain' :
      return 'United Kingdom'
    case 'Bosnia & Herzegovina' :
    case 'Bosnia' :
    case 'Bosnia and Herzegovina' :
    case 'Herzegovina':
      return 'Bosnia and Herzegovina'
    case 'Czech Republic' :
    case 'Czech' :
      return 'Czech Republic'
    default :
      return country
  }
}

// The value returned from this function is used in CDC Page to select templates and inside the TC as 'country' param
// and to identify the testData folders
/**
 *A function that configures settings or behavior based on the provided country.
 * @param {string} country - The name of the country, which will dictate the configuration
 */
export function multiNameCountries(country) {
  switch(country) {
    case 'Republic of Ireland' :
    case 'Ireland' :
      return 'Republic of Ireland'
    case 'Northern Ireland' :
    case 'United Kingdom':
    case 'Great Britain' :
      return 'Northern Ireland'
    case 'Bosnia & Herzegovina' :
    case 'Bosnia' :
    case 'Bosnia and Herzegovina' :
    case 'Herzegovina':
      return 'Bosnia & Herzegovina'
    case 'Czech Republic' :
    case 'Czech' :
      return 'Czech Republic'
    default :
      return country
  }
}