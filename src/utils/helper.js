const getDateFormatted = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    return formattedDate;
}

const getFullDateFormatted = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: undefined,
        hour12: true
    });
    return formattedDate;
}

const getUTCTimeNow = () => {
    const date = Date.now();
    return new Date(date).toISOString();
}

export { getDateFormatted, getUTCTimeNow, getFullDateFormatted };