const dpStatus = (status) => {
    switch (status) {
        case "A":
            return "Accepted";
        case "C":
            return "Canceled";
        case "S":
            return "Spoiled";
        default:
            return "Error";
    }
}

const convertToTimeFormat = (num) => {
    var hours = Math.floor(num * 24);
    var minutes = Math.floor((num * 24 - hours) * 60);
    var seconds = Math.round((((num * 24 - hours) * 60) - minutes) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

export default function prepareDataForTable(date, data, confirmedDataRows) {
    const dpList = [];
    const factoryStruct = [{
        code: "F256",
        name: "บ้านบึง2"
    }]
    const factoryName = data[2][0]?.split(' ')[2]; // get factoryName from row 3 [FC256 - บ้านบึง2]
    const factory = factoryStruct.find(fac => fac.name === factoryName)
    const price = 0;

    // Start from row 4 in Excel
    data.slice(3).map((row) => {
        if (row[1]?.includes(factory.code)) {
            dpList.push({
                "id": row[1],
                "date": date,
                "time": convertToTimeFormat(row[20]),
                "destination": row[7],
                "distance": 0,
                "code": row[10],
                "amount": row[16].toFixed(2),
                "price": price.toFixed(2),
                "oil": 0,
                "car": row[13],
                "driver": "",
                "status": dpStatus(row[2].trim()),
                "duplicated": confirmedDataRows?.some(list => list.id === row[1])
            });
        }
        return dpList;
    });

    // return dpList to handleUploadExcel
    return dpList;
}
