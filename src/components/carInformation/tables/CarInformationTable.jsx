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
    { field: 'id', headerName: 'เบอร์รถ', minWidth: columnsSize.medium },
    { field: 'driver', headerName: 'คนขับ', minWidth: columnsSize.large },
    { field: 'maintenanceCost', headerName: 'ค่าซ่อม', type: 'number', minWidth: columnsSize.small },
    { field: 'driverSalary', headerName: 'รายได้คนขับรถโม่', type: 'number', minWidth: columnsSize.large },
];

export default function CarInformationTable(props) {
    const [pageSize, setPageSize] = React.useState(50);
    return (
        <div>
            <Box sx={{
                height: '30rem',
                width: '100%',
                '& .row-theme--Accepted': {
                    bgcolor: 'white',
                },
                '& .row-theme--Canceled': {
                    bgcolor: 'rgb(61,178,202)',
                    '&:hover': {
                        bgcolor: 'rgb(41,158,182)!important',
                    },
                },
                '& .row-theme--Spoiled': {
                    bgcolor: 'rgb(247,146,86)',
                    '&:hover': {
                        bgcolor: 'rgb(227,126,66)!important',
                    },
                },
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[25, 50, 100]}
                    //checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.status}`}
                />
            </Box>
        </div>
    );
}
