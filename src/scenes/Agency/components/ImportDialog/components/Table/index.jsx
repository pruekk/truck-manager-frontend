import React from "react";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../../../constants/TableConstants';

export default function Table(props) {
    const columns = [
        { field: 'id', headerName: 'เลขหน่วยงาน', minWidth: TableConstants.columnsSize.medium },
        { field: 'dateStart', headerName: 'วันที่เริ่ม', minWidth: TableConstants.columnsSize.medium },
        { field: 'dateEnd', headerName: 'วันที่จบ', minWidth: TableConstants.columnsSize.medium },
        { field: 'agent', headerName: 'ชื่อหน่วยงาน', minWidth: TableConstants.columnsSize.large },
        { field: 'oldId', headerName: 'รหัสเดิม', minWidth: TableConstants.columnsSize.small },
        { field: 'newId', headerName: 'รหัสใหม่', editable: props.activeStep === 1, minWidth: TableConstants.columnsSize.small },
        { field: 'distance', headerName: 'ระยะทาง', editable: props.activeStep === 4, minWidth: TableConstants.columnsSize.small },
        { field: 'oil', headerName: 'น้ำมัน', editable: props.activeStep === 2, minWidth: TableConstants.columnsSize.small },
    ];

    const processRowUpdate = (newRow) => {
        props.onUpdateRow(newRow);
        return newRow;
    }

    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} processRowUpdate={processRowUpdate} checkboxSelection={true} />
    );
}
