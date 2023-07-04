import React from "react";
import Gauge from '../utils/guage/Gauge';
import Thermometer from '../assets/images/thermometer.png';
import WindSpeed from '../assets/images/windspeed.png';
import './MiscWeather.css';

export default function MiscWeather(props){
  return (
    <div className='misc-weather'>
      <div className='feels'>
        <img src={Thermometer} className='misc-weather-img' alt='weather-img' />
        <p className='feels-num'>{props.feelsLike.toFixed()}°C</p>
        <div className="feels-desc-container">
          <p className="feels-desc">Feels Like</p>
        </div>
      </div>
      <div className='humidity'>
        <Gauge type={'Humidity'} value={props.humidity} className="humidity-gauge"/>
        <p className="humidity-desc">Humidity</p>
      </div>
      <div className='winds'>
        <img src={WindSpeed} className='misc-weather-img' alt='weather-img' />
        <p className="wind-speed">{props.windspeed} MPH</p>
        <p className="wind-desc">Winds</p>
      </div>
    </div>
  )
}