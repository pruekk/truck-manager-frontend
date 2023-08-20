import * as XLSX from 'xlsx';
import prepareDataForTable from './prepareDataForTable'

export default function handleUploadExcel(e, formatType, confirmedDataRows, handleOpenDialog, dataRows, setDataRows, carReplacement) {
    e.preventDefault();
    // Upload file by file to prevent human error
    const files = e.target.files, f = files[0];
    const reader = new FileReader();

    reader.onprogress = (e) => {
        const progress = (e.loaded / e.total) * 100;
        console.log(`Upload progress: ${progress}%`);
    };

    reader.onload = (e) => {
        const data = e.target.result;
        const readedData = XLSX.read(data, { type: 'binary' });
        const allSheetData = [];

        for (const sheetName of readedData.SheetNames) {
            const ws = readedData.Sheets[sheetName];
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
            if (dataParse.length > 0) {
                const cleanupData = dataParse.filter((data) => data.length > 0)
                allSheetData.push(...prepareDataForTable(formatType, sheetName.replaceAll('-', '/'), cleanupData, confirmedDataRows, carReplacement));
            }
        }

        handleOpenDialog();
        setDataRows([...dataRows, ...allSheetData]);
    };

    reader.readAsBinaryString(f)
}

/*
import React from 'react';
import XLSX from 'xlsx';

const validateExcelSchema = (columns, sheetData) => {
  // Check if the number of columns in the sheet matches the expected column count
  if (sheetData[0].length !== columns.length) {
    return 'wrong schema';
  }

  // Check if the header row matches the expected column names
  const headerRow = sheetData[0].map(cell => cell.w);
  for (let i = 0; i < columns.length; i++) {
    if (headerRow[i] !== columns[i].name) {
      return 'wrong schema';
    }
  }

  return 'correct schema';
};

const ExcelSchemaValidator = () => {
  const columns = [
    {
      column: 'A',
      name: 'ลำดับ',
    },
    {
      column: 'B',
      name: 'เลขที่ดีพี',
    },
    {
      column: 'C',
      name: 'สถานะ',
    },
    {
      column: 'D',
      name: 'รหัสปลดล็อค',
    },
  ];

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const result = validateExcelSchema(columns, sheetData);

        console.log(result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ExcelSchemaValidator;
*/
