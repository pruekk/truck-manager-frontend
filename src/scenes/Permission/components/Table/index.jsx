import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'email', headerName: 'อีเมล', minWidth: TableConstants.columnsSize.large },
    { field: 'get', headerName: 'อ่าน', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => params.row?.actions?.get  },
    { field: 'post', headerName: 'สร้าง', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => params.row?.actions?.post },
    { field: 'patch', headerName: 'แก้ไข', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => params.row?.actions?.patch },
    { field: 'delete', headerName: 'ลบ', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => params.row?.actions?.delete }
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
            columnGroupingModel={[
                {
                    groupId: 'สิทธิในการเข้าถึง',
                    children: [{ field: 'get' }, { field: 'post' }, { field: 'patch' }, { field: 'delete' }],
                    headerAlign: 'center',
                }
            ]}
        />
    );
}
