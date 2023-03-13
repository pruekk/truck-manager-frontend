import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//Icons
import IconButton from "@mui/material/IconButton";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import { columns } from "../Table";

//Others
import moment from "moment";

function RenderInput(props) {
    const excludeFields = ['id', 'fullName', 'age', 'endDate', 'ssoEndDate', 'reason', 'editBy'];
    const filteredColumns = columns.filter(column => !excludeFields.includes(column.field));
    return filteredColumns.map((column) => (
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
    ))
}

export default function AddNewDialog(props) {
    const [driverObj, setCarReplacementObj] = React.useState({});
    const [isError, setIsError] = React.useState(false);
    const onChangeInput = (event) => {
        if ( typeof event !== 'undefined' ) {
            const { name, value } = event.target;
            setCarReplacementObj((prevDriverObj) => ({
                ...prevDriverObj,
                [name]: value,
            }));
        }
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickAdd = async () => {
        setIsLoading(true);
    
        if (Object.values(driverObj).some((value) => !value)) {
            setIsError(true);
        } else {
            setIsError(false);
            const formattedData = {
                    ...driverObj,
                    startDate: moment(driverObj["startDate"], moment.defaultFormat).format('DD/MM/YYYY'),
                    salary: Number(driverObj["salary"])
            }
            await props.handleAddNewDriver(formattedData);
        }
    
        setIsLoading(false);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={props.openDialog}
        >
            <DialogTitle>
                เพิ่ม{NavigationBarConstants.menus[0].sub[3].name}
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
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <RenderInput
                        driverObj={driverObj}
                        onChangeInput={onChangeInput}
                        isError={isError} 
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <LoadingButton
                        loading={isLoading}
                        onClick={onClickAdd}
                    >
                        Add
                    </LoadingButton>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
