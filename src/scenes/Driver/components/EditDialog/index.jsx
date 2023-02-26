import React, { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//Icons
import IconButton from "@mui/material/IconButton";

//Constants
import * as NavigationBarConstants from "../../../../constants/NavigationBarConstants";
import * as Constants from "../../constants/Constants";

//Others
import moment from "moment";

export default function EditDialog(props) {
    const [driverObj, setDriverObj] = React.useState({});
    const [isError, setIsError] = React.useState(false);

    useEffect(() => {
        setDriverObj(props.dataRows);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInput = (event) => {
        let updatedValue = {};
        updatedValue[`${event.target.name}`] = event.target.value;
        setDriverObj(driverObj => ({
            ...driverObj,
            ...updatedValue
        }));
    }

    const onClickUpdate = () => {
        if (driverObj["idCard"] && driverObj["title"] && driverObj["firstName"] && driverObj["lastName"] && driverObj["startDate"] && driverObj["salary"]) {
            setIsError(false);

            props.handleUpdateDriver({
                id: driverObj["id"],
                idCard: driverObj["idCard"],
                title: driverObj["title"],
                firstName: driverObj["firstName"],
                lastName: driverObj["lastName"],
                startDate: moment(driverObj["startDate"], moment.defaultFormat).format('DD/MM/YYYY'),
                salary: Number(driverObj["salary"]),
                editBy: "example@hotmail.com"
            });
        } else {
            setIsError(true);
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="md"
            open={props.openDialog}
        >
            <DialogTitle>
                เพิ่ม{NavigationBarConstants.menus[0].sub[3].name}
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
                        <Typography variant="subtitle1" gutterBottom>
                            เลขประจำตัวบัตรประชาชน
                        </Typography>
                        <TextField id="idCard" name="idCard" type="input" variant="outlined" value={driverObj["idCard"] || ""} error={isError && !driverObj["idCard"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            คำนำหน้า
                        </Typography>
                        <Select
                            labelId="title-label"
                            id="title"
                            name="title"
                            value={driverObj["title"] || ""}
                            error={isError && !driverObj["title"]}
                            onChange={onChangeInput}
                            sx={{ width: "220px" }}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: "220px",
                                        width: "220px",
                                    },
                                },
                            }}
                        >
                            {Constants.titles.map((title) => {
                                return (
                                    <MenuItem key={title} value={title}>{title}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            ชื่อ
                        </Typography>
                        <TextField id="firstName" name="firstName" type="input" variant="outlined" value={driverObj["firstName"] || ""} error={isError && !driverObj["firstName"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            นามสกุล
                        </Typography>
                        <TextField id="lastName" name="lastName" type="input" variant="outlined" value={driverObj["lastName"] || ""} error={isError && !driverObj["lastName"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            วันที่เริ่มทำงาน
                        </Typography>
                        <TextField id="startDate" name="startDate" type="date" variant="outlined" value={moment(driverObj["startDate"], moment.defaultFormat).format("YYYY-MM-DD") || ""} error={isError && !driverObj["startDate"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            ฐานเงินเดือน
                        </Typography>
                        <TextField id="salary" name="salary" type="number" variant="outlined" value={driverObj["salary"] || ""} error={isError && !driverObj["salary"]} onChange={onChangeInput} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <Button
                        onClick={onClickUpdate}
                    >
                        Update
                        </Button>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}