// src/helpers/calculateAverages.ts
import * as XLSX from 'xlsx'
import { FILE_PATH, SHEET_NAME, COLUMNS, START_ROW, ITERATIONS } from '../constants'

/**
 *
 */
export function calculateAveragesAndWrite() {
  const workbook = XLSX.readFile(FILE_PATH)
  const worksheet = workbook.Sheets[SHEET_NAME]

  COLUMNS.forEach((col) => {
    let sum = 0
    for(let row = START_ROW; row < START_ROW + ITERATIONS; row++) {
      const cellAddress = `${col}${row}`
      const cellValue = worksheet[cellAddress]?.v || 0
      sum += Number(cellValue)
    }
    const average = sum / ITERATIONS
    worksheet[`${col}8`] = { v: average }
  })

  XLSX.writeFile(workbook, FILE_PATH)
  console.log('Averages calculated and written to row 8.')
}
