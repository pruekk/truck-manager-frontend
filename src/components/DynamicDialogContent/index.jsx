import React from "react";

//Material UI
import Autocomplete from '@mui/material/Autocomplete';
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

function AutoCompleteSelectInput(props) {
  const { column, onChangeInput } = props;

  const groupBy = (option) => {
    switch (column.field) {
      case "driver":
        return false;
      case "carId":
        return option.firstLetter;
      default:
        return false;
    }
  }

  const getOptionLabel = (option) => {
    switch (column.field) {
      case "driver":
        return `${option.firstName} ${option.lastName}`;
      case "carId":
        return option.carId === undefined ? option : option.carId;
      default:
        return false;
    }
  }

  const isOptionEqualToValue = (option, value) => {
    switch (column.field) {
      case "driver":
        return `${option.firstName} ${option.lastName}` === `${value.firstName} ${value.lastName}`;
      case "carId":
        return option.carId === undefined ? option.carId === value : option.carId === value.carId;
      default:
        return false;
    }
  }

  return (
    <Autocomplete
      id={column.field}
      name={column.field}
      size="small"
      options={column.valueOptions}
      groupBy={(option) => groupBy(option)}
      getOptionLabel={(option) => getOptionLabel(option)}
      isOptionEqualToValue={(option, value) => isOptionEqualToValue(option, value)}
      onChange={onChangeInput}
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  )
}

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

function TimeInput(props) {
  const { column, inputObj, onChangeInput } = props;

  return (
    <TextField
      fullWidth
      id="time"
      size="small"
      name="time"
      type="time"
      variant="outlined"
      error={props.isError && !inputObj[column.field]}
      onChange={onChangeInput}
      inputProps={{
        step: 60, // Allow only hours and minutes input
      }}
    />
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
        case "selection":
          return <AutoCompleteSelectInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
        case "date":
          return <DateInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
        case "time":
          return <TimeInput inputObj={inputObj} onChangeInput={onChangeInput} column={column} />;
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
