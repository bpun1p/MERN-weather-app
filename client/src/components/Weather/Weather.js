import React, {useEffect, useState, useCallback} from 'react';
import './Weather.css';
import Forecast from './Forecast';
import Snow from '../assets/images/snow.png';
import Clouds from '../assets/images/cloudy.png';
import Rain from '../assets/images/raining.png';
import Sun from '../assets/images/sunny.png';
import Clear from '../assets/images/clear.png';
import { saveLocation } from '../../service/libraryService';
import { getCurrentWeather, getForecast, geocodingService } from '../../service/weatherService';

export default function Weather() {
  const [forecastData, setForecastData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [searched, setSearched] = useState('');

  const weatherConditions = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun,
    "Clear": Clear
  };

  const getLocation = useCallback(async () => {
    await navigator.geolocation.getCurrentPosition(successCallback, 
     errorCallback, {
       timeout: 10_000
   });
  }, []);

  useEffect(() => {
    if (!location) {
      getLocation();
    } else {
      getWeatherData(location);
    }
  }, [location, getLocation]);

  const getWeatherData = async (location) => {
    const currentWeatherData = getCurrentWeather(location);
    const forecastData = getForecast(location);

    const [weather, forecast] = await Promise.allSettled([currentWeatherData, forecastData]);

    setForecastData(forecast);
    setWeatherData(weather.value.data);
  };

  const successCallback = async (position) => {
    let foundLocData = await geocodingService(position);
    let foundLoc = foundLocData.data[0].name;
    setLocation(foundLoc)
    return foundLoc;
  };

  const errorCallback = (error) => {
    let fallbackLoc = 'Vancouver';
    if (error.code === error.PERMISSION_DENIED) {
      setLocation(fallbackLoc);
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLocation(searched);
    event.target.reset();
  };

  const handleSave = () => {
    saveLocation(location);
  };

  return (
    <div className='container'>
      <div className='search'>
        <form onSubmit={onSubmit}>
          <input
              type="text"
              placeholder="Enter location"
              onChange={(e) =>{
                setSearched(e.target.value);
              }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {weatherData ? <div>
        <div className='top'>
          <div className='location'>
            <h1>{weatherData.name}</h1>
          </div>
          <div className='temp'>
            <p>{weatherData.main.temp.toFixed()}°C</p>
            <img src={weatherConditions[weatherData.weather[0].main]} className='weather-img' alt='weather-img' />
          </div>
          <div className='description'>
            <p>{weatherData.weather.main}</p>
          </div>
        </div>
        <div className='center'>
          <div className='feels'>
            <p>{weatherData.main.feels_like.toFixed()}°C</p>
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            <p>{weatherData.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className='winds'>
            <p>{weatherData.wind.speed} MPH</p>
            <p>Winds</p>
          </div>
        </div>
        {forecastData && <Forecast forecastData={forecastData}/>}
      </div> : null}
      {weatherData ? <button onClick={handleSave}>+</button> : null}
    </div>
  )
};