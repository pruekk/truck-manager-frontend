import React from "react";

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

//Constatns
import * as Constants from "./constants/Constants";

export default function Car() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
          <AddNewDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
        </Grid>
        <Grid item xs={12}>
          <Table dataRows={Constants.cars} />
        </Grid>
      </Grid>
    </Container>
  );
}