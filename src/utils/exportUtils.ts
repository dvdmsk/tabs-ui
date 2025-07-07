import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Terminal } from '../types/terminals';

/**
 * Exports an array of data to the XLSX file.
 * @param data Array of objects for export.
 * @param fileName File name without extension.
 */
export const exportTerminalsToXLSX = (data: Terminal[], fileName: string = 'terminals_data') => {
    if (!data || data.length === 0) {
        return;
    }

    //1. Convert data into a format that is clear to sheetjs (array of arrays or an array of objects)
    //It is recommended to turn into a "flat" array of objects, where the keys are columns.
    const worksheetData = data.map(terminal => ({
        "Name": terminal.name,
        "Status": terminal.status ? "Online" : "Offline", // Turn boolean into a clear text

        "Branch": terminal.branch,
        "Updated At": terminal.updated,
        "Amount (EUR)": terminal.amountEUR,
        "Amount (CZK)": terminal.amountCZK,
    }));

    // 2. Creating a work letter (Worksheet)

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // 3. Creating a workbook (workbook) and adding a letter

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Terminals'); // 'Terminals' -the name of the letter in excel


    // 4. File recording in binary format

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 5. Save the file using FILE-SAVER

    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
};