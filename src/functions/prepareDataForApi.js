export function addIdToRow(dataRows, row, component) {
    let rowInfo = {};
    if (component === 'car-replacement') {
        rowInfo = dataRows.filter((r) => { return r.carId === row.carId })[0];
    } else {
        rowInfo = dataRows.filter((r) => { return r.id === row.id })[0];
    }

    row["_id"] = rowInfo["_id"];
    return row;
}
