import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

const columnsSize = {
    small: 90,
    medium: 100,
    large: 200
};

export default function DPScheduleTableDialog(props) {
    const [pageSize, setPageSize] = React.useState(100);
    const [rowCount, setRowCount] = React.useState(0);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState(true);
    
    const CustomFooter = () => {
        return (
            <GridFooterContainer>
                <React.Fragment>
                    <IconButton
                        onClick={props.onClickDeleteSelectedRows}
                        disabled={deleteButtonDisabled}
                        sx={{ ml: '0.3rem' }}
                    >
                        <DeleteIcon />
                        <Button disabled>{rowCount}</Button>
                    </IconButton>
                </React.Fragment>
                <GridFooter sx={{
                    borderTop: 'none', // To delete double border.
                }} />
            </GridFooterContainer>
        )
    }

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
        { field: 'status', headerName: 'สถานะ', minWidth: columnsSize.small }
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
                        setDeleteButtonDisabled(false)
                        setRowCount(rowCount + 1)
                    }}
                    isRowSelectable={(params) => params.row.duplicated}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.duplicated ? "duplicated" : "normal"}`}
                    components={{Footer: CustomFooter}}
                    hideFooterSelectedRowCount
                />
            </Box>
        </div>
    );
}
