import React, {useEffect, useState} from 'react';
import './weather.css';
import Forecast from './forecast';
import axios from 'axios';
import Snow from '../assets/images/snow.png';
import Clouds from '../assets/images/cloudy.png';
import Rain from '../assets/images/raining.png';
import Sun from '../assets/images/sunny.png';
import Clear from '../assets/images/clear.png'

export default function CurrentWeather() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [currentCondition, setCurrentCondition] = useState({});
  const [location, setLocation] = useState('');

  const defaultLocationUrl = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const searchedWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const searchedForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}&cnt=5`;

  const weatherConditions = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun,
    "Clear" : Clear
  };

  useEffect(() => {
    axios.get(defaultLocationUrl).then((res) => {
      setData(res.data);
      setCurrentCondition(res.data.weather[0].main);
    }).then(() => {
      getForcastData();
    })    
  }, [])

  const searchedLocation = (event) => {
    setLocation(event.target.value)
    if (event.key === 'Enter') {
      axios.get(searchedWeatherUrl)
      .then((res) => {
        setData(res.data);
        setCurrentCondition(res.data.weather[0].main);
      }).then(() => {
        getForcastData();
      })
      setLocation('');
    }
  };

  const getForcastData = () => {
    let url = searchedForecastUrl
    if (location === '') {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=vancouver&units=metric&appid=${process.env.REACT_APP_API_KEY}&cnt=5`
    }
    axios.get(url)
      .then((res) => {
        setForecastData(res.data);
      },[])
  }

  return (
    <div className='container'>
      <div className='search'>
        <input 
          value={location} 
          onChange={searchedLocation}
          onKeyDown={searchedLocation} 
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
            <img src={weatherConditions[currentCondition]} className='weather-img' alt='weather-img' />
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
        <Forecast forecastData={forecastData} />
      </div> 
    </div>
  )
};