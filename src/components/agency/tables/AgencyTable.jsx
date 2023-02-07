import React from "react";

//Tables
import DataGridBasicTable from '../../tables/DataGridBasicTable';

//Constants
import * as TableConstants from '../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'เลขหน่วยงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateStart', headerName: 'วันที่เริ่ม', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'dateEnd', headerName: 'วันที่จบ', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'agent', headerName: 'ชื่อหน่วยงาน', minWidth: TableConstants.columnsSize.large },
    { field: 'oldId', headerName: 'รหัสเดิม', minWidth: TableConstants.columnsSize.small },
    { field: 'newId', headerName: 'รหัสใหม่', minWidth: TableConstants.columnsSize.small },
    { field: 'distance', headerName: 'ระยะทาง', minWidth: TableConstants.columnsSize.small },
    { field: 'oil', headerName: 'น้ำมัน', minWidth: TableConstants.columnsSize.small },
];

function AgencyTable(props) {
    return (
        <DataGridBasicTable dataRows={props.dataRows} columns={columns} onSelectionModelChange={props.onSelectionModelChange} checkboxSelection={true} />

        /*<div>
            <Box sx={{
                height: '30rem',
                width: '100%'
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSelectionModelChange={props.handleSelectRow}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>*/
    );
}

export default AgencyTable;
