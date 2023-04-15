import React from 'react';
import './forecast.css';
import Snow from '../assets/images/snow.png';
import Clouds from '../assets/images/cloudy.png';
import Rain from '../assets/images/raining.png';
import Sun from '../assets/images/sunny.png';
import Clear from '../assets/images/clear.png'

export default function Forecast({forecastData}) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  const weather = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun,
    "Clear" : Clear
  };

  const loadData = () => {
    let results = [];
    let nextDay = date.getDay() + 1;
    if (forecastData) {
      for (let i=0; i < forecastData.list.length; i++) {
        results.push(
          <div className='day'>
            <p>{days[(nextDay + i) % days.length]}</p>
            <img src={weather[forecastData.list[i].weather[0].main]} className='forecast-img' alt='forecast-img'/>
            <div className='temp-var'>
              <p>{forecastData.list[i].main.temp_max.toFixed()}°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>{forecastData.list[i].main.temp_min.toFixed()}°C</p>
            </div>
          </div>
        )
      }
    }
    return(results);
  }

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        {forecastData ? loadData() : null}
      </div>
    </div>
  )
};