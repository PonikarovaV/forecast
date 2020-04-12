const api = new Api(key);
const validation = new Validation();

const forecastOptions = {
    popup: 'popup',
    forecastButton: 'forecast__button',
    city: 'forecast__title',
    temperature: 'forecast__temperature',
    wind: 'forecast__wind',
    weather: 'forecast__weather',
    advice: 'forecast__advice',
};

const forecast = new Forecast(forecastOptions);

const formOptions = {
    form: 'form',
    input: 'form__input',
    button: 'form__button',
    api,
    validation,
    forecast,
};

const form = new Form(formOptions);
form.render();
