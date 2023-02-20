import React from "react";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Table
import Table from "./components/Table";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//Dialogs
import AddNewDialog from './components/AddNewDialog';

//Constatns
import * as Constants from "./constants/Constants";

export default function CarReplacement() {
  const [confirmedDataRows, setConfirmedDataRows] = React.useState(Constants.carReplacements);

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAddNewCarReplacement = (obj) => {
    setConfirmedDataRows([...confirmedDataRows, obj]);
    handleCloseDialog();
  };


  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <AddNewDialog openDialog={isOpenDialog} handleCloseDialog={handleCloseDialog} handleAddNewCarReplacement={handleAddNewCarReplacement} />
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
                  backgroundColor: "#7b7a7a",
                  "&:hover": {
                    backgroundColor: "#c8cccc",
                  },
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Table dataRows={confirmedDataRows} />
        </Grid>
      </Grid>
    </Container>
  );
}