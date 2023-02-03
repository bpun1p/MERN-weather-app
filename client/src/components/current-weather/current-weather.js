import React, {useEffect, useState} from 'react';
import './current-weather.css';
import axios from 'axios';

export default function CurrentWeather() {
  const [data, setData] = useState({});

  const currWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=whistler&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  
  useEffect(() => {
    axios.get(currWeatherUrl)
      .then((res) => {
        setData(res.data);
      })
    }, []);

    return (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <h1>{data.name}</h1> 
          </div>
          <div className='temp'>
          {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className='center'>
          <div className='feels'>
            {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='winds'>
            {data.wind ? <p>{data.wind.speed} MPH</p> : null}
            <p>Winds</p>
          </div>
        </div>
      </div>
    )
};