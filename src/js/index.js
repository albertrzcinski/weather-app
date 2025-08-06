// eslint-disable-next-line import/extensions
import TOKEN from './config.js'; // Import the API key from a config file configured in netlify.toml

const form = document.querySelector('.form');
const card = document.querySelector('.card');

const fetchWeather = async (city) => {
  const key = TOKEN; // API key from https://www.weatherapi.com/
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error('Cannot fetch data');
  }

  const data = await response.json();

  return data;
};

const showData = (current, locationName) => {
  let imgSrc = '';

  if (!current.is_day) {
    if (current.cloud > 20) {
      imgSrc = 'src/assets/clouds_night.jpg'; // image by Alex Conchillos from Pexels
    } else {
      imgSrc = 'src/assets/night.jpg'; // image by Rok Romih from Pexels
    }
  } else if (current.condition.text.includes('rain')) {
    if (current.temp_c > 0) {
      imgSrc = 'src/assets/rain.jpg'; // image by Krzysztof Pluta from Pixabay
    } else {
      imgSrc = 'src/assets/snow.jpg'; // image by kristamonique from Pixabay
    }
  } else if (current.cloud > 20) {
    imgSrc = 'src/assets/clouds.jpg'; // image by Josh Sorenson from Pixels
  } else {
    imgSrc = 'src/assets/sun.jpg'; // image by jplenio from Pixabay
  }

  card.innerHTML = `
    <img src="${imgSrc}" alt="Illustration of weather conditions" class="card__img">
    <div class="card__info">
        <div class="card__icon-wrapper">
            <img class="card__icon" src="https:${current.condition.icon}" alt="Weather conditions icon">
        </div>
        <h2 class="card__heading"> ${locationName.toUpperCase()} </h2>
        <p class="card__weather"> ${current.condition.text.toUpperCase()} </p>
        <p class="card__temp"> ${current.temp_c} <sup>o</sup>C </p>
    </div>
    `;

  card.classList.remove('card--hidden');
};

const showError = () => {
  card.innerHTML = `
        <h2 class="card__heading card__heading--red"> Cannot show the weather </h2>
        <p class="card__weather"> Please try again later. </p>
    `;

  card.classList.remove('card--hidden');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetchWeather(form.city.value)
    .then(({ current, location }) => showData(current, location.name))
    .catch(() => showError());

  form.reset();
});
