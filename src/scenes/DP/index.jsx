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

    const handleUploadExcel = (e) => {
        e.preventDefault();
        // Upload file by file to prevent human error
        const files = e.target.files, f = files[0];
        const reader = new FileReader();

        reader.onprogress = function (e) {
            const progress = (e.loaded / e.total) * 100;
            console.log(`Upload progress: ${progress}%`);
        };

        reader.onload = function (e) {
            const data = e.target.result;
            const readedData = XLSX.read(data, { type: 'binary' });
            const allSheetData = [];

            for (const sheetName of readedData.SheetNames) {
                const ws = readedData.Sheets[sheetName];
                const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (dataParse.length !== 0) {
                    allSheetData.push(...prepareDataForTable(dataParse));
                }
            }

            handleOpenDialog();
            setDataRows([...dataRows, ...allSheetData]);
        };

        reader.readAsBinaryString(f)
    }

    const convertToTimeFormat = (num) => {
        var hours = Math.floor(num * 24);
        var minutes = Math.floor((num * 24 - hours) * 60);
        var seconds = Math.round((((num * 24 - hours) * 60) - minutes) * 60);
        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
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

    const prepareDataForTable = (data) => {
        const dbList = []
        const factoryCode = data[2][0].split(' ')[1];
        const rowCode = `${factoryCode.slice(0, 1)}${factoryCode.substr(2)}`
        const date = data[1][0].split(':')[1].trim().replace(/-/g, '/');
        const price = 0;

        // Start from row 8 in Excel
        data.slice(7).map((row) => {
            if (row[0]?.includes(rowCode)) {
                dbList.push({
                    "id": row[0],
                    "date": date,
                    "time": convertToTimeFormat(row[5]),
                    "destination": row[3],
                    "distance": 0,
                    "code": row[7],
                    "amount": row[9].toFixed(2),
                    "price": price.toFixed(2),
                    "oil": 0,
                    "car": row[4],
                    "driver": matchDriver(row[4], date, convertToTimeFormat(row[5]), carReplacement),
                    "status": dpStatus(row[10].trim()),
                    "duplicated": confirmedDataRows.some(list => list.id === row[0])
                });
            }
            return dbList;
        });

        // return dbList to handleUploadExcel
        return dbList;
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
                                    onChange={handleUploadExcel}
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
