import React, { useState, useEffect } from "react";

//Components
import EditDialog from "../../../components/EditDialog";

//Constants
import * as NavigationBarConstants from "../../../constants/NavigationBarConstants";
import { driverColumns } from "../constants/Constants";

export default function Edit(props) {
    const [driverObj, setDriverObj] = useState({});
    const excludeFields = ['id', 'fullName', 'age', 'editBy'];
    const optionalFields = ['ssoStartDate', 'endDate', 'ssoEndDate', 'reason'];

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setDriverObj(props.dataRows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setDriverObj((prevDriverObj) => ({
            ...prevDriverObj,
            [name]: value,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);

    const onClickUpdate = async () => {
        setIsLoading(true);

        const requiredFields = driverColumns
            .filter(column => !excludeFields.includes(column.field))
            .filter(column => !optionalFields.includes(column.field))
            .map(column => column.field);

        if (requiredFields.every(field => driverObj[field]) && (optionalFields.some(field => !driverObj[field]) || optionalFields.every(field => driverObj[field] === ""))) {
            const formattedData = {
                ...driverObj,
                salary: Number(driverObj.salary),
            };
            await props.handleUpdateDriver(formattedData);
            setIsError(false);
        } else {
            setIsError(true);
        }

        setIsLoading(false);
    };

    return (
        <EditDialog
            openDialog={props.openDialog}
            handleCloseDialog={props.handleCloseDialog}
            pageName={NavigationBarConstants.menus[6].sub[0].name}
            columns={driverColumns}
            dataObj={driverObj}
            excludeFields={excludeFields}
            isError={isError}
            isLoading={isLoading}
            onChangeInput={onChangeInput}
            onClickUpdate={onClickUpdate}
        />
    );
}
