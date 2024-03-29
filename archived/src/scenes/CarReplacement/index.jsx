import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

//Table
import Table from "./components/Table";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//Dialogs
import AddNewDialog from './components/AddNewDialog';
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from "./components/EditDialog";

//Services
import { formatDateTime } from "../../functions/dateFotmat";
import { AddNewData, DeleteData, EditData, GetComponent } from "../../services/TruckManagerApiServices";

//Constants
import * as Constants from "./constants/Constants";
import { addIdToRow } from "../../functions/prepareDataForApi";

export default function CarReplacement(props) {
  const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getCarReplacement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCarReplacement = async () => {
    const response = await GetComponent("car-replacement", localStorage.getItem('userToken'))

    if (response.success) {
      const sortedList = response.data.sort((current, next) => {
        const dateCurrent = formatDateTime(current.date, current.time);
        const dateNext = formatDateTime(next.date, next.time);
        return dateNext - dateCurrent;
      })
      setConfirmedDataRows(sortedList);
      setIsLoading(false);

      return;
    }

    props.logOut();
  }

  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
  }

  const onClickEditRow = () => {
    const selectedRow = confirmedDataRows.filter((row) => { return row._id === selectedRowIds[0] });
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

  const onClickUpdate = async (row) => {
    const rowInfo = addIdToRow(confirmedDataRows, row, Constants.component.name);
    const response = await EditData(rowInfo, Constants.component.name,localStorage.getItem('userToken'));

    if (response.success) {
      getCarReplacement();
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  }

  const deleteCarReplacement = async () => {
    setIsLoading(true);
    const response = await DeleteData(selectedRowIds, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getCarReplacement();
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

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAddNewCarReplacement = async (obj) => {
    const response = await AddNewData([obj], Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getCarReplacement();
      handleCloseDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  };

  return (
    <>
      <AddNewDialog
        openDialog={isOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleAddNewCarReplacement={handleAddNewCarReplacement}
      />
      {isEditing &&
        <EditDialog
          openDialog={isOpenEditDialog}
          dataRows={selectedRow[0]}
          handleCloseDialog={handleCloseEditDialog}
          onClickUpdate={onClickUpdate}
        />
      }
      <DeleteDialog
        selectedRowIds={selectedRowIds}
        isLoading={isLoading}
        openDialog={isOpenDeleteDialog}
        onClickDelete={deleteCarReplacement}
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
          <Table dataRows={confirmedDataRows} onSelectionModelChange={onSelectionModelChange} />
        </Grid>
      </Grid>
    </>
  );
}
