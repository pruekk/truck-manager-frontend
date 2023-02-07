import React from "react";

//Tables
import DataGridBasicTable from '../../tables/DataGridBasicTable';

//Constants
import * as TableConstants from '../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'รหัสรถโม่', minWidth: TableConstants.columnsSize.medium },
    { field: 'licensePlate', headerName: 'ทะเบียนรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'type', headerName: 'ประเภทรถ', minWidth: TableConstants.columnsSize.small },
    { field: 'registrationDate', headerName: 'วันที่จดทะเบียน', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'buyDate', headerName: 'วันที่ซื้อ', type: 'date', minWidth: TableConstants.columnsSize.large },
    { field: 'price', headerName: 'ราคา', type: 'number', minWidth: TableConstants.columnsSize.small },
];

export default function CarInformationTable(props) {
    return (
        <DataGridBasicTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} />
        /*<div>
            <Box sx={{
                height: '30rem',
                width: '100%',
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>*/
    );
}
