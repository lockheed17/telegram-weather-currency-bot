const formatWeatherMessage = (groupedData, interval, city) => {
    let answer = `Погода у ${city}\n\n`;

    for (const date in groupedData) {
        const formattedDate = new Intl.DateTimeFormat('uk-UA', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(new Date(date));

        answer += `${formattedDate}\n`;

        groupedData[date].forEach(entry => {
            const time = entry.time;
            const [hours, minutes] = time.split(':').map(Number);

            if (interval === 3 || (interval === 6 && hours % 6 === 0)) {
                const formattedTime = new Intl.DateTimeFormat('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date(`1970-01-01T${time}`));

                answer += `  ${formattedTime}, ${entry.temp}°C, відчувається як: ${entry.feels_like}°C, ${entry.description}\n`;
            }
        });

        answer += '\n';
    }

    return answer;
};

export default formatWeatherMessage;