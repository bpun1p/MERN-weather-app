import React from 'react';
import './Forecast.css';
import { weatherConditions } from '../utils/weatherConditions/WeatherConditions';
import PropTypes from 'prop-types';

export default function Forecast({ forecastData }) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  
  const showForecast = () => {
    const results = [];
    let i = 0;
    const nextDay = date.getDay() + 1;
    if (forecastData.length > 0) {
      for (let forecast of forecastData) {
        if (forecast.dt && forecast.weather.length > 0) {
          results.push(
            <div className='day_forecast' key={forecast.dt.toString()}>
              <p>{days[(nextDay + i++) % days.length]}</p>
              <img src={weatherConditions[forecast.weather[0].main ? forecast.weather[0].main : null]} className='forecast-img' alt='forecast-img'/>
              <div className='temp_forecast'>
                <p>{forecast.main.temp_max.toFixed()}°C &nbsp;|&nbsp; {forecast.main.temp_min ? forecast.main.temp_min.toFixed() : null}°C</p>
              </div>
            </div>
          );
        }
      }
    }
    return(results);
  };

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        {forecastData ? showForecast() : null}
      </div>
    </div>
  );
}

Forecast.propTypes = {
  forecastData: PropTypes.array
};