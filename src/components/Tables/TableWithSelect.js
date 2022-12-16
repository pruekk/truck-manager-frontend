import React from "react";
import PropTypes from "prop-types";

//Material UI
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//Functions
import { createData } from "../../functions/TableFunctions";
import CompareTable from "./CompareTable";

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isItemSelected = isSelected(row.name);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.name}
        selected={isItemSelected}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell sx={{ width: '30px' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid
              container
              sx={{ margin: "1rem auto", maxWidth: "auto", overflowX: "auto" }}
            >
              <Grid align="center" xs={12}>
                <CompareTable isEditable={false} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("หนองใหญ่", "1/10/2022", "15/10/2022"), 
  createData("บ้านบึง", "1/10/2022", "15/10/2022"),
  createData("ปลวกแดง", "1/10/2022", "15/10/2022"),
  createData("หนองไผ่แก้ว", "1/10/2022", "15/10/2022"),
  createData("วังจันทร์", "1/10/2022", "15/10/2022"),
  createData("หนองใหญ่", "16/10/2022", "31/10/2022"),
  createData("บ้านบึง", "16/10/2022", "20/10/2022"),
  createData("บ้านบึง", "21/10/2022", "25/10/2022"),
  createData("บ้านบึง", "26/10/2022", "31/10/2022"),
];

function TableWithSelect() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell sx={{ fontWeight: "bold" }}>โรงงาน</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>จากวันที่</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>ถึงวันที่</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row.name} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableWithSelect;
