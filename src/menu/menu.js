export const createCurrencyMenu = () => {
    return {
        reply_markup: {
            keyboard: [
                [{ text: 'USD' }, { text: 'EUR' }],
                [{ text: 'Попереднє меню' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
};

export const createMainMenu = (city) => ({
    reply_markup: {
        keyboard: [
            [{ text: '/Погода' }],
            [{ text: '/Курс валют' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
});

export const createWeatherMenu = () => ({
    reply_markup: {
        keyboard: [
            [{ text: 'Кожні 3 години' }, { text: 'Кожні 6 годин' }],
            [{ text: 'Вітер' }],
            [{ text: 'Попереднє меню' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
});

export default createWeatherMenu;