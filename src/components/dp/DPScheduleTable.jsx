import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'เลขดีพี', width: 100 },
    { field: 'วันที่', headerName: 'วันที่', width: 100 },
    { field: 'เวลา', headerName: 'เวลา', width: 100 },
    { field: 'หน่วยงาน', headerName: 'หน่วยงาน', width: 200 },
    { field: 'ระยะทาง', headerName: 'ระยะทาง', width: 90 },
    { field: 'รหัส', headerName: 'รหัส', width: 90 },
    { field: 'คิว', headerName: 'คิว', width: 90 },
    { field: 'ราคา', headerName: 'ราคา', width: 90 },
    { field: 'น้ำมัน', headerName: 'น้ำมัน', width: 90 },
    { field: 'เบอร์รถ', headerName: 'เบอร์รถ', width: 90 },
    { field: 'คนขับรถ', headerName: 'คนขับรถ', width: 150 },
    { field: 'สถานะ', headerName: 'สถานะ', width: 90 },
];

function DPScheduleTable(props) {
    return (
        <div>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
    );
}

export default DPScheduleTable;
