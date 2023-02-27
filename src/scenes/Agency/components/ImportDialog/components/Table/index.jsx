import React from "react";

//Tables
import DataGridTable from '../../../../../../components/DataGridTable';
import { columns } from "../../../Table";

export default function Table(props) {
    const processRowUpdate = (newRow) => {
        props.onUpdateRow(newRow);
        return newRow;
    }
    
    const uniqueDataRows = props.dataRows.filter((item, index, self) =>
        index === self.findIndex((i) => i.id === item.id)
    );

    return (
        <DataGridTable dataRows={uniqueDataRows} columns={columns} processRowUpdate={processRowUpdate} checkboxSelection={true} />
    );
}
