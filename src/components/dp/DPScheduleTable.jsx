import React from "react";

//Material UI
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
const columnsSize = {
    small: 90,
    medium: 100,
    large: 200
};

const chartWidth = 1000;
const chartHeight = 300;
const ExampleTimeSeriesChart = (props) => {
  const chartData = Object.keys(props.data).map(date => ({
    date: parseInt(date.substring(0, 2)),
    value: props.data[date]
  }));
  return <BarChart
    width={chartWidth}
    height={chartHeight}
    data={chartData}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" angle={0} tickSize={0} minTickGap={0} tickMargin={10}/>
    <YAxis type="number" domain={[0, 'auto']} />
    <Bar dataKey="value" fill="#30c464">
      <LabelList dataKey="value" position="top" style={{ fontSize: '80%' }}/>
    </Bar>
  </BarChart>
}

export const columns = [
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
    { field: 'status', headerName: 'สถานะ', type: 'singleSelect', valueOptions: ['Accepted', 'Canceled', 'Spoiled'], minWidth: columnsSize.small },
];

function DPScheduleTable(props) {
    const [pageSize, setPageSize] = React.useState(50);
    const countsAccepted = props.dataRows.reduce((acc, {date, amount, status}) => {
        if (status === 'Accepted') {
            acc[date] = (acc[date] || 0) + parseFloat(amount);
        }
        return acc;
    }, {});
    const countsCanceled = props.dataRows.reduce((acc, {date, amount, status}) => {
        if (status === 'Canceled') {
            acc[date] = (acc[date] || 0) + parseFloat(amount);
        }
        return acc;
    }, {});
    return (
        <div>
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
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) => `row-theme--${params.row.status}`}
                />
            </Box>
            <ExampleTimeSeriesChart data={countsAccepted} />
            <ExampleTimeSeriesChart data={countsCanceled} />
        </div>
    );
}

export default DPScheduleTable;
