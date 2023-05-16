import React, { useEffect } from "react";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";

//Services
import { GetCars } from '../../../Car/services/CarServices';
import { GetDrivers } from '../../../Driver/services/DriverServices';

//Function
import { addKeyValuePairToObjectArray } from '../../../../functions/prepareDataForDialog';
import { transformCarsData, transformDriverData } from "../../functions/prepareColumnData";

//Others
import moment from "moment";
import { columns } from "../Table";
import AddDialog from "../../../../components/AddDialog";

export default function AddNewDialog(props) {
    const [carReplacementObj, setCarReplacementObj] = React.useState({});
    const [columnArr, setColumnArr] = React.useState(columns);
    const [drivers, setDrivers] = React.useState([]);
    const [cars, setCars] = React.useState([]);
    const [isError, setIsError] = React.useState(false);
    const excludeFields = ['editBy'];

    useEffect(() => {
        getCars();
        getDrivers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInput = (event) => {
        let updatedValue = {};
        
        updatedValue[`${event.target.name}`] = event.target.value;
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
            const driverArr = transformDriverData(response.data);
            const tempColumnArr = addKeyValuePairToObjectArray(columnArr, 'field', 'driver', driverArr);
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
        <AddDialog
            pageName={NavigationBarConstants.menus[0].sub[3].name}
            openDialog={cars.length > 0 && drivers.length > 0 && props.openDialog}
            handleCloseDialog={props.handleCloseDialog}
            columns={columnArr}
            dataObj={carReplacementObj}
            excludeFields={excludeFields}
            onChangeInput={onChangeInput}
            isError={isError}
            isLoading={isLoading}
            onClickAdd={onClickAdd}
        />
    );
}
