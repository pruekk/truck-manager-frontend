export function transformCarsData(cars) {
    const carsCategories = cars.map((car) => {
        const firstLetter = car.carId[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...car,
        };
    });

    return carsCategories.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
}

export function transformDriverData(driverArr) {
    let tempArr = [];
    driverArr.map((driver) => {
        tempArr.push(`${driver.firstName} ${driver.lastName}`)
    });

    return tempArr;
}
