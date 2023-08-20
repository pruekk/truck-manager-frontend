import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium + 20 },
    { field: 'farm', headerName: 'ฟาร์ม', minWidth: TableConstants.columnsSize.medium },
    { field: 'type', headerName: 'ประเภท', minWidth: TableConstants.columnsSize.large },
    { field: 'palmSpecies', headerName: 'พันธ์ุปาล์ม', minWidth: TableConstants.columnsSize.medium },
    { field: 'detail', headerName: 'รายละเอียด', minWidth: TableConstants.columnsSize.medium },
    { field: 'weight', headerName: 'น้ำหนัก', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'weightPrice', headerName: 'จำนวนเงิน', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'pricePerKilo', headerName: 'ราคาต่อกิโล', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'wagePerKilo', headerName: 'ค่าแซะปาล์ม', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'wagePrice', headerName: 'เป็นเงิน', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'percentRipe', headerName: 'ความสุก(%)', minWidth: TableConstants.columnsSize.medium },
    { field: 'ripePerKilo', headerName: 'สุกพิเศษ', minWidth: TableConstants.columnsSize.small },
    { field: 'ripePrice', headerName: 'เป็นเงิน', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'totalPrice', headerName: 'ราคาสุทธิ', type: 'number', minWidth: TableConstants.columnsSize.small },
    { field: 'note', headerName: 'หมายเหตุ', minWidth: TableConstants.columnsSize.small },
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
