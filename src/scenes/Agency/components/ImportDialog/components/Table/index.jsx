import React from "react";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'เลขหน่วยงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateStart', headerName: 'วันที่เริ่ม', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateEnd', headerName: 'วันที่จบ', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'agent', headerName: 'ชื่อหน่วยงาน', minWidth: TableConstants.columnsSize.large },
    { field: 'oldId', headerName: 'รหัสเดิม', minWidth: TableConstants.columnsSize.small },
    { field: 'newId', headerName: 'รหัสใหม่', minWidth: TableConstants.columnsSize.small },
    { field: 'distance', headerName: 'ระยะทาง', type: "number", minWidth: TableConstants.columnsSize.small, editable: true },
    { field: 'gas', headerName: 'น้ำมัน', minWidth: TableConstants.columnsSize.small },
];

export default function Table(props) {
    const processRowUpdate = (newRow) => {
        props.onUpdateRow(newRow);
        return newRow;
    }

    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} processRowUpdate={processRowUpdate} checkboxSelection={true} />
    );
}
