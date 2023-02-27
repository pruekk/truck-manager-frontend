import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'เลขหน่วยงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateStart', headerName: 'วันที่เริ่ม', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateEnd', headerName: 'วันที่จบ', minWidth: TableConstants.columnsSize.medium },
    { field: 'agent', headerName: 'ชื่อหน่วยงาน', minWidth: TableConstants.columnsSize.large },
    { field: 'oldId', headerName: 'รหัสเดิม', minWidth: TableConstants.columnsSize.small },
    { field: 'newId', headerName: 'รหัสใหม่', minWidth: TableConstants.columnsSize.small },
    { field: 'distance', headerName: 'ระยะทาง', minWidth: TableConstants.columnsSize.small },
    { field: 'oil', headerName: 'น้ำมัน', minWidth: TableConstants.columnsSize.small },
    { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge },
];

export default function Table(props) {
    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} onSelectionModelChange={props.onSelectionModelChange} checkboxSelection={true} />
    );
}
