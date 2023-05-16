import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//Table
import Table from './components/Table';

//Dialogs
import AddNewDialog from './components/AddNewDialog';
import DeleteDialog from "../../components/DeleteDialog";
import EditDialog from './components/EditDialog';

//Services
import { AddNewData, DeleteData, EditData, GetComponent } from "../../services/TruckManagerApiServices";

//Constants
import * as Constants from "./constants/Constants";
import { addIdToRow } from "../../functions/prepareDataForApi";

export default function Car(props) {
  const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCars = async () => {
    const response = await GetComponent("cars", localStorage.getItem('userToken'))

    if (response.success) {
      setConfirmedDataRows(response.data);
      setIsLoading(false);

      return;
    }

    props.logOut();
  }

  const handleAddNewCar = async (obj) => {
    const response = await AddNewData([obj], 'cars', localStorage.getItem('userToken'));

    if (response.success) {
      getCars();
      handleCloseDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.")
  }

  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
  }

  const onClickEditRow = () => {
    const selectedRow = confirmedDataRows.filter((row) => { return row.id === selectedRowIds[0] });
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
    const rowInfo = addIdToRow(confirmedDataRows, row);
    const response = await EditData(rowInfo, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getCars();
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  }

  const deleteCar = async () => {
    setIsLoading(true);
    const response = await DeleteData(selectedRowIds, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getCars();
      onCloseDeleteDialog();

      return;
    }

    props.logOut();
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleAddNewCar={handleAddNewCar}
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
        onClickDelete={deleteCar}
        onCloseDeleteDialog={onCloseDeleteDialog}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                onClick={handleClickOpenDialog}
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
