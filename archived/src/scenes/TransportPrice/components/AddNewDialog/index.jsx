import React, { useEffect } from "react";

import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

//Select factory
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

//Date picker
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";

//Components
import Table from "./components/Table";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import * as CalendarConstants from "../../../../constants/CalendarConstants";

const temp = ["หนองใหญ่", "บ้านบึง", "ปลวกแดง", "หนองไผ่แก้ว", "วังจันทร์"];

export default function AddNewDialog(props) {
  const [priceListArr, setPriceListArr] = React.useState([]);
  const [factory, setFactory] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState(moment().format());
  const [dateTo, setDateTo] = React.useState(moment().format());
  const [isEmptyFactory, setIsEmptyFactory] = React.useState(false);
  const [isSumCorrect, setIsSumCorrect] = React.useState(false);

  useEffect(() => {
    preparePriceList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const preparePriceList = () => {
    if (props.selectedRow.length === 1 && props.isEdit) {
      setFactory(props.selectedRow[0].factory);
      setDateFrom(moment(props.selectedRow[0].from, "DD-MM-YYYY").format());
      setDateTo(moment(props.selectedRow[0].to, "DD-MM-YYYY").format());
      setPriceListArr(props.selectedRow[0].arr);

      return;
    }

    setPriceListArr([
      {
        name: "L",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "Y",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "Z",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "1",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "2",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "3",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "4",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "5",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "6",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "7",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "8",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "A",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "B",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "C",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
      {
        name: "D",
        value: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,
        ],
      },
    ]);
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
          priceListArr,
          factory,
          moment(dateFrom).format(CalendarConstants.dateFormat),
          moment(dateTo).format(CalendarConstants.dateFormat)
        )
      } if (!props.isEdit) {
        props.addNewPrice(
          priceListArr,
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
      maxWidth="xl"
      open={props.openDialog}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
        เพิ่ม{NavigationBarConstants.menus[0].sub[0].name}
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
          <Grid item xs={12}>
            {priceListArr.length !== 0 &&
              <Table
                isEditable={true}
                priceListArr={priceListArr}
                selectedRow={props.selectedRow}
                isEdit={props.isEdit}
                setPriceListArr={setPriceListArr}
                setIsSumCorrect={setIsSumCorrect}
              />
            }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
        <LoadingButton
          disabled={!isSumCorrect}
          loading={props.isLoading}
          onClick={onClickSaveNewPrice}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}