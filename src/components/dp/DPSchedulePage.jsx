import React from "react";
import DPScheduleTable from "./DPScheduleTable";
import * as XLSX from 'xlsx';

//Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

    // Upload file by file to prevent human error
    const files = e.target.files, f = files[0];
    const reader = new FileReader();

    reader.onprogress = function(e) {
      const progress = (e.loaded / e.total) * 100;
      console.log(`Upload progress: ${progress}%`);
    };

    reader.onload = function (e) {
      const data = e.target.result;
      const readedData = XLSX.read(data, { type: 'binary' });
      const allSheetData = [];
      
      for (const sheetName of readedData.SheetNames) {
        const ws = readedData.Sheets[sheetName];
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (dataParse.length !== 0) {
          allSheetData.push(...prepareDataForTable(dataParse));
        }
      }
      setDataRows([...dataRows, ...allSheetData]);
    };

    reader.readAsBinaryString(f)
  }

  const prepareDataForTable = (data) => {
    const dbList = []
    const factoryCode = data[2][0].split(' ')[1];
    const rowCode = `${factoryCode.slice(0, 1)}${factoryCode.substr(2)}`
    const date = data[1][0].split(':')[1].trim();
    const price = 0;
    
    // Start from row 8 in Excel
    data.slice(8).map((row) => {
      if (row[0]?.includes(rowCode)) {
        dbList.push({
          "id": row[0],
          "date": date,
          "time": "-",
          "destination": row[3],
          "distance": 0,
          "code": row[7],
          "amount": row[9].toFixed(2),
          "price": price.toFixed(2),
          "oil": "-",
          "car": row[4],
          "driver": "จิรายุ พรมสูงวงศ์",
          "status": dpStatus(row[10].trim()),
        });
      }
      return dbList;
    });

    // return dbList to handleUploadExcel
    return dbList;
  }

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChangeTabs = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChangeTabs}>
            <Tab label="หนองใหญ่" />
            <Tab label="บ้านบึง" />
            <Tab label="ปลวกแดง" />
            <Tab label="หนองไผ่แก้ว" />
            <Tab label="วังจันทร์" />
          </Tabs>
        </Box>
        </Grid>

        <Grid item xs={12}>
          <DPScheduleTable dataRows={dataRows} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DPSchedulePage;
