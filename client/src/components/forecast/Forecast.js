import React from 'react';
import './Forecast.css';
import Snow from '../assets/images/snow.png';
import Clouds from '../assets/images/cloudy.png';
import Rain from '../assets/images/raining.png';
import Sun from '../assets/images/sunny.png';
import Clear from '../assets/images/clear.png';

export default function Forecast({forecastData}) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  const weather = {
    'Snow': Snow,
    'Clouds': Clouds,
    'Rain': Rain,
    'Sun': Sun,
    'Clear': Clear
  };
  
  const showForecast = () => {
    const results = [];
    let i = 0;
    const nextDay = date.getDay() + 1;
    if (forecastData) {
      forecastData.forEach(e => results.push(
        <div className='day_forecast' key={e.dt.toString()}>
          <p>{days[(nextDay + i++) % days.length]}</p>
          <img src={weather[e.weather[0].main]} className='forecast-img' alt='forecast-img'/>
          <div className='temp_forecast'>
            <p>{e.main.temp_max.toFixed()}°C &nbsp;|&nbsp; {e.main.temp_min.toFixed()}°C</p>
          </div>
        </div>
      ));
    };
    return(results);
  };

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        {forecastData ? showForecast() : null}
      </div>
    </div>
  );
};