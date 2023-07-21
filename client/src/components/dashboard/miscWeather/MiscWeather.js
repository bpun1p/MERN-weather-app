import React from "react";
import Gauge from '../../utils/guage/Gauge';
import Thermometer from '../../assets/images/thermometer.png';
import WindSpeed from '../../assets/images/windspeed.png';
import './MiscWeather.css';
import PropTypes from 'prop-types';

export default function MiscWeather({feelsLike, humidity, windspeed}){
  return (
    <div className='misc-weather'>
      <div className='feels'>
        <img src={Thermometer} className='misc-weather-img' alt='weather-img' />
        <p className='feels-num'>{feelsLike.toFixed()}°C</p>
        <div className="feels-desc-container">
          <p className="feels-desc">Feels Like</p>
        </div>
      </div>
      <div className='humidity'>
        <Gauge type={'Humidity'} value={humidity} className="humidity-gauge"/>
        <p className="humidity-desc">Humidity</p>
      </div>
      <div className='winds'>
        <img src={WindSpeed} className='misc-weather-img' alt='weather-img' />
        <p className="wind-speed">{windspeed} MPH</p>
        <p className="wind-desc">Winds</p>
      </div>
    </div>
  );
}

MiscWeather.propTypes = {
  feelsLike: PropTypes.string,
  humidity: PropTypes.string,
  windspeed: PropTypes.string
}