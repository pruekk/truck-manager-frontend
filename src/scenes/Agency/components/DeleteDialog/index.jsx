import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";

export default function DeleteDialog(props) {
    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={props.openDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
                Are you sure?
                <IconButton
                    aria-label="close"
                    onClick={props.onCloseDeleteDialog}
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Are you sure you want to premanently delete <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{props.selectedRowIds.length}</span> items?
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold", paddingTop: "50px", textDecoration: "underline" }}>
                            This cannot be undone!
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
                <LoadingButton
                    loading={props.isLoading}
                    disableElevation
                    variant="contained"
                    sx={{
                        backgroundColor: "#c91e24",
                        "&:hover": {
                            backgroundColor: "#eb8a8d",
                        }
                    }}
                    onClick={props.deleteAgency}
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}