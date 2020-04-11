

function sendRequest(city, key) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=ru`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            })
            .catch(err => alert(err));
}

function getRequest() {
    const form = document.querySelector('.form');
    const input = document.querySelector('.form__input');

    setFormListener(form, input);

    setInputListener(input);
}

function setFormListener(form, input) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        getForecast(input.value);

        form.reset();
    });
}

function setInputListener(input) {
    input.addEventListener('input', (event) => {
        const input = event.target;
        const button = document.querySelector('.form__button');

        inputValidation(input, button);
    });
}

function setPopupButtonListener() {
    const popup = document.querySelector('.popup');
    const forecastButton = document.querySelector('.forecast__button');

    forecastButton.addEventListener('click', () => {
        popup.classList.add('popup_closed');
    });
}

function inputValidation(input, button) {
    const id = input.id;
    const error = document.querySelector(`#error-${id}`);
    const regexp = /^[a-zA-Zа-яёА-ЯЁ\\-]{2,30}$/gi;

    let validationResult = regexp.test(input.value);

    if (validationResult === true) {
        button.classList.add('form__button_active');
        button.removeAttribute('disabled', true);
        error.textContent = '';
    } else {
        button.classList.remove('form__button_active');
        button.setAttribute('disabled', true);
        error.textContent = 'Введите верное название города (от 2 до 30 символов)';
    }
}

function getForecast(city) {
    const apiKey = '131a3537465d75dd6ee7babe781bdbb2';

    sendRequest(city, apiKey)
        .then(res => {
            const weatherParams = {
                city: res.name,
                temperature: `${Math.round(Number(res.main.temp) - 273.15)}`,
                weather: res.weather[0].description,
                weatherForAdvice: res.weather[0].main,
                wind: res.wind.speed,
            }

            setForecast(weatherParams);
        })
        .catch(err => console.error(err));
};

function setAdvice(state) {
    const advice = document.querySelector('.forecast__advice');

    switch(state) {
        case 'Clouds':
            advice.textContent = 'Похоже стоит принять немного солца в витаминах, облачно 🧐';
            break;
        case 'Rain':
            advice.textContent = 'Возьмите гидрокостюм, пригодится 🤭';
            break;
        case 'Snow':
            advice.textContent = 'Лыжи! На себя не надеть, зато покататься можно 🥳';
            break;
        case 'Sun':
            advice.textContent = 'Солнце! Идеальная одежда - купальник! 😊';
            break;
        case 'Clear':
            advice.textContent = 'Как стеклышко! Наденьте солнечные очки! 😎';
            break;
        case 'Fog':
            advice.textContent = 'Возьмите фонарик 🧐';
            break;
        default:
            advice.textContent = 'Лучше взять с собой палатку и пуховик... Мало ли куда занесет... 😬';
            break;
    }
}

function setWeather(string) {
    const weather = document.querySelector('.forecast__weather');

    if (!string) {
        return string;
    } else {
        let upperString = string[0].toUpperCase() + string.slice(1);

        weather.textContent = upperString;
    }
}

function setForecast(options) {
    const popup = document.querySelector('.popup');
    const city = document.querySelector('.forecast__title');
    const temperature = document.querySelector('.forecast__temperature');
    const wind = document.querySelector('.forecast__wind');

    city.textContent = options.city;
    temperature.innerHTML = `${options.temperature}&deg;`;
    wind.textContent = `Ветер ${options.wind} м/с`;

    setWeather(options.weather);

    setAdvice(options.weatherForAdvice);

    popup.classList.remove('popup_closed');
}


getRequest();
setPopupButtonListener();

