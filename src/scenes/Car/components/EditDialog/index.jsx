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

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";

//Others
import moment from "moment";

export default function EditDialog(props) {
  const [carObj, setCarObj] = React.useState({});
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    setCarObj(props.dataRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (event) => {
    let updatedValue = {};
    updatedValue[`${event.target.name}`] = event.target.value;
    setCarObj(carObj => ({
      ...carObj,
      ...updatedValue
    }));
  }

  const onClickUpdate = () => {
    console.log(carObj);
    if (carObj["id"] && carObj["licensePlate"] && carObj["type"] && carObj["registrationDate"] && carObj["buyDate"] && carObj["price"]) {
      setIsError(false);

      props.onClickUpdate({
        id: carObj["id"],
        licensePlate: carObj["licensePlate"],
        type: carObj["type"],
        registrationDate: moment(carObj["registrationDate"], moment.defaultFormat).format('DD/MM/YYYY'),
        buyDate: moment(carObj["buyDate"], moment.defaultFormat).format('DD/MM/YYYY'),
        price: Number(carObj["price"]),
      });

      return;
    }

    setIsError(true);
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
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
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              รหัสรถโม่
            </Typography>
            <TextField id="id" name="id" variant="outlined" value={carObj["id"] || ""} error={isError && !carObj["id"]} onChange={onChangeInput} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              ทะเบียนรถ
            </Typography>
            <TextField id="licensePlate" name="licensePlate" variant="outlined" value={carObj["licensePlate"] || ""} error={isError && !carObj["licensePlate"]} onChange={onChangeInput} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              ประเภทรถ
            </Typography>
            <TextField id="type" name="type" variant="outlined" value={carObj["type"] || ""} error={isError && !carObj["type"]} onChange={onChangeInput} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              วันที่จดทะเบียน
            </Typography>
            <TextField id="registrationDate" name="registrationDate" type="date" variant="outlined" value={moment(carObj["registrationDate"], moment.defaultFormat).format("YYYY-MM-DD") || ""} error={isError && !carObj["registrationDate"]} onChange={onChangeInput} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              วันที่ซื้อ
            </Typography>
            <TextField id="buyDate" name="buyDate" type="date" variant="outlined" value={moment(carObj["buyDate"], moment.defaultFormat).format("YYYY-MM-DD") || ""} error={isError && !carObj["buyDate"]} onChange={onChangeInput} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              ราคา
            </Typography>
            <TextField id="price" name="price" variant="outlined" value={carObj["price"] || ""} error={isError && !carObj["price"]} onChange={onChangeInput} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
        <Button onClick={onClickUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}