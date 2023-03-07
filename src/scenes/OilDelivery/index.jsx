import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

//Functions
import { createData } from "./functions/Functions";

//Components
import AddNewDailog from './components/AddNewDialog';
import DataTable from './components/DataTable';

//Services
import { GetOilDelivery, AddOilDelivery, UpdateOilDelivery, DeleteOilDelivery } from "./services/OilDeliveryServices";

export default function OilDelivery() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dataRow, setDataRow] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  useEffect(() => {
    getOilDelivery();
  }, []);

  const getOilDelivery = async () => {
    const response = await GetOilDelivery(localStorage.getItem('userToken'));

    if (response.success) {
      setDataRow(response.data);
    }
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    setIsEdit(false);
  };

  const handleClickOpenEditDialog = () => {
    setOpenDialog(true);
    setIsEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const addNewPrice = async (oilInfoArr, factory, dateFrom, dateTo) => {
    const dataRows = createData(factory, dateFrom, dateTo, oilInfoArr);
    const response = await AddOilDelivery(localStorage.getItem('userToken'), [dataRows]);

    if (response.success) {
      getOilDelivery();
      setOpenDialog(false);

      return;
    }

    alert("Something went wrong! Please try again later.");
  };

  const editPrice = async (oilInfoArr, factory, dateFrom, dateTo) => {
    const response = await UpdateOilDelivery(localStorage.getItem('userToken'), {
      _id: selectedRow[0]._id,
      factory: factory,
      from: dateFrom,
      to: dateTo,
      arr: oilInfoArr,
    })

    if (response.success) {
      getOilDelivery();
      setSelectedRow([]);
      setOpenDialog(false);

      return;
    }

    alert("Something went wrong! Please try again later.");

  }

  const removePrice = async (selectedRow) => {
    const response = await DeleteOilDelivery(localStorage.getItem('userToken'), selectedRow);

    if (response.success) {
      getOilDelivery();
      setSelectedRow([]);
      handleCloseDeleteDialog();

      return;
    }

    alert("Something went wrong! Please try again later.");
  }

  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      {openDialog && <AddNewDailog
        openDialog={openDialog}
        selectedRow={selectedRow}
        isEdit={isEdit}
        addNewPrice={addNewPrice}
        editPrice={editPrice}
        handleClickOpenDialog={handleClickOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />}
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
            {selectedRow.length === 1 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  onClick={handleClickOpenEditDialog}
                  startIcon={<DriveFileRenameOutlineRoundedIcon />}
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
            {selectedRow.length !== 0 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  startIcon={<RemoveCircleRoundedIcon />}
                  sx={{
                    backgroundColor: "#c91e24",
                    "&:hover": {
                      backgroundColor: "#eb8a8d",
                    },
                  }}
                  onClick={handleOpenDeleteDialog}
                >
                  Delete
                </Button>
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            rows={dataRow}
            selectedRow={selectedRow}
            openDeleteDialog={openDeleteDialog}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
            setSelectedRow={setSelectedRow}
            removePrice={removePrice}
          />
        </Grid>
      </Grid>
    </Container>
  );
}