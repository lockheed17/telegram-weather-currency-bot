import getCurrencyRate from "../../actions/currency/getCurrencyRate.js";
import { supportedCurrencies } from "../../constants.js";

export const createCurrencyHandlers = async (bot) => {
    const handlers = supportedCurrencies.reduce((acc, currency) => {
        acc[currency] = async (msg) => {
            const chatId = msg.chat.id;
            const rateMessage = await getCurrencyRate(currency);
            bot.sendMessage(chatId, rateMessage);
        };
        return acc;
    }, {});

    return handlers;
};
