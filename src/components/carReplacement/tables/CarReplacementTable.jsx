import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columnsSize = {
    small: 90,
    medium: 100,
    large: 200
};

export const columns = [
    { field: 'date', headerName: 'วันที่', type: 'date', minWidth: columnsSize.medium },
    { field: 'time', headerName: 'เวลา', minWidth: columnsSize.small },
    { field: 'carId', headerName: 'รหัสรถ', minWidth: columnsSize.medium },
    { field: 'driver', headerName: 'คนขับรถโม่', minWidth: columnsSize.large },
];

export default function CarReplacementTable(props) {
    const [pageSize, setPageSize] = React.useState(50);
    return (
        <div>
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
                    getRowId={(row) => `${row.carId}-${row.driver}`}
                />
            </Box>
        </div>
    );
}
