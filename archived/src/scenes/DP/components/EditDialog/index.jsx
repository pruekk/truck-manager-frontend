import React, { useEffect } from "react";

import Box from '@mui/material/Box';
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
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
    const [updatedRow, setUpdatedRow] = React.useState({});

    useEffect(() => {
        prepareDataRow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const prepareDataRow = () => {
        setUpdatedRow(props.dataRows[0]);
    }

    const onClickDeleteSelectedRows = () => {
        const filtered = props.dataRows.filter((row) => !selectedRows.includes(row.id))
        props.setDataRows(filtered);
    };

    const onUpdateRow = (event) => {
        setUpdatedRow(event);
    }

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
                        <Table dataRows={props.dataRows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onClickDeleteSelectedRows={onClickDeleteSelectedRows} onUpdateRow={onUpdateRow} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
                <React.Fragment>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <LoadingButton
                        loading={props.isLoading}
                        onClick={() => { props.onClickUpdate(updatedRow) }}
                    >
                        Update
                    </LoadingButton>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}