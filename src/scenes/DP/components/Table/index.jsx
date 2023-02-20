import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

function Table(props) {
    const columns = [
        { field: 'id', headerName: 'เลขดีพี', minWidth: TableConstants.columnsSize.medium },
        { field: 'date', headerName: 'วันที่', type: 'date', minWidth: TableConstants.columnsSize.medium },
        { field: 'time', headerName: 'เวลา', minWidth: TableConstants.columnsSize.small },
        { field: 'destination', headerName: 'หน่วยงาน', minWidth: TableConstants.columnsSize.large },
        { field: 'distance', headerName: 'ระยะทาง', minWidth: TableConstants.columnsSize.small },
        { field: 'code', headerName: 'รหัส', minWidth: TableConstants.columnsSize.small },
        { field: 'amount', headerName: 'คิว', minWidth: TableConstants.columnsSize.small },
        { field: 'price', headerName: 'ราคา', minWidth: TableConstants.columnsSize.small },
        { field: 'oil', headerName: 'น้ำมัน', minWidth: TableConstants.columnsSize.small },
        { field: 'car', headerName: 'เบอร์รถ', minWidth: TableConstants.columnsSize.small },
        { field: 'driver', headerName: 'คนขับรถ', minWidth: TableConstants.columnsSize.large },
        { field: 'status', headerName: 'สถานะ', type: 'singleSelect', valueOptions: ['Accepted', 'Canceled', 'Spoiled'], minWidth: TableConstants.columnsSize.small },
    ];

    const customStyle = {
        height: '30rem',
        width: '100%',
        '& .row-theme--Accepted': {
            bgcolor: 'rgb(245, 245, 245))',
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
    }

    const getRowClassName = (params) => {
        return `row-theme--${params.row.status}`
    }

    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} checkboxSelection={true} customStyle={customStyle} getRowClassName={getRowClassName} />
    );
}

export default Table;