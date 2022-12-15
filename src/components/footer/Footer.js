import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Icons

export default function Footer() {
  return (
    <Grid container style={{ marginTop: "100px", position: "fixed", bottom: 0 }}>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} style={{ backgroundColor: "#white" }}>
        <Container>
          <Grid
            container
            alignItems="end"
            spacing={1}
            style={{ padding: "10px" }}
          >
            <Grid item align="center" xs={12}>
              <Typography variant="body1" style={{ color: "#bbb8bb" }}>
                2020 - 2021 © บริษัท ธ.นุชาพร จำกัด
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
