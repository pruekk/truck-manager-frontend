import React from "react";

//Tables
import DataGridBasicTable from '../../tables/DataGridBasicTable';

//Constants
import * as TableConstants from '../../../constants/TableConstants';

export const columns = [
    { field: 'id', headerName: 'ลำดับ', minWidth: TableConstants.columnsSize.small },
    { field: 'idCard', headerName: 'เลขประจำตัวบัตรประชาชน', minWidth: TableConstants.columnsSize.large },
    { field: 'title', headerName: 'คำนำหน้า', minWidth: TableConstants.columnsSize.medium },
    { field: 'firstName', headerName: 'ชื่อ', minWidth: TableConstants.columnsSize.medium },
    { field: 'lastName', headerName: 'นามสกุล', minWidth: TableConstants.columnsSize.medium },
    { field: 'fullName', headerName: 'ชื่อ-สกุล', minWidth: TableConstants.columnsSize.large, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'startDate', headerName: 'วันที่เริ่มทำงาน', minWidth: TableConstants.columnsSize.medium },
    { field: 'salary', headerName: 'ฐานเงินเดือน', type: 'number', minWidth: TableConstants.columnsSize.medium },
    { field: 'editor', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.large }
];

export default function DriverTable(props) {
    return (
        <DataGridBasicTable dataRows={props.dataRows} columns={columns} />
        /*<div>
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
                    //checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.status}`}
                />
            </Box>
        </div>*/
    );
}
