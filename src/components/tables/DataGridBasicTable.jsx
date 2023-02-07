import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridBasicTable(props) {
    const [pageSize, setPageSize] = React.useState(50);

    return (
        <div>
            <Box sx={{
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
                    processRowUpdate={props.processRowUpdate ? props.processRowUpdate : false}
                    onSelectionModelChange={props.onSelectionModelChange ? props.onSelectionModelChange : false}
                    getRowId={props.customRowId ? props.customRowId : false}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </div>
    );
}