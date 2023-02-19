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
import Table from './components/Table';

//Dialogs
import ImportDialog from './components/ImportDialog';

//Icons
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

//Constants
import * as Constants from "./constants/Constants";

//Services
import { GetAgency } from "./services/AgencyServices";

export default function Agency() {
    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
    const [selectedRowIds, setSelectedRowIds] = React.useState([]);

    useEffect(() => {
        getAgency();
    }, []);

    const getAgency = async () => {
        const response = await GetAgency();

        if (response.success) {
            setConfirmedDataRows(response.data);
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

            //Remove duplicated row
            const filteredSheetData = allSheetData.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            );

            handleOpenDialog();
            setDataRows([...dataRows, ...filteredSheetData]);
        };

        reader.readAsBinaryString(f)
    }

    const prepareDataForTable = (data) => {
        const dbList = [];
        const factoryCode = data[2][0].split(' ')[1];
        const rowCode = `${factoryCode.slice(0, 1)}${factoryCode.substr(2)}`
        const date = data[1][0].split(':')[1].trim().replace(/-/g, '/');

        // Start from row 8 in Excel
        data.slice(7).map((row) => {
            if (row[0]?.includes(rowCode)) {
                dbList.push({
                    "id": row[2],
                    "dateStart": date,
                    "dateEnd": date,
                    "agent": row[3],
                    "oldId": row[7],
                    "newId": row[7],
                    "distance": 0,
                    "oil": 0,
                });
            }
            return dbList;
        });

        // return dbList to handleUploadExcel
        return dbList;
    }

    const onSelectionModelChange = (id) => {
        setSelectedRowIds(id);
    }

    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const handleConfirmImportedData = (dataRows) => {
        const allRows = confirmedDataRows.concat(dataRows);
        setConfirmedDataRows(allRows);
        handleCloseDialog();
    };

    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTabs = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
            <ImportDialog
                openDialog={isOpenDialog}
                dataRows={dataRows}
                setDataRows={setDataRows}
                handleCloseDialog={handleCloseDialog}
                handleConfirmImportedData={handleConfirmImportedData}
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
                                    startIcon={<EditRoundedIcon />}
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
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleChangeTabs}>
                            {Constants.factories.map((factory) =>
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