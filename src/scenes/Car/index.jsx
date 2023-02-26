import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//Table
import Table from './components/Table';

//Dialogs
import AddNewDialog from './components/AddNewDialog';
import EditDialog from './components/EditDialog';

//Services
import { GetCars, AddNewCar, DeleteCar, EditCar } from "./services/CarServices";

export default function Car() {
  const [confirmedDataRows, setConfirmedDataRows] = React.useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const response = await GetCars(localStorage.getItem('userToken'));

    if (response.success) {
      setConfirmedDataRows(response.data);
    }
  }

  const handleAddNewCar = async (obj) => {
    const response = await AddNewCar(localStorage.getItem('userToken'), obj);

    if (response.success) {
      getCars();
      handleCloseDialog();

      return;
    }

    alert("Something went wrong! Please try again later.")
  }

  const [selectedRowIds, setSelectedRowIds] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
  }

  const onClickEditRow = () => {
    console.log(confirmedDataRows, selectedRowIds)
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
    const response = await EditCar(localStorage.getItem('userToken'), row);

    if (response.success) {
      getCars();
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    alert("Something went wrong! Please try again later.");
  }

  const deleteCar = async () => {
    const response = await DeleteCar(localStorage.getItem('userToken'), selectedRowIds[0]);

    if (response.success) {
      getCars();
    }
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
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
            {selectedRowIds.length === 1 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  component="label"
                  onClick={deleteCar}
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
    </Container>
  );
}