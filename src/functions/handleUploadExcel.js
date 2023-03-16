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

            if (dataParse.length !== 0) {
                const cleanupData = dataParse.filter((data) => data.length !== 0)
                allSheetData.push(...prepareDataForTable(formatType, sheetName.replaceAll('_', '/'), cleanupData, confirmedDataRows, carReplacement));
            }
        }

        handleOpenDialog();
        setDataRows([...dataRows, ...allSheetData]);
    };

    reader.readAsBinaryString(f)
}
