import React, { useEffect } from "react";
import * as XLSX from 'xlsx';

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//Components
import ImportDialog from './components/ImportDialog';
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
import { matchDriver } from "./functions/Functions";

export default function DP() {
    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);

    useEffect(() => {
        getDP();
        getCarReplacement();
    }, []);

    const getDP = async () => {
        const response = await GetDP(localStorage.getItem('userToken'));
        console.log(response);
        setConfirmedDataRows(response.data);
    }

    const dpStatus = (status) => {
        switch (status) {
            case "A":
                return "Accepted";
            case "C":
                return "Canceled";
            case "S":
                return "Spoiled";
            default:
                return "Error";
        }
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
        const response = await EditDP(localStorage.getItem('userToken'), row);

        if (response.success) {
            getDP();
            handleCloseEditDialog();

            return;
        }

        alert("Something went wrong! Please try again later.");
    }

    const deleteDP = async () => {
        const response = await DeleteDP(localStorage.getItem('userToken'), selectedRowIds);

        if (response.success) {
            getDP();

            return;
        }

        alert("Something went wrong! Please try again later.");
    }

    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const handleConfirmImportedData = async (dataRows) => {
        const response = await AddNewDP(localStorage.getItem('userToken'), dataRows);

        if (response.success) {
            getDP();
            handleCloseDialog();

            return;
        }

        alert("Something went wrong! Please try again later.");
    };


    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTabs = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
            <ImportDialog
                openDialog={isOpenDialog}
                dataRows={dataRows}
                setDataRows={setDataRows}
                handleCloseDialog={handleCloseDialog}
                handleConfirmImportedData={handleConfirmImportedData}
            />
            <EditDialog
                openDialog={isOpenEditDialog}
                dataRows={selectedRow}
                handleCloseDialog={handleCloseEditDialog}
                onClickUpdate={onClickUpdate}
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
                                    onChange={(e) => handleUploadExcel(e, "DP", confirmedDataRows, handleOpenDialog, dataRows, setDataRows)}
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
                                    onClick={deleteDP}
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
                    <Table dataRows={confirmedDataRows} onSelectionModelChange={onSelectionModelChange} />
                </Grid>
            </Grid>
        </Container>
    );
}
