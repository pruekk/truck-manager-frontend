import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

import { columns } from './DPScheduleTable';

export default function DPScheduleTableDialog(props) {
    const [pageSize, setPageSize] = React.useState(100);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState(true);

    const CustomFooter = () => {
        return (
            <GridFooterContainer>
                <IconButton
                    onClick={() => (
                        props.onClickDeleteSelectedRows()
                    )}
                    disabled={deleteButtonDisabled}
                    sx={{ ml: '0.3rem' }}
                >
                    <DeleteIcon />
                </IconButton>
                <GridFooter sx={{
                    borderTop: 'none', // To delete double border.
                }} />
            </GridFooterContainer>
        )
    }

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
                },
                '& .MuiDataGrid-row.Mui-selected': {
                    bgcolor: 'rgb(0,0,0)!important'
                },
                '& .MuiCheckbox-root.Mui-checked': {
                    color: 'rgb(214,50,50)'
                }
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSelectionModelChange={(ids) => {
                        props.setSelectedRows(ids);
                        setDeleteButtonDisabled(!deleteButtonDisabled)
                    }}
                    isRowSelectable={(params) => (
                        params.row.duplicated
                    )}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.duplicated ? "duplicated" : "normal"}`}
                    components={{ Footer: CustomFooter }}
                // hideFooterSelectedRowCount
                />
            </Box>
        </div>
    );
}
