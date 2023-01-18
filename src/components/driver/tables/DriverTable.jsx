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
    { field: 'id', headerName: 'รหัสบัตรประชาชน', minWidth: columnsSize.large },
    { field: 'title', headerName: 'คำนำหน้า', minWidth: columnsSize.medium },
    { field: 'firstName', headerName: 'ชื่อ', minWidth: columnsSize.medium },
    { field: 'lastName', headerName: 'นามสกุล', minWidth: columnsSize.medium },
    { field: 'fullName', headerName: 'ชื่อ-สกุล', minWidth: columnsSize.large },
    { field: 'startDate', headerName: 'วันที่เริ่มทำงาน', minWidth: columnsSize.medium },
    { field: 'salary', headerName: 'เงินเดือน', minWidth: columnsSize.medium },
];

export default function DriverTable(props) {
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
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.status}`}
                />
            </Box>
        </div>
    );
}
