import React from "react";

//Components
import AddDialog from "../../../../components/AddDialog";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import { columns } from "../Table";

export default function AddCarDialog(props) {
    const [carObj, setCarObj] = React.useState({});
    const excludeFields = ['id', 'editBy'];

    const [isError, setIsError] = React.useState(false);
    const onChangeInput = (event) => {
        if (typeof event !== 'undefined') {
            const { name, value } = event.target;
            setCarObj((prevObj) => ({
                ...prevObj,
                [name]: value,
            }));
        }
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickAdd = async () => {
        setIsLoading(true);

        if (Object.values(carObj).some((value) => !value)) {
            setIsError(true);
        } else {
            setIsError(false);
            const formattedData = {
                ...carObj,
                price: Number(carObj["price"])
            }
            await props.handleAddNewCar(formattedData);
        }

        setIsLoading(false);
    }

    return (
        <AddDialog
            pageName={NavigationBarConstants.menus[6].sub[0].name}
            openDialog={props.openDialog}
            handleCloseDialog={props.handleCloseDialog}
            columns={columns}
            dataObj={carObj}
            excludeFields={excludeFields}
            onChangeInput={onChangeInput}
            isError={isError}
            isLoading={isLoading}
            onClickAdd={onClickAdd}
        />
    );
}
