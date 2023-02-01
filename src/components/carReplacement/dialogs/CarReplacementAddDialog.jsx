import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
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
import * as NavigationBarConstants from "../../../constants/NavigationBarConstants";
import * as DriverConstants from "../../../constants/DriverConstants";
import * as CarConstants from "../../../constants/CarConstants";

//Others
import moment from "moment";

export default function CarReplacementAddDialog(props) {
    const [carReplacementObj, setCarReplacementObj] = React.useState({});
    const [isError, setIsError] = React.useState(false);

    const onChangeInput = (event) => {
        carReplacementObj[`${event.target.name}`] = event.target.value;
        setCarReplacementObj(carReplacementObj);
    }

    const onClickAdd = () => {
        if (carReplacementObj["carId"] && carReplacementObj["driver"] && carReplacementObj["date"] && carReplacementObj["time"]) {
            setIsError(false);

            props.handleAddNewCarReplacement({
                carId: carReplacementObj["carId"],
                driver: carReplacementObj["driver"],
                date: moment(carReplacementObj["date"]).format('DD/MM/YYYY'),
                time: carReplacementObj["time"],
            });
        } else {
            setIsError(true);
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
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
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            รหัสรถ
                        </Typography>
                        <Select
                            labelId="carId-label"
                            id="carId"
                            name="carId"
                            error={isError && !carReplacementObj["carId"]}
                            onChange={onChangeInput}
                            sx={{ width: "100px" }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: "100px",
                                        width: "100px",
                                    },
                                },
                            }}
                        >
                            {CarConstants.cars.map((car) => {
                                return (
                                    <MenuItem key={car.id} value={car.id}>{car.id}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            คนขับรถโม่
                        </Typography>
                        <Select
                            labelId="driver-label"
                            id="driver"
                            name="driver"
                            error={isError && !carReplacementObj["driver"]}
                            onChange={onChangeInput}
                            sx={{ width: "300px" }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: "300px",
                                        width: "300px",
                                    },
                                },
                            }}
                        >
                            {DriverConstants.drivers.filter((driver) => driver.firstName !== undefined && driver.lastName !== undefined).map((driver) => {
                                return (
                                    <MenuItem key={`${driver.firstName} ${driver.lastName}`} value={`${driver.firstName} ${driver.lastName}`}>{`${driver.firstName} ${driver.lastName}`}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            วันที่
                        </Typography>
                        <TextField id="date" name="date" type="date" variant="outlined" error={isError && !carReplacementObj["date"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            เวลา
                        </Typography>
                        <TextField id="time" name="time" type="time" variant="outlined" error={isError && !carReplacementObj["time"]} onChange={onChangeInput} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <Button
                        onClick={onClickAdd}
                    >
                        Add
                        </Button>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
