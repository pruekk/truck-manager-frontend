import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CompareTable from "../Tables/CompareTable";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

//Select factory
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

//Date picker
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import TextField from "@mui/material/TextField";

const temp = [
  "หนองใหญ่",
  "บ้านบึง",
  "ปลวกแดง",
  "หนองไผ่แก้ว",
  "วังจันทร์",
];

export default function AddTransportPriceDialog(props) {
  const [factory, setFactory] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState(moment().format());
  const [dateTo, setDateTo] = React.useState(moment().format());

  const handleChangeFactory = (event) => {
    setFactory(event.target.value);
  };

  const handleChangeDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleChangeDateTo = (date) => {
    setDateTo(date);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={props.openDialog}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle>
        เพิ่มรายการค่าขนส่ง
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
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-factory-small">โรงงาน</InputLabel>
                  <Select
                    labelId="select-factory-small"
                    id="select-factory-small"
                    value={factory}
                    label="โรงงาน"
                    onChange={handleChangeFactory}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {temp.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="ตั้งแต่"
                    inputFormat="MM/DD/YYYY"
                    value={dateTo}
                    onChange={handleChangeDateTo}
                    renderInput={(params) => (
                      <TextField size="small" sx={{ m: 1 }} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="จนถึง"
                    inputFormat="MM/DD/YYYY"
                    value={dateFrom}
                    onChange={handleChangeDateFrom}
                    renderInput={(params) => (
                      <TextField size="small" sx={{ m: 1 }} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CompareTable isEditable={true} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
