import moment from 'moment';

export function matchDriver(car, date, time, history) {
    const filterByCar = history.filter((data) => { return data.carId === car });

    if (filterByCar.length > 0) {
        const filterByDate = history.filter((data) => { return moment(data.date).isSameOrBefore(date); });
        const sortByDateTime = filterByDate.sort((a, b) => moment(`${a.date}T${a.time}`) - moment(`${b.date}T${b.time}`));

        return filterByDate.length > 0 ? sortByDateTime[0].driver : "";
    }

    return "";
}