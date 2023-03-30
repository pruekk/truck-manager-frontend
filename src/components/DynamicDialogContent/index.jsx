import React from "react";

//Material UI
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//Date picker
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import * as CalendarConstants from "../../constants/CalendarConstants";

function SingleSelectInput(props) {
    const { column, inputObj, onChangeInput } = props;
  
    return (
      <Select
        id={column.field}
        name={column.field}
        value={inputObj[column.field] || ''}
        onChange={onChangeInput}
        sx={{ width: "100%" }}
        size="small"
      >
        {column.valueOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
}

function DateInput(props) {
    const { column, inputObj, onChangeInput } = props;
  
    const handleChange = (date) => {
      onChangeInput({ target: { name: column.field, value: date } });
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          label={column.label || ''}
          inputFormat={CalendarConstants.dateFormat}
          value={inputObj[column.field] || null}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              size="small"
              sx={{ width: '100%' }}
              variant="outlined"
              error={props.isError && !inputObj[column.field]}
              name={column.field}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    );
}

function DefaultInput(props) {
    const { column, inputObj, onChangeInput } = props;
  
    return (
      <TextField
        sx={{ width: "100%" }}
        id={column.field}
        name={column.field}
        type={column.type || 'input'}
        variant="outlined"
        error={props.isError && !inputObj[column.field]}
        onChange={onChangeInput}
        value={inputObj[column.field] || ''}
        size="small"
      />
    );
}

const getInputComponent = (inputObj, onChangeInput, column) => {
    switch (column.type) {
        case "singleSelect":
          return <SingleSelectInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
        case "date":
          return <DateInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
        default:
          return <DefaultInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
      }
}

export function DynamicDialogContent(props) {
    const filteredColumns = props.columns.filter(column => !props.excludeFields.includes(column.field));
    return (
        <Grid container spacing={2}>
            {filteredColumns.map((column) => (
                <Grid item key={column.field} xs={12} md={column.minWidth}>
                    <Typography variant="subtitle1" gutterBottom>
                        {column.headerName}
                    </Typography>
                    {getInputComponent(props.inputObj, props.onChangeInput, column)}
                </Grid>
            ))}
        </Grid>
    )
}
