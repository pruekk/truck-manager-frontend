import React from "react";

//Components
import AddDialog from "../../../components/AddDialog";

//Constants
import * as NavigationBarConstants from "../../../constants/NavigationBarConstants";
import { driverColumns } from "../constants/Constants";

export default function AddNewDialog({ handleAddNewDriver, openDialog, handleCloseDialog }) {
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
            await handleAddNewDriver(formattedData);
            setDriverObj({}) // clear state after add driver
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
            isLoading={isLoading}
            onClickAdd={onClickAdd}
        />
    );
}
