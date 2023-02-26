import React from "react";

import Box from '@mui/material/Box';
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

//Components
import Table from './components/Table';

export default function EditDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [updatedRows, setUpdatedRows] = React.useState(props.dataRows[0]);

    const onClickDeleteSelectedRows = () => {
        const filtered = props.dataRows.filter((row) => !selectedRows.includes(row.id))
        props.setDataRows(filtered);
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={props.openDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
                แก้ไขรายการเดินรถ DP
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table dataRows={props.dataRows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onClickDeleteSelectedRows={onClickDeleteSelectedRows} setUpdatedRows={setUpdatedRows} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
                <React.Fragment>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={() => { props.onClickUpdate(updatedRows) }}
                    >
                        Update
                    </Button>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}