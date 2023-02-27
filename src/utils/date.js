export const getTimestampInNanoSeconds = () => {
    let date = Math.floor(Date.now() / 1000);
    date = date + 600;
    date = String(date) + '000000000';

    return date;
};
