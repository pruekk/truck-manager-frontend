import React from "react";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';
import { columns } from "../../../Table";

export default function Table(props) {
    const processRowUpdate = (newRow) => {
        props.onUpdateRow(newRow);
        return newRow;
    }

    return (
        <DataGridTable dataRows={props.dataRows} columns={columns} processRowUpdate={processRowUpdate} checkboxSelection={true} />
    );
}
