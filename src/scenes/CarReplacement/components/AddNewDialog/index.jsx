import React, { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

//Icons
import IconButton from "@mui/material/IconButton";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";

//Services
import { GetCars } from '../../../Car/services/CarServices';
import { GetDrivers } from '../../../Driver/services/DriverServices';

//Others
import moment from "moment";

export default function AddNewDialog(props) {
    const [carReplacementObj, setCarReplacementObj] = React.useState({});
    const [drivers, setDrivers] = React.useState([]);
    const [cars, setCars] = React.useState([]);
    const [isError, setIsError] = React.useState(false);

    useEffect(() => {
        getCars();
        getDrivers();
    }, []);

    const onChangeInput = (event, value) => {
        const key = `${event.currentTarget.id.split("-")[0]}`
        let updatedValue = {};
        switch (key) {
            case "carId":
                updatedValue[key] = value ? value.carId : "";
                break;
            case "driver":
                updatedValue[key] = value ? `${value.firstName} ${value.lastName}` : "";
                break;
            default:
                updatedValue[`${event.target.name}`] = event.target.value;
                break;
        }
        setCarReplacementObj((prevCarReplacementObj) => ({
            ...prevCarReplacementObj,
            ...updatedValue
        }));
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickAdd = async () => {
        setIsLoading(true);

        if (carReplacementObj["carId"] && carReplacementObj["driver"] && carReplacementObj["date"] && carReplacementObj["time"]) {
            await props.handleAddNewCarReplacement({
                carId: carReplacementObj["carId"],
                driver: carReplacementObj["driver"],
                date: moment(carReplacementObj["date"]).format('DD/MM/YYYY'),
                time: carReplacementObj["time"],
            });
            setCarReplacementObj({})
            setIsError(false);
        } else {
            setIsError(true);
        }

        setIsLoading(false);
    }

    const getDrivers = async () => {
        const response = await GetDrivers(localStorage.getItem('userToken'));

        if (response.success) {
            setDrivers(response.data);
        }
    }

    const getCars = async () => {
        const response = await GetCars(localStorage.getItem('userToken'));

        if (response.success) {
            const sortedList = response.data.sort((current, next) => (current.carId > next.carId) ? 1 : -1);
            setCars(sortedList);
        }
    }

    const carsCategories = cars.map((car) => {
        const firstLetter = car.carId[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...car,
        };
    });

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
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
                        <Autocomplete
                            id="carId"
                            options={carsCategories.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.carId}
                            isOptionEqualToValue={(option, value) => option.carId === value.carId}
                            onChange={onChangeInput}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            คนขับรถโม่
                        </Typography>
                        <Autocomplete
                            id="driver"
                            options={drivers}
                            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                            isOptionEqualToValue={(option, value) => `${option.firstName} ${option.lastName}` === `${value.firstName} ${value.lastName}`}
                            onChange={onChangeInput}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
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
                        <TextField
                            id="time"
                            name="time"
                            type="time"
                            variant="outlined"
                            error={isError && !carReplacementObj["time"]}
                            onChange={onChangeInput}
                            inputProps={{
                                step: 60, // Allow only hours and minutes input
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <LoadingButton
                        loading={isLoading}
                        onClick={onClickAdd}
                    >
                        Save
                    </LoadingButton>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
