import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Icons
// import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
// import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
// import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";


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
