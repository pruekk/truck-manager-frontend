import React, { useEffect } from "react";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";

//Services
import { GetCars } from '../../../Car/services/CarServices';
import { GetDrivers } from '../../../Driver/services/DriverServices';

//Function
import { addKeyValuePairToObjectArray } from '../../../../functions/prepareDataForDialog';

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

    const onChangeInput = (event, value) => {
        const key = event.target.name === 'date' ? 'date' : `${event.currentTarget.id.split("-")[0]}`
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
            const tempColumnArr = addKeyValuePairToObjectArray(columnArr, 'field', 'driver', { valueOptions: response.data });
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

    const transformCarsData = (cars) => {
        const carsCategories = cars.map((car) => {
            const firstLetter = car.carId[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...car,
            };
        });

        return carsCategories.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
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
