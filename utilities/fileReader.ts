import ExcelJS from 'exceljs'
import * as XLSX from 'xlsx'
/**
 *Reads an Excel file from the given file path and returns its data.
 * @param {string} filePath - The path to the Excel file.
 */
export async function readExcel(filePath: string) : Promise<any[]> {
  console.log(filePath)
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  const rows : any[] = []

  workbook.eachSheet(sheet =>{
    let firstRow = true
    const columns: string[] = []
    sheet.eachRow((row) =>{
      if(firstRow) {
        row.eachCell(cell =>{
          if(cell.value !== null && cell.value !== undefined) {
            columns.push(cell.value.toString())
          }
        })
        firstRow = false
      } else {
        const rowData: any = {}
        row.eachCell((cell, columnIndex) =>{
          const columnName = columns[columnIndex - 1]
          rowData[columnName] = cell.value
        })

        rows.push(rowData)
      }
    })
  })
  return rows
}


/**
 *
 * @param {string} filePath - The path to the Excel file.
 */
export function readTestCasesFromExcel(filePath: string): Record<string, { account: string, testData?: string }> {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]

  const keyValuePairs: Record<string, { account: string, testData?: string }> = {}

  // Assuming: Row = [TestCaseName, Account, TestData]
  for(let i = 1; i < data.length; i++) {
    const [testcase, account, testData] = data[i]
    if(testcase && account) {
      keyValuePairs[testcase.trim()] = {
        account: account.toString().trim(),
        testData: testData?.toString().trim() || ''
      }
    }
  }

  return keyValuePairs
}

/**
 *
 * @param {string} filePath - The path to the Excel file.
 */
export function readTestCasesFromExcelWithTrimKeys(filePath: string): Record<string, string> {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][]

  const keyValuePairs: Record<string, string> = {}

  for(let i = 1; i < data.length; i++) {
    const [rawKey, rawValue] = data[i]

    const key = rawKey?.toString().trim().replace(/\s+/g, '').toLowerCase()
    const value = rawValue?.toString().trim()

    if(key && value) {
      keyValuePairs[key] = value
    }
  }

  return keyValuePairs
}

/**
 *
 * @param {string} filePath - defines the file path
 */
export function readTestDataColumnFromExcel(filePath: string): Record<string, string> {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]

  const testDataMap: Record<string, string> = {}

  for(let i = 1; i < data.length; i++) {
    const [testcase, , testdata] = data[i] // Skip Account column, read 3rd (index 2)
    if(testcase && testdata) {
      testDataMap[testcase.trim()] = testdata.toString().trim()
    }
  }

  return testDataMap
}
/**
 *
 * @param { any }obj
 */
export function trimSpaces(obj: any): void {
  if(typeof obj === 'object' && obj !== null) {
    for(let key in obj) {
      if(typeof obj[key] === 'string') {
        obj[key] = obj[key].trim()
      } else if(typeof obj[key] === 'object') {
        trimSpaces(obj[key])
      }
    }
  }
}
