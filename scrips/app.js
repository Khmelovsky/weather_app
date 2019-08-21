const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const detials = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    //const cityDetails = data.cityDetials;
    //const weather = data.weather;

    // destructure preporties
    const { cityDetials, weather } = data;

    detials.innerHTML = `
        <h5 class="my-3">${cityDetials.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    if(card.classList.contains('d-none')) 
        card.classList.remove('d-none');
};

const updateCity = async (city) => {

    const cityDetials = await getCity(city);
    const weather = await getWeather(cityDetials.Key);

    return { cityDetials, weather };
};

cityForm.addEventListener('submit', event => {

    event.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  }