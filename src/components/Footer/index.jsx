import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Icons

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Grid container style={{
      bottom: 0,
      position: "fixed",
      backgroundColor: "#FFFFFF"
    }}>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Container>
          <Grid
            container
            alignItems="end"
            spacing={1}
            style={{ height: "4rem", alignItems: "center" }}
          >
            <Grid item align="center" xs={12}>
              <Typography variant="body1" style={{ color: "#bbb8bb" }}>
                2020 - {currentYear} © บริษัท ธ.นุชาพร จำกัด
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}