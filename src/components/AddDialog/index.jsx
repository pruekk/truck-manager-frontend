import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

//Components
import { DynamicDialogContent } from "../DynamicDialogContent";

export default function AddDialog(props) {
    const { openDialog, handleCloseDialog, columns, dataObj, excludeFields, onChangeInput, isError, isLoading, onClickAdd, pageName } = props

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
                เพิ่ม{pageName}
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
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
                    inputObj={dataObj}
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
                    เพิ่ม
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
