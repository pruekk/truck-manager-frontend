import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

export const columns = [
    { field: 'email', headerName: 'อีเมล', minWidth: TableConstants.columnsSize.large },
    { field: 'pget', headerName: 'อ่าน', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.get.includes('page') ? '✓' : 'x' },
    { field: 'ppost', headerName: 'สร้าง', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.post.includes('page') ? '✓' : 'x' },
    { field: 'ppatch', headerName: 'แก้ไข', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.patch.includes('page') ? '✓' : 'x' },
    { field: 'pdelete', headerName: 'ลบ', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.delete.includes('page') ? '✓' : 'x' },
    { field: 'cget', headerName: 'อ่าน', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.get.includes('component') ? '✓' : 'x' },
    { field: 'cpost', headerName: 'สร้าง', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.post.includes('component') ? '✓' : 'x' },
    { field: 'cpatch', headerName: 'แก้ไข', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.patch.includes('component') ? '✓' : 'x' },
    { field: 'cdelete', headerName: 'ลบ', minWidth: TableConstants.columnsSize.small, headerAlign: 'center', align:'center', valueGetter: (params) => params.row?.actions?.delete.includes('component') ? '✓' : 'x' }
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
                    children: [{
                        groupId: 'หน้าเพจ',
                        children: [{ field: 'pget' }, { field: 'ppost' }, { field: 'ppatch' }, { field: 'pdelete' }],
                        headerAlign: 'center',
                    },{
                        groupId: 'ส่วนประกอบในเพจ',
                        children: [{ field: 'cget' }, { field: 'cpost' }, { field: 'cpatch' }, { field: 'cdelete' }],
                        headerAlign: 'center',
                    }],
                    headerAlign: 'center',
                }
            ]}
        />
    );
}
