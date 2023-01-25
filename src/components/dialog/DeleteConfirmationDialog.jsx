import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import IconButton from "@mui/material/IconButton";

//Icons
import CircleIcon from '@mui/icons-material/Circle';

export default function DeleteConfirmationDialog(props) {
    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={props.openDialog}
        //onClose={props.handleCloseDeleteDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#f5f5f5" }}>
                Are you sure?
                <IconButton
                    aria-label="close"
                    onClick={props.onClickCloseDeleteDialog}
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
            <DialogContent dividers sx={{ backgroundColor: "#f5f5f5" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Are you sure you want to delete these?
                        </Typography>
                        <List dense={true}>
                            {props.selectedRow.map((row, index) =>
                                <ListItem key={`${row.factory}_${row.from}-${row.to}`}>
                                    <ListItemIcon>
                                        <CircleIcon sx={{ fontSize: 10, color: "black" }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${row.factory}(${row.from}-${row.to})`}
                                    />
                                </ListItem>
                            )}
                        </List>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            This cannot be undone!
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
                <Button
                    disableElevation
                    variant="contained"
                    sx={{
                        backgroundColor: "#c91e24",
                        "&:hover": {
                            backgroundColor: "#eb8a8d",
                        }
                    }}
                    onClick={() => {props.removePrice(props.selectedRow)}}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
