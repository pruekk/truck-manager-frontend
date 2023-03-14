import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

//Components
import { DynamicDialogContent } from "../../../../components/DynamicDialogContent";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import { columns } from "../Table";

//Others
import moment from "moment";

export default function AddCarDialog(props) {
    const [carObj, setCarObj] = React.useState({});
    const excludeFields = ['id', 'editBy'];

    const [isError, setIsError] = React.useState(false);
    const onChangeInput = (event) => {
        if ( typeof event !== 'undefined' ) {
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

        if (carObj["id"] && carObj["licensePlate"] && carObj["type"] && carObj["registrationDate"] && carObj["buyDate"] && carObj["price"]) {
            setIsError(false);

            await props.handleAddNewCar({
                id: carObj["id"],
                licensePlate: carObj["licensePlate"],
                type: carObj["type"],
                registrationDate: moment(carObj["registrationDate"]).format('DD/MM/YYYY'),
                buyDate: moment(carObj["buyDate"]).format('DD/MM/YYYY'),
                price: Number(carObj["price"]),
            });
        } else {
            setIsError(true);
        }

        setIsLoading(false);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={props.openDialog}
            onClose={props.handleCloseDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
                เพิ่ม{NavigationBarConstants.menus[6].sub[0].name}
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
            <DialogContent dividers sx={{ backgroundColor: "#FBFBFB" }}>
                <DynamicDialogContent
                columns={columns}
                inputObj={carObj}
                excludeFields={excludeFields}
                onChangeInput={onChangeInput}
                isError={isError} 
                />
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
                <LoadingButton
                loading={isLoading}
                onClick={onClickAdd}
                >
                Add
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
