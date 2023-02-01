import React from "react";
import DriverTable from "./tables/DriverTable";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//Constatns
import * as DriverConstants from "../../constants/DriverConstants";

export default function DriverPage() {
  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DriverTable dataRows={DriverConstants.drivers} />
        </Grid>
      </Grid>
    </Container>
  );
}
