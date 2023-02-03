import React, {useEffect, useState} from 'react';
import './current-weather.css';
import axios from 'axios';


export default function CurrentWeather() {
  const [data, setData] = useState({});

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=whistler&appid=83797cfb1506fb83d321c15154900352';
  
  const acquireWeather = () => {
    axios.get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
  };

  useEffect(() => {
    acquireWeather();
  }, []);

    return (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <h1>Whistler</h1> 
          </div>
          <div className='temp'>
            <p>79°C</p>
          </div>
          <div className='description'>
            <p>Cloudy</p>
          </div>
        </div>
        <div className='center'>
          <div className='feels'>
            <p>79°C</p>
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            <p>70%</p>
            <p>Humidity</p>
          </div>
          <div className='winds'>
            <p>2 MPH</p>
            <p>Winds</p>
          </div>
        </div>
      </div>
    )
};