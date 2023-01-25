import moment from "moment";

const tempDate = moment().format('DD/MM/YYYY');
let tempDate2  = moment().add(10,'days').format('DD/MM/YYYY');

export const cars = [
    {
        id: "A201",
        licensePlate: "3ขค-1234",
        type: "Hino",
        registrationDate: tempDate,
        buyDate: tempDate2,
        price: 1250000
    },
    {
        id: "A202",
        licensePlate: "3ขค-2344",
        type: "Hino",
        registrationDate: tempDate,
        buyDate: tempDate2,
        price: 2300000
    },
];
