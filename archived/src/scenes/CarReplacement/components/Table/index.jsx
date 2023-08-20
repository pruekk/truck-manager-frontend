import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'time', headerName: 'เวลา', type: 'time', minWidth: TableConstants.columnsSize.small },
    { field: 'carId', headerName: 'รหัสรถ', type: 'selection', minWidth: TableConstants.columnsSize.medium },
    { field: 'driver', headerName: 'คนขับรถโม่', type: 'selection', minWidth: TableConstants.columnsSize.large },
    { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge },
];

export default function Table(props) {
    const customRowId = (row) => {
        return row._id
    }

    return (
        <DataGridTable 
            dataRows={props.dataRows} 
            columns={columns} 
            onSelectionModelChange={props.onSelectionModelChange} 
            checkboxSelection={true} 
            customRowId={customRowId}
        />
    );
}
