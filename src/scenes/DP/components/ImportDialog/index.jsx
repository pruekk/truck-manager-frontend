import React from "react";

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

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SendIcon from '@mui/icons-material/Send';

const steps = ['นำเข้าข้อมูล', 'ลบข้อมูลซ้ำ', 'ดึงข้อมูลจากหน่วยงาน', 'ดึงข้อมูลจากใบราคาค่าขนส่ง', 'ดึงข้อมูลจากรายการเปลี่ยนรถ', 'ตรวจสอบข้อมูลทั้งหมด'];

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(1);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(1);
    };

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
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
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
                        <Table dataRows={props.dataRows} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onClickDeleteSelectedRows={onClickDeleteSelectedRows} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FBFBFB" }}>
                <React.Fragment>
                    <Button
                        disabled={activeStep === 1}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ?
                        <Button
                            onClick={() => {
                                props.handleConfirmImportedData(props.dataRows);
                                handleReset()
                            }}
                            endIcon={<SendIcon />}
                        >
                            Confirm
                        </Button> : <Button disabled={props.dataRows.some((row) => row.duplicated)} onClick={handleNext}>
                            Next
                        </Button>
                    }
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
