import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//components
import Table from './components/Table';

//Services
import { AddNewData, DeleteData, EditData, GetComponent } from "../../services/TruckManagerApiServices";

//Dialogs
import AddNewDialog from "./components/AddNewDialog";
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from "./components/EditDialog";

//Constants
import * as Constants from "./constants/Constants";
import { addIdToRow } from "../../functions/prepareDataForApi";

export default function Driver(props) {
  const [drivers, setDrivers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDrivers = async () => {
    const response = await GetComponent("drivers", localStorage.getItem('userToken'))

    if (response.success) {
      setDrivers(response.data);
      setIsLoading(false);

      return;
    }

    props.logOut();
  }

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAddNewDriver = async (obj) => {
    const response = await AddNewData([obj], 'drivers', localStorage.getItem('userToken'));

    if (response.success) {
      getDrivers();
      handleCloseDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  };

  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
  }

  const onClickEditRow = () => {
    const selectedRow = drivers.filter((row) => { return row.id === selectedRowIds[0] });
    setSelectedRow(selectedRow);
    setIsEditing(true);
    handleOpenEditDialog();
  }

  const [isOpenEditDialog, setIsOpenEditDialog] = React.useState(false);
  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  }

  const handleCloseEditDialog = () => {
    setIsOpenEditDialog(false);
    setSelectedRow({});
    setIsEditing(false);
  }

  const handleUpdateDriver = async (row) => {
    const rowInfo = addIdToRow(drivers, row);
    const response = await EditData(rowInfo, 'drivers', localStorage.getItem('userToken'));

    if (response.success) {
      getDrivers();
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  }

  const deleteDriver = async () => {
    setIsLoading(true);
    const response = await DeleteData(selectedRowIds, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getDrivers();
      onCloseDeleteDialog();

      return;
    }

    props.logOut();
  }

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
  const onOpenDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  }

  const onCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false)
  }

  return (
    <>
      <AddNewDialog
        openDialog={isOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleAddNewDriver={handleAddNewDriver}
      />
      {isEditing &&
        <EditDialog
          openDialog={isOpenEditDialog}
          dataRows={selectedRow[0]}
          handleCloseDialog={handleCloseEditDialog}
          handleUpdateDriver={handleUpdateDriver}
        />
      }

      <DeleteDialog
        selectedRowIds={selectedRowIds}
        isLoading={isLoading}
        openDialog={isOpenDeleteDialog}
        onClickDelete={deleteDriver}
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
                onClick={handleOpenDialog}
                startIcon={<AddCircleRoundedIcon />}
                sx={{
                  backgroundColor: "#419b45",
                  "&:hover": {
                    backgroundColor: "#94da98",
                  },
                }}
              >
                Add
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
          <Table dataRows={drivers} onSelectionModelChange={onSelectionModelChange} />
        </Grid>
      </Grid>
    </>
  );
}
