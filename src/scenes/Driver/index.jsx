import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//components
import Table from './components/Table';

//Constatns
import * as Constants from "./constants/Constants";

export default function Driver() {
  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table dataRows={Constants.drivers} />
        </Grid>
      </Grid>
    </Container>
  );
}