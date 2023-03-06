import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from '@mui/lab/LoadingButton';
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

export default function AddNewDialog(props) {
    const [driverObj, setCarReplacementObj] = React.useState({});
    const [isError, setIsError] = React.useState(false);
    const onChangeInput = (event) => {
        driverObj[`${event.target.name}`] = event.target.value;
        setCarReplacementObj(driverObj);
    }

    const [isLoading, setIsLoading] = React.useState(false);
    const onClickAdd = async () => {
        setIsLoading(true);

        if (driverObj["idCard"] && driverObj["title"] && driverObj["firstName"] && driverObj["lastName"] && driverObj["startDate"] && driverObj["salary"]) {
            setIsError(false);

            await props.handleAddNewDriver({
                idCard: driverObj["idCard"],
                title: driverObj["title"],
                firstName: driverObj["firstName"],
                lastName: driverObj["lastName"],
                startDate: moment(driverObj["startDate"], moment.defaultFormat).format('DD/MM/YYYY'),
                salary: Number(driverObj["salary"])
            });
        } else {
            setIsError(true);
        }

        setIsLoading(false);
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
                        <TextField id="idCard" name="idCard" type="input" variant="outlined" error={isError && !driverObj["idCard"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            คำนำหน้า
                        </Typography>
                        <Select
                            labelId="title-label"
                            id="title"
                            name="title"
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
                        <TextField id="firstName" name="firstName" type="input" variant="outlined" error={isError && !driverObj["firstName"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            นามสกุล
                        </Typography>
                        <TextField id="lastName" name="lastName" type="input" variant="outlined" error={isError && !driverObj["lastName"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            วันที่เริ่มทำงาน
                        </Typography>
                        <TextField id="startDate" name="startDate" type="date" variant="outlined" error={isError && !driverObj["startDate"]} onChange={onChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            ฐานเงินเดือน
                        </Typography>
                        <TextField id="salary" name="salary" type="number" variant="outlined" error={isError && !driverObj["salary"]} onChange={onChangeInput} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <LoadingButton
                        loading={isLoading}
                        onClick={onClickAdd}
                    >
                        Add
                    </LoadingButton>
                </React.Fragment>
            </DialogActions>
        </Dialog>
    );
}