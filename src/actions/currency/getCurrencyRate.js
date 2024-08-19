import { currencyUrl } from "../../constants.js";

const getCurrencyRate = async (currency) => {
    try {
        const response = await fetch(currencyUrl);

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const data = await response.json();

        const currencyData = data.find(item => item.ccy === currency);
        if (currencyData) {
            return `Курс ${currencyData.ccy} до ${currencyData.base_ccy}: Купівля ${currencyData.buy}, Продаж ${currencyData.sale}`;
        } else {
            return `Курс для валюти ${currency} не знайдено.`;
        }
    } catch (error) {
        console.error(`Помилка отримання курсу валюти: ${currency}:`, error);
        return 'Неможливо отримати курс на даний момент';
    }
};


export default getCurrencyRate;
