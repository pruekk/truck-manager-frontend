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

//Components
import ImportDialog from './components/ImportDialog';
import DeleteDialog from "./components/DeleteDialog";
import EditDialog from './components/EditDialog';
import Table from './components/Table';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

//Constatns
import * as FactoryConstants from "../../constants/FactoryConstants";

//Services
import { GetCarReplacement } from "../CarReplacement/services/CarReplacementServices";
import { AddNewDP, GetDP, DeleteDP, EditDP } from "./services/DPServices";

//Functions
import handleUploadExcel from "../../functions/handleUploadExcel";

export default function DP(props) {
    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [summarizeTrip, setSummarizeTrip] = React.useState({ accept: 0, cancel: 0, spoil: 0 })
    const [summarizeAmount, setSummarizeAmount] = React.useState({ accept: 0, cancel: 0, spoil: 0 })

    useEffect(() => {
        getDP();
        getCarReplacement();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDP = async () => {
        const response = await GetDP(localStorage.getItem('userToken'));

        if (response.success) {
            setConfirmedDataRows(response.data);
            
            const acceptedRecords = response.data.filter((record) => record.status === "Accepted")
            const canceledRecords = response.data.filter((record) => record.status === "Canceled")
            const spoiledRecords = response.data.filter((record) => record.status === "Spoiled")
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


    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTabs = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
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
                deleteDP={deleteDP}
                onCloseDeleteDialog={onCloseDeleteDialog}
            />
            <Grid container spacing={2}>
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

                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleChangeTabs}>
                            {FactoryConstants.factories.map((factory) =>
                                <Tab key={factory.name} label={factory.name} />
                            )}
                        </Tabs>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardHeader
                                    title="จำนวนเที่ยว"
                                    subheader="14 กันยายน 2016"
                                />
                                <Divider flexItem />
                                <CardContent>
                                    <Grid container sx={{ textAlign: "center", alignContent: "center"  }}>
                                        <Grid item xs="auto" md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeTrip.accept}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    เที่ยว
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        {/* <Divider orientation="vertical" flexItem /> */}
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeTrip.cancel}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    ยกเลิก
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        {/* <Divider orientation="vertical" flexItem /> */}
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
                                    subheader="14 กันยายน 2016"
                                />
                                <Divider flexItem />
                                <CardContent>
                                    <Grid container sx={{ textAlign: "center", alignContent: "center"  }}>
                                        <Grid item xs="auto" md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeAmount.accept}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    คิว
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        {/* <Divider orientation="vertical" flexItem /> */}
                                        <Grid item xs={3} md={4}>
                                            <Typography variant="h5" component="div">
                                                {summarizeAmount.cancel}
                                                <br />
                                                <Typography variant="body2" color="text.secondary">
                                                    ยกเลิก
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        {/* <Divider orientation="vertical" flexItem /> */}
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
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Table dataRows={confirmedDataRows} onSelectionModelChange={onSelectionModelChange} />
                </Grid>
            </Grid>
        </>
    );
}
