import React, {useEffect, useState} from 'react';
import './current-weather.css';
import Forecast from '../forecast/forecast';
import axios from 'axios';
import Snow from '../images/snow.png';
import Clouds from '../images/cloudy.png';
import Rain from '../images/raining.png';
import Sun from '../images/sunny.png';

export default function CurrentWeather() {
  const [data, setData] = useState({});
  const [currentCondition, setCurrentCondition] = useState({});
  const [locale, setLocale] = useState('');

  const defaultLocationUrl = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const searchedWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locale}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const weather = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun
  };
  
  useEffect(() => {
    axios.get(defaultLocationUrl)
      .then((res) => {
        setData(res.data);
        setCurrentCondition(res.data.weather[0].main)
      })
    }, []);

  const findLocale = (event) => {
    setLocale(event.target.value)
    if (event.key === 'Enter') {
      axios.get(searchedWeatherUrl)
      .then((res) => {
        setData(res.data);
        setCurrentCondition(res.data.weather[0].main);
      })
      setLocale('');
    }
  };
 
  return (
    <div className='container'>
      <div className='search'>
        <input 
          value={locale} 
          onChange={findLocale}
          onKeyDown={findLocale} 
          type='text' 
          placeholder='Enter Location'
        />
      </div>
      <div>
        <div className='top'>
          <div className='location'>
            <h1>{data.name}</h1> 
          </div>
          <div className='temp'>
            {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
            <img src={weather[currentCondition]} className='weather-img' alt='weather-img' />
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
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
        <Forecast locale={data.name}/>
      </div> 
    </div>
  )
};