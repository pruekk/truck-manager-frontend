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

//Services
import { GetAgency } from '../../../Agency/services/AgencyServices';
import { GetCarReplacement } from "../../../CarReplacement/services/CarReplacementServices";
import { matchDriver } from "../../../../functions/prepareDataForTable";

const steps = ['นำเข้าข้อมูล', 'ลบข้อมูลซ้ำ', 'ดึงข้อมูลจากหน่วยงาน', 'ดึงข้อมูลจากใบราคาค่าขนส่ง', 'ดึงข้อมูลจากรายการเปลี่ยนรถ', 'ตรวจสอบข้อมูลทั้งหมด'];
const newSteps = ['นำเข้าข้อมูล', 'ดึงข้อมูลจากหน่วยงาน', 'ดึงข้อมูลจากใบราคาค่าขนส่ง', 'ดึงข้อมูลจากรายการเปลี่ยนรถ', 'ลบข้อมูลซ้ำ', 'ตรวจสอบข้อมูลทั้งหมด'];

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === 0) {
            getAgency();
        } if (activeStep === 2) {
            getCarReplacement();
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onClickCloseDialog = () => {
        props.handleCloseDialog();
        handleReset();
    }

    const onClickDeleteSelectedRows = () => {
        const filtered = props.dataRows.filter((row) => !selectedRows.includes(row.id))
        props.setDataRows(filtered);
    };

    const getAgency = async () => {
        const response = await GetAgency(localStorage.getItem('userToken'));

        if (response.success) {
            const agency = response.data
            let tempArr = [];
            props.dataRows.map((row) => {
                const agencyObj = mapAgent(row.destination, agency);
                row.code = agencyObj.newId;
                row.distance = agencyObj.distance;
                row.oil = agencyObj.oil;
                tempArr.push(row);

                return row;
            });

            props.setDataRows(tempArr);

            return;
        }

        alert("Something went wrong! Please try again later.");
    }

    const mapAgent = (agent, agentArr) => {
        const filteredArr = agentArr.filter((obj) => { return obj.agent === agent });
        if (filteredArr.length === 1) {
            return filteredArr[0];
        }

        return filteredArr.sort((a, b) => Number(b.dateStart) - Number(a.dateStart))[0];
    }

    const getCarReplacement = async () => {
        const response = await GetCarReplacement(localStorage.getItem('userToken'));

        if (response.success) {
            const carReplacement = response.data
            let tempArr = [];
            props.dataRows.map((row) => {
                const driver = matchDriver(row.car, new Date(), row.time, carReplacement); // Will change temp date after
                if (driver) {
                    row.driver = driver;
                }
                tempArr.push(row);

                return row;
            });

            props.setDataRows(tempArr);

            return;
        }

        alert("Something went wrong! Please try again later.");
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={props.openDialog}
        >
            <DialogTitle sx={{ backgroundColor: "#FBFBFB" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {newSteps.map((label) => {
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
                    onClick={onClickCloseDialog}
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
                        <Table dataRows={props.dataRows} checkboxSelection={activeStep === 4} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onClickDeleteSelectedRows={onClickDeleteSelectedRows} />
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
                        </Button> : <Button disabled={activeStep === 5 && props.dataRows.some((row) => row.duplicated)} onClick={handleNext}>
                            Next
                        </Button>
                    }
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}