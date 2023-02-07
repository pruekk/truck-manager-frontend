import React from "react";

//Tables
import DataGridBasicTable from '../../tables/DataGridBasicTable';

//Constants
import * as TableConstants from '../../../constants/TableConstants';

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium },
    { field: 'time', headerName: 'เวลา', minWidth: TableConstants.columnsSize.small },
    { field: 'carId', headerName: 'รหัสรถ', minWidth: TableConstants.columnsSize.medium },
    { field: 'driver', headerName: 'คนขับรถโม่', minWidth: TableConstants.columnsSize.large },
];

export default function CarReplacementTable(props) {
    const customRowId = (row) => {
        return `${row.carId}-${row.driver}`
    }

    return (
        <DataGridBasicTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} customRowId={customRowId}  />
        // <div>
        //     <Box sx={{
        //         height: '30rem',
        //         width: '100%',
        //     }}>
        //         <DataGrid
        //             rows={props.dataRows}
        //             columns={columns}
        //             pageSize={pageSize}
        //             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        //             rowsPerPageOptions={[25, 50, 100]}
        //             checkboxSelection
        //             disableSelectionOnClick
        //             experimentalFeatures={{ newEditingApi: true }}
        //             getRowId={(row) => `${row.carId}-${row.driver}`}
        //         />
        //     </Box>
        // </div>
    );
}
