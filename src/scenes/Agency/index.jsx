import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//Components
import Table from './components/Table';

//Dialogs
import DeleteDialog from "./components/DeleteDialog";
import ImportDialog from './components/ImportDialog';
import EditDialog from './components/EditDialog';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

//Constants
import * as Constants from "./constants/Constants";

//Functions
import handleUploadExcel from "../../functions/handleUploadExcel";

//Services
import { AddNewAgency, GetAgency, DeleteAgency, EditAgency } from "./services/AgencyServices";

export default function Agency(props) {
    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        getAgency();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAgency = async () => {
        const response = await GetAgency(localStorage.getItem('userToken'));

        if (response.success) {
            setConfirmedDataRows(response.data);
            setIsLoading(false);

            return;
        }

        props.logOut();
        setIsLoading(false);
    }

    const clearFileCache = (event) => {
        event.target.value = null;
        setDataRows([]);
    }

    const [selectedRowIds, setSelectedRowIds] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const onSelectionModelChange = (ids) => {
        setSelectedRowIds(ids);
    }

    const onClickEditRow = () => {
        const selectedRow = confirmedDataRows.filter((row) => { return row._id === selectedRowIds[0] });
        setSelectedRow(selectedRow);
        handleOpenEditDialog();
    }

    const onUpdateSelectedRow = (row) => {
        setSelectedRow([row]);
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
        const response = await EditAgency(localStorage.getItem('userToken'), row);

        if (response.success) {
            getAgency();
            handleCloseEditDialog();

            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
        setIsLoading(false);
    }

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
    const deleteAgency = async () => {
        setIsLoading(true);
        const response = await DeleteAgency(localStorage.getItem('userToken'), selectedRowIds);

        if (response.success) {
            getAgency();
            onCloseDeleteDialog();

            return;
        }

        props.logOut();
    }

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

        const uniqueDataRows = dataRows.filter((item, index, self) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        const response = await AddNewAgency(localStorage.getItem('userToken'), uniqueDataRows);

        if (response.success) {
            getAgency();
            handleCloseDialog();

            return;
        }

        alert("Something went wrong! Please try again later.");
        setIsLoading(false);
    };

    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTabs = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <>
            {isOpenDialog &&
                <ImportDialog
                    isLoading={isLoading}
                    openDialog={isOpenDialog}
                    dataRows={dataRows}
                    confirmedDataRows={confirmedDataRows}
                    setDataRows={setDataRows}
                    handleCloseDialog={handleCloseDialog}
                    handleConfirmImportedData={handleConfirmImportedData}
                />
            }
            <EditDialog
                isLoading={isLoading}
                openDialog={isOpenEditDialog}
                dataRows={selectedRow}
                handleCloseDialog={handleCloseEditDialog}
                onClickUpdate={onClickUpdate}
                onUpdateSelectedRow={onUpdateSelectedRow}
            />
            <DeleteDialog
                selectedRowIds={selectedRowIds}
                isLoading={isLoading}
                openDialog={isOpenDeleteDialog}
                deleteAgency={deleteAgency}
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
                                    onChange={(e) => handleUploadExcel(e, "Agency", confirmedDataRows, handleOpenDialog, dataRows, setDataRows)}
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
                                    //onClick={deleteAgency}
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
        </>
    );
}
