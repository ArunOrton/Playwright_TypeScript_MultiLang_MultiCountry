import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

/**
 * Reads CSV data from a file and returns the records based on execution conditions.
 *
 * @param {string} fileLocation - The relative path to the CSV file to read.
 */
export function readCsvData(fileLocation: string) {
  const finalPath = path.join(__dirname, `../${fileLocation}`)
  const records = parse(fs.readFileSync(finalPath), {
    columns: true,
    skip_empty_lines: true
  })
  const recordCount = records.length
  if(process.env.SingleRecordExecution === 'true') {
    const singleRecords = records.slice(0, 1)
    console.log(`Total records available: ${recordCount}.Sigle Execution is enabled and Records selected for execution: ${1}`)
    return singleRecords
  }
  else if((process.env.RowLimit) && process.env.RowLimit <= recordCount
  && process.env.SingleRecordExecution === 'false') {
    const sliceRecords = records.slice(0, process.env.RowLimit)
    console.log(`Total records available: ${recordCount} and Records selected for execution: ${sliceRecords.length}`)
    return sliceRecords
  }
  console.log(`Total records available:  ${recordCount}`)
  return records
}