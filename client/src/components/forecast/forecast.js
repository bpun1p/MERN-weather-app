import React, {useState, useEffect} from 'react';
import './forecast.css';
import axios from 'axios';

export default function Forecast() {
  const [data, setData] = useState({});
  
  const currWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=whistler&units=metric&appid=83797cfb1506fb83d321c15154900352';
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=whistler&appid=83797cfb1506fb83d321c15154900352&cnt=5';

  useEffect(() => {
    axios.get(forecastURL)
      .then((response) => {
        setData(response.data);
      })
    }, []);

    return (
      <div className='forecast-container'>
        <div className='forecast'>
          <div className='day'>
            <p>Today</p>
            <p>Description</p>
            <div className='temp-var'>
              <p>2°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>-1°C</p>
            </div>
          </div>
          <div className='day'>
            <p>Tomorrow</p>
            <p>Description</p>
            <div className='temp-var'>
              <p>2°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>-1°C</p>
            </div>
          </div>
          <div className='day'>
            <p>Day</p>
            <p>Description</p>
            <div className='temp-var'>
              <p>2°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>-1°C</p>
            </div>
          </div>
          <div className='day'>
            <p>Day</p>
            <p>Description</p>
            <div className='temp-var'>
              <p>2°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>-1°C</p>
            </div>
          </div>
          <div className='day'>
            <p>Day</p>
            <p>Description</p>
            <div className='temp-var'>
              <p>2°C</p>
              <p>&nbsp;|&nbsp;</p>
              <p>-1°C</p>
            </div>
          </div>
        </div>
      </div>
    )
}