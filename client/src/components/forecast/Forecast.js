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
  
  const loadData = () => {
    const results = [];
    const nextDay = date.getDay() + 1;
    if (forecastData) {
      for (let i=0; i < forecastData.length; i++) {
        results.push(
          <div className='day' key={i}>
            <p>{days[(nextDay + i) % days.length]}</p>
            <img src={weather[forecastData[i].weather[0].main]} className='forecast-img' alt='forecast-img'/>
            <div className='temp-var'>
              <p>{forecastData[i].main.temp_max.toFixed()}°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>{forecastData[i].main.temp_min.toFixed()}°C</p>
            </div>
          </div>
        );
      };
    };
    return(results);
  };

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        {forecastData ? loadData() : null}
      </div>
    </div>
  );
};