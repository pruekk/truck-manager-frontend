import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


function HomePage() {
  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item align="center" xs={12}>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
