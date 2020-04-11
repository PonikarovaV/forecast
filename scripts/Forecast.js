class Forecast {
    constructor(options) {
        this.popup = document.querySelector(`.${options.popup}`) || 'popup';
        this.forecastButton = this.popup.querySelector(`.${options.forecastButton}`) || 'forecast__button';
        this.city = this.popup.querySelector(`.${options.city}`) || 'forecast__title';
        this.temperature = this.popup.querySelector(`.${options.temperature}`) || 'forecast__temperature';
        this.wind = this.popup.querySelector(`.${options.wind}`) || 'forecast__wind';
        this.weather = this.popup.querySelector(`.${options.weather}`) || 'forecast__weather';
        this.advice = this.popup.querySelector(`.${options.advice}`) || 'forecast__advice';

        this.setButtonListener = this.setButtonListener.bind(this);
    }

    render(params) {
        this.setForecast(params);
        this.setButtonListener();
    }
    
    setForecast(params) {
        this.city.textContent = params.city;
        this.temperature.innerHTML = `${params.temperature}&deg;`;
        this.wind.textContent = `Ветер ${params.wind} м/с`;
    
        this.setWeather(params.weather);
    
        this.setAdvice(params.weatherForAdvice);
    
        this.popup.classList.remove('popup_closed');
    }

    setWeather(string) {
        if (!string) {
            throw new Error('Переданы некорректные данные');
        } else {
            let upperString = string[0].toUpperCase() + string.slice(1);
    
            this.weather.textContent = upperString;
        }
    }

    setAdvice(state) {
        switch(state) {
            case 'Clouds':
                this.advice.textContent = 'Похоже стоит принять немного солца в витаминах, облачно 🧐';
                break;
            case 'Rain':
                this.advice.textContent = 'Возьмите гидрокостюм, пригодится 🤭';
                break;
            case 'Snow':
                this.advice.textContent = 'Лыжи! На себя не надеть, зато покататься можно 🥳';
                break;
            case 'Sun':
                this.advice.textContent = 'Солнце! Идеальная одежда - купальник! 😊';
                break;
            case 'Clear':
                this.advice.textContent = 'Как стеклышко! Наденьте солнечные очки! 😎';
                break;
            case 'Fog':
                this.advice.textContent = 'Возьмите фонарик 🧐';
                break;
            default:
                this.advice.textContent = 'Лучше взять с собой палатку и пуховик... Мало ли куда занесет... 😬';
                break;
        }
    }

    closePopup() {
        this.popup.classList.add('popup_closed');
    }

    setButtonListener() {
        this.forecastButton.addEventListener('click', () => {
            this.closePopup();
        });
    }
}
