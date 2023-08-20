import moment from 'moment';

export function formatDate(date) {
    return moment(date, "DD/MM/YYYY");
}

export function formatDateTime(date, time) {
    return moment(date, "DD/MM/YYYY HH:mm");
}
