import React, { useEffect } from "react";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";

//Services
import { GetCars } from '../../../Car/services/CarServices';
import { GetDrivers } from '../../../Driver/services/DriverServices';

//Others
import moment from "moment";
import { columns } from "../Table";
import EditDialog from "../../../../components/EditDialog";
import { addKeyValuePairToObjectArray } from "../../../../functions/prepareDataForDialog";
import { transformCarsData, transformDriverData } from "../../functions/prepareColumnData";

export default function Edit(props) {
    const excludeFields = ['editBy'];

    const [carReplacementObj, setCarReplacementObj] = React.useState({});
    const [columnArr, setColumnArr] = React.useState(columns);
    const [isError, setIsError] = React.useState(false);

    useEffect(() => {
        setCarReplacementObj(props.dataRows);
        getCars();
        getDrivers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInput = (event) => {
        let updatedValue = {};
        updatedValue[`${event.target.name}`] = event.target.value;
        setCarReplacementObj(carReplacementObj => ({
            ...carReplacementObj,
            ...updatedValue
        }));
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickUpdate = async () => {
        setIsLoading(true);

        if (carReplacementObj["carId"] && carReplacementObj["driver"] && carReplacementObj["date"] && carReplacementObj["time"]) {
            setIsError(false);

            await props.onClickUpdate({
                carId: carReplacementObj["carId"],
                driver: carReplacementObj["driver"],
                date: moment(carReplacementObj["date"], moment.defaultFormat).format('DD/MM/YYYY'),
                time: carReplacementObj["time"],
            });
        } else {
            setIsError(true);
        }

        setIsLoading(false);
    }

    const [drivers, setDrivers] = React.useState([]);
    const [cars, setCars] = React.useState([]);

    const getDrivers = async () => {
        const response = await GetDrivers(localStorage.getItem('userToken'));

        if (response.success) {
            const driverArr = transformDriverData(response.data);
            const tempColumnArr = addKeyValuePairToObjectArray(columnArr, 'field', 'driver', { valueOptions: driverArr });
            setColumnArr(tempColumnArr)
            setDrivers(response.data);
        }
    }

    const getCars = async () => {
        const response = await GetCars(localStorage.getItem('userToken'));

        if (response.success) {
            const sortedList = response.data.sort((current, next) => (current.carId > next.carId) ? 1 : -1);
            const tempColumnArr = addKeyValuePairToObjectArray(columnArr, 'field', 'carId', { valueOptions: transformCarsData(sortedList) });
            setColumnArr(tempColumnArr)
            setCars(sortedList);
        }
    }

    return (
        <EditDialog
            openDialog={cars.length > 0 && drivers.length > 0 && props.openDialog}
            handleCloseDialog={props.handleCloseDialog}
            pageName={NavigationBarConstants.menus[0].sub[3].name}
            columns={columnArr}
            dataObj={carReplacementObj}
            excludeFields={excludeFields}
            isError={isError}
            isLoading={isLoading}
            onChangeInput={onChangeInput}
            onClickUpdate={onClickUpdate}
        />

        // <Dialog
        //     fullWidth={true}
        //     maxWidth="md"
        //     open={props.openDialog}
        // >
        //     <DialogTitle>
        //         แก้ไข{NavigationBarConstants.menus[0].sub[3].name}
        //         <IconButton
        //             aria-label="close"
        //             onClick={props.handleCloseDialog}
        //             sx={{
        //                 position: "absolute",
        //                 right: 8,
        //                 top: 8,
        //                 color: (theme) => theme.palette.grey[500],
        //             }}
        //         >
        //             <CloseIcon />
        //         </IconButton>
        //     </DialogTitle>
        //     <DialogContent dividers>
        //         <Grid container spacing={2}>
        //             <Grid item xs={12}>
        //                 <Typography variant="subtitle1" gutterBottom>
        //                     รหัสรถ
        //                 </Typography>
        //                 <Select
        //                     labelId="carId-label"
        //                     id="carId"
        //                     name="carId"
        //                     value={carReplacementObj["carId"] || ""}
        //                     error={isError && !carReplacementObj["carId"]}
        //                     onChange={onChangeInput}
        //                     sx={{ width: "300px" }}
        //                     MenuProps={{
        //                         PaperProps: {
        //                             style: {
        //                                 maxHeight: "300px",
        //                                 width: "300px",
        //                             },
        //                         },
        //                     }}
        //                 >
        //                     {cars.map((car) => {
        //                         return (
        //                             <MenuItem key={car.carId} value={car.carId}>{car.carId}</MenuItem>
        //                         )
        //                     })}
        //                 </Select>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Typography variant="subtitle1" gutterBottom>
        //                     คนขับรถโม่
        //                 </Typography>
        //                 <Select
        //                     labelId="driver-label"
        //                     id="driver"
        //                     name="driver"
        //                     value={carReplacementObj["driver"] || ""}
        //                     error={isError && !carReplacementObj["driver"]}
        //                     onChange={onChangeInput}
        //                     sx={{ width: "300px" }}
        //                     MenuProps={{
        //                         PaperProps: {
        //                             style: {
        //                                 maxHeight: "300px",
        //                                 width: "300px",
        //                             },
        //                         },
        //                     }}
        //                 >
        //                     {drivers.filter((driver) => driver.firstName && driver.lastName).map((driver) => {
        //                         return (
        //                             <MenuItem key={`${driver.firstName} ${driver.lastName ? driver.lastName : ''}`} value={`${driver.firstName} ${driver.lastName ? driver.lastName : ''}`}>{`${driver.firstName} ${driver.lastName ? driver.lastName : ''}`}</MenuItem>
        //                         )
        //                     })}
        //                 </Select>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Typography variant="subtitle1" gutterBottom>
        //                     วันที่
        //                 </Typography>
        //                 <TextField
        //                     id="date"
        //                     name="date"
        //                     type="date"
        //                     variant="outlined"
        //                     value={carReplacementObj["date"] ? moment(carReplacementObj["date"], moment.defaultFormat).format("YYYY-MM-DD") : ""}
        //                     error={isError && !carReplacementObj["date"]}
        //                     onChange={onChangeInput}
        //                 />
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <Typography variant="subtitle1" gutterBottom>
        //                     เวลา
        //                 </Typography>
        //                 <TextField
        //                     id="time"
        //                     name="time"
        //                     type="time"
        //                     variant="outlined"
        //                     value={carReplacementObj["time"] ? carReplacementObj["time"] : ""}
        //                     error={isError && !carReplacementObj["time"]}
        //                     onChange={onChangeInput}
        //                     inputProps={{
        //                         step: 60, // Allow only hours and minutes input
        //                     }}
        //                 />
        //             </Grid>
        //         </Grid>
        //     </DialogContent>
        //     <DialogActions>
        //         <React.Fragment>
        //             <LoadingButton
        //                 loading={isLoading}
        //                 onClick={onClickUpdate}
        //             >
        //                 Update
        //             </LoadingButton>
        //         </React.Fragment>
        //     </DialogActions>
        // </Dialog>
    );
}
