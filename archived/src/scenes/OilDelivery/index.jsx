import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

//Functions
import { createData } from "./functions/Functions";

//Components
import AddNewDailog from './components/AddNewDialog';
import DataTable from './components/DataTable';

//Services
import { AddNewData, DeleteData, EditData, GetComponent } from "../../services/TruckManagerApiServices";

//Constants
import * as Constants from "./constants/Constants";

export default function OilDelivery(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dataRow, setDataRow] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  useEffect(() => {
    getOilDelivery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOilDelivery = async () => {
    const response = await GetComponent(Constants.component.name, localStorage.getItem('userToken'))

    if (response.success) {
      setDataRow(response.data);
      setIsLoading(false);
      return;
    }

    props.logOut();
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

  const addNewPrice = async (oilInfoArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const dataRows = createData(factory, dateFrom, dateTo, oilInfoArr);
    const response = await AddNewData([dataRows], Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getOilDelivery();
      setOpenDialog(false);

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  };

  const editPrice = async (oilInfoArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const response = await EditData({
      _id: selectedRow[0]._id,
      factory: factory,
      from: dateFrom,
      to: dateTo,
      arr: oilInfoArr,
    }, Constants.component.name, localStorage.getItem('userToken'))

    if (response.success) {
      getOilDelivery();
      setSelectedRow([]);
      setOpenDialog(false);

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);

  }

  const removePrice = async (selectedRow) => {
    setIsLoading(true);

    const response = await DeleteData(selectedRow, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getOilDelivery();
      setSelectedRow([]);
      handleCloseDeleteDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  }

  return (
    <>
      {openDialog && <AddNewDailog
        openDialog={openDialog}
        selectedRow={selectedRow}
        isEdit={isEdit}
        isLoading={isLoading}
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
            isLoading={isLoading}
            rows={dataRow}
            selectedRow={selectedRow}
            openDeleteDialog={openDeleteDialog}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
            setSelectedRow={setSelectedRow}
            removePrice={removePrice}
          />
        </Grid>
      </Grid>
    </>
  );
}
