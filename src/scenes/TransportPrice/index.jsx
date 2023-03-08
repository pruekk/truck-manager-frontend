import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

//Components
import AddNewDialog from './components/AddNewDialog';
import DataTable from './components/DataTable';

//Functions
import { createData } from "./functions/Functions";

//Services
import { GetTransports, AddTransports, DeleteTransports, UpdateTransport } from "./services/TransportServices";

export default function Transport() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dataRow, setDataRow] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  useEffect(() => {
    getTransports();
  }, []);

  const getTransports = async () => {
    const response = await GetTransports(localStorage.getItem('userToken'));

    if (response.success) {
      setDataRow(response.data);
    }

    setIsLoading(false);
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

  const addNewPrice = async (priceListArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const dataRows = createData(factory, dateFrom, dateTo, priceListArr);
    const response = await AddTransports(localStorage.getItem('userToken'), [dataRows]);

    if (response.success) {
      getTransports();
      setOpenDialog(false);

      return;
    }

    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  };

  const editPrice = async (priceListArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const response = await UpdateTransport(localStorage.getItem('userToken'), {
      _id: selectedRow[0]._id,
      factory: factory,
      from: dateFrom,
      to: dateTo,
      arr: priceListArr,

    })

    if (response.success) {
      getTransports();
      setSelectedRow([]);
      setOpenDialog(false);

      return;
    }

    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  }

  const removePrice = async (selectedRow) => {
    setIsLoading(true);

    const response = await DeleteTransports(localStorage.getItem('userToken'), selectedRow);

    if (response.success) {
      getTransports();
      setSelectedRow([]);
      handleCloseDeleteDialog();

      return;
    }

    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  }

  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      {openDialog && <AddNewDialog
        openDialog={openDialog}
        selectedRow={selectedRow}
        isLoading={isLoading}
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
            {/* 
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                startIcon={<FileCopyRoundedIcon />}
                sx={{
                  backgroundColor: "#7b7a7a",
                  "&:hover": {
                    backgroundColor: "#c8cccc",
                  },
                }}
              >
                Copy
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                disableElevation
                fullWidth
                variant="contained"
                startIcon={<SearchRoundedIcon />}
                sx={{ backgroundColor: "#e0f1ee" }}
              >
                Search
              </Button>
            </Grid>
            */}
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
