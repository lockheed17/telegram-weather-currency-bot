import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import { createMainMenu, createWeatherMenu, createCurrencyMenu } from './menu/menu.js';

import { handleWind, handleInterval } from './handlers/weather/weatherHandler.js';
import { createCurrencyHandlers } from './handlers/currency/currencyHandler.js';
import getWeatherData from './actions/weather/getWeatherData.js';

import { KEYBOARD_COMMAND_CURRENCY, KEYBOARD_COMMAND_WEATHER } from './constants.js';

// fix DeprecationWarning
process.env["NTBA_FIX_350"] = 1;

dotenv.config()
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const key = process.env.API_KEY;

let userStates = {}; // storing user state by chatId

// handler template
const baseHandler = {
    "Попереднє меню": (msg, bot) => {
        const chatId = msg.chat.id;

        userStates[chatId].step = 'initial';
        bot.sendMessage(chatId, 'Повертаю до попереднього меню', createMainMenu());
    }
};

// currency
const currencyHandlers = { ...baseHandler, ...(await createCurrencyHandlers(bot)) };

const handleCurrencySelection = async (msg, bot) => {
    const chatId = msg.chat.id;
    const handler = currencyHandlers[msg.text];

    if (handler) {
        await handler(msg, bot);
    } else {
        bot.sendMessage(chatId, 'Будь ласка, оберіть опцію з меню.');
    }
};

// weather
const weatherHandlers = {
    ...baseHandler,
    'Кожні 3 години': async (msg, bot, weatherData, city) => {
        await handleInterval(msg, 3, bot, weatherData, city);
    },
    'Кожні 6 годин': async (msg, bot, weatherData, city) => {
        await handleInterval(msg, 6, bot, weatherData, city);
    },
    'Вітер': async (msg, bot, weatherData, city) => {
        await handleWind(msg, bot, weatherData, city);
    }
};

const handleWeatherSelection = async (msg, bot, weatherData, city) => {
    const chatId = msg.chat.id;
    const handler = weatherHandlers[msg.text];

    if (handler) {
        await handler(msg, bot, weatherData, city);
    } else {
        bot.sendMessage(chatId, 'Будь ласка, оберіть опцію з меню.');
    }
};

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!userStates[chatId]) {
        userStates[chatId] = { step: 'initial' };
    }

    switch (userStates[chatId].step) {
        case 'initial':
            switch (text) {
                case '/start':
                    bot.sendMessage(chatId, 'Вітаю, оберіть опцію:', createMainMenu());
                    break;

                case KEYBOARD_COMMAND_WEATHER:
                    bot.sendMessage(chatId, 'Ви вибрали погоду. Введіть назву міста:');
                    userStates[chatId].step = 'city_input';
                    break;

                case KEYBOARD_COMMAND_CURRENCY:
                    bot.sendMessage(chatId, 'Ви вибрали курс валют. Оберіть бажану валюту:', createCurrencyMenu());
                    userStates[chatId].step = 'currency_selection';
                    break;

                default:
                    bot.sendMessage(chatId, 'Будь ласка, оберіть опцію з меню.');
                    break;
            }
            break;

        case 'city_input':
            // checking the existence of a city
            const city = text;
            const weatherData = await getWeatherData(city, key);
            if (weatherData) {
                userStates[chatId].city = city;
                userStates[chatId].weatherData = weatherData;
                userStates[chatId].step = 'weather_selection';

                bot.sendMessage(chatId, 'Місто знайдено. Оберіть бажану з опцій із запропонованих.', createWeatherMenu());
            } else {
                userStates[chatId].step = 'initial';
                bot.sendMessage(chatId, 'Місто не знайдено. Повертаю до головного меню.', createMainMenu());
            }

        case 'weather_selection':
            await handleWeatherSelection(msg, bot, userStates[chatId].weatherData, userStates[chatId].city);
            break;

        case 'currency_selection':
            await handleCurrencySelection(msg, bot);
            break;

        default:
            bot.sendMessage(chatId, 'Невідома команда. Повертаю до початкового меню.', createMainMenu());
            userStates[chatId].step = 'initial';
            break;
    }
});