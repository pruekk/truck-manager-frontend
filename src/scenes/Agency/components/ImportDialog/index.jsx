import React, { useEffect } from "react";

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

const steps = ['นำเข้าข้อมูล', 'แก้ไขรหัส', 'ดึงข้อมูล/แก้ไขน้ำมัน', 'เช็คซ้ำ', 'เพิ่มระยะทาง'];

export default function ImportDialog(props) {
    const [selectedRows, setSelectedRows] = React.useState([]);

    useEffect(() => {
        formattedDataRows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onUpdateRow = (updateObj) => {
        const objIndex = props.dataRows.findIndex((obj => obj.id === updateObj.id));
        props.dataRows[objIndex].distance = Number(updateObj.distance);

        props.setDataRows(props.dataRows);
    }

    const onClickDeleteSelectedRows = () => {
        const filtered = props.dataRows.filter((row) => !selectedRows.includes(row.id))
        props.setDataRows(filtered);
    };

    const handleChangeDataRows = (dataRows) => {
        props.setDataRows(dataRows);
    }

    const [activeStep, setActiveStep] = React.useState(1);

    const handleNext = () => {
        if (activeStep === 1) {
            getOilDelivery();
        }
        if (activeStep === 2) {
            removeDuplicate();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formattedDataRows = () => {
        const uniqueDataRows = props.dataRows.filter((item, index, self) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        const momentsMax = uniqueDataRows.map(x => moment(x.dateEnd, "DD/MM/YYYY")),
            maxDate = moment.max(momentsMax)
        const momentsMin = uniqueDataRows.map(x => moment(x.dateStart, "DD/MM/YYYY")),
            minDate = moment.min(momentsMin)
        let duplicateArr = [];

        uniqueDataRows.map(function (row) {
            const minDateFormat = minDate.format("DD/MM/YYYY");
            const maxDateFormat = maxDate.format("DD/MM/YYYY");

            const filterDuplicate = props.confirmedDataRows.filter((cRow) => {
                return cRow.id === row.id
                    && moment(minDateFormat, 'YYYY-MM-DD').isSameOrAfter(moment(cRow.dateStart, 'YYYY-MM-DD'))
                    && moment(minDateFormat, 'YYYY-MM-DD').isSameOrBefore(moment(cRow.dateEnd, 'YYYY-MM-DD'))
            });

            if (filterDuplicate.length > 0) {
                const cRowMax = filterDuplicate.map(x => moment(x.dateEnd, "DD/MM/YYYY")),
                    cRowMaxDate = moment.max(cRowMax)

                const cRowMaxDateFormat = cRowMaxDate.format("DD/MM/YYYY");

                if (moment(maxDateFormat, 'YYYY-MM-DD').isAfter(moment(cRowMaxDateFormat, 'YYYY-MM-DD'))) {
                    row.dateStart = cRowMaxDateFormat;
                    row.dateEnd = maxDateFormat;
                    console.log(row);
                }
                if (moment(maxDateFormat, 'YYYY-MM-DD').isSameOrBefore(moment(cRowMaxDateFormat, 'YYYY-MM-DD'))) {
                    duplicateArr.push(row.id);
                }
            }

            return row;
        });

        const finalDataRows = uniqueDataRows.filter((row) => { return !duplicateArr.includes(row.id) });
        props.setDataRows(finalDataRows);
    }

    const removeDuplicate = () => {
        const uniqueDataRows = props.dataRows.filter((item, index, self) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        props.setDataRows(uniqueDataRows);
    }

    const getOilDelivery = async () => {
        const response = await GetOilDelivery(localStorage.getItem('userToken'));

        if (response.success) {
            props.dataRows.map(function (row) {
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

            props.setDataRows(props.dataRows);
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
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table
                            dataRows={props.dataRows}
                            activeStep={activeStep}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onClickDeleteSelectedRows={onClickDeleteSelectedRows}
                            onUpdateRow={onUpdateRow}
                            handleChangeDataRows={handleChangeDataRows}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
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
                            onClick={() => {
                                props.handleConfirmImportedData(props.dataRows);
                            }}
                        >
                            Confirm
                        </LoadingButton> : <Button onClick={handleNext}>
                            Next
                        </Button>
                    }
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}