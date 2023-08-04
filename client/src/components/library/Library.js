import React, { useEffect, useState, useCallback } from 'react';
import './Library.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrent, getForecast } from '../../service/weatherService';
import { useAuthContext } from '../utils/access/useAuthContext';
import LoadingSpinner from '../utils/loader/Loader';
import Trash from '../assets/images/trash-icon.png';

export default function MyLibrary() {
  const [weatherData, setWeatherData] = useState(null);
  const { user } = useAuthContext();

  const accumulateWeatherData = useCallback(async (locData) => {
    const dataArr = [];
    for (let i = 0; i < locData.length; i++) {
      dataArr.push(await fetchWeatherData(locData[i]));
    }
    return dataArr;
  }, []);

  const getData = async () => {
    try {
      const locations = await getLocations(user);
      const data = await accumulateWeatherData(locations);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (user !== null) {
      getData();
    }
    return() => {
      setWeatherData(null);
    };
  }, [accumulateWeatherData, user]);

  const fetchWeatherData = async (locData) => {
    const location = locData.location;
    const [current, forecast] = await Promise.all([getCurrent(location), getForecast(location)]);

    const weatherData = {
      id : locData._id,
      current : current,
      forecast : forecast
    };
    return weatherData;
  };

  const handleDelete = async (id) => {
    if (!user) {
      console.log('Login Required');
      return;
    }
    await deleteLocation(id, user);
    setWeatherData(() => weatherData.filter(e => e.id !== id));
  };

  const accumulateForecastData = (forecastData) => {
    const forecastResults = [];
    if (forecastData && forecastData.data && forecastData.data.list.length > 0) {
      let forecastDataArr = forecastData.data.list;
      let i = 0;
      for (let forecast of forecastDataArr) {
        if (forecast.main && forecast.main.temp) {
          i++;
          if (i === forecastDataArr.length) {
            forecastResults.push((forecast.main.temp.toFixed() + ' °C '));
            return forecastResults;
          }
          forecastResults.push((forecast.main.temp.toFixed() + ' °C | '));
        }
      }
    }
    return forecastResults;
  };

  const showData = () => {
    const results = [];
    if (weatherData) {
      for (let weather of weatherData) {
        if (weather.id && weather.forecast && weather.current && weather.current.data && weather.current.data.main) {
          results.push(
            <tr className='table-data' key={weather.id}>
              <td className='city-data data'>{weather.current.data.name ? weather.current.data.name : null}</td>
              <td className='weather-data data'>{weather.current.data.main.temp ? weather.current.data.main.temp.toFixed() : null}°C</td>
              <td className='forecast-data data'>
                {accumulateForecastData(weather.forecast)}
              </td>
              <img src={Trash} onClick={() => handleDelete(weather.id)} className='trash-icon' alt='trash-icon' />
            </tr>
          );
        }
      }
      return results;
    }
  };

  return (
    <div className='library'>
      <div className='library-header'>
        <h1>Library</h1>
      </div>
      <table className='library-table'>
        <tbody>
          <tr className='table-header'>
            <th className='city-header'>City</th>
            <th className='weather-header'>Weather</th>
            <th className='forecast-header'>Forecast</th>
          </tr>
          {user ? 
            <>
              {weatherData ? showData() : <LoadingSpinner/>}
            </> 
            : <span className='unauthorized-library-text'>Login or sign up to see your saved locations</span>}
        </tbody>
      </table> 
    </div>
  );
}