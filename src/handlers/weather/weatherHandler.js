import groupByDay from "../../actions/weather/groupByDay.js";
import formatWeatherMessage from "../../actions/weather/formatWeatherMessage.js";
import formatWindMessage from "../../actions/weather/formatWindMessage.js";

export const handleInterval = async (msg, interval, bot, weatherData, city) => {
    const chatId = msg.chat.id;

    const groupedData = groupByDay(weatherData);
    const message = formatWeatherMessage(groupedData, interval, city);
    bot.sendMessage(chatId, message);
};

export const handleWind = async (msg, bot, weatherData, city) => {
    const chatId = msg.chat.id;

    const groupedData = groupByDay(weatherData);
    const message = formatWindMessage(groupedData, city);
    bot.sendMessage(chatId, message);
};
