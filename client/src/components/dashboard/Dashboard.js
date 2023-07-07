import React, {useEffect, useState, useCallback} from 'react';
import './Dashboard.css';
import Forecast from './Forecast';
import { weatherConditions } from '../utils/weatherConditions/WeatherConditions';
import { saveLocation } from '../../service/libraryService';
import { getCurrent, getForecast, geocodingService } from '../../service/weatherService';
import { useAuthContext } from '../utils/access/useAuthContext';
import LoadingSpinner from '../utils/loader/Loader';
import MiscWeather from './miscWeather/MiscWeather';
import Access from '../access/Access';

export default function Weather(props) {
  const { user } = useAuthContext();
  const [forecastData, setForecastData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [searched, setSearched] = useState('');

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
      fetchWeatherData(location);
    };

    return () => console.log('Unmounted');
  }, [location, getLocation]);

  const fetchWeatherData = async (location) => {
    const [current, forecast] = await Promise.all([getCurrent(location), getForecast(location)]);

    setForecastData(forecast.data.list);
    setWeatherData(current.data);
  };

  const successCallback = async (position) => {
    const foundLocData = await geocodingService(position);
    const foundLoc = foundLocData.data[0].name;
    setLocation(foundLoc);
  };

  const errorCallback = (error) => {
    const fallbackLoc = 'Vancouver';
    if (error.code === error.PERMISSION_DENIED) {
      setLocation(fallbackLoc);
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (searched) {
      setLocation(searched);
    };
    event.target.reset();
  };

  const handleSave = () => {
    if (!user) {
      props.buttonClicked();
      return;
    }
    saveLocation(location, user);
  };

  return (
    <>
      {weatherData ? <div className='weather-container'>
        <div className='weather-header_elements'>
          <div className='search'>
            <form onSubmit={onSubmit}>
              <input
                className='search-field'
                type="text"
                placeholder="Enter location"
                onChange={(e) =>{
                  setSearched(e.target.value);
                }}
              />
              <button className='search-btn' type="submit">Search</button>
            </form>
          </div>
          <div className="tooltip">
            {!user ? 
              <span className='tooltipText'>Login or sign up to save this location to your library</span> 
              : 
              <span className='tooltipText'>Save this location to your library</span>
            }
            <button className='add-loc_btn' onClick={handleSave}>Add to library </button>        
          </div>
        </div>
        <div>
          <div className='weather-body'>
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
            <div className='misc-weather-container'>
              <MiscWeather 
                feelsLike={weatherData.main.feels_like}   
                humidity={weatherData.main.humidity} 
                windspeed={weatherData.wind.speed} 
              />
            </div>
          </div>
          {forecastData && <Forecast forecastData={forecastData}/>}
        </div> 
      </div> : <LoadingSpinner/>}
    </>
  );
};