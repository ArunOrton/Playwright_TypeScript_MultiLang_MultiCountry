// src/helpers/fileHandler.ts
import * as XLSX from 'xlsx'
import { FILE_PATH, SHEET_NAME } from '../constants'

export const workbook = XLSX.readFile(FILE_PATH)
export const worksheet = workbook.Sheets[SHEET_NAME]

/**
 *
 * @param {string} cellAddress - The cell address (e.g., "A1", "B2") where the value should be written.
 * @param {number} value - The numeric value to write into the cell.
 */
export function writeToWorksheet(cellAddress: string, value: number) {
  worksheet[cellAddress] = { v: value }
  XLSX.writeFile(workbook, FILE_PATH)
}
