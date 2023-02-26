import React, { useEffect } from "react";

//Material UI
import { GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';

//Constants
import * as TableConstants from '../../../../../../constants/TableConstants';

//Services
import { GetCarReplacement } from '../../../../../CarReplacement/services/CarReplacementServices';

//Functions
import { matchDriver } from "../../../../functions/Functions";

export default function Table(props) {
    const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState(true);
    const [carReplacement, setCarReplacement] = React.useState([]);

    useEffect(() => {
        getCarReplacement();
    }, []);

    const getCarReplacement = async () => {
        const response = await GetCarReplacement(localStorage.getItem('userToken'));
        setCarReplacement(response.data);
    }

    const [driver, setDriver] = React.useState("");
    const handleMatchDriver = (event) => {
        const driver = matchDriver(event.car, event.date, event.time, carReplacement);
        setDriver(driver);
        event.driver = driver;
        props.setUpdatedRows(event);

        return;
    }

    const columns = [
        { field: 'id', headerName: 'เลขดีพี', minWidth: TableConstants.columnsSize.medium },
        { field: 'date', headerName: 'วันที่', type: 'date', editable: true, minWidth: TableConstants.columnsSize.medium },
        { field: 'time', headerName: 'เวลา', type: 'time', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'destination', headerName: 'หน่วยงาน', editable: true, minWidth: TableConstants.columnsSize.large },
        { field: 'distance', headerName: 'ระยะทาง', type: 'number', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'code', headerName: 'รหัส', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'amount', headerName: 'คิว', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'price', headerName: 'ราคา', type: 'number', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'oil', headerName: 'น้ำมัน', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'car', headerName: 'เบอร์รถ', editable: true, minWidth: TableConstants.columnsSize.small },
        { field: 'driver', headerName: 'คนขับรถ', minWidth: TableConstants.columnsSize.large, valueGetter: () => driver },
        { field: 'status', headerName: 'สถานะ', type: 'singleSelect', valueOptions: ['Accepted', 'Canceled', 'Spoiled'], minWidth: TableConstants.columnsSize.small },
    ];

    const customStyle = {
        height: '30rem',
        width: '100%',
        '& .row-theme--normal': {
            bgcolor: 'rgb(245, 245, 245)',
        },
        '& .row-theme--duplicated': {
            bgcolor: 'rgb(214,50,50)',
            color: 'white',
            '&:hover': {
                bgcolor: 'rgb(204,0,0)!important',
            },
        },
        '& .MuiDataGrid-row.Mui-selected': {
            bgcolor: 'rgb(0,0,0)!important'
        },
        '& .MuiCheckbox-root.Mui-checked': {
            color: 'rgb(214,50,50)'
        }
    }

    const CustomFooter = () => {
        return (
            <GridFooterContainer>
                <IconButton
                    onClick={() => (
                        props.onClickDeleteSelectedRows()
                    )}
                    disabled={deleteButtonDisabled}
                    sx={{ ml: '0.3rem' }}
                >
                    <DeleteIcon />
                </IconButton>
                <GridFooter sx={{
                    borderTop: 'none', // To delete double border.
                }} />
            </GridFooterContainer>
        )
    }

    const onSelectionModelChange = (ids) => {
        props.setSelectedRows(ids);
        setDeleteButtonDisabled(!deleteButtonDisabled)
    }

    const getRowClassName = (params) => {
        return `row-theme--${params.row.duplicated ? "duplicated" : "normal"}`
    }

    const processRowUpdate = (event) => {
        props.setUpdatedRows(event);
        handleMatchDriver(event);
    }

    return (
        <DataGridTable
            dataRows={props.dataRows}
            columns={columns}
            checkboxSelection={false}
            customStyle={customStyle}
            getRowClassName={getRowClassName}
            processRowUpdate={processRowUpdate}
            onSelectionModelChange={onSelectionModelChange}
            customComponent={{ Footer: CustomFooter }}
        />
    );
}