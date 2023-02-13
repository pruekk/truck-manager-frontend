import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'ลำดับ', minWidth: TableConstants.columnsSize.small },
    { field: 'idCard', headerName: 'เลขประจำตัวบัตรประชาชน', minWidth: TableConstants.columnsSize.large },
    { field: 'title', headerName: 'คำนำหน้า', minWidth: TableConstants.columnsSize.medium },
    { field: 'firstName', headerName: 'ชื่อ', minWidth: TableConstants.columnsSize.medium },
    { field: 'lastName', headerName: 'นามสกุล', minWidth: TableConstants.columnsSize.medium },
    { field: 'fullName', headerName: 'ชื่อ-สกุล', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'startDate', headerName: 'วันที่เริ่มทำงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'salary', headerName: 'ฐานเงินเดือน', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'editor', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.large }
];

export default function DriverTable(props) {
    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} />
    );
}