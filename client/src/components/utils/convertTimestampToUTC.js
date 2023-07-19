import moment from "moment";

export const convertTimestampToUTC = ({ timestamp, format}) => {
    const date = new Date(parseInt(timestamp));
    const UTCDate = moment.utc(date).format(format);
    return UTCDate;
}