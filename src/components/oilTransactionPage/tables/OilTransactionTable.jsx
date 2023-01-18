import React from "react";

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
import OilTransactionTableModal from "./OilTransactionTableModal";

//Dialogs
import DeleteOilTransactionDialog from "../dialogs/DeleteOilTransactionDialog";

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  const isSelected = (name) => props.selectedRow.indexOf(name) !== -1;

  const handleClick = (event, name, selectedRow) => {
    const selectedIndex = props.selectedRow.indexOf(selectedRow);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selectedRow, selectedRow);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selectedRow.slice(1));
    } else if (selectedIndex === props.selectedRow.length - 1) {
      newSelected = newSelected.concat(props.selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selectedRow.slice(0, selectedIndex),
        props.selectedRow.slice(selectedIndex + 1)
      );
    }

    props.setSelectedRowProps(newSelected);
  };

  const isItemSelected = isSelected(row);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow
        hover
        //onClick={(event) => handleClick(event, row.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={`${row.factory}_${row.from}-${row.to}`}
        selected={isItemSelected}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onClick={(event) => handleClick(event, row.factory, row)}
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell sx={{ width: "30px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.factory}
        </TableCell>
        <TableCell align="right">{row.from}</TableCell>
        <TableCell align="right">{row.to}</TableCell>
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
              sx={{ margin: "1rem auto", maxWidth: "90rem", overflowX: "auto" }}
            >
              <Grid item align="center" xs={12}>
                <OilTransactionTableModal isEditable={false} priceListArr={row.arr} />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function OilTransactionTable(props) {
  return (
    <div>
      <DeleteOilTransactionDialog openDialog={props.openDeleteDialog} onClickCloseDeleteDialog={props.handleCloseDeleteDialog} removePrice={props.removePrice} selectedRow={props.selectedRow} />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>โรงงาน</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                จากวันที่
            </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                ถึงวันที่
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows?.map((row, index) => (
              <Row key={`${row.factory}${row.from}-${row.to}`} row={row} index={index} setSelectedRowProps={props.setSelectedRow} selectedRow={props.selectedRow} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}