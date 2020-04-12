class Form {
    constructor(options) {
        this.form = document.querySelector(`.${options.form}`) || 'form';
        this.inputs = document.querySelectorAll(`.${options.input}`) || [];
        this.button = document.querySelector(`.${options.button}`) || 'form__button';
        this.api = options.api || function() {};
        this.validation = options.validation || function() {};
        this.forecast = options.forecast || function() {};

        this.setListener = this.setListener.bind(this);
    }

    render() {
        this.setListener();
        this.validation.run(this.form, this.inputs, this.button);
    }

    setListener() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            const countryInput = document.querySelector('#country');
            const cityInput = document.querySelector('#city');

            const countryValue = this.convertToCountryCode(countryInput.value);
            const cityValue = cityInput.value;
    
            this.sendRequest(countryValue, cityValue);
    
            this.form.reset();
        });
    }

    convertToCountryCode(country) {
        if (country.toLowerCase() === 'россия') {
            return 'ru'
        } else if (country.toLowerCase() === 'russia') {
            return 'ru'
        } else {
            alert('Выбирайте Россию 😎');
            throw new Error('Выбирайте Россию 😎');
        }
    }

    sendRequest(country, city) {
        this.api.getForecast(country, city)
            .then(res => {
                const weatherParams = {
                    city: res.name,
                    temperature: `${Math.round(Number(res.main.temp) - 273.15)}`,
                    weather: res.weather[0].description,
                    weatherForAdvice: res.weather[0].main,
                    wind: res.wind.speed,
                }

                this.forecast.render(weatherParams);
            })
            .catch(err => console.error(err));
    }
}
