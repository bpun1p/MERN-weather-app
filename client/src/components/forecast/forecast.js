import React, {useState, useEffect} from 'react';
import './forecast.css';
import axios from 'axios';
import Snow from '../images/snow.png';
import Clouds from '../images/cloudy.png';
import Rain from '../images/raining.png';
import Sun from '../images/sunny.png';

export default function Forecast({locale}) {
  const [data, setData] = useState({});

  const weather = {
    "Snow": Snow,
    "Clouds": Clouds,
    "Rain": Rain,
    "Sun": Sun
  };

  const searchedWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locale}&units=metric&appid=${process.env.REACT_APP_API_KEY}&cnt=5`;
  
  useEffect(() => {
    axios.get(searchedWeatherUrl)
      .then((res) => {
        setData(res.data);
      })
    }, [locale]
  );

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        <div className='day'>
          <p>Tomorrow</p>
          {data.list ? <img src={weather[data.list[0].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {data.list ? <p>{data.list[0].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[0].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <img src={weather[data.list[1].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {data.list ? <p>{data.list[1].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[1].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <img src={weather[data.list[2].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {data.list ? <p>{data.list[2].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[2].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <img src={weather[data.list[3].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {data.list ? <p>{data.list[3].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[3].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <img src={weather[data.list[4].weather[0].main]} className='forecast-img' alt='forecast-img' /> : null};
          <div className='temp-var'>
            {data.list ? <p>{data.list[4].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[4].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}