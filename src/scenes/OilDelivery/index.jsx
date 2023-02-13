import React from "react";

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

//Constatns
import * as Constants from "./constants/Constants";

export default function OilDelivery() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dataRow, setDataRow] = React.useState(Constants.dummyData);
  const [selectedRow, setSelectedRow] = React.useState([]);

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

  const addNewPrice = (oilInfoArr, factory, dateFrom, dateTo) => {
    dataRow.push(createData(factory, dateFrom, dateTo, oilInfoArr));
    setDataRow([...dataRow]);
    setOpenDialog(false);
  };

  const editPrice = (oilInfoArr, factory, dateFrom, dateTo) => {
    console.log(oilInfoArr);
    dataRow.some((obj) => {
      if (obj.factory === selectedRow[0].factory && obj.from === selectedRow[0].from && obj.to === selectedRow[0].to) {
        obj.factory = factory;
        obj.from = dateFrom;
        obj.to = dateTo;
        obj.arr = oilInfoArr;
        return true;
      }
      return false;
    });
    
    setDataRow([...dataRow]);
    setOpenDialog(false);
  }

  const removePrice = (selectedRow) => {
    selectedRow.map((row) => {
      const dataIndex = dataRow.findIndex((obj) => obj.factory === row.factory && obj.from === row.from && obj.to === row.to);
      dataRow.splice(dataIndex, 1);

      return dataRow;
    })

    setDataRow([...dataRow]);
    setSelectedRow([]);
    handleCloseDeleteDialog();
  }

  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
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