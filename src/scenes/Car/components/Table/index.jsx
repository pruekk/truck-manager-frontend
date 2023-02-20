import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'รหัสรถโม่', minWidth: TableConstants.columnsSize.medium },
    { field: 'licensePlate', headerName: 'ทะเบียนรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'type', headerName: 'ประเภทรถ', minWidth: TableConstants.columnsSize.small },
    { field: 'registrationDate', headerName: 'วันที่จดทะเบียน', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'buyDate', headerName: 'วันที่ซื้อ', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'price', headerName: 'ราคา', type: 'number', minWidth: TableConstants.columnsSize.small },
];

export default function CarInformationTable(props) {
    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} onSelectionModelChange={props.onSelectionModelChange} />
    );
}