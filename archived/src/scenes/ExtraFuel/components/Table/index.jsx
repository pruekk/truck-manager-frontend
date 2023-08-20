import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'carId', headerName: 'รหัสรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'driver', headerName: 'คนขับ', minWidth: TableConstants.columnsSize.large },
    { field: 'from', headerName: 'จาก', minWidth: TableConstants.columnsSize.medium },
    { field: 'to', headerName: 'ไป', minWidth: TableConstants.columnsSize.medium },
    { field: 'amount', headerName: 'จำนวน', minWidth: TableConstants.columnsSize.medium },
    { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge },
    { field: 'updatedAt', headerName: 'แก้ไขล่าสุด', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
];

export default function DataTable(props) {
    const customRowId = (row) => {
        return row._id
    }

    return (
        <DataGridTable
            dataRows={props.dataRows}
            customRowId={customRowId}
            columns={columns}
            checkboxSelection={true}
            //onSelectionModelChange={props.onSelectionModelChange}
            isLoading={props.isLoading}
        />
    );
}
