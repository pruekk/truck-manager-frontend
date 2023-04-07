import moment from 'moment';

export function formatDate(date) {
    return moment(date, "DD/MM/YYYY");
}
