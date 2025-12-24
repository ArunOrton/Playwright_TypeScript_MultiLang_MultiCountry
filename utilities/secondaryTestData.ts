import { testDataAustria } from '../testData/Austria/MDG_TestData_Austria'
import { testDataHungary } from '../testData/Hungary/MDG_TestData_Hungary'
import { testDataNorthernIreland } from '../testData/Northern_Ireland/MDG_TestData_Northern_Ireland'


/**
 *Provides test data based on the specified country.
 * @param {string} country  - The name of the country, which will dictate the test data.
 */
export function secondaryTestData(country:string) {
  let leadData
  switch(country) {
    case 'Northern_Ireland' :
      leadData = testDataNorthernIreland
      return leadData
    case 'Austria' :
      leadData = testDataAustria
      return leadData
    case 'Hungary' :
      leadData = testDataHungary
      return leadData
    // case 'Bosnia_and_Herzegovina' :
    //   leadData = testDataBosnia
    //   return leadData
    // case 'Bulgaria' :
    //   leadData = testDataBulgaria
    //   return leadData
    // case 'Croatia' :
    //   leadData = testDataCroatia
    //   return leadData
    // case 'Cyprus' :
    //   leadData = testDataCyprus
    //   return leadData
    // case 'Czech_Republic' :
    //   leadData = testDataCzechRepublic
    //   return leadData
    // case 'Estonia' :
    //   leadData = testDataEstonia
    //   return leadData
    // case 'Greece':
    //   leadData = testDataGreece
    //   return leadData
    // case 'Italy':
    //   leadData = testDataItaly
    //   return leadData
    // case 'Latvia' :
    //   leadData = testDataLatvia
    //   return leadData
    // case 'Lithuania' :
    //   leadData = testDataLithuania
    //   return leadData
    // case 'Poland':
    //   leadData = testDataPoland
    //   return leadData
    // case 'Republic_Of_Ireland':
    //   leadData = testDataIreland
    //   return leadData
    // case 'Romania' :
    //   leadData = testDataRomania
    //   return leadData
    // case 'Slovakia':
    //   leadData = testDataSlovakia
    //   return leadData
    // case 'Slovenia' :
    //   leadData = testDataSlovenia
    //   return leadData
    // case 'Switzerland':
    //   leadData = testDataSwitzerland
    //   return leadData
    // case 'North_Macedonia' :
    //   leadData = testDataNorthMacedonia
    //   return leadData
    // case 'Nigeria' :
    //   leadData = testDataNigeria
    //   return leadData
    // case 'Serbia' :
    //   leadData = testDataSerbia
    //   return leadData
    // case 'Kosovo' :
    //   leadData = testDataKosovo
    //   return leadData
    // case 'Montenegro' :
    //   leadData = testDataMontenegro
    //   return leadData
    // case 'Ukraine' :
    //   leadData = testDataUkraine
    //   return leadData
    // case 'Moldova' :
    //   leadData = testDataMoldova
    //   return leadData
    // case 'Armenia' :
    //   leadData = testDataArmenia
    //   return leadData
    default :
      throw new Error(`❌ Invalid Country: No test data found for country: ${country}`)
  }
}

/**
 * Determines Excel sheet name based on template type
 * @param {string} templateName - Name of the template
 */
export function getExcelSheetName(templateName: string) {
  let sheetName = ''
  if(templateName.toUpperCase().includes('DIRECT')) {
    sheetName = 'DirectTemplate'
  } else if(templateName.toUpperCase().includes('INDIRECT')) {
    sheetName = 'IndirectTemplate'
  }
  return sheetName
}

export const ignoreOrderBlock: string[] = [
  'C - Competitor outlet',
  'E - SUPPR WITH EQUIPMENT',
  'G - SUPPR W. EQ&PAY PROB',
  'S - SUPPRESSED',
  'S1 - WORKING WITH COMPET.',
  'S3 - Suppr for overtaking',
  'S4 - END OF BUS. RELATION',
  'SP - SUPPR W. PAY PROBLEM',
  'TS - Temp.Seasonal Suppr.',
  'VF - COVID-19'
]

/**
 * Determines whether a country-specific execution should proceed based on the presence of an MDG ticket
 * and the environment variable configuration.
 *
 * @param {string} testcaseId - The identifier for the test or execution context.
 * @param {string} [mdgTktOrAccNum] - Optional MDG ticket; required for execution when the environment variable is set.
 */
export function countryExecution(testcaseId: string, mdgTktOrAccNum?: string): boolean {
  //variable: mdgTktOrAccNum - refers to Account Num for E2E Execution / MD Ticket for Decouple Execution
  if(mdgTktOrAccNum === undefined) {
    return false
  } else {
    const d365OrBsoId = (testcaseId || '').trim() !== ''
    return d365OrBsoId
  }
}

/**
 * Returns the appropriate test case ID based on the environment setting.
 *
 * If DECOUPLEFORDESKTOP is set to 'True', it returns the first ID (intended for decoupled execution).
 * Otherwise, it returns the second ID (typically for D365/BSO use cases).
 *
 * @param {string[]} testcaseId - A comma-separated string of two test case IDs (e.g., "12345,67890")
 */
export function getTestCaseForDecoupling(testcaseId: string[]): string {
  let decoupleTestId = ''

  if(Array.isArray(testcaseId) && testcaseId.length >= 1) {
    const [DESKTOP, IPAD] = testcaseId.map(id => id.trim())

    if(process.env.TESTPLANTYPE?.toUpperCase() === 'DESKTOP') {
      decoupleTestId = DESKTOP
    } else {
      decoupleTestId = IPAD
    }
  } else {
    console.warn('Invalid testcaseId array:', testcaseId)
  }
  console.warn('Final  testcaseId :', decoupleTestId)
  return decoupleTestId
}