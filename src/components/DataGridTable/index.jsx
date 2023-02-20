import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridTable(props) {
    const [pageSize, setPageSize] = React.useState(50);

    return (
        <div>
            <Box sx={props.customStyle ? props.customStyle : {
                height: '30rem',
                width: '100%'
            }}>
                <DataGrid
                    rows={props.dataRows}
                    columns={props.columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection={props.checkboxSelection ? true : false}
                    processRowUpdate={props.processRowUpdate ? props.processRowUpdate : () => { return; }}
                    onSelectionModelChange={props.onSelectionModelChange ? props.onSelectionModelChange : () => { return; }}
                    getRowId={props.customRowId ? props.customRowId : (row) => { return row.id }}
                    getRowClassName={props.getRowClassName ? props.getRowClassName : () => { return; }}
                    isRowSelectable={props.isRowSelectable ? props.isRowSelectable : () => { return true }}
                    components={props.customComponent ? props.customComponent : {}}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
    );
}