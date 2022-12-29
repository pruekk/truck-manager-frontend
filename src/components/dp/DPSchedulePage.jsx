import React from "react";
import DPScheduleTable from "./DPScheduleTable";
import * as XLSX from 'xlsx';

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Icons
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

//Functions

//Constatns
import * as NavigationBarConstants from "../../constants/NavigationBarConstants";

const DPSchedulePage = () => {
  const [dataRows, setDataRows] = React.useState([]);
  const dpStatus = (status) => {
    switch (status) {
      case "A":
        return "Accepted";
      case "C":
        return "Canceled";
      case "S":
        return "Spoiled";
      default:
        return "Error";
    }
  }
  const handleUploadExcel = (e) => {
    e.preventDefault();

    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      prepareDataForTable(dataParse);
      return dataParse.slice(8);
    };

    reader.readAsBinaryString(f)
  }

  const prepareDataForTable = (data) => {
    let dbList = []
    const factoryCode = data[2][0].split(' ')[1];
    const rowCode = `${factoryCode.slice(0, 1)}${factoryCode.substr(2)}`
    const date = data[1][0].split(':')[1].trim();
    
    // Start from row 8 in Excel
    data.slice(8).map((row) => {
      if (row[0]?.includes(rowCode)) {
        dbList.push({
          "id": row[0],
          "วันที่": date,
          "เวลา": "-",
          "หน่วยงาน": row[3],
          "ระยะทาง": 0,
          "รหัส": row[7],
          "คิว": row[9],
          "ราคา": 0,
          "น้ำมัน": "-",
          "เบอร์รถ": row[4],
          "คนขับรถ": "จิรายุ พรมสูงวงศ์",
          "สถานะ": dpStatus(row[10].trim()),
        });
      }
      return dbList;
    });

    setDataRows([...dataRows, ...dbList]);
  }

  return (
    <Container sx={{ paddingTop: "2rem" }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 700, color: "#828080" }}
          >
            {NavigationBarConstants.menus[0].sub[1].name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/*<Grid item>
              <Button
                disableElevation
                variant="contained"
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
              </Grid>*/}
            <Grid item>
              <Button
                disableElevation
                variant="contained"
                component="label"
                startIcon={<FileDownloadRoundedIcon />}
                sx={{
                  backgroundColor: "#7b7a7a",
                  "&:hover": {
                    backgroundColor: "#c8cccc",
                  },
                }}
              >
                Import
                <input hidden accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple type="file" onChange={handleUploadExcel} />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DPScheduleTable dataRows={dataRows} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DPSchedulePage;
