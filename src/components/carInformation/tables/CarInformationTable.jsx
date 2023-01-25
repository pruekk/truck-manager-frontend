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
    { field: 'id', headerName: 'รหัสรถโม่', minWidth: columnsSize.medium },
    { field: 'licensePlate', headerName: 'ทะเบียนรถ', minWidth: columnsSize.medium },
    { field: 'type', headerName: 'ประเภทรถ', minWidth: columnsSize.small },
    { field: 'registrationDate', headerName: 'วันที่จดทะเบียน', type: 'date', minWidth: columnsSize.large },
    { field: 'buyDate', headerName: 'วันที่ซื้อ', type: 'date', minWidth: columnsSize.large },
    { field: 'price', headerName: 'ราคา', type: 'number', minWidth: columnsSize.small },
];

export default function CarInformationTable(props) {
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
                />
            </Box>
        </div>
    );
}
