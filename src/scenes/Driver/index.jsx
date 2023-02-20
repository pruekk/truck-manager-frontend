import React, { useEffect } from "react";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//components
import Table from './components/Table';

//Services
import { GetDrivers } from './services/DriverServices';

export default function Driver() {
  const [drivers, setDrivers] = React.useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await GetDrivers(localStorage.getItem('userToken'));

    if (response.success) {
      setDrivers(response.data);
    }
  }

  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table dataRows={drivers} />
        </Grid>
      </Grid>
    </Container>
  );
}