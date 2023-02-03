import React, {useState, useEffect} from 'react';
import './forecast.css';
import axios from 'axios';

export default function Forecast() {
  const [data, setData] = useState({});
  
  const foreWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=whistler&units=metric&appid=${process.env.REACT_APP_API_KEY}&cnt=5`;

  useEffect(() => {
    axios.get(foreWeatherUrl)
      .then((res) => {
        setData(res.data);
      })
    }, []);

  return (
    <div className='forecast-container'>
      <div className='forecast'>
        <div className='day'>
          <p>Tomorrow</p>
          {data.list ? <p>{data.list[0].weather[0].description}</p> : null}
          <div className='temp-var'>
            {data.list ? <p>{data.list[0].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[0].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <p>{data.list[1].weather[0].description}</p> : null}
          <div className='temp-var'>
            {data.list ? <p>{data.list[1].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[1].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <p>{data.list[2].weather[0].description}</p> : null}
          <div className='temp-var'>
            {data.list ? <p>{data.list[2].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[2].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <p>{data.list[3].weather[0].description}</p> : null}
          <div className='temp-var'>
            {data.list ? <p>{data.list[3].main.temp_max.toFixed()}°C</p> : null}
            <p>&nbsp;|&nbsp;</p>
            {data.list ? <p>{data.list[3].main.temp_min.toFixed()}°C</p> : null}
          </div>
        </div>
        <div className='day'>
          <p>Day</p>
          {data.list ? <p>{data.list[4].weather[0].description}</p> : null}
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