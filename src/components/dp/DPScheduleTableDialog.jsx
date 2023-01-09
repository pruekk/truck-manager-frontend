import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

const columnsSize = {
    small: 90,
    medium: 100,
    large: 200
};

export default function DPScheduleTableDialog(props) {
    const [pageSize, setPageSize] = React.useState(50);

    const columns = [
        { field: 'id', headerName: 'เลขดีพี', minWidth: columnsSize.medium },
        { field: 'date', headerName: 'วันที่', minWidth: columnsSize.medium },
        { field: 'time', headerName: 'เวลา', minWidth: columnsSize.small },
        { field: 'destination', headerName: 'หน่วยงาน', minWidth: columnsSize.large },
        { field: 'distance', headerName: 'ระยะทาง', minWidth: columnsSize.small },
        { field: 'code', headerName: 'รหัส', minWidth: columnsSize.small },
        { field: 'amount', headerName: 'คิว', minWidth: columnsSize.small },
        { field: 'price', headerName: 'ราคา', minWidth: columnsSize.small },
        { field: 'oil', headerName: 'น้ำมัน', minWidth: columnsSize.small },
        { field: 'car', headerName: 'เบอร์รถ', minWidth: columnsSize.small },
        { field: 'driver', headerName: 'คนขับรถ', minWidth: columnsSize.large },
        { field: 'status', headerName: 'สถานะ', minWidth: columnsSize.small },
        {
            field: "delete",
            minWidth: columnsSize.small,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={props.onClickDeleteSelectedRows}
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    ];

    return (
        <div>
            <Box sx={{
                height: '30rem',
                width: '100%',
                '& .row-theme--normal': {
                    bgcolor: 'white',
                },
                '& .row-theme--duplicated': {
                    bgcolor: 'rgb(214,50,50)',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'rgb(204,0,0)!important',
                    },
                }
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSelectionModelChange={(ids) => {
                        props.setSelectedRows(ids);
                    }}
                    isRowSelectable={(params) => params.row.duplicated}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.duplicated ? "duplicated" : "normal"}`}
                />
            </Box>
        </div>
    );
}
