import React from "react";

//Components
import AddDialog from "../../../../components/AddDialog";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import { columns } from "../Table";

export default function AddNewDialog(props) {
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

        if (Object.values(driverObj).some((value) => !value)) {
            setIsError(true);
        } else {
            setIsError(false);
            const formattedData = {
                ...driverObj,
                salary: Number(driverObj["salary"])
            }
            await props.handleAddNewDriver(formattedData);
        }

        setIsLoading(false);
    }

    return (
        <AddDialog
            pageName={NavigationBarConstants.menus[0].sub[3].name}
            openDialog={props.openDialog}
            handleCloseDialog={props.handleCloseDialog}
            columns={columns}
            dataObj={driverObj}
            excludeFields={excludeFields}
            onChangeInput={onChangeInput}
            isError={isError}
            isLoading={isLoading}
            onClickAdd={onClickAdd}
        />
    );
}
