import React, { useEffect } from "react";

//Material UI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';

//Icons
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

//Components
import AddNewDialog from './components/AddNewDialog';
import DataTable from './components/DataTable';
import InfoTable from "./components/DataTable/components/InfoTable";
import GroupButton from "../DP/groupButton";

//Functions
import { createData } from "./functions/Functions";

//Services
import { AddNewData, DeleteData, EditData, GetComponent } from "../../services/TruckManagerApiServices";

//Constants
import * as Constants from "./constants/Constants";
import * as FactoryConstants from "../../constants/FactoryConstants";
import * as CalendarConstants from "../../constants/CalendarConstants";

export default function Transport(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [dataRow, setDataRow] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);

  useEffect(() => {
    getTransports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransports = async () => {
    const response = await GetComponent(Constants.component.name, localStorage.getItem('userToken'))
    console.log(response);

    if (response.success) {
      setDataRow(response.data);
      setIsLoading(false);

      return;
    }

    props.logOut();
    setIsLoading(false);
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    setIsEdit(false);
  };

  const handleClickOpenEditDialog = () => {
    setOpenDialog(true);
    setIsEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const addNewPrice = async (priceListArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const dataRows = createData(factory, dateFrom, dateTo, priceListArr);
    const response = await AddNewData([dataRows], Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getTransports();
      setOpenDialog(false);

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  };

  const editPrice = async (priceListArr, factory, dateFrom, dateTo) => {
    setIsLoading(true);

    const response = await EditData({
      _id: selectedRow[0]._id,
      factory: factory,
      from: dateFrom,
      to: dateTo,
      arr: priceListArr,
    }, Constants.component.name, localStorage.getItem('userToken'))

    if (response.success) {
      getTransports();
      setSelectedRow([]);
      setOpenDialog(false);

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  }

  const removePrice = async (selectedRow) => {
    setIsLoading(true);
    const response = await DeleteData(selectedRow, Constants.component.name, localStorage.getItem('userToken'));

    if (response.success) {
      getTransports();
      setSelectedRow([]);
      handleCloseDeleteDialog();

      return;
    }

    props.logOut();
    alert("Something went wrong! Please try again later.");
    setIsLoading(false);
  }

  return (
    <>
      {openDialog && <AddNewDialog
        openDialog={openDialog}
        selectedRow={selectedRow}
        isLoading={isLoading}
        isEdit={isEdit}
        addNewPrice={addNewPrice}
        editPrice={editPrice}
        handleClickOpenDialog={handleClickOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/* <Grid item>
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
            </Grid> */}
            {/* {selectedRow.length === 1 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  onClick={handleClickOpenEditDialog}
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
            } */}
            {/* {selectedRow.length !== 0 &&
              <Grid item>
                <Button
                  disableElevation
                  variant="contained"
                  sx={{
                    backgroundColor: "#c91e24",
                    "&:hover": {
                      backgroundColor: "#eb8a8d",
                    },
                  }}
                  onClick={handleOpenDeleteDialog}
                >
                  Delete
                </Button>
              </Grid>
            } */}
            {/* 
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
            */}
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <DataTable
            isLoading={isLoading}
            rows={dataRow}
            selectedRow={selectedRow}
            openDeleteDialog={openDeleteDialog}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
            setSelectedRow={setSelectedRow}
            removePrice={removePrice}
          />
        </Grid> */}
      </Grid>

      <Grid container alignItems="center">
        <Grid item xs sx={{ margin: "1rem 0rem 0rem 1rem" }}>
          <Typography variant="h5" component="div" gutterBottom>
            ใบราคาค่าขนส่ง
          </Typography>
        </Grid>
        <Grid item>
          <GroupButton />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="จากวันที่"
              value={moment().format()}
              slots={['LeftArrowIcon', 'RightArrowIcon']}
              // onChange={handleChangeDateFrom}
              inputFormat={CalendarConstants.dateFormat}
              renderInput={(params) => (
                <TextField size="small" sx={{ m: 1, maxWidth: "160px" }} {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="ถึงวันที่"
              value={moment().format()}
              slots={['LeftArrowIcon', 'RightArrowIcon']}
              // onChange={handleChangeDateTo}
              inputFormat={CalendarConstants.dateFormat}
              renderInput={(params) => (
                <TextField size="small" sx={{ m: 1, maxWidth: "160px" }} {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: '12rem' }} size="small">
            <InputLabel>โรงงาน</InputLabel>
            <Select
              value={"หนองใหญ่"}
              label="โรงงาน"
            // onChange={handleChangeFactory}
            >
              {FactoryConstants.factories.map((factory) => <MenuItem key={factory.code} value={factory.name}>{factory.code} - {factory.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
      {/* Change to Datagrid */}
      {/* <Grid item xs={12}>
        <DataTable
          isLoading={isLoading}
          rows={dataRow}
          selectedRow={selectedRow}
          openDeleteDialog={openDeleteDialog}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          setSelectedRow={setSelectedRow}
          removePrice={removePrice}
        />
      </Grid> */}
      <Divider variant="fullWidth" sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <Grid item align="center" xs={12} sx={{ width: "max-content" }}>
        <Table>
          <TableBody sx={{ backgroundColor: "#FBFBFB" }}>
            {dataRow?.map((row, index) => index === 0 && (
              <TableRow key={index}>
                <Grid
                  item
                  xs={12}
                  align="center"
                  sx={{
                    width: "101rem",
                    overflowX: "auto",
                    fontFamily: "Chivo Mono, monospace",
                    fontSize: "14px"
                  }}>
                  <InfoTable isEditable={false} priceListArr={row.arr} />
                </Grid>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
