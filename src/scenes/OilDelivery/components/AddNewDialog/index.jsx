import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

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

//Table
import Table from './components/Table';

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import * as CalendarConstants from "../../../../constants/CalendarConstants";

const temp = ["หนองใหญ่", "บ้านบึง", "ปลวกแดง", "หนองไผ่แก้ว", "วังจันทร์"];

export default function AddNewDialog(props) {
  const [oilInfoArr, setOilInfoArr] = React.useState([]);
  const [factory, setFactory] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState(moment().format());
  const [dateTo, setDateTo] = React.useState(moment().format());
  const [isEmptyFactory, setIsEmptyFactory] = React.useState(false);

  useEffect(() => {
    prepareOilInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const prepareOilInfo = () => {
    console.log(props.selectedRow, props.isEdit);
    if (props.selectedRow.length === 1 && props.isEdit) {
      setOilInfoArr(props.selectedRow[0].arr);
      setFactory(props.selectedRow[0].factory);
      setDateFrom(moment(props.selectedRow[0].from, "DD-MM-YYYY").format());
      setDateTo(moment(props.selectedRow[0].to, "DD-MM-YYYY").format());
    } if (props.selectedRow.length === 0 && !props.isEdit) {
      setOilInfoArr([{
        name: "",
        value: ""
      }]);
    }

    console.log(oilInfoArr);
  }

  const handleChangeFactory = (event) => {
    if (event.target.value !== "") {
      setIsEmptyFactory(false);
    }
    setFactory(event.target.value);
  };

  const handleChangeDateFrom = (date) => {
    setDateFrom(moment(date).format());
  };

  const handleChangeDateTo = (date) => {
    setDateTo(moment(date).format());
  };

  const onClickSaveNewPrice = () => {
    if (factory !== "") {
      if (props.isEdit) {
        props.editPrice(
          oilInfoArr,
          factory,
          moment(dateFrom).format(CalendarConstants.dateFormat),
          moment(dateTo).format(CalendarConstants.dateFormat)
        )
      } if (!props.isEdit) {
        props.addNewPrice(
          oilInfoArr,
          factory,
          moment(dateFrom).format(CalendarConstants.dateFormat),
          moment(dateTo).format(CalendarConstants.dateFormat)
        );
      }

    }
    if (factory === "") {
      setIsEmptyFactory(true);
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={props.openDialog}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle>
        เพิ่ม{NavigationBarConstants.menus[6].sub[1].name}
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
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  error={isEmptyFactory}
                >
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
                    inputFormat={CalendarConstants.dateFormat}
                    value={dateFrom}
                    onChange={handleChangeDateFrom}
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
                    inputFormat={CalendarConstants.dateFormat}
                    value={dateTo}
                    onChange={handleChangeDateTo}
                    renderInput={(params) => (
                      <TextField size="small" sx={{ m: 1 }} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginLeft: "20px" }}>
            <Table
              isEditable={true}
              oilInfoArr={oilInfoArr}
              selectedRow={props.selectedRow}
              isEdit={props.isEdit}
              setOilInfoArr={setOilInfoArr}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickSaveNewPrice}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}