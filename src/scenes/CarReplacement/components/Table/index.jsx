import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'time', headerName: 'เวลา', minWidth: TableConstants.columnsSize.small },
    { field: 'carId', headerName: 'รหัสรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'driver', headerName: 'คนขับรถโม่', minWidth: TableConstants.columnsSize.large },
];

export default function Table(props) {
    const customRowId = (row) => {
        return `${row.carId}-${row.driver}`
    }

    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} customRowId={customRowId}  />
    );
}