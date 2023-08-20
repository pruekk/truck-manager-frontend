import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'farm', headerName: 'ฟาร์ม', minWidth: TableConstants.columnsSize.large },
    { field: 'type', headerName: 'ประเภท', minWidth: TableConstants.columnsSize.large },
    { field: 'detail', headerName: 'รายละเอียด', minWidth: TableConstants.columnsSize.medium },
    { field: 'totalPrice', headerName: 'ราคาสุทธิ', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'store', headerName: 'ร้านค้า', minWidth: TableConstants.columnsSize.large },
    { field: 'chemicalFormula', headerName: 'สูตรเคมี', minWidth: TableConstants.columnsSize.small },
    { field: 'note', headerName: 'หมายเหตุ', minWidth: TableConstants.columnsSize.large },
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
