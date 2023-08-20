import React from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

//Components
import Table from './components/Table';
import HandleAlert from "../../components/HandleAlert";

//Dialogs
import DeleteDialog from "../../components/DeleteDialog";
import ImportDialog from './components/ImportDialog';
import EditDialog from './components/EditDialog';

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

//Constants
import * as Constants from "./constants/Constants";
import * as FactoryConstants from "../../constants/FactoryConstants";

//Functions
import handleUploadExcel from "../../functions/handleUploadExcel";

//Services
import { AddNewData, DeleteData, EditData, GetComponent, GetData } from "../../services/TruckManagerApiServices";

export default function Agency(props) {
    const { data: AgencyList, error, isLoading } = GetData({ component: Constants.component.name });

    const [dataRows, setDataRows] = React.useState([]);
    const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
    const [factory, setFactory] = React.useState({
        code: "F272",
        name: "หนองใหญ่"
    });

    const getAgency = async () => {
        const response = await GetComponent({ component: Constants.component.name })

        if (response.success) {
            setConfirmedDataRows(response.data);
            return;
        }

        props.logOut();
        //setIsLoading(false);
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
        //setIsLoading(true);
        const response = await EditData(row, Constants.component.name);

        if (response.success) {
            getAgency();
            handleCloseEditDialog();

            return;
        }

        props.logOut();
        alert("Something went wrong! Please try again later.");
        //setIsLoading(false);
    }

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
    const deleteAgency = async () => {
        //setIsLoading(true);
        const response = await DeleteData(selectedRowIds, Constants.component.name);

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
        //setIsLoading(true);

        const uniqueDataRows = dataRows.filter((item, index, self) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        const response = await AddNewData(uniqueDataRows, Constants.component.name);

        if (response.success) {
            getAgency();
            handleCloseDialog();

            return;
        }

        alert("Something went wrong! Please try again later.");
        //setIsLoading(false);
    };

    if (error) return <HandleAlert msg={error.response?.data.message} status_code={error.response?.status} />
    return (
        <>
            <ImportDialog
                isLoading={isLoading}
                openDialog={isOpenDialog}
                newAgency={dataRows}
                exsitingAgency={AgencyList}
                setDataRows={setDataRows}
                handleCloseDialog={handleCloseDialog}
                handleConfirmImportedData={handleConfirmImportedData}
            />
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
                onClickDelete={deleteAgency}
                onCloseDeleteDialog={onCloseDeleteDialog}
            />

            <Grid container alignItems="center">
                <Grid item xs sx={{ margin: "1rem 0rem 0rem 1rem" }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        รายการหน่วยงาน
                    </Typography>
                </Grid>
                <Grid item sx={{ mr: 1}}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<FileDownloadRoundedIcon />}
                        sx={{
                            backgroundColor: "#30c464",
                            "&:hover": {
                                backgroundColor: "#269c50",
                            },
                            width: "100px",
                            fontSize: "1rem"
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
                <Grid item sx={{ mr: 1}}>
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
                            width: "100px",
                            fontSize: "1rem"
                        }}
                    >
                        Edit
                    </Button>
                </Grid>
                <Grid item sx={{ mr: 1}}>
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
                            width: "100px",
                            fontSize: "1rem"
                        }}
                    >
                        Delete
                    </Button>
                </Grid>
                <Grid item>
                    <FormControl sx={{ minWidth: '12rem' }} size="small" disabled>
                        <InputLabel>โรงงาน</InputLabel>
                        <Select
                            value={factory.name}
                            label="โรงงาน"
                            // onChange={handleChangeFactory}
                        >
                            {FactoryConstants.factories.map((factory) => <MenuItem key={factory.code} value={factory.name}>{factory.code} - {factory.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Table dataRows={AgencyList ? AgencyList : []} onSelectionModelChange={onSelectionModelChange} />
                </Grid>
            </Grid>
        </>
    );
}
