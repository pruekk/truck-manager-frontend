import React from "react";

//Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

//components
import DriverTable from './components/RenderTable';
import HandleAlert from "../../components/HandleAlert";
import GroupButton from "../../components/GroupButton";

//Services
import { AddNewData, DeleteData, EditData, GetData } from "../../services/TruckManagerApiServices";

//Dialogs
import AddNewDialog from "./components/AddDriverDialog";
import EditDialog from "./components/EditDriverDialog";
import DeleteDialog from "../../components/DeleteDialog";

//Constants
import * as Constants from "./constants/Constants";
import { addIdToRow } from "../../functions/prepareDataForApi";

export default function Driver(props) {
  const { data, error, isLoading } = GetData({ component: "drivers" })

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAddNewDriver = async (newDriver) => {
    const response = await AddNewData({ component: "drivers", data: [newDriver]});

    if (response.success) {
      handleCloseDialog();

      return;
    }
  };

  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
  }

  const onClickEditRow = () => {
    const selectedRow = data.filter((row) => { return row.id === selectedRowIds[0] });
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
    const rowInfo = addIdToRow(data, row);
    const response = await EditData(rowInfo, 'drivers', localStorage.getItem('userToken'));

    if (response.success) {
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
  }

  const deleteDriver = async () => {
    const response = await DeleteData(selectedRowIds, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      onCloseDeleteDialog();

      return;
    }

    props.logOut();
  }

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
  const onCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false)
  }

  if (error) return <HandleAlert msg={error.response.data.message} status_code={error.response.status} />
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

      <Grid container alignItems="center">
        <Grid item xs sx={{ margin: "1rem 0rem 0rem 1rem" }}>
          <Typography variant="h5" component="div" gutterBottom>
            รายชื่อคนขับรถโม่
          </Typography>
        </Grid>
        <Grid item>
          <GroupButton
            command={[
              { name: "Add", disabled: false, setOpenDialog: setIsOpenDialog }, // disabled will check from permission
              { name: "Edit", disabled: !(selectedRowIds.length === 1), setOpenDialog: setIsOpenEditDialog, setEditData: onClickEditRow },
              { name: "Delete", disabled: !(selectedRowIds.length > 0), setOpenDialog: setIsOpenDeleteDialog },
            ]}
          />
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DriverTable
            dataRows={data}
            onSelectionModelChange={onSelectionModelChange}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
}
