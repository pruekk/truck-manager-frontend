import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
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

//Services
import { GetAgency } from '../../../Agency/services/AgencyServices';
import { GetCarReplacement } from "../../../CarReplacement/services/CarReplacementServices";
import { matchDriver } from "../../../../functions/prepareDataForTable";
import { GetTransports } from "../../../TransportPrice/services/TransportServices";

//Others
import moment from 'moment';

const steps = ['นำเข้าข้อมูล', 'ลบข้อมูลซ้ำ', 'ดึงข้อมูลจากหน่วยงาน', 'ดึงข้อมูลจากใบราคาค่าขนส่ง', 'ดึงข้อมูลจากรายการเปลี่ยนรถ', 'ตรวจสอบข้อมูลทั้งหมด'];
const newSteps = ['นำเข้าข้อมูล', 'ดึงข้อมูลจากหน่วยงาน', 'ดึงข้อมูลจากใบราคาค่าขนส่ง', 'ดึงข้อมูลจากรายการเปลี่ยนรถ', 'ลบข้อมูลซ้ำ', 'ตรวจสอบข้อมูลทั้งหมด'];

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === 0) {
            getAgency();
        }
        if (activeStep === 1) {
            getTransportPrice();
        }
        if (activeStep === 2) {
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
                const agencyObj = mapAgent(row, agency);
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

    const mapAgent = (obj, agentArr) => {
        const filteredArr = agentArr.filter((agent) => { return agent.agent === obj.destination });
        // const filterDateRange = agentArr.filter((agent) => { return moment(obj.date, "YYYY-MM-DD").isSameOrAfter(moment(agent.dateStart, "YYYY-MM-DD")) && moment(obj.date, "YYYY-MM-DD").isSameOrBefore(moment(agent.dateEnd, "YYYY-MM-DD")) });
        if (filteredArr.length === 1) {
            return filteredArr[0];
        }

        return filteredArr[0];
    }

    const getCarReplacement = async () => {
        const response = await GetCarReplacement(localStorage.getItem('userToken'));
        const currentDPList = props.dataRows;

        if (response.success) {
            const carReplacementHistory = response.data
            let dpWithDriverName = [];
            currentDPList.map((dp) => {
                const driver = matchDriver(dp.car, dp.date, dp.time, carReplacementHistory);
                if (driver) {
                    dp.driver = driver;
                }
                dpWithDriverName.push(dp);

                return dp;
            });

            props.setDataRows(dpWithDriverName);
            return;
        }

        alert("Something went wrong! Please try again later.");
    }

    const getTransportPrice = async () => {
        const response = await GetTransports(localStorage.getItem('userToken'));
        if (response.success) {
            const transportPrice = response.data
            let tempArr = [];
            props.dataRows.map((row) => {
                const price = mapTransportPrice(row, transportPrice);
                row.price = price;

                tempArr.push(row);
                return row;
            });

            props.setDataRows(tempArr);

            return;
        }
    }

    const mapTransportPrice = (dp, transportPriceArr) => {
        const filterDateRange = transportPriceArr.filter((transport) => { 
            return moment(dp.date, "YYYY-MM-DD").isBetween(moment(transport.from, "YYYY-MM-DD"), moment(transport.to, "YYYY-MM-DD")) 
        })
        if (filterDateRange.length > 0) {
            const filterCode = filterDateRange[0].arr.filter((arr) => { 
                return arr.name === String(dp.code) 
            })
            const mapAmountWithIndex = (parseFloat(dp.amount) / 0.25) - 1

            return filterCode[0].value[mapAmountWithIndex]
        }
        return 0
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
                        <Table dataRows={props.dataRows} checkboxSelection={activeStep === 0 || activeStep === 4} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onClickDeleteSelectedRows={onClickDeleteSelectedRows} />
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
                        <LoadingButton
                            loading={props.isLoading}
                            onClick={async () => {
                                await props.handleConfirmImportedData(props.dataRows);
                                handleReset();
                            }}
                        >
                            Confirm
                        </LoadingButton> : <Button disabled={props.dataRows.some((row) => row.duplicated)} onClick={handleNext}>
                            Next
                        </Button>
                    }
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
