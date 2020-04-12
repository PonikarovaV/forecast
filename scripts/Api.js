class Api {
    constructor() {
        this.key = '131a3537465d75dd6ee7babe781bdbb2';
    }

    getForecast(country, city) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.key}&lang=ru`, {
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
}
