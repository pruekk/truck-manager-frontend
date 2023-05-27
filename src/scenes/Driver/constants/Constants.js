import { columnsSize } from "../../../constants/TableConstants";

export const component = {
    name: "drivers"
};

export const titles = ["นาย", "นาง", "นางสาว", "Mr", "Mrs", "Miss"];

export const driverColumns = [
    {
        field: 'id',
        headerName: 'ลำดับ',
        minWidth: columnsSize.small
    },
    {
        field: 'title',
        headerName: 'คำนำหน้า',
        type: 'singleSelect',
        minWidth: columnsSize.medium,
        valueOptions: titles
    },
    {
        field: 'firstName',
        headerName: 'ชื่อ',
        minWidth: columnsSize.medium
    },
    {
        field: 'lastName',
        headerName: 'นามสกุล',
        minWidth: columnsSize.medium
    },
    {
        field: 'fullName',
        headerName: 'ชื่อ-สกุล',
        minWidth: columnsSize.large,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    {
        field: 'telephone',
        headerName: 'เบอร์โทร',
        minWidth: columnsSize.medium
    },
    {
        field: 'startDate',
        headerName: 'วันที่เริ่มงาน',
        type: 'date',
        minWidth: columnsSize.medium
    },
    {
        field: 'birthDate',
        headerName: 'วันเดือนปีเกิด',
        type: 'date',
        minWidth: columnsSize.medium
    },
    {
        field: 'age',
        headerName: 'อายุ',
        minWidth: columnsSize.large
    },
    {
        field: 'idCard',
        headerName: 'เลขประจำตัวบัตรประชาชน',
        minWidth: columnsSize.large
    },
    {
        field: 'address',
        headerName: 'ที่อยู่',
        minWidth: columnsSize.large
    },
    {
        field: 'salary',
        headerName: 'ฐานเงินเดือน',
        type: 'number',
        minWidth: columnsSize.medium
    },
    {
        field: 'ssoStartDate',
        headerName: 'วันที่ยื่นเข้าประกันสังคม',
        type: 'date',
        minWidth: columnsSize.large
    },
    {
        field: 'endDate',
        headerName: 'วันที่ออก',
        type: 'date',
        minWidth: columnsSize.medium
    },
    {
        field: 'ssoEndDate',
        headerName: 'วันที่ยื่นออกประกันสังคม',
        type: 'date',
        minWidth: columnsSize.large
    },
    {
        field: 'reason',
        headerName: 'สาเหตุการออก',
        minWidth: columnsSize.xlarge
    },
    {
        field: 'editBy',
        headerName: 'แก้ไขโดย',
        minWidth: columnsSize.xlarge
    }
];

export const drivers = [
    {
        id: 1,
        title: "นาย",
        firstName: "รัตน์",
        lastName: "หาญกล้า",
        birthDate: "12/12/2022",
        idCard: "1234567891234",
        address: "ต.หนองใหญ่ อ.หนองใหญ่ ข.ชลบุรี 20190",
        telephone: "0999199218",
        startDate: "12/12/2022",
        salary: 9000,
        ssoStartDate: "12/12/2022",
        endDate: "",
        ssoEndDate: "",
        reason: "",
        editBy: ""
    },
    {
        id: 2,
        title: "นาย",
        firstName: "รัตน์",
        lastName: "หาญกล้า",
        birthDate: "12/12/2022",
        idCard: "1234567891234",
        address: "ต.หนองใหญ่ อ.หนองใหญ่ ข.ชลบุรี 20190",
        telephone: "0999199218",
        startDate: "12/12/2022",
        salary: 9000,
        ssoStartDate: "12/12/2022",
        endDate: "",
        ssoEndDate: "",
        reason: "",
        editBy: ""
    }
];
