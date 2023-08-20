import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import * as TableConstants from '../../constants/TableConstants';
import { convertDateTimeFormat } from ".";

const columns = [
    { id: 'date', label: 'วันที่', minWidth: TableConstants.columnsSize.small },
    { id: 'code', label: 'รหัสค่าขนส่ง', align: 'right', minWidth: TableConstants.columnsSize.medium },
    {
        id: 'amount',
        label: 'จำนวนคิว',
        minWidth: TableConstants.columnsSize.medium,
        align: 'right',
        format: (value) => value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }),
    },
    { id: 'round', label: 'จำนวนเที่ยว', align: 'right', minWidth: TableConstants.columnsSize.medium },
    {
        id: 'sumAmount',
        label: 'รวมคิว',
        minWidth: TableConstants.columnsSize.medium,
        align: 'right',
        format: (value) => value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }),
    },
    {
        id: 'price',
        label: 'ราคาต่อเที่ยว',
        align: 'right',
        format: (value) => value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }),
        minWidth: TableConstants.columnsSize.large
    },
    {
        id: 'sumPrice',
        label: 'จำนวนเงิน',
        align: 'right',
        format: (value) => value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }),
        minWidth: TableConstants.columnsSize.large
    },
];

const summarizeRecords = (dp_list) => {
    const groupedRecords = {};
    dp_list.map((record) => {
        const key = `${record.date}-${record.code}-${record.amount}`;
        if (groupedRecords[key]) {
            groupedRecords[key].round += 1;
            groupedRecords[key].sumAmount += record.amount;
            groupedRecords[key].sumPrice += record.price;
        } else {
            groupedRecords[key] = {
                date: record.date,
                time: record.time,
                code: record.code,
                amount: record.amount,
                round: 1,
                sumAmount: record.amount,
                price: record.price,
                sumPrice: record.price,
            };
        }
        return groupedRecords[key]
    });
    const sortedData = Object.values(groupedRecords).sort((a, b) => {
        const dateA = convertDateTimeFormat(a.date, a.time);
        const dateB = convertDateTimeFormat(b.date, b.time);

        if (dateA.toDateString() === dateB.toDateString()) {
            if (a.code === b.code) {
                return a.amount - b.amount;
            }
            return a.code - b.code;
        }
        return dateA.getTime() - dateB.getTime();
    });
    return sortedData;
}

export default function StickyHeadTable({ data }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [totalPage, setTotalPage] = React.useState(0);
    const [summarizeData, setSummarizeData] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const calculateTablePagination = (data, itemsPerPage) => {
        // Group the data by date
        const dataByDate = data.reduce((acc, item) => {
            const date = item.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});

        // Get an array of dates
        const dates = Object.keys(dataByDate);

        // Get the records for the current page
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = dates.slice(startIndex, endIndex).map((date) => {
            const records = dataByDate[date];
            return { date, records };
        });
        return { dates, currentData }
    }

    useEffect(() => {
        const sumRec = summarizeRecords(data)
        setSummarizeData(sumRec)
        const dataPerPage = calculateTablePagination(sumRec, rowsPerPage)
        setTotalPage(dataPerPage.dates.length)
    }, [data, totalPage]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {console.log(calculateTablePagination(summarizeRecords(data), rowsPerPage))} */}
                        {summarizeData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <React.Fragment key={`${row.date}-${row.code}-${row.amount}`}>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={`${row.date}-${row.code}-${row.amount}`}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                        {/* <TableRow hover role="checkbox" tabIndex={-1} key={`${row.date}-${row.code}-${row.amount}`}>
                                            <TableCell>
                                                {row.date}
                                            </TableCell>
                                        </TableRow> */}
                                    </React.Fragment>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={50}
                // count={totalPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
