const getWeatherData = async (city, key) => {
    const encodedCity = encodeURIComponent(city);
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&units=metric&lang=ua&appid=${key}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const data = await response.json();

        return data.list.map(forecast => ({
            datetime: forecast.dt_txt,
            temp: Math.round(forecast.main.temp),
            feels_like: Math.round(forecast.main.feels_like),
            description: forecast.weather[0].description,
            wind: forecast.wind,
        }));
    } catch (error) {
        console.log(`Помилка при отриманні даних: ${error.message}`);
        return null;
    }
};


export default getWeatherData;