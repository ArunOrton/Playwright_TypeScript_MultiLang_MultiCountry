import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export interface ExecutionStep {
  stepName: string;
  executionTime:  number | string; 
}

export interface ExecutionIteration {
  iteration: string;
  account: number;
  executionTime: ExecutionStep[];
}

export async function exportToPerformanceExcel(executionTimes: ExecutionIteration[], sheetName: string='sheet1'): Promise<void> {
  // Extract all unique step names as headers
  const stepNames = new Set<string>();
  executionTimes.forEach(iteration => {
    iteration.executionTime.forEach(step => stepNames.add(step.stepName));
  });

  // Convert step names set to an array
  const headers = ['Iteration', 'Account', ...Array.from(stepNames)];

  // Prepare rows
  const rows = executionTimes.map(iteration => {
    const row: any = { 
      Iteration: iteration.iteration,
      Account: iteration.account,
     };

    // Map step names to their execution times
    iteration.executionTime.forEach(step => {
      // Format execution time
      if (typeof step.executionTime === "number") {
        row[step.stepName] = step.executionTime.toFixed(2); // Add only numeric values
      }
      else{
        row[step.stepName] = step.executionTime
      }   
    });

    return row;
  });

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  // Auto-size columns
  worksheet['!cols'] = headers.map(() => ({ wch: 30 })); // Adjust column width

  await addSheetAndSave(sheetName, worksheet)

  console.log(`New Sheet Added to existing file with sheet Name as ${sheetName}`);
}
export async function exportToPerformanceExcel_old(executionTimes: ExecutionIteration[], filePath: string, sheetName: string='sheet1'): Promise<void> {
  // Extract all unique step names as headers
  const stepNames = new Set<string>();
  executionTimes.forEach(iteration => {
    iteration.executionTime.forEach(step => stepNames.add(step.stepName));
  });

  // Convert step names set to an array
  const headers = ['Iteration', ...Array.from(stepNames)];

  // Prepare rows
  const rows = executionTimes.map(iteration => {
    const row: any = { Iteration: iteration.iteration };

    // Map step names to their execution times
    iteration.executionTime.forEach(step => {
      // Format execution time
      if (typeof step.executionTime === "number") {
        row[step.stepName] = step.executionTime.toFixed(2); // Add only numeric values
      } 
    });

    return row;
  });

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  // Auto-size columns
  worksheet['!cols'] = headers.map(() => ({ wch: 30 })); // Adjust column width

  // Create workbook and save
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Define full path
  const fullPath = path.resolve(filePath);
  XLSX.writeFile(workbook, `${fullPath}.xlsx`);

  console.log(`Excel file saved as ${fullPath}`);
}

async function addSheetAndSave(sheetName: string, worksheet: XLSX.WorkSheet) {
  let workbook: XLSX.WorkBook;
  const excelFilePath= getLatestExcelFile()
  // Check if the file exists
  if (fs.existsSync(excelFilePath)) {
    // Load existing workbook
    workbook = XLSX.readFile(excelFilePath);
  } else {
    // Create a new workbook if file doesn't exist
    workbook = XLSX.utils.book_new();
  }  

  // Append new sheet
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Save the workbook
  XLSX.writeFile(workbook, excelFilePath);
  console.log(`Sheet "${sheetName}" added to ${excelFilePath}`);
}
export async function removeSheet(sheetName: string = 'Sheet1') {
  let workbook: XLSX.WorkBook;
  const excelFilePath = getLatestExcelFile();

  // Check if the file exists
  if (fs.existsSync(excelFilePath)) {
    // Load existing workbook
    workbook = XLSX.readFile(excelFilePath);

    // Ensure more than one sheet exists before deleting
    if (workbook.SheetNames.length > 1) {
      if (workbook.Sheets[sheetName]) {
        delete workbook.Sheets[sheetName];
        const index = workbook.SheetNames.indexOf(sheetName);
        if (index > -1) {
          workbook.SheetNames.splice(index, 1);
        }
        console.log(`Existing sheet "${sheetName}" deleted.`);
      } else {
        console.log(`Sheet "${sheetName}" does not exist.`);
      }

      // Save the modified workbook
      XLSX.writeFile(workbook, excelFilePath);
      console.log(`Workbook updated: ${excelFilePath}`);
    } else {
      console.log(`Cannot delete "${sheetName}" because it's the only sheet in the workbook.`);
    }
  } else {
    console.log('Excel file not found.');
  }
}

// Create a new Excel file before the test suite starts
export async function createExcelFileBeforeSuite(excelFilePath: string): Promise<void> {
  excelFilePath=excelFilePath
  if (!fs.existsSync(excelFilePath)) {
    let workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
    // Add an empty sheet to avoid "Workbook is empty" error
    const worksheet = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save the workbook
    XLSX.writeFile(workbook, excelFilePath);
    console.log(`Excel file created: ${excelFilePath}`);
  } else {
    console.log(`Excel file already exists: ${excelFilePath}`);
  }
}

function getLatestExcelFile(): string | '' {
   const rootPath = path.resolve(__dirname, '../');
    const dirPath = path.join(rootPath, `performanceMetrics`)
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory does not exist: ${dirPath}`);
    return '';
  }

  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.xlsx')) // Filter only Excel files
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(dirPath, file)).mtime.getTime() // Get modified time
    }))
    .sort((a, b) => b.time - a.time); // Sort by latest modified

  return files.length > 0 ? path.join(dirPath, files[0].name) : '';
}

 

