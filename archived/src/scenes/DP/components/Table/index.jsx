import React from "react";

//Tables
import DataGridTable from '../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../constants/TableConstants';

function Table(props) {
    const columns = [
        { field: 'id', headerName: 'เลขดีพี', minWidth: TableConstants.columnsSize.medium },
        {
            field: 'date',
            headerName: 'วันที่',
            type: 'date',
            minWidth: TableConstants.columnsSize.medium,
            valueGetter: ({ value }) => value && new Date(value.split('/')[2], parseInt(value.split('/')[1]) - 1, value.split('/')[0]),
            valueFormatter: ({ value }) => value && value.toLocaleDateString('en-GB'),
        },
        { field: 'time', headerName: 'เวลา', minWidth: TableConstants.columnsSize.small },
        { field: 'destination', headerName: 'หน่วยงาน', minWidth: TableConstants.columnsSize.large },
        { field: 'distance', headerName: 'ระยะทาง', type: 'number', minWidth: TableConstants.columnsSize.small },
        { field: 'code', headerName: 'รหัส', minWidth: TableConstants.columnsSize.small },
        { field: 'amount', headerName: 'คิว', type: 'number', minWidth: TableConstants.columnsSize.small },
        { field: 'price', headerName: 'ราคา', type: 'number', minWidth: TableConstants.columnsSize.small },
        { field: 'oil', headerName: 'น้ำมัน', type: 'number', minWidth: TableConstants.columnsSize.small },
        { field: 'car', headerName: 'เบอร์รถ', minWidth: TableConstants.columnsSize.small },
        { field: 'driver', headerName: 'คนขับรถ', minWidth: TableConstants.columnsSize.large },
        { field: 'status', headerName: 'สถานะ', type: 'singleSelect', valueOptions: ['Accepted', 'Canceled', 'Spoiled'], minWidth: TableConstants.columnsSize.small },
        { field: 'editBy', headerName: 'แก้ไขโดย', minWidth: TableConstants.columnsSize.xlarge },
    ];

    const customStyle = {
        height: '40rem',
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

    const formattedData = props.dataRows.map(item => {
        return {
            ...item,
            amount: item.amount.toFixed(2),
            price: item.price.toFixed(2),
        }
    });

    return (
        <DataGridTable 
            dataRows={formattedData}
            columns={columns}
            checkboxSelection={true}
            customStyle={customStyle}
            getRowClassName={getRowClassName}
            onSelectionModelChange={props.onSelectionModelChange}
            isLoading={props.isLoading}
        />
    );
}

export default Table;
