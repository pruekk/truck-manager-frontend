import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//components
import Table from './components/Table';

//Services
import { GetDrivers, AddNewDriver, EditDriver, DeleteDriver } from './services/DriverServices';

//Dialogs
import AddNewDialog from "./components/AddNewDialog";
import EditDialog from "./components/EditDialog";

export default function Driver() {
  const [drivers, setDrivers] = React.useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await GetDrivers(localStorage.getItem('userToken'));

    if (response.success) {
      setDrivers(response.data);
    }
  }

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAddNewDriver = async (obj) => {
    const response = await AddNewDriver(localStorage.getItem('userToken'), [obj]);

    if (response.success) {
      getDrivers();
      handleCloseDialog();

      return;
    }

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
    const response = await EditDriver(localStorage.getItem('userToken'), row);

    if (response.success) {
      getDrivers();
      setSelectedRow({});
      setIsEditing(false);
      handleCloseEditDialog();

      return;
    }

    alert("Something went wrong! Please try again later.");
  }

  const deleteDriver = async () => {
    const response = await DeleteDriver(localStorage.getItem('userToken'), selectedRowIds[0]);

    if (response.success) {
      getDrivers();
    }
  }

  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
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
            {selectedRowIds.length === 1 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  component="label"
                  onClick={deleteDriver}
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
    </Container>
  );
}