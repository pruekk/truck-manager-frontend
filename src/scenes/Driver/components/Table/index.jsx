import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Others
import moment from "moment";

//Constants
import * as TableConstants from '../../../../constants/TableConstants';
import { titles } from "../../constants/Constants";

export const columns = [
    { field: 'id', headerName: 'ลำดับ', minWidth: TableConstants.columnsSize.small },
    { field: 'title', headerName: 'คำนำหน้า', type: 'singleSelect', minWidth: TableConstants.columnsSize.medium, valueOptions: titles },
    { field: 'firstName', headerName: 'ชื่อ', minWidth: TableConstants.columnsSize.medium },
    { field: 'lastName', headerName: 'นามสกุล', minWidth: TableConstants.columnsSize.medium },
    { field: 'fullName', headerName: 'ชื่อ-สกุล', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'telephone', headerName: 'เบอร์โทร', minWidth: TableConstants.columnsSize.medium },
    { field: 'startDate', headerName: 'วันที่เริ่มงาน', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'birthDate', headerName: 'วันเดือนปีเกิด', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'age', headerName: 'อายุ', minWidth: TableConstants.columnsSize.large },
    { field: 'idCard', headerName: 'เลขประจำตัวบัตรประชาชน', minWidth: TableConstants.columnsSize.large },
    { field: 'address', headerName: 'ที่อยู่', minWidth: TableConstants.columnsSize.large },
    { field: 'salary', headerName: 'ฐานเงินเดือน', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'ssoStartDate', headerName: 'วันที่ยื่นเข้าประกันสังคม', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'endDate', headerName: 'วันที่ออก', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'ssoEndDate', headerName: 'วันที่ยื่นออกประกันสังคม', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'reason', headerName: 'สาเหตุการออก', minWidth: TableConstants.columnsSize.xlarge },
    { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge }
];

export default function DriverTable(props) {
    const calculateAge = (birthdate) => {
        const birthDate = moment(birthdate);
        const now = moment();
        const age = moment.duration(now.diff(birthDate));

        const years = age.years();
        const months = age.months();
        const days = age.days();

        return `${years} ปี ${months} เดือน ${days} วัน`;
    }

    const displayDate = (date) => {
        if (!date) {
            return
        }
        return moment(date, moment.defaultFormat).add(543, 'year').format('DD/MM/YYYY')
    }

    const formattedData = props.dataRows.map(item => {
        return {
          ...item,
          telephone: item.telephone?.replace(/(.{3})(.{3})(.{4})/, "$1-$2-$3"),
          startDate: displayDate(item.startDate),
          birthDate: displayDate(item.birthDate),
          idCard: item.idCard.replace(/(.{1})(.{4})(.{5})(.{2})(.{1})/, "$1-$2-$3-$4-$5"),
          age: calculateAge(item.birthDate),
          ssoStartDate: displayDate(item.ssoStartDate),
          endDate: displayDate(item.endDate),
          ssoEndDate: displayDate(item.ssoEndDate)
        }
    });
    return (
        <DataGridTable dataRows={formattedData} columns={columns} onSelectionModelChange={props.onSelectionModelChange} checkboxSelection={true} />
    );
}
