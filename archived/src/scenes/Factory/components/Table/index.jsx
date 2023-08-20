import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'factoryId', headerName: 'รหัสโรงงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'name', headerName: 'ชื่อโรงงาน', minWidth: TableConstants.columnsSize.large },
    { field: 'startDate', headerName: 'วันที่เริ่ม', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'address', headerName: 'ที่อยู่', minWidth: TableConstants.columnsSize.large },
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
