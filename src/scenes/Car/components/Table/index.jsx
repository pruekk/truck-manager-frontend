import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'รหัสรถโม่', minWidth: TableConstants.columnsSize.medium },
    { field: 'licensePlate', headerName: 'ทะเบียนรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'type', headerName: 'ประเภทรถ', minWidth: TableConstants.columnsSize.small },
    { field: 'taxDate', headerName: 'วันที่เสียภาษีรถ', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'proposalDate', headerName: 'วันที่ต่อพรบ', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'insuranceDate', headerName: 'วันที่ต่อประกันภัย', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'registrationDate', headerName: 'วันที่จดทะเบียน', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'buyDate', headerName: 'วันที่ซื้อ', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'buyFrom', headerName: 'ซื้อจาก', minWidth: TableConstants.columnsSize.small },
    { field: 'price', headerName: 'ราคา', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'vatPrice', headerName: 'VAT', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'netPrice', headerName: 'ราคาสุทธิ', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge },
];

export default function CarInformationTable(props) {
    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} onSelectionModelChange={props.onSelectionModelChange} />
    );
}
