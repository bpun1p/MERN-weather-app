import React, {useEffect, useState} from 'react';
import './Weather.css';
import Forecast from './Forecast';
import axios from 'axios';
import Snow from '../assets/images/snow.png';
import Clouds from '../assets/images/cloudy.png';
import Rain from '../assets/images/raining.png';
import Sun from '../assets/images/sunny.png';
import Clear from '../assets/images/clear.png';
import AddBtn from '../utils/buttons/AddBtn';
import {saveLocation} from '../../service/libraryService';

export default function Weather() {
  const [forecastData, setForecastData] = useState();
  const appid = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState('');
  const [data, setData] = useState({
    location: '',
    temp: '',
    description: '',
    feels_like: '',
    humidity: '',
    wind_speed: ''
  });
  const geocodingUrl = new URL(`https://api.openweathermap.org/geo/1.0/reverse?`);
  const weatherUrl = new URL(`https://api.openweathermap.org/data/2.5/weather?`);
  const forecastUrl = new URL(`https://api.openweathermap.org/data/2.5/forecast?`);
  const weatherConditions = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun,
    "Clear": Clear
  };

  useEffect(() => {
    if (data.location !== '') {
      getWeatherData();
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, 
        errorCallback, {
          timeout: 10_000
      });
    }
  },[data.location]);

  const getWeatherData = () => {
    if (data.location !== '') {
      weatherUrl.search = new URLSearchParams({
        q : data.location,
        units : 'metric',
        appid : appid
      })
      axios.get(weatherUrl)
        .then((res) => {
          setData({...data,
            location: res.data.name,
            temp: res.data.main.temp.toFixed(),
            description: res.data.weather[0].main,
            feels_like: res.data.main.feels_like.toFixed(),
            humidity: res.data.main.humidity,
            wind_speed: res.data.wind.speed
          });
        })
        .then(() => {
          getForcastData();
        })
    };
  };

  const successCallback = (position) => {
    if (position) {
      geocodingUrl.search = new URLSearchParams({
        lat : position.coords.latitude,
        lon : position.coords.longitude,
        appid : appid
      })
      axios.get(geocodingUrl)
        .then((res) => {
          setData({...data, location: res.data[0].name})
        });
    };
  };

  function errorCallback(error) {
    console.log(error)
    if (error.code === error.PERMISSION_DENIED) {
      setData({...data, location: 'Vancouver'})
    };
  };

  const getForcastData = () => {
    if (data.location !== '') {
      forecastUrl.search = new URLSearchParams({
        q : data.location,
        cnt : '5',
        units : 'metric',
        appid : appid
      })
      axios.get(forecastUrl)
      .then((res) => {
        setForecastData(res.data);
      })
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setData({...data, location : location})
    event.target.reset();
  };

  const handleClick = () => {
    saveLocation(data.location)
  }

  return (
    <div className='container'>
      <div className='search'>
        <form onSubmit={onSubmit}>
          <input
              type="text"
              placeholder="Enter location"
              onChange={ e =>{
                setLocation(e.target.value);
              }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <div className='top'>
          <div className='location'>
            {data.location !== '' ? <h1>{data.location}</h1> : null}
          </div>
          <div className='temp'>
            {data.temp !== '' ? <p>{data.temp}°C</p> : null}
            <img src={weatherConditions[data.description]} className='weather-img' alt='weather-img' />
          </div>
          <div className='description'>
            {data.description !== '' ? <p>{data.description}</p> : null}
          </div>
        </div>
        <div className='center'>
          <div className='feels'>
            {data.feels_like !== '' ? <p>{data.feels_like}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.humidity !== '' ? <p>{data.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='winds'>
            {data.wind_speed !== '' ? <p>{data.wind_speed} MPH</p> : null}
            <p>Winds</p>
          </div>
        </div>
        {forecastData && <Forecast forecastData={forecastData}/>}
      </div> 
      <button onClick={handleClick}>+</button>
    </div>
  )
};