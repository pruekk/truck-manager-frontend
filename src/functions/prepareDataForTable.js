import moment from 'moment';

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
    if (typeof num === 'string') {
        return "00:00"
    }
    let hours = Math.floor(num * 24);
    let minutes = Math.round((num * 24 - hours) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

export function matchDriver(car, date, time, replacementHistory) {
    const filterByCar = replacementHistory.filter((replacement) => { 
        const dpDateTime = moment(`${date} ${time}`, "DD/MM/YYYY HH:mm")
        const replacementDateTime = moment(`${replacement.date} ${replacement.time}`, "DD/MM/YYYY HH:mm")
        return replacement.carId === car && dpDateTime.isSameOrAfter(replacementDateTime)
    });

    if (filterByCar.length === 1) {
        const latestDriver = filterByCar[0];
        return latestDriver.driver;
    } else if (filterByCar.length > 1) {
        const latestReplacementCar = filterByCar.reduce((latest, item) => {
            const itemMoment = moment(`${item.date} ${item.time}`, "DD/MM/YYYY HH:mm");
            return itemMoment.isAfter(latest) ? itemMoment : latest;
        }, moment(0));
        
        const latestDriver = filterByCar.find(item => moment(`${item.date} ${item.time}`, "DD/MM/YYYY HH:mm").isSameOrAfter(latestReplacementCar));
        
        return latestDriver.driver;
    }
    
    return "";
}

export default function prepareDataForTable(formatType, date, data, confirmedDataRows, carReplacement) {
    const dpList = [];
    const factoryStruct = [
        {
            code: "F272",
            name: "หนองใหญ่"
        },
        {
            code: "F256",
            name: "บ้านบึง2"
        },
        {
            code: "F071",
            name: "ปลวกแดง"
        },
        {
            code: "F300",
            name: "หนองไผ่แก้ว"
        },
        {
            code: "F332",
            name: "วังจันทร์"
        },
    ]
    const factoryName = data[2][0]?.split(' ')[2]; // get factoryName from row 3 [FC256 - บ้านบึง2]
    const factory = factoryStruct.find(fac => fac.name === factoryName);
    const customDate = date.trim().replace(/-/g, '/')

    // Start from row 4 in Excel
    if (formatType === "DP") {
        data.slice(3).map(async (row) => {
            if (row[1]?.includes(factory.code)) {
                dpList.push({
                    "id": row[1],
                    "date": customDate,
                    "time": convertToTimeFormat(row[20]),
                    "destination": row[7],
                    "distance": 0,
                    "code": row[10],
                    "amount": row[16],
                    "price": 0,
                    "oil": 0,
                    "car": row[13],
                    "driver": matchDriver(row[13], date, convertToTimeFormat(row[20]), carReplacement),
                    "status": dpStatus(row[2].trim()),
                    "duplicated": confirmedDataRows?.some(list => list.id === row[1])
                });
            }
            return dpList;
        });
    } else {
        // Agency
        data.slice(3).map((row) => {
            if (row[1]?.includes(factory.code)) {
                dpList.push({
                    "id": row[6],
                    "dateStart": customDate,
                    "dateEnd": customDate,
                    "agent": row[7],
                    "oldId": row[10],
                    "newId": row[10],
                    "distance": 0,
                    "oil": 0,
                    "duplicated": confirmedDataRows?.some(list => list.id === row[6])
                });
            }
            return dpList;
        });
    }
    
    // filter unique DP and Agency using "id" as key
    const uniqueDataRows = dpList.filter((item, index, self) =>
        index === self.findIndex((i) => i.id === item.id)
    );

    return uniqueDataRows;
}
