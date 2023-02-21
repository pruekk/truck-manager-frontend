import React from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//Components
import ImportDialog from './components/ImportDialog';
import Table from './components/Table';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

//Functions
import handleUploadExcel from "../../functions/handleUploadExcel";

//Constatns
import * as FactoryConstants from "../../constants/FactoryConstants";

export default function DP() {
    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([{
        "id": "F071141088",
        "date": "01/12/2022",
        "time": "00:41:00",
        "destination": "FCโรงพยาบาลกรุงเทพปล",
        "distance": 0,
        "code": 1,
        "amount": "6.00",
        "price": "0.00",
        "oil": 0,
        "car": "C56B",
        "driver": "",
        "status": "Accepted",
        "duplicated": false
    }]);

    const clearFileCache = (event) => {
        event.target.value = null;
        setDataRows([]);
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
                                    onChange={(e) => handleUploadExcel(e, "DP", confirmedDataRows, handleOpenDialog, dataRows, setDataRows)}
                                    onClick={clearFileCache} //Clear cache
                                />
                            </Button>
                        </Grid>
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
                    <Table dataRows={confirmedDataRows} />
                </Grid>
            </Grid>
        </Container>
    );
}
