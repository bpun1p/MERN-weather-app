import React, {useState, useEffect} from 'react';
import './forecast.css';
import axios from 'axios';
import Snow from '../images/snow.png';
import Clouds from '../images/cloudy.png';
import Rain from '../images/raining.png';
import Sun from '../images/sunny.png';
import Clear from '../images/clear.png'


export default function Forecast({forecastData}) {
  const [data, setData] = useState({});

  const weather = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun,
    "Clear" : Clear
  };

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        <div className='day'>
          <p>Tomorrow</p>
          {forecastData.list ? <img src={weather[forecastData.list[0].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {forecastData.list ? <p>{forecastData.list[0].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {forecastData.list ? <p>{forecastData.list[0].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {forecastData.list ? <img src={weather[forecastData.list[1].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {forecastData.list ? <p>{forecastData.list[1].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {forecastData.list ? <p>{forecastData.list[1].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {forecastData.list ? <img src={weather[forecastData.list[2].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {forecastData.list ? <p>{forecastData.list[2].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {forecastData.list ? <p>{forecastData.list[2].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {forecastData.list ? <img src={weather[forecastData.list[3].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {forecastData.list ? <p>{forecastData.list[3].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {forecastData.list ? <p>{forecastData.list[3].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {forecastData.list ? <img src={weather[forecastData.list[4].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {forecastData.list ? <p>{forecastData.list[4].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {forecastData.list ? <p>{forecastData.list[4].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}