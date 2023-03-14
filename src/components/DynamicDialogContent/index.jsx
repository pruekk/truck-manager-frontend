import React from "react";

//Material UI
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function DynamicDialogContent(props) {
    const filteredColumns = props.columns.filter(column => !props.excludeFields.includes(column.field));

    return (
        <Grid container spacing={2}>
            {filteredColumns.map((column) => (
                <Grid item key={column.field} xs={12} md={column.minWidth}>
                    <Typography variant="subtitle1" gutterBottom>
                        {column.headerName}
                    </Typography>
                    {column.type === 'singleSelect' ? (
                        <Select
                            id={column.field}
                            name={column.field}
                            value={props.driverObj[column.field] || ''}
                            onChange={props.onChangeInput}
                            sx={{ width: "100%" }}
                        >
                            {column.valueOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <TextField
                            sx={{ width: "100%" }}
                            id={column.field}
                            name={column.field}
                            type={column.type || 'input'}
                            variant="outlined"
                            error={props.isError && !props.driverObj[column.field]}
                            onChange={props.onChangeInput}
                            value={props.driverObj[column.field] || ''}
                        />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}
