class Forecast {
    constructor() {
        this.key = 'cp1ldMJA62UcvwfzyEc8Q1Z70aRVTGWg';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    // update city
    async updateCity (city) {
        const cityDetials = await this.getCity(city);
        const weather = await this.getWeather(cityDetials.Key);
        return { cityDetials, weather };
    }
    // get city information
     async getCity (city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    // get weather information
     async getWeather (id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
};