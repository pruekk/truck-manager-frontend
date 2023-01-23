import React from "react";
import CarInformationTable from "./tables/CarInformationTable";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Constatns
import * as CarConstants from "../../constants/CarConstants";

export default function CarInformationPage() {
  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CarInformationTable dataRows={CarConstants.cars} />
        </Grid>
      </Grid>
    </Container>
  );
}
