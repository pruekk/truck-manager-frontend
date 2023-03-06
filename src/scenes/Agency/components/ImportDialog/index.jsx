import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

//Tables
import Table from './components/Table';

//Icons
import IconButton from "@mui/material/IconButton";

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);

    const onUpdateRow = (updateObj) => {
        const objIndex = props.dataRows.findIndex((obj => obj.id === updateObj.id));
        props.dataRows[objIndex].distance = Number(updateObj.distance);

        props.setDataRows(props.dataRows);
    }

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
            <DialogTitle>
                เพิ่มหน่วยงาน
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
                        <Table
                            dataRows={props.dataRows}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onClickDeleteSelectedRows={onClickDeleteSelectedRows}
                            onUpdateRow={onUpdateRow}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <LoadingButton
                        loading={props.isLoading}
                        onClick={() => {
                            props.handleConfirmImportedData(props.dataRows);
                        }}
                    >
                        Confirm
                    </LoadingButton>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}