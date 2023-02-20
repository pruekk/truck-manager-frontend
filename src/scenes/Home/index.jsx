import React from "react";

//Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

//Constatns
import * as FactoryConstants from "../../constants/FactoryConstants";

//Charts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

import { DataGrid, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
// import TableCell from '@mui/material/TableCell';

const columns = [
  { field: 'id', headerName: 'รถโม่', width: 70 },
  { field: 'factoryId', headerName: 'โรงงาน', width: 130 },
  { field: 'income', headerName: 'รายได้', type: 'number', width: 130 },
  { field: 'expense', headerName: 'ค่าซ่อม', type: 'number', width: 130 },
  { field: 'roundTrip', headerName: 'จำนวนเที่ยว', type: 'number', width: 130 },
  { field: 'amount', headerName: 'จำนวนคิว', type: 'number', width: 130 },
  { field: 'distance', headerName: 'ระยะทาง', type: 'number', width: 130 },
  { field: 'oil', headerName: 'น้ำมัน', type: 'number', width: 100 },
  { field: 'kiloPerLit', headerName: 'กิโลเมตร/ลิตร', type: 'number', width: 100 },
  { field: 'litPerRound', headerName: 'ลิตร/เที่ยว', type: 'number', width: 100 },
  { field: 'litPerAmount', headerName: 'ลิตร/คิว', type: 'number', width: 100 },
  { field: 'amountPerRound', headerName: 'คิว/เที่ยว', type: 'number', width: 100 },
];
const tableCompareCarData = [
  { id: 'A201', factoryId: 'หนองใหญ่', income: 30000, expense: 12300, roundTrip: 35, amount: 180, distance: 200, oil: 230 },
  { id: 'A202', factoryId: 'ปลวกแดง', income: 20000, expense: 8000, roundTrip: 40, amount: 200, distance: 100, oil: 290 },
  { id: 'A203', factoryId: 'บ้านบึง', income: 13000, expense: 1300, roundTrip: 20, amount: 100, distance: 150, oil: 200 },
  { id: 'A204', factoryId: 'หนองใหญ่', income: 15000, expense: 1230, roundTrip: 30, amount: 160, distance: 120, oil: 220 },
  { id: 'A205', factoryId: 'หนองไผ่แก้ว', income: 25000, expense: 2300, roundTrip: 15, amount: 100, distance: 170, oil: 190 },
];
const rows = tableCompareCarData.map(car => {
  return {
    id: car.id,
    factoryId: car.factoryId,
    income: car.income,
    expense: car.expense,
    roundTrip: car.roundTrip,
    amount: car.amount,
    distance: car.distance,
    oil: car.oil,
    kiloPerLit: car.distance / car.roundTrip,
    litPerRound: car.oil / car.roundTrip,
    litPerAmount: car.oil / car.amount,
    amountPerRound: car.amount / car.roundTrip
  }
});

const chartData = [
  {
    name: 'หนองใหญ่',
    currentValue: 420000,
    previousValue: 2400,
  },
  {
    name: 'บ้านบึง',
    currentValue: 300000,
    previousValue: 1398,
  },
  {
    name: 'ปลวกแดง',
    currentValue: 200000,
    previousValue: 9800,
  },
  {
    name: 'หนองไผ่แก้ว',
    currentValue: 278000,
    previousValue: 3908,
  },
  {
    name: 'วังจันทร์',
    currentValue: 278000,
    previousValue: 3908,
  },
];

const dashboards = [
  {
    name: "รายได้ (บาท)",
    mockValue: 500000
  },
  {
    name: "จำนวนเที่ยว",
    mockValue: 3219
  },
  {
    name: "จำนวนคิว",
    mockValue: 5548
  },
  {
    name: "รายจ่าย (บาท)",
    mockValue: 235548
  },
  {
    name: "ค่าซ่อมรถ",
    mockValue: 15548
  },
  {
    name: "ค่าน้ำมัน",
    mockValue: 135548
  },
];

const myCard = () => FactoryConstants.factories.map((factory, index) =>
  <Grid item xs={4} key={index}>
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {factory.name}
        </Typography>
      </CardContent>
      {dashboards.map((summary) =>
        <React.Fragment key={summary.name}>
          <Divider />
          <ListItem
            secondaryAction={
              <IconButton edge="end" disabled style={{ color: "black" }}>
                <Typography>{summary.mockValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
              </IconButton>
            }
          >
            <ListItemText
              primary={summary.name}
            />
          </ListItem>
        </React.Fragment>
      )}
    </Card>
  </Grid>
)

const factorySummary = () => {
  return <>
    <Typography variant="h5" sx={{ fontWeight: 700 }}>
      โรงงาน
    </Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingBottom: "2rem" }}>
      {myCard()}
    </Grid>
  </>
}

const CustomFooter = () => {
  return (
    <GridFooterContainer>
      {/* <TableCell width={70}>{rows.reduce((acc, currentValue) => acc + 1, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>&nbsp;</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.income, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.expense, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.roundTrip, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.amount, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.distance, 0).toLocaleString()}</TableCell>
      <TableCell width={130}>{rows.reduce((acc, currentValue) => acc + currentValue.oil, 0).toLocaleString()}</TableCell>
      <TableCell width={100}>{rows.reduce((acc, currentValue) => acc + currentValue.kiloPerLit, 0).toLocaleString()}</TableCell>
      <TableCell width={100}>{rows.reduce((acc, currentValue) => acc + currentValue.litPerRound, 0).toLocaleString()}</TableCell>
      <TableCell width={100}>{rows.reduce((acc, currentValue) => acc + currentValue.litPerAmount, 0).toLocaleString()}</TableCell>
      <TableCell width={100}>{rows.reduce((acc, currentValue) => acc + currentValue.amountPerRound, 0).toLocaleString()}</TableCell> */}
      <GridFooter sx={{
        borderTop: 'none', // To delete double border.
      }} />
    </GridFooterContainer>
  );
}

export default function Home() {
  return (
    <Container sx={{ paddingTop: "2rem", marginLeft: "1rem" }} maxWidth="xl">
      {/* <Grid container spacing={2}>
        <Grid item align="center" xs={12}>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome
          </Typography>
        </Grid>
      </Grid> */}
      <Grid container spacing={2} sx={{ paddingLeft: "1rem" }}>
        {factorySummary()}
      </Grid>
      <Grid container spacing={2} sx={{ paddingLeft: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          กราฟ
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingBottom: "2rem" }}>
          <Grid item xs={4}>
            <BarChart
              width={550}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <text x={600 / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
                <tspan fontSize="14">รายได้ (บาท)</tspan>
              </text>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="currentValue" fill="#30c464">
                <LabelList dataKey="currentValue" position="top" />
              </Bar>
            </BarChart>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ paddingLeft: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          เปรียบเทียบรถ
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            components={{ Footer: CustomFooter }}
          />
        </div>
      </Grid>
    </Container>
  );
}