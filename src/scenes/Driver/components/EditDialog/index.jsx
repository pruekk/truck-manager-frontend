import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

//Components
import { RenderInput } from "../AddNewDialog";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import { columns } from "../Table";

export default function EditDialog(props) {
    const [driverObj, setDriverObj] = useState(props.dataRows);
    const excludeFields = ['id', 'fullName', 'age', 'editBy'];
    const optionalFields = ['endDate', 'ssoEndDate', 'reason'];

    const [isError, setIsError] = useState(false);

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
        
        const requiredFields = columns
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
        <Dialog 
            fullWidth={true} 
            maxWidth="sm" 
            open={props.openDialog}
        >
            <DialogTitle>
                แก้ไข{NavigationBarConstants.menus[0].sub[3].name}
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
                    <RenderInput
                        driverObj={driverObj}
                        excludeFields={excludeFields}
                        onChangeInput={onChangeInput}
                        isError={isError}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <LoadingButton 
                    loading={isLoading} 
                    onClick={onClickUpdate}
                >
                        อัพเดท
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
