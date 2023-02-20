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

//Services
import { GetCars, AddNewCar, DeleteCar } from "./services/CarServices";

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
  const onSelectionModelChange = (ids) => {
    setSelectedRowIds(ids);
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
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <AddNewDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} handleAddNewCar={handleAddNewCar} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
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