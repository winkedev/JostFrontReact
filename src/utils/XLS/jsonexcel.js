import XLSX from 'xlsx';
import { saveAs } from './filesaver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export function downloadAsExcel(data, filename) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data2 = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data2, filename + new Date().getTime() + EXCEL_EXTENSION);
    return true;
}

export const downloadAsExcelWithHeadings = (headings, cols, data, filename) => {
    var Heading = [
        headings,
        cols
    ];
    /*
    var Data = [
        { name: "xyz", sal: 1000 },
        { name: "abc", sal: 2000 }
    ];
    */
    var ws = XLSX.utils.aoa_to_sheet(Heading);
    XLSX.utils.sheet_add_json(ws, data, {
        skipHeader: true,
        origin: -1
    });

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename + new Date().getTime() + EXCEL_EXTENSION);
}

function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, filename + new Date().getTime() + EXCEL_EXTENSION);
    return true;
}