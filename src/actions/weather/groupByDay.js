const groupByDay = (data) => {
    return data.reduce((acc, entry) => {
        const date = entry.datetime.split(' ')[0]; // дата
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({
            time: entry.datetime.split(' ')[1], // час
            temp: entry.temp,
            feels_like: entry.feels_like,
            description: entry.description,
            wind: entry.wind,
        });
        return acc;
    }, {});
}

export default groupByDay;