import React from "react";
import TableWithSelect from "../Tables/TableWithSelect";

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import AddTransportPriceDialog from "../dialog/AddTransportPriceDialog";

function HomePage() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <AddTransportPriceDialog
        openDialog={openDialog}
        handleClickOpenDialog={handleClickOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 700, color: "#828080" }}
          >
            ค่าขนส่ง
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                startIcon={<DriveFileRenameOutlineRoundedIcon />}
                sx={{
                  backgroundColor: "#7b7a7a",
                  "&:hover": {
                    backgroundColor: "#c8cccc",
                  },
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                startIcon={<FileCopyRoundedIcon />}
                sx={{
                  backgroundColor: "#7b7a7a",
                  "&:hover": {
                    backgroundColor: "#c8cccc",
                  },
                }}
              >
                Copy
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                disableElevation
                fullWidth
                variant="contained"
                startIcon={<SearchRoundedIcon />}
                sx={{ backgroundColor: "#e0f1ee" }}
              >
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                startIcon={<RemoveCircleRoundedIcon />}
                sx={{
                  backgroundColor: "#c91e24",
                  "&:hover": {
                    backgroundColor: "#eb8a8d",
                  },
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableWithSelect />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;