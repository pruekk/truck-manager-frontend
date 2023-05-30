import React from "react";

//Components
import AddDialog from "../../../components/AddDialog";

//Constants
import * as NavigationBarConstants from "../../../constants/NavigationBarConstants";
import { driverColumns } from "../constants/Constants";
import { GetComponent } from "../../../services/TruckManagerApiServices";

const validateDriver = async (newDriver) => {
    const { data: driverList, status, success } = await GetComponent({ component: "drivers" })
    const errors = [];
    driverList.some(driver => {
        if (driver.firstName === newDriver.firstName && driver.lastName === newDriver.lastName) {
            return errors.push({
                reason: `driver is duplicated.`
            })
        }
    });
    driverColumns.forEach(column => {
        const { field, headerName, required } = column;
        const value = newDriver[field];

        if (required && !value) {
            errors.push({
                reason: `${headerName} is required.`
            });
        }

        if (field === 'idCard' && value && (value.length !== 13 || isNaN(value))) {
            errors.push({
                reason: `${headerName} must be a 13-digit number.`
            });
        }
    });

    return errors
}

export default function AddDriverDialog({ openDialog, handleCloseDialog, handleAddNewDriver }) {
    const [driverObj, setDriverObj] = React.useState({});
    const excludeFields = ['id', 'fullName', 'age', 'ssoStartDate', 'endDate', 'ssoEndDate', 'reason', 'editBy'];

    const [isError, setIsError] = React.useState(false);
    const onChangeInput = (event) => {
        if (typeof event !== 'undefined') {
            const { name, value } = event.target;
            setDriverObj((prevDriverObj) => ({
                ...prevDriverObj,
                [name]: value,
            }));
        }
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickAdd = async () => {
        setIsLoading(true);

        if (Object.keys(driverObj).length === 0 || Object.values(driverObj).some((value) => !value)) {
            setIsError(true);
        } else {
            setIsError(false);
            const formattedData = {
                ...driverObj,
                salary: Number(driverObj["salary"])
            }
            const errors = await validateDriver(formattedData);
            if (errors.length > 0) {
                alert(errors.map((error) => error.reason).join("\n"));
            } else {
                await handleAddNewDriver(formattedData);
                setDriverObj({}) // clear state after add driver
            }
        }

        setIsLoading(false);
    }

    return (
        <AddDialog
            pageName={NavigationBarConstants.menus[2].sub[0].name}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            columns={driverColumns}
            dataObj={driverObj}
            excludeFields={excludeFields}
            onChangeInput={onChangeInput}
            isError={isError}
            isLoading={false}
            onClickAdd={onClickAdd}
        />
    );
}
