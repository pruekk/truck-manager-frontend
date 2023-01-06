import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";

//Icons
import DPScheduleTable from "../dp/DPScheduleTable";

export default function ImportDPDialog(props) {
    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={props.openDialog}
        >
            <DialogTitle>
                Import DP
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
                    <Grid item xs={12}>
                        <DPScheduleTable dataRows={props.dataRows} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    variant="contained"
                    sx={{
                        backgroundColor: "#8ac054",
                        "&:hover": {
                            backgroundColor: "#9ed36a",
                        }
                    }}
                    onClick={() => { props.handleConfirmImportedData(props.dataRows) }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
