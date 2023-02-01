import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//Icons

//Constants
import * as NavigationBarConstants from "../../../constants/NavigationBarConstants";

export default function AddCarInformationDialog(props) {

  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={props.openDialog}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
        เพิ่ม{NavigationBarConstants.menus[6].sub[0].name}
        <IconButton
          aria-label="close"
          onClick={props.handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ backgroundColor: "#FBFBFB" }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              รหัสรถโม่
            </Typography>
            <TextField id="carId" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              ทะเบียนรถ
            </Typography>
            <TextField id="license" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              ประเภทรถ
            </Typography>
            <TextField id="carType" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              วันที่จดทะเบียน
            </Typography>
            <TextField id="registrationDate" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              วันที่ซื้อ
            </Typography>
            <TextField id="buyDate" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              ราคา
            </Typography>
            <TextField id="price" variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
        <Button>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
