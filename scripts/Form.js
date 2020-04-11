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
            const cityInput = document.querySelector('#country');
            const country = this.convertCountryName(countryInput.value);
            const city = cityInput.value;
    
            this.sendRequest(country, city);
    
            this.form.reset();
        });
    }

    convertCountryName(country) {
        if (country.toLowerCase() === 'россия') {
            return 'ru';
        }

        if (country.toLowerCase() === 'russia') {
            return 'ru';
        }
    }

    sendRequest(city) {
        this.api.getForecast(city)
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
