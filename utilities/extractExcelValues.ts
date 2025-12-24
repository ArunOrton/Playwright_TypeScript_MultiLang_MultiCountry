import * as XLSX from 'xlsx'
import * as fs from 'fs'
import { Record } from './record'

/**
 *Converts an Excel file to a CSV file and saves it to the specified path.
 * @param {string} excelFilePath - The path of the Excel file to be converted.
 * @param {string} csvFilePath - The path where the CSV file will be saved.
 */
export function excelToCsv(excelFilePath: string, csvFilePath: string) {
  // Read Excel file
  const workbook = XLSX.readFile(excelFilePath)
  const sheetName = workbook.SheetNames[0] // Assuming we are working with the first sheet
  const worksheet = workbook.Sheets[sheetName]

  // Convert to CSV
  const csvData = XLSX.utils.sheet_to_csv(worksheet)

  // Write CSV file
  fs.writeFileSync(csvFilePath, csvData, 'utf-8')

}


/**
 *
 * @param {T[]} data - The data to export.
 * @param {string} fileName - The name of the Excel file.
 * @param {string} sheetName - The name of the sheet.
 */
export function exportToExcel<T>(data: T[], fileName: string, sheetName: string = 'Sheet1'): void {
  if(data.length === 0) {
    console.warn('No data to export.')
    return
  }

  // Convert JSON array to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // Write the Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`)

  console.log(`Excel file saved as ${fileName}.xlsx`)
}

/**
 *
 * @param {string} excelFilePath - The path of the Excel file to be converted.
 */
export function excelToObject_backUp(excelFilePath: string): Record {
  // Read Excel file
  const workbook = XLSX.readFile(excelFilePath)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  // Convert sheet to JSON with headers (first row = keys)
  const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  const headers: string[] = data[0] // First row = column names
  const values: any[] = data[1]     // Second row = actual values

  const record = new Record()

  headers.forEach((header, index) => {
    const key = header?.toString().trim()
    const value = values[index]?.toString().trim() || ''

    if(key && key in record) {
      // Dynamically assign value if property exists
      (record as any)[key] = value
    }
  })

  return record
}

/**
 *
 * @param excelFilePath
 * @param sheetName
 */
export function excelToObject(excelFilePath: string, sheetName: string): Record[] {
  // Read Excel file
  const workbook = XLSX.readFile(excelFilePath)
  //const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  // Convert sheet to JSON with headers (first row as keys)
  const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

  const recordCount = jsonData.length
  const allRecords: Record[] = []

  jsonData.forEach((row) => {
    const record = new Record()
    Object.keys(row).forEach((key) => {
      const cleanKey = key.trim()
      if(cleanKey in record) {
        (record as any)[cleanKey] = row[key]?.toString().trim() || ''
      }
    })
    allRecords.push(record)
  })

  // Single record mode
  if(process.env.SINGLERECORDEXECUTION === 'True') {
    console.log(
      `Total records available: ${recordCount}. Single Execution is enabled and Records selected for execution: 1`
    )
    return allRecords.slice(0, 1)
  }

  // RowLimit set but still return all records
  if(process.env.SINGLERECORDEXECUTION === 'FALSE') {
    console.log(
      `Total records available: ${recordCount}. RowLimit is set (${process.env.RowLimit}), but all records will be returned.`
    )
    return allRecords
  }

  // Default case (always return all)
  console.log(`Total records available: ${recordCount}`)
  return allRecords
}

