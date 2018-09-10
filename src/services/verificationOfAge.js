import moment from 'moment';

export default (rawDate, limit) => {
    if(typeof rawDate !== 'string') {
        throw new Error('the type passed is not a string');
        return rawDate;
    }

    limit = moment().subtract(limit, 'years');
    const diff = limit > moment(rawDate);

    return diff;
}
