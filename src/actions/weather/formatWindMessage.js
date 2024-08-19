import getWindDirection from "./getWindDirection.js";

const formatWindMessage = (groupedData, city) => {
    let answer = `Вітер у ${city}\n\n`;

    for (const date in groupedData) {
        const formattedDate = new Intl.DateTimeFormat('uk-UA', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(new Date(date));

        answer += `${formattedDate}\n`;

        groupedData[date].forEach(entry => {
            const time = entry.time;
            const windDirection = getWindDirection(entry.wind.deg);

            const formattedTime = new Intl.DateTimeFormat('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date(`1970-01-01T${time}`));

            answer += `  ${formattedTime}, швідкість: ${entry.wind.speed} м/с, напрямок ${windDirection}, пориви до ${entry.wind.gust} м/с\n`;
        });

        answer += '\n';
    }

    return answer;
};

export default formatWindMessage;