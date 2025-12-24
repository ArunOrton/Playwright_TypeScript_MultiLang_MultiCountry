import * as xlsx from 'xlsx'
import path from 'path'
import { trimSpaces } from '../utilities/utilitiesImports'

type MethodType = (errorMessage: string) => Promise<void>;
interface IControl {
    ControlName: string;
    Action: string;
    ErrorDescription: string;
}
export class ControlPage {
  protected controls: IControl[] = []
  protected uiControlExcelSheet: string

  /**
     * Creates an instance of ControlPage
     * @param {string} sheetName - Name of the Excel sheet to read
     */
  constructor(sheetName: string) {
    this.uiControlExcelSheet = sheetName
    const excelFilePath = path.join(__dirname, '../pages/CountrySpecificUIControls.xlsx')
    //this.readExcelFileAndFilter(excelFilePath, 'CommonControl', process.env.COUNTRY as string)
    this.readExcelFileAndFilter(excelFilePath, sheetName, process.env.COUNTRY as string)
  }
  /**
     * Reads and filters control data from Excel file
     * @private
     * @param {string} filePath - Path to the Excel file
     * @param {string} sheetName - Name of the sheet to read
     * @param {string} country - Country code for filtering
     */
  private readExcelFileAndFilter(filePath: string, sheetName: string, country: string) {
    const workbook = xlsx.readFile(filePath)
    const sheet = workbook.Sheets[sheetName]
    const allControls = xlsx.utils.sheet_to_json(sheet)
    // Trim spaces from all controls
    allControls.forEach(control => {
      trimSpaces(control)
    })

    // Start from 1 to skip the header row
    for(let i = 1; i < allControls.length; i++) {
      const row = allControls[i] as any
      const controlName = row['__EMPTY']
      //const action = row[country.toUpperCase()]
      const action = row[country]
      if(controlName && action) {
        this.controls.push({
          ControlName: controlName,
          Action: action,
          ErrorDescription: row['ErrorDescription'] || ''
        })
      }
    }

  }
  /**
     * Executes a method based on conditions
     * @param {Function} method - Method to be executed
     * @param {string} [methodName] - Optional name of the method for validation
     * @returns {Promise<void>}
     */
  async checkMethodName(method: MethodType, methodName?: string) {
    if(methodName) {
      const control = this.controls.find(c => c.ControlName === methodName)

      if(control && control.Action.toUpperCase() === 'YES') {
        await method(control.ErrorDescription)
      }

    } else {
      // If no control name provided, still call method but pass default error message
      await method('Action failed (no error description provided).')
    }
  }


  /**
   *
   * @param methods
   * @param methodName
   */
  async checkMethodNames(methods: MethodType[], methodName?: string) {
    if(methodName) {
      const control = this.controls.find(c => c.ControlName === methodName)
      if(control && control.Action.toUpperCase() === 'YES') {
        for(const method of methods) {
          await method(control.ErrorDescription)
        }
      }
    } else {
      for(const method of methods) {
        await method('Action failed (no error description provided).')
      }
    }
  }
  /**
     * Checks if an action should be performed for a given control
     * @param {string} controlName - Name of the control to check
     * @returns {Promise<boolean>} True if action should be performed
     */
  async shouldPerformAction(controlName: string): Promise<boolean> {
    const control = this.controls.find(c => c.ControlName === controlName)
    return await (control ? control.Action.toUpperCase() === 'YES' : false)
  }
  /**
     * Additional check for action performance with special handling for single control
     * @param {string} controlName - Name of the control to check
     * @returns {Promise<boolean>} True if action should be performed
     */
  async shouldPerformActionExtra(controlName: string): Promise<boolean> {
    if(this.controls.length === 1)
    { return true }
    else {
      const control = this.controls.find(c => c.ControlName === controlName)
      return await (control ? control.Action.toUpperCase() === 'YES' : false)
    }
  }
}