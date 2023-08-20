import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
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

//Others
import moment from 'moment';
import { GetOilDelivery } from "../../../OilDelivery/services/OilDeliveryServices";
import { GetData } from "../../../../services/TruckManagerApiServices";
import * as Constants from "../../constants/Constants";

const steps = ['นำเข้าข้อมูล', 'แก้ไขรหัส', 'ดึงข้อมูล/แก้ไขน้ำมัน', 'เช็คซ้ำ', 'เพิ่มระยะทาง'];

const validateNewAgency = async (newAgencyList, existingAgencyList) => {
    const duplicates = [];
    const notDuplicates = [];

    newAgencyList?.forEach(newAgency => {
        const matchingAgencies = existingAgencyList.filter(existingAgency => existingAgency.id === newAgency.id);
        let isDuplicate = false;
        // This code below make sure that we aren't loop to much when we have mutiple matchingAgencies
        if (matchingAgencies.length > 1) {
            const latestAgencyList = [
                matchingAgencies.reduce((latest, current) => {
                    return moment(current.dateStart, "DD/MM/YYYY").isSameOrBefore(moment(latest.dateStart, "DD/MM/YYYY")) ? latest : current;
                })
            ];
            isDuplicate = latestAgencyList.some(agency => {
                const newAgencyStartDate = moment(newAgency.dateStart, "DD/MM/YYYY");
                const agencyEndDate = moment(agency.dateEnd, "DD/MM/YYYY");
                return newAgency.id === agency.id && newAgencyStartDate.isSameOrBefore(agencyEndDate);
            });
        } else {
            isDuplicate = matchingAgencies.some(agency => {
                const newAgencyStartDate = moment(newAgency.dateStart, "DD/MM/YYYY");
                const agencyStartDate = moment(agency.dateStart, "DD/MM/YYYY");
                const agencyEndDate = moment(agency.dateEnd, "DD/MM/YYYY");
                return newAgency.id === agency.id && (newAgencyStartDate.isSameOrAfter(agencyStartDate) || newAgencyStartDate.isSameOrBefore(agencyEndDate));
            });
        }

        if (isDuplicate) {
            // duplicate but first seen
            if (!duplicates.some(agency => agency.id === newAgency.id)) {
                duplicates.push(matchingAgencies[0]);
            }
        } else {
            const index = notDuplicates.findIndex(obj => obj.id === newAgency.id);
            if (index === -1) {
                // If not seen before, add object to array
                const newDateEnd = moment(newAgency.dateEnd, "DD/MM/YYYY").add(7, 'days')
                notDuplicates.push({
                    ...newAgency,
                    dateEnd: newDateEnd.format("DD/MM/YYYY")
                });
            } else {
                // If seen before, update startDate and endDate accordingly
                const existingObject = notDuplicates[index];
                const existingStartDate = moment(existingObject.dateStart, "DD/MM/YYYY");
                const existingEndDate = moment(existingObject.dateEnd, "DD/MM/YYYY");
                const newStartDate = moment(newAgency.dateStart, "DD/MM/YYYY");
                const newEndDate = moment(newAgency.dateEnd, "DD/MM/YYYY");

                if (newStartDate <= existingStartDate) {
                    existingObject.dateStart = newAgency.dateStart;
                }
                if (newEndDate > existingEndDate) {
                    existingObject.dateEnd = newAgency.dateEnd;
                }

                notDuplicates[index] = existingObject;
            }
        }
    });

    return {
        duplicates: duplicates,
        notDuplicates: notDuplicates
    };
}

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [duplicateAgency, setDuplicateAgency] = React.useState([])

    const { data: existingAgencyList } = GetData({ component: Constants.component.name })
    const [isLoading, setIsLoading] = React.useState(false);

    const onUpdateRow = (updateObj) => {
        console.log("Update column in Datagrid row")
        console.log(props.newAgency)

        const objIndex = props.newAgency.findIndex((obj => obj.id === updateObj.id));
        props.newAgency[objIndex].newId = updateObj.newId;
        props.newAgency[objIndex].distance = Number(updateObj.distance);

        props.setDataRows(props.newAgency);
    }

    const onClickDeleteSelectedRows = () => {
        const filtered = props.newAgency.filter((row) => !selectedRows.includes(row.id))
        props.setDataRows(filtered);
    };

    const handleChangeDataRows = (dataRows) => {
        props.setDataRows(dataRows);
    }

    const [activeStep, setActiveStep] = React.useState(1);
    const handleNext = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsLoading(true);
        switch (activeStep) {
            case 1:
                await getOilDelivery();
                break;
            case 2:
                const { duplicates, notDuplicates } = await validateNewAgency(props.newAgency, existingAgencyList);
                props.setDataRows(notDuplicates);
                setDuplicateAgency(duplicates)
                break;
            default:
                break;
        }
        setIsLoading(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getOilDelivery = async () => {
        const response = await GetOilDelivery(localStorage.getItem('userToken'));

        if (response.success) {
            props.newAgency.map((row) => {
                const filterDate = response.data.filter((oil) => { return moment(row.dateStart, 'YYYY-MM-DD').isSameOrAfter(moment(oil.from, 'YYYY-MM-DD')) && moment(row.dateEnd, 'YYYY-MM-DD').isSameOrBefore(moment(oil.to, 'YYYY-MM-DD')) })
                if (filterDate.length === 0) {
                    return row;
                }

                const filterArr = filterDate[0].arr.filter((oilArr) => { return oilArr.name === String(row.newId) });
                if (filterArr.length === 0) {
                    return row
                }

                row.oil = Number(filterArr[0].value)
                return row;
            });

            props.setDataRows(props.newAgency);
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            open={props.openDialog}
        >
            <DialogTitle>
                เพิ่มหน่วยงาน
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
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
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        หน่วยงานใหม่
                        <Table
                            dataRows={props.newAgency}
                            activeStep={activeStep}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onClickDeleteSelectedRows={onClickDeleteSelectedRows}
                            onUpdateRow={onUpdateRow}
                            handleChangeDataRows={handleChangeDataRows}
                        />
                        <br />
                        หน่วยงานซ้ำ
                        <Table
                            dataRows={duplicateAgency}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ?
                        <LoadingButton
                            loading={props.isLoading}
                            onClick={() => {
                                props.handleConfirmImportedData(props.newAgency);
                            }}
                        >
                            Confirm
                        </LoadingButton> 
                        : <LoadingButton
                            loading={isLoading}
                            onClick={() => handleNext()}
                        >
                            Next
                        </LoadingButton>
                    }
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}
