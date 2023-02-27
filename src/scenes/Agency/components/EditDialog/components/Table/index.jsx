import React from "react";

//Material UI
import { GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';
import { columns } from "../../../Table";

export default function Table(props) {
    const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState(true);

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
