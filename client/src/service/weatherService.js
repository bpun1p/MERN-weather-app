import axios from 'axios';
const appid = process.env.REACT_APP_API_KEY;
const geocodingUrl = new URL(`https://api.openweathermap.org/geo/1.0/reverse?`);
const currentWeatherUrl = new URL(`https://api.openweathermap.org/data/2.5/weather?`);
const forecastUrl = new URL(`https://api.openweathermap.org/data/2.5/forecast?`);

export const getCurrentWeather = async (location) => {
  currentWeatherUrl.search = new URLSearchParams({
    q : location,
    units : 'metric',
    appid : appid
  })
  try {
    const weatherData = await axios.get(currentWeatherUrl)
    return weatherData;
  } catch (err) { console.error(err) }
};

export const getForecast = async (location) => {
  forecastUrl.search = new URLSearchParams({
    q : location,
    cnt : '5',
    units : 'metric',
    appid : appid
  })
  try {
    const forecastData = await axios.get(currentWeatherUrl)
    return forecastData;
  } catch (err) { console.error(err) }
};

export const geocodingService = async (position) => {
  geocodingUrl.search = new URLSearchParams({
    lat : position.coords.latitude,
    lon : position.coords.longitude,
    appid : appid
  })
  try {
    const geoResponse = await axios.get(currentWeatherUrl)
    return geoResponse;
    } catch (err) { console.error(err) }
};