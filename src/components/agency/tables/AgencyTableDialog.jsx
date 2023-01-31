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
    { field: 'distance', headerName: 'ระยะทาง', type: "number", minWidth: columnsSize.small, editable: true },
    { field: 'gas', headerName: 'น้ำมัน', minWidth: columnsSize.small },
];

export default function AgencyTableDialog(props) {
    const [pageSize, setPageSize] = React.useState(50);

    const processRowUpdate = (newRow) => {
        props.onUpdateRow(newRow);

        return newRow;
    }

    return (
        <div>
            <Box sx={{
                height: '30rem',
                width: '100%'
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    processRowUpdate={processRowUpdate}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
    );
}
