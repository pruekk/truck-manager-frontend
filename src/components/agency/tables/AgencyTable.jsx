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
    { field: 'id', headerName: 'เลขหน่วยงาน', minWidth: columnsSize.medium },
    { field: 'dateStart', headerName: 'วันที่เริ่ม', type: 'date', minWidth: columnsSize.medium },
    { field: 'dateEnd', headerName: 'วันที่จบ', type: 'date', minWidth: columnsSize.medium },
    { field: 'agent', headerName: 'ชื่อหน่วยงาน', minWidth: columnsSize.large },
    { field: 'oldId', headerName: 'รหัสเดิม', minWidth: columnsSize.small },
    { field: 'newId', headerName: 'รหัสใหม่', minWidth: columnsSize.small },
    { field: 'distance', headerName: 'ระยะทาง', minWidth: columnsSize.small },
    { field: 'gas', headerName: 'น้ำมัน', minWidth: columnsSize.small },
];

function AgencyTable(props) {
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

export default AgencyTable;
