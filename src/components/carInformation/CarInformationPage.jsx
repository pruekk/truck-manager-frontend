import React from "react";
import CarInformationTable from "./tables/CarInformationTable";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

//Dialogs
import AddCarInformationDialog from "./dialogs/AddCarInformationDialog";

//Constatns
import * as CarConstants from "../../constants/CarConstants";

export default function CarInformationPage() {
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
          <AddCarInformationDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
        </Grid>
        <Grid item xs={12}>
          <CarInformationTable dataRows={CarConstants.cars} />
        </Grid>
      </Grid>
    </Container>
  );
}
