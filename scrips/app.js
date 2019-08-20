const cityForm = document.querySelector('form');

const updateCity = async (city) => {

    const cityDetials = await getCity(city);
    const weather = await getWeather(cityDetials.Key);

    return {
        cityDetials: city,
        weather: weather,
    };
}

cityForm.addEventListener('submit', event => {

    event.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => console.log(data))
        .catch(err => console.log(err));
});