import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { isDate } from "moment";
import TextField from "@mui/material/TextField";
import * as CalendarConstants from "../../constants/CalendarConstants";

//Components
import ImportDialog from './components/ImportDialog';
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from './components/EditDialog';
import Table from './components/Table';
import GroupButton from "./groupButton";

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

//Constatns
import * as FactoryConstants from "../../constants/FactoryConstants";

//Services
import { GetCarReplacement } from "../CarReplacement/services/CarReplacementServices";
import { AddNewDP, GetDP, DeleteDP, EditDP } from "./services/DPServices";

//Functions
import handleUploadExcel from "../../functions/handleUploadExcel";
import StickyHeadTable from "./summarize";

const isDateBetween = (date, start, end) => {
    if (date.toDateString() === start.toDateString() || date.toDateString() === end.toDateString()) {
        /* 
            start,end will get time from current machine which DP might start before
            example: running at 21.40
                start -> dd/mm/yyyy 21:40
                dp    -> dd/mm/yyyy 08.35
            compare with getTime() will return false
        */
        return true;
    } 
    const result = start.getTime() <= date.getTime() && date.getTime() <= end.getTime();
    return result;
};
export const convertDateTimeFormat = (dateString, timeString) => {
    // This function will be remove later once change DB schema
    const [day, month, year] = dateString.split("/");
    const [hours, minutes] = timeString.split(":");

    const date = new Date(`${month}/${day}/${year} ${hours}:${minutes}`);
    return date
}

export default function DP(props) {
    const [dataRows, setDataRows] = React.useState([]);
    const [dataFromAPI, setDataFromAPI] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingFromAPI, setLoadingFromAPI] = React.useState(true);

    const [summarizeTrip, setSummarizeTrip] = React.useState({ accept: 0, cancel: 0, spoil: 0 })
    const [summarizeAmount, setSummarizeAmount] = React.useState({ accept: 0, cancel: 0, spoil: 0 })
    const [summarizePrice, setSummarizePrice] = React.useState({ accept: 0, cancel: 0, spoil: 0 })

    const [factory, setFactory] = React.useState({
        code: "F272",
        name: "หนองใหญ่"
    });
    const handleChangeFactory = (event) => {
        const currentFactory = FactoryConstants.factories.find((factory) => factory.name === event.target.value)
        setFactory({
            name: currentFactory.name,
            code: currentFactory.code
        });

        const dataWithFilter = dataFromAPI.filter((dp) => 
            dp.id.startsWith(currentFactory.code)
        )
        setConfirmedDataRows(dataWithFilter);
    };

    const [dateFrom, setDateFrom] = React.useState(moment().format());
    const handleChangeDateFrom = (date) => {
        const newDateFrom = moment(date).format()
        setDateFrom(newDateFrom);

        const dataWithFilter = dataFromAPI.filter((dp) =>
            isDateBetween(convertDateTimeFormat(dp.date, dp.time), new Date(newDateFrom), new Date(dateTo)) &&
            dp.id.startsWith(factory.code)
            // Filter with factoryCode will remove later when backend support
        )
        setConfirmedDataRows(dataWithFilter);
    };
    const [dateTo, setDateTo] = React.useState(moment().format());
    const handleChangeDateTo = (date) => {
        const newDateTo = moment(date).format()
        setDateTo(newDateTo);

        const dataWithFilter = dataFromAPI.filter((dp) =>
            isDateBetween(convertDateTimeFormat(dp.date, dp.time), new Date(dateFrom), new Date(newDateTo)) &&
            dp.id.startsWith(factory.code)
            // Filter with factoryCode will remove later when backend support
        )
        setConfirmedDataRows(dataWithFilter);
        console.log(dataWithFilter)
    };

    useEffect(() => {
        setLoadingFromAPI(true)
        getDP();
        getCarReplacement();
    }, [factory.name, dateFrom]);

    const getDP = async () => {
        const response = await GetDP(localStorage.getItem('userToken'));
        /* 
            GET /dp/factoryId?from=01-{dateFrom.currentMonth}-{dateFrom.currentYear}&to=31-{dateFrom.currentMonth}-{dateFrom.currentYear}
        */
        if (response.success) {
            const dataFromAPI = response.data
            setDataFromAPI(dataFromAPI);
            const dataWithDateFilter = dataFromAPI.filter((dp) =>
                isDateBetween(convertDateTimeFormat(dp.date, dp.time), new Date(dateFrom), new Date(dateTo)) &&
                dp.id.startsWith(factory.code)
                // will be remove once backend handle this
            )
            setConfirmedDataRows(dataWithDateFilter);
            setLoadingFromAPI(false)
            // setConfirmedDataRows(dataFromAPI);

            const acceptedRecords = dataFromAPI.filter((record) => record.status === "Accepted")
            const canceledRecords = dataFromAPI.filter((record) => record.status === "Canceled")
            const spoiledRecords = dataFromAPI.filter((record) => record.status === "Spoiled")
            setSummarizeTrip({
                accept: acceptedRecords.length,
                cancel: canceledRecords.length,
                spoil: spoiledRecords.length
            })
            setSummarizeAmount({
                accept: acceptedRecords.reduce((accumulator, record) => accumulator + record.amount, 0),
                cancel: canceledRecords.reduce((accumulator, record) => accumulator + record.amount, 0),
                spoil: spoiledRecords.reduce((accumulator, record) => accumulator + record.amount, 0)
            })
            setSummarizePrice({
                accept: acceptedRecords.reduce((accumulator, record) => accumulator + record.price, 0),
                spoil: spoiledRecords.reduce((accumulator, record) => accumulator + record.price, 0)
            })

            setIsLoading(false);

            return;
        }

        setIsLoading(false);
        props.logOut();
    }

    const clearFileCache = (event) => {
        event.target.value = null;
        setDataRows([]);
    }

    const [carReplacement, setCarReplacement] = React.useState([]);
    const getCarReplacement = async () => {
        const response = await GetCarReplacement(localStorage.getItem('userToken'));

        if (response.success) {
            setCarReplacement(response.data);

            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
    }

    const [selectedRowIds, setSelectedRowIds] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState({});
    const onSelectionModelChange = (ids) => {
        setSelectedRowIds(ids);
    }

    const onClickEditRow = () => {
        const selectedRow = confirmedDataRows.filter((row) => { return row.id === selectedRowIds[0] });
        setSelectedRow(selectedRow);
        handleOpenEditDialog();
    }

    const [isOpenEditDialog, setIsOpenEditDialog] = React.useState(false);
    const handleOpenEditDialog = () => {
        setIsOpenEditDialog(true);
    }

    const handleCloseEditDialog = () => {
        setIsOpenEditDialog(false);
    }

    const onClickUpdate = async (row) => {
        setIsLoading(true);
        const response = await EditDP(localStorage.getItem('userToken'), row);

        if (response.success) {
            getDP();
            handleCloseEditDialog();

            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
        setIsLoading(false);
    }

    const deleteDP = async () => {
        setIsLoading(true);
        const response = await DeleteDP(localStorage.getItem('userToken'), selectedRowIds);

        if (response.success) {
            getDP();
            onCloseDeleteDialog();
            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
        setIsLoading(false);
    }

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
    const onOpenDeleteDialog = () => {
        setIsOpenDeleteDialog(true);
    }

    const onCloseDeleteDialog = () => {
        setIsOpenDeleteDialog(false)
    }

    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const handleConfirmImportedData = async (dataRows) => {
        setIsLoading(true);
        const response = await AddNewDP(localStorage.getItem('userToken'), dataRows);

        if (response.success) {
            getDP();
            handleCloseDialog();

            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
        setIsLoading(false);
    };

    return (
        <>
            <ImportDialog
                isLoading={isLoading}
                openDialog={isOpenDialog}
                dataRows={dataRows}
                setDataRows={setDataRows}
                handleCloseDialog={handleCloseDialog}
                handleConfirmImportedData={handleConfirmImportedData}
            />
            <EditDialog
                isLoading={isLoading}
                openDialog={isOpenEditDialog}
                dataRows={selectedRow}
                setDataRows={setDataRows}
                handleCloseDialog={handleCloseEditDialog}
                onClickUpdate={onClickUpdate}
            />
            <DeleteDialog
                selectedRowIds={selectedRowIds}
                isLoading={isLoading}
                openDialog={isOpenDeleteDialog}
                onClickDelete={deleteDP}
                onCloseDeleteDialog={onCloseDeleteDialog}
            />
            {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                disableElevation
                                variant="contained"
                                component="label"
                                startIcon={<FileDownloadRoundedIcon />}
                                sx={{
                                    backgroundColor: "#7b7a7a",
                                    "&:hover": {
                                        backgroundColor: "#c8cccc",
                                    },
                                }}
                            >
                                Import
                                <input
                                    hidden
                                    multiple
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    type="file"
                                    onChange={(e) => handleUploadExcel(e, "DP", confirmedDataRows, handleOpenDialog, dataRows, setDataRows, carReplacement)}
                                    onClick={clearFileCache} //Clear cache
                                />
                            </Button>
                        </Grid>
                        {selectedRowIds.length === 1 &&
                            <Grid item>
                                <Button
                                    disableElevation
                                    variant="contained"
                                    component="label"
                                    onClick={onClickEditRow}
                                    sx={{
                                        backgroundColor: "#7b7a7a",
                                        "&:hover": {
                                            backgroundColor: "#c8cccc",
                                        },
                                    }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                        }
                        {selectedRowIds.length > 0 &&
                            <Grid item>
                                <Button
                                    disableElevation
                                    variant="contained"
                                    component="label"
                                    onClick={onOpenDeleteDialog}
                                    sx={{
                                        backgroundColor: "#bd0101",
                                        "&:hover": {
                                            backgroundColor: "#cd6a6a",
                                        },
                                    }}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid> */}

            {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleChangeTabs}>
                            {FactoryConstants.factories.map((factory) =>
                                <Tab key={factory.name} label={factory.name} />
                            )}
                        </Tabs>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: { sm: 480*2.8 } }}>
                        <Tabs 
                            value={tabIndex} 
                            onChange={handleChangeTabs}
                            variant="scrollable"
                            scrollButtons
                        >
                            {[...uniqueDates].map((date) =>
                                <Tab key={date} label={date} />
                            )}
                        </Tabs>
                    </Box>
                </Grid>
            </Grid> */}

            <Grid container alignItems="center">
                <Grid item xs sx={{ margin: "1rem 0rem 0rem 1rem" }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        รายการเที่ยวรถโม่{factory.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <GroupButton />
                </Grid>
                {/* <Grid item>
                    <Button
                        disableElevation
                        variant="contained"
                        component="label"
                        startIcon={<FileDownloadRoundedIcon />}
                        sx={{
                            backgroundColor: "#30c464",
                            "&:hover": {
                                backgroundColor: "#269c50",
                            },
                            width: "100px",
                        }}
                    >
                        Import
                        <input
                            hidden
                            multiple
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            type="file"
                            onChange={(e) => handleUploadExcel(e, "DP", confirmedDataRows, handleOpenDialog, dataRows, setDataRows, carReplacement)}
                            onClick={clearFileCache} //Clear cache
                        />
                    </Button>
                </Grid>
                <Grid item sx={{ m: 1}}>
                    <Button
                        disableElevation
                        variant="contained"
                        component="label"
                        startIcon={<EditRoundedIcon />}
                        onClick={onClickEditRow}
                        disabled={selectedRowIds.length < 1}
                        sx={{
                            backgroundColor: "#df5420",
                            "&:hover": {
                                backgroundColor: "#b24319",
                            },
                        }}
                    >
                        Edit
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        disableElevation
                        variant="contained"
                        component="label"
                        startIcon={<DeleteForeverRoundedIcon />}
                        disabled={selectedRowIds.length < 1}
                        onClick={onOpenDeleteDialog}
                        sx={{
                            backgroundColor: "#bd0101",
                            "&:hover": {
                                backgroundColor: "#970000",
                            },
                        }}
                    >
                        Delete
                    </Button>
                </Grid> */}
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="จากวันที่"
                            value={dateFrom}
                            slots={['LeftArrowIcon', 'RightArrowIcon']}
                            onChange={handleChangeDateFrom}
                            inputFormat={CalendarConstants.dateFormat}
                            renderInput={(params) => (
                                <TextField size="small" sx={{ m: 1, maxWidth: "160px" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="ถึงวันที่"
                            value={dateTo}
                            slots={['LeftArrowIcon', 'RightArrowIcon']}
                            onChange={handleChangeDateTo}
                            inputFormat={CalendarConstants.dateFormat}
                            renderInput={(params) => (
                                <TextField size="small" sx={{ m: 1, maxWidth: "160px" }} {...params} />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <FormControl sx={{ minWidth: '12rem' }} size="small">
                        <InputLabel>โรงงาน</InputLabel>
                        <Select
                            value={factory.name}
                            label="โรงงาน"
                            onChange={handleChangeFactory}
                        >
                            {FactoryConstants.factories.map((factory) => <MenuItem key={factory.code} value={factory.name}>{factory.code} - {factory.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Table dataRows={confirmedDataRows} onSelectionModelChange={onSelectionModelChange} isLoading={loadingFromAPI} />
                </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ marginBottom: "1rem", marginTop: "1rem" }} />

            <Grid container alignItems="center">
                <Grid item xs sx={{ margin: "1rem 0rem 0rem 1rem" }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        สรุปรายการเดินรถ{factory.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl sx={{ minWidth: '12rem' }} size="small">
                        <InputLabel>โรงงาน</InputLabel>
                        <Select
                            value={factory.name}
                            label="โรงงาน"
                            onChange={handleChangeFactory}
                        >
                            {FactoryConstants.factories.map((factory) => <MenuItem key={factory.code} value={factory.name}>{factory.code} - {factory.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardHeader
                                    title="จำนวนเที่ยว"
                                    subheader={new Date(dateTo).toLocaleString('th-TH', { month: 'long', year: 'numeric', calendar: 'gregory' })}
                                />
                                <Divider flexItem />
                                <CardContent>
                                    <Grid container sx={{ textAlign: "center", alignContent: "center" }}>
                                        <Grid item xs="auto" md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeTrip.accept}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    เที่ยว
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeTrip.cancel}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    ยกเลิก
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeTrip.spoil}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    สปอย
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardHeader
                                    title="จำนวนคิว"
                                    subheader={new Date(dateTo).toLocaleString('th-TH', { month: 'long', year: 'numeric', calendar: 'gregory' })}
                                />
                                <Divider flexItem />
                                <CardContent>
                                    <Grid container sx={{ textAlign: "center", alignContent: "center" }}>
                                        <Grid item xs="auto" md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeAmount.accept}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    คิว
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeAmount.cancel}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    ยกเลิก
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeAmount.spoil}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    สปอย
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardHeader
                                    title="ยอดเงินรวม"
                                    subheader={new Date(dateTo).toLocaleString('th-TH', { month: 'long', year: 'numeric', calendar: 'gregory' })}
                                />
                                <Divider flexItem />
                                <CardContent>
                                    <Grid container sx={{ textAlign: "center", alignContent: "center" }}>
                                        <Grid item xs="auto" md={8}>
                                            <Typography variant="h5" component="div">
                                                {summarizePrice.accept.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    บาท
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizePrice.spoil.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    สปอย (บาท)
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <StickyHeadTable data={dataFromAPI}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StickyHeadTable />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
        </>
    );
}
